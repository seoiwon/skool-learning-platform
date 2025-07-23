'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface CourseMaterial {
  id: string
  title: string
  description?: string
  file_name: string
  file_url: string
  file_size: number
  file_type: string
  created_at: string
}

interface CourseMaterialsProps {
  courseId: string
  onClose: () => void
}

export default function CourseMaterials({ courseId, onClose }: CourseMaterialsProps) {
  const [materials, setMaterials] = useState<CourseMaterial[]>([])
  const [loading, setLoading] = useState(true)
  const [downloading, setDownloading] = useState<string>('')

  useEffect(() => {
    fetchMaterials()
  }, [courseId])

  const fetchMaterials = async () => {
    try {
      const { data, error } = await supabase
        .from('course_materials')
        .select('*')
        .eq('course_id', courseId)
        .order('created_at', { ascending: false })

      if (error) throw error
      setMaterials(data || [])
    } catch (error) {
      console.error('자료 조회 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  const downloadMaterial = async (material: CourseMaterial) => {
    setDownloading(material.id)
    
    try {
      // Supabase Storage에서 signed URL 생성
      const { data: signedUrl, error } = await supabase.storage
        .from('course-materials')
        .createSignedUrl(material.file_url, 3600) // 1시간 유효

      if (error) throw error

      // 파일 다운로드
      const response = await fetch(signedUrl.signedUrl)
      if (!response.ok) throw new Error('파일 다운로드 실패')

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      
      // 다운로드 링크 생성 및 클릭
      const link = document.createElement('a')
      link.href = url
      link.download = material.file_name
      document.body.appendChild(link)
      link.click()
      
      // 정리
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      
      console.log('✅ 파일 다운로드 완료:', material.file_name)
    } catch (error) {
      console.error('❌ 다운로드 실패:', error)
      alert('파일 다운로드 중 오류가 발생했습니다.')
    } finally {
      setDownloading('')
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full m-4 max-h-[90vh] overflow-hidden">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">강의 자료</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 내용 */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
              <span className="ml-2 text-gray-600">로딩 중...</span>
            </div>
          ) : materials.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-600">아직 업로드된 강의 자료가 없습니다.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {materials.map((material) => (
                <div key={material.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <span className="text-3xl flex-shrink-0">
                        {getFileIcon(material.file_type)}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-gray-900 mb-1">
                          {material.title}
                        </h3>
                        {material.description && (
                          <p className="text-gray-600 text-sm mb-2">
                            {material.description}
                          </p>
                        )}
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{material.file_name}</span>
                          <span>{formatFileSize(material.file_size)}</span>
                          <span>{new Date(material.created_at).toLocaleDateString('ko-KR')}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadMaterial(material)}
                      disabled={downloading === material.id}
                      className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
                    >
                      {downloading === material.id ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>다운로드 중...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>다운로드</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}