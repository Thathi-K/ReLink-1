const API_URL = 'http://localhost:8080/api/verification';

export const verificationAPI = {
  // USER ENDPOINTS
  submitDocument: async (data) => {
    const response = await fetch(`${API_URL}/documents/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to submit');
    return response.json();
  },

  getUserDocuments: async (userId) => {
    const response = await fetch(`${API_URL}/users/${userId}/documents`);
    if (!response.ok) throw new Error('Failed to fetch');
    return response.json();
  },

  deleteDocument: async (docId) => {
    const response = await fetch(`${API_URL}/documents/${docId}/delete`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete');
    return response.text();
  },

  // ADMIN ENDPOINTS
  getAllDocuments: async () => {
    const response = await fetch(`${API_URL}/admin/documents/all`);
    if (!response.ok) throw new Error('Failed to fetch all');
    return response.json();
  },

  approveDocument: async (docId, reviewNotes = '') => {
    const url = new URL(`${API_URL}/admin/documents/${docId}/approve`);
    if (reviewNotes) url.searchParams.append('reviewNotes', reviewNotes);
    
    const response = await fetch(url, { method: 'PATCH' });
    if (!response.ok) throw new Error('Failed to approve');
    return response.json();
  },

  rejectDocument: async (docId, reviewNotes = '') => {
    const url = new URL(`${API_URL}/admin/documents/${docId}/reject`);
    if (reviewNotes) url.searchParams.append('reviewNotes', reviewNotes);
    
    const response = await fetch(url, { method: 'PATCH' });
    if (!response.ok) throw new Error('Failed to reject');
    return response.json();
  }
};