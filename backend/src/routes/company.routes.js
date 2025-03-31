const express = require('express');
const router = express.Router();
const companyController = require('../controllers/company.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Get all companies with filtering options
router.get('/', authMiddleware.verifyToken, companyController.getCompanies);

// Get a single company by ID
router.get('/:id', authMiddleware.verifyToken, companyController.getCompanyById);

// Get company job postings
router.get('/:id/jobs', authMiddleware.verifyToken, companyController.getCompanyJobs);

// Get company contact persons
router.get('/:id/contacts', authMiddleware.verifyToken, companyController.getCompanyContacts);

// Create a new company (admin only)
router.post('/', 
  authMiddleware.verifyToken, 
  authMiddleware.isAdmin, 
  companyController.createCompany
);

// Update a company (admin only)
router.put('/:id', 
  authMiddleware.verifyToken, 
  authMiddleware.isAdmin, 
  companyController.updateCompany
);

// Delete a company (admin only)
router.delete('/:id', 
  authMiddleware.verifyToken, 
  authMiddleware.isAdmin, 
  companyController.deleteCompany
);

// Refresh company data from external sources (admin only)
router.post('/:id/refresh', 
  authMiddleware.verifyToken, 
  authMiddleware.isAdmin, 
  companyController.refreshCompanyData
);

module.exports = router; 