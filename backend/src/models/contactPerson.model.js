module.exports = (sequelize, DataTypes) => {
  const ContactPerson = sequelize.define('ContactPerson', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
    },
    department: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
    },
    linkedInUrl: {
      type: DataTypes.STRING,
    },
    isDecisionMaker: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    notes: {
      type: DataTypes.TEXT,
    },
    source: {
      type: DataTypes.STRING,
    },
    lastScraped: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  return ContactPerson;
}; 