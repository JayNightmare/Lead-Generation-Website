module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    website: {
      type: DataTypes.STRING,
    },
    logo: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    industry: {
      type: DataTypes.STRING,
    },
    sector: {
      type: DataTypes.STRING,
    },
    companySize: {
      type: DataTypes.ENUM('Startup', 'SMB', 'Mid-size', 'Enterprise'),
    },
    founded: {
      type: DataTypes.INTEGER,
    },
    headquarters: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    isHiring: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    usesRecruitmentAgency: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    linkedInUrl: {
      type: DataTypes.STRING,
    },
    careersPageUrl: {
      type: DataTypes.STRING,
    },
    lastUpdated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  return Company;
}; 