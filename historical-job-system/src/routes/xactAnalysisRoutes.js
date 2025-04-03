import express from 'express';
import XactAnalysisService from '../services/xactAnalysisService.js';

const router = express.Router();
const xactService = new XactAnalysisService();
import pool from '../models/database.js';
// 路由：发送作业数据到 XactAnalysis
router.post('/jobs', async (req, res) => {
    try {
        const jobData = req.body;
           res.status(200).json({
            message: 'Job data received successfully',
            data: jobData,
        });
    } catch (error) {
        console.error('Error processing job data:', error.message);
        res.status(500).json({ message: 'Error processing job data', error: error.message });
    }
});

// 路由：从 XactAnalysis 获取作业反馈
router.get('/jobs/:id/feedback', async (req, res) => {
    try {
        const jobId = req.params.id; // 从路由参数中获取作业 ID
        const feedback = await xactService.getFeedback(jobId); // 获取作业反馈
        res.status(200).json({ message: 'Feedback retrieved successfully', data: feedback });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving feedback', error: error.message });
    }
});

export default router;