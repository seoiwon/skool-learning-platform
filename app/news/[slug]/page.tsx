'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

interface NewsPost {
  id: string
  title: string
  slug: string
  summary: string
  content: string
  imageUrl?: string
  publishedAt: string
  author: {
    name: string
    email: string
  }
}

export default function NewsDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [post, setPost] = useState<NewsPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchNewsPost()
  }, [slug])

  const fetchNewsPost = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/slug/${slug}`)
      if (!response.ok) {
        throw new Error('뉴스를 찾을 수 없습니다')
      }
      const data = await response.json()
      setPost(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        {/* Navigation - 랜딩페이지와 동일 */}
        <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="text-2xl font-bold text-white">AIskool!</Link>
              </div>
              <div className="flex items-center space-x-4">
                <a href="/login" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                  로그인
                </a>
                <a href="/login" className="bg-emerald-500 hover:bg-emerald-600 text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  시작하기
                </a>
              </div>
            </div>
          </div>
        </nav>
        
        <div className="pt-32 text-center">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-black">
        {/* Navigation - 랜딩페이지와 동일 */}
        <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="text-2xl font-bold text-white">AIskool!</Link>
              </div>
              <div className="flex items-center space-x-4">
                <a href="/login" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                  로그인
                </a>
                <a href="/login" className="bg-emerald-500 hover:bg-emerald-600 text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  시작하기
                </a>
              </div>
            </div>
          </div>
        </nav>
        
        <div className="pt-32 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">{error || '뉴스를 찾을 수 없습니다'}</h1>
          <Link href="/" className="text-emerald-400 hover:text-emerald-300">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation - 랜딩페이지와 동일 */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-white">AIskool!</Link>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/login" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                로그인
              </a>
              <a href="/login" className="bg-emerald-500 hover:bg-emerald-600 text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                시작하기
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <article className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">홈</Link>
              </li>
              <li className="text-gray-600">/</li>
              <li>
                <Link href="/#news" className="text-gray-400 hover:text-white">뉴스</Link>
              </li>
              <li className="text-gray-600">/</li>
              <li className="text-emerald-400">{post.title}</li>
            </ol>
          </nav>

          {/* Article Header */}
          <header className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-400 mb-8">
              {post.summary}
            </p>

            <div className="flex items-center justify-between border-t border-b border-gray-800 py-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <span className="text-emerald-500 font-bold text-sm">
                    {post.author.name?.charAt(0) || 'A'}
                  </span>
                </div>
                <div>
                  <p className="text-white font-medium">{post.author.name || 'AIskool! Team'}</p>
                  <p className="text-gray-500 text-sm">
                    {new Date(post.publishedAt).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {post.imageUrl && (
            <div className="mb-12">
              <img 
                src={post.imageUrl} 
                alt={post.title}
                className="w-full rounded-xl"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="text-gray-300 leading-relaxed space-y-6">
              {post.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-900 text-gray-300 px-3 py-1 rounded-full text-sm">#AI교육</span>
              <span className="bg-gray-900 text-gray-300 px-3 py-1 rounded-full text-sm">#자연어처리</span>
              <span className="bg-gray-900 text-gray-300 px-3 py-1 rounded-full text-sm">#한국어AI</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex justify-between">
              <Link href="/" className="text-emerald-400 hover:text-emerald-300 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                이전 글
              </Link>
              <Link href="/" className="text-emerald-400 hover:text-emerald-300 flex items-center">
                다음 글
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="py-20 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12">관련 글</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <article key={i} className="bg-black/50 border border-gray-800 rounded-xl p-6 hover:border-emerald-500/50 transition-colors">
                <h3 className="text-xl font-semibold text-white mb-3">
                  AI 교육의 미래와 전망
                </h3>
                <p className="text-gray-400 mb-4">
                  인공지능 기술이 교육 분야에 가져올 혁신적인 변화와 새로운 학습 패러다임에 대해 알아봅니다.
                </p>
                <Link href="#" className="text-emerald-400 hover:text-emerald-300 text-sm font-medium">
                  자세히 읽기 →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}