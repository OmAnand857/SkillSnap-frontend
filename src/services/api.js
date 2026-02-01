import { API_BASE_URL } from '../utils/constants';

class ApiError extends Error {
    constructor(message, status, data) {
        super(message);
        this.status = status;
        this.data = data;
    }
}

const api = {
    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;

        // Get token from localStorage (assuming AuthContext saves it there)
        const token = localStorage.getItem('token');

        const headers = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const config = {
            ...options,
            headers,
        };

        try {
            const response = await fetch(url, config);

            // Handle 401 Unauthorized (Logout user)
            if (response.status === 401) {
                // Optionally trigger global logout here
                localStorage.removeItem('token');
                window.location.href = '/login';
                return;
            }

            const data = await response.json();

            if (!response.ok) {
                throw new ApiError(data.message || 'API Error', response.status, data);
            }

            return data;
        } catch (error) {
            console.error('API Request Failed:', error);
            throw error;
        }
    },

    get(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: 'GET' });
    },

    post(endpoint, body, options = {}) {
        return this.request(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) });
    },

    put(endpoint, body, options = {}) {
        return this.request(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) });
    },

    delete(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: 'DELETE' });
    }
};

export default api;
