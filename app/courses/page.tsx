'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Link from 'next/link'

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
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  const categories = ['all', '프로그래밍', 'AI/ML', '데이터분석', '웹개발', '모바일', '보안']
  const levels = ['all', '입문', '초급', '중급', '고급']

  useEffect(() => {
    fetchCourses()
  }, [])

  useEffect(() => {
    filterCourses()
  }, [courses, selectedCategory, selectedLevel, searchQuery])

  const fetchCourses = async () => {
    // Mock data - will be replaced with Supabase query
    const mockCourses: Course[] = [
      {
        id: '1',
        title: 'Python 기초부터 실무까지',
        description: 'Python 프로그래밍의 기초부터 실무 활용까지 단계별로 학습합니다.',
        category: '프로그래밍',
        level: '입문',
        duration: '8주',
        lessons: 24,
        students: 1250,
        rating: 4.8,
        price: 79000,
        instructor: '김파이썬',
        thumbnail: '/course-python.jpg'
      },
      {
        id: '2',
        title: '머신러닝 입문',
        description: '머신러닝의 기본 개념과 주요 알고리즘을 실습과 함께 배웁니다.',
        category: 'AI/ML',
        level: '초급',
        duration: '10주',
        lessons: 30,
        students: 890,
        rating: 4.7,
        price: 99000,
        instructor: '이머신',
        thumbnail: '/course-ml.jpg'
      },
      {
        id: '3',
        title: '자연어처리(NLP) 마스터',
        description: '최신 NLP 기술과 트랜스포머 모델을 활용한 실전 프로젝트',
        category: 'AI/ML',
        level: '고급',
        duration: '12주',
        lessons: 20,
        students: 456,
        rating: 4.9,
        price: 149000,
        instructor: '박NLP',
        thumbnail: '/course-nlp.jpg'
      },
      {
        id: '4',
        title: 'React로 만드는 웹 애플리케이션',
        description: 'React 기초부터 실전 프로젝트까지 완벽 마스터',
        category: '웹개발',
        level: '중급',
        duration: '8주',
        lessons: 32,
        students: 2100,
        rating: 4.6,
        price: 89000,
        instructor: '최리액트',
        thumbnail: '/course-react.jpg'
      },
      {
        id: '5',
        title: '데이터 분석 with Python',
        description: 'Pandas, NumPy를 활용한 실무 데이터 분석',
        category: '데이터분석',
        level: '초급',
        duration: '6주',
        lessons: 18,
        students: 1560,
        rating: 4.7,
        price: 69000,
        instructor: '정데이터',
        thumbnail: '/course-data.jpg'
      },
      {
        id: '6',
        title: 'iOS 앱 개발 완성',
        description: 'Swift를 활용한 iOS 앱 개발 A to Z',
        category: '모바일',
        level: '중급',
        duration: '10주',
        lessons: 28,
        students: 780,
        rating: 4.8,
        price: 119000,
        instructor: '강스위프트',
        thumbnail: '/course-ios.jpg'
      }
    ]
    setCourses(mockCourses)
    setLoading(false)
  }

  const filterCourses = () => {
    let filtered = courses

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => course.category === selectedCategory)
    }

    if (selectedLevel !== 'all') {
      filtered = filtered.filter(course => course.level === selectedLevel)
    }

    if (searchQuery) {
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredCourses(filtered)
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
      
      <div className="pt-20">
        {/* Hero Section */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">전체 강의</h1>
            <p className="text-gray-600">최고의 강사진과 함께하는 실무 중심 교육</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="강의 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? '전체 카테고리' : category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">난이도</label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  {levels.map(level => (
                    <option key={level} value={level}>
                      {level === 'all' ? '전체 난이도' : level}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-4">
            <p className="text-gray-600">총 {filteredCourses.length}개의 강의</p>
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-200 relative">
                  {/* Course thumbnail placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-emerald-500 text-white px-2 py-1 rounded text-xs font-medium">
                      {course.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-gray-900 text-white px-2 py-1 rounded text-xs font-medium">
                      {course.level}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                  
                  <div className="flex items-center mb-4 text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="mr-4">{course.duration}</span>
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span>{course.lessons}개 강의</span>
                  </div>

                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < Math.floor(course.rating) ? 'fill-current' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">{course.rating} ({course.students.toLocaleString()}명)</span>
                  </div>

                  <div className="flex items-center justify-between border-t pt-4">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">₩{course.price.toLocaleString()}</span>
                    </div>
                    <Link 
                      href={`/courses/${course.id}`}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      자세히 보기
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">검색 결과가 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}