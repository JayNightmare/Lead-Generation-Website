const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Register a new user
router.post('/register', authController.register);

// Login user
router.post('/login', authController.login);

// Get current user
router.get('/me', authMiddleware.verifyToken, authController.getCurrentUser);

// Update user profile
router.put('/profile', authMiddleware.verifyToken, authController.updateProfile);

// Update password
router.put('/change-password', authMiddleware.verifyToken, authController.updatePassword);

// Request password reset
router.post('/forgot-password', authController.forgotPassword);

// Reset password with token
router.post('/reset-password', authController.resetPassword);

// Refresh token
router.post('/refresh-token', authController.refreshToken);

// Logout
router.post('/logout', authMiddleware.verifyToken, authController.logout);

module.exports = router; 