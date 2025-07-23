'use client'

import Header from '@/components/Header'

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-navy-900 mb-4">
              개인정보처리방침
            </h1>
            <p className="text-lg text-gray-600">
              최종 업데이트: 2024년 1월 1일
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">1. 개인정보의 처리 목적</h2>
              <p className="text-gray-700 mb-4">
                AIskool!은(는) 다음의 목적을 위하여 개인정보를 처리하고 있으며, 다음의 목적 이외의 용도로는 이용하지 않습니다.
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>회원 가입 및 관리</li>
                <li>교육 서비스 제공</li>
                <li>회원제 서비스 이용에 따른 본인확인, 개인 식별</li>
                <li>부정이용 방지</li>
                <li>각종 고지·통지</li>
                <li>고충처리</li>
                <li>마케팅 및 광고에의 활용</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">2. 개인정보의 처리 및 보유 기간</h2>
              <p className="text-gray-700 mb-4">
                AIskool!은(는) 정보주체로부터 개인정보를 수집할 때 동의받은 개인정보 보유·이용기간 또는 법령에 따른 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy-900 mb-2">처리 및 보유 기간:</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>회원 탈퇴 시까지</li>
                  <li>다만, 다음의 사유에 해당하는 경우에는 해당 사유 종료시까지</li>
                  <li>관계 법령 위반에 따른 수사·조사 등이 진행중인 경우에는 해당 수사·조사 종료시까지</li>
                  <li>웹사이트 이용에 따른 채권·채무관계 잔존시에는 해당 채권·채무관계 정산시까지</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">3. 처리하는 개인정보의 항목</h2>
              <p className="text-gray-700 mb-4">
                AIskool!은(는) 다음의 개인정보 항목을 처리하고 있습니다.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-navy-900 mb-2">필수항목:</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>이메일, 비밀번호</li>
                  <li>서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보</li>
                </ul>
                <h3 className="font-semibold text-navy-900 mb-2 mt-4">선택항목:</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>이름, 전화번호</li>
                  <li>학습 진도, 성취도 정보</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">4. 개인정보의 제3자 제공</h2>
              <p className="text-gray-700 mb-4">
                AIskool!은(는) 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">5. 개인정보처리의 위탁</h2>
              <p className="text-gray-700 mb-4">
                AIskool!은(는) 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>위탁받는 자: 클라우드 서비스 제공업체</li>
                  <li>위탁하는 업무의 내용: 데이터 저장 및 백업</li>
                  <li>위탁기간: 서비스 이용기간</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">6. 정보주체의 권리·의무 및 그 행사방법</h2>
              <p className="text-gray-700 mb-4">
                정보주체는 AIskool!에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>개인정보 처리현황 통지요구</li>
                <li>오류 등이 있을 경우 정정·삭제 요구</li>
                <li>처리정지 요구</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">7. 개인정보의 파기</h2>
              <p className="text-gray-700 mb-4">
                AIskool!은(는) 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">8. 개인정보 보호책임자</h2>
              <p className="text-gray-700 mb-4">
                AIskool!은(는) 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
              </p>
              <div className="bg-emerald-50 p-6 rounded-lg">
                <h3 className="font-semibold text-navy-900 mb-3">▶ 개인정보 보호책임자</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>성명: 홍길동</li>
                  <li>직책: 개인정보보호책임자</li>
                  <li>연락처: 02-1234-5678, privacy@aiskool.com</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">9. 개인정보 처리방침 변경</h2>
              <p className="text-gray-700 mb-4">
                이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
              </p>
            </section>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              개인정보 처리방침에 대한 문의사항이 있으시면 언제든지 연락해 주세요.
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