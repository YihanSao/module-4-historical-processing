import ClaimModel from '../models/claimModel.js';

class ClaimController {
    // 创建新记录
    static async createClaim(req, res) {
        try {
            const claimData = req.body; // 从请求体中获取数据
            console.log('Received claim data:', claimData); // 打印接收到的数据
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
    // 删除记录
    static async deleteClaim(req, res) {
        try {
            const { claimNumber } = req.params; // 从 URL 参数中获取 claimNumber
            const deletedClaim = await ClaimModel.deleteClaim(claimNumber); // 调用模型删除记录
            if (deletedClaim) {
                res.status(200).json(deletedClaim); // 返回被删除的记录
            } else {
                res.status(404).json({ error: 'Claim not found' });
            }
        } catch (error) {
            console.error('Error deleting claim:', error.message);
            res.status(500).json({ error: error.message });
        }
    }

    // 更新记录
    static async updateClaim(req, res) {
        try {
            const { claimNumber } = req.params; // 从 URL 参数中获取 claimNumber
            const updatedData = req.body; // 从请求体中获取更新的数据
            const updatedClaim = await ClaimModel.updateClaim(claimNumber, updatedData); // 调用模型更新记录
            if (updatedClaim) {
                res.status(200).json(updatedClaim); // 返回更新后的记录
            } else {
                res.status(404).json({ error: 'Claim not found' });
            }
        } catch (error) {
            console.error('Error updating claim:', error.message);
            res.status(500).json({ error: error.message });
        }
    }
}

export default ClaimController;