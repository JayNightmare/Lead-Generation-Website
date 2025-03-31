const mongoose = require('mongoose');

const contactPersonSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    trim: true
  },
  department: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    trim: true
  },
  linkedInUrl: {
    type: String,
    trim: true
  },
  isDecisionMaker: {
    type: Boolean,
    default: false
  },
  notes: {
    type: String,
    trim: true
  },
  source: {
    type: String,
    trim: true
  },
  lastScraped: {
    type: Date,
    default: Date.now
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  }
}, {
  timestamps: true
});

// Indexes for better query performance
contactPersonSchema.index({ fullName: 1 });
contactPersonSchema.index({ email: 1 });
contactPersonSchema.index({ company: 1 });
contactPersonSchema.index({ isDecisionMaker: 1 });

const ContactPerson = mongoose.model('ContactPerson', contactPersonSchema);

module.exports = ContactPerson; 