import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import ContactForm from '@/components/sections/ContactForm';
import { HiPhone, HiMail, HiLocationMarker, HiClock, HiCheckCircle } from 'react-icons/hi';

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
      staggerChildren: 0.1
    }
  }
};

export default function Contact() {
  const contactInfo = [
    {
      icon: HiPhone,
      title: 'Phone',
      details: ['+44 7949 821925'],
      subtitle: 'Call us anytime',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: HiMail,
      title: 'Email',
      details: ['info@castlecrewglazing.co.uk'],
      subtitle: 'We reply within 24 hours',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: HiLocationMarker,
      title: 'Address',
      details: ['16 Industrial Estate', 'Welwyn Garden, AL7 4ST'],
      subtitle: 'Visit our location',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: HiClock,
      title: 'Business Hours',
      details: ['Mon-Sat: 8:00 AM - 6:00 PM', 'Sun: Closed'],
      subtitle: 'Flexible scheduling available',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const whyChooseUs = [
    'Free on-site consultation and measurements',
    'Transparent pricing with no hidden costs',
    'British made products and materials',
    'Professional certified installation team',
    'Comprehensive warranty coverage',
    'Emergency glazing service available'
  ];

  return (
    <Layout 
      title="Contact Us - Castle Crew Glazing"
      description="Get in touch with Castle Crew Glazing for your glazing needs. Free quotes, expert consultation, and professional glazing services."
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
              alt="Castle Crew Glazing Contact"
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
                Get In <span className="text-slate-300">Touch</span>
              </h1>
              <p className="text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
                Ready to transform your space with premium glazing solutions? 
                Contact Castle Crew Glazing for a free consultation and quote.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="bg-slate-50 rounded-xl p-6 text-center hover:bg-white hover:shadow-lg transition-all duration-300 border border-slate-100"
                  >
                    <div className={`w-12 h-12 ${item.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">{item.title}</h3>
                    <div className="space-y-1 mb-2">
                      {item.details.map((detail, idx) => (
                        <p key={idx} className="text-slate-600 text-sm">{detail}</p>
                      ))}
                    </div>
                    <p className={`text-xs font-medium ${item.color}`}>{item.subtitle}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Main Contact Section */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <ContactForm />
              </motion.div>

              {/* Right Side Information */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                
                {/* Why Choose Us */}
                <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-800 mb-6">Why Choose Castle Crew Glazing?</h3>
                  <div className="space-y-3">
                    {whyChooseUs.map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <HiCheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-600 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Service Areas - REMOVED */}

                {/* Quick Contact */}
                <div className="bg-slate-600 text-white rounded-xl p-8">
                  <h3 className="text-xl font-bold mb-4">Need Immediate Help?</h3>
                  <p className="text-slate-200 mb-6">
                    For urgent glazing requirements or emergency repairs, 
                    call us directly for immediate assistance.
                  </p>
                  <div className="space-y-3">
                    <a
                      href="tel:+447949821925"
                      className="inline-flex items-center space-x-2 bg-white text-slate-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors w-full justify-center"
                    >
                      <HiPhone className="w-5 h-5" />
                      <span>Call +44 7949 821925</span>
                    </a>
                    <p className="text-center text-slate-300 text-sm">
                      Available Mon-Sat • Emergency service available
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 bg-gradient-to-r from-slate-600 to-slate-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to Start Your Project?
              </h2>
              
              <p className="text-xl text-slate-200">
                Get your free quote today and discover why Castle Crew Glazing is the preferred choice for premium glazing solutions.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="mailto:info@castlecrewglazing.co.uk"
                  className="bg-white text-slate-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300"
                >
                  Send Email
                </a>
                <span className="text-slate-300 font-medium">or</span>
                <a
                  href="tel:+447949821925"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-slate-600 transition-all duration-300"
                >
                  Call Now
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </Layout>
  );
}