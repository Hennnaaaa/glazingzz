import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { HiMenu, HiPhone, HiX } from 'react-icons/hi';
import { getCookie } from '../../pages/_app';

export default function Header({ onMenuClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [userStats, setUserStats] = useState({
    viewedServicesCount: 0,
    isReturningUser: false,
    lastViewedService: null
  });
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Get user stats from cookies
    const viewedServices = getCookie('viewedServices');
    const pageViews = getCookie('pageViews');
    const lastViewedService = getCookie('lastViewedService');
    
    if (viewedServices) {
      const viewed = JSON.parse(viewedServices);
      setUserStats({
        viewedServicesCount: viewed.length,
        isReturningUser: pageViews && parseInt(pageViews) > 1,
        lastViewedService: lastViewedService
      });
    }
  }, [router.asPath]);

  return (
    <>
      {/* Top Bar - Hide on mobile and when scrolled */}
      <div className={`hidden lg:block transition-all duration-500 ${
        scrolled ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 h-auto'
      }`}>
        <div className="bg-slate-900 text-white text-sm py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <span className="text-slate-400 font-medium">Premium Glass Solutions</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-300">UK-based</span>
              <span className="text-slate-400">24/7</span>
              <span className="text-slate-300">Glazing Squad</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="tel:+447949821925" className="hover:text-slate-400 transition-colors">
               +44 7949 821925
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200/20' 
            : 'bg-transparent'
        }`}
        style={{ 
          marginTop: scrolled ? '0' : typeof window !== 'undefined' && window.innerWidth >= 1024 ? '40px' : '0'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Menu Button - Left Side */}
            <button
              onClick={onMenuClick}
              className={`flex flex-col items-center justify-center p-2 transition-colors ${
                scrolled ? 'text-slate-800 hover:text-slate-600' : 'text-white hover:text-slate-300'
              }`}
            >
              <div className="space-y-1">
                <div className="w-5 sm:w-6 h-0.5 bg-current"></div>
                <div className="w-5 sm:w-6 h-0.5 bg-current"></div>
                <div className="w-5 sm:w-6 h-0.5 bg-current"></div>
              </div>
              <span className="text-xs mt-1 font-medium hidden sm:block">MENU</span>
            </button>

            {/* Logo - Center */}
            <Link href="/" className="flex flex-col items-center">
              <div className="text-center">
                <div className={`text-lg sm:text-2xl font-bold ${scrolled ? 'text-slate-800' : 'text-white'}`}>
                  Castle Crew
                </div>
                <div className="flex items-center justify-center space-x-1">
                  <div className={`w-4 sm:w-6 h-3 sm:h-4 ${scrolled ? 'bg-slate-600' : 'bg-slate-400'} rounded-sm`}></div>
                  <div className={`w-4 sm:w-6 h-3 sm:h-4 ${scrolled ? 'bg-slate-600' : 'bg-slate-400'} rounded-sm`}></div>
                  <div className={`w-4 sm:w-6 h-3 sm:h-4 ${scrolled ? 'bg-slate-600' : 'bg-slate-400'} rounded-sm`}></div>
                </div>
                <div className={`text-xs sm:text-sm ${scrolled ? 'text-slate-600' : 'text-white/90'}`}>
                  glazing solutions
                </div>
              </div>
            </Link>

            {/* Right Side - CTA Buttons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Phone button for mobile */}
              <a
                href="tel:+447949821925"
                className={`md:hidden flex items-center justify-center p-2 transition-colors ${
                  scrolled ? 'text-slate-800 hover:text-slate-600' : 'text-white hover:text-slate-300'
                }`}
              >
                <HiPhone className="w-5 h-5" />
              </a>

              {/* CTA Buttons - Desktop */}
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  href="/contact"
                  className="px-3 sm:px-4 py-2 bg-slate-500 text-white text-xs sm:text-sm font-medium rounded hover:bg-slate-600 transition-colors"
                >
                  REQUEST QUOTE
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.header>
    </>
  );
}