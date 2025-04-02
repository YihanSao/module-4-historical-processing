import express from 'express';

const app = express();
app.use(express.json());

// 模拟接收作业数据的 API
app.post('/jobs', (req, res) => {
    console.log('Received job data:', req.body);
    res.status(200).json({
        message: 'Mock API: Job data received successfully',
        data: {
            jobId: 12345,
            status: 'Processed',
        },
    });
});

// 模拟获取作业反馈的 API
app.get('/jobs/:id/feedback', (req, res) => {
    const jobId = req.params.id;
    console.log(`Fetching feedback for job ID: ${jobId}`);
    res.status(200).json({
        message: 'Mock API: Feedback retrieved successfully',
        data: {
            jobId: jobId,
            feedback: 'This is a mock feedback message.',
        },
    });
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Mock API is running on http://localhost:${PORT}`);
});