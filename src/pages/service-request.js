import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import emailjs from '@emailjs/browser';
import { getCookie, setCookie } from './_app';

// Updated EmailJS Configuration for 2-Template System
const EMAILJS_SERVICE_ID = "service_quqtdya";
const EMAILJS_SERVICE_TEMPLATE_ID = "template_service"; // Template 2: Service Request
const EMAILJS_PUBLIC_KEY = "O1coNnj1gvEVdnioN";

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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const services = [
  { id: 'window-installation', name: 'Window Installation', icon: '🪟' },
  { id: 'door-replacement', name: 'Door Replacement', icon: '🚪' },
  { id: 'glass-repair', name: 'Glass Repair', icon: '🔧' },
  { id: 'double-glazing', name: 'Double Glazing', icon: '🏠' },
  { id: 'commercial-glazing', name: 'Commercial Glazing', icon: '🏢' },
  { id: 'emergency-repair', name: 'Emergency Repair', icon: '🚨' }
];

const urgencyLevels = [
  { id: 'low', name: 'Within 2 weeks', color: 'bg-green-50 border-green-200 text-green-800' },
  { id: 'medium', name: 'Within 1 week', color: 'bg-yellow-50 border-yellow-200 text-yellow-800' },
  { id: 'high', name: 'Within 3 days', color: 'bg-orange-50 border-orange-200 text-orange-800' },
  { id: 'urgent', name: 'Within 24 hours', color: 'bg-red-50 border-red-200 text-red-800' }
];

export default function ServiceRequestPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postcode: '',
    services: [],
    urgency: '',
    description: '',
    budget: '',
    preferredContact: 'email'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  // Auto-save form data
  useEffect(() => {
    const timer = setTimeout(() => {
      if (Object.values(formData).some(value => 
        Array.isArray(value) ? value.length > 0 : value.toString().trim() !== ''
      )) {
        setCookie('serviceRequestDraft', JSON.stringify(formData), 7);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [formData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const handleServiceToggle = (serviceId) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(s => s !== serviceId)
        : [...prev.services, serviceId]
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.postcode.trim()) newErrors.postcode = 'Postcode is required';
    if (formData.services.length === 0) newErrors.services = 'Please select at least one service';
    if (!formData.urgency) newErrors.urgency = 'Please select urgency level';
    if (!formData.description.trim()) newErrors.description = 'Please provide project details';

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      const firstErrorField = document.querySelector('.border-red-500');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Initialize EmailJS
      emailjs.init(EMAILJS_PUBLIC_KEY);

      // Format services list
      const selectedServices = formData.services.map(serviceId => {
        const service = services.find(s => s.id === serviceId);
        return service ? service.name : serviceId;
      }).join(', ');

      // Format urgency
      const urgencyText = urgencyLevels.find(u => u.id === formData.urgency)?.name || formData.urgency;

      // Format budget
      const budgetText = formData.budget ? (() => {
        switch(formData.budget) {
          case 'under-1000': return 'Under £1,000';
          case '1000-2500': return '£1,000 - £2,500';
          case '2500-5000': return '£2,500 - £5,000';
          case '5000-10000': return '£5,000 - £10,000';
          case 'over-10000': return 'Over £10,000';
          default: return formData.budget;
        }
      })() : 'Not specified';

      // Format preferred contact
      const contactMethod = (() => {
        switch(formData.preferredContact) {
          case 'email': return 'Email';
          case 'phone': return 'Phone Call';
          case 'text': return 'Text Message';
          case 'any': return 'Any Method';
          default: return formData.preferredContact;
        }
      })();

      // Prepare detailed email data for service request
      const emailData = {
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postcode: formData.postcode,
        services: selectedServices,
        urgency: urgencyText,
        urgency_level: formData.urgency, // for CSS class in template
        budget: budgetText,
        preferred_contact: contactMethod,
        description: formData.description,
        to_email: 'info@castlecrewglazing.co.uk',
        reply_to: formData.email
      };

      // Send email using service request template
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_SERVICE_TEMPLATE_ID,
        emailData
      );

      console.log('Service request sent successfully:', result);
      setSubmitStatus('success');
      
      // Clear saved draft
      setCookie('serviceRequestDraft', '', -1);
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          postcode: '',
          services: [],
          urgency: '',
          description: '',
          budget: '',
          preferredContact: 'email'
        });
      }, 3000);

    } catch (error) {
      console.error('Service request submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success/Error Messages
  if (submitStatus === 'success') {
    return (
      <Layout title="Request Submitted - Castle Crew Glazing">
        <motion.div
          initial="initial"
          animate="in"
          variants={pageVariants}
          transition={pageTransition}
          className="min-h-screen bg-gray-50 py-8 px-4"
        >
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Service Request Submitted Successfully!
            </h1>
            
            <p className="text-lg text-slate-600 mb-8">
              Thank you for choosing Castle Crew Glazing. We've received your service request and will contact you within 2 hours during business hours.
            </p>
            
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="font-semibold text-slate-800 mb-3">What happens next?</h3>
              <ul className="text-sm text-slate-600 space-y-2">
                <li>✅ We'll review your requirements</li>
                <li>📞 Schedule a free consultation</li>
                <li>📋 Provide a detailed quote</li>
                <li>🔨 Begin your project</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <a
                href="/"
                className="inline-block bg-slate-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors"
              >
                Return to Homepage
              </a>
              <p className="text-sm text-slate-500">
                Need immediate assistance? Call us at{' '}
                <a href="tel:+447949821925" className="text-slate-600 font-semibold hover:underline">
                  +44 7949 821925
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </Layout>
    );
  }

  if (submitStatus === 'error') {
    return (
      <Layout title="Error - Castle Crew Glazing">
        <motion.div
          initial="initial"
          animate="in"
          variants={pageVariants}
          transition={pageTransition}
          className="min-h-screen bg-gray-50 py-8 px-4"
        >
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            
            <h1 className="text-3xl font-bold text-slate-800 mb-4">Something went wrong</h1>
            <p className="text-lg text-slate-600 mb-8">
              We're sorry, but there was an error submitting your service request. Please try again or contact us directly.
            </p>
            
            <div className="space-y-4">
              <button
                onClick={() => setSubmitStatus(null)}
                className="bg-slate-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors"
              >
                Try Again
              </button>
              <p className="text-sm text-slate-500">
                Or call us directly at{' '}
                <a href="tel:+447949821925" className="text-slate-600 font-semibold hover:underline">
                  +44 7949 821925
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </Layout>
    );
  }

  return (
    <Layout
      title="Request Service - Castle Crew Glazing"
      description="Request professional glazing services from Castle Crew Glazing. Get a free quote for window installation, door replacement, glass repair, and more."
    >
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        {/* Hero Section */}
        <section className="relative py-12 md:py-20 bg-gradient-to-r from-slate-600 to-slate-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
                Request Your Service
              </h1>
              <p className="text-lg md:text-xl text-slate-200 mb-6 md:mb-8 max-w-2xl mx-auto">
                Get started with your glazing project today. Fill out our form and receive a personalized quote within 24 hours.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-8 md:py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                
                {/* Personal Information */}
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                >
                  <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-6">Personal Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 ${
                          errors.firstName ? 'border-red-500' : 'border-slate-300'
                        }`}
                        placeholder="Enter your first name"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 ${
                          errors.lastName ? 'border-red-500' : 'border-slate-300'
                        }`}
                        placeholder="Enter your last name"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 ${
                          errors.email ? 'border-red-500' : 'border-slate-300'
                        }`}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 ${
                          errors.phone ? 'border-red-500' : 'border-slate-300'
                        }`}
                        placeholder="+44 7949 821925"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Property Information */}
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-6">Property Information</h3>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Property Address *
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 ${
                        errors.address ? 'border-red-500' : 'border-slate-300'
                      }`}
                      placeholder="123 Main Street"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 ${
                          errors.city ? 'border-red-500' : 'border-slate-300'
                        }`}
                        placeholder="London"
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Postcode *
                      </label>
                      <input
                        type="text"
                        value={formData.postcode}
                        onChange={(e) => handleInputChange('postcode', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 ${
                          errors.postcode ? 'border-red-500' : 'border-slate-300'
                        }`}
                        placeholder="SW1A 1AA"
                      />
                      {errors.postcode && (
                        <p className="text-red-500 text-sm mt-1">{errors.postcode}</p>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Service Requirements */}
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-6">Service Requirements</h3>

                  {/* Services */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-slate-700 mb-4">
                      Services Needed * {errors.services && <span className="text-red-500">({errors.services})</span>}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                      {services.map((service) => (
                        <div
                          key={service.id}
                          onClick={() => handleServiceToggle(service.id)}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                            formData.services.includes(service.id)
                              ? 'border-slate-500 bg-slate-50 shadow-md'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="text-center">
                            <div className="text-2xl md:text-3xl mb-2">{service.icon}</div>
                            <div className="font-semibold text-slate-800 text-sm md:text-base">{service.name}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Urgency */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-slate-700 mb-4">
                      Urgency Level * {errors.urgency && <span className="text-red-500">({errors.urgency})</span>}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                      {urgencyLevels.map((level) => (
                        <div
                          key={level.id}
                          onClick={() => handleInputChange('urgency', level.id)}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                            formData.urgency === level.id
                              ? 'border-slate-500 bg-slate-50 shadow-md'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${level.color} mb-2`}>
                            {level.id.toUpperCase()}
                          </div>
                          <div className="font-semibold text-slate-800">{level.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Project Description * {errors.description && <span className="text-red-500">({errors.description})</span>}
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={5}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 ${
                        errors.description ? 'border-red-500' : 'border-slate-300'
                      }`}
                      placeholder="Please describe your project requirements, including dimensions, specific needs, current issues, and any other relevant details..."
                    />
                  </div>

                  {/* Budget & Contact Preference */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Estimated Budget (Optional)
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => handleInputChange('budget', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                      >
                        <option value="">Select budget range</option>
                        <option value="under-1000">Under £1,000</option>
                        <option value="1000-2500">£1,000 - £2,500</option>
                        <option value="2500-5000">£2,500 - £5,000</option>
                        <option value="5000-10000">£5,000 - £10,000</option>
                        <option value="over-10000">Over £10,000</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Preferred Contact Method
                      </label>
                      <select
                        value={formData.preferredContact}
                        onChange={(e) => handleInputChange('preferredContact', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                      >
                        <option value="email">Email</option>
                        <option value="phone">Phone Call</option>
                        <option value="text">Text Message</option>
                        <option value="any">Any Method</option>
                      </select>
                    </div>
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.3 }}
                  className="pt-6"
                >
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto flex items-center justify-center space-x-2 bg-slate-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-slate-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Service Request</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </>
                    )}
                  </button>
                </motion.div>
              </form>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center"
            >
              <h3 className="text-2xl font-bold text-slate-800 mb-8 md:mb-12">
                Why Choose Castle Crew Glazing?
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-lg md:text-xl font-semibold text-slate-800 mb-2">Certified Professionals</h4>
                  <p className="text-slate-600 text-sm md:text-base">Fully qualified and insured glazing specialists with years of experience.</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-lg md:text-xl font-semibold text-slate-800 mb-2">Fast Response</h4>
                  <p className="text-slate-600 text-sm md:text-base">Quick response times with emergency services available 24/7.</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h4 className="text-lg md:text-xl font-semibold text-slate-800 mb-2">Customer Satisfaction</h4>
                  <p className="text-slate-600 text-sm md:text-base">100% satisfaction guarantee with comprehensive warranty coverage.</p>
                </div>
              </div>

              <div className="mt-8 md:mt-12 p-6 bg-slate-50 rounded-lg">
                <h4 className="text-lg font-semibold text-slate-800 mb-4">Need Help with Your Request?</h4>
                <p className="text-slate-600 mb-4 text-sm md:text-base">
                  Our friendly team is here to assist you every step of the way.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                  <a
                    href="tel:+447949821925"
                    className="flex items-center space-x-2 bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-700 transition-all duration-300 w-full sm:w-auto justify-center"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>Call: +44 7949 821925</span>
                  </a>
                  <a
                    href="mailto:info@castlecrewglazing.co.uk"
                    className="flex items-center space-x-2 border-2 border-slate-600 text-slate-600 px-6 py-3 rounded-lg font-semibold hover:bg-slate-600 hover:text-white transition-all duration-300 w-full sm:w-auto justify-center"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>Email Us</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h3 className="text-2xl font-bold text-slate-800 text-center mb-8 md:mb-12">
                Frequently Asked Questions
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-slate-800 mb-2">How quickly will I receive a quote?</h4>
                  <p className="text-slate-600 text-sm">
                    We aim to provide detailed quotes within 24 hours of receiving your request. For urgent projects, we can often provide preliminary estimates within 2-4 hours.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-slate-800 mb-2">Is the consultation really free?</h4>
                  <p className="text-slate-600 text-sm">
                    Yes, absolutely! Our initial consultation and site visit are completely free with no obligation. We'll assess your needs and provide expert recommendations at no cost.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-slate-800 mb-2">Do you provide emergency services?</h4>
                  <p className="text-slate-600 text-sm">
                    Yes, we offer 24/7 emergency glazing services for urgent repairs such as broken windows, damaged doors, or security issues.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-slate-800 mb-2">What areas do you cover?</h4>
                  <p className="text-slate-600 text-sm">
                    We serve the greater London area and surrounding counties. Contact us to confirm if we cover your specific location.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </Layout>
  );
}