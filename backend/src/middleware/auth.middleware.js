const jwt = require('jsonwebtoken');
const { User } = require('../models');
const admin = require('firebase-admin');

// Verify Firebase token
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: true,
        message: 'Access denied. No token provided.',
      });
    }

    const token = authHeader.split(' ')[1];
    
    // Verify the token with Firebase Admin
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    // Get user from database
    const user = await User.findOne({ where: { firebaseUid: decodedToken.uid } });
    
    if (!user) {
      return res.status(401).json({
        error: true,
        message: 'User not found in database.',
      });
    }
    
    // Attach user to request
    req.user = user;
    next();
    
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({
      error: true,
      message: 'Invalid or expired token.',
    });
  }
};

// Check if user is admin
const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      error: true,
      message: 'Access denied. Admin privileges required.',
    });
  }
  next();
};

// Check if user is self or admin
const isSelfOrAdmin = (req, res, next) => {
  const userId = parseInt(req.params.id);
  
  if (
    !req.user || 
    (req.user.id !== userId && req.user.role !== 'admin')
  ) {
    return res.status(403).json({
      error: true,
      message: 'Access denied. You can only access your own resources.',
    });
  }
  next();
};

// Check subscription tier
const checkSubscriptionTier = (requiredTier) => {
  return (req, res, next) => {
    const tierLevels = {
      'free': 0,
      'premium': 1,
      'enterprise': 2
    };
    
    const userTierLevel = tierLevels[req.user.subscriptionTier];
    const requiredTierLevel = tierLevels[requiredTier];
    
    if (userTierLevel < requiredTierLevel) {
      return res.status(403).json({
        error: true,
        message: `This feature requires a ${requiredTier} subscription.`,
      });
    }
    next();
  };
};

module.exports = {
  verifyToken,
  isAdmin,
  isSelfOrAdmin,
  checkSubscriptionTier
}; 