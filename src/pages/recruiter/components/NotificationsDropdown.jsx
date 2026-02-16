import { forwardRef } from 'react';
import { FileText, Calendar, Bell } from 'lucide-react';

const NotificationsDropdown = forwardRef(({ 
  isOpen, 
  notifications, 
  onMarkAsRead, 
  onMarkAllAsRead, 
  onClose 
}, ref) => {
  if (!isOpen) return null;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'application':
        return <FileText className="w-5 h-5" />;
      case 'interview':
        return <Calendar className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getIconBgColor = (type) => {
    switch (type) {
      case 'application':
        return 'bg-blue-100 text-blue-600';
      case 'interview':
        return 'bg-emerald-100 text-emerald-600';
      default:
        return 'bg-amber-100 text-amber-600';
    }
  };

  return (
    <div
      ref={ref}
      className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden"
      data-testid="notifications-dropdown"
    >
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-900">Notifications</h3>
          <button
            className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
            onClick={onMarkAllAsRead}
            data-testid="mark-all-read"
          >
            Mark all as read
          </button>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            data-testid={`notification-${notification.id}`}
            className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
              !notification.read ? "bg-emerald-50" : ""
            }`}
            onClick={() => onMarkAsRead(notification.id)}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getIconBgColor(
                  notification.type
                )}`}
              >
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-gray-900 text-sm">
                    {notification.title}
                  </p>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0 mt-1.5" />
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-gray-200 bg-gray-50">
        <button
          className="w-full text-center text-sm font-medium text-emerald-600 hover:text-emerald-700 py-2"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
});

NotificationsDropdown.displayName = 'NotificationsDropdown';

export default NotificationsDropdown;