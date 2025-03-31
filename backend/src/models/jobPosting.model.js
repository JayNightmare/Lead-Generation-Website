const mongoose = require('mongoose');

const jobPostingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  department: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  jobType: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship']
  },
  salaryRange: {
    type: String,
    trim: true
  },
  experienceLevel: {
    type: String,
    trim: true
  },
  url: {
    type: String,
    trim: true
  },
  source: {
    type: String,
    trim: true
  },
  postedDate: {
    type: Date
  },
  isRemote: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
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
jobPostingSchema.index({ title: 1 });
jobPostingSchema.index({ company: 1 });
jobPostingSchema.index({ jobType: 1 });
jobPostingSchema.index({ isActive: 1 });
jobPostingSchema.index({ postedDate: 1 });

const JobPosting = mongoose.model('JobPosting', jobPostingSchema);

module.exports = JobPosting; 