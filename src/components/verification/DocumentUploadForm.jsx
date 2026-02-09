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

  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file only');
      e.target.value = '';
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert('File size must be less than 5MB');
      e.target.value = '';
      return;
    }

    setSelectedFile(file);
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
    <div className="space-y-6 bg-white p-6">
      {/* Required Documents Box */}
      <div style={{
        backgroundColor: '#EFF6FF',
        border: '2px solid #BFDBFE',
        borderRadius: '8px',
        padding: '24px'
      }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#1E3A8A',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <AlertCircle className="w-5 h-5" />
          Required Documents
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '8px',
          fontSize: '14px',
          color: '#1E40AF'
        }}>
          {documentTypes.filter(doc => doc.required).map(doc => (
            <div key={doc.value} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle className="w-4 h-4" style={{ color: '#2563EB' }} />
              {doc.label}
            </div>
          ))}
        </div>
      </div>

      {/* Upload Form */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        padding: '24px',
        border: '1px solid #D1FAE5'
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#1F2937',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Upload className="w-6 h-6" style={{ color: '#059669' }} />
          Upload New Document
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Document Type */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '8px'
            }}>
              Document Type *
            </label>
            <select
              value={formData.docType}
              onChange={(e) => setFormData({ ...formData, docType: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #D1D5DB',
                borderRadius: '8px',
                backgroundColor: '#FFFFFF',
                color: '#111827',
                fontSize: '16px'
              }}
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
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '8px'
            }}>
              Document Name *
            </label>
            <input
              type="text"
              value={formData.docName}
              onChange={(e) => setFormData({ ...formData, docName: e.target.value })}
              placeholder="e.g., My National ID Card"
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #D1D5DB',
                borderRadius: '8px',
                backgroundColor: '#FFFFFF',
                color: '#111827',
                fontSize: '16px'
              }}
            />
          </div>

          {/* File Upload */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '8px'
            }}>
              Upload PDF Document * (Max 5MB)
            </label>
            
            {!selectedFile ? (
              <label style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '160px',
                border: '2px dashed #10B981',
                borderRadius: '8px',
                backgroundColor: '#ECFDF5',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}>
                <Upload className="w-10 h-10" style={{ color: '#059669', marginBottom: '12px' }} />
                <p style={{ fontSize: '14px', color: '#374151', fontWeight: '500', marginBottom: '4px' }}>
                  <span style={{ color: '#059669' }}>Click to upload</span> or drag and drop
                </p>
                <p style={{ fontSize: '12px', color: '#6B7280' }}>PDF only (MAX. 5MB)</p>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  required
                  style={{ display: 'none' }}
                />
              </label>
            ) : (
              <div style={{
                border: '2px solid #10B981',
                borderRadius: '8px',
                padding: '16px',
                backgroundColor: '#ECFDF5'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <FileText className="w-8 h-8" style={{ color: '#059669' }} />
                    <div>
                      <p style={{ fontWeight: '500', color: '#1F2937' }}>{selectedFile.name}</p>
                      <p style={{ fontSize: '14px', color: '#6B7280' }}>
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    style={{
                      padding: '8px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      borderRadius: '8px'
                    }}
                  >
                    <X className="w-5 h-5" style={{ color: '#DC2626' }} />
                  </button>
                </div>
                
                {uploadProgress > 0 && (
                  <div style={{ marginTop: '12px' }}>
                    <div style={{
                      width: '100%',
                      height: '8px',
                      backgroundColor: '#E5E7EB',
                      borderRadius: '9999px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${uploadProgress}%`,
                        height: '100%',
                        backgroundColor: '#059669',
                        transition: 'width 0.3s'
                      }}></div>
                    </div>
                    <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px', textAlign: 'center' }}>
                      {uploadProgress}% uploaded
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Expiry Date */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '8px'
            }}>
              Expiry Date (if applicable)
            </label>
            <input
              type="date"
              value={formData.expiryDate}
              onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #D1D5DB',
                borderRadius: '8px',
                backgroundColor: '#FFFFFF',
                color: '#111827',
                fontSize: '16px'
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !selectedFile}
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: loading || !selectedFile ? '#9CA3AF' : '#059669',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading || !selectedFile ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
          >
            <Upload className="w-5 h-5" />
            {loading ? 'Uploading...' : 'Submit Document'}
          </button>
        </form>

        <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '12px', color: '#6B7280' }}>
          <p>Your documents are encrypted and stored securely</p>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadForm;