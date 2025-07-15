'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { requestPaymentLink, PaymentRequest } from '@/lib/payment/payple'

interface Course {
  id: string
  title: string
  description: string
  category: string
  level: string
  duration: string
  lessons: number
  students: number
  rating: number
  price: number
  instructor: string
  thumbnail: string
  objectives: string[]
  requirements: string[]
  curriculum: Section[]
}

interface Section {
  id: string
  title: string
  lessons: Lesson[]
}

interface Lesson {
  id: string
  title: string
  duration: string
  preview: boolean
}

export default function CourseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [enrolled, setEnrolled] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [paymentLoading, setPaymentLoading] = useState(false)

  useEffect(() => {
    fetchCourseDetails()
    checkEnrollment()
    
    // Save current scroll position before leaving
    const handleBeforeUnload = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString())
    }
    
    window.addEventListener('beforeunload', handleBeforeUnload)
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [params.id])

  const fetchCourseDetails = async () => {
    try {
      // 1. 강의 기본 정보 조회
      const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .select(`
          id,
          title,
          description,
          category,
          level,
          duration,
          lessons_count,
          students_count,
          rating,
          price,
          instructor,
          thumbnail
        `)
        .eq('id', params.id)
        .single()

      if (courseError) {
        console.error('강의 정보 조회 실패:', courseError)
        setCourse(null)
        return
      }

      // 2. 학습 목표 조회
      const { data: objectivesData } = await supabase
        .from('course_objectives')
        .select('objective')
        .eq('course_id', params.id)
        .order('order_index')

      // 3. 수강 요구사항 조회
      const { data: requirementsData } = await supabase
        .from('course_requirements')
        .select('requirement')
        .eq('course_id', params.id)
        .order('order_index')

      // 4. 커리큘럼 조회 (섹션과 레슨)
      const { data: sectionsData } = await supabase
        .from('course_sections')
        .select(`
          id,
          title,
          order_index,
          course_lessons (
            id,
            title,
            duration,
            preview,
            order_index
          )
        `)
        .eq('course_id', params.id)
        .order('order_index')

      // 데이터 변환
      const objectives = objectivesData?.map(item => item.objective) || []
      const requirements = requirementsData?.map(item => item.requirement) || []
      
      const curriculum: Section[] = sectionsData?.map(section => ({
        id: section.id,
        title: section.title,
        lessons: (section.course_lessons || [])
          .sort((a: any, b: any) => a.order_index - b.order_index)
          .map((lesson: any) => ({
            id: lesson.id,
            title: lesson.title,
            duration: lesson.duration,
            preview: lesson.preview
          }))
      })) || []

      const course: Course = {
        id: courseData.id,
        title: courseData.title,
        description: courseData.description,
        category: courseData.category,
        level: courseData.level,
        duration: courseData.duration || '',
        lessons: courseData.lessons_count || 0,
        students: courseData.students_count || 0,
        rating: courseData.rating || 0,
        price: courseData.price,
        instructor: courseData.instructor,
        thumbnail: courseData.thumbnail || '/default-course.jpg',
        objectives,
        requirements,
        curriculum
      }

      setCourse(course)
    } catch (error) {
      console.error('예상치 못한 오류:', error)
      setCourse(null)
    } finally {
      setLoading(false)
    }
  }

  const checkEnrollment = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      // Check if user is enrolled in this course
      // Mock for now
      setEnrolled(false)
    }
  }

  const handleEnroll = async () => {
    if (paymentLoading) return

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }

    if (!course) return

    setPaymentLoading(true)

    try {
      // 사용자 프로필 정보 가져오기
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('full_name, email')
        .eq('id', user.id)
        .single()

      // 결제 요청 데이터 준비
      const paymentData: PaymentRequest = {
        courseId: course.id,
        userId: user.id,
        amount: course.price,
        courseName: course.title,
        customerName: profile?.full_name || user.email?.split('@')[0] || '사용자',
        customerEmail: user.email || '',
        customerPhone: ''
      }

      // Payple 결제 링크 생성 요청
      const paymentResult = await requestPaymentLink(paymentData)

      if (paymentResult.success && paymentResult.paymentUrl) {
        // 결제 페이지로 이동
        window.location.href = paymentResult.paymentUrl
      } else {
        alert(paymentResult.message || '결제 링크 생성에 실패했습니다. 다시 시도해주세요.')
      }
    } catch (error) {
      console.error('결제 오류:', error)
      alert('결제 중 오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setPaymentLoading(false)
    }
  }

  if (loading || !course) {
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
      
      <div className="pt-20">
        {/* Course Header */}
        <div className="bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Back Button */}
            <button
              onClick={() => {
                // Save current scroll position
                sessionStorage.setItem('scrollPosition', window.scrollY.toString())
                router.back()
              }}
              className="flex items-center text-gray-300 hover:text-white mb-6 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              뒤로가기
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {course.category}
                  </span>
                  <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {course.level}
                  </span>
                </div>
                
                <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
                <p className="text-gray-300 mb-6">{course.description}</p>
                
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>{course.rating} ({course.students.toLocaleString()}명 수강)</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span>{course.lessons}개 강의</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <p className="text-sm text-gray-300">강사: {course.instructor}</p>
                </div>
              </div>
              
              <div>
                <div className="bg-white text-gray-900 rounded-lg p-6">
                  <div className="aspect-video bg-gray-200 rounded-lg mb-6 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full p-4 transition-colors">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <span className="text-3xl font-bold">₩{course.price.toLocaleString()}</span>
                  </div>
                  
                  {enrolled ? (
                    <Link
                      href={`/courses/${course.id}/learn`}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-medium transition-colors block text-center"
                    >
                      학습 시작하기
                    </Link>
                  ) : (
                    <button
                      onClick={handleEnroll}
                      disabled={paymentLoading}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors"
                    >
                      {paymentLoading ? '결제 진행 중...' : '수강 신청하기'}
                    </button>
                  )}
                  
                  <div className="mt-4 text-sm text-gray-600">
                    <p className="flex items-center mb-2">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      평생 무제한 수강
                    </p>
                    <p className="flex items-center mb-2">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      수료증 발급
                    </p>
                    <p className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      30일 환불 보장
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Tabs */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                강의 소개
              </button>
              <button
                onClick={() => setActiveTab('curriculum')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'curriculum'
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                커리큘럼
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'reviews'
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                수강평
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">학습 목표</h2>
                  <ul className="space-y-2">
                    {course.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-emerald-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">수강 대상</h2>
                  <ul className="space-y-2">
                    {course.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-700">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">강사 소개</h2>
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{course.instructor}</h3>
                      <p className="text-sm text-gray-600">Python 전문가</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm">
                    10년 이상의 Python 개발 경험을 보유한 전문가입니다. 
                    대기업과 스타트업에서 다양한 프로젝트를 진행했으며, 
                    실무에서 바로 활용할 수 있는 지식을 전달합니다.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'curriculum' && (
            <div className="bg-white rounded-lg shadow-sm">
              {course.curriculum.map((section, index) => (
                <div key={section.id} className="border-b last:border-b-0">
                  <div className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      섹션 {index + 1}: {section.title}
                    </h3>
                    <div className="space-y-3">
                      {section.lessons.map((lesson) => (
                        <div key={lesson.id} className="flex items-center justify-between py-2">
                          <div className="flex items-center">
                            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-700">{lesson.title}</span>
                            {lesson.preview && (
                              <span className="ml-2 bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs">
                                미리보기
                              </span>
                            )}
                          </div>
                          <span className="text-sm text-gray-500">{lesson.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-center py-12">
                <p className="text-gray-500">아직 수강평이 없습니다.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}