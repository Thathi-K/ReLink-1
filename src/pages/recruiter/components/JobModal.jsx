import { X, MapPin, Clock, DollarSign } from 'lucide-react';

function JobModal({ isOpen, onClose, onSubmit, jobForm, onFormChange, isEditing }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">{isEditing ? "Edit Job" : "Post New Job"}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6">
          <div className="space-y-5">
            {/* Job Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Job Title *</label>
              <input
                type="text"
                required
                value={jobForm.title}
                onChange={(e) => onFormChange({ ...jobForm, title: e.target.value })}
                placeholder="e.g. Senior Frontend Developer"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" /> Location *
              </label>
              <input
                type="text"
                required
                value={jobForm.location}
                onChange={(e) => onFormChange({ ...jobForm, location: e.target.value })}
                placeholder="e.g. San Francisco, CA (Remote)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            {/* Job Type and Salary */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-1" /> Job Type *
                </label>
                <select
                  value={jobForm.type}
                  onChange={(e) => onFormChange({ ...jobForm, type: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 inline mr-1" /> Salary Range
                </label>
                <input
                  type="text"
                  value={jobForm.salary}
                  onChange={(e) => onFormChange({ ...jobForm, salary: e.target.value })}
                  placeholder="e.g. $80k - $120k"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Job Description *</label>
              <textarea
                required
                value={jobForm.description}
                onChange={(e) => onFormChange({ ...jobForm, description: e.target.value })}
                placeholder="Describe the role, responsibilities, and requirements..."
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <button type="button" onClick={onClose} className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" className="flex-1 px-6 py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600">
              {isEditing ? "Update Job" : "Post Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JobModal;
