import { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import { verificationAPI } from '../services/verificationAPI';
import DocumentList from '../components/verification/DocumentList';
import DocumentUploadForm from '../components/verification/DocumentUploadForm';
import AdminDocumentCard from '../components/verification/AdminDocumentCard';

const VerificationDashboard = () => {
//   const [activeTab, setActiveTab] = useState('user');
const [activeTab, setActiveTab] = useState('upload'); 
  
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId] = useState(1); // TODO: Get from auth

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const data = await verificationAPI.getUserDocuments(userId);
      
      setDocuments(data);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const fetchAllDocuments = async () => {
    setLoading(true);
    try {
      const data = await verificationAPI.getAllDocuments();
      setDocuments(data);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (activeTab === 'user') fetchDocuments();
    else if (activeTab === 'admin') fetchAllDocuments();
  }, [activeTab]);

  const handleDelete = async (docId) => {
    if (!confirm('Delete?')) return;
    try {
      await verificationAPI.deleteDocument(docId);
      alert('Deleted!');
      fetchDocuments();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="bg-green-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FileText className="w-8 h-8" />
            Document Verification System
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="flex gap-2 border-b border-green-200">
          {['user', 'upload', 'admin'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium transition-all ${
                activeTab === tab ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-green-600'
              }`}
            >
              {tab === 'user' ? 'My Documents' : tab === 'upload' ? 'Upload New' : 'Admin Panel'}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'upload' && <DocumentUploadForm userId={userId} onSuccess={() => setActiveTab('user')} />}
        {activeTab === 'user' && <DocumentList documents={documents} loading={loading} onDelete={handleDelete} />}
        {activeTab === 'admin' && (
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full mx-auto"></div>
              </div>
            ) : (
              documents.map(doc => <AdminDocumentCard key={doc.docId} document={doc} onUpdate={fetchAllDocuments} />)
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationDashboard;