class XactAnalysisController {
    constructor(xactAnalysisService) {
        this.xactAnalysisService = xactAnalysisService;
    }


    async sendJobData(jobXML) {
        try {
            const response = await this.apiClient.post('/jobs', jobXML, {
                headers: {
                    'Content-Type': 'application/xml', // 确保发送的是 XML 数据
                },
            });
            return response.data;
        } catch (error) {
            if (error.response) {
                console.error('API responded with an error:', error.response.status, error.response.data);
            } else {
                console.error('Error sending job data:', error.message);
            }
            throw new Error('Error sending job data to Mock API: ' + error.message);
        }
    }
    async receiveFeedback(req, res) {
        try {
            const feedbackData = req.body;
            const response = await this.xactAnalysisService.receiveFeedback(feedbackData);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ message: 'Error receiving feedback from XactAnalysis', error: error.message });
        }
    }
}

export default XactAnalysisController;