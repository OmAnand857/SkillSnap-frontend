import api from './api';
import { ROUTES } from '../utils/constants';

const authService = {
    async signup(data) {
        // Backend: POST /api/auth/signup
        // Body: { "email": string, "password": string, "displayName": string? }
        // Returns: { "uid": "...", "email": "..." }
        return api.post(ROUTES.SIGNUP, data);
    },

    async login(credentials) {
        // Backend: POST /api/auth/login
        // Body: { "email": string, "password": string }
        // Returns: { "token": "<idToken>", "refreshToken": "...", "uid": "..." }
        const response = await api.post(ROUTES.LOGIN, credentials);
        if (response.token) {
            localStorage.setItem('token', response.token);
        }
        return response;
    },

    async getCurrentUser() {
        // Backend: GET /api/auth/me
        // Auth: Required
        // Returns: { "user": { id, email, displayName, ... } }
        return api.get(ROUTES.ME);
    },

    async updateProfile(data) {
        // Backend: PUT /api/auth/me
        // Body: { displayName?, password? }
        return api.put(ROUTES.ME, data);
    },

    logout() {
        localStorage.removeItem('token');
        // Any other cleanup
    }
};

export default authService;
