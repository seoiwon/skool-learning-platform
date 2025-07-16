'use client'
import ChatButton from '@/components/ChatButton'
import NewsSection from '@/components/NewsSection'
import Header from '@/components/Header'
import Link from 'next/link'
import { motion } from 'framer-motion'
export default function Home() {
  const learningSteps = [
    {
      number: "1",
      title: "TOPIK 1-2급 공부하기",
      description: "한국어 읽기와 기본 문법 이해",
      position: "left"
    },
    {
      number: "FREE",
      title: "기초 단어 암기",
      description: "모바일 앱을 통한 전문적인 단어 학습",
      position: "left",
      isSmall: true
    },
    {
      number: "2",
      title: "한국어 현지 캠프",
      description: "단기 집중 코스 및 현지 문화 체험",
      position: "right"
    },
    {
      number: "FREE",
      title: "2025 AI SUMMIT 참가",
      description: "한국에서 열리는 전 세계 AI 기술 체험",
      position: "right",
      isSmall: true
    },
    {
      number: "3",
      title: "TOPIK 1-2급 시험",
      description: "실전 시험 환경 경험",
      position: "left"
    },
    {
      number: "FREE",
      title: "시험 대비 영상",
      description: "전문 강사의 시험 현장 어드바이스",
      position: "left",
      isSmall: true
    },
    {
      number: "4",
      title: "TOPIK 3-4급 공부하기",
      description: "중급 한국어 실력 향상 및 어휘 확장",
      position: "right"
    },
    {
      number: "FREE",
      title: "기출 대비 심화 과정",
      description: "모바일 앱을 통한 기출 모의고사 학습 ",
      position: "right",
      isSmall: true
    },
    {
      number: "5",
      title: "TOPIK 3-4급 시험",
      description: "실전 시험",
      position: "left"
    },
    {
      number: "FREE",
      title: "한국 유학 준비",
      description: "대학 입학 서류 및 비자 준비 컨설팅",
      position: "left",
      isSmall: true
    },
    {
      number: "6",
      title: "한국 대학 입학",
      description: "한국에 거주하며 유학생활 시작하기",
      position: "right"
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />


      {/* Hero Section */}
      <section className="pt-20 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
        <div className="flex space-x-8 justify-center mb-12 bg-emerald-500 rounded-full py-2 px-8 w-fit mx-auto">
                <Link href="/menu1" className="text-yellow-400 hover:text-emerald-600 font-medium transition-colors">
                  25년 여름 한국어 캠프
                </Link>
                <Link href="/menu2" className="text-sm mt-[2px] text-white hover:text-emerald-600 font-medium transition-colors">
                  26년 1월 AI코딩 캠프
                </Link>
                <Link href="/menu3" className="text-sm mt-[2px] text-white hover:text-emerald-600 font-medium transition-colors">
                  26년 여름 한국어·AI 캠프
                </Link>
              
              </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-navy-900 mb-6">
            한국어 공부와
            <span className="text-emerald-500 flex flex-col my-3">가을 캠프를</span>
            우리와 함께
            
          </h1>
          <div className="flex items-center justify-center">
          <img src="/logo7.png" className="w-20 h-10"></img>
          <span className="ml-1 my-4">은 AI 기술과 언어를 교육하는 브랜드입니다.</span>
          </div>
    
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">

            <a href="/courses" className="border border-gray-300 hover:border-gray-400 text-navy-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              TOPIK 공부하기
            </a>
            <a href="#features" className="hidden border border-gray-300 hover:border-gray-400 text-navy-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              무제한 문제풀기
            </a>
            <a href="/login" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105">
             가을 단기 한국어 캠프
            </a>
          </div>
        </div>
      </section>




      {/* Lecture Cards */}
      <section id="features" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-navy-900 text-center mb-16"
          >
            무조건 합격하는 <span className="text-emerald-500">TOPIK 강의</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Lecture 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative">
                <div className="h-48 bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  초급
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-navy-900 mb-2">한국어 기초 강의 </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  TOPIK 1-2급을 응시하고자 하는 수험생에게 적합합니다.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    8주 과정
                  </div>
                  <div className="hidden flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    1,248명
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-emerald-600">₩49,000</div>
                  <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors group-hover:scale-105 transform duration-200">
                    수강신청
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Lecture 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  중급
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-navy-900 mb-2">TOPIK 3-4급 문제 유형별 강의</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  기출을 유형별로 분석해 빠르게 학습이 가능합니다. (TOPIK 3-4급)
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    12주 과정
                  </div>
                  <div className="hidden flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    856명
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-blue-600">₩79,000</div>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors group-hover:scale-105 transform duration-200">
                    수강신청
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Lecture 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative">
                <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  고급
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-navy-900 mb-2">TOPIK 3-4급 기출 문제 강의</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  실전에서 빠르게 문제를 풀기 위한 효과적인 방법을 배워보세요.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    16주 과정
                  </div>
                  <div className="hidden flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    642명
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-purple-600">₩89,000</div>
                  <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors group-hover:scale-105 transform duration-200">
                    수강신청
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bundle Deals Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-navy-900 text-center mb-16"
          >
           가을캠프 <span className="text-emerald-500">할인혜택</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Bundle Deal 1 - 초급자 패키지 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-center mb-6">
                <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold inline-block mb-4">
                  초급자 패키지
                </div>
                <h3 className="text-2xl font-bold text-navy-900 mb-3">한국어 기초 + 캠프</h3>
                <p className="text-gray-600 text-sm">
                  기초 강의로 탄탄한 실력 + 현지 경험
                </p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  한국어 기초 강의 (₩49,000)
                </div>
                <div className="flex items-center text-sm">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  가을 캠프 참여권 (₩800,000)
                </div>
                <div className="invisible flex items-center text-sm">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  TOPIK 3-4급 기출 문제 강의 (₩89,000)
                </div>
                <div className="invisible flex items-center text-sm">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  가을 캠프 참여권 (₩800,000)
                </div>
                <div className="border-t pt-3 mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 line-through">정가: ₩849,000</span>
                    <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded">6% 할인</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-4">₩800,000</div>
                <button className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 duration-200">
                  지금 신청하기
                </button>
              </div>
            </motion.div>

            {/* Bundle Deal 2 - 중급 패키지 */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-xl border-2 border-emerald-200 hover:shadow-2xl transition-all duration-300 relative"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-2 rounded-full text-sm font-bold">
                  🔥 인기
                </span>
              </div>
              <div className="text-center mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold inline-block mb-4">
                  중급 패키지
                </div>
                <h3 className="text-2xl font-bold text-navy-900 mb-3">TOPIK 3-4급 완전정복</h3>
                <p className="text-gray-600 text-sm">
                  문제 유형별 분석 + 기출문제 완벽 정리
                </p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  TOPIK 3-4급 문제 유형별 강의 (₩79,000)
                </div>
                <div className="flex items-center text-sm">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  TOPIK 3-4급 기출 문제 강의 (₩89,000)
                </div>
                <div className="invisible flex items-center text-sm">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  TOPIK 3-4급 기출 문제 강의 (₩89,000)
                </div>
                <div className="invisible flex items-center text-sm">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  가을 캠프 참여권 (₩800,000)
                </div>
                <div className="border-t pt-3 mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 line-through">정가: ₩168,000</span>
                    <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded">11% 할인</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-4">₩149,000</div>
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 duration-200">
                  지금 신청하기
                </button>
              </div>
            </motion.div>

            {/* Bundle Deal 3 - 올인원 패키지 */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-8   shadow-xl border-2 border-emerald-200 hover:shadow-2xl transition-all duration-300 relative"
            >
              <div className="hidden absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-2 rounded-full text-sm font-bold">
                  🔥 인기
                </span>
              </div>
              
              <div className="text-center mb-6">
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold inline-block mb-4">
                  올인원 패키지
                </div>
                <h3 className="text-2xl font-bold text-navy-900 mb-3">완벽한 한국어 마스터</h3>
                <p className="text-gray-600 text-sm">
                  기초부터 고급까지 + 가을 캠프 포함
                </p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  한국어 기초 강의 (₩49,000)
                </div>
                <div className="flex items-center text-sm">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  TOPIK 3-4급 문제 유형별 강의 (₩79,000)
                </div>
                <div className="flex items-center text-sm">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  TOPIK 3-4급 기출 문제 강의 (₩89,000)
                </div>
                <div className="flex items-center text-sm">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  가을 캠프 참여권 (₩800,000)
                </div>
                <div className="border-t pt-3 mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 line-through">정가: ₩1,017,000</span>
                    <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded">2% 할인</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-4">₩1,000,000</div>
                <button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 duration-200">
                  지금 신청하기
                </button>
              </div>
            </motion.div>
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
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-navy-900 text-center mb-16"
          >
            한국어 <span className="text-emerald-500">기초부터 유학까지</span>
          </motion.h2>
          <div className="relative">
            <motion.div 
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-emerald-500/30 origin-top"
            ></motion.div>
            
            <div className="space-y-12">
              {learningSteps.map((step, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, x: step.position === "left" ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center gap-8"
                >
                  {step.position === "left" ? (
                    <>
                      <div className={`flex-1 ${step.isSmall ? 'flex justify-end' : 'text-right'}`}>
                        <div className={`${step.isSmall ? 'border border-blue-300 rounded-lg p-3 bg-blue-50/30 inline-block text-right' : ''}`}>
                          <h3 className={`${step.isSmall ? 'text-sm font-bold text-blue-700' : 'text-xl font-semibold text-navy-900'} mb-2`}>{step.title}</h3>
                          <p className={`${step.isSmall ? 'text-xs text-black/60' : 'text-gray-600'}`}>{step.description}</p>
                        </div>
                      </div>
                      <div className={`relative z-10 ${step.isSmall ? 'w-12 h-7 bg-blue-500 text-xs' : 'w-12 h-12 bg-emerald-500'} rounded-full flex items-center justify-center text-white font-bold shadow-lg ${step.isSmall ? 'shadow-blue-500/50' : 'shadow-emerald-500/50'}`}>
                        {step.number}
                      </div>
                      <div className="flex-1"></div>
                    </>
                  ) : (
                    <>
                      <div className="flex-1"></div>
                      <div className={`relative z-10 ${step.isSmall ? 'w-12 h-7 bg-blue-500 text-xs' : 'w-12 h-12 bg-emerald-500'} rounded-full flex items-center justify-center text-white font-bold shadow-lg ${step.isSmall ? 'shadow-blue-500/50' : 'shadow-emerald-500/50'}`}>
                        {step.number}
                      </div>
                      <div className={`flex-1 ${step.isSmall ? 'flex justify-start' : ''}`}>
                      <div className={`${step.isSmall ? 'border border-blue-300 rounded-lg p-3 bg-blue-50/30 inline-block text-right' : ''}`}>
                          <h3 className={`${step.isSmall ? 'text-sm font-bold text-blue-700' : 'text-xl font-semibold text-navy-900'} mb-2`}>{step.title}</h3>
                          <p className={`${step.isSmall ? 'text-xs text-black/60' : 'text-gray-600'}`}>{step.description}</p>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certification Section */}
      <section className="py-20 px-4 bg-gray-50 hidden">
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
      <section className="py-20 px-4 hidden">
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
      <section className="py-20 px-4 bg-gray-50 hidden">
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
                <span className="text-emerald-500 text-sm">Facebook</span>
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
                  <td className="py-4 px-6 text-gray-700">한국 최대 커뮤니티</td>
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
                  <td className="py-4 px-6 text-gray-700">한국어 6급 강사</td>
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
                  <td className="py-4 px-6 text-gray-700">AI 벤처 교육기업</td>
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
                  <td className="py-4 px-6 text-gray-700">한국어 강의 및 캠프 동시 운영</td>
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
        
              </tbody>
            </table>
          </div>
        </div>
      </section>



      {/* Awards Section */}
      <section className="py-20 px-4 hidden">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-navy-900 mb-16">
             <span className="text-emerald-500">AI 교육 앱</span>
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
            지금 바로 <span className="text-emerald-500">한국어 공부</span>를 시작하세요
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            단기간에 TOPIK 점수를 받을 수 있는 최고의 커리큘럼을 소개합니다.
          </p>
          <a href="/courses" className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-5 rounded-lg text-lg font-semibold transition-all transform hover:scale-105">
            AI skool 강의 둘러보기
          </a>
        </div>
      </section>

     
      {/* Pricing Section */}
      <section className="py-20 px-4 bg-gray-50 hidden">
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
      <section className="py-20 px-4 bg-gray-50 hidden">
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