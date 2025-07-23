'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import VideoPlayer from '@/components/VideoPlayer'
import Header from '@/components/Header'
import CourseMaterials from '@/components/CourseMaterials'

interface Course {
  id: string
  title: string
  description: string
  price: number
}

interface PaymentInfo {
  payment_status: string
  created_at: string
  amount: number
}

export default function CourseLearningPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  
  const [course, setCourse] = useState<Course | null>(null)
  const [hasAccess, setHasAccess] = useState<boolean>(false)
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const [showMaterials, setShowMaterials] = useState(false)

  useEffect(() => {
    if (user && params.id) {
      initializePage()
    } else if (!user) {
      router.push('/login')
    }
  }, [user, params.id])

  const initializePage = async () => {
    try {
      await Promise.all([
        fetchCourseInfo(),
        checkAccess()
      ])
    } catch (error) {
      console.error('페이지 초기화 실패:', error)
      setError('페이지를 로드하는 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const fetchCourseInfo = async () => {
    const { data: courseData, error: courseError } = await supabase
      .from('courses')
      .select('id, title, description, price')
      .eq('id', params.id)
      .single()

    if (courseError) {
      console.error('강의 정보 조회 실패:', courseError)
      setError('강의 정보를 찾을 수 없습니다.')
      return
    }

    setCourse(courseData)
  }

  const checkAccess = async () => {
    if (!user) return

    try {
      const { data: enrollment, error } = await supabase
        .from('course_enrollments')
        .select(`
          payment_id,
          payments!inner (
            payment_status,
            created_at,
            amount
          )
        `)
        .eq('user_id', user.id)
        .eq('course_id', params.id)
        .eq('payments.payment_status', 'completed')
        .single()

      if (error || !enrollment) {
        setError('이 강의에 대한 접근 권한이 없습니다. 먼저 수강 신청을 해주세요.')
        setHasAccess(false)
        return
      }

      const payment = enrollment.payments as unknown as PaymentInfo
      const paymentDate = new Date(payment.created_at)
      const sixMonthsAgo = new Date()
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

      if (paymentDate < sixMonthsAgo) {
        setError('강의 수강 기간이 만료되었습니다. (결제일로부터 6개월)')
        setHasAccess(false)
        return
      }

      setPaymentInfo(payment)
      setHasAccess(true)
    } catch (error) {
      console.error('접근 권한 확인 실패:', error)
      setError('접근 권한을 확인하는 중 오류가 발생했습니다.')
      setHasAccess(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">강의를 로딩하는 중...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !hasAccess) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-20 pb-10">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <div className="text-red-600 text-lg font-medium mb-2">접근 제한</div>
              <p className="text-red-700 mb-4">{error}</p>
              <div className="space-x-4">
                <button
                  onClick={() => router.push(`/courses/${params.id}`)}
                  className="bg-emerald-500 text-white px-6 py-2 rounded-md hover:bg-emerald-600 transition-colors"
                >
                  강의 상세로 이동
                </button>
                <button
                  onClick={() => router.push('/dashboard')}
                  className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors"
                >
                  대시보드로 이동
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4">
          {/* 강의 헤더 */}
          <div className="mb-6">
            <button
              onClick={() => router.push('/dashboard')}
              className="flex items-center text-gray-600 hover:text-gray-800 mb-4 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              내 강의실로 돌아가기
            </button>
            
            {course && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h1>
                <p className="text-gray-600">{course.description}</p>
                
                {paymentInfo && (
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-green-700 bg-green-100 px-3 py-1 rounded-full">
                      ✅ 수강 중 (₩{paymentInfo.amount.toLocaleString()})
                    </span>
                    <span className="text-gray-600">
                      수강 기간: {new Date(paymentInfo.created_at).toLocaleDateString()} ~ {
                        new Date(new Date(paymentInfo.created_at).setMonth(new Date(paymentInfo.created_at).getMonth() + 6)).toLocaleDateString()
                      }
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 비디오 플레이어 */}
          <div className="mb-8">
            <VideoPlayer courseId={params.id as string} />
          </div>

          {/* 학습 진도 및 기타 정보 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">학습 진도율</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">전체 진도</span>
                    <span className="text-gray-900 font-medium">0%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                  <p className="text-sm text-gray-600">학습을 완료하면 수료증을 발급받을 수 있습니다.</p>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">학습 도구</h3>
                <div className="space-y-3">
                  <button 
                    onClick={() => setShowMaterials(true)}
                    className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    📝 강의 자료
                  </button>
                  <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                    ❓ 질문하기
                  </button>
                  <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                    📊 학습 통계
                  </button>
                  <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                    🏆 수료증 다운로드
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 강의 자료 모달 */}
        {showMaterials && (
          <CourseMaterials 
            courseId={params.id as string}
            onClose={() => setShowMaterials(false)}
          />
        )}
      </div>
    </div>
  )
}