const { Op } = require('sequelize');
const { 
  Company,
  JobPosting,
  ContactPerson
} = require('../models');
const scrapingService = require('../services/scraping.service');

// Get all companies with filtering
const getCompanies = async (req, res) => {
  try {
    const {
      search,
      industry,
      sector,
      country,
      state,
      city,
      companySize,
      isHiring,
      usesRecruitmentAgency,
      page = 1,
      limit = 10,
      sortBy = 'name',
      sortOrder = 'ASC'
    } = req.query;

    // Build filter conditions
    const whereConditions = {};
    
    if (search) {
      whereConditions.name = { [Op.iLike]: `%${search}%` };
    }
    
    if (industry) {
      whereConditions.industry = { [Op.iLike]: `%${industry}%` };
    }
    
    if (sector) {
      whereConditions.sector = { [Op.iLike]: `%${sector}%` };
    }
    
    if (country) {
      whereConditions.country = { [Op.iLike]: `%${country}%` };
    }
    
    if (state) {
      whereConditions.state = { [Op.iLike]: `%${state}%` };
    }
    
    if (city) {
      whereConditions.city = { [Op.iLike]: `%${city}%` };
    }
    
    if (companySize) {
      whereConditions.companySize = companySize;
    }
    
    if (isHiring !== undefined) {
      whereConditions.isHiring = isHiring === 'true';
    }
    
    if (usesRecruitmentAgency !== undefined) {
      whereConditions.usesRecruitmentAgency = usesRecruitmentAgency === 'true';
    }

    // Calculate pagination
    const offset = (page - 1) * limit;
    
    // Get companies with optional filters
    const { count, rows: companies } = await Company.findAndCountAll({
      where: whereConditions,
      limit,
      offset,
      order: [[sortBy, sortOrder]]
    });

    // Return paginated results
    return res.json({
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      companies
    });
    
  } catch (error) {
    console.error('Error fetching companies:', error);
    return res.status(500).json({
      error: true,
      message: 'Server error while fetching companies'
    });
  }
};

// Get company by ID
const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const company = await Company.findByPk(id, {
      include: [
        { model: JobPosting, limit: 5 },
        { 
          model: ContactPerson,
          where: { isDecisionMaker: true },
          required: false,
          limit: 5
        }
      ]
    });
    
    if (!company) {
      return res.status(404).json({
        error: true,
        message: 'Company not found'
      });
    }
    
    return res.json(company);
    
  } catch (error) {
    console.error('Error fetching company:', error);
    return res.status(500).json({
      error: true,
      message: 'Server error while fetching company'
    });
  }
};

// Get company job postings
const getCompanyJobs = async (req, res) => {
  try {
    const { id } = req.params;
    
    const company = await Company.findByPk(id);
    
    if (!company) {
      return res.status(404).json({
        error: true,
        message: 'Company not found'
      });
    }
    
    const jobs = await JobPosting.findAll({
      where: { CompanyId: id },
      order: [['postedDate', 'DESC']]
    });
    
    return res.json(jobs);
    
  } catch (error) {
    console.error('Error fetching company jobs:', error);
    return res.status(500).json({
      error: true,
      message: 'Server error while fetching company jobs'
    });
  }
};

// Get company contacts
const getCompanyContacts = async (req, res) => {
  try {
    const { id } = req.params;
    
    const company = await Company.findByPk(id);
    
    if (!company) {
      return res.status(404).json({
        error: true,
        message: 'Company not found'
      });
    }
    
    const contacts = await ContactPerson.findAll({
      where: { CompanyId: id },
      order: [['isDecisionMaker', 'DESC']]
    });
    
    return res.json(contacts);
    
  } catch (error) {
    console.error('Error fetching company contacts:', error);
    return res.status(500).json({
      error: true,
      message: 'Server error while fetching company contacts'
    });
  }
};

// Create a company
const createCompany = async (req, res) => {
  try {
    const companyData = req.body;
    
    const newCompany = await Company.create(companyData);
    
    return res.status(201).json(newCompany);
    
  } catch (error) {
    console.error('Error creating company:', error);
    return res.status(500).json({
      error: true,
      message: 'Server error while creating company'
    });
  }
};

// Update a company
const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const companyData = req.body;
    
    const company = await Company.findByPk(id);
    
    if (!company) {
      return res.status(404).json({
        error: true,
        message: 'Company not found'
      });
    }
    
    await company.update(companyData);
    
    return res.json(company);
    
  } catch (error) {
    console.error('Error updating company:', error);
    return res.status(500).json({
      error: true,
      message: 'Server error while updating company'
    });
  }
};

// Delete a company
const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    
    const company = await Company.findByPk(id);
    
    if (!company) {
      return res.status(404).json({
        error: true,
        message: 'Company not found'
      });
    }
    
    await company.destroy();
    
    return res.json({
      message: 'Company deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting company:', error);
    return res.status(500).json({
      error: true,
      message: 'Server error while deleting company'
    });
  }
};

// Refresh company data from external sources
const refreshCompanyData = async (req, res) => {
  try {
    const { id } = req.params;
    
    const company = await Company.findByPk(id);
    
    if (!company) {
      return res.status(404).json({
        error: true,
        message: 'Company not found'
      });
    }
    
    // Scrape new job postings
    if (company.careersPageUrl) {
      await scrapingService.scrapeJobs(company);
    }
    
    // Scrape LinkedIn for contacts
    if (company.linkedInUrl) {
      await scrapingService.scrapeContacts(company);
    }
    
    // Update company status
    await company.update({
      lastUpdated: new Date(),
      isHiring: await JobPosting.count({ where: { CompanyId: id, isActive: true } }) > 0
    });
    
    return res.json({
      message: 'Company data refreshed successfully',
      company
    });
    
  } catch (error) {
    console.error('Error refreshing company data:', error);
    return res.status(500).json({
      error: true,
      message: 'Server error while refreshing company data'
    });
  }
};

module.exports = {
  getCompanies,
  getCompanyById,
  getCompanyJobs,
  getCompanyContacts,
  createCompany,
  updateCompany,
  deleteCompany,
  refreshCompanyData
}; 