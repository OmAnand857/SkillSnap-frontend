import api from './api';
import { ROUTES } from '../utils/constants';

const assessmentService = {
    async getSkills() {
        // Backend: GET /api/skills
        return api.get(ROUTES.SKILLS);
    },

    async getAssessment(skillId) {
        // Backend: GET /api/assessments/:skillId
        return api.get(`${ROUTES.ASSESSMENTS}/${skillId}`);
    },

    async submitAssessment(skillId, answers) {
        // Backend: POST /api/assessments/:skillId/submit
        return api.post(`${ROUTES.ASSESSMENTS}/${skillId}/submit`, { answers });
    },

    async runCode(languageId, sourceCode, questionId) {
        // Backend: POST /api/execute
        // Body: { "language_id": number, "source_code": string, "question_id": string }
        return api.post(ROUTES.EXECUTE, {
            language_id: languageId,
            source_code: sourceCode,
            question_id: questionId
        });
    },

    async createCertificate(data) {
        // Backend: POST /api/certificates
        // Body: { userName, skillId, skillName, userId? }
        return api.post('/api/certificates', data);
    },

    async getCertificate(id) {
        // Backend: GET /api/certificates/:id
        return api.get(`/api/certificates/${id}`);
    }
};

export default assessmentService;
