export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">관리자 대시보드</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Course Stats */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-2">강의</h2>
          <p className="text-3xl font-bold text-emerald-400">2</p>
          <p className="text-sm text-gray-400 mt-2">총 강의 수</p>
        </div>

        {/* News Stats */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-2">뉴스 게시물</h2>
          <p className="text-3xl font-bold text-emerald-400">12</p>
          <p className="text-sm text-gray-400 mt-2">총 게시물 수</p>
        </div>

        {/* User Stats */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-2">사용자</h2>
          <p className="text-3xl font-bold text-emerald-400">1,234</p>
          <p className="text-sm text-gray-400 mt-2">총 가입자 수</p>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-2">최근 활동</h2>
          <p className="text-3xl font-bold text-emerald-400">89</p>
          <p className="text-sm text-gray-400 mt-2">오늘 방문자</p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-white mb-6">빠른 작업</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="/admin/courses" className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-emerald-500 transition-colors">
            <h3 className="text-lg font-semibold text-white mb-2">강의 관리</h3>
            <p className="text-gray-400">강의 목록을 확인하고 관리합니다</p>
          </a>
          <a href="/admin/news/new" className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-emerald-500 transition-colors">
            <h3 className="text-lg font-semibold text-white mb-2">새 뉴스 작성</h3>
            <p className="text-gray-400">새로운 뉴스 게시물을 작성합니다</p>
          </a>
        </div>
      </div>
    </div>
  )
}