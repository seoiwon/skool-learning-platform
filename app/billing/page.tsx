'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Header from '@/components/Header'
import Link from 'next/link'

interface Subscription {
  id: string
  plan: string
  status: 'active' | 'cancelled' | 'expired'
  next_billing_date: string
  amount: number
}

interface RecentTransaction {
  id: string
  date: string
  description: string
  amount: number
  status: 'completed' | 'pending' | 'failed'
}

export default function BillingPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [recentTransactions, setRecentTransactions] = useState<RecentTransaction[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkUser()
    loadBillingData()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
    }
  }

  const loadBillingData = async () => {
    // Mock data - will be replaced with Supabase query
    setSubscription({
      id: '1',
      plan: 'Pro',
      status: 'active',
      next_billing_date: '2024-02-20',
      amount: 59900
    })

    setRecentTransactions([
      {
        id: '1',
        date: '2024-01-20',
        description: 'Pro 플랜 - 월간 결제',
        amount: 59900,
        status: 'completed'
      },
      {
        id: '2',
        date: '2024-01-15',
        description: 'Python 기초부터 실무까지',
        amount: 79000,
        status: 'completed'
      },
      {
        id: '3',
        date: '2023-12-20',
        description: 'Pro 플랜 - 월간 결제',
        amount: 59900,
        status: 'completed'
      }
    ])

    setLoading(false)
  }

  const handleCancelSubscription = async () => {
    if (confirm('구독을 취소하시겠습니까? 다음 결제일까지 서비스를 이용하실 수 있습니다.')) {
      // Handle subscription cancellation
      alert('구독이 취소되었습니다.')
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
          <h1 className="text-2xl font-bold text-gray-900 mb-8">결제 관리</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Current Subscription */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">현재 구독</h2>
                
                {subscription ? (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{subscription.plan} 플랜</h3>
                        <p className="text-sm text-gray-600">
                          다음 결제일: {new Date(subscription.next_billing_date).toLocaleDateString('ko-KR')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">
                          ₩{subscription.amount.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600">/월</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        subscription.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {subscription.status === 'active' ? '활성' : '취소됨'}
                      </span>
                      
                      <div className="space-x-2">
                        <Link
                          href="/billing/subscription"
                          className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                        >
                          플랜 변경
                        </Link>
                        {subscription.status === 'active' && (
                          <button
                            onClick={handleCancelSubscription}
                            className="text-red-600 hover:text-red-700 font-medium text-sm ml-4"
                          >
                            구독 취소
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">활성화된 구독이 없습니다.</p>
                    <Link
                      href="/billing/subscription"
                      className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      구독 시작하기
                    </Link>
                  </div>
                )}
              </div>

              {/* Recent Transactions */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">최근 거래 내역</h2>
                  <Link
                    href="/billing/history"
                    className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                  >
                    전체 보기 →
                  </Link>
                </div>

                <div className="space-y-3">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                      <div>
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(transaction.date).toLocaleDateString('ko-KR')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          ₩{transaction.amount.toLocaleString()}
                        </p>
                        <span className={`text-xs ${
                          transaction.status === 'completed' ? 'text-green-600' : 'text-gray-600'
                        }`}>
                          {transaction.status === 'completed' ? '완료' : '대기중'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">결제 수단</h2>
                  <Link
                    href="/billing/methods"
                    className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                  >
                    관리 →
                  </Link>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-12 h-8 bg-gray-200 rounded mr-3"></div>
                      <div>
                        <p className="font-medium text-gray-900">•••• •••• •••• 1234</p>
                        <p className="text-sm text-gray-600">만료: 12/25</p>
                      </div>
                    </div>
                    <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-medium">
                      기본
                    </span>
                  </div>
                </div>

                <button className="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg font-medium transition-colors">
                  새 결제 수단 추가
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">빠른 메뉴</h3>
                <div className="space-y-2">
                  <Link
                    href="/billing/history"
                    className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-700"
                  >
                    결제 내역
                  </Link>
                  <Link
                    href="/billing/subscription"
                    className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-700"
                  >
                    구독 관리
                  </Link>
                  <Link
                    href="/billing/methods"
                    className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-700"
                  >
                    결제 수단
                  </Link>
                  <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-700">
                    영수증 다운로드
                  </button>
                </div>
              </div>

              {/* Billing Support */}
              <div className="bg-gray-100 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">결제 관련 문의</h3>
                <p className="text-sm text-gray-600 mb-4">
                  결제 관련 문제나 문의사항이 있으신가요?
                </p>
                <button className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full">
                  고객 지원 문의
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}