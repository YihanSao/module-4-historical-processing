import express from 'express';
import XactAnalysisService from '../services/xactAnalysisService.js';

const router = express.Router();
const xactService = new XactAnalysisService();
import pool from '../models/database.js';
// 路由：发送作业数据到 XactAnalysis
router.post('/jobs', async (req, res) => {
    try {
        const jobData = req.body;
        console.log('Received job data11:', jobData);
        
        const claimData=jobData;
        const query = `
            INSERT INTO claims (
                claim_number, policy_number, loss_date,
                insured_name, insured_street, insured_city, insured_state, insured_zip
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `;
        const values = [
            claimData.claimNumber,
            claimData.policyNumber,
            claimData.lossDate,
            claimData.insured.name,
            claimData.insured.address.street,
            claimData.insured.address.city,
            claimData.insured.address.state,
            claimData.insured.address.zip,
        ];
        const result = await pool.query(query, values);
        // 模拟成功响应
           // 查询 claims 表中的记录数量
           const countQuery = 'SELECT COUNT(*) FROM claims;';
           const countResult = await pool.query(countQuery);
           const claimsCount = countResult.rows[0].count;
   
           console.log(`Total number of records in claims table: ${claimsCount}`);
        
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