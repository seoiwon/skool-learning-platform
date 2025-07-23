'use client'

import Header from '@/components/Header'
import Link from 'next/link'

export default function Pricing() {
  const plans = [
    {
      name: "기본",
      price: "무료",
      period: "",
      description: "한국어 학습을 시작하는 분들을 위한 기본 플랜",
      features: [
        "기초 한국어 강의 5개",
        "AI 채팅 월 50회",
        "기본 진도 추적",
        "커뮤니티 접근"
      ],
      buttonText: "무료로 시작하기",
      isPopular: false
    },
    {
      name: "스탠다드",
      price: "29,000",
      period: "/월",
      description: "체계적인 학습을 원하는 분들을 위한 인기 플랜",
      features: [
        "모든 한국어 강의 무제한",
        "AI 채팅 무제한",
        "개인 맞춤 커리큘럼",
        "실시간 피드백",
        "진도 상세 분석",
        "수료증 발급"
      ],
      buttonText: "시작하기",
      isPopular: true
    },
    {
      name: "프리미엄",
      price: "49,000",
      period: "/월",
      description: "전문적인 한국어 능력을 원하는 분들을 위한 최고 플랜",
      features: [
        "스탠다드 플랜 모든 기능",
        "1:1 개인 튜터링",
        "한국어 캠프 할인",
        "TOPIK 시험 대비",
        "취업 준비 과정",
        "우선 고객 지원"
      ],
      buttonText: "시작하기",
      isPopular: false
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-navy-900 mb-4">
              간단하고 투명한 <span className="text-emerald-500">요금제</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              당신의 학습 목표에 맞는 최적의 플랜을 선택하세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`relative bg-white border-2 rounded-xl p-8 ${
                  plan.isPopular ? 'border-emerald-500' : 'border-gray-200'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      인기
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold text-navy-900 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-navy-900">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  href="/login"
                  className={`block w-full text-center py-3 rounded-lg font-medium transition-colors ${
                    plan.isPopular 
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  {plan.buttonText}
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-4">
              더 많은 정보가 필요하신가요?
            </p>
            <Link 
              href="/contact"
              className="text-emerald-500 hover:text-emerald-600 font-medium"
            >
              문의하기 →
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}