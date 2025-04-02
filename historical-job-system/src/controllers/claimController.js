import ClaimModel from '../models/claimModel.js';

class ClaimController {
    // 创建新记录
    static async createClaim(req, res) {
        try {
            const claimData = req.body; // 从请求体中获取数据
            const newClaim = await ClaimModel.createClaim(claimData); // 调用模型创建新记录
            res.status(201).json(newClaim); // 返回创建的记录
        } catch (error) {
            console.error('Error creating claim:', error.message);
            res.status(500).json({ error: error.message });
        }
    }

    // 获取所有记录
    static async getAllClaims(req, res) {
        try {
            const claims = await ClaimModel.getAllClaims(); // 从数据库中获取所有记录
            res.status(200).json(claims);
        } catch (error) {
            console.error('Error fetching claims:', error.message);
            res.status(500).json({ error: error.message });
        }
    }
}

export default ClaimController;