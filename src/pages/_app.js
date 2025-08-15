import '../styles/globals.css';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import CookieConsent from '@/components/CookieConsent';

// Simple cookie utilities
export const setCookie = (name, value, days = 30) => {
  if (typeof document !== 'undefined') {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  }
};

export const getCookie = (name) => {
  if (typeof document !== 'undefined') {
    return document.cookie.split('; ').reduce((r, v) => {
      const parts = v.split('=');
      return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, '');
  }
  return '';
};

export const deleteCookie = (name) => {
  if (typeof document !== 'undefined') {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
};

// Check if user has consented to specific cookie types
export const hasConsentFor = (cookieType) => {
  const preferences = getCookie('cookiePreferences');
  if (!preferences) return false;
  
  try {
    const prefs = JSON.parse(preferences);
    return prefs[cookieType] === true;
  } catch {
    return false;
  }
};

export default function App({ Component, pageProps }) {
  const router = useRouter();
  
  useEffect(() => {
    // Only track if user has consented to analytics
    if (hasConsentFor('analytics')) {
      setCookie('lastVisited', new Date().toISOString());
      
      const pageViews = getCookie('pageViews');
      const currentViews = pageViews ? parseInt(pageViews) : 0;
      setCookie('pageViews', (currentViews + 1).toString());
    }
  }, [router.asPath]);

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        <Component {...pageProps} key={router.asPath} />
      </AnimatePresence>
      <CookieConsent />
    </>
  );
}