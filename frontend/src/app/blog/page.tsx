import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - RecruitLeads',
  description: 'Stay updated with the latest insights, tips, and trends in recruitment and lead generation.',
};

export default function BlogPage() {
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
              Recruitment <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">Insights</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Stay updated with the latest insights, tips, and trends in recruitment and lead generation.
            </p>
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search articles..."
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

      {/* Featured Post */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://picsum.photos/800/600" 
                alt="Featured Post" 
                className="rounded-2xl shadow-lg"
              />
            </div>
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <span className="px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                  Lead Generation
                </span>
                <span className="text-gray-500">March 15, 2024</span>
              </div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                The Future of Lead Generation: AI and Automation Trends
              </h2>
              <p className="text-gray-600 mb-6">
                Discover how artificial intelligence and automation are transforming the way recruitment agencies find and qualify leads. Learn about the latest trends and how to stay ahead of the competition.
              </p>
              <Link 
                href="/blog/future-lead-generation" 
                className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700"
              >
                Read More
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Link 
              href="/blog/category/lead-generation" 
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Lead Generation</h3>
              <p className="text-sm text-gray-600">Tips and strategies for finding quality leads</p>
            </Link>

            <Link 
              href="/blog/category/sales" 
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Sales</h3>
              <p className="text-sm text-gray-600">Closing deals and growing revenue</p>
            </Link>

            <Link 
              href="/blog/category/recruitment" 
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Recruitment</h3>
              <p className="text-sm text-gray-600">Best practices and industry trends</p>
            </Link>

            <Link 
              href="/blog/category/technology" 
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Technology</h3>
              <p className="text-sm text-gray-600">Tools and innovations in recruitment</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Post 1 */}
            <article className="bg-white rounded-xl shadow-sm overflow-hidden">
              <img 
                src="https://picsum.photos/600/400" 
                alt="Post 1" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="px-4 py-1 bg-green-100 text-green-600 rounded-full text-sm font-semibold">
                    Sales
                  </span>
                  <span className="text-gray-500">March 10, 2024</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  How to Build a Winning Sales Pipeline
                </h3>
                <p className="text-gray-600 mb-4">
                  Learn the essential steps to create and maintain a successful sales pipeline for your recruitment agency.
                </p>
                <Link 
                  href="/blog/sales-pipeline" 
                  className="text-blue-600 font-semibold hover:text-blue-700 flex items-center"
                >
                  Read More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>

            {/* Post 2 */}
            <article className="bg-white rounded-xl shadow-sm overflow-hidden">
              <img 
                src="https://picsum.photos/600/400" 
                alt="Post 2" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="px-4 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold">
                    Recruitment
                  </span>
                  <span className="text-gray-500">March 8, 2024</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  The Rise of Remote Recruitment
                </h3>
                <p className="text-gray-600 mb-4">
                  Explore how remote work is changing the recruitment landscape and what it means for agencies.
                </p>
                <Link 
                  href="/blog/remote-recruitment" 
                  className="text-blue-600 font-semibold hover:text-blue-700 flex items-center"
                >
                  Read More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>

            {/* Post 3 */}
            <article className="bg-white rounded-xl shadow-sm overflow-hidden">
              <img 
                src="https://picsum.photos/600/400" 
                alt="Post 3" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="px-4 py-1 bg-yellow-100 text-yellow-600 rounded-full text-sm font-semibold">
                    Technology
                  </span>
                  <span className="text-gray-500">March 5, 2024</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Top Recruitment Tools for 2024
                </h3>
                <p className="text-gray-600 mb-4">
                  Discover the latest tools and technologies that are revolutionizing the recruitment industry.
                </p>
                <Link 
                  href="/blog/recruitment-tools-2024" 
                  className="text-blue-600 font-semibold hover:text-blue-700 flex items-center"
                >
                  Read More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Stay Updated</h2>
            <p className="text-xl text-gray-600 mb-8">
              Subscribe to our newsletter for the latest insights and tips delivered straight to your inbox.
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