'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Header from '@/components/Header'
import Link from 'next/link'

interface Course {
  id: string
  title: string
  description: string
  thumbnail: string
  progress: number
  total_lessons: number
  completed_lessons: number
  last_accessed: string
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkUser()
    fetchCourses()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
    } else {
      setUser(user)
    }
  }

  const fetchCourses = async () => {
    // Mock data for now - will be replaced with actual Supabase query
    const mockCourses: Course[] = [
      {
        id: '1',
        title: 'Python 기초부터 실무까지',
        description: 'Python 프로그래밍의 기초부터 실무 활용까지 단계별로 학습합니다.',
        thumbnail: '/course-python.jpg',
        progress: 65,
        total_lessons: 24,
        completed_lessons: 16,
        last_accessed: '2024-01-20'
      },
      {
        id: '2',
        title: '머신러닝 입문',
        description: '머신러닝의 기본 개념과 주요 알고리즘을 실습과 함께 배웁니다.',
        thumbnail: '/course-ml.jpg',
        progress: 30,
        total_lessons: 30,
        completed_lessons: 9,
        last_accessed: '2024-01-19'
      },
      {
        id: '3',
        title: '자연어처리(NLP) 마스터',
        description: '최신 NLP 기술과 트랜스포머 모델을 활용한 실전 프로젝트',
        thumbnail: '/course-nlp.jpg',
        progress: 0,
        total_lessons: 20,
        completed_lessons: 0,
        last_accessed: '2024-01-15'
      }
    ]
    setCourses(mockCourses)
    setLoading(false)
  }

  const calculateTotalProgress = () => {
    if (courses.length === 0) return 0
    const totalProgress = courses.reduce((acc, course) => acc + course.progress, 0)
    return Math.round(totalProgress / courses.length)
  }

  const getRecentActivity = () => {
    return courses
      .filter(course => course.progress > 0)
      .sort((a, b) => new Date(b.last_accessed).getTime() - new Date(a.last_accessed).getTime())
      .slice(0, 3)
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
          {/* Welcome Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              안녕하세요, {user?.email?.split('@')[0]}님! 👋
            </h1>
            <p className="text-gray-600">오늘도 함께 성장해요!</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">전체 진도율</p>
                  <p className="text-2xl font-bold text-gray-900">{calculateTotalProgress()}%</p>
                </div>
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">수강 중인 강의</p>
                  <p className="text-2xl font-bold text-gray-900">{courses.filter(c => c.progress > 0).length}개</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">완료한 강의</p>
                  <p className="text-2xl font-bold text-gray-900">{courses.filter(c => c.progress === 100).length}개</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">학습 일수</p>
                  <p className="text-2xl font-bold text-gray-900">15일</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* My Courses Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">내 강의</h2>
              <Link href="/courses" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                전체 보기 →
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-48 bg-gray-200 relative">
                    {/* Placeholder for course thumbnail */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{course.description}</p>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">진도율</span>
                        <span className="text-gray-900 font-medium">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        {course.completed_lessons}/{course.total_lessons} 완료
                      </span>
                      <Link 
                        href={`/courses/${course.id}/learn`}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        {course.progress === 0 ? '시작하기' : '이어하기'}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">최근 학습 활동</h2>
            <div className="bg-white rounded-lg shadow-sm">
              {getRecentActivity().length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {getRecentActivity().map((course) => (
                    <div key={course.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">{course.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            마지막 학습: {new Date(course.last_accessed).toLocaleDateString('ko-KR')}
                          </p>
                        </div>
                        <Link 
                          href={`/courses/${course.id}/learn`}
                          className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                        >
                          이어하기 →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-gray-600">아직 학습 기록이 없습니다.</p>
                  <Link href="/courses" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium mt-2 inline-block">
                    강의 둘러보기 →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}