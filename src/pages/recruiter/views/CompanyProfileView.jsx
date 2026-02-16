import { Users, Globe, MapPin } from 'lucide-react';

function CompanyProfileView({ profile, onProfileChange, onSave }) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Company Profile</h2>
      <form onSubmit={onSave} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Company Name
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => onProfileChange({ ...profile, name: e.target.value })}
              data-testid="company-name-input"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Industry
            </label>
            <input
              type="text"
              value={profile.industry}
              onChange={(e) => onProfileChange({ ...profile, industry: e.target.value })}
              data-testid="company-industry-input"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Users className="w-4 h-4 inline mr-1" />
              Company Size
            </label>
            <select
              value={profile.size}
              onChange={(e) => onProfileChange({ ...profile, size: e.target.value })}
              data-testid="company-size-input"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="1-10 employees">1-10 employees</option>
              <option value="11-50 employees">11-50 employees</option>
              <option value="50-200 employees">50-200 employees</option>
              <option value="200-500 employees">200-500 employees</option>
              <option value="500+ employees">500+ employees</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Globe className="w-4 h-4 inline mr-1" />
              Website
            </label>
            <input
              type="url"
              value={profile.website}
              onChange={(e) => onProfileChange({ ...profile, website: e.target.value })}
              data-testid="company-website-input"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-1" />
              Location
            </label>
            <input
              type="text"
              value={profile.location}
              onChange={(e) => onProfileChange({ ...profile, location: e.target.value })}
              data-testid="company-location-input"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Company Description
            </label>
            <textarea
              value={profile.description}
              onChange={(e) => onProfileChange({ ...profile, description: e.target.value })}
              rows={4}
              data-testid="company-description-input"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Benefits & Perks
          </label>
          <div className="flex flex-wrap gap-2">
            {profile.benefits.map((benefit, index) => (
              <span
                key={index}
                className="px-3 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium"
              >
                {benefit}
              </span>
            ))}
          </div>
        </div>

        <button
          type="submit"
          data-testid="save-company-profile"
          className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default CompanyProfileView;