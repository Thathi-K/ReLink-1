import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext"; // adjust path to your AuthContext

function Sidebar({ navItems, activeNav, onNavClick, unreadMessagesCount }) {
  const navigate = useNavigate();
  const { logout, user } = useAuth(); // get logout function and user state

  const handleLogout = () => {
    logout();           // clears token & user state globally
    navigate("/login"); // safely redirect after logout
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col" data-testid="sidebar">
      {/* Logo */}
      <div className="h-20 flex items-center px-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">R</span>
          </div>
          <span className="text-xl font-bold text-gray-900">ReLink</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1" data-testid="navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavClick(item)}
              data-testid={`nav-${item.id}`}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-emerald-50 text-emerald-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.label}</span>

              {item.id === "messages" && unreadMessagesCount > 0 && (
                <span className="ml-auto px-2 py-0.5 bg-emerald-500 text-white text-xs font-bold rounded-full">
                  {unreadMessagesCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200" data-testid="user-profile">
        <div className="flex items-center gap-3 px-2 py-3">
          <img
            src={user?.avatar || "https://i.pravatar.cc/150?img=47"}
            alt={user?.name || "User"}
            className="w-10 h-10 rounded-full object-cover"
          />

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {user?.name || "Sarah Chen"}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user?.email || "sarah@techcorp.com"}
            </p>
          </div>

          <button
            className="text-gray-400 hover:text-gray-600 transition-colors"
            onClick={handleLogout}
            data-testid="logout-button"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
