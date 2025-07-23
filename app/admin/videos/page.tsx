'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import VideoUpload from '@/components/admin/VideoUpload'
import MaterialUpload from '@/components/admin/MaterialUpload'

interface LectureVideo {
  id: string
  course_id: string
  title: string
  description?: string
  video_url: string
  duration?: number
  upload_status: string
  created_at: string
  courses: {
    title: string
  }
}

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

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<LectureVideo[]>([])
  const [materials, setMaterials] = useState<CourseMaterial[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'video-upload' | 'material-upload' | 'video-list' | 'material-list'>('video-upload')

  const fetchVideos = async () => {
    try {
      const { data, error } = await supabase
        .from('lecture_videos')
        .select(`
          *,
          courses (
            title
          )
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setVideos(data || [])
    } catch (error) {
      console.error('영상 목록 로드 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteVideo = async (videoId: string, videoUrl: string) => {
    if (!confirm('이 영상을 삭제하시겠습니까?')) return

    try {
      // Storage에서 파일 삭제
      const { error: storageError } = await supabase.storage
        .from('lecture-videos')
        .remove([videoUrl])

      if (storageError) throw storageError

      // DB에서 레코드 삭제
      const { error: dbError } = await supabase
        .from('lecture_videos')
        .delete()
        .eq('id', videoId)

      if (dbError) throw dbError

      alert('영상이 삭제되었습니다.')
      fetchVideos()
    } catch (error) {
      console.error('영상 삭제 실패:', error)
      alert('영상 삭제 중 오류가 발생했습니다.')
    }
  }

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '알 수 없음'
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const formatFileSize = (url: string) => {
    // 실제로는 파일 크기를 가져와야 하지만, 여기서는 placeholder
    return '예상 크기'
  }

  useEffect(() => {
    fetchVideos()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">강의 영상 관리</h1>
          
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
                영상 업로드
              </button>
              <button
                onClick={() => setActiveTab('list')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'list'
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                영상 목록 ({videos.length})
              </button>
            </nav>
          </div>
        </div>

        {/* 탭 콘텐츠 */}
        {activeTab === 'upload' && (
          <VideoUpload onUploadComplete={() => {
            fetchVideos()
            setActiveTab('list')
          }} />
        )}

        {activeTab === 'list' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto"></div>
                <p className="mt-2 text-gray-600">로딩 중...</p>
              </div>
            ) : videos.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <p>업로드된 영상이 없습니다.</p>
                <button
                  onClick={() => setActiveTab('upload')}
                  className="mt-4 bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition-colors"
                >
                  첫 영상 업로드하기
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        영상 정보
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        강의
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        재생시간
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        상태
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
                    {videos.map((video) => (
                      <tr key={video.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {video.title}
                            </div>
                            {video.description && (
                              <div className="text-sm text-gray-500 truncate max-w-xs">
                                {video.description}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {video.courses?.title || '알 수 없음'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDuration(video.duration)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            video.upload_status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : video.upload_status === 'processing'
                              ? 'bg-yellow-100 text-yellow-800'
                              : video.upload_status === 'failed'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {video.upload_status === 'completed' ? '완료' :
                             video.upload_status === 'processing' ? '처리중' :
                             video.upload_status === 'failed' ? '실패' : '대기중'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(video.created_at).toLocaleDateString('ko-KR')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => deleteVideo(video.id, video.video_url)}
                            className="text-red-600 hover:text-red-900 ml-4"
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