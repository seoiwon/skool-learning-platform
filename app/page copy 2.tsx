'use client'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="w-full border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img src="/logo.png" alt="SKOOL" className="h-14 w-auto" />
            </div>
            
            {/* Navigation */}
            <nav className="flex items-center space-x-4">
              <button className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors">
                로그인
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">
                나의 강의실
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
             {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
            자연어 AI로 만드는
            <span className="text-emerald-400"> 스마트 교육</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
            한국어 자연어 처리 전문 기술로 더 똑똑한 AI 교육을 경험하세요. 
            AIskool!의 혁신적인 언어 이해 기술로 완벽한 맞춤형 학습을 제공합니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/login" className="bg-emerald-500 hover:bg-emerald-600 text-black px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105">
              무료로 시작하기
            </a>
            <a href="#features" className="border border-gray-700 hover:border-gray-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              더 알아보기
            </a>
          </div>
        </div>
      </section>
      </main>
    </div>
  )
}