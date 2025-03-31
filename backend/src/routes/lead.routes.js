const express = require('express');
const router = express.Router();
const leadController = require('../controllers/lead.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Get all leads for current user
router.get('/', authMiddleware.verifyToken, leadController.getLeads);

// Get a single lead by ID
router.get('/:id', authMiddleware.verifyToken, leadController.getLeadById);

// Create a new lead
router.post('/', authMiddleware.verifyToken, leadController.createLead);

// Update a lead
router.put('/:id', authMiddleware.verifyToken, leadController.updateLead);

// Delete a lead
router.delete('/:id', authMiddleware.verifyToken, leadController.deleteLead);

// Export leads to CSV
router.get('/export/csv', authMiddleware.verifyToken, leadController.exportLeadsToCSV);

// Get lead statistics
router.get('/stats/overview', authMiddleware.verifyToken, leadController.getLeadStats);

// Bulk update lead status
router.put('/bulk/status', authMiddleware.verifyToken, leadController.bulkUpdateLeadStatus);

// Bulk delete leads
router.delete('/bulk/delete', authMiddleware.verifyToken, leadController.bulkDeleteLeads);

module.exports = router; 