import { Trash2, Eye } from 'lucide-react';
import StatusBadge from './StatusBadge';

const DocumentCard = ({ document, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-green-100 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800">{document.docName}</h3>
          <p className="text-gray-600 mt-1">Type: {document.docType}</p>
          <p className="text-sm text-gray-500 mt-1">Ref: {document.documentReferenceNumber}</p>
          {document.expiryDate && <p className="text-sm text-gray-500">Expires: {document.expiryDate}</p>}
          {document.file && (
            <a href={document.file} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline text-sm flex items-center gap-1 mt-2">
              <Eye className="w-4 h-4" />
              View Document
            </a>
          )}
        </div>
        <div className="flex gap-2 items-start">
          <StatusBadge status={document.status} />
          {onDelete && (
            <button onClick={() => onDelete(document.docId)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {document.reviewNotes && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700"><strong>Review:</strong> {document.reviewNotes}</p>
        </div>
      )}
    </div>
  );
};

export default DocumentCard;