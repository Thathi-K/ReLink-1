function StatsGrid({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            data-testid={`stat-card-${index}`}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                <h3 className="text-4xl font-bold text-gray-900">{stat.value}</h3>
              </div>
              <div className={`${stat.iconBg} ${stat.iconColor} p-3 rounded-xl`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
            <p className="text-xs text-gray-500">{stat.change}</p>
          </div>
        );
      })}
    </div>
  );
}

export default StatsGrid;