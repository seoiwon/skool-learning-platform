'use client'

import Header from '@/components/Header'
import { useState } from 'react'

export default function Help() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const faqs = [
    {
      question: "AIskool!은 어떤 서비스인가요?",
      answer: "AIskool!은 AI 기술을 활용한 한국어 학습 플랫폼입니다. 개인 맞춤형 커리큘럼, 실시간 피드백, AI 채팅을 통해 효과적으로 한국어를 배울 수 있습니다."
    },
    {
      question: "무료로 사용할 수 있나요?",
      answer: "네, 기본 플랜은 무료로 제공됩니다. 기초 강의 5개, AI 채팅 월 50회, 기본 진도 추적 기능을 무료로 이용하실 수 있습니다."
    },
    {
      question: "AI 채팅은 어떻게 작동하나요?",
      answer: "자연어 처리 기술을 활용하여 AI와 실시간으로 한국어 대화를 나눌 수 있습니다. AI가 발음, 문법, 어휘를 실시간으로 분석하여 피드백을 제공합니다."
    },
    {
      question: "수료증은 언제 받을 수 있나요?",
      answer: "각 과정의 모든 레슨을 완료하고 최종 평가를 통과하면 수료증이 발급됩니다. 수료증은 PDF 형태로 다운로드하거나 이메일로 받을 수 있습니다."
    },
    {
      question: "모바일에서도 사용할 수 있나요?",
      answer: "네, 웹 브라우저를 통해 모바일 기기에서도 모든 기능을 이용하실 수 있습니다. 추후 모바일 앱도 출시될 예정입니다."
    },
    {
      question: "결제는 어떻게 하나요?",
      answer: "신용카드, 체크카드, 계좌이체를 통해 결제하실 수 있습니다. 모든 결제는 안전하게 암호화되어 처리됩니다."
    },
    {
      question: "환불 정책은 어떻게 되나요?",
      answer: "구매 후 7일 이내에 서비스를 이용하지 않았다면 100% 환불이 가능합니다. 부분 이용 시에는 이용일수를 제외한 금액이 환불됩니다."
    },
    {
      question: "기술적 문제가 있을 때는 어떻게 하나요?",
      answer: "문의하기 페이지를 통해 기술 지원을 요청하시거나 support@aiskool.com으로 이메일을 보내주세요. 평일 9시-18시에 빠르게 응답드립니다."
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-navy-900 mb-4">
              도움말
            </h1>
            <p className="text-xl text-gray-600">
              자주 묻는 질문들을 확인해 보세요
            </p>
          </div>

          {/* Search Box */}
          <div className="mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="궁금한 내용을 검색해 보세요..."
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* FAQ Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">시작하기</h3>
              <p className="text-gray-600 text-sm">계정 생성, 첫 수업 등</p>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">💳</span>
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">결제 및 요금</h3>
              <p className="text-gray-600 text-sm">구독, 환불, 결제 방법</p>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🛠️</span>
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">기술 지원</h3>
              <p className="text-gray-600 text-sm">로그인 문제, 버그 신고</p>
            </div>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-navy-900 mb-6">자주 묻는 질문</h2>
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                >
                  <span className="font-medium text-navy-900">{faq.question}</span>
                  <svg 
                    className={`w-5 h-5 text-gray-500 transform transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-16 bg-gray-50 rounded-xl p-8 text-center">
            <h3 className="text-xl font-semibold text-navy-900 mb-4">
              원하는 답변을 찾지 못하셨나요?
            </h3>
            <p className="text-gray-600 mb-6">
              문의하기를 통해 직접 질문해 주시면 빠르게 답변드리겠습니다.
            </p>
            <a 
              href="/contact"
              className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              문의하기
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}