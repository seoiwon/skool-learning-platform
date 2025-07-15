'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAdminAuth()
  }, [])

  const checkAdminAuth = async () => {
    try {
      console.log('=== Admin Auth Check Started ===')
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        console.log('❌ No user found, redirecting to login')
        router.push('/login')
        return
      }

      console.log('✅ User found:', { id: user.id, email: user.email })

      // Check user_profiles table directly
      const { data: profile, error } = await supabase
        .from('user_profiles')
        .select('role, email')
        .eq('id', user.id)
        .single()

      console.log('📊 Profile query result:', { profile, error })

      if (error) {
        console.log('❌ Error fetching profile:', error.message)
        // Fallback: check specific admin emails
        const adminEmails = ['admin@aiskool.com', 'admin@example.com', 'coconut31@naver.com'] // 여기에 실제 관리자 이메일 추가
        if (adminEmails.includes(user.email || '')) {
          console.log('✅ Admin access granted by email fallback')
          setIsAdmin(true)
          return
        }
        router.push('/')
        return
      }

      if (profile?.role === 'admin') {
        console.log('✅ Admin access granted by role')
        setIsAdmin(true)
      } else {
        console.log('❌ User is not admin. Role:', profile?.role)
        router.push('/')
      }
    } catch (error) {
      console.error('❌ Unexpected error:', error)
      router.push('/')
    } finally {
      setLoading(false)
      console.log('=== Admin Auth Check Completed ===')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Admin Navigation */}
      <nav className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/admin" className="text-emerald-400 font-bold text-xl">
                AIskool! Admin
              </Link>
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/admin" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  대시보드
                </Link>
                <Link href="/admin/courses" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  강의 관리
                </Link>
                <Link href="/admin/news" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  뉴스 관리
                </Link>
                <Link href="/admin/users" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  사용자 관리
                </Link>
              </div>
            </div>
            <div>
              <button
                onClick={() => {
                  supabase.auth.signOut()
                  router.push('/')
                }}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}