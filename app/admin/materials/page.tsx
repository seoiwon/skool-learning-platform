'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import MaterialUpload from '@/components/admin/MaterialUpload'

interface CourseMaterial {
  id: string
  course_id: string
  title: string
  description?: string
  file_name: string
  file_url: string
  file_size: number
  file_type: string
  created_at: string
  courses: {
    title: string
  }
}

interface Course {
  id: string
  title: string
}

export default function AdminMaterialsPage() {
  const [materials, setMaterials] = useState<CourseMaterial[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'upload' | 'list'>('upload')

  const fetchMaterials = async () => {
    try {
      const { data, error } = await supabase
        .from('course_materials')
        .select(`
          *,
          courses (
            title
          )
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setMaterials(data || [])
    } catch (error) {
      console.error('자료 목록 로드 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('id, title')
        .order('title')

      if (error) throw error
      setCourses(data || [])
    } catch (error) {
      console.error('강의 목록 로드 실패:', error)
    }
  }

  const deleteMaterial = async (materialId: string, fileUrl: string) => {
    if (!confirm('이 자료를 삭제하시겠습니까?')) return

    try {
      // Storage에서 파일 삭제
      const { error: storageError } = await supabase.storage
        .from('course-materials')
        .remove([fileUrl])

      if (storageError) throw storageError

      // DB에서 레코드 삭제
      const { error: dbError } = await supabase
        .from('course_materials')
        .delete()
        .eq('id', materialId)

      if (dbError) throw dbError

      alert('자료가 삭제되었습니다.')
      fetchMaterials()
    } catch (error) {
      console.error('자료 삭제 실패:', error)
      alert('자료 삭제 중 오류가 발생했습니다.')
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return '📄'
    if (fileType.includes('word') || fileType.includes('document')) return '📝'
    if (fileType.includes('excel') || fileType.includes('spreadsheet')) return '📊'
    if (fileType.includes('powerpoint') || fileType.includes('presentation')) return '📑'
    if (fileType.includes('zip')) return '🗂️'
    return '📎'
  }

  useEffect(() => {
    fetchMaterials()
    fetchCourses()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">강의 자료 관리</h1>
          
          {/* 탭 메뉴 */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('upload')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'upload'
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                자료 업로드
              </button>
              <button
                onClick={() => setActiveTab('list')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'list'
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                자료 목록 ({materials.length})
              </button>
            </nav>
          </div>
        </div>

        {/* 탭 콘텐츠 */}
        {activeTab === 'upload' && (
          <MaterialUpload 
            courses={courses}
            onUploadComplete={() => {
              fetchMaterials()
              setActiveTab('list')
            }} 
          />
        )}

        {activeTab === 'list' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto"></div>
                <p className="mt-2 text-gray-600">로딩 중...</p>
              </div>
            ) : materials.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <p>업로드된 자료가 없습니다.</p>
                <button
                  onClick={() => setActiveTab('upload')}
                  className="mt-4 bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition-colors"
                >
                  첫 자료 업로드하기
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        자료 정보
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        강의
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        파일 정보
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        업로드 날짜
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        작업
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {materials.map((material) => (
                      <tr key={material.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">
                              {getFileIcon(material.file_type)}
                            </span>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {material.title}
                              </div>
                              {material.description && (
                                <div className="text-sm text-gray-500 truncate max-w-xs">
                                  {material.description}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {material.courses?.title || '알 수 없음'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{material.file_name}</div>
                          <div className="text-sm text-gray-500">
                            {formatFileSize(material.file_size)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(material.created_at).toLocaleDateString('ko-KR')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => deleteMaterial(material.id, material.file_url)}
                            className="text-red-600 hover:text-red-900"
                          >
                            삭제
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}