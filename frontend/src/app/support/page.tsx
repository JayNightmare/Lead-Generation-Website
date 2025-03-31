import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Support - RecruitLeads',
  description: 'Get help and support for using RecruitLeads. Access documentation, FAQs, and contact our support team.',
};

export default function SupportPage() {
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
              How can we <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">help</span> you?
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Find answers to common questions, access documentation, or get in touch with our support team.
            </p>
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search for help..."
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

      {/* Quick Links */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Documentation */}
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Documentation</h3>
              <p className="text-gray-600 mb-4">
                Browse our comprehensive documentation and guides.
              </p>
              <Link 
                href="/guides" 
                className="text-blue-600 font-semibold hover:text-blue-700 flex items-center justify-center"
              >
                View Docs
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* FAQs */}
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">FAQs</h3>
              <p className="text-gray-600 mb-4">
                Find answers to frequently asked questions.
              </p>
              <Link 
                href="/faq" 
                className="text-blue-600 font-semibold hover:text-blue-700 flex items-center justify-center"
              >
                View FAQs
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Contact Support */}
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Contact Support</h3>
              <p className="text-gray-600 mb-4">
                Get in touch with our support team.
              </p>
              <Link 
                href="/contact" 
                className="text-blue-600 font-semibold hover:text-blue-700 flex items-center justify-center"
              >
                Contact Us
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Community */}
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Community</h3>
              <p className="text-gray-600 mb-4">
                Join our community forum.
              </p>
              <Link 
                href="/community" 
                className="text-blue-600 font-semibold hover:text-blue-700 flex items-center justify-center"
              >
                Join Forum
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Popular Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Topic 1 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Getting Started</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/guides/getting-started" className="text-gray-600 hover:text-blue-600 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Quick Start Guide
                  </Link>
                </li>
                <li>
                  <Link href="/guides/account-setup" className="text-gray-600 hover:text-blue-600 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Account Setup
                  </Link>
                </li>
                <li>
                  <Link href="/guides/first-search" className="text-gray-600 hover:text-blue-600 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Your First Search
                  </Link>
                </li>
              </ul>
            </div>

            {/* Topic 2 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Features</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/guides/advanced-search" className="text-gray-600 hover:text-blue-600 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Advanced Search
                  </Link>
                </li>
                <li>
                  <Link href="/guides/lead-management" className="text-gray-600 hover:text-blue-600 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Lead Management
                  </Link>
                </li>
                <li>
                  <Link href="/guides/analytics" className="text-gray-600 hover:text-blue-600 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Analytics & Reporting
                  </Link>
                </li>
              </ul>
            </div>

            {/* Topic 3 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Account & Billing</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/guides/account-settings" className="text-gray-600 hover:text-blue-600 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Account Settings
                  </Link>
                </li>
                <li>
                  <Link href="/guides/billing" className="text-gray-600 hover:text-blue-600 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Billing & Subscriptions
                  </Link>
                </li>
                <li>
                  <Link href="/guides/team-management" className="text-gray-600 hover:text-blue-600 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Team Management
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Still Need Help?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Our support team is available 24/7 to assist you with any questions or concerns.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                href="/contact" 
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300"
              >
                Contact Support
              </Link>
              <Link 
                href="/faq" 
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold border border-blue-600 hover:bg-blue-50 transition-colors duration-300"
              >
                View FAQs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 