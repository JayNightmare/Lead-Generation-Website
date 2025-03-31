const mongoose = require('mongoose');

// Define models
const db = {
  mongoose,
  Company: require('./company.model'),
  User: require('./user.model'),
  Lead: require('./lead.model'),
  Role: require('./role.model'),
  ContactPerson: require('./contactPerson.model'),
  JobPosting: require('./jobPosting.model')
};

module.exports = db; 