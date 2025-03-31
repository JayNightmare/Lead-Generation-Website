const admin = require('firebase-admin');
const { User } = require('../models');

// Initialize Firebase Admin with environment variables
// In a real app, you'd use service account credentials from environment variables
const initializeFirebase = () => {
  try {
    // Check if Firebase is already initialized
    if (admin.apps.length === 0) {
      // For development environment, we can use the following approach
      if (process.env.NODE_ENV === 'development' && !process.env.FIREBASE_SERVICE_ACCOUNT) {
        admin.initializeApp({
          projectId: process.env.FIREBASE_PROJECT_ID || 'lead-gen-platform',
        });
        console.log('Firebase initialized in development mode');
        return;
      }
      
      // For production, use service account credentials
      let serviceAccount;
      
      try {
        serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      } catch (error) {
        console.error('Error parsing Firebase service account JSON:', error);
        throw new Error('Invalid Firebase configuration');
      }
      
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.FIREBASE_DATABASE_URL
      });
      
      console.log('Firebase Admin SDK initialized successfully');
    }
  } catch (error) {
    console.error('Error initializing Firebase Admin SDK:', error);
    throw error;
  }
};

// Create a user in Firebase Authentication
const createFirebaseUser = async (email, password, displayName) => {
  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName,
      emailVerified: false
    });
    
    return userRecord;
  } catch (error) {
    console.error('Error creating Firebase user:', error);
    throw error;
  }
};

// Verify ID token
const verifyIdToken = async (idToken) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    return decodedToken;
  } catch (error) {
    console.error('Error verifying ID token:', error);
    throw error;
  }
};

// Get user by Firebase UID
const getUserByFirebaseUid = async (firebaseUid) => {
  try {
    // First check our database
    const user = await User.findOne({ where: { firebaseUid } });
    
    if (user) {
      return user;
    }
    
    // If not in our database, check Firebase
    const firebaseUser = await admin.auth().getUser(firebaseUid);
    
    if (!firebaseUser) {
      return null;
    }
    
    // Create user in our database if it exists in Firebase but not in our DB
    return User.create({
      firebaseUid,
      email: firebaseUser.email,
      firstName: firebaseUser.displayName ? firebaseUser.displayName.split(' ')[0] : '',
      lastName: firebaseUser.displayName ? firebaseUser.displayName.split(' ').slice(1).join(' ') : '',
      role: 'user',
      lastLogin: new Date()
    });
    
  } catch (error) {
    console.error('Error getting user by Firebase UID:', error);
    return null;
  }
};

// Update a user in Firebase
const updateFirebaseUser = async (uid, updates) => {
  try {
    return await admin.auth().updateUser(uid, updates);
  } catch (error) {
    console.error('Error updating Firebase user:', error);
    throw error;
  }
};

// Delete a user in Firebase
const deleteFirebaseUser = async (uid) => {
  try {
    return await admin.auth().deleteUser(uid);
  } catch (error) {
    console.error('Error deleting Firebase user:', error);
    throw error;
  }
};

// Send password reset email
const sendPasswordResetEmail = async (email) => {
  try {
    // Firebase Admin SDK doesn't provide a direct way to send password reset emails
    // In a real app, you would use Firebase Auth REST API or the client SDK
    console.log(`Password reset email would be sent to ${email}`);
    return true;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};

// Export the Firebase service functions
module.exports = {
  initializeFirebase,
  createFirebaseUser,
  verifyIdToken,
  getUserByFirebaseUid,
  updateFirebaseUser,
  deleteFirebaseUser,
  sendPasswordResetEmail
}; 