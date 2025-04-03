import express from 'express';
import ClaimController from '../controllers/claimController.js';

const router = express.Router();

// 创建新记录
router.post('/claims', ClaimController.createClaim);

// 获取所有记录
router.get('/claims', ClaimController.getAllClaims);
// 删除记录
router.delete('/claims/:claimNumber', ClaimController.deleteClaim);

// 更新记录
router.put('/claims/:claimNumber', ClaimController.updateClaim);

export default router;