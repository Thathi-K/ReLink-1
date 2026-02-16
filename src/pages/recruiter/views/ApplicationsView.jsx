import { Filter, ArrowUpDown, Star, FileText, Check, XCircle } from 'lucide-react';

function ApplicationsView({
  applications,
  candidates,
  applicationFilter,
  applicationSortBy,
  onFilterChange,
  onSortChange,
  onStatusChange,
  onViewCandidate
}) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Applications</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage and review candidate applications
          </p>
        </div>
        <div className="flex gap-3">
          {/* Filter */}
          <div className="relative">
            <select
              value={applicationFilter}
              onChange={(e) => onFilterChange(e.target.value)}
              data-testid="application-filter"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white"
            >
              <option value="all">All Applications</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          {/* Sort */}
          <div className="relative">
            <select
              value={applicationSortBy}
              onChange={(e) => onSortChange(e.target.value)}
              data-testid="application-sort"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white"
            >
              <option value="recent">Most Recent</option>
              <option value="score">Highest Score</option>
            </select>
            <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {applications.map((app) => {
          const candidate = candidates.find(c => c.id === app.candidateId);

          return (
            <div
              key={app.id}
              data-testid={`application-card-${app.id}`}
              className="p-5 border border-gray-200 rounded-lg hover:border-emerald-500 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4">
                {app.avatar ? (
                  <img
                    src={app.avatar}
                    alt={app.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                    {app.initials || app.name.charAt(0)}
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{app.name}</h3>
                      <p className="text-gray-600 text-sm">Applied for: {app.role}</p>
                      <p className="text-gray-400 text-xs mt-1">{app.time}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-amber-500 mb-2">
                        <Star className="w-5 h-5 fill-current" />
                        <span className="font-bold text-gray-900 text-lg">{app.score}</span>
                      </div>
                      <p className="text-xs text-gray-500">{app.referrals} referrals</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        app.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : app.status === "accepted"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>

                    {app.status === "pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => onStatusChange(app.id, "accepted")}
                          data-testid={`accept-${app.id}`}
                          className="px-4 py-1.5 bg-emerald-500 text-white text-sm font-medium rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-1"
                        >
                          <Check className="w-4 h-4" />
                          Accept
                        </button>
                        <button
                          onClick={() => onStatusChange(app.id, "rejected")}
                          data-testid={`reject-${app.id}`}
                          className="px-4 py-1.5 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors flex items-center gap-1"
                        >
                          <XCircle className="w-4 h-4" />
                          Reject
                        </button>
                      </div>
                    )}

                    <button
                      onClick={() => onViewCandidate(candidate)}
                      data-testid={`view-details-${app.id}`}
                      className="ml-auto px-4 py-1.5 border border-emerald-500 text-emerald-600 text-sm font-medium rounded-lg hover:bg-emerald-50 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {applications.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No applications found</p>
        </div>
      )}
    </div>
  );
}

export default ApplicationsView;