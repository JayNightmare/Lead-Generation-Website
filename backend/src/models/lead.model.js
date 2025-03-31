const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['new', 'contacted', 'negotiating', 'converted', 'lost'],
    default: 'new'
  },
  notes: {
    type: String,
    trim: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  tags: [{
    type: String,
    trim: true
  }],
  followUpDate: {
    type: Date
  },
  customFields: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    default: {}
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Indexes for better query performance
leadSchema.index({ status: 1 });
leadSchema.index({ priority: 1 });
leadSchema.index({ followUpDate: 1 });
leadSchema.index({ company: 1 });
leadSchema.index({ assignedTo: 1 });

const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead; 