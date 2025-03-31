'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  getAuth, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { initializeApp, getApps } from 'firebase/app';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Log Firebase config (without sensitive values)
console.log('Firebase Config:', {
  ...firebaseConfig,
  apiKey: firebaseConfig.apiKey ? '***' : undefined
});

// Initialize Firebase only if it hasn't been initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

// Network check function
const checkNetworkConnection = async () => {
  try {
    // Try multiple endpoints to ensure we're not blocked by any single service
    const endpoints = [
      'https://www.google.com/favicon.ico',
      'https://firebase.googleapis.com/favicon.ico',
      'https://www.gstatic.com/favicon.ico'
    ];

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, { 
          method: 'HEAD',
          mode: 'no-cors',
          cache: 'no-cache'
        });
        // Even with no-cors, we can check if the request completed
        return true;
      } catch (e) {
        console.log(`Failed to check endpoint ${endpoint}:`, e);
        continue;
      }
    }
    
    // If we get here, all endpoints failed
    console.error('All network check endpoints failed');
    return false;
  } catch (error) {
    console.error('Network check error:', error);
    return false;
  }
};

type User = FirebaseUser | null;

interface AuthContextType {
  user: User;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<FirebaseUser>;
  signUp: (email: string, password: string, name: string) => Promise<FirebaseUser>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (displayName?: string, photoURL?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Checking network connection...');
      const isOnline = await checkNetworkConnection();
      console.log('Network check result:', isOnline);
      
      if (!isOnline) {
        console.error('Network check failed');
        throw new Error('Unable to verify network connection. Please try again.');
      }

      console.log('Attempting sign in...');
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (error: any) {
      console.error('Sign in error:', error);
      if (error.code === 'auth/network-request-failed') {
        throw new Error('Unable to connect to authentication service. Please try again.');
      }
      throw new Error(error.message || 'Failed to sign in');
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      console.log('Checking network connection...');
      const isOnline = await checkNetworkConnection();
      console.log('Network check result:', isOnline);
      
      if (!isOnline) {
        console.error('Network check failed');
        throw new Error('Unable to verify network connection. Please try again.');
      }

      console.log('Attempting sign up...');
      // First create the user
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Then update the profile
      if (result.user) {
        await updateProfile(result.user, { displayName: name });
      }
      
      return result.user;
    } catch (error: any) {
      console.error('Sign up error:', error);
      // Provide more specific error messages
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('This email is already registered. Please sign in instead.');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Please enter a valid email address.');
      } else if (error.code === 'auth/weak-password') {
        throw new Error('Password should be at least 6 characters long.');
      } else if (error.code === 'auth/configuration-not-found') {
        throw new Error('Authentication service is not properly configured. Please try again later.');
      } else if (error.code === 'auth/network-request-failed') {
        throw new Error('Unable to connect to authentication service. Please try again.');
      }
      throw new Error(error.message || 'Failed to create account');
    }
  };

  const signOut = async () => {
    try {
      const isOnline = await checkNetworkConnection();
      if (!isOnline) {
        throw new Error('No internet connection. Please check your network and try again.');
      }

      await firebaseSignOut(auth);
    } catch (error: any) {
      console.error('Sign out error:', error);
      if (error.code === 'auth/network-request-failed') {
        throw new Error('Network error. Please check your internet connection and try again.');
      }
      throw new Error(error.message || 'Failed to sign out');
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const isOnline = await checkNetworkConnection();
      if (!isOnline) {
        throw new Error('No internet connection. Please check your network and try again.');
      }

      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      console.error('Reset password error:', error);
      if (error.code === 'auth/network-request-failed') {
        throw new Error('Network error. Please check your internet connection and try again.');
      }
      throw new Error(error.message || 'Failed to send reset email');
    }
  };

  const updateUserProfile = async (displayName?: string, photoURL?: string) => {
    try {
      const isOnline = await checkNetworkConnection();
      if (!isOnline) {
        throw new Error('No internet connection. Please check your network and try again.');
      }

      if (user) {
        await updateProfile(user, { displayName, photoURL });
      }
    } catch (error: any) {
      console.error('Update profile error:', error);
      if (error.code === 'auth/network-request-failed') {
        throw new Error('Network error. Please check your internet connection and try again.');
      }
      throw new Error(error.message || 'Failed to update profile');
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 