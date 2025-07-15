'use client'

import { useState, useEffect } from 'react'
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

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const { data: coursesData, error } = await supabase
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
          thumbnail,
          created_at
        `)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('강의 목록 조회 실패:', error)
        setCourses([])
        return
      }

      // Supabase 데이터를 Course 인터페이스에 맞게 변환
      const formattedCourses: Course[] = coursesData.map(course => ({
        id: course.id,
        title: course.title,
        description: course.description,
        category: course.category,
        level: course.level,
        duration: course.duration || '',
        lessons: course.lessons_count || 0,
        students: course.students_count || 0,
        rating: course.rating || 0,
        price: course.price,
        instructor: course.instructor,
        thumbnail: course.thumbnail || '',
        objectives: [], // 필요시 별도 쿼리로 조회
        requirements: [], // 필요시 별도 쿼리로 조회
        curriculum: [] // 필요시 별도 쿼리로 조회
      }))

      setCourses(formattedCourses)
    } catch (error) {
      console.error('예상치 못한 오류:', error)
      setCourses([])
    } finally {
      setLoading(false)
    }
  }

  const deleteCourse = async (courseId: string) => {
    if (confirm('정말로 이 강의를 삭제하시겠습니까?')) {
      try {
        const { error } = await supabase
          .from('courses')
          .delete()
          .eq('id', courseId)

        if (error) {
          console.error('강의 삭제 실패:', error)
          alert('강의 삭제에 실패했습니다: ' + error.message)
          return
        }

        // 성공적으로 삭제되면 로컬 상태도 업데이트
        setCourses(courses.filter(course => course.id !== courseId))
        alert('강의가 성공적으로 삭제되었습니다.')
      } catch (error) {
        console.error('예상치 못한 오류:', error)
        alert('강의 삭제 중 오류가 발생했습니다.')
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">강의 관리</h1>
        <Link
          href="/admin/courses/new"
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          새 강의 등록
        </Link>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  강의명
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  카테고리
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  레벨
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  가격
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  수강생
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  평점
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  작업
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded bg-gray-700"></div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">{course.title}</div>
                        <div className="text-sm text-gray-400">{course.instructor}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">
                      {course.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {course.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    ₩{course.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {course.students.toLocaleString()}명
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    ★ {course.rating}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link
                        href={`/admin/courses/${course.id}/edit`}
                        className="text-emerald-400 hover:text-emerald-300"
                      >
                        수정
                      </Link>
                      <button
                        onClick={() => deleteCourse(course.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {courses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">등록된 강의가 없습니다.</p>
        </div>
      )}
    </div>
  )
}