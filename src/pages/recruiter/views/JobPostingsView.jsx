import { MapPin, Clock, DollarSign, Edit2, Trash2 } from 'lucide-react';

function JobPostingsView({ jobPostings, onEditJob, onDeleteJob, onPostNewJob, onViewApplications }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Job Postings</h2>
        <button
          onClick={onPostNewJob}
          className="px-6 py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 flex items-center gap-2"
        >
          <span>+</span> Post New Job
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {jobPostings.map((job) => (
          <div key={job.id} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {job.type}</span>
                  <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" /> {job.salary}</span>
                </div>
                <p className="text-gray-600 mt-2">{job.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm text-gray-500">Posted: {job.postedDate}</span>
                  <div className="flex gap-2">
                    <button onClick={() => onEditJob(job)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg">
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button onClick={() => onDeleteJob(job.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobPostingsView;
