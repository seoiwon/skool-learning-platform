'use client'

import { useState, useEffect } from 'react'
import { usePushNotifications } from '@/lib/push-notifications'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'

export default function PushNotificationSetup() {
  const [isSupported, setIsSupported] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [permission, setPermission] = useState<NotificationPermission>('default')
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const { initializePush, subscribeToPush, requestPermission, getSubscription, unsubscribe } = usePushNotifications()

  useEffect(() => {
    checkSupport()
    checkSubscription()
  }, [])

  const checkSupport = () => {
    const supported = ('serviceWorker' in navigator) && ('PushManager' in window) && ('Notification' in window)
    setIsSupported(supported)
    
    if (supported) {
      setPermission(Notification.permission)
    }
  }

  const checkSubscription = async () => {
    try {
      const subscription = await getSubscription()
      setIsSubscribed(!!subscription)
    } catch (error) {
      console.error('Error checking subscription:', error)
    }
  }

  const handleEnableNotifications = async () => {
    if (!user) {
      alert('로그인이 필요합니다.')
      return
    }

    setLoading(true)
    try {
      // Initialize push notifications
      const initialized = await initializePush()
      if (!initialized) {
        alert('푸시 알림을 초기화할 수 없습니다.')
        return
      }

      // Subscribe to push notifications
      const subscription = await subscribeToPush()
      if (!subscription) {
        alert('푸시 알림 구독에 실패했습니다.')
        return
      }

      // Save subscription to database
      await saveSubscription(subscription)
      
      setIsSubscribed(true)
      setPermission('granted')
      alert('푸시 알림이 활성화되었습니다!')
    } catch (error) {
      console.error('Error enabling notifications:', error)
      alert('푸시 알림 활성화에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleDisableNotifications = async () => {
    setLoading(true)
    try {
      const success = await unsubscribe()
      if (success) {
        // Remove subscription from database
        await removeSubscription()
        setIsSubscribed(false)
        alert('푸시 알림이 비활성화되었습니다.')
      }
    } catch (error) {
      console.error('Error disabling notifications:', error)
      alert('푸시 알림 비활성화에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const saveSubscription = async (subscription: PushSubscription) => {
    if (!user) return

    const { error } = await supabase
      .from('push_subscriptions')
      .upsert({
        user_id: user.id,
        endpoint: subscription.endpoint,
        p256dh: subscription.keys?.p256dh || '',
        auth: subscription.keys?.auth || '',
        created_at: new Date().toISOString()
      }, {
        onConflict: 'user_id'
      })

    if (error) {
      console.error('Error saving subscription:', error)
    }
  }

  const removeSubscription = async () => {
    if (!user) return

    const { error } = await supabase
      .from('push_subscriptions')
      .delete()
      .eq('user_id', user.id)

    if (error) {
      console.error('Error removing subscription:', error)
    }
  }

  if (!isSupported) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
        <p className="text-yellow-800 text-sm">
          이 브라우저는 푸시 알림을 지원하지 않습니다.
        </p>
      </div>
    )
  }

  if (permission === 'denied') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
        <p className="text-red-800 text-sm">
          푸시 알림이 차단되어 있습니다. 브라우저 설정에서 알림을 허용해주세요.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-blue-900">푸시 알림</h3>
          <p className="text-sm text-blue-700">
            {isSubscribed 
              ? '새 메시지 알림을 받고 있습니다.' 
              : '새 메시지 알림을 받으려면 활성화하세요.'
            }
          </p>
        </div>
        <button
          onClick={isSubscribed ? handleDisableNotifications : handleEnableNotifications}
          disabled={loading}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            isSubscribed
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {loading ? '처리중...' : isSubscribed ? '비활성화' : '활성화'}
        </button>
      </div>
    </div>
  )
}