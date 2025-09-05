import React, { Component } from 'react';
import { AppProps } from 'next/app';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { FloatingNavigation } from '../components/FloatingNavigation';
import { BrandProvider } from '../contexts/BrandContext';
import { AppProvider } from '../contexts/AppContext';
import '../styles/globals.css';
export default function MyApp({
  Component,
  pageProps
}: AppProps) {
  return <ErrorBoundary>
      <AppProvider>
        <BrandProvider>
          <div className="w-full min-h-screen bg-white">
            <Component {...pageProps} />
            <FloatingNavigation />
          </div>
        </BrandProvider>
      </AppProvider>
    </ErrorBoundary>;
}