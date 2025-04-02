class HistoricalDataService {
    constructor(database) {
        this.database = database;
    }

    async storeJobData(jobData) {
        const query = 'INSERT INTO historical_jobs (job_id, job_details, created_at) VALUES ($1, $2, $3)';
        const values = [jobData.jobId, jobData.details, new Date()];
        try {
            await this.database.query(query, values);
            return { success: true, message: 'Job data stored successfully' };
        } catch (error) {
            return { success: false, message: 'Error storing job data', error };
        }
    }

    async retrieveJobData(jobId) {
        const query = 'SELECT * FROM historical_jobs WHERE job_id = $1';
        try {
            const result = await this.database.query(query, [jobId]);
            if (result.rows.length > 0) {
                return { success: true, data: result.rows[0] };
            } else {
                return { success: false, message: 'Job data not found' };
            }
        } catch (error) {
            return { success: false, message: 'Error retrieving job data', error };
        }
    }
}

export default HistoricalDataService;