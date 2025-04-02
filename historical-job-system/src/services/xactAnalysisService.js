import axios from 'axios';

import { create } from 'xmlbuilder2';
class XactAnalysisService {
    constructor() {
        this.apiClient = axios.create({
            baseURL: process.env.XACT_ANALYSIS_API_URL,
            headers: {
                'Authorization': `Bearer ${process.env.XACT_ANALYSIS_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });
    }

    // Send job data to XactAnalysis
    async sendJobData(jobXML) {
        try {
            const response = await this.apiClient.post('/jobs', jobXML, {
                headers: {
                    'Content-Type': 'application/xml', // 发送 XML 数据
                },
            });
            return response.data;
        } catch (error) {
            if (error.response) {
                console.error('Mock API responded with an error:', error.response.status, error.response.data);
            } else {
                console.error('Error sending job data:', error.message);
            }
            throw new Error('Error sending job data to Mock API: ' + error.message);
        }
    }

    // Retrieve feedback for a specific job
    async getFeedback(jobId) {
        try {
            const response = await this.apiClient.get(`/jobs/${jobId}/feedback`);
            return response.data;
        } catch (error) {
            throw new Error('Error retrieving feedback from XactAnalysis: ' + error.message);
        }
    }
    // Convert job data to XML format
    generateJobXML(jobData) {
        const xml = create({ version: '1.0', encoding: 'UTF-8' })
            .ele('XACTDOC', { xmlns: 'http://www.w3.org/2001/XMLSchema-instance' })
            .ele('ASSIGNMENT')
                .ele('CLAIM_NUMBER').txt(jobData.claimNumber).up()
                .ele('POLICY_NUMBER').txt(jobData.policyNumber).up()
                .ele('LOSS_DATE').txt(jobData.lossDate).up()
                .ele('INSURED')
                    .ele('NAME').txt(jobData.insured.name).up()
                    .ele('ADDRESS')
                        .ele('STREET').txt(jobData.insured.address.street).up()
                        .ele('CITY').txt(jobData.insured.address.city).up()
                        .ele('STATE').txt(jobData.insured.address.state).up()
                        .ele('ZIP').txt(jobData.insured.address.zip).up()
                    .up()
                .up()
            .up()
            .ele('ESTIMATE')
                .ele('LINE_ITEMS')
                    .ele('ITEM')
                        .ele('CODE').txt(jobData.estimate.lineItems[0].code).up()
                        .ele('DESCRIPTION').txt(jobData.estimate.lineItems[0].description).up()
                        .ele('QUANTITY').txt(jobData.estimate.lineItems[0].quantity).up()
                        .ele('UOM').txt(jobData.estimate.lineItems[0].uom).up()
                        .ele('UNIT_PRICE').txt(jobData.estimate.lineItems[0].unitPrice).up()
                        .ele('EXTENSION').txt(jobData.estimate.lineItems[0].extension).up()
                        .ele('CATEGORY_CODE').txt(jobData.estimate.lineItems[0].categoryCode).up()
                    .up()
                .up()
            .up()
            .end({ prettyPrint: true });

        return xml;
    }
}

export default XactAnalysisService;