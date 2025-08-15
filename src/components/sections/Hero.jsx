import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { HiPlay, HiArrowRight, HiPlus } from 'react-icons/hi';
import { useRef, useEffect, useState } from 'react';

// Counter animation hook
const useCounter = (end, duration = 2000, shouldStart = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let start = 0;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration, shouldStart]);

  return count;
};

// Counter component
const AnimatedCounter = ({ end, suffix = '', prefix = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const count = useCounter(end, 2000, isInView);

  return (
    <div ref={ref} className="text-2xl sm:text-3xl font-bold text-white mb-2">
      {prefix}{count}{suffix}
    </div>
  );
};

// Desktop images
const heroImages = [
  {
    url: '/images/hero/hero1.jpg',
    alt: 'Modern bi-folding doors opening to garden',
    fallback: 'bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800'
  },
  {
    url: '/images/hero/hero2.jpg', 
    alt: 'Elegant glass sliding doors',
    fallback: 'bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900'
  },
  {
    url: '/images/hero/hero3.jpg',
    alt: 'Premium bi-folding door installation',
    fallback: 'bg-gradient-to-br from-slate-800 via-slate-900 to-black'
  },
  {
    url: '/images/hero/hero7.jpg',
    alt: 'Premium bi-folding door installation',
    fallback: 'bg-gradient-to-br from-slate-800 via-slate-900 to-black'
  },
  {
    url: '/images/hero/hero5.jpg',
    alt: 'Premium bi-folding door installation',
    fallback: 'bg-gradient-to-br from-slate-800 via-slate-900 to-black'
  },
  {
    url: '/images/hero/hero6.jpg',
    alt: 'Premium bi-folding door installation',
    fallback: 'bg-gradient-to-br from-slate-800 via-slate-900 to-black'
  },
  {
    url: '/images/hero/hero8.jpg',
    alt: 'Premium bi-folding door installation',
    fallback: 'bg-gradient-to-br from-slate-800 via-slate-900 to-black'
  }
];

// Mobile images - replace these with your mobile-specific images
const mobileHeroImages = [
  {
    url: '/images/mobile-hero-images/hero1.jpg',
    alt: 'Modern bi-folding doors - mobile view',
    fallback: 'bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800'
  },
  {
    url: '/images/mobile-hero-images/hero2.jpg', 
    alt: 'Elegant glass sliding doors - mobile view',
    fallback: 'bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900'
  },
  {
    url: '/images/mobile-hero-images/hero3.jpg',
    alt: 'Premium bi-folding door installation - mobile view',
    fallback: 'bg-gradient-to-br from-slate-800 via-slate-900 to-black'
  },
   {
    url: '/images/mobile-hero-images/hero4.jpg',
    alt: 'Premium bi-folding door installation - mobile view',
    fallback: 'bg-gradient-to-br from-slate-800 via-slate-900 to-black'
  },
   {
    url: '/images/mobile-hero-images/hero5.jpg',
    alt: 'Premium bi-folding door installation - mobile view',
    fallback: 'bg-gradient-to-br from-slate-800 via-slate-900 to-black'
  },
   {
    url: '/images/mobile-hero-images/hero6.jpg',
    alt: 'Premium bi-folding door installation - mobile view',
    fallback: 'bg-gradient-to-br from-slate-800 via-slate-900 to-black'
  },
   {
    url: '/images/mobile-hero-images/hero7.jpg',
    alt: 'Premium bi-folding door installation - mobile view',
    fallback: 'bg-gradient-to-br from-slate-800 via-slate-900 to-black'
  },

];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Use mobile or desktop images based on screen size
  const currentImages = isMobile ? mobileHeroImages : heroImages;

  // Auto-advance slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % currentImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentImages.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { y: 80, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        {currentImages.map((image, index) => (
          <motion.div
            key={`${isMobile ? 'mobile' : 'desktop'}-${index}`}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: index === currentImageIndex ? 1 : 0 
            }}
            transition={{ 
              duration: 1.5, 
              ease: "easeInOut" 
            }}
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-slate-800"
              style={{
                backgroundImage: `url(${image.url})`,
                backgroundPosition: isMobile ? 'center center' : 'center center'
              }}
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"></div>
          </motion.div>
        ))}

        {/* Slide Indicators */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {currentImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white shadow-lg' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-0">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen"
        >
          
          {/* Left Column - Text Content */}
          <div className="space-y-6 sm:space-y-8 text-left">
            <motion.div variants={itemVariants}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-4 sm:mb-6">
                CREATE YOUR SPACE WITH
                <span className="block text-slate-300">CASTLE CREW</span>
              </h1>
              
              <p className="text-base sm:text-lg lg:text-xl text-gray-200 leading-relaxed max-w-2xl">
                Create a space to call home with our stunning British made products including bifold & sliding doors, entrance doors, windows, glass roofs & much more.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <Link
                href="/contact"
                className="group bg-slate-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-slate-700 transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <span>GET FREE QUOTE</span>
                <HiArrowRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              {/* Mobile phone button */}
              <a
                href="tel:+447949821925"
                className="sm:hidden bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-slate-800 transition-all duration-300 flex items-center justify-center space-x-2 text-sm"
              >
                <span>CALL NOW</span>
              </a>
            </motion.div>

            {/* Stats Card - Mobile Version (shows below text) */}
            <motion.div variants={itemVariants} className="lg:hidden">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-w-md w-full mx-auto">
                <h3 className="text-xl font-bold text-white mb-4 text-center">SEE THE DIFFERENCE</h3>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <AnimatedCounter end={10} suffix="+" />
                    <div className="text-gray-300 font-medium text-xs">Years Experience</div>
                  </div>
                  
                  <div className="text-center">
                    <AnimatedCounter end={99} suffix="%" />
                    <div className="text-gray-300 font-medium text-xs">Happy Customers</div>
                  </div>
                  
                  <div className="text-center">
                    <AnimatedCounter end={17} suffix="K" />
                    <div className="text-gray-300 font-medium text-xs">Customer Service</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Stats Card (Desktop Only) */}
          <motion.div variants={itemVariants} className="hidden lg:flex lg:justify-end">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/20 max-w-md w-full mx-auto lg:mx-0">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">SEE THE DIFFERENCE</h3>
              
              <div className="space-y-6">
                <div className="text-center">
                  <AnimatedCounter end={10} suffix="+" />
                  <div className="text-gray-300 font-medium text-sm">Years Experience</div>
                </div>
                
                <div className="text-center">
                  <AnimatedCounter end={99} suffix="%" />
                  <div className="text-gray-300 font-medium text-sm">Happy Customers</div>
                </div>
                
                <div className="text-center">
                  <AnimatedCounter end={17} suffix="K" />
                  <div className="text-gray-300 font-medium text-sm">Customer Service</div>
                </div>
              </div>

              {/* Contact Widget - Desktop only */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/20">
                <div className="text-center">
                  <a 
                    href="tel:+447949821925" 
                    className="text-white font-bold text-lg hover:text-slate-300 transition-colors"
                  >
                    +44 7949 821925
                  </a>
                  <p className="text-xs text-gray-400 mt-1">Call for free consultation</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-8 z-20 hidden lg:block"
      >
        <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
}