'use client'

import { useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'

interface Course {
  id: string
  title: string
  price: number
}

const courses: Course[] = [
  { id: 'cab65c93-cf13-4e01-a0b4-294b78591887', title: '[베이직] TOPIK 1~2급', price: 49000 },
  { id: 'e09ff750-9ba4-4f0a-bc2f-141472809b6b', title: '[베이직] TOPIK 3~4급 (기출문제)', price: 89000 },
  { id: '27af7a5e-8259-4bb0-b219-7e5831e6f833', title: '[베이직] TOPIK 3~4급 (유형별)', price: 79000 }
]

interface VideoUploadProps {
  onUploadComplete?: () => void
}

export default function VideoUpload({ onUploadComplete }: VideoUploadProps) {
  const [selectedCourse, setSelectedCourse] = useState<string>('')
  const [lessonTitle, setLessonTitle] = useState<string>('')
  const [lessonDescription, setLessonDescription] = useState<string>('')
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
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
      handleVideoUpload(e.dataTransfer.files[0])
    }
  }

  const handleVideoUpload = async (file: File) => {
    console.log('🚀 업로드 시작 - 초기 검증')
    console.log('Selected Course:', selectedCourse)
    console.log('Lesson Title:', lessonTitle)
    console.log('File Info:', {
      name: file.name,
      size: file.size,
      type: file.type,
      sizeInMB: (file.size / 1024 / 1024).toFixed(2) + 'MB'
    })

    if (!selectedCourse || !lessonTitle.trim()) {
      console.error('❌ 필수 필드 누락:', { selectedCourse, lessonTitle })
      alert('강의와 레슨 제목을 선택/입력해주세요.')
      return
    }

    if (!file.type.startsWith('video/')) {
      console.error('❌ 파일 타입 오류:', file.type)
      alert('비디오 파일만 업로드 가능합니다.')
      return
    }

    // 파일 크기 체크 (500MB 제한으로 테스트)
    const MAX_SIZE = 500 * 1024 * 1024 // 500MB
    if (file.size > MAX_SIZE) {
      console.error('❌ 파일 크기 초과:', file.size, 'bytes')
      alert(`파일 크기가 너무 큽니다. 최대 500MB까지 업로드 가능합니다.\n현재 크기: ${(file.size / 1024 / 1024).toFixed(2)}MB`)
      return
    }

    setUploading(true)
    setUploadProgress(0)

    try {
      // 사용자 인증 상태 확인
      console.log('🔐 사용자 인증 상태 확인')
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      
      if (authError) {
        console.error('❌ 인증 오류:', authError)
        throw new Error('인증 오류: ' + authError.message)
      }
      
      if (!user) {
        console.error('❌ 로그인되지 않음')
        throw new Error('로그인이 필요합니다.')
      }
      
      console.log('✅ 인증 성공:', { userId: user.id, email: user.email })

      // 사용자 권한 확인
      console.log('👤 사용자 권한 확인')
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (profileError) {
        console.error('❌ 프로필 조회 오류:', profileError)
      } else {
        console.log('✅ 사용자 권한:', profile?.role || 'role 없음')
      }

      // 파일명 생성
      const timestamp = Date.now()
      const fileName = `${selectedCourse}/lesson_${timestamp}.${file.name.split('.').pop()}`
      console.log('📁 파일명 생성:', fileName)
      
      // Storage 버킷 상태 확인
      console.log('🗄️ Storage 버킷 확인')
      const { data: buckets, error: bucketError } = await supabase.storage.listBuckets()
      if (bucketError) {
        console.error('❌ 버킷 조회 오류:', bucketError)
      } else {
        console.log('✅ 사용 가능한 버킷들:', buckets.map(b => b.name))
        const lectureBucket = buckets.find(b => b.id === 'lecture-videos')
        console.log('📹 lecture-videos 버킷:', lectureBucket)
      }

      // Storage 정책 테스트
      console.log('🔒 Storage 업로드 권한 테스트')
      
      // 업로드 시작
      console.log('⏫ 파일 업로드 시작')
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('lecture-videos')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true,
          onUploadProgress: (progress) => {
            const percent = Math.round((progress.loaded / progress.total) * 100)
            console.log(`📈 업로드 진행률: ${percent}% (${progress.loaded}/${progress.total} bytes)`)
            setUploadProgress(percent)
          }
        })

      if (uploadError) {
        console.error('❌ Storage 업로드 실패:', uploadError)
        console.error('오류 세부사항:', {
          message: uploadError.message,
          statusCode: uploadError.statusCode,
          error: uploadError.error
        })
        throw uploadError
      }

      console.log('✅ Storage 업로드 성공:', uploadData)

      // 비디오 메타데이터 추출
      console.log('🎬 비디오 메타데이터 추출 시작')
      const video = document.createElement('video')
      video.preload = 'metadata'
      video.src = URL.createObjectURL(file)
      
      video.onloadedmetadata = async () => {
        try {
          const duration = Math.floor(video.duration)
          console.log('✅ 비디오 메타데이터 로드 성공:', { duration, path: uploadData.path })
          
          // DB에 저장
          console.log('💾 DB에 영상 정보 저장 시작')
          const videoData = {
            course_id: selectedCourse,
            title: lessonTitle,
            description: lessonDescription || null,
            video_url: uploadData.path,
            duration: duration,
            upload_status: 'completed'
          }
          console.log('저장할 데이터:', videoData)

          const { data: dbData, error: dbError } = await supabase
            .from('lecture_videos')
            .insert(videoData)
            .select()

          if (dbError) {
            console.error('❌ DB 저장 실패:', dbError)
            throw dbError
          }

          console.log('✅ DB 저장 성공:', dbData)
          alert('영상 업로드가 완료되었습니다!')
          setLessonTitle('')
          setLessonDescription('')
          setUploadProgress(0)
          onUploadComplete?.()
        } catch (error) {
          console.error('❌ 메타데이터 처리 중 오류:', error)
          throw error
        } finally {
          URL.revokeObjectURL(video.src)
        }
      }

      video.onerror = (e) => {
        console.error('❌ 비디오 메타데이터 로드 실패:', e)
        URL.revokeObjectURL(video.src)
        throw new Error('비디오 파일이 손상되었거나 지원되지 않는 형식입니다.')
      }
      
    } catch (error: any) {
      console.error('💥 전체 업로드 프로세스 실패:', error)
      console.error('오류 스택:', error.stack)
      
      let errorMessage = '업로드 중 오류가 발생했습니다.'
      if (error.message) {
        errorMessage += '\n상세: ' + error.message
      }
      if (error.statusCode) {
        errorMessage += '\n상태 코드: ' + error.statusCode
      }
      
      alert(errorMessage)
    } finally {
      console.log('🏁 업로드 프로세스 완료')
      setUploading(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleVideoUpload(e.target.files[0])
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">강의 영상 업로드</h2>
      
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

      {/* 레슨 제목 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          레슨 제목 *
        </label>
        <input
          type="text"
          value={lessonTitle}
          onChange={(e) => setLessonTitle(e.target.value)}
          placeholder="예: 1강 - 한글의 기초"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>

      {/* 레슨 설명 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          레슨 설명
        </label>
        <textarea
          value={lessonDescription}
          onChange={(e) => setLessonDescription(e.target.value)}
          placeholder="레슨에 대한 설명을 입력하세요 (선택사항)"
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
              업로드 중... {uploadProgress}%
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-emerald-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        ) : (
          <>
            <div className="text-gray-600 mb-4">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-lg text-gray-700 mb-2">
              비디오 파일을 드래그하여 놓거나 클릭하여 선택
            </p>
            <p className="text-sm text-gray-500 mb-4">
              MP4, WebM, AVI 파일 지원
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
              accept="video/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </>
        )}
      </div>
    </div>
  )
}