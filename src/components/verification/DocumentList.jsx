import { FileText } from 'lucide-react';
import DocumentCard from './DocumentCard';

const DocumentList = ({ documents = [], loading = false, onDelete }) => {
  // Loading state
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full mx-auto"></div>
        <p className="text-gray-500 mt-4">Loading...</p>
      </div>
    );
  }

  // Empty state
  if (documents.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center border border-green-100">
        <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">No documents yet</p>
      </div>
    );
  }

  // List
  return (
    <div className="space-y-4">
      {documents.map((doc) => (
        <DocumentCard
          key={doc.docId}
          document={doc}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default DocumentList;
