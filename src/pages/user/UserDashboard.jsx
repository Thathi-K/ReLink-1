import { Shield, TrendingUp, Users, Award, Calendar, ChevronRight, Plus } from "lucide-react"

export default function UserDashboard() {
  return (
    <div className="w-full min-h-screen p-8">
      {/* Header Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
        <div className="flex items-start justify-between">
          {/* Left Side - Profile Info */}
          <div className="flex gap-6">
            {/* Profile Picture */}
            {/* <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
              <Image src="/professional-man-white-shirt.png" alt="Profile" width={96} height={96} className="object-cover" />
            </div> */}

            {/* Name and Details */}
            <div className="flex flex-col gap-3">
              <h1 className="text-3xl font-bold text-gray-900">John Doe</h1>
              <p className="text-gray-600 text-base">IT Professional | Web Developer</p>

              {/* Badges */}
              <div className="flex gap-2 flex-wrap">
                <span className="px-4 py-1.5 bg-green-600 text-white rounded-full text-sm font-medium">
                  IT Certified
                </span>
                <span className="px-4 py-1.5 bg-cyan-600 text-white rounded-full text-sm font-medium">
                  Vocational Training
                </span>
                <span className="px-4 py-1.5 bg-gray-100 text-gray-700 border border-gray-300 rounded-full text-sm font-medium">
                  Community Volunteer
                </span>
              </div>
            </div>
          </div>

          {/* Right Side - Credibility Score */}
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
              <Shield className="w-5 h-5 text-cyan-600" />
              <span className="text-cyan-600 font-semibold">Credibility Score: 87</span>
            </div>
            {/* Star Rating */}
            <div className="flex gap-1">
              <span className="text-yellow-400 text-xl">★</span>
              <span className="text-yellow-400 text-xl">★</span>
              <span className="text-yellow-400 text-xl">★</span>
              <span className="text-yellow-400 text-xl">★</span>
              <span className="text-gray-300 text-xl">★</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Profile Views Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 border-l-4 border-l-blue-500 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-2">Profile Views</p>
              <p className="text-4xl font-bold text-gray-900">247</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        {/* Referrals Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 border-l-4 border-l-cyan-500 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-2">Referrals</p>
              <p className="text-4xl font-bold text-gray-900">12</p>
            </div>
            <Users className="w-8 h-8 text-cyan-500" />
          </div>
        </div>

        {/* Achievements Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 border-l-4 border-l-green-500 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-2">Achievements</p>
              <p className="text-4xl font-bold text-gray-900">18</p>
            </div>
            <Award className="w-8 h-8 text-green-500" />
          </div>
        </div>

        {/* Active Days Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 border-l-4 border-l-yellow-500 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-2">Active Days</p>
              <p className="text-4xl font-bold text-gray-900">342</p>
            </div>
            <Calendar className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Bottom Section - Timeline and Referrals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Timeline of Achievements */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-start gap-3 mb-6">
            <Calendar className="w-6 h-6 text-blue-500 mt-1" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">Timeline of Achievements</h2>
              <p className="text-gray-600 text-sm mt-1">Your journey of growth and progress</p>
            </div>
          </div>

          {/* Timeline Items */}
          <div className="space-y-6">
            {/* Achievement Item 1 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
              </div>
              <div className="flex-1 pb-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-gray-900 text-base">Completed Web Development Course</h3>
                  <span className="text-gray-500 text-sm whitespace-nowrap ml-4">2 weeks ago</span>
                </div>
                <p className="text-gray-600 text-sm mb-3">
                  Successfully completed a comprehensive web development program through Coursera
                </p>
                <span className="inline-block px-3 py-1 bg-green-600 text-white rounded-full text-xs font-medium">
                  New Certification
                </span>
              </div>
            </div>

            {/* Achievement Item 2 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
              </div>
              <div className="flex-1 pb-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-gray-900 text-base">Community Service Recognition</h3>
                  <span className="text-gray-500 text-sm whitespace-nowrap ml-4">1 month ago</span>
                </div>
                <p className="text-gray-600 text-sm mb-3">
                  Received referral from community supervisor for 50+ hours of volunteer work
                </p>
                <span className="inline-block px-3 py-1 bg-cyan-600 text-white rounded-full text-xs font-medium">
                  Verified Referral
                </span>
              </div>
            </div>

            {/* Achievement Item 3 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-gray-900 text-base">Vocational Training Program</h3>
                  <span className="text-gray-500 text-sm whitespace-nowrap ml-4">3 months ago</span>
                </div>
                <p className="text-gray-600 text-sm mb-3">
                  Completed IT fundamentals and software development training
                </p>
                <span className="inline-block px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-medium">
                  Program Graduate
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Verified Referrals */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-start gap-3 mb-6">
            <Shield className="w-6 h-6 text-cyan-600 mt-1" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">Verified Referrals</h2>
              <p className="text-gray-600 text-sm mt-1">Testimonials from mentors</p>
            </div>
          </div>

          {/* Testimonials List */}
          <div className="space-y-6">
            {/* Testimonial 1 */}
            <div className="border-l-4 border-l-cyan-500 pl-4 py-2">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-gray-900 text-base">Sarah Martinez</h3>
                  <p className="text-gray-600 text-sm">Program Director</p>
                </div>
                <span className="bg-green-50 text-green-700 px-3 py-1 rounded text-xs font-medium">Verified</span>
              </div>
              <p className="text-gray-700 text-sm italic">"Exceptional dedication to learning and personal growth."</p>
            </div>

            {/* Testimonial 2 */}
            <div className="border-l-4 border-l-cyan-500 pl-4 py-2">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-gray-900 text-base">Michael Chen</h3>
                  <p className="text-gray-600 text-sm">Community Supervisor</p>
                </div>
                <span className="bg-green-50 text-green-700 px-3 py-1 rounded text-xs font-medium">Verified</span>
              </div>
              <p className="text-gray-700 text-sm italic">"Reliable and committed volunteer with strong work ethic."</p>
            </div>

            {/* Testimonial 3 */}
            <div className="border-l-4 border-l-cyan-500 pl-4 py-2">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-gray-900 text-base">Dr. Emily Johnson</h3>
                  <p className="text-gray-600 text-sm">Career Counselor</p>
                </div>
                <span className="bg-green-50 text-green-700 px-3 py-1 rounded text-xs font-medium">Verified</span>
              </div>
              <p className="text-gray-700 text-sm italic">"Shows remarkable progress in professional development."</p>
            </div>
          </div>

          {/* Request Referral Button */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button className="w-full flex items-center justify-center gap-2 border border-gray-200 text-black font-medium py-3 px-4 rounded-lg">
              <Plus className="w-5 h-5" />
              Request Referral
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}