import express from 'express';

const app = express();
app.use(express.text({ type: 'application/xml' }));

app.post('/jobs', (req, res) => {
    console.log('Received XML:', req.body);
    res.status(200).send('<response>Job received successfully</response>');
});

app.listen(4000, () => {
    console.log('Mock API running on http://localhost:4000');
});