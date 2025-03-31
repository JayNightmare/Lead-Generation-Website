const admin = require('firebase-admin');
const { User } = require('../models');

// Initialize Firebase Admin with environment variables
const initializeFirebase = () => {
  try {
    // Check if Firebase is already initialized
    if (admin.apps.length === 0) {
      const serviceAccount = {
        type: "service_account",
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
      };
      
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
      
      console.log('Firebase Admin SDK initialized successfully');
    }
  } catch (error) {
    console.error('Error initializing Firebase Admin SDK:', error);
    throw error;
  }
};

// Initialize Firebase
initializeFirebase();

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

// Update a user in Firebase Authentication
const updateFirebaseUser = async (uid, updateData) => {
  try {
    const userRecord = await admin.auth().updateUser(uid, updateData);
    return userRecord;
  } catch (error) {
    console.error('Error updating Firebase user:', error);
    throw error;
  }
};

// Verify ID token
const verifyIdToken = async (idToken, checkRevoked = false) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken, checkRevoked);
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
    const user = await User.findOne({ firebaseUid });
    
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
      name: firebaseUser.displayName || '',
      role: 'user',
      lastLogin: new Date()
    });
    
  } catch (error) {
    console.error('Error getting user by Firebase UID:', error);
    return null;
  }
};

// Generate password reset link
const generatePasswordResetLink = async (email) => {
  try {
    const link = await admin.auth().generatePasswordResetLink(email);
    return link;
  } catch (error) {
    console.error('Error generating password reset link:', error);
    throw error;
  }
};

// Confirm password reset
const confirmPasswordReset = async (oobCode, newPassword) => {
  try {
    await admin.auth().confirmPasswordReset(oobCode, newPassword);
  } catch (error) {
    console.error('Error confirming password reset:', error);
    throw error;
  }
};

// Create custom token
const createCustomToken = async (uid) => {
  try {
    const token = await admin.auth().createCustomToken(uid);
    return token;
  } catch (error) {
    console.error('Error creating custom token:', error);
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

module.exports = {
  createFirebaseUser,
  updateFirebaseUser,
  verifyIdToken,
  getUserByFirebaseUid,
  generatePasswordResetLink,
  confirmPasswordReset,
  createCustomToken,
  deleteFirebaseUser,
  sendPasswordResetEmail
}; 