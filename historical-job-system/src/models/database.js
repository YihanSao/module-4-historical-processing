import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg; // 从默认导入中解构出 Pool

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // 从 .env 文件中读取 DATABASE_URL
});

pool.on('connect', () => {
    console.log('Connected to the PostgreSQL database');
    console.log('Pool Status:');
    console.log(`  Total Clients: ${pool.totalCount}`);
    console.log(`  Idle Clients: ${pool.idleCount}`);
    console.log(`  Waiting Requests: ${pool.waitingCount}`);
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});
(async () => {
    try {
        const result = await pool.query('SELECT NOW()');
        console.log('Database connection test successful:', result.rows[0]);
    } catch (error) {
        console.error('Database connection test failed:', error.message);
    }
})();
(async () => {
    try {
        const result = await pool.query('SELECT current_database()');
        console.log('Connected to database:', result.rows[0].current_database);
    } catch (error) {
        console.error('Error fetching current database:', error.message);
    }
})();
(async () => {
    try {
        const result = await pool.query(`
            SELECT table_name
            FROM information_schema.tables
            WHERE table_schema = 'public'
            ORDER BY table_name;
        `);
        console.log('Tables in the current database:', result.rows);
    } catch (error) {
        console.error('Error fetching tables:', error.message);
    }
})();
// 检查并创建表
(async () => {
    try {
        // 检查 jobs 表是否存在
        const tableCheckResult = await pool.query(`
            SELECT EXISTS (
                SELECT 1
                FROM information_schema.tables
                WHERE table_schema = 'public'
                AND table_name = 'jobs'
            );
        `);

        const tableExists = tableCheckResult.rows[0].exists;

        if (!tableExists) {
            console.log('Table "jobs" does not exist. Creating it now...');
            await pool.query(`
                CREATE TABLE jobs (
                    id SERIAL PRIMARY KEY,
                    job_title VARCHAR(255) NOT NULL,
                    job_description TEXT NOT NULL,
                    status VARCHAR(50) NOT NULL DEFAULT 'Pending',
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            `);
            console.log('Table "jobs" created successfully.');
        } else {
            console.log('Table "jobs" already exists.');
        }
    } catch (error) {
        console.error('Error checking or creating table:', error.message);
    }
})();
export default pool;