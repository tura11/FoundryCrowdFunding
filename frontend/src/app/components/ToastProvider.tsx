'use client';

import { Toaster } from 'react-hot-toast';

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        // Default options
        duration: 4000,
        style: {
          background: '#fff',
          color: '#363636',
          padding: '16px',
          borderRadius: '8px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
        
        // Success toast style
        success: {
          duration: 4000,
          style: {
            background: '#f0fdf4',
            border: '1px solid #86efac',
          },
          iconTheme: {
            primary: '#22c55e',
            secondary: '#fff',
          },
        },
        
        // Error toast style
        error: {
          duration: 5000,
          style: {
            background: '#fef2f2',
            border: '1px solid #fca5a5',
          },
          iconTheme: {
            primary: '#ef4444',
            secondary: '#fff',
          },
        },
        
        // Loading toast style
        loading: {
          style: {
            background: '#eff6ff',
            border: '1px solid #93c5fd',
          },
          iconTheme: {
            primary: '#3b82f6',
            secondary: '#fff',
          },
        },
      }}
    />
  );
}