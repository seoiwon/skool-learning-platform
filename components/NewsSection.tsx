'use client'

import { useEffect, useState } from 'react'

interface News {
  id: string
  title: string
  slug: string
  summary: string
  publishedAt: string
  imageUrl?: string
  author: {
    name: string
    email: string
  }
}

export default function NewsSection() {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news?published=true`)
      if (response.ok) {
        const data = await response.json()
        setNews(data.slice(0, 3)) // Show only latest 3 news
      }
    } catch (error) {
      console.error('Error fetching news:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            최신 <span className="text-emerald-400">소식</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-black/50 border border-gray-800 rounded-xl overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-800"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-800 rounded mb-2"></div>
                  <div className="h-6 bg-gray-800 rounded mb-3"></div>
                  <div className="h-20 bg-gray-800 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (news.length === 0) {
    return null
  }

  return (
    <section className="py-20 px-4 bg-gray-900/30">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-16">
          최신 <span className="text-emerald-400">소식</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item) => (
            <article key={item.id} className="bg-black/50 border border-gray-800 rounded-xl overflow-hidden hover:border-emerald-500/50 transition-colors">
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.title} className="h-48 w-full object-cover" />
              ) : (
                <div className="h-48 bg-gradient-to-br from-emerald-500/20 to-emerald-500/10"></div>
              )}
              <div className="p-6">
                <span className="text-emerald-400 text-sm">
                  {new Date(item.publishedAt).toLocaleDateString('ko-KR')}
                </span>
                <h3 className="text-xl font-semibold text-white mt-2 mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.summary}</p>
                <a
                  href={`/news/${item.slug}`}
                  className="inline-flex items-center text-emerald-400 hover:text-emerald-300 mt-4 text-sm"
                >
                  자세히 보기
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}