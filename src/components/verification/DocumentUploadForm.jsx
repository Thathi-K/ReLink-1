import { useState } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle, X } from 'lucide-react';
import { verificationAPI } from '../../services/verificationAPI';

const DocumentUploadForm = ({ userId, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    docName: '',
    docType: 'ID_CARD',
    file: '',
    expiryDate: ''
  });

  // Suggested document types based on your ERD
  const documentTypes = [
    { value: 'ID_CARD', label: 'ID Card', required: true },
    { value: 'PASSPORT', label: 'Passport', required: false },
    { value: 'DRIVERS_LICENSE', label: "Driver's License", required: false },
    { value: 'BIRTH_CERTIFICATE', label: 'Birth Certificate', required: true },
    { value: 'PROOF_OF_ADDRESS', label: 'Proof of Address', required: true },
    { value: 'CV_RESUME', label: 'CV/Resume', required: true },
    { value: 'MATRIC_CERTIFICATE', label: 'Matric Certificate', required: true },
    { value: 'DEGREE_DIPLOMA', label: 'Degree/Diploma', required: false },
    { value: 'PROFESSIONAL_CERT', label: 'Professional Certification', required: false },
    { value: 'REFERENCE_LETTER', label: 'Reference Letter', required: false },
    { value: 'POLICE_CLEARANCE', label: 'Police Clearance', required: false },
    { value: 'OTHER', label: 'Other Document', required: false }
  ];

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    if (!file) return;

    // Check if it's a PDF
    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file only');
      e.target.value = '';
      return;
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      alert('File size must be less than 5MB');
      e.target.value = '';
      return;
    }

    setSelectedFile(file);
    
    // Convert to base64 or upload to server
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, file: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.docName || !formData.file) {
      alert('Please fill in Document Name and select a PDF file');
      return;
    }

    setLoading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      await verificationAPI.submitDocument({ userId, ...formData });
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      setTimeout(() => {
        alert('Document submitted successfully! ✅');
        // Reset form
        setFormData({ docName: '', docType: 'ID_CARD', file: '', expiryDate: '' });
        setSelectedFile(null);
        setUploadProgress(0);
        if (onSuccess) onSuccess();
      }, 500);
      
    } catch (error) {
      alert('Error uploading document: ' + error.message);
      setUploadProgress(0);
    }
    setLoading(false);
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFormData({ ...formData, file: '' });
    setUploadProgress(0);
  };

  return (
    <div className="space-y-6">
      {/* Required Documents Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-blue-900 flex items-center gap-2 mb-3">
          <AlertCircle className="w-5 h-5" />
          Required Documents
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-800">
          {documentTypes.filter(doc => doc.required).map(doc => (
            <div key={doc.value} className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              {doc.label}
            </div>
          ))}
        </div>
      </div>

      {/* Upload Form */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-green-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Upload className="w-6 h-6 text-green-600" />
          Upload New Document
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Document Type Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Document Type *
            </label>
            <select
              value={formData.docType}
              onChange={(e) => setFormData({ ...formData, docType: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              required
            >
              {documentTypes.map(doc => (
                <option key={doc.value} value={doc.value}>
                  {doc.label} {doc.required && '(Required)'}
                </option>
              ))}
            </select>
          </div>

          {/* Document Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Document Name *
            </label>
            <input
              type="text"
              value={formData.docName}
              onChange={(e) => setFormData({ ...formData, docName: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              placeholder="e.g., My National ID Card"
              required
            />
          </div>

          {/* File Upload Area */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Upload PDF Document * (Max 5MB)
            </label>
            
            {!selectedFile ? (
              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-green-300 rounded-lg cursor-pointer bg-green-50 hover:bg-green-100 transition-all">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-10 h-10 text-green-600 mb-3" />
                  <p className="mb-2 text-sm text-gray-700 font-medium">
                    <span className="text-green-600">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PDF only (MAX. 5MB)</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  required
                />
              </label>
            ) : (
              <div className="border-2 border-green-300 rounded-lg p-4 bg-green-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-800">{selectedFile.name}</p>
                      <p className="text-sm text-gray-500">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-red-600" />
                  </button>
                </div>
                
                {/* Upload Progress Bar */}
                {uploadProgress > 0 && (
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 text-center">
                      {uploadProgress}% uploaded
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Expiry Date (Optional) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Expiry Date (if applicable)
            </label>
            <input
              type="date"
              value={formData.expiryDate}
              onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !selectedFile}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
          >
            <Upload className="w-5 h-5" />
            {loading ? 'Uploading...' : 'Submit Document'}
          </button>
        </form>

        {/* Help Text */}
        <div className="mt-4 text-center text-xs text-gray-500">
          <p>Your documents are encrypted and stored securely</p>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadForm;