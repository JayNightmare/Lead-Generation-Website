const { createFirebaseUser, verifyIdToken, getUserByFirebaseUid, updateFirebaseUser, generatePasswordResetLink, confirmPasswordReset, createCustomToken } = require('../services/firebase.service');
const User = require('../models/user.model');

exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validate request body
    if (!email || !password || !name) {
      return res.status(400).json({
        message: 'Please provide email, password, and name'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: 'Please provide a valid email address'
      });
    }

    // Validate password length
    if (password.length < 8) {
      return res.status(400).json({
        message: 'Password must be at least 6 characters long'
      });
    }

    console.log('Creating Firebase user...');
    // Create user in Firebase
    const firebaseUser = await createFirebaseUser(email, password, name);
    console.log('Firebase user created:', firebaseUser.uid);

    console.log('Creating MongoDB user...');
    // Create user in MongoDB
    const user = await User.create({
      email,
      name,
      firebaseUid: firebaseUser.uid,
    });
    console.log('MongoDB user created:', user._id);

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle specific error cases
    if (error.code === 'auth/email-already-in-use') {
      return res.status(400).json({
        message: 'This email is already registered'
      });
    }
    
    if (error.code === 'auth/invalid-email') {
      return res.status(400).json({
        message: 'Invalid email address'
      });
    }
    
    if (error.code === 'auth/weak-password') {
      return res.status(400).json({
        message: 'Password should be at least 6 characters long'
      });
    }

    res.status(400).json({
      message: error.message || 'Failed to register user'
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verify Firebase token
    const decodedToken = await verifyIdToken(req.headers.authorization?.split('Bearer ')[1]);
    
    // Get user from MongoDB
    const user = await getUserByFirebaseUid(decodedToken.uid);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({
      message: error.message || 'Invalid credentials',
    });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await getUserByFirebaseUid(req.user.uid);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({
      message: error.message || 'Failed to get user',
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name } = req.body;

    // Update Firebase profile
    await updateFirebaseUser(req.user.uid, {
      displayName: name,
    });

    // Update MongoDB user
    const user = await User.findOneAndUpdate(
      { firebaseUid: req.user.uid },
      { name },
      { new: true }
    );

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      message: error.message || 'Failed to update profile',
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { newPassword } = req.body;

    await updateFirebaseUser(req.user.uid, {
      password: newPassword,
    });

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Update password error:', error);
    res.status(500).json({
      message: error.message || 'Failed to update password',
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    await generatePasswordResetLink(email);

    res.json({ message: 'Password reset email sent successfully' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      message: error.message || 'Failed to send password reset email',
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { oobCode, newPassword } = req.body;

    await confirmPasswordReset(oobCode, newPassword);

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      message: error.message || 'Failed to reset password',
    });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    const decodedToken = await verifyIdToken(refreshToken, true);
    const newToken = await createCustomToken(decodedToken.uid);

    res.json({ token: newToken });
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(401).json({
      message: error.message || 'Invalid refresh token',
    });
  }
};

exports.logout = async (req, res) => {
  try {
    // Firebase handles logout on the client side
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      message: error.message || 'Failed to logout',
    });
  }
}; 