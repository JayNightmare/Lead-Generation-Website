const { Sequelize } = require('sequelize');

// Initialize Sequelize with PostgreSQL
const sequelize = new Sequelize(
  process.env.DB_NAME || 'lead_gen_db',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'postgres',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// Define models
const db = {
  sequelize,
  Sequelize,
  Company: require('./company.model')(sequelize, Sequelize),
  User: require('./user.model')(sequelize, Sequelize),
  Lead: require('./lead.model')(sequelize, Sequelize),
  Role: require('./role.model')(sequelize, Sequelize),
  ContactPerson: require('./contactPerson.model')(sequelize, Sequelize),
  JobPosting: require('./jobPosting.model')(sequelize, Sequelize),
};

// Define associations
db.User.hasMany(db.Lead);
db.Lead.belongsTo(db.User);

db.Company.hasMany(db.Lead);
db.Lead.belongsTo(db.Company);

db.Company.hasMany(db.JobPosting);
db.JobPosting.belongsTo(db.Company);

db.Company.hasMany(db.ContactPerson);
db.ContactPerson.belongsTo(db.Company);

module.exports = db; 