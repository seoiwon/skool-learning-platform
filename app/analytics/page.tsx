'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Header from '@/components/Header'

interface LearningStats {
  totalHours: number
  completedCourses: number
  currentStreak: number
  longestStreak: number
  totalLessons: number
  averageScore: number
}

interface WeeklyActivity {
  day: string
  hours: number
}

interface CourseProgress {
  id: string
  title: string
  progress: number
  hoursSpent: number
  lastAccessed: string
}

export default function AnalyticsPage() {
  const [stats, setStats] = useState<LearningStats>({
    totalHours: 0,
    completedCourses: 0,
    currentStreak: 0,
    longestStreak: 0,
    totalLessons: 0,
    averageScore: 0
  })
  const [weeklyActivity, setWeeklyActivity] = useState<WeeklyActivity[]>([])
  const [courseProgress, setCourseProgress] = useState<CourseProgress[]>([])
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week')
  const router = useRouter()

  useEffect(() => {
    checkUser()
    loadAnalytics()
  }, [timeRange])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
    }
  }

  const loadAnalytics = async () => {
    // Mock data - will be replaced with Supabase query
    setStats({
      totalHours: 127,
      completedCourses: 3,
      currentStreak: 5,
      longestStreak: 15,
      totalLessons: 89,
      averageScore: 87.5
    })

    setWeeklyActivity([
      { day: '월', hours: 2.5 },
      { day: '화', hours: 3.0 },
      { day: '수', hours: 1.5 },
      { day: '목', hours: 2.0 },
      { day: '금', hours: 4.0 },
      { day: '토', hours: 5.0 },
      { day: '일', hours: 3.5 }
    ])

    setCourseProgress([
      {
        id: '1',
        title: 'Python 기초부터 실무까지',
        progress: 65,
        hoursSpent: 24.5,
        lastAccessed: '2024-01-20'
      },
      {
        id: '2',
        title: '머신러닝 입문',
        progress: 30,
        hoursSpent: 12.0,
        lastAccessed: '2024-01-19'
      },
      {
        id: '3',
        title: '자연어처리(NLP) 마스터',
        progress: 100,
        hoursSpent: 45.0,
        lastAccessed: '2024-01-15'
      }
    ])

    setLoading(false)
  }

  const getMaxHours = () => {
    return Math.max(...weeklyActivity.map(day => day.hours))
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
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">학습 분석</h1>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="week">이번 주</option>
              <option value="month">이번 달</option>
              <option value="year">올해</option>
            </select>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600">총 학습 시간</span>
              </div>
              <p className="text-3xl font-bold text-gray-900">{stats.totalHours}시간</p>
              <p className="text-sm text-gray-600 mt-1">+12% 지난주 대비</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600">완료한 강의</span>
              </div>
              <p className="text-3xl font-bold text-gray-900">{stats.completedCourses}개</p>
              <p className="text-sm text-gray-600 mt-1">이번 달 +1</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600">현재 연속 학습</span>
              </div>
              <p className="text-3xl font-bold text-gray-900">{stats.currentStreak}일</p>
              <p className="text-sm text-gray-600 mt-1">최고 기록: {stats.longestStreak}일</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600">평균 점수</span>
              </div>
              <p className="text-3xl font-bold text-gray-900">{stats.averageScore}점</p>
              <p className="text-sm text-gray-600 mt-1">상위 15%</p>
            </div>
          </div>

          {/* Weekly Activity Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">주간 학습 활동</h2>
            <div className="relative">
              <div className="flex items-end justify-between h-64 space-x-2">
                {weeklyActivity.map((day, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-gray-200 rounded-t relative" style={{ height: '200px' }}>
                      <div 
                        className="absolute bottom-0 w-full bg-emerald-500 rounded-t transition-all duration-300"
                        style={{ height: `${(day.hours / getMaxHours()) * 100}%` }}
                      >
                        <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-700">
                          {day.hours}h
                        </span>
                      </div>
                    </div>
                    <span className="mt-2 text-sm text-gray-600">{day.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Course Progress */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">강의별 진도</h2>
              <div className="space-y-4">
                {courseProgress.map((course) => (
                  <div key={course.id}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">{course.title}</h3>
                        <p className="text-sm text-gray-600">
                          {course.hoursSpent}시간 학습 · 마지막 학습: {new Date(course.lastAccessed).toLocaleDateString('ko-KR')}
                        </p>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">학습 목표</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-emerald-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-900">주 20시간 학습</span>
                  </div>
                  <span className="text-sm text-emerald-600 font-medium">달성!</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-900">월 4개 강의 완료</span>
                  </div>
                  <span className="text-sm text-gray-600">3/4</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="text-gray-900">30일 연속 학습</span>
                  </div>
                  <span className="text-sm text-gray-600">5/30</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium text-gray-900 mb-3">추천 학습 팁</h3>
                <p className="text-sm text-gray-600">
                  현재 오후 시간대에 학습 효율이 가장 높습니다. 
                  이 시간대를 활용해 더 깊이 있는 학습을 시도해보세요!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}