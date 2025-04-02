import pool from './database.js';

class JobModel {
    static async createJob(jobData) {
        const { title, description, status } = jobData;
        const result = await pool.query(
            'INSERT INTO jobs (job_title, job_description, status) VALUES ($1, $2, $3) RETURNING *',
            [title, description, status]
        );
        return result.rows[0];
    }

    static async getJobs() {
        const result = await pool.query('SELECT * FROM "jobs" ORDER BY created_at DESC');
        return result.rows;
    }

    static async getJobById(id) {
        const result = await pool.query('SELECT * FROM jobs WHERE id = $1', [id]);
        return result.rows[0];
    }
}

export default JobModel;