import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const StatusBadge = ({ status }) => {
  const config = {
    PENDING: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      border: 'border-yellow-300',
      icon: <Clock className="w-4 h-4" />
    },
    APPROVED: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      border: 'border-green-300',
      icon: <CheckCircle className="w-4 h-4" />
    },
    REJECTED: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      border: 'border-red-300',
      icon: <XCircle className="w-4 h-4" />
    },
    UNDER_REVIEW: {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      border: 'border-blue-300',
      icon: <AlertCircle className="w-4 h-4" />
    }
  };

  const c = config[status];

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${c.bg} ${c.text} ${c.border}`}>
      {c.icon}
      {status.replace('_', ' ')}
    </span>
  );
};

export default StatusBadge;