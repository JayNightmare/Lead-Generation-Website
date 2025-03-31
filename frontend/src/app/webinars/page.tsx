import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Webinars - RecruitLeads',
  description: 'Learn from industry experts through our live and recorded webinars on recruitment and lead generation.',
};

export default function WebinarsPage() {
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
              Expert <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">Webinars</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Learn from industry experts and stay ahead of the curve with our live and recorded webinars.
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

      {/* Upcoming Webinars */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Upcoming Webinars</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Webinar 1 */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="relative">
                <img 
                  src="https://picsum.photos/600/400" 
                  alt="Webinar 1" 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Live
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                    Lead Generation
                  </span>
                  <span className="text-gray-500">March 25, 2024</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Advanced Lead Generation Strategies for 2024
                </h3>
                <p className="text-gray-600 mb-4">
                  Join industry expert Sarah Johnson as she shares cutting-edge strategies for finding and qualifying leads in the modern recruitment landscape.
                </p>
                <div className="flex items-center space-x-4 mb-4">
                  <img 
                    src="https://picsum.photos/100/100" 
                    alt="Speaker" 
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">Sarah Johnson</p>
                    <p className="text-sm text-gray-500">Lead Generation Expert</p>
                  </div>
                </div>
                <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300">
                  Register Now
                </button>
              </div>
            </div>

            {/* Webinar 2 */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="relative">
                <img 
                  src="https://picsum.photos/600/400" 
                  alt="Webinar 2" 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Live
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="px-4 py-1 bg-green-100 text-green-600 rounded-full text-sm font-semibold">
                    Sales
                  </span>
                  <span className="text-gray-500">March 28, 2024</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Building a High-Performing Sales Pipeline
                </h3>
                <p className="text-gray-600 mb-4">
                  Learn how to create and maintain a successful sales pipeline that consistently delivers qualified leads and closed deals.
                </p>
                <div className="flex items-center space-x-4 mb-4">
                  <img 
                    src="https://picsum.photos/100/100" 
                    alt="Speaker" 
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">Michael Chen</p>
                    <p className="text-sm text-gray-500">Sales Strategy Consultant</p>
                  </div>
                </div>
                <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300">
                  Register Now
                </button>
              </div>
            </div>

            {/* Webinar 3 */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="relative">
                <img 
                  src="https://picsum.photos/600/400" 
                  alt="Webinar 3" 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Live
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="px-4 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold">
                    Technology
                  </span>
                  <span className="text-gray-500">April 2, 2024</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  AI and Automation in Recruitment
                </h3>
                <p className="text-gray-600 mb-4">
                  Discover how artificial intelligence and automation are revolutionizing the recruitment industry and how to leverage these technologies.
                </p>
                <div className="flex items-center space-x-4 mb-4">
                  <img 
                    src="https://picsum.photos/100/100" 
                    alt="Speaker" 
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">Dr. Emily Rodriguez</p>
                    <p className="text-sm text-gray-500">AI Research Director</p>
                  </div>
                </div>
                <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300">
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recorded Webinars */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Recorded Webinars</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Recorded Webinar 1 */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="relative">
                <img 
                  src="https://picsum.photos/600/400" 
                  alt="Recorded Webinar 1" 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                    Lead Generation
                  </span>
                  <span className="text-gray-500">March 15, 2024</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Effective Lead Nurturing Strategies
                </h3>
                <p className="text-gray-600 mb-4">
                  Learn proven techniques for nurturing leads and converting them into clients.
                </p>
                <div className="flex items-center space-x-4 mb-4">
                  <img 
                    src="https://picsum.photos/100/100" 
                    alt="Speaker" 
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">David Thompson</p>
                    <p className="text-sm text-gray-500">Lead Nurturing Expert</p>
                  </div>
                </div>
                <button className="w-full bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold border border-blue-600 hover:bg-blue-50 transition-colors duration-300">
                  Watch Recording
                </button>
              </div>
            </div>

            {/* Recorded Webinar 2 */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="relative">
                <img 
                  src="https://picsum.photos/600/400" 
                  alt="Recorded Webinar 2" 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="px-4 py-1 bg-green-100 text-green-600 rounded-full text-sm font-semibold">
                    Sales
                  </span>
                  <span className="text-gray-500">March 10, 2024</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Closing High-Value Deals
                </h3>
                <p className="text-gray-600 mb-4">
                  Master the art of closing deals with enterprise clients and handling complex sales cycles.
                </p>
                <div className="flex items-center space-x-4 mb-4">
                  <img 
                    src="https://picsum.photos/100/100" 
                    alt="Speaker" 
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">Lisa Chen</p>
                    <p className="text-sm text-gray-500">Enterprise Sales Director</p>
                  </div>
                </div>
                <button className="w-full bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold border border-blue-600 hover:bg-blue-50 transition-colors duration-300">
                  Watch Recording
                </button>
              </div>
            </div>

            {/* Recorded Webinar 3 */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="relative">
                <img 
                  src="https://picsum.photos/600/400" 
                  alt="Recorded Webinar 3" 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="px-4 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold">
                    Technology
                  </span>
                  <span className="text-gray-500">March 5, 2024</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Leveraging Data Analytics
                </h3>
                <p className="text-gray-600 mb-4">
                  Learn how to use data analytics to improve your recruitment and lead generation efforts.
                </p>
                <div className="flex items-center space-x-4 mb-4">
                  <img 
                    src="https://picsum.photos/100/100" 
                    alt="Speaker" 
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">Dr. James Wilson</p>
                    <p className="text-sm text-gray-500">Data Science Lead</p>
                  </div>
                </div>
                <button className="w-full bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold border border-blue-600 hover:bg-blue-50 transition-colors duration-300">
                  Watch Recording
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Stay Updated</h2>
            <p className="text-xl text-gray-600 mb-8">
              Subscribe to our newsletter to receive notifications about upcoming webinars and exclusive content.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
} 