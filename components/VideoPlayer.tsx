'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'

interface VideoPlayerProps {
  courseId: string
  lessonId?: string
}

interface LectureVideo {
  id: string
  title: string
  description?: string
  video_url: string
  duration?: number
}

interface PaymentInfo {
  payment_status: string
  created_at: string
  amount: number
}

export default function VideoPlayer({ courseId, lessonId }: VideoPlayerProps) {
  const { user } = useAuth()
  const videoRef = useRef<HTMLVideoElement>(null)
  
  const [videos, setVideos] = useState<LectureVideo[]>([])
  const [currentVideo, setCurrentVideo] = useState<LectureVideo | null>(null)
  const [hasAccess, setHasAccess] = useState<boolean>(false)
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [videoLoading, setVideoLoading] = useState(false)
  const [error, setError] = useState<string>('')

  const checkPaymentAccess = async () => {
    if (!user) {
      setError('로그인이 필요합니다.')
      setLoading(false)
      return false
    }

    try {
      const { data, error: dbError } = await supabase
        .from('course_enrollments')
        .select(`
          payment_id,
          payments!inner (
            payment_status,
            created_at,
            amount
          )
        `)
        .eq('user_id', user.id)
        .eq('course_id', courseId)
        .eq('payments.payment_status', 'completed')
        .single()

      if (dbError || !data) {
        setError('이 강의에 대한 결제 정보를 찾을 수 없습니다.')
        return false
      }

      const payment = data.payments as unknown as PaymentInfo
      const paymentDate = new Date(payment.created_at)
      const sixMonthsAgo = new Date()
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

      if (paymentDate < sixMonthsAgo) {
        setError('강의 수강 기간이 만료되었습니다. (결제일로부터 6개월)')
        return false
      }

      setPaymentInfo(payment)
      return true
    } catch (error) {
      console.error('결제 정보 확인 실패:', error)
      setError('결제 정보를 확인하는 중 오류가 발생했습니다.')
      return false
    }
  }

  const fetchVideos = async () => {
    try {
      const { data, error: dbError } = await supabase
        .from('lecture_videos')
        .select('id, title, description, video_url, duration')
        .eq('course_id', courseId)
        .eq('upload_status', 'completed')
        .order('created_at', { ascending: true })

      if (dbError) throw dbError
      
      setVideos(data || [])
      
      // 특정 레슨이 지정되지 않았으면 첫 번째 영상을 선택
      if (!lessonId && data && data.length > 0) {
        setCurrentVideo(data[0])
      } else if (lessonId) {
        const selectedVideo = data?.find(v => v.id === lessonId)
        if (selectedVideo) {
          setCurrentVideo(selectedVideo)
        }
      }
    } catch (error) {
      console.error('영상 목록 로드 실패:', error)
      setError('영상 목록을 불러오는 중 오류가 발생했습니다.')
    }
  }

  const loadVideoUrl = async (video: LectureVideo) => {
    if (!hasAccess) return

    setVideoLoading(true)
    console.log('🎬 영상 URL 로드 시작:', video.title)
    
    try {
      const { data: signedUrl, error } = await supabase.storage
        .from('lecture-videos')
        .createSignedUrl(video.video_url, 3600) // 1시간 유효

      if (error) {
        console.error('❌ Signed URL 생성 실패:', error)
        throw error
      }

      console.log('✅ Signed URL 생성 성공:', signedUrl.signedUrl.substring(0, 100) + '...')

      if (videoRef.current) {
        // 기존 이벤트 리스너 제거
        const video = videoRef.current
        video.pause()
        video.removeAttribute('src')
        
        // 새 URL 설정
        video.src = signedUrl.signedUrl
        
        // 비디오 로드
        try {
          await video.load()
          console.log('✅ 비디오 로드 완료')
        } catch (loadError) {
          console.error('❌ 비디오 로드 오류:', loadError)
          throw loadError
        }
      }
    } catch (error) {
      console.error('❌ 영상 로드 실패:', error)
      setError('영상을 불러오는 중 오류가 발생했습니다.')
    } finally {
      setVideoLoading(false)
    }
  }

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '00:00'
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleVideoSelect = (video: LectureVideo) => {
    setCurrentVideo(video)
    loadVideoUrl(video)
  }

  useEffect(() => {
    const initializePlayer = async () => {
      const accessGranted = await checkPaymentAccess()
      setHasAccess(accessGranted)
      
      if (accessGranted) {
        await fetchVideos()
      }
      
      setLoading(false)
    }

    initializePlayer()
  }, [user, courseId])

  useEffect(() => {
    if (currentVideo && hasAccess) {
      loadVideoUrl(currentVideo)
    }
  }, [currentVideo, hasAccess])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
        <span className="ml-2 text-gray-600">로딩 중...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div className="text-red-600 text-lg font-medium mb-2">접근 제한</div>
        <p className="text-red-700">{error}</p>
        {!user && (
          <button
            onClick={() => window.location.href = '/auth/login'}
            className="mt-4 bg-emerald-500 text-white px-6 py-2 rounded-md hover:bg-emerald-600 transition-colors"
          >
            로그인하기
          </button>
        )}
      </div>
    )
  }

  if (!hasAccess || videos.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
        <p className="text-gray-600">시청 가능한 영상이 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="grid md:grid-cols-3 gap-0">
        {/* 비디오 플레이어 */}
        <div className="md:col-span-2 bg-black relative">
          {videoLoading ? (
            <div className="aspect-video flex items-center justify-center">
              <div className="text-white">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                영상 로딩 중...
              </div>
            </div>
          ) : (
            <div className="relative">
              <video
                ref={videoRef}
                controls
                controlsList="nodownload"
                preload="metadata" 
                playsInline
                className="w-full aspect-video bg-black"
                style={{ minHeight: '400px' }}
                onLoadStart={() => console.log('🎬 비디오 로드 시작')}
                onLoadedMetadata={() => console.log('✅ 비디오 메타데이터 로드 완료')}
                onCanPlay={() => console.log('▶️ 비디오 재생 가능')}
                onError={(e) => {
                  console.error('❌ 비디오 오류:', e)
                  const target = e.target as HTMLVideoElement
                  console.error('비디오 소스:', target.src)
                  console.error('네트워크 상태:', target.networkState)
                  console.error('준비 상태:', target.readyState)
                }}
                onContextMenu={(e) => e.preventDefault()} // 우클릭 방지
              >
                <source type="video/mp4" />
                브라우저에서 비디오를 지원하지 않습니다.
              </video>
              
              {/* 비디오가 로드되지 않았을 때 표시할 플레이스홀더 */}
              {!currentVideo && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                  <div className="text-white text-center">
                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-300">영상을 선택해주세요</p>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {currentVideo && (
            <div className="absolute top-4 left-4 right-4 bg-black bg-opacity-75 text-white p-3 rounded-lg pointer-events-none">
              <h3 className="font-medium truncate">{currentVideo.title}</h3>
              {currentVideo.description && (
                <p className="text-sm text-gray-300 truncate">{currentVideo.description}</p>
              )}
            </div>
          )}
        </div>

        {/* 플레이리스트 */}
        <div className="bg-gray-50">
          <div className="p-4 border-b border-gray-200">
            <h4 className="font-medium text-gray-900">강의 목록</h4>
            <p className="text-sm text-gray-600">{videos.length}개 영상</p>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {videos.map((video, index) => (
              <button
                key={video.id}
                onClick={() => handleVideoSelect(video)}
                className={`w-full p-4 text-left hover:bg-gray-100 border-b border-gray-200 transition-colors ${
                  currentVideo?.id === video.id ? 'bg-emerald-50 border-emerald-200' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                      currentVideo?.id === video.id 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-gray-300 text-gray-700'
                    }`}>
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {video.title}
                    </p>
                    {video.description && (
                      <p className="text-xs text-gray-500 truncate mt-1">
                        {video.description}
                      </p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">
                      {formatDuration(video.duration)}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* 결제 정보 */}
      {paymentInfo && (
        <div className="bg-green-50 p-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-green-700">
              ✅ 결제 완료 (₩{paymentInfo.amount.toLocaleString()})
            </span>
            <span className="text-green-600">
              수강 기간: {new Date(paymentInfo.created_at).toLocaleDateString()} ~ {
                new Date(new Date(paymentInfo.created_at).setMonth(new Date(paymentInfo.created_at).getMonth() + 6)).toLocaleDateString()
              }
            </span>
          </div>
        </div>
      )}
    </div>
  )
}