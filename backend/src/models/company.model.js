const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  website: {
    type: String,
    trim: true
  },
  logo: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  industry: {
    type: String,
    trim: true
  },
  sector: {
    type: String,
    trim: true
  },
  companySize: {
    type: String,
    enum: ['Startup', 'SMB', 'Mid-size', 'Enterprise']
  },
  founded: {
    type: Number
  },
  headquarters: {
    type: String,
    trim: true
  },
  country: {
    type: String,
    trim: true
  },
  state: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    trim: true
  },
  isHiring: {
    type: Boolean,
    default: false
  },
  usesRecruitmentAgency: {
    type: Boolean,
    default: false
  },
  linkedInUrl: {
    type: String,
    trim: true
  },
  careersPageUrl: {
    type: String,
    trim: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for better query performance
companySchema.index({ name: 1 });
companySchema.index({ industry: 1 });
companySchema.index({ sector: 1 });
companySchema.index({ isHiring: 1 });

const Company = mongoose.model('Company', companySchema);

module.exports = Company; 