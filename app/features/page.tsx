'use client'

import Header from '@/components/Header'
import Link from 'next/link'

export default function Features() {
  const features = [
    {
      title: "AI 맞춤 학습",
      description: "개인의 학습 수준과 목표에 맞춰 AI가 최적화된 커리큘럼을 제공합니다.",
      icon: "🤖"
    },
    {
      title: "실시간 피드백",
      description: "한국어 발음, 문법, 어휘를 실시간으로 분석하여 즉각적인 피드백을 제공합니다.",
      icon: "⚡"
    },
    {
      title: "자연어 처리",
      description: "최신 NLP 기술을 활용하여 자연스러운 한국어 대화 연습이 가능합니다.",
      icon: "💬"
    },
    {
      title: "진도 추적",
      description: "학습 진행도를 시각적으로 확인하고 목표 달성까지의 과정을 관리합니다.",
      icon: "📊"
    },
    {
      title: "채팅 학습",
      description: "AI와의 대화를 통해 실용적인 한국어 표현을 자연스럽게 익힐 수 있습니다.",
      icon: "💬"
    },
    {
      title: "수료증 발급",
      description: "과정 완료 시 공식 수료증을 발급하여 학습 성과를 인증받을 수 있습니다.",
      icon: "🏆"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-navy-900 mb-4">
              <span className="text-emerald-500">AIskool!</span> 기능
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AI 기술을 활용한 혁신적인 한국어 학습 기능들을 만나보세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-navy-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link 
              href="/login"
              className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
            >
              지금 시작하기
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}