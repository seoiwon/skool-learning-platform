'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Header from '@/components/Header'

interface Certificate {
  id: string
  course_title: string
  issue_date: string
  certificate_number: string
  instructor: string
  completion_date: string
  grade?: string
  skills: string[]
  status: 'active' | 'pending'
}

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'active' | 'pending'>('all')
  const router = useRouter()

  useEffect(() => {
    checkUser()
    loadCertificates()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
    }
  }

  const loadCertificates = async () => {
    // Mock data - will be replaced with Supabase query
    const mockCertificates: Certificate[] = [
      {
        id: '1',
        course_title: 'Python 기초부터 실무까지',
        issue_date: '2024-01-15',
        certificate_number: 'CERT-2024-0115-001',
        instructor: '김파이썬',
        completion_date: '2024-01-14',
        grade: 'A+',
        skills: ['Python', '데이터 분석', '웹 스크래핑', '자동화'],
        status: 'active'
      },
      {
        id: '2',
        course_title: '자연어처리(NLP) 마스터',
        issue_date: '2023-12-20',
        certificate_number: 'CERT-2023-1220-002',
        instructor: '이자연',
        completion_date: '2023-12-19',
        grade: 'A',
        skills: ['NLP', 'Transformers', 'BERT', 'GPT'],
        status: 'active'
      },
      {
        id: '3',
        course_title: '머신러닝 입문',
        issue_date: '',
        certificate_number: '',
        instructor: '박머신',
        completion_date: '',
        grade: '',
        skills: ['머신러닝', 'Scikit-learn', '딥러닝 기초'],
        status: 'pending'
      }
    ]

    setCertificates(mockCertificates)
    setLoading(false)
  }

  const handleDownload = (certificateId: string) => {
    // Implement certificate download
    alert(`수료증 ${certificateId} 다운로드`)
  }

  const handleShare = (certificateId: string) => {
    // Implement certificate sharing
    const shareUrl = `https://skool.com/certificates/${certificateId}`
    navigator.clipboard.writeText(shareUrl)
    alert('수료증 링크가 클립보드에 복사되었습니다.')
  }

  const filteredCertificates = certificates.filter(cert => {
    if (filter === 'all') return true
    return cert.status === filter
  })

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
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">수료증</h1>
            <p className="mt-2 text-gray-600">
              완료한 강의의 수료증을 확인하고 다운로드할 수 있습니다.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex">
                <button
                  onClick={() => setFilter('all')}
                  className={`py-4 px-6 border-b-2 font-medium text-sm ${
                    filter === 'all'
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  전체 ({certificates.length})
                </button>
                <button
                  onClick={() => setFilter('active')}
                  className={`py-4 px-6 border-b-2 font-medium text-sm ${
                    filter === 'active'
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  발급 완료 ({certificates.filter(c => c.status === 'active').length})
                </button>
                <button
                  onClick={() => setFilter('pending')}
                  className={`py-4 px-6 border-b-2 font-medium text-sm ${
                    filter === 'pending'
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  진행 중 ({certificates.filter(c => c.status === 'pending').length})
                </button>
              </nav>
            </div>
          </div>

          {/* Certificates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCertificates.map((certificate) => (
              <div 
                key={certificate.id} 
                className={`bg-white rounded-lg shadow-sm overflow-hidden ${
                  certificate.status === 'pending' ? 'opacity-75' : ''
                }`}
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 text-white relative">
                  <div className="absolute top-4 right-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium opacity-90">수료증</p>
                    <h3 className="text-xl font-bold mt-1">{certificate.course_title}</h3>
                  </div>
                  <div className="absolute bottom-4 left-6">
                    <p className="text-sm opacity-90">SKOOL</p>
                  </div>
                </div>

                <div className="p-6">
                  {certificate.status === 'active' ? (
                    <>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">수료일</span>
                          <span className="text-gray-900 font-medium">
                            {new Date(certificate.completion_date).toLocaleDateString('ko-KR')}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">발급일</span>
                          <span className="text-gray-900 font-medium">
                            {new Date(certificate.issue_date).toLocaleDateString('ko-KR')}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">수료번호</span>
                          <span className="text-gray-900 font-medium text-xs">
                            {certificate.certificate_number}
                          </span>
                        </div>
                        {certificate.grade && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">성적</span>
                            <span className="text-gray-900 font-medium">{certificate.grade}</span>
                          </div>
                        )}
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">습득 스킬</p>
                        <div className="flex flex-wrap gap-1">
                          {certificate.skills.map((skill, index) => (
                            <span 
                              key={index}
                              className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDownload(certificate.id)}
                          className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          다운로드
                        </button>
                        <button
                          onClick={() => handleShare(certificate.id)}
                          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          공유하기
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-4">
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 mb-4">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        진행 중
                      </div>
                      <p className="text-sm text-gray-600">
                        강의를 완료하면 수료증이 자동으로 발급됩니다.
                      </p>
                      <div className="mt-4">
                        <div className="bg-gray-200 rounded-full h-2 mb-2">
                          <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                        <p className="text-xs text-gray-600">진도율 65%</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredCertificates.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <div className="max-w-sm mx-auto">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-gray-600 mb-4">수료증이 없습니다.</p>
                <p className="text-sm text-gray-500">
                  강의를 완료하면 수료증이 자동으로 발급됩니다.
                </p>
              </div>
            </div>
          )}

          {/* Certificate Info */}
          <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">수료증 안내</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">수료증 발급 조건</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    강의 진도율 100% 완료
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    모든 퀴즈 및 과제 제출
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    최종 평가 통과 (해당 시)
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">수료증 활용</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    LinkedIn 프로필에 추가 가능
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    이력서 및 포트폴리오 첨부
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    고유 인증 번호로 진위 확인
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}