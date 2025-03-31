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
      sortOrder = 'asc'
    } = req.query;

    // Build filter conditions
    const query = {};
    
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    
    if (industry) {
      query.industry = { $regex: industry, $options: 'i' };
    }
    
    if (sector) {
      query.sector = { $regex: sector, $options: 'i' };
    }
    
    if (country) {
      query.country = { $regex: country, $options: 'i' };
    }
    
    if (state) {
      query.state = { $regex: state, $options: 'i' };
    }
    
    if (city) {
      query.city = { $regex: city, $options: 'i' };
    }
    
    if (companySize) {
      query.companySize = companySize;
    }
    
    if (isHiring !== undefined) {
      query.isHiring = isHiring === 'true';
    }
    
    if (usesRecruitmentAgency !== undefined) {
      query.usesRecruitmentAgency = usesRecruitmentAgency === 'true';
    }

    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Get companies with optional filters
    const [companies, total] = await Promise.all([
      Company.find(query)
        .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
        .skip(skip)
        .limit(limit),
      Company.countDocuments(query)
    ]);

    // Return paginated results
    return res.json({
      total,
      totalPages: Math.ceil(total / limit),
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
    
    const company = await Company.findById(id)
      .populate({
        path: 'jobPostings',
        model: 'JobPosting',
        options: { limit: 5 }
      })
      .populate({
        path: 'contactPersons',
        model: 'ContactPerson',
        match: { isDecisionMaker: true },
        options: { limit: 5 }
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
    
    const company = await Company.findById(id);
    
    if (!company) {
      return res.status(404).json({
        error: true,
        message: 'Company not found'
      });
    }
    
    const jobs = await JobPosting.find({ company: id })
      .sort({ postedDate: -1 });
    
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
    
    const company = await Company.findById(id);
    
    if (!company) {
      return res.status(404).json({
        error: true,
        message: 'Company not found'
      });
    }
    
    const contacts = await ContactPerson.find({ company: id })
      .sort({ isDecisionMaker: -1 });
    
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
    
    const company = await Company.findByIdAndUpdate(
      id,
      companyData,
      { new: true, runValidators: true }
    );
    
    if (!company) {
      return res.status(404).json({
        error: true,
        message: 'Company not found'
      });
    }
    
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
    
    const company = await Company.findByIdAndDelete(id);
    
    if (!company) {
      return res.status(404).json({
        error: true,
        message: 'Company not found'
      });
    }
    
    // Delete associated jobs and contacts
    await Promise.all([
      JobPosting.deleteMany({ company: id }),
      ContactPerson.deleteMany({ company: id }),
    ]);

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

// Refresh company data from scraping service
const refreshCompanyData = async (req, res) => {
  try {
    const { id } = req.params;
    
    const company = await Company.findById(id);
    
    if (!company) {
      return res.status(404).json({
        error: true,
        message: 'Company not found'
      });
    }
    
    // Update company data from scraping service
    const updatedData = await scrapingService.scrapeCompanyData(company.website);
    await company.updateOne(updatedData);
    
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