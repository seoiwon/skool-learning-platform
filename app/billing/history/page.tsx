'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Header from '@/components/Header'
import Link from 'next/link'

interface Transaction {
  id: string
  date: string
  description: string
  amount: number
  status: 'completed' | 'pending' | 'failed' | 'refunded'
  type: 'subscription' | 'course' | 'refund'
  invoice_url?: string
}

export default function BillingHistoryPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'subscription' | 'course' | 'refund'>('all')
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  })
  const router = useRouter()

  useEffect(() => {
    checkUser()
    loadTransactions()
  }, [])

  useEffect(() => {
    filterTransactions()
  }, [transactions, filter, dateRange])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
    }
  }

  const loadTransactions = async () => {
    // Mock data - will be replaced with Supabase query
    const mockTransactions: Transaction[] = [
      {
        id: '1',
        date: '2024-01-20',
        description: 'Pro 플랜 - 월간 결제',
        amount: 59900,
        status: 'completed',
        type: 'subscription',
        invoice_url: '#'
      },
      {
        id: '2',
        date: '2024-01-15',
        description: 'Python 기초부터 실무까지',
        amount: 79000,
        status: 'completed',
        type: 'course',
        invoice_url: '#'
      },
      {
        id: '3',
        date: '2024-01-10',
        description: '머신러닝 입문',
        amount: 99000,
        status: 'completed',
        type: 'course',
        invoice_url: '#'
      },
      {
        id: '4',
        date: '2023-12-20',
        description: 'Pro 플랜 - 월간 결제',
        amount: 59900,
        status: 'completed',
        type: 'subscription',
        invoice_url: '#'
      },
      {
        id: '5',
        date: '2023-12-15',
        description: '자연어처리(NLP) 마스터 - 환불',
        amount: -149000,
        status: 'refunded',
        type: 'refund'
      },
      {
        id: '6',
        date: '2023-12-10',
        description: '자연어처리(NLP) 마스터',
        amount: 149000,
        status: 'completed',
        type: 'course',
        invoice_url: '#'
      }
    ]
    setTransactions(mockTransactions)
    setLoading(false)
  }

  const filterTransactions = () => {
    let filtered = transactions

    // Filter by type
    if (filter !== 'all') {
      filtered = filtered.filter(t => t.type === filter)
    }

    // Filter by date range
    if (dateRange.start) {
      filtered = filtered.filter(t => new Date(t.date) >= new Date(dateRange.start))
    }
    if (dateRange.end) {
      filtered = filtered.filter(t => new Date(t.date) <= new Date(dateRange.end))
    }

    setFilteredTransactions(filtered)
  }

  const getStatusBadge = (status: Transaction['status']) => {
    const styles = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800',
      refunded: 'bg-gray-100 text-gray-800'
    }
    const labels = {
      completed: '완료',
      pending: '대기중',
      failed: '실패',
      refunded: '환불됨'
    }
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    )
  }

  const exportToCSV = () => {
    // Implement CSV export functionality
    alert('결제 내역을 CSV 파일로 다운로드합니다.')
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
          <div className="mb-8">
            <Link href="/billing" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium mb-4 inline-block">
              ← 결제 관리로 돌아가기
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">결제 내역</h1>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">거래 유형</label>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">전체</option>
                  <option value="subscription">구독</option>
                  <option value="course">강의</option>
                  <option value="refund">환불</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">시작일</label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">종료일</label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={exportToCSV}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  CSV 내보내기
                </button>
              </div>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      날짜
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      설명
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      유형
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      상태
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      금액
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      영수증
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(transaction.date).toLocaleDateString('ko-KR')}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {transaction.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {transaction.type === 'subscription' && '구독'}
                        {transaction.type === 'course' && '강의'}
                        {transaction.type === 'refund' && '환불'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(transaction.status)}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-right ${
                        transaction.amount < 0 ? 'text-red-600' : 'text-gray-900'
                      }`}>
                        {transaction.amount < 0 ? '-' : ''}₩{Math.abs(transaction.amount).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {transaction.invoice_url && transaction.status === 'completed' && (
                          <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                            다운로드
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredTransactions.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">거래 내역이 없습니다.</p>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-sm text-gray-600 mb-1">총 거래 건수</p>
                <p className="text-2xl font-bold text-gray-900">{filteredTransactions.length}건</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">총 결제 금액</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₩{filteredTransactions
                    .filter(t => t.amount > 0)
                    .reduce((sum, t) => sum + t.amount, 0)
                    .toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">총 환불 금액</p>
                <p className="text-2xl font-bold text-red-600">
                  ₩{Math.abs(
                    filteredTransactions
                      .filter(t => t.amount < 0)
                      .reduce((sum, t) => sum + t.amount, 0)
                  ).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}