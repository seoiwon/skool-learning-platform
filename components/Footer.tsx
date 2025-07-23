'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <img src="/logo7.png" alt="SKOOL" className="h-12 w-auto" />
            </div>
            <p className="text-gray-300 mb-4">
              한국어 자연어 처리 전문 AI 교육 서비스
            </p>
            <p className="text-gray-400 text-sm">
              © 2024 AIskool. All rights reserved.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">서비스</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/courses" className="text-gray-300 hover:text-white transition-colors">
                  강의
                </Link>
              </li>
              <li>
                <Link href="/koreancamp" className="text-gray-300 hover:text-white transition-colors">
                  한국어 캠프
                </Link>
              </li>
              <li>
                <Link href="/chat" className="text-gray-300 hover:text-white transition-colors">
                  채팅
                </Link>
              </li>
              <li>
                <Link href="/certificates" className="text-gray-300 hover:text-white transition-colors">
                  수료증
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">고객지원</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/account" className="text-gray-300 hover:text-white transition-colors">
                  계정 관리
                </Link>
              </li>
              <li>
                <Link href="/billing" className="text-gray-300 hover:text-white transition-colors">
                  결제 내역
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-300 hover:text-white transition-colors">
                  공지사항
                </Link>
              </li>
              <li>
                <a href="mailto:support@aiskool.com" className="text-gray-300 hover:text-white transition-colors">
                  문의하기
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}