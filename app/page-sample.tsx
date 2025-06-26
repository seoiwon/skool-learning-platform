import ChatButton from '@/components/ChatButton'
import NewsSection from '@/components/NewsSection'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-navy-900">AIskool!</h1>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/login" className="text-gray-600 hover:text-navy-900 px-3 py-2 text-sm font-medium">
                로그인
              </a>
              <a href="/login" className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                시작하기
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-navy-900 mb-6">
            자연어 AI로 만드는
            <span className="text-emerald-500"> 스마트 교육</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            한국어 자연어 처리 전문 기술로 더 똑똑한 AI 교육을 경험하세요. 
            AIskool!의 혁신적인 언어 이해 기술로 완벽한 맞춤형 학습을 제공합니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/login" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105">
              무료로 시작하기
            </a>
            <a href="#features" className="border border-gray-300 hover:border-gray-400 text-navy-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              더 알아보기
            </a>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-navy-900 text-center mb-16">
            AI 교육의 <span className="text-emerald-500">혁신</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-stone-100 border border-gray-200 rounded-xl p-8 hover:border-emerald-500/50 transition-colors">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">한국어 특화 AI 분석</h3>
              <p className="text-gray-600">
                한국어의 미묘한 뉘앙스까지 이해하는 AI가 정확한 피드백을 제공합니다.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-stone-100 border border-gray-200 rounded-xl p-8 hover:border-emerald-500/50 transition-colors">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">자연어 기반 대화형 학습</h3>
              <p className="text-gray-600">
                자연스러운 대화로 학습하며 실시간으로 이해도를 파악합니다.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-stone-100 border border-gray-200 rounded-xl p-8 hover:border-emerald-500/50 transition-colors">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">학습 분석 리포트</h3>
              <p className="text-gray-600">
                상세한 학습 데이터로 진도와 성과를 한눈에 확인하세요.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-stone-100 border border-gray-200 rounded-xl p-8 hover:border-emerald-500/50 transition-colors">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">협업 학습 환경</h3>
              <p className="text-gray-600">
                동료들과 함께 학습하고 지식을 공유하는 커뮤니티
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-stone-100 border border-gray-200 rounded-xl p-8 hover:border-emerald-500/50 transition-colors">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">24/7 한국어 AI 튜터</h3>
              <p className="text-gray-600">
                언제든지 한국어로 자유롭게 질문하고 답변받을 수 있습니다.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-stone-100 border border-gray-200 rounded-xl p-8 hover:border-emerald-500/50 transition-colors">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">안전한 학습 환경</h3>
              <p className="text-gray-600">
                개인정보 보호와 안전한 학습 데이터 관리
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Demo Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-navy-900 text-center mb-16">
            <span className="text-emerald-500">3분</span>으로 알아보는 AIskool!
          </h2>
          <div className="relative aspect-video bg-stone-100 rounded-xl overflow-hidden border border-gray-200">
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full p-6 transition-all transform hover:scale-110">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </button>
            </div>
            <div className="absolute bottom-4 left-4 bg-white/80 px-3 py-1 rounded-full">
              <span className="text-navy-900 text-sm">데모 영상 보기</span>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-navy-900 text-center mb-16">
            다양한 <span className="text-emerald-500">활용 사례</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-navy-900 mb-3">대학생 & 연구원</h3>
                <p className="text-gray-600">논문 작성, 데이터 분석, AI 모델 학습 등 학술 연구에 필요한 전문 지식을 효율적으로 습득</p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A8.987 8.987 0 0112 21c-5 0-9-4.03-9-9s4-9 9-9a8.985 8.985 0 019 8.985M21 21l-5.982-5.981M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-navy-900 mb-3">개발자 & 엔지니어</h3>
                <p className="text-gray-600">최신 AI 기술 트렌드 학습, 실무 프로젝트 적용 방법, 코드 최적화 기법 마스터</p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-navy-900 mb-3">기업 교육 담당자</h3>
                <p className="text-gray-600">직원들의 AI 역량 강화, 맞춤형 교육 커리큘럼 설계, 학습 성과 측정 및 관리</p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-navy-900 mb-3">창업가 & 혁신가</h3>
                <p className="text-gray-600">AI 기반 비즈니스 모델 개발, MVP 구축 방법, 시장 분석 및 전략 수립</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-navy-900 text-center mb-16">
            체계적인 <span className="text-emerald-500">학습 경로</span>
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-emerald-500/30"></div>
            
            <div className="space-y-12">
              <div className="flex items-center gap-8">
                <div className="flex-1 text-right">
                  <h3 className="text-xl font-semibold text-navy-900 mb-2">AI 기초 이해</h3>
                  <p className="text-gray-600">인공지능의 개념과 기본 원리 학습</p>
                </div>
                <div className="relative z-10 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                <div className="flex-1"></div>
              </div>
              
              <div className="flex items-center gap-8">
                <div className="flex-1"></div>
                <div className="relative z-10 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-navy-900 mb-2">자연어 처리 입문</h3>
                  <p className="text-gray-600">텍스트 분석과 언어 모델의 이해</p>
                </div>
              </div>
              
              <div className="flex items-center gap-8">
                <div className="flex-1 text-right">
                  <h3 className="text-xl font-semibold text-navy-900 mb-2">실전 프로젝트</h3>
                  <p className="text-gray-600">실제 문제 해결을 위한 AI 적용</p>
                </div>
                <div className="relative z-10 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                <div className="flex-1"></div>
              </div>
              
              <div className="flex items-center gap-8">
                <div className="flex-1"></div>
                <div className="relative z-10 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">4</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-navy-900 mb-2">고급 AI 기술</h3>
                  <p className="text-gray-600">최신 연구 동향과 advanced techniques</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certification Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-navy-900 mb-6">
            공인 <span className="text-emerald-500">수료증</span> 발급
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            과정 완료 시 LinkedIn에 공유 가능한 공식 수료증을 받으세요
          </p>
          <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-500/10 border border-emerald-500/50 rounded-xl p-12 max-w-2xl mx-auto">
            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <div className="text-emerald-500 font-bold text-2xl mb-4">Certificate of Completion</div>
              <div className="text-navy-900 text-xl mb-2">AI & Natural Language Processing</div>
              <div className="text-gray-600">AIskool! Professional Certification</div>
              <div className="mt-8 flex justify-between items-center">
                <div className="text-gray-500 text-sm">Issued: 2024.01.20</div>
                <div className="text-emerald-500">
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-navy-900 text-center mb-16">
            강력한 <span className="text-emerald-500">통합 기능</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Slack', 'GitHub', 'Notion', 'Google Drive', 'VS Code', 'Jupyter', 'Teams', 'Zoom'].map((tool) => (
              <div key={tool} className="bg-stone-100 border border-gray-200 rounded-lg p-6 text-center hover:border-emerald-500/50 transition-colors">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-lg mx-auto mb-4"></div>
                <span className="text-navy-900 font-medium">{tool}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Metrics Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-navy-900 text-center mb-16">
            학습 <span className="text-emerald-500">성과 지표</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative inline-block mb-6">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="none" className="text-gray-300" />
                  <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="none" strokeDasharray="351.86" strokeDashoffset="87.96" className="text-emerald-500" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-navy-900">75%</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-2">평균 완주율</h3>
              <p className="text-gray-600">업계 평균 대비 3배 높은 완주율</p>
            </div>
            
            <div className="text-center">
              <div className="relative inline-block mb-6">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="none" className="text-gray-300" />
                  <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="none" strokeDasharray="351.86" strokeDashoffset="35.19" className="text-emerald-500" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-navy-900">90%</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-2">실무 적용률</h3>
              <p className="text-gray-600">학습 내용을 실제 업무에 적용</p>
            </div>
            
            <div className="text-center">
              <div className="relative inline-block mb-6">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="none" className="text-gray-300" />
                  <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="none" strokeDasharray="351.86" strokeDashoffset="70.37" className="text-emerald-500" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-navy-900">80%</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-2">경력 성장</h3>
              <p className="text-gray-600">수료 후 승진 또는 이직 성공</p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-navy-900 text-center mb-16">
            활발한 <span className="text-emerald-500">커뮤니티</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-stone-100 border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-emerald-500 text-sm">오늘의 인기 질문</span>
                <span className="text-gray-500 text-sm">조회 1.2k</span>
              </div>
              <h3 className="text-navy-900 font-semibold mb-2">Transformer 모델의 Attention 메커니즘 이해하기</h3>
              <p className="text-gray-600 text-sm mb-4">어텐션 메커니즘이 어떻게 작동하는지 쉽게 설명해주실 수 있나요?</p>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-500">답변 15</span>
                <span className="text-gray-500">좋아요 42</span>
              </div>
            </div>
            
            <div className="bg-stone-100 border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-emerald-500 text-sm">스터디 그룹</span>
                <span className="text-gray-500 text-sm">멤버 85명</span>
              </div>
              <h3 className="text-navy-900 font-semibold mb-2">주말 AI 논문 읽기 모임</h3>
              <p className="text-gray-600 text-sm mb-4">매주 토요일 오전 10시, 최신 AI 논문을 함께 읽고 토론합니다.</p>
              <button className="bg-emerald-500/20 text-emerald-600 px-4 py-2 rounded-lg text-sm hover:bg-emerald-500/30 transition-colors">
                참여하기
              </button>
            </div>
            
            <div className="bg-stone-100 border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-emerald-500 text-sm">프로젝트 쇼케이스</span>
                <span className="text-gray-500 text-sm">2일 전</span>
              </div>
              <h3 className="text-navy-900 font-semibold mb-2">한국어 감정 분석 챗봇 만들기</h3>
              <p className="text-gray-600 text-sm mb-4">AIskool!에서 배운 내용으로 고객 상담 챗봇을 구현했습니다.</p>
              <div className="flex items-center gap-2">
                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">#NLP</span>
                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">#챗봇</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-navy-900 text-center mb-16">
            왜 <span className="text-emerald-500">AIskool!</span>인가?
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg overflow-hidden shadow-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-stone-100">
                  <th className="text-left py-4 px-6 text-gray-600 font-medium">기능</th>
                  <th className="text-center py-4 px-6 text-navy-900 font-semibold">AIskool!</th>
                  <th className="text-center py-4 px-6 text-gray-600 font-medium">타사 A</th>
                  <th className="text-center py-4 px-6 text-gray-600 font-medium">타사 B</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-6 text-gray-700">한국어 자연어 처리</td>
                  <td className="text-center py-4 px-6">
                    <svg className="w-6 h-6 text-emerald-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </td>
                  <td className="text-center py-4 px-6">
                    <svg className="w-6 h-6 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </td>
                  <td className="text-center py-4 px-6">
                    <svg className="w-6 h-6 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-6 text-gray-700">24/7 AI 튜터</td>
                  <td className="text-center py-4 px-6">
                    <svg className="w-6 h-6 text-emerald-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </td>
                  <td className="text-center py-4 px-6">
                    <svg className="w-6 h-6 text-emerald-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </td>
                  <td className="text-center py-4 px-6">
                    <svg className="w-6 h-6 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-6 text-gray-700">실시간 코드 실행</td>
                  <td className="text-center py-4 px-6">
                    <svg className="w-6 h-6 text-emerald-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </td>
                  <td className="text-center py-4 px-6">
                    <svg className="w-6 h-6 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </td>
                  <td className="text-center py-4 px-6">
                    <svg className="w-6 h-6 text-emerald-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-6 text-gray-700">기업용 관리 도구</td>
                  <td className="text-center py-4 px-6">
                    <svg className="w-6 h-6 text-emerald-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </td>
                  <td className="text-center py-4 px-6">
                    <svg className="w-6 h-6 text-emerald-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </td>
                  <td className="text-center py-4 px-6">
                    <svg className="w-6 h-6 text-emerald-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-700">가격</td>
                  <td className="text-center py-4 px-6 text-emerald-500 font-semibold">₩29,900~</td>
                  <td className="text-center py-4 px-6 text-gray-600">₩49,000~</td>
                  <td className="text-center py-4 px-6 text-gray-600">₩39,000~</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-navy-900 mb-16">
            수상 <span className="text-emerald-500">경력</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-500/10 border border-emerald-500/50 rounded-xl p-8">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-10 h-10 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-2">2023 AI 교육 혁신상</h3>
              <p className="text-gray-600">한국인공지능협회</p>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-500/10 border border-emerald-500/50 rounded-xl p-8">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-10 h-10 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-2">Best EdTech Startup</h3>
              <p className="text-gray-600">Asia Pacific Awards</p>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-500/10 border border-emerald-500/50 rounded-xl p-8">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-10 h-10 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-2">ISO 27001 인증</h3>
              <p className="text-gray-600">정보보안 국제표준</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-emerald-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-navy-900 mb-6">
            지금 바로 <span className="text-emerald-500">AI 교육</span>을 시작하세요
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            첫 달은 무료로 모든 기능을 체험해보세요
          </p>
          <a href="/login" className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-5 rounded-lg text-lg font-semibold transition-all transform hover:scale-105">
            무료 체험 시작하기
          </a>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-navy-900 text-center mb-16">
            <span className="text-emerald-500">10,000+</span> 학습자의 선택
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-stone-100 border border-gray-200 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <span className="text-emerald-500 font-bold">김OO</span>
                </div>
                <div className="ml-4">
                  <p className="text-navy-900 font-semibold">대학생</p>
                  <p className="text-xs text-gray-500">서울대학교</p>
                </div>
              </div>
              <p className="text-gray-700">
                "자연어 처리 기술이 정말 놀라워요. 제가 이해하지 못한 부분을 정확히 파악해서 설명해줍니다."
              </p>
            </div>
            <div className="bg-stone-100 border border-gray-200 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <span className="text-emerald-500 font-bold">이OO</span>
                </div>
                <div className="ml-4">
                  <p className="text-navy-900 font-semibold">직장인</p>
                  <p className="text-xs text-gray-500">삼성전자</p>
                </div>
              </div>
              <p className="text-gray-700">
                "업무에 필요한 AI 지식을 효율적으로 학습할 수 있어서 좋아요. 시간 절약이 많이 됩니다."
              </p>
            </div>
            <div className="bg-stone-100 border border-gray-200 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <span className="text-emerald-500 font-bold">박OO</span>
                </div>
                <div className="ml-4">
                  <p className="text-navy-900 font-semibold">개발자</p>
                  <p className="text-xs text-gray-500">네이버</p>
                </div>
              </div>
              <p className="text-gray-700">
                "한국어로 된 AI 교육 플랫폼 중에서 최고예요. 실무에 바로 적용할 수 있는 내용들이 많습니다."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-navy-900 text-center mb-4">
            합리적인 <span className="text-emerald-500">요금제</span>
          </h2>
          <p className="text-center text-gray-600 mb-16">모든 플랜에 7일 무료 체험이 포함되어 있습니다</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 hover:border-emerald-500/50 transition-colors">
              <h3 className="text-2xl font-bold text-navy-900 mb-2">Basic</h3>
              <p className="text-gray-600 mb-6">개인 학습자용</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-navy-900">₩29,900</span>
                <span className="text-gray-600">/월</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  AI 튜터 무제한 질문
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  기본 학습 분석
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  모바일 앱 지원
                </li>
              </ul>
              <button className="w-full bg-gray-200 hover:bg-gray-300 text-navy-900 py-3 rounded-lg transition-colors">
                시작하기
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-emerald-50 border-2 border-emerald-500 rounded-xl p-8 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-semibold">인기</span>
              </div>
              <h3 className="text-2xl font-bold text-navy-900 mb-2">Pro</h3>
              <p className="text-gray-600 mb-6">전문가용</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-navy-900">₩59,900</span>
                <span className="text-gray-600">/월</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Basic의 모든 기능
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  고급 학습 분석
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  1:1 멘토링 월 2회
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  우선 지원
                </li>
              </ul>
              <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg transition-colors font-semibold">
                시작하기
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 hover:border-emerald-500/50 transition-colors">
              <h3 className="text-2xl font-bold text-navy-900 mb-2">Enterprise</h3>
              <p className="text-gray-600 mb-6">기업용</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-navy-900">맞춤형</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Pro의 모든 기능
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  팀 관리 대시보드
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  API 액세스
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  전담 계정 관리자
                </li>
              </ul>
              <button className="w-full bg-gray-200 hover:bg-gray-300 text-navy-900 py-3 rounded-lg transition-colors">
                문의하기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-navy-900 text-center mb-16">
            자주 묻는 <span className="text-emerald-500">질문</span>
          </h2>
          <div className="space-y-6">
            <details className="bg-stone-100 border border-gray-200 rounded-lg p-6 cursor-pointer group">
              <summary className="text-navy-900 font-semibold flex justify-between items-center">
                AIskool!은 어떤 기술을 사용하나요?
                <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="text-gray-600 mt-4">
                최신 한국어 자연어 처리(NLP) 기술과 대규모 언어 모델(LLM)을 활용하여 학습자의 질문을 정확히 이해하고 맞춤형 답변을 제공합니다.
              </p>
            </details>
            
            <details className="bg-stone-100 border border-gray-200 rounded-lg p-6 cursor-pointer group">
              <summary className="text-navy-900 font-semibold flex justify-between items-center">
                무료 체험 기간이 있나요?
                <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="text-gray-600 mt-4">
                네, 모든 플랜에 7일 무료 체험이 포함되어 있습니다. 신용카드 정보 없이도 시작할 수 있습니다.
              </p>
            </details>

            <details className="bg-stone-100 border border-gray-200 rounded-lg p-6 cursor-pointer group">
              <summary className="text-navy-900 font-semibold flex justify-between items-center">
                환불 정책은 어떻게 되나요?
                <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="text-gray-600 mt-4">
                구매 후 30일 이내에는 100% 환불이 가능합니다. 고객님의 만족이 저희의 최우선 목표입니다.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-emerald-500 mb-2">10K+</div>
              <p className="text-gray-600">활성 사용자</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-500 mb-2">95%</div>
              <p className="text-gray-600">만족도</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-500 mb-2">24/7</div>
              <p className="text-gray-600">AI 지원</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-500 mb-2">50+</div>
              <p className="text-gray-600">학습 과정</p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog/News Section */}
      <NewsSection />

      {/* Partners Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-navy-900 text-center mb-16">
            함께하는 <span className="text-emerald-500">파트너</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-8 flex items-center justify-center hover:border-emerald-500/50 transition-colors">
                <div className="text-gray-500 font-bold text-xl">Partner {i}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-navy-900 mb-6">
            <span className="text-emerald-500">문의</span>하기
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            AIskool! 팀이 도와드리겠습니다
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-navy-900 font-semibold mb-2">이메일</h3>
              <p className="text-gray-600">support@aiskool.ai</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-navy-900 font-semibold mb-2">전화</h3>
              <p className="text-gray-600">02-1234-5678</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-navy-900 font-semibold mb-2">위치</h3>
              <p className="text-gray-600">서울시 강남구</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-navy-900 font-bold text-xl mb-4">AIskool!</h3>
              <p className="text-gray-600 text-sm">한국어 자연어 처리 전문 AI 교육 플랫폼</p>
            </div>
            <div>
              <h4 className="text-navy-900 font-semibold mb-4">제품</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-navy-900 text-sm">기능</a></li>
                <li><a href="#" className="text-gray-600 hover:text-navy-900 text-sm">요금제</a></li>
                <li><a href="#" className="text-gray-600 hover:text-navy-900 text-sm">기업용</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-navy-900 font-semibold mb-4">회사</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-navy-900 text-sm">소개</a></li>
                <li><a href="#" className="text-gray-600 hover:text-navy-900 text-sm">채용</a></li>
                <li><a href="#" className="text-gray-600 hover:text-navy-900 text-sm">블로그</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-navy-900 font-semibold mb-4">지원</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-navy-900 text-sm">도움말</a></li>
                <li><a href="#" className="text-gray-600 hover:text-navy-900 text-sm">문의하기</a></li>
                <li><a href="#" className="text-gray-600 hover:text-navy-900 text-sm">개인정보처리방침</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center text-gray-600">
            <p>&copy; 2024 AIskool!. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Chat Button */}
      <ChatButton />
    </div>
  )
}