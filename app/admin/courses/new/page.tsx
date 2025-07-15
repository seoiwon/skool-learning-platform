'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface Lesson {
  id: string
  title: string
  duration: string
  preview: boolean
}

interface Section {
  id: string
  title: string
  lessons: Lesson[]
}

interface CourseFormData {
  title: string
  description: string
  category: string
  level: string
  duration: string
  price: number
  instructor: string
  thumbnail: string
  objectives: string[]
  requirements: string[]
  curriculum: Section[]
}

export default function NewCoursePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<CourseFormData>({
    title: '',
    description: '',
    category: '프로그래밍',
    level: '입문',
    duration: '',
    price: 0,
    instructor: '',
    thumbnail: '',
    objectives: [''],
    requirements: [''],
    curriculum: [
      {
        id: '1',
        title: '',
        lessons: [
          { id: '1-1', title: '', duration: '', preview: false }
        ]
      }
    ]
  })

  const categories = ['프로그래밍', 'AI/ML', '데이터분석', '웹개발', '모바일', '보안']
  const levels = ['입문', '초급', '중급', '고급']

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // 1. 강의 기본 정보 삽입
      const { data: course, error: courseError } = await supabase
        .from('courses')
        .insert({
          title: formData.title,
          description: formData.description,
          category: formData.category,
          level: formData.level,
          duration: formData.duration,
          price: formData.price,
          instructor: formData.instructor,
          thumbnail: formData.thumbnail,
          lessons_count: formData.curriculum.reduce((total, section) => total + section.lessons.length, 0),
          students_count: 0,
          rating: 0.0
        })
        .select()
        .single()

      if (courseError) {
        console.error('강의 생성 실패:', courseError)
        alert('강의 생성에 실패했습니다: ' + courseError.message)
        return
      }

      console.log('강의 생성 성공:', course)

      // 2. 학습 목표 삽입
      if (formData.objectives.filter(obj => obj.trim()).length > 0) {
        const objectivesData = formData.objectives
          .filter(obj => obj.trim())
          .map((objective, index) => ({
            course_id: course.id,
            objective: objective.trim(),
            order_index: index + 1
          }))

        const { error: objectivesError } = await supabase
          .from('course_objectives')
          .insert(objectivesData)

        if (objectivesError) {
          console.error('학습 목표 삽입 실패:', objectivesError)
        }
      }

      // 3. 수강 요구사항 삽입
      if (formData.requirements.filter(req => req.trim()).length > 0) {
        const requirementsData = formData.requirements
          .filter(req => req.trim())
          .map((requirement, index) => ({
            course_id: course.id,
            requirement: requirement.trim(),
            order_index: index + 1
          }))

        const { error: requirementsError } = await supabase
          .from('course_requirements')
          .insert(requirementsData)

        if (requirementsError) {
          console.error('수강 요구사항 삽입 실패:', requirementsError)
        }
      }

      // 4. 커리큘럼 섹션과 레슨 삽입
      for (let i = 0; i < formData.curriculum.length; i++) {
        const section = formData.curriculum[i]
        if (!section.title.trim()) continue

        // 섹션 삽입
        const { data: sectionData, error: sectionError } = await supabase
          .from('course_sections')
          .insert({
            course_id: course.id,
            title: section.title.trim(),
            order_index: i + 1
          })
          .select()
          .single()

        if (sectionError) {
          console.error('섹션 삽입 실패:', sectionError)
          continue
        }

        // 해당 섹션의 레슨들 삽입
        const validLessons = section.lessons.filter(lesson => lesson.title.trim())
        if (validLessons.length > 0) {
          const lessonsData = validLessons.map((lesson, lessonIndex) => ({
            section_id: sectionData.id,
            title: lesson.title.trim(),
            duration: lesson.duration || '0:00',
            preview: lesson.preview,
            order_index: lessonIndex + 1
          }))

          const { error: lessonsError } = await supabase
            .from('course_lessons')
            .insert(lessonsData)

          if (lessonsError) {
            console.error('레슨 삽입 실패:', lessonsError)
          }
        }
      }

      alert('강의가 성공적으로 등록되었습니다!')
      router.push('/admin/courses')
    } catch (error) {
      console.error('예상치 못한 오류:', error)
      alert('강의 등록 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const addObjective = () => {
    setFormData({
      ...formData,
      objectives: [...formData.objectives, '']
    })
  }

  const removeObjective = (index: number) => {
    setFormData({
      ...formData,
      objectives: formData.objectives.filter((_, i) => i !== index)
    })
  }

  const updateObjective = (index: number, value: string) => {
    const newObjectives = [...formData.objectives]
    newObjectives[index] = value
    setFormData({
      ...formData,
      objectives: newObjectives
    })
  }

  const addRequirement = () => {
    setFormData({
      ...formData,
      requirements: [...formData.requirements, '']
    })
  }

  const removeRequirement = (index: number) => {
    setFormData({
      ...formData,
      requirements: formData.requirements.filter((_, i) => i !== index)
    })
  }

  const updateRequirement = (index: number, value: string) => {
    const newRequirements = [...formData.requirements]
    newRequirements[index] = value
    setFormData({
      ...formData,
      requirements: newRequirements
    })
  }

  const addSection = () => {
    const newSectionId = (formData.curriculum.length + 1).toString()
    setFormData({
      ...formData,
      curriculum: [
        ...formData.curriculum,
        {
          id: newSectionId,
          title: '',
          lessons: [
            { id: `${newSectionId}-1`, title: '', duration: '', preview: false }
          ]
        }
      ]
    })
  }

  const removeSection = (sectionIndex: number) => {
    setFormData({
      ...formData,
      curriculum: formData.curriculum.filter((_, i) => i !== sectionIndex)
    })
  }

  const updateSectionTitle = (sectionIndex: number, title: string) => {
    const newCurriculum = [...formData.curriculum]
    newCurriculum[sectionIndex].title = title
    setFormData({
      ...formData,
      curriculum: newCurriculum
    })
  }

  const addLesson = (sectionIndex: number) => {
    const newCurriculum = [...formData.curriculum]
    const section = newCurriculum[sectionIndex]
    const newLessonId = `${section.id}-${section.lessons.length + 1}`
    
    section.lessons.push({
      id: newLessonId,
      title: '',
      duration: '',
      preview: false
    })
    
    setFormData({
      ...formData,
      curriculum: newCurriculum
    })
  }

  const removeLesson = (sectionIndex: number, lessonIndex: number) => {
    const newCurriculum = [...formData.curriculum]
    newCurriculum[sectionIndex].lessons = newCurriculum[sectionIndex].lessons.filter((_, i) => i !== lessonIndex)
    setFormData({
      ...formData,
      curriculum: newCurriculum
    })
  }

  const updateLesson = (sectionIndex: number, lessonIndex: number, field: keyof Lesson, value: string | boolean) => {
    const newCurriculum = [...formData.curriculum]
    newCurriculum[sectionIndex].lessons[lessonIndex] = {
      ...newCurriculum[sectionIndex].lessons[lessonIndex],
      [field]: value
    }
    setFormData({
      ...formData,
      curriculum: newCurriculum
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">새 강의 등록</h1>
        <Link
          href="/admin/courses"
          className="text-gray-300 hover:text-white"
        >
          ← 목록으로 돌아가기
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-6">기본 정보</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                강의명 *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                강사명 *
              </label>
              <input
                type="text"
                required
                value={formData.instructor}
                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                카테고리 *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                난이도 *
              </label>
              <select
                required
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                수강 기간
              </label>
              <input
                type="text"
                placeholder="예: 8주"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                가격 (원) *
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              강의 설명 *
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              썸네일 URL
            </label>
            <input
              type="url"
              value={formData.thumbnail}
              onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Learning Objectives */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-6">학습 목표</h2>
          
          {formData.objectives.map((objective, index) => (
            <div key={index} className="flex gap-2 mb-3">
              <input
                type="text"
                value={objective}
                onChange={(e) => updateObjective(index, e.target.value)}
                placeholder="학습 목표를 입력하세요"
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {formData.objectives.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeObjective(index)}
                  className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
                >
                  삭제
                </button>
              )}
            </div>
          ))}
          
          <button
            type="button"
            onClick={addObjective}
            className="mt-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md"
          >
            목표 추가
          </button>
        </div>

        {/* Requirements */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-6">수강 요구사항</h2>
          
          {formData.requirements.map((requirement, index) => (
            <div key={index} className="flex gap-2 mb-3">
              <input
                type="text"
                value={requirement}
                onChange={(e) => updateRequirement(index, e.target.value)}
                placeholder="수강 요구사항을 입력하세요"
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {formData.requirements.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeRequirement(index)}
                  className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
                >
                  삭제
                </button>
              )}
            </div>
          ))}
          
          <button
            type="button"
            onClick={addRequirement}
            className="mt-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md"
          >
            요구사항 추가
          </button>
        </div>

        {/* Curriculum */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-6">커리큘럼</h2>
          
          {formData.curriculum.map((section, sectionIndex) => (
            <div key={section.id} className="mb-6 p-4 bg-gray-800 rounded-lg">
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) => updateSectionTitle(sectionIndex, e.target.value)}
                  placeholder="섹션 제목을 입력하세요"
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {formData.curriculum.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSection(sectionIndex)}
                    className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
                  >
                    섹션 삭제
                  </button>
                )}
              </div>
              
              {section.lessons.map((lesson, lessonIndex) => (
                <div key={lesson.id} className="flex gap-2 mb-2 ml-4">
                  <input
                    type="text"
                    value={lesson.title}
                    onChange={(e) => updateLesson(sectionIndex, lessonIndex, 'title', e.target.value)}
                    placeholder="강의 제목"
                    className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <input
                    type="text"
                    value={lesson.duration}
                    onChange={(e) => updateLesson(sectionIndex, lessonIndex, 'duration', e.target.value)}
                    placeholder="시간 (예: 15:00)"
                    className="w-24 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <label className="flex items-center text-white">
                    <input
                      type="checkbox"
                      checked={lesson.preview}
                      onChange={(e) => updateLesson(sectionIndex, lessonIndex, 'preview', e.target.checked)}
                      className="mr-2"
                    />
                    미리보기
                  </label>
                  {section.lessons.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLesson(sectionIndex, lessonIndex)}
                      className="px-2 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm"
                    >
                      삭제
                    </button>
                  )}
                </div>
              ))}
              
              <button
                type="button"
                onClick={() => addLesson(sectionIndex)}
                className="mt-2 ml-4 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm"
              >
                강의 추가
              </button>
            </div>
          ))}
          
          <button
            type="button"
            onClick={addSection}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md"
          >
            섹션 추가
          </button>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4">
          <Link
            href="/admin/courses"
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
          >
            취소
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
          >
            {loading ? '등록 중...' : '강의 등록'}
          </button>
        </div>
      </form>
    </div>
  )
}