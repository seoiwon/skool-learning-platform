'use client'

import Header from '@/components/Header'
import Link from 'next/link'

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-navy-900 mb-4">
              <span className="text-emerald-500">AIskool!</span> 소개
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AI 기술로 한국어 학습의 새로운 패러다임을 제시하는 교육 플랫폼입니다
            </p>
          </div>

          {/* Mission Section */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-navy-900 mb-4 text-center">우리의 미션</h2>
              <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto">
                전 세계 모든 사람이 AI의 도움으로 효과적이고 즐겁게 한국어를 배울 수 있도록 하는 것입니다. 
                개인 맞춤형 학습 경험을 통해 언어 장벽을 허물고, 문화적 소통의 다리 역할을 하고자 합니다.
              </p>
            </div>
          </section>

          {/* Story Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">우리의 이야기</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-xl font-semibold text-navy-900 mb-4">문제 인식</h3>
                <p className="text-gray-600 mb-6">
                  기존의 한국어 학습 방법은 획일적이고 개인의 학습 스타일을 고려하지 못했습니다. 
                  많은 학습자들이 중도에 포기하거나 효과적인 학습을 하지 못하는 문제가 있었습니다.
                </p>
                <h3 className="text-xl font-semibold text-navy-900 mb-4">해결책 제시</h3>
                <p className="text-gray-600">
                  AI와 자연어 처리 기술을 활용하여 개인 맞춤형 학습 경험을 제공하고, 
                  실시간 피드백과 대화형 학습을 통해 더 효과적인 한국어 학습을 가능하게 했습니다.
                </p>
              </div>
              <div className="bg-gray-100 rounded-xl p-8">
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full mr-4"></div>
                    <span className="text-gray-700">2023년 AIskool 프로젝트 시작</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full mr-4"></div>
                    <span className="text-gray-700">AI 자연어 처리 엔진 개발</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full mr-4"></div>
                    <span className="text-gray-700">베타 테스트 및 피드백 수집</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full mr-4"></div>
                    <span className="text-gray-700">2024년 정식 서비스 런칭</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">핵심 가치</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold text-navy-900 mb-3">개인화</h3>
                <p className="text-gray-600">
                  모든 학습자는 고유하며, 개인의 수준과 목표에 맞는 맞춤형 학습을 제공합니다.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-semibold text-navy-900 mb-3">혁신</h3>
                <p className="text-gray-600">
                  최신 AI 기술을 교육에 접목하여 더 효과적인 학습 방법을 지속적으로 개발합니다.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-semibold text-navy-900 mb-3">접근성</h3>
                <p className="text-gray-600">
                  언제 어디서나 누구든지 양질의 한국어 교육을 받을 수 있도록 합니다.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gray-50 rounded-xl p-12">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">
              AIskool!과 함께 한국어 학습을 시작하세요
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              AI가 제공하는 개인 맞춤형 학습으로 더 빠르고 효과적으로 한국어를 배워보세요
            </p>
            <Link 
              href="/login"
              className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
            >
              무료로 시작하기
            </Link>
          </section>
        </div>
      </main>
    </div>
  )
}