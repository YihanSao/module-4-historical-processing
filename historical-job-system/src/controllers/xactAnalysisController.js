class XactAnalysisController {
    constructor(xactAnalysisService) {
        this.xactAnalysisService = xactAnalysisService;
    }

    async sendJobData(req, res) {
        try {
            const jobData = req.body;
            const response = await this.xactAnalysisService.sendJobData(jobData);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ message: 'Error sending job data to XactAnalysis', error: error.message });
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