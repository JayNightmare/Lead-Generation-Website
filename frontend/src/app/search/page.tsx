'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useAuth } from '@/components/auth/AuthProvider';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Company type definition
interface Contact {
  name: string;
  title: string;
  linkedin: string;
}

interface Company {
  id: number;
  name: string;
  logo: string;
  industry: string;
  sector: string;
  size: string;
  location: string;
  isHiring: boolean;
  openRoles: number;
  usesRecruitmentAgency: boolean;
  keyContacts: Contact[];
}

// Mock data for industries and sectors
const industryOptions = [
  { label: 'Technology', value: 'technology' },
  { label: 'Healthcare', value: 'healthcare' },
  { label: 'Construction', value: 'construction' },
  { label: 'Finance', value: 'finance' },
  { label: 'Manufacturing', value: 'manufacturing' },
  { label: 'Retail', value: 'retail' },
  { label: 'Education', value: 'education' },
  { label: 'Hospitality', value: 'hospitality' },
];

const sectorOptions = [
  { label: 'Hyperscale Data Center', value: 'data-center' },
  { label: 'eCommerce Digital Agency', value: 'ecommerce-agency' },
  { label: 'Software Development', value: 'software-development' },
  { label: 'IT Consulting', value: 'it-consulting' },
  { label: 'Healthcare Technology', value: 'healthcare-tech' },
  { label: 'Financial Technology', value: 'fintech' },
  { label: 'Renewable Energy', value: 'renewable-energy' },
];

const countriesOptions = [
  { label: 'United States', value: 'usa' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Canada', value: 'canada' },
  { label: 'Australia', value: 'australia' },
  { label: 'Germany', value: 'germany' },
  { label: 'France', value: 'france' },
];

const companySizeOptions = [
  { label: 'Startup (1-50)', value: 'Startup' },
  { label: 'SMB (51-200)', value: 'SMB' },
  { label: 'Mid-size (201-1000)', value: 'Mid-size' },
  { label: 'Enterprise (1000+)', value: 'Enterprise' },
];

// Mock data for search results
const mockSearchResults: Company[] = [
  {
    id: 1,
    name: 'TechCorp Solutions',
    logo: 'https://via.placeholder.com/50',
    industry: 'Technology',
    sector: 'Software Development',
    size: 'Mid-size',
    location: 'San Francisco, USA',
    isHiring: true,
    openRoles: 12,
    usesRecruitmentAgency: false,
    keyContacts: [
      { name: 'Jane Smith', title: 'HR Director', linkedin: '#' }
    ]
  },
  {
    id: 2,
    name: 'BuildIt Construction',
    logo: 'https://via.placeholder.com/50',
    industry: 'Construction',
    sector: 'Hyperscale Data Center',
    size: 'Enterprise',
    location: 'Dallas, USA',
    isHiring: true,
    openRoles: 8,
    usesRecruitmentAgency: true,
    keyContacts: [
      { name: 'Mike Johnson', title: 'Talent Acquisition Manager', linkedin: '#' }
    ]
  },
  {
    id: 3,
    name: 'Creative Designs',
    logo: 'https://via.placeholder.com/50',
    industry: 'Technology',
    sector: 'eCommerce Digital Agency',
    size: 'SMB',
    location: 'New York, USA',
    isHiring: true,
    openRoles: 5,
    usesRecruitmentAgency: false,
    keyContacts: [
      { name: 'Sarah Williams', title: 'CEO', linkedin: '#' },
      { name: 'David Lee', title: 'CTO', linkedin: '#' }
    ]
  },
  {
    id: 4,
    name: 'Quantum Ventures',
    logo: 'https://via.placeholder.com/50',
    industry: 'Finance',
    sector: 'Financial Technology',
    size: 'Mid-size',
    location: 'Boston, USA',
    isHiring: false,
    openRoles: 0,
    usesRecruitmentAgency: true,
    keyContacts: [
      { name: 'Robert Chen', title: 'Head of Talent', linkedin: '#' }
    ]
  },
  {
    id: 5,
    name: 'HealthPlus Systems',
    logo: 'https://via.placeholder.com/50',
    industry: 'Healthcare',
    sector: 'Healthcare Technology',
    size: 'Enterprise',
    location: 'Chicago, USA',
    isHiring: true,
    openRoles: 15,
    usesRecruitmentAgency: false,
    keyContacts: [
      { name: 'Lisa Johnson', title: 'HR Director', linkedin: '#' }
    ]
  },
];

export default function SearchPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [industry, setIndustry] = useState('');
  const [sector, setSector] = useState('');
  const [country, setCountry] = useState('usa');
  const [companySize, setCompanySize] = useState('');
  const [hiringFilter, setHiringFilter] = useState(true);
  const [searchResults, setSearchResults] = useState<Company[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Filter mock data based on search criteria
      let results = [...mockSearchResults];
      
      if (searchTerm) {
        results = results.filter(company => 
          company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
          company.sector.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      if (industry) {
        results = results.filter(company => 
          company.industry.toLowerCase() === industry.toLowerCase()
        );
      }
      
      if (sector) {
        results = results.filter(company => 
          company.sector.toLowerCase().includes(sector.toLowerCase())
        );
      }
      
      if (companySize) {
        results = results.filter(company => company.size === companySize);
      }
      
      if (hiringFilter) {
        results = results.filter(company => company.isHiring);
      }
      
      setSearchResults(results);
      setIsSearching(false);
    }, 800);
  };

  const handleSaveLead = (companyId: number) => {
    // Here you would typically make an API call to save this company as a lead
    console.log(`Saving company ${companyId} as a lead`);
    alert(`Company saved to your leads!`);
  };

  // If still loading or user not authenticated
  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout>
      <div className="px-4 py-6">
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Find Companies</h1>
          <p className="text-gray-600">
            Search for companies that match your recruitment specialties
          </p>
        </header>

        {/* Search Form */}
        <div className="card bg-white mb-8 p-6">
          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                  Search
                </label>
                <input
                  type="text"
                  id="search"
                  placeholder="Company name, industry, etc."
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                  Industry
                </label>
                <select
                  id="industry"
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                >
                  <option value="">All Industries</option>
                  {industryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="sector" className="block text-sm font-medium text-gray-700 mb-1">
                  Sector
                </label>
                <select
                  id="sector"
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                >
                  <option value="">All Sectors</option>
                  {sectorOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <select
                  id="country"
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  {countriesOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
                  Company Size
                </label>
                <select
                  id="size"
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={companySize}
                  onChange={(e) => setCompanySize(e.target.value)}
                >
                  <option value="">All Sizes</option>
                  {companySizeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-5 w-5"
                    checked={hiringFilter}
                    onChange={(e) => setHiringFilter(e.target.checked)}
                  />
                  <span className="ml-2 text-sm text-gray-700">Currently hiring</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="btn-primary"
                disabled={isSearching}
              >
                {isSearching ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </span>
                ) : (
                  'Search Companies'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Search Results */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Results</h2>
          
          {searchResults.length === 0 ? (
            <div className="card bg-white p-8 text-center">
              <p className="text-gray-500 mb-4">
                {isSearching 
                  ? 'Searching for companies...' 
                  : 'Use the search form above to find companies'}
              </p>
              {!isSearching && (
                <button
                  onClick={handleSearch}
                  className="btn-secondary"
                >
                  Show All Companies
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {searchResults.map((company) => (
                <div key={company.id} className="card bg-white overflow-hidden">
                  <div className="p-4 border-b">
                    <div className="flex items-center">
                      <img 
                        src={company.logo} 
                        alt={company.name} 
                        className="w-12 h-12 rounded mr-3"
                      />
                      <div>
                        <h3 className="font-semibold text-lg">{company.name}</h3>
                        <p className="text-sm text-gray-600">{company.location}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500">Industry</p>
                        <p>{company.industry}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Sector</p>
                        <p>{company.sector}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Size</p>
                        <p>{company.size}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Hiring Status</p>
                        <p>
                          {company.isHiring ? (
                            <span className="text-green-600 font-medium">
                              Hiring ({company.openRoles} roles)
                            </span>
                          ) : (
                            <span className="text-gray-500">Not actively hiring</span>
                          )}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-1">Key Contacts</p>
                      <ul className="text-sm">
                        {company.keyContacts.map((contact, index) => (
                          <li key={index} className="mb-1">
                            <span className="font-medium">{contact.name}</span>
                            <span className="text-gray-600"> • {contact.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Link 
                        href={`/companies/${company.id}`}
                        className="btn-secondary text-sm py-1 px-3"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={() => handleSaveLead(company.id)}
                        className="btn-primary text-sm py-1 px-3"
                      >
                        Save Lead
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
} 