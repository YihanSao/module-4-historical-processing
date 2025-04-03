import pool from '../models/database.js';

class ClaimModel {
    // 创建新记录
    static async createClaim(claimData) {
        console.log('Received claim data:', claimData);
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
        return result.rows[0];
    }

    // 获取所有记录
    static async getAllClaims() {
        const query = 'SELECT * FROM claims ORDER BY created_at DESC;';
        const result = await pool.query(query);
        return result.rows;
    }
    // 删除记录
    static async deleteClaim(claimNumber) {
        const query = 'DELETE FROM claims WHERE claim_number = $1 RETURNING *;';
        const values = [claimNumber];
        const result = await pool.query(query, values);
        return result.rows[0]; // 返回被删除的记录
    }

    // 更新记录
    static async updateClaim(claimNumber, updatedData) {
        const query = `
            UPDATE claims
            SET policy_number = $1, loss_date = $2
            WHERE claim_number = $3
            RETURNING *;
        `;
        const values = [
            updatedData.policyNumber,
            updatedData.lossDate,
            claimNumber,
        ];
        const result = await pool.query(query, values);
        return result.rows[0]; // 返回更新后的记录
    }
}

export default ClaimModel;