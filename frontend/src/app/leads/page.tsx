'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useAuth } from '@/components/auth/AuthProvider';

// Types
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

interface Lead {
  id: number;
  companyId: number;
  companyName: string;
  logo: string;
  industry: string;
  sector: string;
  location: string;
  website: string;
  status: 'New' | 'Contacted' | 'Meeting Scheduled' | 'Proposal Sent' | 'Negotiating' | 'Closed Won' | 'Closed Lost';
  priority: 'High' | 'Medium' | 'Low';
  notes?: string;
  isHiring: boolean;
  keyContact?: Contact;
  addedAt: string;
  lastContactedAt?: string;
  nextFollowUpDate?: string;
}

// Mock leads data
const mockLeads: Lead[] = [
  {
    id: 1,
    companyId: 1,
    companyName: 'TechCorp Solutions',
    logo: 'https://via.placeholder.com/150',
    industry: 'Technology',
    sector: 'Software Development',
    location: 'San Francisco, USA',
    website: 'https://www.techcorp-solutions.com',
    status: 'Contacted',
    priority: 'High',
    notes: 'Initial contact made with HR Director. They are expanding their engineering team.',
    isHiring: true,
    keyContact: {
      id: 1,
      name: 'Jane Smith',
      title: 'HR Director',
      department: 'Human Resources',
      email: 'j.smith@techcorp.com',
      linkedin: 'https://www.linkedin.com/in/janesmith',
      isDecisionMaker: true
    },
    addedAt: '2023-03-15',
    lastContactedAt: '2023-03-18',
    nextFollowUpDate: '2023-03-25'
  },
  {
    id: 2,
    companyId: 2,
    companyName: 'BuildIt Construction',
    logo: 'https://via.placeholder.com/150',
    industry: 'Construction',
    sector: 'Hyperscale Data Center',
    location: 'Dallas, USA',
    website: 'https://www.buildit-construction.com',
    status: 'New',
    priority: 'Medium',
    isHiring: true,
    addedAt: '2023-03-17'
  },
  {
    id: 3,
    companyId: 3,
    companyName: 'FinanceFlow',
    logo: 'https://via.placeholder.com/150',
    industry: 'Finance',
    sector: 'Banking',
    location: 'New York, USA',
    website: 'https://www.financeflow.com',
    status: 'Meeting Scheduled',
    priority: 'High',
    notes: 'Meeting scheduled with Talent Acquisition Manager to discuss their current recruitment needs.',
    isHiring: true,
    keyContact: {
      id: 3,
      name: 'Michael Brown',
      title: 'Talent Acquisition Manager',
      department: 'Human Resources',
      email: 'm.brown@financeflow.com',
      linkedin: 'https://www.linkedin.com/in/michaelbrown',
      isDecisionMaker: true
    },
    addedAt: '2023-03-10',
    lastContactedAt: '2023-03-16',
    nextFollowUpDate: '2023-03-22'
  },
  {
    id: 4,
    companyId: 4,
    companyName: 'HealthPlus',
    logo: 'https://via.placeholder.com/150',
    industry: 'Healthcare',
    sector: 'Medical Services',
    location: 'Boston, USA',
    website: 'https://www.healthplus.com',
    status: 'Proposal Sent',
    priority: 'High',
    notes: 'Proposal sent for recruiting services. They need to fill 15 positions over the next quarter.',
    isHiring: true,
    keyContact: {
      id: 4,
      name: 'Sarah Johnson',
      title: 'Director of HR',
      department: 'Human Resources',
      email: 's.johnson@healthplus.com',
      linkedin: 'https://www.linkedin.com/in/sarahjohnson',
      isDecisionMaker: true
    },
    addedAt: '2023-03-05',
    lastContactedAt: '2023-03-15',
    nextFollowUpDate: '2023-03-20'
  },
  {
    id: 5,
    companyId: 5,
    companyName: 'EcoEnergy',
    logo: 'https://via.placeholder.com/150',
    industry: 'Energy',
    sector: 'Renewable Energy',
    location: 'Portland, USA',
    website: 'https://www.ecoenergy.com',
    status: 'Closed Won',
    priority: 'Medium',
    notes: 'Successfully closed a deal for 3-month recruitment services.',
    isHiring: false,
    keyContact: {
      id: 5,
      name: 'David Wilson',
      title: 'Recruitment Lead',
      department: 'Human Resources',
      email: 'd.wilson@ecoenergy.com',
      linkedin: 'https://www.linkedin.com/in/davidwilson',
      isDecisionMaker: false
    },
    addedAt: '2023-02-20',
    lastContactedAt: '2023-03-10'
  }
];

// Status colors
const statusColors: Record<string, string> = {
  'New': 'bg-blue-100 text-blue-800',
  'Contacted': 'bg-yellow-100 text-yellow-800',
  'Meeting Scheduled': 'bg-purple-100 text-purple-800',
  'Proposal Sent': 'bg-indigo-100 text-indigo-800',
  'Negotiating': 'bg-orange-100 text-orange-800',
  'Closed Won': 'bg-green-100 text-green-800',
  'Closed Lost': 'bg-red-100 text-red-800'
};

// Priority colors
const priorityColors: Record<string, string> = {
  'High': 'bg-red-100 text-red-800',
  'Medium': 'bg-yellow-100 text-yellow-800',
  'Low': 'bg-green-100 text-green-800'
};

export default function LeadsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [industryFilter, setIndustryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Available filters
  const statuses = ['All', 'New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Negotiating', 'Closed Won', 'Closed Lost'];
  const priorities = ['All', 'High', 'Medium', 'Low'];
  const industries = ['All', 'Technology', 'Construction', 'Finance', 'Healthcare', 'Energy'];

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Fetch leads data
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLeads(mockLeads);
      setFilteredLeads(mockLeads);
      setIsLoading(false);
    }, 800);
  }, []);

  // Apply filters when filter states change
  useEffect(() => {
    if (leads.length === 0) return;

    let result = [...leads];

    // Apply status filter
    if (statusFilter !== 'All') {
      result = result.filter(lead => lead.status === statusFilter);
    }

    // Apply priority filter
    if (priorityFilter !== 'All') {
      result = result.filter(lead => lead.priority === priorityFilter);
    }

    // Apply industry filter
    if (industryFilter !== 'All') {
      result = result.filter(lead => lead.industry === industryFilter);
    }

    // Apply search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(lead => 
        lead.companyName.toLowerCase().includes(query) ||
        lead.location.toLowerCase().includes(query) ||
        lead.keyContact?.name.toLowerCase().includes(query) ||
        lead.notes?.toLowerCase().includes(query)
      );
    }

    setFilteredLeads(result);
  }, [leads, statusFilter, priorityFilter, industryFilter, searchQuery]);

  const handleUpdateStatus = (leadId: number, newStatus: Lead['status']) => {
    // In a real application, this would be an API call
    const updatedLeads = leads.map(lead => 
      lead.id === leadId ? { ...lead, status: newStatus, lastContactedAt: new Date().toISOString().split('T')[0] } : lead
    );
    
    setLeads(updatedLeads);
  };

  const handleUpdatePriority = (leadId: number, newPriority: Lead['priority']) => {
    // In a real application, this would be an API call
    const updatedLeads = leads.map(lead => 
      lead.id === leadId ? { ...lead, priority: newPriority } : lead
    );
    
    setLeads(updatedLeads);
  };

  const handleDeleteLead = (leadId: number) => {
    // In a real application, this would be an API call
    if (confirm('Are you sure you want to delete this lead?')) {
      const updatedLeads = leads.filter(lead => lead.id !== leadId);
      setLeads(updatedLeads);
    }
  };

  // If still loading or user not authenticated
  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold text-gray-900 mb-3 md:mb-0">My Leads</h1>
          <Link href="/search" className="btn-primary">
            Find New Leads
          </Link>
        </div>

        {/* Filters */}
        <div className="card bg-white p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                type="text"
                id="search"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Search by company, location, contact..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                id="priority"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                {priorities.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                Industry
              </label>
              <select
                id="industry"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
              >
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Leads List */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="card bg-white p-10 text-center">
            <p className="text-gray-500 mb-4">No leads match your current filters.</p>
            <button 
              onClick={() => {
                setStatusFilter('All');
                setPriorityFilter('All');
                setIndustryFilter('All');
                setSearchQuery('');
              }}
              className="btn-secondary"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 bg-white">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Industry
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Key Contact
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Contacted
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-md object-contain bg-gray-50" src={lead.logo} alt={lead.companyName} />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">
                              <Link 
                                href={`/companies/${lead.companyId}`}
                                className="hover:text-blue-600"
                              >
                                {lead.companyName}
                              </Link>
                            </div>
                            <div className="text-sm text-gray-500">{lead.location}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{lead.industry}</div>
                        <div className="text-sm text-gray-500">{lead.sector}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {lead.keyContact ? (
                          <div>
                            <div className="text-sm font-medium text-gray-900">{lead.keyContact.name}</div>
                            <div className="text-sm text-gray-500">{lead.keyContact.title}</div>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">No contact yet</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="relative">
                          <select
                            className={`text-xs inline-flex font-semibold rounded-full px-2 py-1 leading-5 ${statusColors[lead.status]} cursor-pointer border-0 bg-opacity-50`}
                            value={lead.status}
                            onChange={(e) => handleUpdateStatus(lead.id, e.target.value as Lead['status'])}
                          >
                            {statuses.filter(s => s !== 'All').map(status => (
                              <option key={status} value={status}>{status}</option>
                            ))}
                          </select>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="relative">
                          <select
                            className={`text-xs inline-flex font-semibold rounded-full px-2 py-1 leading-5 ${priorityColors[lead.priority]} cursor-pointer border-0 bg-opacity-50`}
                            value={lead.priority}
                            onChange={(e) => handleUpdatePriority(lead.id, e.target.value as Lead['priority'])}
                          >
                            {priorities.filter(p => p !== 'All').map(priority => (
                              <option key={priority} value={priority}>{priority}</option>
                            ))}
                          </select>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {lead.lastContactedAt ? (
                          <div className="text-sm text-gray-900">{new Date(lead.lastContactedAt).toLocaleDateString()}</div>
                        ) : (
                          <span className="text-sm text-gray-500">Not contacted yet</span>
                        )}
                        {lead.nextFollowUpDate && (
                          <div className="text-xs text-gray-500">
                            Follow-up: {new Date(lead.nextFollowUpDate).toLocaleDateString()}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-3">
                          <Link 
                            href={`/companies/${lead.companyId}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </Link>
                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 