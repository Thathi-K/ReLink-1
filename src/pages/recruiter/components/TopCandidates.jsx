import { ArrowRight, Heart } from 'lucide-react';

function TopCandidates({ candidates, favorites, onViewAll, onViewCandidate, onToggleFavorite }) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200" data-testid="top-candidates">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Top Candidates</h2>
          <p className="text-sm text-gray-500 mt-0.5">Highest credibility scores matching your criteria</p>
        </div>
        <button
          className="flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
          data-testid="view-all-candidates"
          onClick={onViewAll}
        >
          View all
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        {candidates.map((candidate) => (
          <div
            key={candidate.id}
            data-testid={`candidate-${candidate.id}`}
            className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => onViewCandidate(candidate)}
          >
            {candidate.avatar ? (
              <img
                src={candidate.avatar}
                alt={candidate.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                {candidate.initials}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {candidate.skills.slice(0, 3).map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-bold rounded-md">
                {candidate.score} Score
              </span>
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(candidate.id);
                  }}
                  className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  <Heart className={`w-4 h-4 ${favorites.includes(candidate.id) ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
                <button
                  className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                  data-testid={`view-profile-${candidate.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewCandidate(candidate);
                  }}
                >
                  View Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopCandidates;