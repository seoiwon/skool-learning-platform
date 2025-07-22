'use client'

// Push notification utilities
export class PushNotificationManager {
  private static instance: PushNotificationManager
  private swRegistration: ServiceWorkerRegistration | null = null

  private constructor() {}

  static getInstance(): PushNotificationManager {
    if (!PushNotificationManager.instance) {
      PushNotificationManager.instance = new PushNotificationManager()
    }
    return PushNotificationManager.instance
  }

  async initialize(): Promise<boolean> {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      console.warn('Push notifications not supported')
      return false
    }

    try {
      // Register service worker
      this.swRegistration = await navigator.serviceWorker.register('/sw.js')
      console.log('Service Worker registered:', this.swRegistration)

      // Wait for the service worker to be ready
      await navigator.serviceWorker.ready
      return true
    } catch (error) {
      console.error('Service Worker registration failed:', error)
      return false
    }
  }

  async requestPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      console.warn('Notifications not supported')
      return 'denied'
    }

    if (Notification.permission === 'granted') {
      return 'granted'
    }

    const permission = await Notification.requestPermission()
    return permission
  }

  async subscribeToPush(): Promise<PushSubscription | null> {
    if (!this.swRegistration) {
      console.error('Service Worker not registered')
      return null
    }

    try {
      const subscription = await this.swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || ''
        )
      })

      console.log('Push subscription:', subscription)
      return subscription
    } catch (error) {
      console.error('Failed to subscribe to push notifications:', error)
      return null
    }
  }

  async unsubscribeFromPush(): Promise<boolean> {
    if (!this.swRegistration) {
      return false
    }

    try {
      const subscription = await this.swRegistration.pushManager.getSubscription()
      if (subscription) {
        await subscription.unsubscribe()
        return true
      }
      return false
    } catch (error) {
      console.error('Failed to unsubscribe from push notifications:', error)
      return false
    }
  }

  async getSubscription(): Promise<PushSubscription | null> {
    if (!this.swRegistration) {
      return null
    }

    return this.swRegistration.pushManager.getSubscription()
  }

  async showLocalNotification(title: string, options?: NotificationOptions): Promise<void> {
    if (Notification.permission !== 'granted') {
      console.warn('Notification permission not granted')
      return
    }

    const notification = new Notification(title, {
      icon: '/icon-192x192.png',
      badge: '/icon-192x192.png',
      ...options
    })

    // Auto close after 5 seconds
    setTimeout(() => {
      notification.close()
    }, 5000)
  }

  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4)
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/')

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }
}

// Hook for using push notifications in React components
export function usePushNotifications() {
  const manager = PushNotificationManager.getInstance()

  const initializePush = async (): Promise<boolean> => {
    const initialized = await manager.initialize()
    if (!initialized) return false

    const permission = await manager.requestPermission()
    if (permission !== 'granted') {
      console.warn('Push notification permission denied')
      return false
    }

    return true
  }

  const subscribeToPush = async (): Promise<PushSubscription | null> => {
    return manager.subscribeToPush()
  }

  const showNotification = async (title: string, options?: NotificationOptions): Promise<void> => {
    return manager.showLocalNotification(title, options)
  }

  return {
    initializePush,
    subscribeToPush,
    showNotification,
    requestPermission: manager.requestPermission.bind(manager),
    getSubscription: manager.getSubscription.bind(manager),
    unsubscribe: manager.unsubscribeFromPush.bind(manager)
  }
}