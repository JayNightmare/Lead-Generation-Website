'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useAuth } from '@/components/auth/AuthProvider';

interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  company: string;
  notificationsEmail: boolean;
  notificationsApp: boolean;
  notificationsImportant: boolean;
}

export default function ProfilePage() {
  const { user, loading, updateUserProfile } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Form data state
  const [formData, setFormData] = useState<ProfileFormData>({
    name: '',
    email: '',
    phone: '',
    jobTitle: '',
    company: '',
    notificationsEmail: true,
    notificationsApp: true,
    notificationsImportant: false
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Load user data
  useEffect(() => {
    if (user) {
      // In a real app, you would fetch the full profile data
      setFormData({
        name: user.displayName || '',
        email: user.email || '',
        phone: user.phoneNumber || '',
        jobTitle: '',
        company: '',
        notificationsEmail: true,
        notificationsApp: true,
        notificationsImportant: false
      });
      setIsLoading(false);
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // In a real app, you would call your API to update the profile
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update profile
      if (updateUserProfile) {
        // Pass just the name as a string, depending on the API implementation
        await updateUserProfile(formData.name);
      }
      
      setSuccessMessage('Profile updated successfully!');
    } catch (error) {
      setErrorMessage('There was a problem updating your profile.');
      console.error('Error updating profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // If still loading or user not authenticated
  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600">Manage your account information and preferences</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Info */}
            <div className="md:col-span-2">
              <div className="card bg-white overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Personal Information</h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Update your personal details and contact information.
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="p-6">
                  {successMessage && (
                    <div className="mb-4 p-3 bg-green-50 text-green-800 rounded-md">
                      {successMessage}
                    </div>
                  )}
                  
                  {errorMessage && (
                    <div className="mb-4 p-3 bg-red-50 text-red-800 rounded-md">
                      {errorMessage}
                    </div>
                  )}

                  <div className="mb-5">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="mb-5">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled
                      className="shadow-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                    <p className="mt-1 text-xs text-gray-500">Your email address cannot be changed.</p>
                  </div>

                  <div className="mb-5">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                    <div>
                      <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
                        Job Title
                      </label>
                      <input
                        type="text"
                        name="jobTitle"
                        id="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        id="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="btn-primary w-full md:w-auto"
                    >
                      {isSaving ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </span>
                      ) : 'Save Changes'}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="md:col-span-1">
              <div className="card bg-white overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Notification Settings</h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Configure how you receive notifications.
                  </p>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="notificationsEmail"
                          name="notificationsEmail"
                          type="checkbox"
                          checked={formData.notificationsEmail}
                          onChange={handleChange}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="notificationsEmail" className="font-medium text-gray-700">Email Notifications</label>
                        <p className="text-gray-500">Receive email updates about your account activity.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="notificationsApp"
                          name="notificationsApp"
                          type="checkbox"
                          checked={formData.notificationsApp}
                          onChange={handleChange}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="notificationsApp" className="font-medium text-gray-700">In-App Notifications</label>
                        <p className="text-gray-500">Receive notifications directly within the application.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="notificationsImportant"
                          name="notificationsImportant"
                          type="checkbox"
                          checked={formData.notificationsImportant}
                          onChange={handleChange}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="notificationsImportant" className="font-medium text-gray-700">Important Only</label>
                        <p className="text-gray-500">Only receive notifications for important activity.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 card bg-white p-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Account Actions</h3>
                <div className="space-y-3">
                  <button 
                    type="button" 
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Change Password
                  </button>
                  <button 
                    type="button" 
                    className="block text-sm text-red-600 hover:text-red-800 font-medium"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 