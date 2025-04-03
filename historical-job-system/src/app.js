import express from 'express';
import dotenv from 'dotenv';

import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import xactAnalysisRoutes from './routes/xactAnalysisRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.json()); // 解析 JSON 请求体
app.use('/api/xactanalysis', xactAnalysisRoutes);
// 提供静态文件服务
app.use(express.static('public'));// 挂载 XactAnalysis 路由
import claimRoutes from './routes/claimRoutes.js';

// 挂载 Claim 路由
app.use('/api', claimRoutes);

const PORT=3000;
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the Historical Job System API!',
        endpoints: {
            createEstimate: 'POST /api/estimates',
            getAllEstimates: 'GET /api/estimates',
            getEstimateById: 'GET /api/estimates/:id',
            updateEstimate: 'PUT /api/estimates/:id',
            deleteEstimate: 'DELETE /api/estimates/:id',
        },
    });
});

// Swagger 配置
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Historical Job System API',
            version: '1.0.0',
            description: 'API documentation for the Historical Job System',
        },
        servers: [
            {
                url: 'http://localhost:3000', // 替换为你的服务器地址
            },
        ],
    },
    apis: ['./src/routes/*.js'], // 指定路由文件路径
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// 启动服务器

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});