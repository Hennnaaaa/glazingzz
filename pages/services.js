import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Layout from '../src/components/layout/Layout';
import Services from '../src/components/sections/Services';
import { getCookie } from './_app';
import ReviewsSection from '../src/components/sections/Reviews';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5
};

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function ServicesPage() {
  const [userStats, setUserStats] = useState({
    viewedServicesCount: 0,
    isReturningUser: false,
    lastViewedService: null
  });

  useEffect(() => {
    // Get user stats for personalization
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
  }, []);

  return (
    <Layout 
      title="Professional Glazing Services - Castle Crew Glazing"
      description="Comprehensive glazing services including window installation, door replacement, glass repair, double glazing, and commercial glazing solutions."
    >
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        {/* Hero Section */}
        <section className="relative pt-32 pb-40 bg-slate-200 overflow-hidden">
          {/* Desktop Background Image (Original) */}
          <div className="absolute inset-0 hidden md:block">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-slate-800"
              style={{
                backgroundImage: `url('/images/hero/hero4.jpg')`
              }}
            />
            <div className="absolute inset-0 bg-slate-800/60"></div>
          </div>

          {/* Mobile Background Image (New) */}
          <div className="absolute inset-0 block md:hidden">
            <img 
              src="/images/mobile-hero-images/hero7.jpg" 
              alt="Castle Crew Glazing Professional Services"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-800/60"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Our <span className="text-slate-300">Services</span>
              </h1>
              <p className="text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed">
                Professional glazing solutions for your home and business.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Component */}
        <Services />

        {/* Process Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                Our Process
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-xl text-slate-600 max-w-3xl mx-auto">
                We follow a proven process to ensure every project is completed to the highest standards.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-4 gap-8"
            >
              {[
                {
                  step: "1",
                  title: "Consultation",
                  description: "Free on-site consultation to assess your needs and provide expert recommendations."
                },
                {
                  step: "2", 
                  title: "Design & Quote",
                  description: "Detailed design proposals with transparent pricing and no hidden costs."
                },
                {
                  step: "3",
                  title: "Installation",
                  description: "Professional installation by certified technicians using premium materials."
                },
                {
                  step: "4",
                  title: "Support",
                  description: "Ongoing support and maintenance with comprehensive warranty coverage."
                }
              ].map((process, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center relative"
                >
                  <div className="w-16 h-16 bg-slate-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                    {process.step}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">{process.title}</h3>
                  <p className="text-slate-600">{process.description}</p>
                  
                  {/* Connector line */}
                  {index < 3 && (
                    <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-slate-200 -z-10"></div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <ReviewsSection/>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-r from-slate-600 to-slate-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="space-y-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold">
                Transform Your Space Today
              </h2>
              
              <p className="text-xl text-slate-200">
                Ready to upgrade your home with premium glazing solutions? Contact our experts for a free consultation and quote.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="tel:+447949821925"
                  className="bg-white text-slate-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300"
                >
                  Call Now: +44 7949 821925
                </a>
                <a
                  href="/contact"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-slate-600 transition-all duration-300"
                >
                  Get Free Quote
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/20">
                <div className="text-center">
                  <h4 className="font-semibold mb-2">Free Consultation</h4>
                  <p className="text-slate-200 text-sm">No obligation site visit and expert advice</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold mb-2">Professional Installation</h4>
                  <p className="text-slate-200 text-sm">Certified technicians and quality guarantee</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold mb-2">Comprehensive Warranty</h4>
                  <p className="text-slate-200 text-sm">Long-term protection and peace of mind</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </Layout>
  );
}