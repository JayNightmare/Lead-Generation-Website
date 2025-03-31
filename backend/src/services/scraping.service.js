const puppeteer = require('puppeteer');
const { JobPosting, ContactPerson } = require('../models');

/**
 * Scrape job postings from a company's careers page
 * @param {Object} company - Company model instance
 */
const scrapeJobs = async (company) => {
  if (!company.careersPageUrl) {
    console.error(`No careers page URL for company ${company.name}`);
    return [];
  }

  try {
    console.log(`Scraping jobs for ${company.name} from ${company.careersPageUrl}`);
    
    // Launch browser
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Set viewport
    await page.setViewport({ width: 1366, height: 768 });
    
    // Navigate to careers page
    await page.goto(company.careersPageUrl, { waitUntil: 'networkidle2' });
    
    // Extract job listings (this will vary by site - example implementation)
    const jobs = await page.evaluate(() => {
      // This selector needs to be adjusted for each site
      const jobElements = document.querySelectorAll('.job-listing, .careers-job, .job-item, .job-card');
      
      return Array.from(jobElements).map(job => {
        // These selectors will need to be adjusted per site
        const title = job.querySelector('.job-title, h3, h4')?.innerText.trim();
        const department = job.querySelector('.department, .category')?.innerText.trim();
        const location = job.querySelector('.location')?.innerText.trim();
        const url = job.querySelector('a')?.href;
        
        return {
          title,
          department,
          location,
          url,
          isRemote: location?.toLowerCase().includes('remote'),
        };
      }).filter(job => job.title && job.url); // Filter out any incomplete jobs
    });
    
    await browser.close();
    
    // Save jobs to database
    for (const job of jobs) {
      await JobPosting.findOrCreate({
        where: {
          CompanyId: company.id,
          title: job.title,
          url: job.url
        },
        defaults: {
          ...job,
          description: '',
          postedDate: new Date(),
          isActive: true,
          source: company.careersPageUrl,
          lastScraped: new Date()
        }
      });
    }
    
    console.log(`Scraped ${jobs.length} jobs for ${company.name}`);
    return jobs;
    
  } catch (error) {
    console.error(`Error scraping jobs for ${company.name}:`, error);
    return [];
  }
};

/**
 * Scrape contact persons from a company's LinkedIn page
 * @param {Object} company - Company model instance
 */
const scrapeContacts = async (company) => {
  if (!company.linkedInUrl) {
    console.error(`No LinkedIn URL for company ${company.name}`);
    return [];
  }

  try {
    console.log(`Scraping contacts for ${company.name} from ${company.linkedInUrl}`);
    
    // Launch browser
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Set viewport
    await page.setViewport({ width: 1366, height: 768 });
    
    // Navigate to LinkedIn page
    await page.goto(company.linkedInUrl + '/people', { waitUntil: 'networkidle2' });
    
    // NOTE: LinkedIn typically requires login, so this is a simplified version
    // In a real implementation, you would need to handle login or use an API
    
    // Extract employees (example implementation)
    const contacts = await page.evaluate(() => {
      // This will likely not work on LinkedIn without authentication
      const contactElements = document.querySelectorAll('.org-people-profile-card');
      
      return Array.from(contactElements).map(contact => {
        const fullName = contact.querySelector('.org-people-profile-card__profile-title')?.innerText.trim();
        const title = contact.querySelector('.org-people-profile-card__profile-subtitle')?.innerText.trim();
        const linkedInUrl = contact.querySelector('a')?.href;
        
        return {
          fullName,
          title,
          linkedInUrl,
          isDecisionMaker: title?.toLowerCase().includes('manager') || 
                           title?.toLowerCase().includes('director') || 
                           title?.toLowerCase().includes('head') || 
                           title?.toLowerCase().includes('lead') ||
                           title?.toLowerCase().includes('ceo') ||
                           title?.toLowerCase().includes('cto') ||
                           title?.toLowerCase().includes('coo')
        };
      }).filter(contact => contact.fullName); // Filter out any incomplete contacts
    });
    
    await browser.close();
    
    // Save contacts to database
    for (const contact of contacts) {
      await ContactPerson.findOrCreate({
        where: {
          CompanyId: company.id,
          fullName: contact.fullName
        },
        defaults: {
          ...contact,
          source: 'LinkedIn',
          lastScraped: new Date()
        }
      });
    }
    
    console.log(`Scraped ${contacts.length} contacts for ${company.name}`);
    return contacts;
    
  } catch (error) {
    console.error(`Error scraping contacts for ${company.name}:`, error);
    return [];
  }
};

/**
 * Search for companies using Google or other search engines
 * @param {string} query - Search query
 * @param {number} limit - Maximum number of results
 */
const searchCompanies = async (query, limit = 10) => {
  try {
    console.log(`Searching for companies with query: "${query}"`);
    
    // Launch browser
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Set viewport
    await page.setViewport({ width: 1366, height: 768 });
    
    // Navigate to Google
    await page.goto(`https://www.google.com/search?q=${encodeURIComponent(query)}`, { 
      waitUntil: 'networkidle2' 
    });
    
    // Extract search results
    const results = await page.evaluate(() => {
      const searchResults = document.querySelectorAll('.g');
      
      return Array.from(searchResults).slice(0, 10).map(result => {
        const title = result.querySelector('h3')?.innerText;
        const link = result.querySelector('a')?.href;
        const description = result.querySelector('.VwiC3b')?.innerText || '';
        
        return { title, link, description };
      });
    });
    
    await browser.close();
    
    return results.slice(0, limit);
    
  } catch (error) {
    console.error(`Error searching for companies:`, error);
    return [];
  }
};

module.exports = {
  scrapeJobs,
  scrapeContacts,
  searchCompanies
}; 