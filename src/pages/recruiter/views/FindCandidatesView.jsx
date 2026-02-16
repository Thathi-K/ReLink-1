import { Users, MapPin, Heart, Filter, ArrowUpDown } from 'lucide-react';

function FindCandidatesView({
  candidates,
  filteredCandidates,
  favorites,
  candidateFilter,
  candidateSortBy,
  onFilterChange,
  onSortChange,
  onToggleFavorite,
  onViewCandidate
}) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Find Candidates</h2>
          <p className="text-sm text-gray-500 mt-1">
            Browse and connect with talented professionals
          </p>
        </div>
        <div className="flex gap-3">
          {/* Filter */}
          <div className="relative">
            <select
              value={candidateFilter}
              onChange={(e) => onFilterChange(e.target.value)}
              data-testid="candidate-filter"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white"
            >
              <option value="all">All Candidates</option>
              <option value="favorites">Favorites Only</option>
            </select>
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          {/* Sort */}
          <div className="relative">
            <select
              value={candidateSortBy}
              onChange={(e) => onSortChange(e.target.value)}
              data-testid="candidate-sort"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white"
            >
              <option value="score">Sort by Score</option>
              <option value="name">Sort by Name</option>
            </select>
            <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCandidates.map((candidate) => (
          <div
            key={candidate.id}
            data-testid={`candidate-card-${candidate.id}`}
            className="p-5 border border-gray-200 rounded-lg hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer relative"
            onClick={() => onViewCandidate(candidate)}
          >
            {/* Favorite Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(candidate.id);
              }}
              data-testid={`favorite-${candidate.id}`}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Heart
                className={`w-5 h-5 ${
                  favorites.includes(candidate.id)
                    ? "fill-red-500 text-red-500"
                    : "text-gray-400"
                }`}
              />
            </button>

            <div className="flex items-start gap-4">
              {candidate.avatar ? (
                <img
                  src={candidate.avatar}
                  alt={candidate.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {candidate.initials}
                </div>
              )}
              <div className="flex-1 min-w-0 pr-8">
                <h3 className="font-bold text-gray-900 text-lg">{candidate.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{candidate.role}</p>
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {candidate.location}
                  </span>
                  <span>{candidate.experience}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {candidate.skills.slice(0, 3).map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                  {candidate.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                      +{candidate.skills.length - 3} more
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-bold rounded-md">
                    Score: {candidate.score}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCandidates.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No candidates found</p>
        </div>
      )}
    </div>
  );
}

export default FindCandidatesView;