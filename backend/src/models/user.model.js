module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firebaseUid: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    companyName: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user',
    },
    subscriptionTier: {
      type: DataTypes.ENUM('free', 'premium', 'enterprise'),
      defaultValue: 'free',
    },
    searchHistory: {
      type: DataTypes.JSONB,
      defaultValue: [],
    },
    preferredIndustries: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    preferredSectors: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    isEmailNotificationsEnabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    lastLogin: {
      type: DataTypes.DATE,
    },
  });

  return User;
}; 