module.exports = (sequelize, DataTypes) => {
  const JobPosting = sequelize.define('JobPosting', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    department: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
    jobType: {
      type: DataTypes.ENUM('full-time', 'part-time', 'contract', 'internship'),
    },
    salaryRange: {
      type: DataTypes.STRING,
    },
    experienceLevel: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
    },
    source: {
      type: DataTypes.STRING,
    },
    postedDate: {
      type: DataTypes.DATE,
    },
    isRemote: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    lastScraped: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  return JobPosting;
}; 