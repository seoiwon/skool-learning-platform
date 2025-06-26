'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Header from '@/components/Header'

type TabType = 'profile' | 'security' | 'notifications' | 'connected'

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<TabType>('profile')
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const router = useRouter()

  // Profile state
  const [profile, setProfile] = useState({
    full_name: '',
    email: '',
    phone: '',
    bio: '',
    avatar_url: ''
  })

  // Security state
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  })

  // Notification preferences
  const [notifications, setNotifications] = useState({
    email_course_updates: true,
    email_promotions: false,
    email_newsletter: true,
    push_course_reminders: true,
    push_achievements: true
  })

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
    } else {
      setUser(user)
      setProfile(prev => ({ ...prev, email: user.email || '' }))
      // Load user profile data
      loadProfile(user.id)
    }
    setLoading(false)
  }

  const loadProfile = async (userId: string) => {
    // Mock data - will be replaced with Supabase query
    setProfile(prev => ({
      ...prev,
      full_name: '홍길동',
      phone: '010-1234-5678',
      bio: 'AI와 머신러닝을 공부하는 개발자입니다.'
    }))
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdating(true)
    
    try {
      // Update profile in database
      // Mock success for now
      alert('프로필이 업데이트되었습니다.')
    } catch (error) {
      alert('프로필 업데이트 중 오류가 발생했습니다.')
    } finally {
      setUpdating(false)
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (passwords.new !== passwords.confirm) {
      alert('새 비밀번호가 일치하지 않습니다.')
      return
    }

    if (passwords.new.length < 6) {
      alert('비밀번호는 최소 6자 이상이어야 합니다.')
      return
    }

    setUpdating(true)
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: passwords.new
      })

      if (error) throw error

      alert('비밀번호가 변경되었습니다.')
      setPasswords({ current: '', new: '', confirm: '' })
    } catch (error: any) {
      alert(error.message || '비밀번호 변경 중 오류가 발생했습니다.')
    } finally {
      setUpdating(false)
    }
  }

  const handleNotificationUpdate = async () => {
    setUpdating(true)
    
    try {
      // Update notification preferences
      // Mock success for now
      alert('알림 설정이 저장되었습니다.')
    } catch (error) {
      alert('알림 설정 저장 중 오류가 발생했습니다.')
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">로딩 중...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">계정 설정</h1>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-emerald-50 text-emerald-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  프로필
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeTab === 'security'
                      ? 'bg-emerald-50 text-emerald-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  보안
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeTab === 'notifications'
                      ? 'bg-emerald-50 text-emerald-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  알림 설정
                </button>
                <button
                  onClick={() => setActiveTab('connected')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeTab === 'connected'
                      ? 'bg-emerald-50 text-emerald-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  연동 계정
                </button>
              </nav>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm p-6">
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">프로필 정보</h2>
                    
                    <form onSubmit={handleProfileUpdate}>
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          프로필 사진
                        </label>
                        <div className="flex items-center">
                          <div className="w-20 h-20 bg-gray-200 rounded-full mr-4"></div>
                          <button
                            type="button"
                            className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                          >
                            사진 변경
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-2">
                            이름
                          </label>
                          <input
                            type="text"
                            id="full_name"
                            value={profile.full_name}
                            onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            이메일
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={profile.email}
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                          />
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                            전화번호
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            value={profile.phone}
                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                      </div>

                      <div className="mt-6">
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                          자기소개
                        </label>
                        <textarea
                          id="bio"
                          rows={4}
                          value={profile.bio}
                          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>

                      <div className="mt-6">
                        <button
                          type="submit"
                          disabled={updating}
                          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                        >
                          {updating ? '저장 중...' : '변경사항 저장'}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">보안 설정</h2>
                    
                    <form onSubmit={handlePasswordChange}>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="current_password" className="block text-sm font-medium text-gray-700 mb-2">
                            현재 비밀번호
                          </label>
                          <input
                            type="password"
                            id="current_password"
                            value={passwords.current}
                            onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>

                        <div>
                          <label htmlFor="new_password" className="block text-sm font-medium text-gray-700 mb-2">
                            새 비밀번호
                          </label>
                          <input
                            type="password"
                            id="new_password"
                            value={passwords.new}
                            onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>

                        <div>
                          <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700 mb-2">
                            비밀번호 확인
                          </label>
                          <input
                            type="password"
                            id="confirm_password"
                            value={passwords.confirm}
                            onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                      </div>

                      <div className="mt-6">
                        <button
                          type="submit"
                          disabled={updating}
                          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                        >
                          {updating ? '변경 중...' : '비밀번호 변경'}
                        </button>
                      </div>
                    </form>

                    <div className="mt-8 pt-8 border-t">
                      <h3 className="text-base font-medium text-gray-900 mb-4">2단계 인증</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        계정 보안을 강화하기 위해 2단계 인증을 설정하세요.
                      </p>
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors">
                        2단계 인증 설정
                      </button>
                    </div>
                  </div>
                )}

                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">알림 설정</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-base font-medium text-gray-900 mb-4">이메일 알림</h3>
                        <div className="space-y-3">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={notifications.email_course_updates}
                              onChange={(e) => setNotifications({ ...notifications, email_course_updates: e.target.checked })}
                              className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                            />
                            <span className="ml-3 text-sm text-gray-700">강의 업데이트 알림</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={notifications.email_promotions}
                              onChange={(e) => setNotifications({ ...notifications, email_promotions: e.target.checked })}
                              className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                            />
                            <span className="ml-3 text-sm text-gray-700">프로모션 및 할인 정보</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={notifications.email_newsletter}
                              onChange={(e) => setNotifications({ ...notifications, email_newsletter: e.target.checked })}
                              className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                            />
                            <span className="ml-3 text-sm text-gray-700">뉴스레터</span>
                          </label>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-base font-medium text-gray-900 mb-4">푸시 알림</h3>
                        <div className="space-y-3">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={notifications.push_course_reminders}
                              onChange={(e) => setNotifications({ ...notifications, push_course_reminders: e.target.checked })}
                              className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                            />
                            <span className="ml-3 text-sm text-gray-700">학습 리마인더</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={notifications.push_achievements}
                              onChange={(e) => setNotifications({ ...notifications, push_achievements: e.target.checked })}
                              className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                            />
                            <span className="ml-3 text-sm text-gray-700">성취 및 뱃지 획득</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <button
                        onClick={handleNotificationUpdate}
                        disabled={updating}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                      >
                        {updating ? '저장 중...' : '설정 저장'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Connected Accounts Tab */}
                {activeTab === 'connected' && (
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">연동 계정</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-white font-bold">G</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Google</p>
                            <p className="text-sm text-gray-600">연동되지 않음</p>
                          </div>
                        </div>
                        <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
                          연동하기
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-white font-bold">GH</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">GitHub</p>
                            <p className="text-sm text-gray-600">연동되지 않음</p>
                          </div>
                        </div>
                        <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
                          연동하기
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-white font-bold">K</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Kakao</p>
                            <p className="text-sm text-gray-600">연동되지 않음</p>
                          </div>
                        </div>
                        <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
                          연동하기
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}