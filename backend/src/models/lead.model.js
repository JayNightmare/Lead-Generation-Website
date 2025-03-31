module.exports = (sequelize, DataTypes) => {
  const Lead = sequelize.define('Lead', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.ENUM('new', 'contacted', 'negotiating', 'converted', 'lost'),
      defaultValue: 'new',
    },
    notes: {
      type: DataTypes.TEXT,
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      defaultValue: 'medium',
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    followUpDate: {
      type: DataTypes.DATE,
    },
    customFields: {
      type: DataTypes.JSONB,
      defaultValue: {},
    },
  });

  return Lead;
}; 