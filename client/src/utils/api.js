const BASE_URL = '/api';

export const api = {
    // Complaint related calls
    submitComplaint: async (complaintData) => {
        const response = await fetch(`${BASE_URL}/complaint`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(complaintData),
        });
        if (!response.ok) {
            throw new Error('Failed to submit complaint');
        }
        return response.json();
    },

    getAllComplaints: async () => {
        const response = await fetch(`${BASE_URL}/complaint/all`);
        if (!response.ok) {
            throw new Error('Failed to fetch complaints');
        }
        return response.json();
    },

    getFilteredComplaints: async (params) => {
        const queryString = new URLSearchParams(params).toString();
        const response = await fetch(`${BASE_URL}/complaint/filter?${queryString}`);
        if (!response.ok) {
            throw new Error('Failed to fetch filtered complaints');
        }
        return response.json();
    },

    updateComplaintStatus: async (id, status) => {
        const response = await fetch(`${BASE_URL}/complaint/${id}/status?status=${status}`, {
            method: 'PUT',
        });
        if (!response.ok) {
            throw new Error('Failed to update status');
        }
        return response.json();
    }
};
