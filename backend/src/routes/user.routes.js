const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Get all users (admin only)
router.get('/', 
  authMiddleware.verifyToken, 
  authMiddleware.isAdmin, 
  userController.getUsers
);

// Get user by ID (admin or self)
router.get('/:id', 
  authMiddleware.verifyToken, 
  authMiddleware.isSelfOrAdmin, 
  userController.getUserById
);

// Update user (admin or self)
router.put('/:id', 
  authMiddleware.verifyToken, 
  authMiddleware.isSelfOrAdmin, 
  userController.updateUser
);

// Delete user (admin only)
router.delete('/:id', 
  authMiddleware.verifyToken, 
  authMiddleware.isAdmin, 
  userController.deleteUser
);

// Get user search history
router.get('/:id/search-history', 
  authMiddleware.verifyToken, 
  authMiddleware.isSelfOrAdmin, 
  userController.getSearchHistory
);

// Clear user search history
router.delete('/:id/search-history', 
  authMiddleware.verifyToken, 
  authMiddleware.isSelfOrAdmin, 
  userController.clearSearchHistory
);

// Update user preferences
router.put('/:id/preferences', 
  authMiddleware.verifyToken, 
  authMiddleware.isSelfOrAdmin, 
  userController.updatePreferences
);

module.exports = router; 