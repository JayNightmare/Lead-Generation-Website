'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useAuth } from '@/components/auth/AuthProvider';

// Types for the dashboard data
interface DashboardStats {
  totalLeads: number;
  activeLeads: number;
  newLeadsThisMonth: number;
  closedDealsThisMonth: number;
  pendingMeetings: number;
  pendingFollowUps: number;
}

interface Contact {
  id: number;
  name: string;
  title: string;
  department?: string;
  email?: string;
}

interface RecentLead {
  id: number;
  companyId: number;
  companyName: string;
  logo: string;
  industry: string;
  status: string;
  addedAt: string;
}

interface UpcomingActivity {
  id: number;
  type: 'Meeting' | 'Follow-up' | 'Proposal Deadline';
  companyName: string;
  companyId: number;
  contactName?: string;
  date: string;
  notes?: string;
}

// Mock data
const mockStats: DashboardStats = {
  totalLeads: 47,
  activeLeads: 23,
  newLeadsThisMonth: 12,
  closedDealsThisMonth: 4,
  pendingMeetings: 5,
  pendingFollowUps: 8
};

const mockRecentLeads: RecentLead[] = [
  {
    id: 1,
    companyId: 1,
    companyName: 'TechCorp Solutions',
    logo: 'https://via.placeholder.com/150',
    industry: 'Technology',
    status: 'Contacted',
    addedAt: '2023-03-15'
  },
  {
    id: 2,
    companyId: 2,
    companyName: 'BuildIt Construction',
    logo: 'https://via.placeholder.com/150',
    industry: 'Construction',
    status: 'New',
    addedAt: '2023-03-17'
  },
  {
    id: 3,
    companyId: 3,
    companyName: 'FinanceFlow',
    logo: 'https://via.placeholder.com/150',
    industry: 'Finance',
    status: 'Meeting Scheduled',
    addedAt: '2023-03-10'
  }
];

const mockUpcomingActivities: UpcomingActivity[] = [
  {
    id: 1,
    type: 'Meeting',
    companyName: 'FinanceFlow',
    companyId: 3,
    contactName: 'Michael Brown',
    date: '2023-03-22T14:00:00',
    notes: 'Discuss their recruitment needs for Q2'
  },
  {
    id: 2,
    type: 'Follow-up',
    companyName: 'TechCorp Solutions',
    companyId: 1,
    contactName: 'Jane Smith',
    date: '2023-03-25T10:00:00',
    notes: 'Follow up on our initial proposal'
  },
  {
    id: 3,
    type: 'Proposal Deadline',
    companyName: 'HealthPlus',
    companyId: 4,
    date: '2023-03-20T23:59:59',
    notes: 'Submit final proposal for their 15 open positions'
  },
  {
    id: 4,
    type: 'Follow-up',
    companyName: 'BuildIt Construction',
    companyId: 2,
    date: '2023-03-24T15:30:00'
  }
];

// Status colors for badges
const statusColors: Record<string, string> = {
  'New': 'bg-blue-100 text-blue-800',
  'Contacted': 'bg-yellow-100 text-yellow-800',
  'Meeting Scheduled': 'bg-purple-100 text-purple-800',
  'Proposal Sent': 'bg-indigo-100 text-indigo-800',
  'Negotiating': 'bg-orange-100 text-orange-800',
  'Closed Won': 'bg-green-100 text-green-800',
  'Closed Lost': 'bg-red-100 text-red-800'
};

// Activity type colors
const activityColors: Record<string, string> = {
  'Meeting': 'bg-purple-100 text-purple-800',
  'Follow-up': 'bg-blue-100 text-blue-800',
  'Proposal Deadline': 'bg-red-100 text-red-800'
};

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentLeads, setRecentLeads] = useState<RecentLead[]>([]);
  const [upcomingActivities, setUpcomingActivities] = useState<UpcomingActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Format date string to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Fetch dashboard data
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setStats(mockStats);
      setRecentLeads(mockRecentLeads);

      // Sort upcoming activities by date
      const sortedActivities = [...mockUpcomingActivities].sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      setUpcomingActivities(sortedActivities);
      
      setIsLoading(false);
    }, 800);
  }, []);

  // If still loading or user not authenticated
  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.displayName || user.email}</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            {stats && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="card bg-white p-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Total Leads</h3>
                  <div className="flex items-baseline">
                    <p className="text-3xl font-bold text-gray-900">{stats.totalLeads}</p>
                    <p className="ml-2 text-sm text-gray-600">leads in database</p>
                  </div>
                  <div className="mt-4">
                    <Link 
                      href="/leads" 
                      className="text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      View all leads →
                    </Link>
                  </div>
                </div>

                <div className="card bg-white p-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Active Leads</h3>
                  <div className="flex items-baseline">
                    <p className="text-3xl font-bold text-gray-900">{stats.activeLeads}</p>
                    <p className="ml-2 text-sm text-gray-600">in progress</p>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="text-center">
                      <span className="block text-lg font-bold text-blue-600">{stats.newLeadsThisMonth}</span>
                      <span className="text-xs text-gray-500">New this month</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-lg font-bold text-green-600">{stats.closedDealsThisMonth}</span>
                      <span className="text-xs text-gray-500">Closed this month</span>
                    </div>
                  </div>
                </div>

                <div className="card bg-white p-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Pending Activities</h3>
                  <div className="flex items-baseline">
                    <p className="text-3xl font-bold text-gray-900">{stats.pendingMeetings + stats.pendingFollowUps}</p>
                    <p className="ml-2 text-sm text-gray-600">upcoming tasks</p>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="text-center">
                      <span className="block text-lg font-bold text-purple-600">{stats.pendingMeetings}</span>
                      <span className="text-xs text-gray-500">Meetings</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-lg font-bold text-blue-600">{stats.pendingFollowUps}</span>
                      <span className="text-xs text-gray-500">Follow-ups</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Leads */}
              <div className="lg:col-span-1">
                <div className="card bg-white overflow-hidden">
                  <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-medium text-gray-900">Recent Leads</h2>
                    <Link 
                      href="/leads" 
                      className="text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      View all
                    </Link>
                  </div>
                  <div className="p-2">
                    {recentLeads.length === 0 ? (
                      <div className="text-center py-6">
                        <p className="text-gray-500">No leads found.</p>
                        <Link 
                          href="/search" 
                          className="mt-2 inline-block text-sm font-medium text-blue-600 hover:text-blue-800"
                        >
                          Find new leads
                        </Link>
                      </div>
                    ) : (
                      <ul>
                        {recentLeads.map((lead) => (
                          <li key={lead.id} className="p-2 hover:bg-gray-50 rounded-lg">
                            <Link href={`/companies/${lead.companyId}`}>
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <img 
                                    className="h-10 w-10 rounded-md object-contain bg-gray-50" 
                                    src={lead.logo} 
                                    alt={lead.companyName} 
                                  />
                                </div>
                                <div className="ml-3 flex-1">
                                  <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-900">{lead.companyName}</p>
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[lead.status]}`}>
                                      {lead.status}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between mt-1">
                                    <p className="text-xs text-gray-500">{lead.industry}</p>
                                    <p className="text-xs text-gray-500">
                                      Added {new Date(lead.addedAt).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              {/* Upcoming Activities */}
              <div className="lg:col-span-2">
                <div className="card bg-white overflow-hidden">
                  <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-medium text-gray-900">Upcoming Activities</h2>
                    <button
                      className="text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      Add activity
                    </button>
                  </div>
                  <div className="p-2">
                    {upcomingActivities.length === 0 ? (
                      <div className="text-center py-6">
                        <p className="text-gray-500">No upcoming activities.</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {upcomingActivities.map((activity) => (
                          <div key={activity.id} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                            <div className="flex items-start">
                              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-md bg-blue-50 text-blue-600">
                                {activity.type === 'Meeting' ? (
                                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                  </svg>
                                ) : activity.type === 'Follow-up' ? (
                                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                  </svg>
                                ) : (
                                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                )}
                              </div>
                              <div className="ml-4 flex-1">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${activityColors[activity.type]}`}>
                                      {activity.type}
                                    </span>
                                    <Link 
                                      href={`/companies/${activity.companyId}`}
                                      className="ml-2 text-sm font-medium text-gray-900 hover:text-blue-600"
                                    >
                                      {activity.companyName}
                                    </Link>
                                  </div>
                                  <p className="text-sm text-gray-500">
                                    {formatDate(activity.date)}
                                  </p>
                                </div>
                                
                                {activity.contactName && (
                                  <p className="mt-1 text-sm text-gray-600">
                                    Contact: {activity.contactName}
                                  </p>
                                )}
                                
                                {activity.notes && (
                                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                                    {activity.notes}
                                  </p>
                                )}
                                
                                <div className="mt-2 flex space-x-2">
                                  <button className="text-xs font-medium text-blue-600 hover:text-blue-800">
                                    Complete
                                  </button>
                                  <button className="text-xs font-medium text-gray-600 hover:text-gray-800">
                                    Reschedule
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
} 