import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers - RecruitLeads',
  description: 'Join our team at RecruitLeads. Explore open positions and learn about our company culture.',
};

export default function CareersPage() {
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
              Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">Team</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Help us transform the recruitment industry with innovative technology.
            </p>
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

      {/* Why Join Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Why Join RecruitLeads?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Innovation</h3>
              <p className="text-gray-600">
                Work on cutting-edge technology and help shape the future of recruitment.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Growth</h3>
              <p className="text-gray-600">
                Continuous learning and development opportunities in a fast-growing company.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Work-Life Balance</h3>
              <p className="text-gray-600">
                Flexible working hours and remote work options for better work-life integration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Open Positions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Position 1 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Senior Frontend Developer</h3>
                  <p className="text-gray-600">Engineering • Remote</p>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                  Full-time
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                Join our frontend team to build beautiful, responsive, and performant user interfaces using React and Next.js.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">React</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">Next.js</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">TypeScript</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">Tailwind CSS</span>
              </div>
              <Link 
                href="/careers/senior-frontend-developer" 
                className="text-blue-600 font-semibold hover:text-blue-700 flex items-center"
              >
                Learn More
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Position 2 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Product Manager</h3>
                  <p className="text-gray-600">Product • Remote</p>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                  Full-time
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                Lead product strategy and development for our recruitment lead generation platform.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">Product Strategy</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">Agile</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">User Research</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">Analytics</span>
              </div>
              <Link 
                href="/careers/product-manager" 
                className="text-blue-600 font-semibold hover:text-blue-700 flex items-center"
              >
                Learn More
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Position 3 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Backend Developer</h3>
                  <p className="text-gray-600">Engineering • Remote</p>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                  Full-time
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                Build scalable backend services and APIs using Node.js and PostgreSQL.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">Node.js</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">PostgreSQL</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">TypeScript</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">AWS</span>
              </div>
              <Link 
                href="/careers/backend-developer" 
                className="text-blue-600 font-semibold hover:text-blue-700 flex items-center"
              >
                Learn More
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Position 4 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Sales Representative</h3>
                  <p className="text-gray-600">Sales • Remote</p>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                  Full-time
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                Help recruitment agencies transform their lead generation process with our platform.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">B2B Sales</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">SaaS</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">CRM</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">Recruitment</span>
              </div>
              <Link 
                href="/careers/sales-representative" 
                className="text-blue-600 font-semibold hover:text-blue-700 flex items-center"
              >
                Learn More
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Benefits & Perks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Competitive Salary</h3>
              <p className="text-gray-600">Market-competitive compensation package</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Health Insurance</h3>
              <p className="text-gray-600">Comprehensive health coverage</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Flexible Hours</h3>
              <p className="text-gray-600">Work when you're most productive</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Remote Work</h3>
              <p className="text-gray-600">Work from anywhere in the world</p>
            </div>
          </div>
        </div>
      </section>

      {/* Apply Now */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Ready to Join Us?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Take the first step towards an exciting career at RecruitLeads.
            </p>
            <Link 
              href="/contact" 
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 