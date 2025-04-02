import express from 'express';
import ClaimController from '../controllers/claimController.js';

const router = express.Router();

// 创建新记录
router.post('/claims', ClaimController.createClaim);

// 获取所有记录
router.get('/claims', ClaimController.getAllClaims);

export default router;