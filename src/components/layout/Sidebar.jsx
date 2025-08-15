import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { HiX, HiChevronRight, HiChevronDown, HiHome, HiInformationCircle, HiCog, HiMail } from 'react-icons/hi';

const services = [
  { name: 'UPVC and Aluminium Casement Windows', href: '/services/Upvc & Aluminium Casement Windows' },
  { name: 'Bifolding Door', href: '/services/bifolding-doors' },
  { name: 'Sliding Door', href: '/services/sliding-door' },
  { name: 'Composite Doors', href: '/services/composite-doors' },
  { name: 'Tilt and Turn Windows', href: '/services/tilt-&-turn-windows' },
  { name: 'Roof Lanterns and Flat Glass', href: '/services/roof-lanterns-&-flat-glass' }
];

const navigationItems = [
  { name: 'Home', href: '/', icon: HiHome },
  { name: 'Services', href: '/services', icon: HiCog, isDropdown: true },
  { name: 'Contact', href: '/contact', icon: HiMail },
];

export default function Sidebar({ isOpen, onClose }) {
  const router = useRouter();
  const [servicesOpen, setServicesOpen] = useState(false);

  const sidebarVariants = {
    closed: {
      x: '-100%',
      transition: {
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.3
      }
    },
    open: {
      x: 0,
      transition: {
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.3
      }
    }
  };

  const itemVariants = {
    closed: { x: -50, opacity: 0 },
    open: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
        type: 'tween',
        ease: 'easeOut',
        duration: 0.3
      }
    })
  };

  const dropdownVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    },
    open: {
      height: 'auto',
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={sidebarVariants}
          className="fixed top-0 left-0 h-full w-80 backdrop-blur-xl bg-white/10 border-r border-white/20 shadow-2xl z-50 flex flex-col"
          style={{
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          }}
        >
          {/* Header with Glassmorphism */}
          <div className="flex items-center justify-between p-6 border-b border-white/20 flex-shrink-0 bg-white/5">
            <div className="flex items-center space-x-3">
              <div className="flex flex-col items-center">
                <div className="text-xl font-bold text-white mb-1 drop-shadow-lg">Castle Crew</div>
                <div className="flex items-center justify-center space-x-1">
                  <div className="w-4 h-3 bg-white/60 rounded-sm shadow-lg"></div>
                  <div className="w-4 h-3 bg-white/60 rounded-sm shadow-lg"></div>
                  <div className="w-4 h-3 bg-white/60 rounded-sm shadow-lg"></div>
                </div>
                <div className="text-sm text-white/80 mt-1 drop-shadow">glazing solutions</div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 backdrop-blur-sm border border-white/10"
            >
              <HiX className="w-6 h-6" />
            </button>
          </div>

          {/* Scrollable Navigation Area */}
          <div className="flex-1 overflow-y-auto">
            {/* Navigation */}
            <nav className="px-6 py-8">
              <ul className="space-y-3">
                {navigationItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = router.pathname === item.href;
                  const isServicesActive = router.pathname.startsWith('/services');
                  
                  return (
                    <motion.li
                      key={item.name}
                      custom={index}
                      variants={itemVariants}
                      initial="closed"
                      animate="open"
                    >
                      {item.isDropdown ? (
                        <>
                          {/* Services Main Link */}
                          <div className="flex rounded-xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-sm">
                            <Link
                              href={item.href}
                              onClick={onClose}
                              className={`flex items-center flex-1 px-4 py-3 transition-all duration-200 group ${
                                isActive
                                  ? 'bg-white/20 text-white'
                                  : 'text-white/90 hover:text-white hover:bg-white/10'
                              }`}
                            >
                              <div className="flex items-center space-x-3">
                                <Icon className={`w-5 h-5 ${
                                  isServicesActive ? 'text-white' : 'text-white/70 group-hover:text-white'
                                }`} />
                                <span className="font-medium">{item.name}</span>
                              </div>
                            </Link>
                            
                            {/* Dropdown Toggle Button */}
                            <button
                              onClick={() => setServicesOpen(!servicesOpen)}
                              className={`px-4 py-3 transition-all duration-200 border-l border-white/10 ${
                                isServicesActive
                                  ? 'bg-white/20 text-white'
                                  : 'text-white/90 hover:text-white hover:bg-white/10'
                              }`}
                            >
                              <motion.div
                                animate={{ rotate: servicesOpen ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <HiChevronDown className={`w-4 h-4 ${
                                  isServicesActive ? 'text-white' : 'text-white/70'
                                }`} />
                              </motion.div>
                            </button>
                          </div>

                          {/* Services Dropdown Menu */}
                          <AnimatePresence>
                            {servicesOpen && (
                              <motion.div
                                initial="closed"
                                animate="open"
                                exit="closed"
                                variants={dropdownVariants}
                                className="overflow-hidden"
                              >
                                <div className="ml-4 mt-3 space-y-2 bg-white/5 rounded-xl p-3 border border-white/10 backdrop-blur-sm">
                                  {services.map((service, serviceIndex) => {
                                    const isServiceActive = router.pathname === service.href;
                                    return (
                                      <Link
                                        key={service.name}
                                        href={service.href}
                                        onClick={onClose}
                                        className={`block px-4 py-3 rounded-lg text-sm transition-all duration-200 ${
                                          isServiceActive
                                            ? 'bg-white/20 text-white shadow-lg'
                                            : 'text-white/80 hover:text-white hover:bg-white/10'
                                        }`}
                                      >
                                        <div className="flex items-center justify-between">
                                          <span>{service.name}</span>
                                          <HiChevronRight className="w-3 h-3 opacity-60" />
                                        </div>
                                      </Link>
                                    );
                                  })}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <div className="rounded-xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-sm">
                          <Link
                            href={item.href}
                            onClick={onClose}
                            className={`flex items-center justify-between px-4 py-3 transition-all duration-200 group ${
                              isActive
                                ? 'bg-white/20 text-white'
                                : 'text-white/90 hover:text-white hover:bg-white/10'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <Icon className={`w-5 h-5 ${
                                isActive ? 'text-white' : 'text-white/70 group-hover:text-white'
                              }`} />
                              <span className="font-medium">{item.name}</span>
                            </div>
                            <HiChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                              isActive ? 'text-white' : 'text-white/70'
                            }`} />
                          </Link>
                        </div>
                      )}
                    </motion.li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* CTA Section - Enhanced Glassmorphism */}
          <div className="p-6 border-t border-white/20 bg-white/5 backdrop-blur-sm flex-shrink-0">
            <div className="space-y-3 mb-6">
              <Link
                href="/contact"
                onClick={onClose}
                className="block w-full bg-white/20 backdrop-blur-sm text-white text-center py-3 px-4 rounded-xl font-medium hover:bg-white/30 transition-all duration-300 border border-white/20 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Book An Appointment
              </Link>
              <Link
                href="/service-request"
                onClick={onClose}
                className="block w-full bg-slate-600/80 backdrop-blur-sm text-white text-center py-3 px-4 rounded-xl font-medium hover:bg-slate-600 transition-all duration-300 border border-white/10 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Service Request
              </Link>
            </div>
            
            {/* Contact Info Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center">
              <p className="text-sm text-white/90 mb-2 font-medium">
                Need Help? Call Us
              </p>
              <a 
                href="tel:+447949821925" 
                className="text-white hover:text-white/80 font-bold text-lg transition-colors duration-200 block"
              >
                +44 7949 821925
              </a>
              <p className="text-xs text-white/70 mt-2">
                Professional Installation Since 2007
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}