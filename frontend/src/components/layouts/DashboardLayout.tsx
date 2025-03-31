'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
import {
  HomeIcon,
  MagnifyingGlassIcon,
  BookmarkIcon,
  BellIcon,
  BuildingOfficeIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Search Companies', href: '/search', icon: MagnifyingGlassIcon },
  { name: 'Saved Leads', href: '/saved', icon: BookmarkIcon },
  { name: 'Weekly Updates', href: '/alerts', icon: BellIcon },
  { name: 'Company Database', href: '/companies', icon: BuildingOfficeIcon },
];

const userNavItems = [
  { name: 'Profile', href: '/profile', icon: UserCircleIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out lg:transform-none lg:relative ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-blue-600">RecruitLeads</span>
            </Link>
            <button 
              className="p-1 rounded-md lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            <div className="py-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-md my-1 ${
                      isActive
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-500' : 'text-gray-500'}`} />
                    {item.name}
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 mt-4 border-t border-gray-200">
              <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">User Settings</p>
              {userNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-md my-1 ${
                      isActive
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-500' : 'text-gray-500'}`} />
                    {item.name}
                  </Link>
                );
              })}

              <button
                onClick={handleSignOut}
                className="flex items-center w-full px-4 py-2 mt-1 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3 text-gray-500" />
                Sign Out
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navigation */}
        <header className="flex items-center justify-between h-16 px-4 bg-white border-b">
          <button
            className="p-1 rounded-md lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Bars3Icon className="w-6 h-6" />
          </button>

          <div className="flex items-center ml-auto">
            {/* Notifications - could be implemented later */}
            <button className="p-1 mr-4 text-gray-500 rounded-md hover:text-gray-700">
              <BellIcon className="w-6 h-6" />
            </button>

            {/* User Menu */}
            <div className="relative flex items-center">
              <div className="flex items-center">
                <div className="mr-3 text-right">
                  <p className="text-sm font-medium text-gray-700">
                    {user?.displayName || 'User'}
                  </p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                  {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
} 