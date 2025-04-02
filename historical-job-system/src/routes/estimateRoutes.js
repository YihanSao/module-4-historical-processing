import express from 'express';
import EstimateController from '../controllers/estimateController.js';

const router = express.Router();

/**
 * @swagger
 * /api/estimates:
 *   post:
 *     summary: Create a new estimate
 *     tags: [Estimates]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Estimate created successfully
 */
router.post('/estimates', EstimateController.createEstimate);

/**
 * @swagger
 * /api/estimates:
 *   get:
 *     summary: Get all estimates
 *     tags: [Estimates]
 *     responses:
 *       200:
 *         description: List of all estimates
 */
router.get('/estimates', EstimateController.getAllEstimates);

/**
 * @swagger
 * /api/estimates/{id}:
 *   get:
 *     summary: Get an estimate by ID
 *     tags: [Estimates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The estimate ID
 *     responses:
 *       200:
 *         description: Estimate details
 *       404:
 *         description: Estimate not found
 */
router.get('/estimates/:id', EstimateController.getEstimateById);

/**
 * @swagger
 * /api/estimates/{id}:
 *   put:
 *     summary: Update an estimate by ID
 *     tags: [Estimates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The estimate ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Estimate updated successfully
 */
router.put('/estimates/:id', EstimateController.updateEstimate);

/**
 * @swagger
 * /api/estimates/{id}:
 *   delete:
 *     summary: Delete an estimate by ID
 *     tags: [Estimates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The estimate ID
 *     responses:
 *       204:
 *         description: Estimate deleted successfully
 */
router.delete('/estimates/:id', EstimateController.deleteEstimate);

export default router;