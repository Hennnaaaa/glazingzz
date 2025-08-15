import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX } from 'react-icons/hi';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, can't be disabled
    analytics: true,
    personalization: true,
    marketing: false
  });

  // Handle mounting to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Check if user has already made a choice
    const consent = getCookie('cookieConsent');
    if (!consent) {
      // Show banner after a short delay
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    } else {
      // Load saved preferences
      const savedPrefs = getCookie('cookiePreferences');
      if (savedPrefs) {
        try {
          setPreferences(JSON.parse(savedPrefs));
        } catch (e) {
          console.error('Error parsing cookie preferences:', e);
        }
      }
    }
  }, [mounted]);

  // Cookie utility functions
  const setCookie = (name, value, days) => {
    if (typeof document === 'undefined') return;
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  };

  const getCookie = (name) => {
    if (typeof document === 'undefined') return null;
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      personalization: true,
      marketing: true
    };
    
    setCookie('cookieConsent', 'accepted', 365);
    setCookie('cookiePreferences', JSON.stringify(allAccepted), 365);
    setShowBanner(false);
    setShowSettings(false);
  };

  const acceptSelected = () => {
    setCookie('cookieConsent', 'customized', 365);
    setCookie('cookiePreferences', JSON.stringify(preferences), 365);
    setShowBanner(false);
    setShowSettings(false);
  };

  const rejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      personalization: false,
      marketing: false
    };
    
    setCookie('cookieConsent', 'rejected', 365);
    setCookie('cookiePreferences', JSON.stringify(onlyNecessary), 365);
    setShowBanner(false);
    setShowSettings(false);
  };

  const togglePreference = (key) => {
    if (key === 'necessary') return; // Can't disable necessary cookies
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Don't render anything on server or before mounting
  if (!mounted || !showBanner) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-600 to-slate-700 border-t border-slate-500 shadow-2xl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {!showSettings ? (
            // Main Banner
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🍪</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      We use cookies to enhance your experience
                    </h3>
                    <p className="text-sm text-slate-200 leading-relaxed">
                      We use cookies to personalize content, provide social media features, and analyze our traffic. 
                      We also share information about your use of our site with our analytics partners.{' '}
                      <a 
                        href="/cookie-policy"
                        className="text-slate-100 hover:text-white underline underline-offset-2 transition-colors"
                      >
                        Learn more about our cookie policy
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <button
                  onClick={() => setShowSettings(true)}
                  className="px-6 py-2 border border-slate-400 text-slate-200 rounded-lg hover:bg-slate-500/30 hover:border-slate-300 transition-all duration-200"
                >
                  Cookie Settings
                </button>
                <button
                  onClick={rejectAll}
                  className="px-6 py-2 border border-slate-400 text-slate-200 rounded-lg hover:bg-slate-500/30 hover:border-slate-300 transition-all duration-200"
                >
                  Reject All
                </button>
                <button
                  onClick={acceptAll}
                  className="px-6 py-2 bg-white text-slate-700 rounded-lg hover:bg-slate-100 transition-colors font-medium shadow-sm"
                >
                  Accept All
                </button>
              </div>
            </div>
          ) : (
            // Settings Panel
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Cookie Preferences</h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-2 text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-slate-500/30"
                >
                  <HiX className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Necessary Cookies */}
                <div className="flex items-start justify-between">
                  <div className="flex-1 mr-4">
                    <h4 className="font-medium text-white mb-1">Necessary Cookies</h4>
                    <p className="text-sm text-slate-200">
                      Essential for the website to function properly. Cannot be disabled.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-12 h-6 bg-white rounded-full relative shadow-sm">
                      <div className="w-5 h-5 bg-slate-600 rounded-full absolute top-0.5 right-0.5 transition-transform"></div>
                    </div>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="flex items-start justify-between">
                  <div className="flex-1 mr-4">
                    <h4 className="font-medium text-white mb-1">Analytics Cookies</h4>
                    <p className="text-sm text-slate-200">
                      Help us understand how visitors interact with our website.
                    </p>
                  </div>
                  <button
                    onClick={() => togglePreference('analytics')}
                    className="flex-shrink-0"
                  >
                    <div className={`w-12 h-6 rounded-full relative transition-colors shadow-sm ${
                      preferences.analytics ? 'bg-white' : 'bg-slate-400'
                    }`}>
                      <div className={`w-5 h-5 rounded-full absolute top-0.5 transition-transform ${
                        preferences.analytics 
                          ? 'translate-x-6 bg-slate-600' 
                          : 'translate-x-0.5 bg-slate-600'
                      }`}></div>
                    </div>
                  </button>
                </div>

                {/* Personalization Cookies */}
                <div className="flex items-start justify-between">
                  <div className="flex-1 mr-4">
                    <h4 className="font-medium text-white mb-1">Personalization Cookies</h4>
                    <p className="text-sm text-slate-200">
                      Remember your preferences and provide personalized content.
                    </p>
                  </div>
                  <button
                    onClick={() => togglePreference('personalization')}
                    className="flex-shrink-0"
                  >
                    <div className={`w-12 h-6 rounded-full relative transition-colors shadow-sm ${
                      preferences.personalization ? 'bg-white' : 'bg-slate-400'
                    }`}>
                      <div className={`w-5 h-5 rounded-full absolute top-0.5 transition-transform ${
                        preferences.personalization 
                          ? 'translate-x-6 bg-slate-600' 
                          : 'translate-x-0.5 bg-slate-600'
                      }`}></div>
                    </div>
                  </button>
                </div>

                {/* Marketing Cookies */}
                <div className="flex items-start justify-between">
                  <div className="flex-1 mr-4">
                    <h4 className="font-medium text-white mb-1">Marketing Cookies</h4>
                    <p className="text-sm text-slate-200">
                      Used to track visitors across websites for marketing purposes.
                    </p>
                  </div>
                  <button
                    onClick={() => togglePreference('marketing')}
                    className="flex-shrink-0"
                  >
                    <div className={`w-12 h-6 rounded-full relative transition-colors shadow-sm ${
                      preferences.marketing ? 'bg-white' : 'bg-slate-400'
                    }`}>
                      <div className={`w-5 h-5 rounded-full absolute top-0.5 transition-transform ${
                        preferences.marketing 
                          ? 'translate-x-6 bg-slate-600' 
                          : 'translate-x-0.5 bg-slate-600'
                      }`}></div>
                    </div>
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8 pt-6 border-t border-slate-500/30">
                <button
                  onClick={rejectAll}
                  className="px-6 py-2 border border-slate-400 text-slate-200 rounded-lg hover:bg-slate-500/30 hover:border-slate-300 transition-all duration-200"
                >
                  Reject All
                </button>
                <button
                  onClick={acceptSelected}
                  className="px-6 py-2 bg-white text-slate-700 rounded-lg hover:bg-slate-100 transition-colors font-medium shadow-sm"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}