function QuickActions({ actions, onActionClick }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {actions.map((action, index) => {
        const Icon = action.icon;
        return (
          <button
            key={index}
            onClick={() => onActionClick(action)}
            data-testid={`action-${action.title.toLowerCase().replace(/\s+/g, "-")}`}
            className={`p-8 rounded-xl border transition-all duration-200 hover:scale-105 hover:shadow-xl ${
              action.isPrimary
                ? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-emerald-600"
                : "bg-white text-gray-900 border-gray-200 hover:border-emerald-500"
            }`}
          >
            <Icon
              className={`w-8 h-8 mx-auto mb-3 ${
                action.isPrimary ? "text-white" : "text-gray-600"
              }`}
            />
            <p className={`font-semibold ${action.isPrimary ? "text-white" : "text-gray-900"}`}>
              {action.title}
            </p>
          </button>
        );
      })}
    </div>
  );
}

export default QuickActions;