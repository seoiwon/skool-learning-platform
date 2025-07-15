'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Link from 'next/link'
import { checkPaymentStatus } from '@/lib/payment/payple'

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [paymentInfo, setPaymentInfo] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const orderId = searchParams.get('orderId')

  useEffect(() => {
    if (orderId) {
      verifyPayment()
    } else {
      setError('주문번호가 없습니다.')
      setLoading(false)
    }
  }, [orderId])

  const verifyPayment = async () => {
    try {
      const result = await checkPaymentStatus(orderId!)
      
      if (result.success) {
        setPaymentInfo(result.data)
      } else {
        setError(result.message || '결제 확인에 실패했습니다.')
      }
    } catch (error) {
      console.error('결제 확인 오류:', error)
      setError('결제 상태 확인 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">결제 확인 중...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-20 pb-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {error ? (
            // 오류 화면
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">결제 확인 실패</h1>
              <p className="text-gray-600 mb-6">{error}</p>
              <div className="space-x-4">
                <Link
                  href="/courses"
                  className="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
                >
                  강의 목록으로
                </Link>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-colors"
                >
                  대시보드로
                </Link>
              </div>
            </div>
          ) : (
            // 성공 화면
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-4">결제가 완료되었습니다!</h1>
              <p className="text-gray-600 mb-6">강의 수강이 정상적으로 등록되었습니다.</p>
              
              {paymentInfo && (
                <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
                  <h2 className="font-semibold text-gray-900 mb-4">결제 정보</h2>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">주문번호:</span>
                      <span className="font-medium">{orderId}</span>
                    </div>
                    {paymentInfo.courseName && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">강의명:</span>
                        <span className="font-medium">{paymentInfo.courseName}</span>
                      </div>
                    )}
                    {paymentInfo.amount && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">결제금액:</span>
                        <span className="font-medium">₩{paymentInfo.amount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">결제일시:</span>
                      <span className="font-medium">{new Date().toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="space-x-4">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-colors"
                >
                  내 강의 보기
                </Link>
                <Link
                  href="/courses"
                  className="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
                >
                  다른 강의 보기
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}