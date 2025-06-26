'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

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

  useEffect(() => {
    fetchCourseDetails()
    checkEnrollment()
  }, [params.id])

  const fetchCourseDetails = async () => {
    // Mock data - will be replaced with Supabase query
    const mockCourse: Course = {
      id: params.id as string,
      title: 'Python 기초부터 실무까지',
      description: 'Python 프로그래밍의 기초부터 실무 활용까지 단계별로 학습하는 종합 과정입니다. 변수, 함수, 클래스 등 기본 개념부터 웹 스크래핑, 데이터 분석, 자동화까지 다양한 실무 프로젝트를 통해 Python을 마스터할 수 있습니다.',
      category: '프로그래밍',
      level: '입문',
      duration: '8주',
      lessons: 24,
      students: 1250,
      rating: 4.8,
      price: 79000,
      instructor: '김파이썬',
      thumbnail: '/course-python.jpg',
      objectives: [
        'Python 기본 문법과 프로그래밍 개념 이해',
        '함수, 클래스를 활용한 객체지향 프로그래밍',
        '파일 처리, 예외 처리 등 실무 필수 기능',
        '웹 스크래핑을 통한 데이터 수집',
        'Pandas, NumPy를 활용한 데이터 분석',
        '업무 자동화 프로그램 개발'
      ],
      requirements: [
        '프로그래밍 경험이 없어도 수강 가능',
        'Windows, Mac, Linux 중 하나의 운영체제',
        '학습에 대한 열정과 의지'
      ],
      curriculum: [
        {
          id: '1',
          title: 'Python 시작하기',
          lessons: [
            { id: '1-1', title: 'Python 소개와 설치', duration: '15:00', preview: true },
            { id: '1-2', title: '첫 번째 프로그램 작성하기', duration: '20:00', preview: true },
            { id: '1-3', title: '변수와 자료형', duration: '25:00', preview: false },
            { id: '1-4', title: '연산자와 표현식', duration: '30:00', preview: false }
          ]
        },
        {
          id: '2',
          title: '제어문과 함수',
          lessons: [
            { id: '2-1', title: '조건문 if, elif, else', duration: '25:00', preview: false },
            { id: '2-2', title: '반복문 for, while', duration: '30:00', preview: false },
            { id: '2-3', title: '함수 정의와 호출', duration: '35:00', preview: false },
            { id: '2-4', title: '람다 함수와 고급 함수', duration: '40:00', preview: false }
          ]
        },
        {
          id: '3',
          title: '객체지향 프로그래밍',
          lessons: [
            { id: '3-1', title: '클래스와 객체', duration: '30:00', preview: false },
            { id: '3-2', title: '상속과 다형성', duration: '35:00', preview: false },
            { id: '3-3', title: '캡슐화와 추상화', duration: '30:00', preview: false }
          ]
        }
      ]
    }
    setCourse(mockCourse)
    setLoading(false)
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
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }
    // Handle enrollment logic
    router.push(`/billing?course=${params.id}`)
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
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-medium transition-colors"
                    >
                      수강 신청하기
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