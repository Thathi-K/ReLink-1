import { CheckCircle, XCircle, Eye } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { verificationAPI } from '../../services/verificationAPI';

const AdminDocumentCard = ({ document, onUpdate }) => {
  const handleApprove = async () => {
    const notes = prompt('Review notes (optional):') || 'Approved';
    try {
      await verificationAPI.approveDocument(document.docId, notes);
      alert('Document approved!');
      if (onUpdate) onUpdate();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleReject = async () => {
    const notes = prompt('Rejection reason:');
    if (!notes) return;
    try {
      await verificationAPI.rejectDocument(document.docId, notes);
      alert('Document rejected!');
      if (onUpdate) onUpdate();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-green-100">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800">{document.docName}</h3>
          <p className="text-gray-600 mt-1">User ID: {document.userId} | Type: {document.docType}</p>
          <p className="text-sm text-gray-500 mt-1">Ref: {document.documentReferenceNumber}</p>
          {document.file && (
            <a href={document.file} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline text-sm flex items-center gap-1 mt-2">
              <Eye className="w-4 h-4" />
              View Document
            </a>
          )}
        </div>
        <StatusBadge status={document.status} />
      </div>

      {document.reviewNotes && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700"><strong>Review:</strong> {document.reviewNotes}</p>
        </div>
      )}

      {document.status === 'PENDING' && (
        <div className="flex gap-3">
          <button onClick={handleApprove} className="flex-1 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 flex items-center justify-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Approve
          </button>
          <button onClick={handleReject} className="flex-1 bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 flex items-center justify-center gap-2">
            <XCircle className="w-5 h-5" />
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminDocumentCard;