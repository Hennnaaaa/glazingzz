import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { getCookie, setCookie } from './_app';

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

const services = [
  { id: 'window-installation', name: 'Window Installation', icon: '🪟' },
  { id: 'door-replacement', name: 'Door Replacement', icon: '🚪' },
  { id: 'glass-repair', name: 'Glass Repair', icon: '🔧' },
  { id: 'double-glazing', name: 'Double Glazing', icon: '🏠' },
  { id: 'commercial-glazing', name: 'Commercial Glazing', icon: '🏢' },
  { id: 'emergency-repair', name: 'Emergency Repair', icon: '🚨' },
  { id: 'conservatory', name: 'Conservatory Work', icon: '🌿' },
  { id: 'skylight', name: 'Skylight Installation', icon: '☀️' }
];

const urgencyLevels = [
  { id: 'low', name: 'Low - Within 2 weeks', color: 'bg-green-100 text-green-800' },
  { id: 'medium', name: 'Medium - Within 1 week', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'high', name: 'High - Within 3 days', color: 'bg-orange-100 text-orange-800' },
  { id: 'urgent', name: 'Urgent - Within 24 hours', color: 'bg-red-100 text-red-800' }
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
    preferredContact: 'email',
    preferredTime: '',
    hearAboutUs: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Pre-fill form if user has previously visited
    const savedData = getCookie('serviceRequestDraft');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        console.log('Error parsing saved form data');
      }
    }
  }, []);

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

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
    }

    if (step === 2) {
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.postcode.trim()) newErrors.postcode = 'Postcode is required';
    }

    if (step === 3) {
      if (formData.services.length === 0) newErrors.services = 'Please select at least one service';
      if (!formData.urgency) newErrors.urgency = 'Please select urgency level';
      if (!formData.description.trim()) newErrors.description = 'Please provide project details';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(3)) {
      setCurrentStep(3);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear saved draft
      setCookie('serviceRequestDraft', '', -1);
      
      setSubmitStatus('success');
      setCurrentStep(4);
      
      // Reset form
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
          preferredContact: 'email',
          preferredTime: '',
          hearAboutUs: ''
        });
      }, 3000);
      
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.h3 variants={fadeInUp} className="text-2xl font-bold text-slate-800 mb-8">
              Personal Information
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={fadeInUp}>
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
              </motion.div>

              <motion.div variants={fadeInUp}>
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
              </motion.div>
            </div>

            <motion.div variants={fadeInUp}>
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
            </motion.div>

            <motion.div variants={fadeInUp}>
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
            </motion.div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.h3 variants={fadeInUp} className="text-2xl font-bold text-slate-800 mb-8">
              Property Information
            </motion.h3>

            <motion.div variants={fadeInUp}>
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
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={fadeInUp}>
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
              </motion.div>

              <motion.div variants={fadeInUp}>
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
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={fadeInUp}>
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
              </motion.div>

              <motion.div variants={fadeInUp}>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Best Time to Contact
                </label>
                <select
                  value={formData.preferredTime}
                  onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                >
                  <option value="">Select preferred time</option>
                  <option value="morning">Morning (9am - 12pm)</option>
                  <option value="afternoon">Afternoon (12pm - 5pm)</option>
                  <option value="evening">Evening (5pm - 7pm)</option>
                  <option value="anytime">Anytime</option>
                </select>
              </motion.div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.h3 variants={fadeInUp} className="text-2xl font-bold text-slate-800 mb-8">
              Service Requirements
            </motion.h3>

            <motion.div variants={fadeInUp}>
              <label className="block text-sm font-semibold text-slate-700 mb-4">
                Services Needed * {errors.services && <span className="text-red-500">({errors.services})</span>}
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                      <div className="text-3xl mb-2">{service.icon}</div>
                      <div className="font-semibold text-slate-800">{service.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <label className="block text-sm font-semibold text-slate-700 mb-4">
                Urgency Level * {errors.urgency && <span className="text-red-500">({errors.urgency})</span>}
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${level.color} mb-2`}>
                      {level.id.toUpperCase()}
                    </div>
                    <div className="font-semibold text-slate-800">{level.name}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Project Description * {errors.description && <span className="text-red-500">({errors.description})</span>}
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={6}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 ${
                  errors.description ? 'border-red-500' : 'border-slate-300'
                }`}
                placeholder="Please describe your project requirements, including dimensions, specific needs, current issues, and any other relevant details..."
              />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={fadeInUp}>
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
              </motion.div>

              <motion.div variants={fadeInUp}>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  How did you hear about us?
                </label>
                <select
                  value={formData.hearAboutUs}
                  onChange={(e) => handleInputChange('hearAboutUs', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                >
                  <option value="">Select an option</option>
                  <option value="google">Google Search</option>
                  <option value="social-media">Social Media</option>
                  <option value="referral">Friend/Family Referral</option>
                  <option value="previous-customer">Previous Customer</option>
                  <option value="local-ad">Local Advertisement</option>
                  <option value="other">Other</option>
                </select>
              </motion.div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-center space-y-6"
          >
            {submitStatus === 'success' ? (
              <>
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-slate-800">Request Submitted Successfully!</h3>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                  Thank you for choosing Castle Crew Glazing. We've received your service request and will contact you within 2 hours during business hours.
                </p>
                <div className="bg-slate-50 p-6 rounded-lg max-w-md mx-auto">
                  <h4 className="font-semibold text-slate-800 mb-2">What happens next?</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• We'll review your requirements</li>
                    <li>• Schedule a free consultation</li>
                    <li>• Provide a detailed quote</li>
                    <li>• Begin your project</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <a
                    href="/"
                    className="inline-block bg-slate-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-700 transition-duration-300"
                  >
                    Return to Homepage
                  </a>
                  <p className="text-sm text-slate-500">
                    Need immediate assistance? Call us at{' '}
                    <a href="tel:+447949821925" className="text-slate-600 font-semibold">
                      +44 7949 821925
                    </a>
                  </p>
                </div>
              </>
            ) : submitStatus === 'error' ? (
              <>
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-slate-800">Something went wrong</h3>
                <p className="text-xl text-slate-600">
                  We're sorry, but there was an error submitting your request. Please try again or contact us directly.
                </p>
                <div className="space-y-4">
                  <button
                    onClick={() => {
                      setSubmitStatus(null);
                      setCurrentStep(3);
                    }}
                    className="bg-slate-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-700 transition-duration-300"
                  >
                    Try Again
                  </button>
                  <p className="text-sm text-slate-500">
                    Or call us directly at{' '}
                    <a href="tel:+447949821925" className="text-slate-600 font-semibold">
                      +44 7949 821925
                    </a>
                  </p>
                </div>
              </>
            ) : null}
          </motion.div>
        );

      default:
        return null;
    }
  };

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
        <section className="relative py-20 bg-gradient-to-r from-slate-600 to-slate-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Request Your Service
              </h1>
              <p className="text-xl text-slate-200 mb-8 max-w-2xl mx-auto">
                Get started with your glazing project today. Fill out our detailed form and receive a personalized quote within 24 hours.
              </p>
              
              {/* Progress Steps */}
              <div className="flex justify-center items-center space-x-4 mb-8">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      step <= currentStep 
                        ? 'bg-white text-slate-600' 
                        : 'bg-slate-500 text-slate-300'
                    }`}>
                      {step < currentStep ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        step
                      )}
                    </div>
                    {step < 4 && (
                      <div className={`w-16 h-1 mx-2 ${
                        step < currentStep ? 'bg-white' : 'bg-slate-500'
                      }`}></div>
                    )}
                  </div>
                ))}
              </div>

              <div className="text-sm text-slate-300">
                Step {currentStep} of 4: {
                  currentStep === 1 ? 'Personal Information' :
                  currentStep === 2 ? 'Property Details' :
                  currentStep === 3 ? 'Service Requirements' :
                  'Confirmation'
                }
              </div>
            </motion.div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <form onSubmit={handleSubmit}>
                {renderStepContent()}

                {/* Navigation Buttons */}
                {currentStep < 4 && (
                  <div className="flex justify-between items-center mt-12 pt-8 border-t border-slate-200">
                    {currentStep > 1 ? (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 font-semibold"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span>Previous</span>
                      </button>
                    ) : (
                      <div></div>
                    )}

                    {currentStep < 3 ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="flex items-center space-x-2 bg-slate-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-700 transition-all duration-300"
                      >
                        <span>Next</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center space-x-2 bg-slate-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Submitting...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Request</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        {currentStep < 4 && (
          <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="text-center"
              >
                <motion.h3 variants={fadeInUp} className="text-2xl font-bold text-slate-800 mb-12">
                  Why Choose Castle Crew Glazing?
                </motion.h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <motion.div variants={fadeInUp} className="text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-semibold text-slate-800 mb-2">Certified Professionals</h4>
                    <p className="text-slate-600">Fully qualified and insured glazing specialists with years of experience.</p>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-semibold text-slate-800 mb-2">Fast Response</h4>
                    <p className="text-slate-600">Quick response times with emergency services available 24/7.</p>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-semibold text-slate-800 mb-2">Customer Satisfaction</h4>
                    <p className="text-slate-600">100% satisfaction guarantee with comprehensive warranty coverage.</p>
                  </motion.div>
                </div>

                <motion.div variants={fadeInUp} className="mt-12 p-6 bg-slate-50 rounded-lg">
                  <h4 className="text-lg font-semibold text-slate-800 mb-4">Need Help with Your Request?</h4>
                  <p className="text-slate-600 mb-4">
                    Our friendly team is here to assist you every step of the way.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <a
                      href="tel:+447949821925"
                      className="flex items-center space-x-2 bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-700 transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>Call: +44 7949 821925</span>
                    </a>
                    <a
                      href="mailto:info@castlecrewglazing.co.uk"
                      className="flex items-center space-x-2 border-2 border-slate-600 text-slate-600 px-6 py-3 rounded-lg font-semibold hover:bg-slate-600 hover:text-white transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>Email Us</span>
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>
        )}

        {/* FAQ Section for Steps 1-3 */}
        {currentStep < 4 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                <motion.h3 variants={fadeInUp} className="text-2xl font-bold text-slate-800 text-center mb-12">
                  Frequently Asked Questions
                </motion.h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div variants={fadeInUp} className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-slate-800 mb-2">How quickly will I receive a quote?</h4>
                    <p className="text-slate-600 text-sm">
                      We aim to provide detailed quotes within 24 hours of receiving your request. For urgent projects, we can often provide preliminary estimates within 2-4 hours.
                    </p>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-slate-800 mb-2">Is the consultation really free?</h4>
                    <p className="text-slate-600 text-sm">
                      Yes, absolutely! Our initial consultation and site visit are completely free with no obligation. We'll assess your needs and provide expert recommendations at no cost.
                    </p>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-slate-800 mb-2">Do you provide emergency services?</h4>
                    <p className="text-slate-600 text-sm">
                      Yes, we offer 24/7 emergency glazing services for urgent repairs such as broken windows, damaged doors, or security issues.
                    </p>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-slate-800 mb-2">What areas do you cover?</h4>
                    <p className="text-slate-600 text-sm">
                      We serve the greater London area and surrounding counties. Contact us to confirm if we cover your specific location.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>
        )}
      </motion.div>
    </Layout>
  );
}