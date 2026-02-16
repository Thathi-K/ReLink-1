import { Search, Bell } from 'lucide-react';

function TopBar({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onNotificationClick,
  unreadNotificationsCount,
  children
}) {
  return (
    <header className="h-20 bg-white border-b border-gray-200 px-8 flex items-center justify-between" data-testid="top-bar">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Recruiter Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">Welcome back, Sarah!</p>
      </div>

      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <form onSubmit={onSearchSubmit} className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search candidates..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            data-testid="search-input"
            className="w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
          />
        </form>

        {/* Notifications */}
        <div className="relative">
          <button
            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            data-testid="notifications-button"
            onClick={onNotificationClick}
          >
            <Bell className="w-5 h-5 text-gray-600" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadNotificationsCount}
              </span>
            )}
          </button>
          {children}
        </div>
      </div>
    </header>
  );
}

export default TopBar;