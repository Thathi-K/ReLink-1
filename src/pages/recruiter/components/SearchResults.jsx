import { X } from 'lucide-react';

function SearchResults({ results, onClose, onSelectCandidate }) {
  if (results.length === 0) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      data-testid="search-results-modal"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Search Results ({results.length})
          </h2>
          <button
            onClick={onClose}
            data-testid="close-search-results"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-3">
          {results.map((candidate) => (
            <div
              key={candidate.id}
              data-testid={`search-result-${candidate.id}`}
              className="p-4 border border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-all cursor-pointer"
              onClick={() => onSelectCandidate(candidate)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                  <p className="text-sm text-gray-600">{candidate.role}</p>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-bold rounded-md">
                  {candidate.score} Score
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;