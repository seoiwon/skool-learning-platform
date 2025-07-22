// Service Worker for Push Notifications
const CACHE_NAME = 'chat-app-v1'

// Install event
self.addEventListener('install', (event) => {
  console.log('Service Worker installed')
  self.skipWaiting()
})

// Activate event
self.addEventListener('activate', (event) => {
  console.log('Service Worker activated')
  event.waitUntil(self.clients.claim())
})

// Push event handler
self.addEventListener('push', (event) => {
  console.log('Push received:', event)
  
  const options = {
    body: 'You have a new message!',
    icon: '/icon-192x192.png',
    badge: '/icon-192x192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Open Chat',
        icon: '/icon-192x192.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icon-192x192.png'
      }
    ]
  }

  if (event.data) {
    const payload = event.data.json()
    options.body = payload.body || options.body
    options.data.url = payload.url || '/'
  }

  event.waitUntil(
    self.registration.showNotification('New Message', options)
  )
})

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event)
  
  event.notification.close()
  
  if (event.action === 'explore') {
    // Open the chat page
    event.waitUntil(
      self.clients.openWindow(event.notification.data.url || '/')
    )
  } else if (event.action === 'close') {
    // Just close the notification
    event.notification.close()
  } else {
    // Default action - open the app
    event.waitUntil(
      self.clients.openWindow('/')
    )
  }
})

// Background sync for offline messages
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('Background sync triggered')
    // Handle offline message queue here
  }
})