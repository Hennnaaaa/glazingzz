import { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Reviews from '@/components/sections/Reviews';
import { HiCheckCircle, HiShieldCheck, HiLightningBolt, HiStar, HiExclamationCircle } from 'react-icons/hi';

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

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = [
    'UPVC and Aluminium Casement',
    'Bifolding Doors',
    'Sliding Doors',
    'Composite Doors',
    'Tilt and Turn Windows',
    'Roof Lanterns and Flat Glass'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'contact',
          formData: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || 'Not provided',
            subject: `Free Estimate Request - ${formData.service || 'General Inquiry'}`,
            message: `Service Required: ${formData.service}\n\nProject Details:\n${formData.message}\n\nPhone: ${formData.phone || 'Not provided'}`,
            source: 'Homepage Form'
          }
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({
          type: 'success',
          message: 'Thank you! Your estimate request has been sent. We\'ll get back to you within 24 hours.'
        });
        
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: ''
        });
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus({
        type: 'error',
        message: 'Sorry, there was an error. Please try again or call us at +44 7949 821925.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout 
      title="Castle Crew Glazing - Transform Your Home | British Made Quality"
      description="Create your perfect space with Castle Crew Glazing. British made, nationwide installation. Premium sliding doors, windows & glass solutions since 2007."
    >
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <Hero />
        
        {/* Services Preview */}
        <Services preview={true} />
        

        {/* Product Showcase */}
        <section className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
          <div className="container-wide">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            >
              {/* Left Content */}
              <div className="space-y-6">
                <motion.div variants={fadeInUp}>
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    Premium Bi-Folding
                    <span className="block text-slate-400">Door Solutions</span>
                  </h2>
                  <p className="text-xl text-gray-300 leading-relaxed mb-6">
                    Create seamless indoor-outdoor living with our carefully crafted bi-fold doors. Designed for contemporary elegance with smooth operation and enhanced natural light flow. Available in stock colors (White, Anthracite Grey, Black) or any RAL color to match your design vision.
                  </p>
                </motion.div>

                <motion.div variants={fadeInUp} className="space-y-3">
                  {[
                    "Energy efficient double & triple glazing",
                    "Smooth operating hardware systems", 
                    "Wide range of colors & finishes",
                    "Fully weatherproof & secure"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <HiCheckCircle className="w-6 h-6 text-slate-400 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </motion.div>

                <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a
                    href="/quote"
                    className="btn-secondary inline-flex items-center justify-center"
                  >
                    Get Quote
                  </a>
                </motion.div>
              </div>

              {/* Right Image */}
              <motion.div
                variants={fadeInUp}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <div className="aspect-[4/3] bg-gradient-to-br from-slate-600 to-slate-700">
                    <img 
                      src="/images/services/bifolding-doors/gallery-2.jpg" 
                      alt="Premium Bifolding Doors by Castle Crew Glazing" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Get Free Estimate Section */}
        <section className="py-16 bg-gradient-to-br from-slate-100 to-slate-50">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              
              {/* Left Content */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="space-y-6"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-slate-800">
                  Get Your Free
                  <span className="block text-slate-600">Estimate Today</span>
                </h2>
                <p className="text-xl text-slate-600 leading-relaxed">
                  Ready to transform your space? Get a personalized quote for your glazing project. 
                  Our experts will provide detailed pricing and professional advice at no cost.
                </p>
                
                <div className="space-y-3">
                  {[
                    "Free on-site consultation",
                    "Detailed project assessment",
                    "Transparent, no-obligation pricing",
                    "Expert design recommendations"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <HiCheckCircle className="w-6 h-6 text-slate-600 flex-shrink-0" />
                      <span className="text-slate-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right Form */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-white rounded-2xl shadow-xl p-6"
              >
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Request Your Free Estimate</h3>
                
                {status.message && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`flex items-center space-x-3 p-4 rounded-lg mb-4 ${
                      status.type === 'success' 
                        ? 'bg-green-50 border border-green-200 text-green-800'
                        : 'bg-red-50 border border-red-200 text-red-800'
                    }`}
                  >
                    {status.type === 'success' ? (
                      <HiCheckCircle className="w-5 h-5 flex-shrink-0" />
                    ) : (
                      <HiExclamationCircle className="w-5 h-5 flex-shrink-0" />
                    )}
                    <p className="text-sm">{status.message}</p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors"
                        placeholder="Your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Service Required *
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors"
                      >
                        <option value="">Select a service</option>
                        {services.map((service) => (
                          <option key={service} value={service}>{service}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Project Details
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors resize-none"
                      placeholder="Tell us about your project requirements..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                      isSubmitting
                        ? 'bg-slate-400 text-slate-200 cursor-not-allowed'
                        : 'bg-slate-600 text-white hover:bg-slate-700'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-slate-300 border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending Request...</span>
                      </span>
                    ) : (
                      'Get My Free Estimate'
                    )}
                  </button>

                  <p className="text-xs text-slate-500 text-center">
                    By submitting this form, you agree to be contacted by Castle Crew Glazing about your project.
                  </p>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

       <Reviews/>

        {/* Process Section */}
        <section className="py-16 bg-white">
          <div className="container-wide">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                Our Simple Process
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-xl text-slate-600 max-w-3xl mx-auto">
                From initial consultation to final installation, we make the process smooth and stress-free.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-4 gap-6"
            >
              {[
                {
                  step: "01",
                  title: "Free Consultation",
                  description: "We visit your home to understand your needs and provide expert advice."
                },
                {
                  step: "02", 
                  title: "Design & Quote",
                  description: "Custom design solutions with detailed, transparent pricing."
                },
                {
                  step: "03",
                  title: "Manufacturing",
                  description: "Your doors are precision-made in our British facilities."
                },
                {
                  step: "04",
                  title: "Installation",
                  description: "Professional installation by our certified technicians."
                }
              ].map((process, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center relative"
                >
                  <div className="w-16 h-16 bg-slate-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {process.step}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{process.title}</h3>
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
      </motion.div>
    </Layout>
  );
}