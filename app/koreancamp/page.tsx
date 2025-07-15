'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Link from 'next/link';

// 일정 데이터
const scheduleData = [
  {
    day: 1,
    title: "도착 & 오리엔테이션",
    activities: [
      { time: "09:00", activity: "인천공항 도착 및 픽업" },
      { time: "11:00", activity: "숙소 체크인 및 짐 정리" },
      { time: "12:00", activity: "환영 점심식사" },
      { time: "14:00", activity: "오리엔테이션 및 팀 빌딩" },
      { time: "16:00", activity: "한국어 레벨 테스트" },
      { time: "18:00", activity: "저녁식사 (한식 체험)" },
      { time: "20:00", activity: "자유시간 및 휴식" }
    ]
  },
  {
    day: 2,
    title: "서울 시내 탐방",
    activities: [
      { time: "08:00", activity: "아침식사" },
      { time: "09:30", activity: "경복궁 견학 및 한국 역사 학습" },
      { time: "11:30", activity: "인사동 전통문화 체험" },
      { time: "13:00", activity: "점심식사 (전통 한정식)" },
      { time: "15:00", activity: "명동 쇼핑 및 한국어 실전 연습" },
      { time: "17:30", activity: "N서울타워 방문" },
      { time: "19:00", activity: "저녁식사 (한국 BBQ)" },
      { time: "21:00", activity: "한강 야경 감상" }
    ]
  },
  {
    day: 3,
    title: "한국 문화 체험",
    activities: [
      { time: "08:00", activity: "아침식사" },
      { time: "09:30", activity: "한복 체험 및 사진 촬영" },
      { time: "11:00", activity: "전통 차 체험 (다도)" },
      { time: "12:30", activity: "점심식사" },
      { time: "14:00", activity: "K-POP 댄스 레슨" },
      { time: "16:00", activity: "한국 요리 만들기 (김밥, 불고기)" },
      { time: "18:00", activity: "저녁식사 (직접 만든 요리)" },
      { time: "20:00", activity: "한국 영화 감상 (자막 학습)" }
    ]
  },
  {
    day: 4,
    title: "현대 한국 체험",
    activities: [
      { time: "08:00", activity: "아침식사" },
      { time: "09:30", activity: "강남 투어 (현대 한국 문화)" },
      { time: "11:00", activity: "코엑스 아쿠아리움 방문" },
      { time: "13:00", activity: "점심식사 (푸드코트 체험)" },
      { time: "15:00", activity: "VR 체험 및 게임 문화" },
      { time: "17:00", activity: "카페 문화 체험 (한국 디저트)" },
      { time: "19:00", activity: "저녁식사 (치킨 & 맥주)" },
      { time: "21:00", activity: "노래방 체험" }
    ]
  },
  {
    day: 5,
    title: "자연 & 전통 마을",
    activities: [
      { time: "08:00", activity: "아침식사" },
      { time: "09:00", activity: "버스 이동 (한국민속촌)" },
      { time: "11:00", activity: "전통 마을 탐방" },
      { time: "13:00", activity: "점심식사 (전통 음식)" },
      { time: "15:00", activity: "전통 공예 체험" },
      { time: "17:00", activity: "서울 복귀" },
      { time: "19:00", activity: "저녁식사" },
      { time: "21:00", activity: "자유시간" }
    ]
  },
  {
    day: 6,
    title: "쇼핑 & 마무리",
    activities: [
      { time: "08:00", activity: "아침식사" },
      { time: "09:30", activity: "동대문 쇼핑몰 투어" },
      { time: "12:00", activity: "점심식사" },
      { time: "14:00", activity: "기념품 쇼핑" },
      { time: "16:00", activity: "한국어 실력 테스트" },
      { time: "18:00", activity: "수료식 및 저녁식사" },
      { time: "20:00", activity: "작별 파티" },
      { time: "22:00", activity: "숙소 정리" }
    ]
  },
  {
    day: 7,
    title: "출국",
    activities: [
      { time: "08:00", activity: "아침식사" },
      { time: "09:30", activity: "체크아웃 및 짐 정리" },
      { time: "11:00", activity: "공항 이동" },
      { time: "13:00", activity: "인천공항 도착" },
      { time: "15:00", activity: "출국 수속" },
      { time: "17:00", activity: "출발" }
    ]
  }
];

// 활동 사진 데이터
const activityImages = [
  { src: "/camp-activity1.jpg", title: "경복궁 견학", description: "한국의 전통 궁궐에서 역사를 배워요" },
  { src: "/camp-activity2.jpg", title: "한복 체험", description: "아름다운 한복을 입고 사진 촬영" },
  { src: "/camp-activity3.jpg", title: "K-POP 댄스", description: "인기 K-POP 댄스를 배워봐요" },
  { src: "/camp-activity4.jpg", title: "한국 요리", description: "직접 김밥과 불고기를 만들어요" },
  { src: "/camp-activity5.jpg", title: "한강 야경", description: "아름다운 한강의 야경 감상" },
  { src: "/camp-activity6.jpg", title: "전통 공예", description: "한국 전통 공예품 만들기 체험" }
];

const KoreanCampPage = () => {
  const [activeDay, setActiveDay] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullSchedule, setShowFullSchedule] = useState(false);
  const [currentExpoImageIndex, setCurrentExpoImageIndex] = useState(0);
  const [currentFunImageIndex, setCurrentFunImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % activityImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + activityImages.length) % activityImages.length);
  };

  // AI 엑스포 이미지 데이터
  const expoImages = [
    { src: "/ai-expo1.jpg", title: "AI 로봇 체험", description: "최신 AI 로봇과의 대화 체험" },
    { src: "/ai-expo2.jpg", title: "VR/AR 존", description: "가상현실과 증강현실 기술 체험" },
    { src: "/ai-expo3.jpg", title: "자율주행 시뮬레이터", description: "미래의 자율주행 기술 체험" },
    { src: "/ai-expo4.jpg", title: "AI 아트 워크숍", description: "AI와 함께하는 창작 활동" }
  ];

  const funTimeImages = [
    { src: "/fun-basketball.jpg", title: "농구 대회", description: "한국 친구들과 함께하는 신나는 농구 경기" },
    { src: "/fun-amusement.jpg", title: "놀이동산 체험", description: "롯데월드에서 즐기는 스릴 넘치는 놀이기구" },
    { src: "/fun-talent.jpg", title: "장기자랑 대회", description: "각국의 특별한 재능을 뽐내는 시간" },
    { src: "/fun-goldenbell.jpg", title: "한국어 골든벨", description: "배운 한국어 실력을 겨루는 퀴즈 대회" }
  ];
  


  // AI 엑스포 이미지 네비게이션 함수들
  const nextExpoImage = () => {
    setCurrentExpoImageIndex((prev) => (prev + 1) % expoImages.length);
  };

  const prevExpoImage = () => {
    setCurrentExpoImageIndex((prev) => (prev - 1 + expoImages.length) % expoImages.length);
  };

  // 놀이 시간 이미지 네비게이션 함수들
  const nextFunImage = () => {
    setCurrentFunImageIndex((prev) => (prev + 1) % funTimeImages.length);
  };
  
  const prevFunImage = () => {
    setCurrentFunImageIndex((prev) => (prev - 1 + funTimeImages.length) % funTimeImages.length);
  };



  // 도시 경험 이미지 데이터
  const [currentCityImageIndex, setCurrentCityImageIndex] = useState(0);
  const cityExperienceImages = [
    { src: "/city-post-office.jpg", title: "우체국에서 편지 보내기", description: "몽골 친구들에게 한국에서 직접 편지를 보내요" },
    { src: "/city-shopping.jpg", title: "도시 쇼핑 체험", description: "현지인처럼 한국의 쇼핑몰에서 쇼핑해요" },
    { src: "/city-cafe.jpg", title: "한국 카페 문화", description: "멋진 카페에서 특별한 음료와 디저트를 즐겨요" },
    { src: "/city-street.jpg", title: "서울 거리 탐방", description: "활기찬 서울 거리를 걸으며 도시 문화를 체험해요" }
  ];

  // 도시 경험 이미지 네비게이션 함수들
  const nextCityImage = () => {
    setCurrentCityImageIndex((prev) => (prev + 1) % cityExperienceImages.length);
  };

  const prevCityImage = () => {
    setCurrentCityImageIndex((prev) => (prev - 1 + cityExperienceImages.length) % cityExperienceImages.length);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 px-4 bg-gradient-to-br from-emerald-50 to-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/korean-pattern.svg')] opacity-5"></div>
        <div className="max-w-7xl mx-auto relative">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block bg-emerald-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6"
            >
              🇰🇷 2025년 여름 특별 프로그램
            </motion.div>
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
              AI 한국어 쥬니어 캠프
              <span className="block text-emerald-500 mt-2">실전 체험 프로그램</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              AI로 배운 한국어를 실제로 사용해보세요! <br />
              7일간 한국의 문화와 도시를 체험하며 한국어 실력을 향상시키는 특별한 기회<br />
              <span> 강의 수강생이 신청하는 경우, 수강료만큼 할인 금액이 적용됩니다.</span>
            </p>
          </motion.div>

          {/* Main Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="relative aspect-[16/10] bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/korean-camp-main.jpg" 
                alt="Korean Camp Main" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-2xl font-bold mb-2">한국에서 만나는 특별한 경험</h3>
                <p className="text-emerald-100">중학생을 위한 7일간의 한국어 실전 캠프</p>
              </div>
            </div>
            
            {/* Floating Cards */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -left-8 top-1/4 bg-white rounded-xl p-4 shadow-lg border border-emerald-100"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-500">7일</div>
                <div className="text-sm text-gray-600">완벽한 일정</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="absolute -right-8 bottom-1/4 bg-white rounded-xl p-4 shadow-lg border border-emerald-100"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-500">80만원</div>
                <div className="text-sm text-gray-600">전체 비용</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Program Features */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              왜 <span className="text-emerald-500">AI 한국어 캠프</span>인가요?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              온라인 AI 학습의 다음 단계, 실제 한국에서의 체험 학습
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🤖",
                title: "AI 학습 연계",
                description: "온라인 AI 한국어 교육을 수강한 학생들을 대상으로 한 실전 연습 기회"
              },
              {
                icon: "🏛️",
                title: "문화 체험",
                description: "경복궁, 인사동, 한복 체험 등 한국의 전통과 현대 문화를 직접 경험"
              },
              {
                icon: "🗣️",
                title: "실전 회화",
                description: "현지인과의 실제 대화를 통해 한국어 실력을 자연스럽게 향상"
              },
              {
                icon: "👥",
                title: "또래 친구들",
                description: "전 세계 중학생들과 함께하는 국제적인 친구 관계 형성"
              },
              {
                icon: "🍜",
                title: "음식 문화",
                description: "한식 체험부터 직접 요리까지, 한국의 다양한 음식 문화 탐방"
              },
              {
                icon: "🎵",
                title: "K-Culture",
                description: "K-POP, 드라마, 게임 등 한국의 현대 문화 체험"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              <span className="text-emerald-500">7일간</span>의 완벽한 일정
            </h2>
            <p className="text-xl text-gray-600">매 30분마다 체계적으로 구성된 알찬 프로그램</p>
          </motion.div>

          {/* View Toggle Buttons */}
          <div className="flex justify-center gap-4 mb-8">
          <motion.button
              onClick={() => setShowFullSchedule(true)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                showFullSchedule
                  ? 'bg-emerald-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              전체 일정 보기
            </motion.button>
            <motion.button
              onClick={() => setShowFullSchedule(false)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                !showFullSchedule
                  ? 'bg-emerald-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              상세 일정 보기
            </motion.button>
           
          </div>

          {!showFullSchedule ? (
            <>
              {/* Day Selector */}
              <div className="flex flex-wrap justify-center gap-2 mb-12">
                {scheduleData.map((day) => (
                  <motion.button
                    key={day.day}
                    onClick={() => setActiveDay(day.day)}
                    className={`px-6 py-3 rounded-full font-semibold transition-all ${
                      activeDay === day.day
                        ? 'bg-emerald-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {day.day}일차
                  </motion.button>
                ))}
              </div>

              {/* Schedule Content */}
              <motion.div
                key={activeDay}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
              >
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    {activeDay}일차: {scheduleData[activeDay - 1].title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {scheduleData[activeDay - 1].activities.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex-shrink-0">
                        {activity.time}
                      </div>
                      <div className="text-gray-700">{activity.activity}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </>
          ) : (
            /* Full Schedule Table */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-emerald-500 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">시간</th>
                      {scheduleData.map((day) => (
                        <th key={day.day} className="px-6 py-4 text-center font-semibold min-w-[200px]">
                          {day.day}일차<br />
                          <span className="text-emerald-100 text-sm font-normal">{day.title}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Get all unique times */}
                    {Array.from(
                      new Set(
                        scheduleData.flatMap(day => 
                          day.activities.map(activity => activity.time)
                        )
                      )
                    ).sort().map((time, timeIndex) => (
                      <tr key={time} className={timeIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-6 py-4 font-semibold text-emerald-600 border-r border-gray-200">
                          {time}
                        </td>
                        {scheduleData.map((day) => {
                          const activity = day.activities.find(act => act.time === time);
                          return (
                            <td key={day.day} className="px-6 py-4 text-sm text-gray-700 border-r border-gray-200">
                              {activity ? activity.activity : '-'}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Table Legend */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <span>주요 활동</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <span>자유시간/휴식</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

     

      {/* AI Expo Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              <span className="text-blue-500">AI 엑스포</span> 특별 참가
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              서울 코엑스에서 열리는 최대 규모의 AI 엑스포에 참가하여 <br />
              미래 기술을 직접 체험하고 글로벌 AI 트렌드를 경험해보세요
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Expo Images Slider */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <motion.img
                  key={currentExpoImageIndex}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  src={expoImages[currentExpoImageIndex].src}
                  alt={expoImages[currentExpoImageIndex].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-bold mb-2">{expoImages[currentExpoImageIndex].title}</h3>
                  <p className="text-gray-200 text-sm">{expoImages[currentExpoImageIndex].description}</p>
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevExpoImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextExpoImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Dots Indicator */}
              <div className="flex justify-center mt-6 space-x-2">
                {expoImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentExpoImageIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      index === currentExpoImageIndex ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Expo Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">🤖 AI 엑스포 2025</h3>
                <p className="text-gray-600 mb-6">
                  아시아 최대 규모의 AI 전시회에서 최신 인공지능 기술을 직접 체험하고, 
                  글로벌 AI 기업들의 혁신적인 제품들을 만나보세요.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: "🏢",
                    title: "장소",
                    content: "서울 코엑스 전시장"
                  },
                  {
                    icon: "📅",
                    title: "일정",
                    content: "캠프 4일차 (7월 18일)"
                  },
                  {
                    icon: "⏰",
                    title: "시간",
                    content: "오전 10시 - 오후 5시"
                  },
                  {
                    icon: "👥",
                    title: "참가 형태",
                    content: "그룹 투어 (전문 가이드)"
                  }
                ].map((info, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                    <div className="text-2xl mb-2">{info.icon}</div>
                    <div className="font-semibold text-gray-900 text-sm mb-1">{info.title}</div>
                    <div className="text-gray-600 text-sm">{info.content}</div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <h4 className="font-bold text-gray-900 mb-4">🎯 체험 프로그램</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    AI 로봇과의 대화 체험
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    VR/AR 기술 체험존
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    자율주행차 시뮬레이터
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    AI 아트 창작 워크숍
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    글로벌 AI 기업 부스 투어
                  </li>
                </ul>
              </div>

              <div className="flex gap-4">
                <motion.a
                  href="https://www.coex.co.kr/exhibition"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-center transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  코엑스 공식 사이트
                </motion.a>
                <motion.a
                  href="https://www.ai-expo.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold text-center transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  AI 엑스포 정보
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* City Experience Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              <span className="text-orange-500">진짜 한국</span> 도시 생활 체험
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              관광지가 아닌 진짜 한국인의 일상을 체험해보세요 <br />
              우체국에서 편지 보내기부터 로컬 카페까지, 생생한 도시 문화 체험
            </p>
            <div className="flex gap-3 mb-6 justify-center mt-12">
                  {cityExperienceImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentCityImageIndex(index)}
                      className={`p-3 rounded-xl border-2 transition-all text-left ${
                        index === currentCityImageIndex 
                          ? 'border-orange-500 bg-orange-50 text-orange-700' 
                          : 'border-gray-200 bg-white text-gray-600 hover:border-orange-300'
                      }`}
                    >
                      <div className="font-semibold text-sm">{image.title}</div>
                      <div className="text-xs mt-1 opacity-70">{image.description}</div>
                    </button>
                  ))}
                </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* City Experience Images Slider */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-500 to-yellow-500 text-white">
                  <div className="text-center">
                    <div className="text-6xl mb-4">
                      {currentCityImageIndex === 0 && "📮"}
                      {currentCityImageIndex === 1 && "🛍️"}
                      {currentCityImageIndex === 2 && "☕"}
                      {currentCityImageIndex === 3 && "🏙️"}
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{cityExperienceImages[currentCityImageIndex].title}</h3>
                    <p className="text-orange-100 text-lg">{cityExperienceImages[currentCityImageIndex].description}</p>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevCityImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextCityImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Dots Indicator */}
              <div className="flex justify-center mt-6 space-x-2">
                {cityExperienceImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentCityImageIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      index === currentCityImageIndex ? 'bg-orange-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            {/* City Experience Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8 order-1 lg:order-2"
            >
                           <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {currentCityImageIndex === 0 && "📮 우체국에서 편지 보내기"}
                  {currentCityImageIndex === 1 && "🛍️ 도시 쇼핑 체험"}
                  {currentCityImageIndex === 2 && "☕ 한국 카페 문화"}
                  {currentCityImageIndex === 3 && "🏙️ 서울 거리 탐방"}
                </h3>
                <p className="text-gray-600 mb-6">
                  관광 명소가 아닌 한국인들의 실제 생활 공간에서 
                  진짜 한국 문화를 체험하고 한국어를 자연스럽게 사용해보세요.
                </p>
                {/* Experience Type Buttons */}
                
              </div>
              {/* 현재 선택된 이미지에 해당하는 카드만 표시 */}
              <motion.div
                key={currentCityImageIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {(() => {
                  const specialExperiences = [
                    // 우체국 편지 보내기 (인덱스 0)
                    [
                      "한국 우표 수집하기",
                      "국제우편 시스템 체험",
                      "한국어로 주소 쓰기",
                      "편지 문화 체험하기"
                    ],
                    // 로컬 쇼핑 체험 (인덱스 1)
                    [
                      "현지 마트에서 쇼핑하기",
                      "가격 흥정 연습하기",
                      "한국 브랜드 알아보기",
                      "쇼핑 에티켓 배우기"
                    ],
                    // 카페 문화 체험 (인덱스 2)
                    [
                      "한국 전통차 맛보기",
                      "카페 주문 연습하기",
                      "디저트 문화 체험",
                      "인스타 사진 찍기"
                    ],
                    // 서울 거리 탐방 (인덱스 3)
                    [
                      "지하철 타고 이동하기",
                      "편의점에서 쇼핑하기",
                      "한국 돈 사용법 배우기",
                      "현지인과 대화하기"
                    ]
                  ];
                  
                  return specialExperiences[currentCityImageIndex].map((experience, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-700">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                      {experience}
                    </div>
                  ));
                })()}
              </motion.div>

              <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                <h4 className="font-bold text-gray-900 mb-4">✨ 특별한 경험</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  {(() => {
                    const specialExperiences = [
                      // 우체국 편지 보내기 (인덱스 0)
                      [
                        "한국 우표 수집하기",
                        "국제우편 시스템 체험",
                        "한국어로 주소 쓰기",
                        "편지 문화 체험하기"
                      ],
                      // 로컬 쇼핑 체험 (인덱스 1)
                      [
                        "현지 마트에서 쇼핑하기",
                        "가격 흥정 연습하기",
                        "한국 브랜드 알아보기",
                        "쇼핑 에티켓 배우기"
                      ],
                      // 카페 문화 체험 (인덱스 2)
                      [
                        "한국 전통차 맛보기",
                        "카페 주문 연습하기",
                        "디저트 문화 체험",
                        "인스타 사진 찍기"
                      ],
                      // 서울 거리 탐방 (인덱스 3)
                      [
                        "지하철 타고 이동하기",
                        "편의점에서 쇼핑하기",
                        "한국 돈 사용법 배우기",
                        "현지인과 대화하기"
                      ]
                    ];
                    
                    return specialExperiences[currentCityImageIndex].map((experience, index) => (
                      <div key={index} className="flex items-center gap-2 text-gray-700">
                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                        {experience}
                      </div>
                    ));
                  })()}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Fun Time Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              <span className="text-purple-500">즐거운 놀이</span> 시간 체험
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              공부만 하는 캠프는 No! 신나는 놀이와 게임으로 <br />
              한국어를 자연스럽게 배우고 평생 잊지 못할 추억을 만들어요
            </p>
            <div className="flex gap-3 mb-6 justify-center mt-12">
                  {funTimeImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentFunImageIndex(index)}
                      className={`p-3 rounded-xl border-2 transition-all text-left ${
                        index === currentFunImageIndex 
                          ? 'border-purple-500 bg-purple-50 text-purple-700' 
                          : 'border-gray-200 bg-white text-gray-600 hover:border-purple-300'
                      }`}
                    >
                      <div className="font-semibold text-sm">{image.title}</div>
                      <div className="text-xs mt-1 opacity-70">{image.description}</div>
                    </button>
                  ))}
                </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Fun Time Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8 order-1 lg:order-1"
            >
                            <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {currentFunImageIndex === 0 && "🏀 농구 대회"}
                  {currentFunImageIndex === 1 && "🎢 놀이동산 체험"}
                  {currentFunImageIndex === 2 && "🎭 장기자랑 대회"}
                  {currentFunImageIndex === 3 && "🔔 한국어 골든벨"}
                </h3>
                <p className="text-gray-600 mb-6">
                  책상에서만 공부하는 지루한 수업은 그만! 
                  놀면서 배우는 한국어 학습으로 더 재미있고 효과적으로 실력을 늘려보세요.
                </p>
              </div>

              {/* 현재 선택된 이미지에 해당하는 카드만 표시 */}
              <motion.div
                key={currentFunImageIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {(() => {
                  const funActivities = [
                    // 농구 대회 (인덱스 0)
                    [
                      "팀별 토너먼트 진행",
                      "한국어 응원가 배우기",
                      "스포츠 용어 익히기",
                      "한국 농구 문화 체험"
                    ],
                    // 놀이동산 체험 (인덱스 1)
                    [
                      "롤러코스터 도전하기",
                      "놀이기구 이름 배우기",
                      "감정 표현 연습하기",
                      "즐거움 공유하기"
                    ],
                    // 장기자랑 대회 (인덱스 2)
                    [
                      "각국 전통 공연하기",
                      "한국어로 MC 체험",
                      "무대 매너 배우기",
                      "협동 공연 준비하기"
                    ],
                    // 한국어 골든벨 (인덱스 3)
                    [
                      "실시간 퀴즈 도전",
                      "한국 상식 배우기",
                      "순발력 기르기",
                      "팀워크 다지기"
                    ]
                  ];
                  
                  return funActivities[currentFunImageIndex].map((activity, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-700">
                      <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                      {activity}
                    </div>
                  ));
                })()}
              </motion.div>

              <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                <h4 className="font-bold text-gray-900 mb-4">🏆 특별한 상품</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  {(() => {
                    const specialRewards = [
                      // 농구 대회 (인덱스 0)
                      [
                        "우승팀 트로피 증정",
                        "한국 농구 유니폼",
                        "스포츠 용품 세트",
                        "MVP 개별 상장"
                      ],
                      // 놀이동산 체험 (인덱스 1)
                      [
                        "포토존 기념품",
                        "캐릭터 인형 선물",
                        "롯데월드 기념품",
                        "추억 앨범 제작"
                      ],
                      // 장기자랑 대회 (인덱스 2)
                      [
                        "최우수상 상금",
                        "공연 영상 제작",
                        "한국 전통 소품",
                        "개인 소질 개발비"
                      ],
                      // 한국어 골든벨 (인덱스 3)
                      [
                        "골든벨 우승 트로피",
                        "한국어 학습 교재",
                        "문화상품권 지급",
                        "한국어 인증서"
                      ]
                    ];
                    
                    return specialRewards[currentFunImageIndex].map((reward, index) => (
                      <div key={index} className="flex items-center gap-2 text-gray-700">
                        <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                        {reward}
                      </div>
                    ));
                  })()}
                </div>
              </div>
            </motion.div>

            {/* Fun Time Images Slider */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative order-2 lg:order-2"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                  <div className="text-center">
                    <div className="text-6xl mb-4">
                      {currentFunImageIndex === 0 && "🏀"}
                      {currentFunImageIndex === 1 && "🎢"}
                      {currentFunImageIndex === 2 && "🎭"}
                      {currentFunImageIndex === 3 && "🔔"}
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{funTimeImages[currentFunImageIndex].title}</h3>
                    <p className="text-purple-100 text-lg">{funTimeImages[currentFunImageIndex].description}</p>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevFunImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextFunImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Dots Indicator */}
              <div className="flex justify-center mt-6 space-x-2">
                {funTimeImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentFunImageIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      index === currentFunImageIndex ? 'bg-purple-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

 {/* Activity Photos Slider */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              <span className="text-emerald-500">생생한</span> 활동 사진
            </h2>
            <p className="text-xl text-gray-600">지난 캠프 참가자들의 즐거운 순간들</p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-emerald-500 to-emerald-600"
            >
              {/* Text Content Instead of Image */}
              <div className="w-full h-full flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-6xl mb-4">
                    {currentImageIndex === 0 && "🏛️"}
                    {currentImageIndex === 1 && "👘"}
                    {currentImageIndex === 2 && "💃"}
                    {currentImageIndex === 3 && "🍜"}
                    {currentImageIndex === 4 && "🌉"}
                    {currentImageIndex === 5 && "🎨"}
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{activityImages[currentImageIndex].title}</h3>
                  <p className="text-xl text-emerald-100">{activityImages[currentImageIndex].description}</p>
                </div>
              </div>
            </motion.div>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {activityImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentImageIndex ? 'bg-emerald-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Pricing & Application */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              지금 바로 <span className="text-emerald-500">신청하세요</span>
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              한정된 인원만 참가 가능한 특별한 기회입니다
            </p>

            <div className="bg-gradient-to-br from-emerald-50 to-white border-2 border-emerald-200 rounded-2xl p-8 mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="text-5xl font-bold text-emerald-500 mb-4">₩800,000</div>
                  <div className="text-gray-600 mb-6">
                    <div className="font-semibold text-lg mb-2">포함 사항:</div>
                    <ul className="text-left space-y-1">
                      <li>✓ 6박 7일 숙박비</li>
                      <li>✓ 모든 식사 (아침, 점심, 저녁)</li>
                      <li>✓ 교통비 (공항 픽업/드롭)</li>
                      <li>✓ 모든 체험 활동비</li>
                      <li>✓ 전문 가이드 및 안전 관리</li>
                      <li>✓ 수료증 발급</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 text-left">
                    <div className="font-semibold text-gray-900 mb-2">📅 캠프 일정</div>
                    <div className="text-gray-600">2025년 7월 15일 - 7월 21일</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-left">
                    <div className="font-semibold text-gray-900 mb-2">👥 모집 인원</div>
                    <div className="text-gray-600">전 세계 중학생 20명 한정</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-left">
                    <div className="font-semibold text-gray-900 mb-2">📋 참가 자격</div>
                    <div className="text-gray-600">AI 한국어 교육 수강 완료자</div>
                  </div>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-12 py-4 rounded-full text-xl font-bold transition-all shadow-lg"
            >
              지금 신청하기
            </motion.button>

            <p className="text-sm text-gray-500 mt-4">
              * 조기 마감될 수 있습니다. 빠른 신청을 권장합니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              자주 묻는 <span className="text-emerald-500">질문</span>
            </h2>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "참가 자격이 어떻게 되나요?",
                answer: "AI 한국어 교육 프로그램을 수강 완료한 중학생(만 13-15세)이 참가 가능합니다."
              },
              {
                question: "안전 관리는 어떻게 이루어지나요?",
                answer: "전문 인솔자와 현지 가이드가 24시간 동행하며, 모든 활동에서 안전을 최우선으로 관리합니다."
              },
              {
                question: "한국어 실력이 부족해도 참가할 수 있나요?",
                answer: "AI 교육을 통해 기초를 다진 학생들을 대상으로 하므로, 실전 연습을 통해 실력을 향상시킬 수 있습니다."
              },
              {
                question: "취소 및 환불 정책은 어떻게 되나요?",
                answer: "출발 30일 전까지는 100% 환불, 15일 전까지는 50% 환불이 가능합니다."
              }
            ].map((faq, index) => (
              <motion.details
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-6 shadow-lg cursor-pointer group"
              >
                <summary className="font-semibold text-gray-900 flex justify-between items-center">
                  {faq.question}
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="text-gray-600 mt-4">{faq.answer}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default KoreanCampPage;