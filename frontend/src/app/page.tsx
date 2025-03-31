import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RecruitLeads - Find and research potential client companies',
  description: 'The lead generation platform for recruitment agencies',
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white relative overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
          <div className="absolute rounded-full bg-white w-64 h-64 -top-20 -left-20 opacity-10"></div>
          <div className="absolute rounded-full bg-white w-96 h-96 top-40 -right-20 opacity-10"></div>
          <div className="absolute rounded-full bg-white w-80 h-80 -bottom-40 left-1/4 opacity-5"></div>
        </div>
        
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0 pr-0 md:pr-8 lg:pr-16 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Find Your Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">Recruitment Clients</span>
              </h1>
              <p className="text-xl mb-10 text-blue-100 max-w-xl mx-auto md:mx-0">
                Discover companies that are actively hiring and need your recruitment expertise, all in one powerful platform.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
                <Link 
                  href="/signup" 
                  className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Get Started Free
                </Link>
                <Link 
                  href="/login" 
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-700 px-8 py-4 rounded-xl font-semibold transition-all duration-300"
                >
                  Log In
                </Link>
              </div>
              <div className="mt-8 text-blue-100 text-sm">
                No credit card required • Free 14-day trial
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="absolute -inset-2 bg-gradient-to-tr from-pink-400 to-blue-500 opacity-20 blur-lg rounded-2xl"></div>
              <img 
                src="https://picsum.photos/600/500"
                alt="Recruitment lead generation" 
                className="w-full h-auto rounded-2xl shadow-2xl relative z-10 transform transition-transform duration-500 hover:scale-[1.02]" 
              />
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
      </header>

      {/* Features Section */}
      <section className="bg-white dark:bg-gray-900 py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
              Powerful Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Everything You Need to Find Hiring Companies</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our platform provides all the tools you need to identify, research, and connect with companies that need your recruitment services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Search & Filter</h3>
              <p className="text-gray-600 dark:text-gray-300">Find companies by industry, size, location, and hiring status with our advanced filtering system.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Decision Makers</h3>
              <p className="text-gray-600 dark:text-gray-300">Access key decision-makers and their contact information to connect with the right people.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Active Jobs</h3>
              <p className="text-gray-600 dark:text-gray-300">See what roles companies are actively hiring for so you can target your services appropriately.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Save Leads</h3>
              <p className="text-gray-600 dark:text-gray-300">Save potential clients to your dashboard for later follow-up and track communication history.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Weekly Updates</h3>
              <p className="text-gray-600 dark:text-gray-300">Get notified when new companies match your criteria so you never miss an opportunity.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Export Data</h3>
              <p className="text-gray-600 dark:text-gray-300">Export leads to CSV or integrate with your CRM to streamline your sales process.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gradient-to-b from-gray-50 dark:from-gray-800 to-white dark:to-gray-900 py-24 relative">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/4 top-24 w-32 h-32 bg-blue-50 dark:bg-blue-900 rounded-full opacity-70"></div>
          <div className="absolute right-1/3 bottom-24 w-40 h-40 bg-indigo-50 dark:bg-indigo-900 rounded-full opacity-70"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-sm font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900 rounded-full mb-4">
              Simple Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">How It Works</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              With RecruitLeads, finding new clients for your recruitment agency has never been easier.
            </p>
          </div>
          
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-24 left-0 w-full h-0.5 bg-gradient-to-r from-blue-100 via-indigo-300 to-purple-100 dark:from-blue-900 dark:via-indigo-700 dark:to-purple-900"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
              <div className="relative z-10">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 h-full transition-all duration-300 hover:shadow-xl">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-6 transform transition-transform duration-500 hover:scale-110 hover:rotate-3">
                    <span className="text-xl font-bold">1</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-3 text-center text-gray-900 dark:text-white">Create an account</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center">Sign up and set your preferences to tailor the platform to your recruitment niche.</p>
                </div>
                <div className="hidden md:block absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/3 w-5 h-10 bg-white dark:bg-gray-800 border border-indigo-100 dark:border-indigo-900 rounded-full shadow-sm"></div>
              </div>
              
              <div className="relative z-10">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 h-full transition-all duration-300 hover:shadow-xl">
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-6 transform transition-transform duration-500 hover:scale-110 hover:rotate-3">
                    <span className="text-xl font-bold">2</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-3 text-center text-gray-900 dark:text-white">Search for companies</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center">Filter by industry, size, location, and hiring status to find your ideal prospects.</p>
                </div>
                <div className="hidden md:block absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/3 w-5 h-10 bg-white dark:bg-gray-800 border border-indigo-100 dark:border-indigo-900 rounded-full shadow-sm"></div>
              </div>
              
              <div className="relative z-10">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 h-full transition-all duration-300 hover:shadow-xl">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-6 transform transition-transform duration-500 hover:scale-110 hover:rotate-3">
                    <span className="text-xl font-bold">3</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-3 text-center text-gray-900 dark:text-white">Save promising leads</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center">Add notes, set follow-up dates, and track your communication with each prospect.</p>
                </div>
                <div className="hidden md:block absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/3 w-5 h-10 bg-white dark:bg-gray-800 border border-indigo-100 dark:border-indigo-900 rounded-full shadow-sm"></div>
              </div>
              
              <div className="relative z-10">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 h-full transition-all duration-300 hover:shadow-xl">
                  <div className="bg-gradient-to-r from-pink-600 to-red-600 text-white rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-6 transform transition-transform duration-500 hover:scale-110 hover:rotate-3">
                    <span className="text-xl font-bold">4</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-3 text-center text-gray-900 dark:text-white">Convert to clients</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center">Contact decision-makers with personalized outreach and close more deals.</p>
                </div>
                <div className="hidden md:block absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/3 w-5 h-10 bg-white dark:bg-gray-800 border border-indigo-100 dark:border-indigo-900 rounded-full shadow-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 opacity-95"></div>
        
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2">
            <svg width="404" height="404" fill="none" viewBox="0 0 404 404">
              <defs>
                <pattern id="cta-squares" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="4" height="4" fill="rgba(255, 255, 255, 0.1)" />
                </pattern>
              </defs>
              <rect width="404" height="404" fill="url(#cta-squares)" />
            </svg>
          </div>
          <div className="absolute top-full right-0 transform -translate-y-1/2 translate-x-1/4">
            <svg width="404" height="404" fill="none" viewBox="0 0 404 404">
              <defs>
                <pattern id="cta-circles" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="3" fill="rgba(255, 255, 255, 0.1)" />
                </pattern>
              </defs>
              <rect width="404" height="404" fill="url(#cta-circles)" />
            </svg>
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-xl border border-white border-opacity-20">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Find Your Next Client?</h2>
                <p className="text-xl mb-10 text-blue-100 max-w-3xl mx-auto">
                  Join RecruitLeads today and discover companies that need your recruitment expertise. Start your 14-day free trial now.
                </p>
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <Link 
                    href="/signup" 
                    className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 rounded-xl font-semibold text-lg inline-block transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Get Started for Free
                  </Link>
                  <Link 
                    href="/features" 
                    className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-700 px-8 py-4 rounded-xl font-semibold text-lg inline-block transition-all duration-300"
                  >
                    Learn More
                  </Link>
                </div>
                <div className="mt-8 text-blue-100 text-sm">
                  <span className="flex items-center justify-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    No credit card required
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 