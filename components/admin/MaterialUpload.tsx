'use client'

import { useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'

interface Course {
  id: string
  title: string
}

interface MaterialUploadProps {
  courses: Course[]
  onUploadComplete?: () => void
}

export default function MaterialUpload({ courses, onUploadComplete }: MaterialUploadProps) {
  const [selectedCourse, setSelectedCourse] = useState<string>('')
  const [materialTitle, setMaterialTitle] = useState<string>('')
  const [materialDescription, setMaterialDescription] = useState<string>('')
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }

  const handleFileUpload = async (file: File) => {
    if (!selectedCourse || !materialTitle.trim()) {
      alert('강의와 자료 제목을 선택/입력해주세요.')
      return
    }

    // 허용된 파일 타입 체크
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain',
      'application/zip',
      'application/x-zip-compressed'
    ]

    if (!allowedTypes.includes(file.type)) {
      alert('지원하지 않는 파일 형식입니다. PDF, Word, Excel, PowerPoint, TXT, ZIP 파일만 업로드 가능합니다.')
      return
    }

    // 파일 크기 제한 (50MB)
    const MAX_SIZE = 50 * 1024 * 1024
    if (file.size > MAX_SIZE) {
      alert(`파일 크기가 너무 큽니다. 최대 50MB까지 업로드 가능합니다.\n현재 크기: ${(file.size / 1024 / 1024).toFixed(2)}MB`)
      return
    }

    setUploading(true)

    try {
      console.log('📎 자료 업로드 시작:', {
        course: selectedCourse,
        title: materialTitle,
        fileName: file.name,
        fileSize: (file.size / 1024 / 1024).toFixed(2) + 'MB',
        fileType: file.type
      })

      // 파일명 생성 - 한글과 특수문자를 안전하게 처리
      const timestamp = Date.now()
      const fileExtension = file.name.split('.').pop() || ''
      const cleanFileName = file.name
        .replace(/\.[^/.]+$/, '') // 확장자 제거
        .replace(/[^a-zA-Z0-9]/g, '_') // 영문과 숫자만 남기고 나머지는 _로 변경
        .substring(0, 50) // 길이 제한
      
      const fileName = `${selectedCourse}/${timestamp}_${cleanFileName}.${fileExtension}`
      
      // 파일 업로드
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('course-materials')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        })

      if (uploadError) {
        console.error('❌ Storage 업로드 실패:', uploadError)
        throw uploadError
      }

      console.log('✅ Storage 업로드 성공:', uploadData)

      // DB에 자료 정보 저장
      const { error: dbError } = await supabase
        .from('course_materials')
        .insert({
          course_id: selectedCourse,
          title: materialTitle,
          description: materialDescription || null,
          file_name: file.name,
          file_url: uploadData.path,
          file_size: file.size,
          file_type: file.type
        })

      if (dbError) {
        console.error('❌ DB 저장 실패:', dbError)
        // 실패 시 업로드된 파일 삭제
        await supabase.storage
          .from('course-materials')
          .remove([uploadData.path])
        throw dbError
      }

      console.log('✅ 자료 업로드 완료')
      alert('강의 자료가 업로드되었습니다!')
      
      // 폼 초기화
      setMaterialTitle('')
      setMaterialDescription('')
      onUploadComplete?.()
      
    } catch (error: any) {
      console.error('💥 업로드 실패:', error)
      alert(`업로드 중 오류가 발생했습니다: ${error.message || error}`)
    } finally {
      setUploading(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0])
    }
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
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">강의 자료 업로드</h2>
      
      {/* 강의 선택 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          강의 선택
        </label>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        >
          <option value="">강의를 선택하세요</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>
      </div>

      {/* 자료 제목 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          자료 제목 *
        </label>
        <input
          type="text"
          value={materialTitle}
          onChange={(e) => setMaterialTitle(e.target.value)}
          placeholder="예: 1강 강의 슬라이드"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>

      {/* 자료 설명 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          자료 설명
        </label>
        <textarea
          value={materialDescription}
          onChange={(e) => setMaterialDescription(e.target.value)}
          placeholder="자료에 대한 설명을 입력하세요 (선택사항)"
          rows={3}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>

      {/* 파일 업로드 영역 */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive 
            ? 'border-emerald-500 bg-emerald-50' 
            : 'border-gray-300 hover:border-emerald-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {uploading ? (
          <div className="space-y-4">
            <div className="text-lg font-medium text-gray-700">
              업로드 중...
            </div>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto"></div>
          </div>
        ) : (
          <>
            <div className="text-gray-600 mb-4">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-lg text-gray-700 mb-2">
              파일을 드래그하여 놓거나 클릭하여 선택
            </p>
            <p className="text-sm text-gray-500 mb-4">
              PDF, Word, Excel, PowerPoint, TXT, ZIP 파일 지원 (최대 50MB)
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-emerald-500 text-white px-6 py-2 rounded-md hover:bg-emerald-600 transition-colors"
            >
              파일 선택
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip"
              onChange={handleFileSelect}
              className="hidden"
            />
          </>
        )}
      </div>

      {/* 지원 파일 형식 안내 */}
      <div className="mt-4 text-sm text-gray-600">
        <p className="font-medium mb-2">지원 파일 형식:</p>
        <div className="grid grid-cols-2 gap-2">
          <span>📄 PDF (.pdf)</span>
          <span>📝 Word (.doc, .docx)</span>
          <span>📊 Excel (.xls, .xlsx)</span>
          <span>📑 PowerPoint (.ppt, .pptx)</span>
          <span>📋 텍스트 (.txt)</span>
          <span>🗂️ 압축 파일 (.zip)</span>
        </div>
      </div>
    </div>
  )
}