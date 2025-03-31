const User = require('../models/user.model');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 });

    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      message: error.message || 'Failed to get users',
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get user by ID error:', error);
    res.status(500).json({
      message: error.message || 'Failed to get user',
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { password, ...updateData } = req.body;

    // If password is being updated, hash it
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      message: error.message || 'Failed to update user',
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      message: error.message || 'Failed to delete user',
    });
  }
};

exports.getSearchHistory = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('searchHistory')
      .populate('searchHistory.company', 'name website');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.searchHistory);
  } catch (error) {
    console.error('Get search history error:', error);
    res.status(500).json({
      message: error.message || 'Failed to get search history',
    });
  }
};

exports.clearSearchHistory = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { searchHistory: [] } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Search history cleared successfully' });
  } catch (error) {
    console.error('Clear search history error:', error);
    res.status(500).json({
      message: error.message || 'Failed to clear search history',
    });
  }
};

exports.updatePreferences = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { preferences: req.body } },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.preferences);
  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({
      message: error.message || 'Failed to update preferences',
    });
  }
}; 