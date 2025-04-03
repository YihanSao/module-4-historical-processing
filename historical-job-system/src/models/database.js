import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg; 

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // From .env get DATABASE_URL
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
//check connnection
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


// 检查并创建 claims 表
(async () => {
    try {
        const tableCheckResult = await pool.query(`
            SELECT EXISTS (
                SELECT 1
                FROM information_schema.tables
                WHERE table_schema = 'public'
                AND table_name = 'claims'
            );
        `);

        const tableExists = tableCheckResult.rows[0].exists;

        if (!tableExists) {
            console.log('Table "claims" does not exist. Creating it now...');
            await pool.query(`
                CREATE TABLE claims (
                    id SERIAL PRIMARY KEY,
                    claim_number VARCHAR(255),
                    policy_number VARCHAR(255),
                    loss_date DATE,
                    insured_name VARCHAR(255),
                    insured_street VARCHAR(255),
                    insured_city VARCHAR(255),
                    insured_state VARCHAR(255),
                    insured_zip VARCHAR(255),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            `);
            console.log('Table "claims" created successfully.');
        } else {
            console.log('Table "claims" already exists.');
        }
    } catch (error) {
        console.error('Error checking or creating table "claims":', error.message);
    }
})();
export default pool;