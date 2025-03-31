'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useAuth } from '@/components/auth/AuthProvider';

// Types
interface JobPosting {
  id: number;
  title: string;
  department: string;
  location: string;
  postedDate: string;
  description: string;
  url: string;
}

interface Contact {
  id: number;
  name: string;
  title: string;
  department?: string;
  email?: string;
  phone?: string;
  linkedin: string;
  isDecisionMaker: boolean;
}

interface Company {
  id: number;
  name: string;
  logo: string;
  description: string;
  industry: string;
  sector: string;
  size: string;
  founded?: number;
  website: string;
  linkedinUrl: string;
  headquarters: string;
  location: string;
  isHiring: boolean;
  usesRecruitmentAgency: boolean;
  openRoles: number;
  keyContacts: Contact[];
  jobPostings: JobPosting[];
}

// Mock company data
const mockCompanyData: Record<string, Company> = {
  '1': {
    id: 1,
    name: 'TechCorp Solutions',
    logo: 'https://via.placeholder.com/150',
    description: 'TechCorp Solutions is a leading provider of enterprise software solutions, specializing in cloud infrastructure, AI, and machine learning technologies. Founded in 2005, the company has grown to serve over 500 enterprise clients globally.',
    industry: 'Technology',
    sector: 'Software Development',
    size: 'Mid-size',
    founded: 2005,
    website: 'https://www.techcorp-solutions.com',
    linkedinUrl: 'https://www.linkedin.com/company/techcorp-solutions',
    headquarters: 'San Francisco, CA',
    location: 'San Francisco, USA',
    isHiring: true,
    usesRecruitmentAgency: false,
    openRoles: 12,
    keyContacts: [
      { 
        id: 1,
        name: 'Jane Smith', 
        title: 'HR Director', 
        department: 'Human Resources',
        email: 'j.smith@techcorp.com',
        linkedin: 'https://www.linkedin.com/in/janesmith',
        isDecisionMaker: true
      },
      { 
        id: 2,
        name: 'Michael Johnson', 
        title: 'CTO', 
        department: 'Engineering',
        linkedin: 'https://www.linkedin.com/in/michaeljohnson',
        isDecisionMaker: true
      },
      { 
        id: 3,
        name: 'Sarah Williams', 
        title: 'Talent Acquisition Specialist', 
        department: 'Human Resources',
        email: 's.williams@techcorp.com',
        linkedin: 'https://www.linkedin.com/in/sarahwilliams',
        isDecisionMaker: false
      }
    ],
    jobPostings: [
      {
        id: 101,
        title: 'Senior Frontend Developer',
        department: 'Engineering',
        location: 'San Francisco, CA',
        postedDate: '2023-03-15',
        description: 'We are seeking an experienced Frontend Developer with expertise in React and TypeScript to join our growing team.',
        url: 'https://www.techcorp-solutions.com/careers/senior-frontend-developer'
      },
      {
        id: 102,
        title: 'DevOps Engineer',
        department: 'Engineering',
        location: 'Remote',
        postedDate: '2023-03-10',
        description: 'Looking for a skilled DevOps Engineer to help scale our cloud infrastructure.',
        url: 'https://www.techcorp-solutions.com/careers/devops-engineer'
      },
      {
        id: 103,
        title: 'Product Manager',
        department: 'Product',
        location: 'San Francisco, CA',
        postedDate: '2023-03-05',
        description: 'Join our product team to help shape the future of our enterprise software solutions.',
        url: 'https://www.techcorp-solutions.com/careers/product-manager'
      }
    ]
  },
  '2': {
    id: 2,
    name: 'BuildIt Construction',
    logo: 'https://via.placeholder.com/150',
    description: 'BuildIt Construction is a leader in commercial construction, specializing in data centers, healthcare facilities, and corporate campuses. With over 25 years of experience, BuildIt delivers high-quality construction projects nationwide.',
    industry: 'Construction',
    sector: 'Hyperscale Data Center',
    size: 'Enterprise',
    founded: 1995,
    website: 'https://www.buildit-construction.com',
    linkedinUrl: 'https://www.linkedin.com/company/buildit-construction',
    headquarters: 'Dallas, TX',
    location: 'Dallas, USA',
    isHiring: true,
    usesRecruitmentAgency: true,
    openRoles: 8,
    keyContacts: [
      { 
        id: 1,
        name: 'Mike Johnson', 
        title: 'Talent Acquisition Manager', 
        department: 'Human Resources',
        email: 'm.johnson@buildit.com',
        linkedin: 'https://www.linkedin.com/in/mikejohnson',
        isDecisionMaker: true
      },
      { 
        id: 2,
        name: 'Robert Davis', 
        title: 'Director of Operations', 
        department: 'Operations',
        linkedin: 'https://www.linkedin.com/in/robertdavis',
        isDecisionMaker: true
      }
    ],
    jobPostings: [
      {
        id: 201,
        title: 'Project Manager - Data Centers',
        department: 'Project Management',
        location: 'Dallas, TX',
        postedDate: '2023-03-12',
        description: 'Seeking an experienced Project Manager to oversee large-scale data center construction projects.',
        url: 'https://www.buildit-construction.com/careers/project-manager-data-centers'
      },
      {
        id: 202,
        title: 'Structural Engineer',
        department: 'Engineering',
        location: 'Austin, TX',
        postedDate: '2023-03-08',
        description: 'Looking for a qualified Structural Engineer to join our growing team in Austin.',
        url: 'https://www.buildit-construction.com/careers/structural-engineer'
      }
    ]
  }
};

export default function CompanyDetailPage() {
  const { id } = useParams();
  const companyId = Array.isArray(id) ? id[0] : id;
  const { user, loading } = useAuth();
  const router = useRouter();
  const [company, setCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [noteText, setNoteText] = useState('');

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Fetch company data
  useEffect(() => {
    if (!companyId) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const companyData = mockCompanyData[companyId];
      if (companyData) {
        setCompany(companyData);
      }
      setIsLoading(false);
    }, 800);
  }, [companyId]);

  const handleSaveLead = () => {
    if (!company) return;
    
    // Here you would call your API to save this company as a lead
    alert(`Company "${company.name}" saved to your leads!`);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!noteText.trim()) return;
    
    // Here you would call your API to add a note
    alert('Note added successfully!');
    setNoteText('');
  };

  // If still loading or user not authenticated
  if (loading || !user) {
    return <div>Loading...</div>;
  }

  // If company not found
  if (!isLoading && !company) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="card bg-white p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Company Not Found</h2>
            <p className="text-gray-600 mb-6">The company you're looking for doesn't exist or has been removed.</p>
            <Link href="/search" className="btn-primary">
              Back to Search
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : company && (
          <>
            {/* Company Header */}
            <div className="card bg-white mb-6 overflow-hidden">
              <div className="flex flex-col md:flex-row p-6">
                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                  <img 
                    src={company.logo} 
                    alt={company.name} 
                    className="w-24 h-24 object-contain border border-gray-200 rounded-lg"
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900 mb-1">{company.name}</h1>
                      <p className="text-gray-600 mb-2">{company.location}</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800">
                          {company.industry}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800">
                          {company.sector}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800">
                          {company.size}
                        </span>
                        {company.isHiring && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
                            Hiring ({company.openRoles} roles)
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex gap-2">
                      <button 
                        onClick={handleSaveLead}
                        className="btn-primary"
                      >
                        Save as Lead
                      </button>
                      <a 
                        href={company.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-secondary"
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="border-t border-gray-200">
                <nav className="flex overflow-x-auto">
                  <button
                    className={`px-4 py-3 text-sm font-medium ${
                      activeTab === 'overview'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab('overview')}
                  >
                    Overview
                  </button>
                  <button
                    className={`px-4 py-3 text-sm font-medium ${
                      activeTab === 'contacts'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab('contacts')}
                  >
                    Key Contacts
                  </button>
                  <button
                    className={`px-4 py-3 text-sm font-medium ${
                      activeTab === 'jobs'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab('jobs')}
                  >
                    Job Openings
                  </button>
                  <button
                    className={`px-4 py-3 text-sm font-medium ${
                      activeTab === 'notes'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab('notes')}
                  >
                    Notes
                  </button>
                </nav>
              </div>
            </div>

            {/* Tab Content */}
            <div className="card bg-white p-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">About {company.name}</h2>
                  <p className="text-gray-700 mb-6">{company.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Company Details</h3>
                      <dl className="grid grid-cols-1 gap-y-3">
                        <div className="grid grid-cols-3">
                          <dt className="text-sm font-medium text-gray-500">Founded</dt>
                          <dd className="text-sm text-gray-900 col-span-2">{company.founded || 'N/A'}</dd>
                        </div>
                        <div className="grid grid-cols-3">
                          <dt className="text-sm font-medium text-gray-500">Headquarters</dt>
                          <dd className="text-sm text-gray-900 col-span-2">{company.headquarters}</dd>
                        </div>
                        <div className="grid grid-cols-3">
                          <dt className="text-sm font-medium text-gray-500">Industry</dt>
                          <dd className="text-sm text-gray-900 col-span-2">{company.industry}</dd>
                        </div>
                        <div className="grid grid-cols-3">
                          <dt className="text-sm font-medium text-gray-500">Sector</dt>
                          <dd className="text-sm text-gray-900 col-span-2">{company.sector}</dd>
                        </div>
                        <div className="grid grid-cols-3">
                          <dt className="text-sm font-medium text-gray-500">Company Size</dt>
                          <dd className="text-sm text-gray-900 col-span-2">{company.size}</dd>
                        </div>
                      </dl>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Recruitment Details</h3>
                      <dl className="grid grid-cols-1 gap-y-3">
                        <div className="grid grid-cols-3">
                          <dt className="text-sm font-medium text-gray-500">Hiring Status</dt>
                          <dd className="text-sm text-gray-900 col-span-2">
                            {company.isHiring ? (
                              <span className="text-green-600 font-medium">
                                Actively Hiring ({company.openRoles} open positions)
                              </span>
                            ) : (
                              <span className="text-gray-600">Not actively hiring</span>
                            )}
                          </dd>
                        </div>
                        <div className="grid grid-cols-3">
                          <dt className="text-sm font-medium text-gray-500">Uses Agencies</dt>
                          <dd className="text-sm text-gray-900 col-span-2">
                            {company.usesRecruitmentAgency ? 'Yes' : 'No / Unknown'}
                          </dd>
                        </div>
                        <div className="grid grid-cols-3">
                          <dt className="text-sm font-medium text-gray-500">Key Contacts</dt>
                          <dd className="text-sm text-gray-900 col-span-2">
                            {company.keyContacts.length} contacts available
                          </dd>
                        </div>
                        <div className="grid grid-cols-3">
                          <dt className="text-sm font-medium text-gray-500">Decision Makers</dt>
                          <dd className="text-sm text-gray-900 col-span-2">
                            {company.keyContacts.filter(c => c.isDecisionMaker).length} identified
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <a 
                      href={company.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>
                      Company Website
                    </a>
                    <a 
                      href={company.linkedinUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19.7 3H4.3C3.582 3 3 3.582 3 4.3v15.4c0 .718.582 1.3 1.3 1.3h15.4c.718 0 1.3-.582 1.3-1.3V4.3c0-.718-.582-1.3-1.3-1.3zM8.339 18.338H5.667v-8.59h2.672v8.59zM7.004 8.574a1.548 1.548 0 11-.002-3.096 1.548 1.548 0 01.002 3.096zm11.335 9.764H15.67v-4.177c0-.996-.017-2.278-1.387-2.278-1.389 0-1.601 1.086-1.601 2.206v4.249h-2.667v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.779 3.203 4.092v4.711z" /></svg>
                      LinkedIn
                    </a>
                  </div>
                </div>
              )}
              
              {/* Contacts Tab */}
              {activeTab === 'contacts' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Key Contacts at {company.name}</h2>
                  <div className="overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Title
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Department
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Contact
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Decision Maker
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {company.keyContacts.map((contact) => (
                            <tr key={contact.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{contact.title}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{contact.department || 'N/A'}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex space-x-2">
                                  {contact.email && (
                                    <a href={`mailto:${contact.email}`} className="text-blue-600 hover:text-blue-900">
                                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                                    </a>
                                  )}
                                  {contact.linkedin && (
                                    <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-900">
                                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19.7 3H4.3C3.582 3 3 3.582 3 4.3v15.4c0 .718.582 1.3 1.3 1.3h15.4c.718 0 1.3-.582 1.3-1.3V4.3c0-.718-.582-1.3-1.3-1.3zM8.339 18.338H5.667v-8.59h2.672v8.59zM7.004 8.574a1.548 1.548 0 11-.002-3.096 1.548 1.548 0 01.002 3.096zm11.335 9.764H15.67v-4.177c0-.996-.017-2.278-1.387-2.278-1.389 0-1.601 1.086-1.601 2.206v4.249h-2.667v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.779 3.203 4.092v4.711z" /></svg>
                                    </a>
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {contact.isDecisionMaker ? (
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Yes
                                  </span>
                                ) : (
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                    No
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Jobs Tab */}
              {activeTab === 'jobs' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Job Openings at {company.name}</h2>
                    {company.jobPostings.length > 0 && (
                      <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                        {company.jobPostings.length} open positions
                      </span>
                    )}
                  </div>
                  
                  {company.jobPostings.length === 0 ? (
                    <div className="text-center py-10 border border-gray-200 rounded-lg">
                      <p className="text-gray-500">No job openings found.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {company.jobPostings.map((job) => (
                        <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                          <div className="flex justify-between">
                            <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
                            <span className="text-sm text-gray-500">
                              Posted: {new Date(job.postedDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="mt-2 flex space-x-4">
                            <span className="text-sm text-gray-600">{job.department}</span>
                            <span className="text-sm text-gray-600">{job.location}</span>
                          </div>
                          <p className="mt-2 text-sm text-gray-600 line-clamp-2">{job.description}</p>
                          <div className="mt-4">
                            <a 
                              href={job.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              View Job Posting
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {/* Notes Tab */}
              {activeTab === 'notes' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Notes</h2>
                  
                  <form onSubmit={handleAddNote} className="mb-6">
                    <div className="mb-3">
                      <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
                        Add a Note
                      </label>
                      <textarea
                        id="note"
                        rows={3}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Add details about this company, key contacts, or follow-up information..."
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="btn-primary"
                        disabled={!noteText.trim()}
                      >
                        Add Note
                      </button>
                    </div>
                  </form>
                  
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-gray-500">No notes yet. Add your first note above.</p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
} 