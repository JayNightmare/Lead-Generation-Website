import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ - RecruitLeads',
  description: 'Find answers to frequently asked questions about RecruitLeads and our lead generation platform.',
};

export default function FAQPage() {
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
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">Questions</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Find answers to common questions about RecruitLeads and our lead generation platform.
            </p>
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search for answers..."
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

      {/* FAQ Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Getting Started */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Getting Started</h2>
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <button className="w-full px-6 py-4 text-left flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">How do I start using RecruitLeads?</span>
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="px-6 pb-4">
                  <p className="text-gray-600">
                    Getting started with RecruitLeads is easy! Simply sign up for a free trial, complete your profile, and you'll have immediate access to our platform. Our onboarding process will guide you through the essential features and help you make the most of your lead generation efforts.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <button className="w-full px-6 py-4 text-left flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">What's included in the free trial?</span>
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="px-6 pb-4">
                  <p className="text-gray-600">
                    The 14-day free trial includes full access to all features of the Professional plan, including advanced search filters, company research tools, contact management, and lead tracking. You can evaluate all features and generate leads during your trial period.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Features & Functionality */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Features & Functionality</h2>
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <button className="w-full px-6 py-4 text-left flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">How does the lead generation process work?</span>
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="px-6 pb-4">
                  <p className="text-gray-600">
                    Our platform uses advanced algorithms to identify companies that are actively hiring or likely to need recruitment services. You can use our search filters to target specific industries, company sizes, or locations. The system then provides you with verified contact information and company insights to help you reach out to potential clients.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <button className="w-full px-6 py-4 text-left flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">How accurate is the company data?</span>
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="px-6 pb-4">
                  <p className="text-gray-600">
                    We maintain a high accuracy rate by regularly updating our database from multiple reliable sources. Our data verification process ensures that company information, contact details, and hiring status are current and accurate. We also provide data freshness indicators to help you identify when information was last updated.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Plans */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Pricing & Plans</h2>
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <button className="w-full px-6 py-4 text-left flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">What payment methods do you accept?</span>
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="px-6 pb-4">
                  <p className="text-gray-600">
                    We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual plans. All payments are processed securely through our payment partners.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <button className="w-full px-6 py-4 text-left flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Can I change my plan later?</span>
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="px-6 pb-4">
                  <p className="text-gray-600">
                    Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle. We also offer flexible options for adding additional team members or increasing your lead limits as your business grows.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Support & Help */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Support & Help</h2>
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <button className="w-full px-6 py-4 text-left flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">What kind of support do you offer?</span>
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="px-6 pb-4">
                  <p className="text-gray-600">
                    We provide comprehensive support through multiple channels. All users have access to our knowledge base, email support, and live chat during business hours. Professional and Enterprise plan users receive priority support and dedicated account managers.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <button className="w-full px-6 py-4 text-left flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Do you offer training or onboarding?</span>
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="px-6 pb-4">
                  <p className="text-gray-600">
                    Yes! We provide comprehensive onboarding materials, including video tutorials, documentation, and best practices guides. Enterprise customers receive personalized training sessions and dedicated onboarding support to ensure they get the most value from our platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Still Have Questions?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Can't find what you're looking for? Our support team is here to help.
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