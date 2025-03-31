const { Op } = require('sequelize');
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
      sortOrder = 'DESC'
    } = req.query;

    // Build filter conditions
    const whereConditions = { UserId: userId };
    
    if (status) {
      whereConditions.status = status;
    }
    
    if (priority) {
      whereConditions.priority = priority;
    }
    
    if (tag) {
      whereConditions.tags = { [Op.contains]: [tag] };
    }
    
    // Include company search
    const include = [{
      model: Company,
      required: true,
    }];
    
    if (search) {
      include[0].where = {
        name: { [Op.iLike]: `%${search}%` }
      };
    }

    // Calculate pagination
    const offset = (page - 1) * limit;
    
    // Get leads with optional filters
    const { count, rows: leads } = await Lead.findAndCountAll({
      where: whereConditions,
      include,
      limit,
      offset,
      order: [[sortBy, sortOrder]],
      distinct: true
    });

    // Return paginated results
    return res.json({
      total: count,
      totalPages: Math.ceil(count / limit),
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
      where: {
        id,
        UserId: userId
      },
      include: [{ model: Company }]
    });
    
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
    const company = await Company.findByPk(companyId);
    
    if (!company) {
      return res.status(404).json({
        error: true,
        message: 'Company not found'
      });
    }
    
    // Create the lead
    const newLead = await Lead.create({
      ...leadData,
      UserId: userId,
      CompanyId: companyId
    });
    
    // Return the lead with company data
    const leadWithCompany = await Lead.findByPk(newLead.id, {
      include: [{ model: Company }]
    });
    
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
    const lead = await Lead.findOne({
      where: {
        id,
        UserId: userId
      }
    });
    
    if (!lead) {
      return res.status(404).json({
        error: true,
        message: 'Lead not found'
      });
    }
    
    // Update the lead
    await lead.update(leadData);
    
    // Return updated lead with company data
    const updatedLead = await Lead.findByPk(id, {
      include: [{ model: Company }]
    });
    
    return res.json(updatedLead);
    
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
    const lead = await Lead.findOne({
      where: {
        id,
        UserId: userId
      }
    });
    
    if (!lead) {
      return res.status(404).json({
        error: true,
        message: 'Lead not found'
      });
    }
    
    // Delete the lead
    await lead.destroy();
    
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
    const whereConditions = { UserId: userId };
    
    if (status) {
      whereConditions.status = status;
    }
    
    if (priority) {
      whereConditions.priority = priority;
    }
    
    // Get all leads for export
    const leads = await Lead.findAll({
      where: whereConditions,
      include: [{ model: Company }],
      order: [['createdAt', 'DESC']]
    });
    
    // Format data for CSV
    const leadsForExport = leads.map(lead => {
      const company = lead.Company;
      return {
        'Lead ID': lead.id,
        'Company': company.name,
        'Status': lead.status,
        'Priority': lead.priority,
        'Notes': lead.notes,
        'Tags': lead.tags.join(', '),
        'Follow-up Date': lead.followUpDate ? new Date(lead.followUpDate).toLocaleDateString() : '',
        'Industry': company.industry,
        'Sector': company.sector,
        'Size': company.companySize,
        'Country': company.country,
        'Website': company.website,
        'Is Hiring': company.isHiring ? 'Yes' : 'No',
        'Created At': new Date(lead.createdAt).toLocaleDateString()
      };
    });
    
    // Convert to CSV
    const fields = Object.keys(leadsForExport[0] || {});
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(leadsForExport);
    
    // Set headers for download
    res.header('Content-Type', 'text/csv');
    res.attachment(`leads-export-${Date.now()}.csv`);
    
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
    
    // Count leads by status
    const statusCounts = await Lead.findAll({
      attributes: [
        'status',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      where: { UserId: userId },
      group: ['status']
    });
    
    // Count leads by priority
    const priorityCounts = await Lead.findAll({
      attributes: [
        'priority',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      where: { UserId: userId },
      group: ['priority']
    });
    
    // Get recent leads
    const recentLeads = await Lead.findAll({
      where: { UserId: userId },
      include: [{ model: Company, attributes: ['name', 'industry', 'sector'] }],
      order: [['createdAt', 'DESC']],
      limit: 5
    });
    
    // Count leads by company industry
    const industryStats = await Lead.findAll({
      attributes: [
        [sequelize.col('Company.industry'), 'industry'],
        [sequelize.fn('COUNT', sequelize.col('Lead.id')), 'count']
      ],
      include: [{
        model: Company,
        attributes: []
      }],
      where: { UserId: userId },
      group: [sequelize.col('Company.industry')],
      order: [[sequelize.literal('count'), 'DESC']],
      raw: true
    });
    
    return res.json({
      statusCounts,
      priorityCounts,
      recentLeads,
      industryStats,
      totalLeads: await Lead.count({ where: { UserId: userId } })
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
    
    if (!leadIds || !Array.isArray(leadIds) || !status) {
      return res.status(400).json({
        error: true,
        message: 'Invalid request. leadIds array and status are required.'
      });
    }
    
    // Update leads that belong to user
    const result = await Lead.update(
      { status },
      {
        where: {
          id: { [Op.in]: leadIds },
          UserId: userId
        }
      }
    );
    
    return res.json({
      message: `${result[0]} leads updated successfully`
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
    
    if (!leadIds || !Array.isArray(leadIds)) {
      return res.status(400).json({
        error: true,
        message: 'Invalid request. leadIds array is required.'
      });
    }
    
    // Delete leads that belong to user
    const result = await Lead.destroy({
      where: {
        id: { [Op.in]: leadIds },
        UserId: userId
      }
    });
    
    return res.json({
      message: `${result} leads deleted successfully`
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