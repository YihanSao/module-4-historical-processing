import axios from 'axios';
import XactAnalysisService from './services/xactAnalysisService.js';

// 创建 Axios 客户端
const apiClient = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com', // Mock API
    headers: {
        'Content-Type': 'application/json',
    },
});

// 初始化 XactAnalysisService
const xactService = new XactAnalysisService(apiClient);
router.post('/jobs/send', async (req, res) => {
    try {
        const jobData = req.body; // 从请求体中获取 jobData
        const response = await xactService.sendJobData(jobData);
        res.status(200).json({
            message: 'Job data sent successfully',
            data: response,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
(async () => {
    try {
        const jobData = {
            title: 'Test job data', // Use fields supported by the mock API
            body: 'This is a test job description',
            userId: 1,
        };

        console.log('Sending job data...');
        const sendResponse = await xactService.sendJobData(jobData);
        console.log('Job data sent successfully:', sendResponse);
    } catch (error) {
        console.error('Error:', error.message);
    }
})();
export default router;