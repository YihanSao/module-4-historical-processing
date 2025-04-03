import axios from 'axios';
import XactAnalysisService from './services/xactAnalysisService.js';

// 创建 Axios 客户端
const apiClient = axios.create({
    baseURL: 'http://localhost:4000', // Mock API
    headers: {
        'Content-Type': 'application/xml',
    },
});

// 初始化 XactAnalysisService
const xactService = new XactAnalysisService(apiClient);

(async () => {
    try {
        // 测试数据
        const jobData = {
            claimNumber: 'TEST12345',
            policyNumber: 'POLICY12345',
            lossDate: '2025-04-01',
            insured: {
                name: 'John Doe',
                address: {
                    street: '123 Main St',
                    city: 'Springfield',
                    state: 'IL',
                    zip: '62701',
                },
            },
            estimate: {
                lineItems: [
                    {
                        code: 'ITEM001',
                        description: 'Drywall repair',
                        quantity: 10,
                        uom: 'SQFT',
                        unitPrice: 15.5,
                        extension: 155,
                        categoryCode: 'DRY',
                    },
                ],
            },
        };

        console.log('--- Starting Tests ---');

        // 1. 测试 generateJobXML
        console.log('1. Testing generateJobXML...');
        const jobXML = xactService.generateJobXML(jobData);
        console.log('Generated XML:', jobXML);

        // 2. 测试 sendJobData
        console.log('2. Testing sendJobData...');
        console.log('Base URL:', apiClient.defaults.baseURL); // 打印 baseURL
        const sendResponse = await xactService.sendJobData(jobXML);
        console.log('Job data sent successfully:', sendResponse);

        console.log('--- Tests Completed ---');
    } catch (error) {
        console.error('Error during tests:', error.message);
    }
})();