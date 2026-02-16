import { ArrowRight, Star } from 'lucide-react';

function RecentApplications({ applications, candidates, onViewAll, onViewCandidate }) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200" data-testid="recent-applications">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Recent Applications</h2>
          <p className="text-sm text-gray-500 mt-0.5">Latest candidates who applied to your jobs</p>
        </div>
        <button
          className="flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
          data-testid="view-all-applications"
          onClick={onViewAll}
        >
          View all
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        {applications.map((application) => {
          const candidate = candidates.find(c => c.id === application.candidateId);
          if (!candidate) return null;

          return (
            <div
              key={application.id}
              data-testid={`application-${application.id}`}
              className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => onViewCandidate(candidate)}
            >
              <img
                src={application.avatar || ''}
                alt={application.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900">{application.name}</h3>
                <p className="text-sm text-gray-500">Applied for: {application.role}</p>
                <p className="text-xs text-gray-400 mt-1">{application.time}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold text-gray-900">{application.score}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{application.referrals} referrals</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecentApplications;