import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guides - RecruitLeads',
  description: 'Learn how to use RecruitLeads effectively with our comprehensive guides and tutorials.',
};

export default function GuidesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white relative overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute rounded-full bg-white w-64 h-64 -top-20 -left-20 opacity-10"></div>
          <div className="absolute rounded-full bg-white w-96 h-96 top-40 -right-20 opacity-10"></div>
          <div className="absolute rounded-full bg-white w-80 h-80 -bottom-40 left-1/4 opacity-5"></div>
        </div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Learn <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">RecruitLeads</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Comprehensive guides and tutorials to help you master our lead generation platform.
            </p>
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search guides..."
                className="w-full px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-16 sm:h-24" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,140.83,94.17,208.24,82.16,284.65,68.67,354.91,68,421.39,56.44Z" 
                  fill="#FFFFFF"></path>
          </svg>
        </div>
      </section>

      {/* Getting Started Guide */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Getting Started Guide</h2>
            <div className="space-y-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                    1
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Create Your Account</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Sign up for a RecruitLeads account and complete your profile. This will help us personalize your experience and provide relevant leads.
                </p>
                <Link 
                  href="/signup" 
                  className="text-blue-600 font-semibold hover:text-blue-700 flex items-center"
                >
                  Get Started
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                    2
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Configure Your Search Criteria</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Set up your search filters to target companies that match your ideal client profile. Include industry, company size, location, and other relevant criteria.
                </p>
                <Link 
                  href="/search" 
                  className="text-blue-600 font-semibold hover:text-blue-700 flex items-center"
                >
                  Start Searching
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                    3
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Save and Manage Leads</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Save promising companies as leads and use our lead management tools to track your progress and organize your outreach efforts.
                </p>
                <Link 
                  href="/dashboard" 
                  className="text-blue-600 font-semibold hover:text-blue-700 flex items-center"
                >
                  View Dashboard
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Guides */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Feature Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Advanced Search Guide */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Advanced Search</h3>
              <p className="text-gray-600 mb-4">
                Learn how to use advanced search filters to find the perfect leads for your recruitment agency.
              </p>
              <Link 
                href="/guides/advanced-search" 
                className="text-blue-600 font-semibold hover:text-blue-700 flex items-center"
              >
                Read Guide
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Lead Management Guide */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Lead Management</h3>
              <p className="text-gray-600 mb-4">
                Master the art of managing and organizing your leads effectively with our comprehensive guide.
              </p>
              <Link 
                href="/guides/lead-management" 
                className="text-blue-600 font-semibold hover:text-blue-700 flex items-center"
              >
                Read Guide
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Analytics Guide */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Analytics & Reporting</h3>
              <p className="text-gray-600 mb-4">
                Understand your lead generation performance with detailed analytics and reporting tools.
              </p>
              <Link 
                href="/guides/analytics" 
                className="text-blue-600 font-semibold hover:text-blue-700 flex items-center"
              >
                Read Guide
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Best Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Lead Qualification</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Define clear qualification criteria
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Use scoring to prioritize leads
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Regular follow-up and updates
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Outreach Strategy</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Personalize your approach
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Follow up consistently
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Track and measure results
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Need Help */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Need More Help?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Our support team is here to help you succeed with RecruitLeads.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                href="/contact" 
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300"
              >
                Contact Support
              </Link>
              <Link 
                href="/support" 
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold border border-blue-600 hover:bg-blue-50 transition-colors duration-300"
              >
                Visit Support Center
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 