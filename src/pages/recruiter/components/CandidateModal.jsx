import { X, Heart, Mail, Phone, MapPin, Award, Linkedin, Github } from 'lucide-react';

function CandidateModal({ isOpen, candidate, onClose, onToggleFavorite, isFavorite }) {
  if (!isOpen || !candidate) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      data-testid="candidate-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Candidate Profile</h2>
          <button
            onClick={onClose}
            data-testid="close-candidate-modal"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6" data-testid="candidate-details">
          {/* Header */}
          <div className="flex items-start gap-6 mb-6">
            {candidate.avatar ? (
              <img
                src={candidate.avatar}
                alt={candidate.name}
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-3xl">
                {candidate.initials}
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{candidate.name}</h3>
                  <p className="text-lg text-gray-600 mt-1">{candidate.role}</p>
                </div>
                <button
                  onClick={() => onToggleFavorite(candidate.id)}
                  data-testid="modal-favorite-button"
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Heart
                    className={`w-6 h-6 ${
                      isFavorite
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400"
                    }`}
                  />
                </button>
              </div>
              <div className="mt-4">
                <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 text-lg font-bold rounded-lg">
                  Score: {candidate.score}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="w-5 h-5 text-emerald-600" />
              <span className="text-sm">{candidate.email}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="w-5 h-5 text-emerald-600" />
              <span className="text-sm">{candidate.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-5 h-5 text-emerald-600" />
              <span className="text-sm">{candidate.location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Award className="w-5 h-5 text-emerald-600" />
              <span className="text-sm">{candidate.experience}</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-3 mb-6">
            {candidate.linkedin && (
              <a
                href={`https://${candidate.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            )}
            {candidate.github && (
              <a
                href={`https://${candidate.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            )}
          </div>

          {/* Skills */}
          <div className="mb-6">
            <h4 className="text-lg font-bold text-gray-900 mb-3">Skills & Expertise</h4>
            <div className="flex flex-wrap gap-2">
              {candidate.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl">
              Schedule Interview
            </button>
            <button className="flex-1 px-6 py-3 border border-emerald-500 text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition-colors">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateModal;