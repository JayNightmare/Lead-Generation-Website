const { Lead, Company, User } = require('../models');
const fs = require('fs');
const { Parser } = require('json2csv');

// Get all leads for current user
const getLeads = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      status,
      priority,
      tag,
      search,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter conditions
    const query = { assignedTo: userId };
    
    if (status) {
      query.status = status;
    }
    
    if (priority) {
      query.priority = priority;
    }
    
    if (tag) {
      query.tags = tag;
    }
    
    // Include company search
    const populateOptions = {
      path: 'company',
      match: search ? { name: { $regex: search, $options: 'i' } } : {}
    };

    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Get leads with optional filters
    const [leads, total] = await Promise.all([
      Lead.find(query)
        .populate(populateOptions)
        .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
        .skip(skip)
        .limit(limit),
      Lead.countDocuments(query)
    ]);

    // Return paginated results
    return res.json({
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      leads
    });
    
  } catch (error) {
    console.error('Error fetching leads:', error);
    return res.status(500).json({
      error: true,
      message: 'Server error while fetching leads'
    });
  }
};

// Get lead by ID
const getLeadById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const lead = await Lead.findOne({
      _id: id,
      assignedTo: userId
    }).populate('company');
    
    if (!lead) {
      return res.status(404).json({
        error: true,
        message: 'Lead not found'
      });
    }
    
    return res.json(lead);
    
  } catch (error) {
    console.error('Error fetching lead:', error);
    return res.status(500).json({
      error: true,
      message: 'Server error while fetching lead'
    });
  }
};

// Create a new lead
const createLead = async (req, res) => {
  try {
    const { companyId, ...leadData } = req.body;
    const userId = req.user.id;
    
    // Check if company exists
    const company = await Company.findById(companyId);
    
    if (!company) {
      return res.status(404).json({
        error: true,
        message: 'Company not found'
      });
    }
    
    // Create the lead
    const newLead = await Lead.create({
      ...leadData,
      assignedTo: userId,
      company: companyId
    });
    
    // Return the lead with company data
    const leadWithCompany = await Lead.findById(newLead._id)
      .populate('company');
    
    return res.status(201).json(leadWithCompany);
    
  } catch (error) {
    console.error('Error creating lead:', error);
    return res.status(500).json({
      error: true,
      message: 'Server error while creating lead'
    });
  }
};

// Update a lead
const updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const leadData = req.body;
    const userId = req.user.id;
    
    // Find lead and ensure it belongs to user
    const lead = await Lead.findOneAndUpdate(
      { _id: id, assignedTo: userId },
      leadData,
      { new: true, runValidators: true }
    ).populate('company');
    
    if (!lead) {
      return res.status(404).json({
        error: true,
        message: 'Lead not found'
      });
    }
    
    return res.json(lead);
    
  } catch (error) {
    console.error('Error updating lead:', error);
    return res.status(500).json({
      error: true,
      message: 'Server error while updating lead'
    });
  }
};

// Delete a lead
const deleteLead = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    // Find lead and ensure it belongs to user
    const lead = await Lead.findOneAndDelete({
      _id: id,
      assignedTo: userId
    });
    
    if (!lead) {
      return res.status(404).json({
        error: true,
        message: 'Lead not found'
      });
    }
    
    return res.json({
      message: 'Lead deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting lead:', error);
    return res.status(500).json({
      error: true,
      message: 'Server error while deleting lead'
    });
  }
};

// Export leads to CSV
const exportLeadsToCSV = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status, priority } = req.query;
    
    // Build filter conditions
    const query = { assignedTo: userId };
    
    if (status) {
      query.status = status;
    }
    
    if (priority) {
      query.priority = priority;
    }
    
    // Get all leads for export
    const leads = await Lead.find(query)
      .populate('company')
      .sort({ createdAt: -1 });
    
    // Transform leads for CSV
    const csvData = leads.map(lead => ({
      id: lead._id,
      status: lead.status,
      priority: lead.priority,
      companyName: lead.company?.name || '',
      notes: lead.notes || '',
      tags: lead.tags.join(', '),
      followUpDate: lead.followUpDate || '',
      createdAt: lead.createdAt,
      updatedAt: lead.updatedAt
    }));
    
    // Generate CSV
    const parser = new Parser();
    const csv = parser.parse(csvData);
    
    // Set response headers
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=leads.csv');
    
    // Send CSV file
    return res.send(csv);
    
  } catch (error) {
    console.error('Error exporting leads:', error);
    return res.status(500).json({
      error: true,
      message: 'Server error while exporting leads'
    });
  }
};

// Get lead statistics
const getLeadStats = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get counts by status
    const statusCounts = await Lead.aggregate([
      { $match: { assignedTo: userId } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    
    // Get counts by priority
    const priorityCounts = await Lead.aggregate([
      { $match: { assignedTo: userId } },
      { $group: { _id: '$priority', count: { $sum: 1 } } }
    ]);
    
    // Get counts by company
    const companyCounts = await Lead.aggregate([
      { $match: { assignedTo: userId } },
      { $group: { _id: '$company', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);
    
    // Populate company names
    const companyIds = companyCounts.map(c => c._id);
    const companies = await Company.find({ _id: { $in: companyIds } });
    const companyMap = new Map(companies.map(c => [c._id.toString(), c.name]));
    
    const companyStats = companyCounts.map(c => ({
      name: companyMap.get(c._id.toString()) || 'Unknown',
      count: c.count
    }));
    
    return res.json({
      statusCounts,
      priorityCounts,
      companyStats
    });
    
  } catch (error) {
    console.error('Error fetching lead stats:', error);
    return res.status(500).json({
      error: true,
      message: 'Server error while fetching lead statistics'
    });
  }
};

// Bulk update lead status
const bulkUpdateLeadStatus = async (req, res) => {
  try {
    const { leadIds, status } = req.body;
    const userId = req.user.id;
    
    const result = await Lead.updateMany(
      { _id: { $in: leadIds }, assignedTo: userId },
      { $set: { status } }
    );
    
    return res.json({
      message: `Updated ${result.modifiedCount} leads`,
      modifiedCount: result.modifiedCount
    });
    
  } catch (error) {
    console.error('Error bulk updating leads:', error);
    return res.status(500).json({
      error: true,
      message: 'Server error while bulk updating leads'
    });
  }
};

// Bulk delete leads
const bulkDeleteLeads = async (req, res) => {
  try {
    const { leadIds } = req.body;
    const userId = req.user.id;
    
    const result = await Lead.deleteMany({
      _id: { $in: leadIds },
      assignedTo: userId
    });
    
    return res.json({
      message: `Deleted ${result.deletedCount} leads`,
      deletedCount: result.deletedCount
    });
    
  } catch (error) {
    console.error('Error bulk deleting leads:', error);
    return res.status(500).json({
      error: true,
      message: 'Server error while bulk deleting leads'
    });
  }
};

module.exports = {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
  exportLeadsToCSV,
  getLeadStats,
  bulkUpdateLeadStatus,
  bulkDeleteLeads
}; 