import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiCheckCircle, HiExclamationCircle } from 'react-icons/hi';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    property: '',
    message: '',
    urgent: false
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = [
    'Windows & Doors',
    'Conservatories',
    'Bi-fold Doors',
    'Glass Repair',
    'Double Glazing',
    'Commercial Glazing',
    'Emergency Service',
    'Other'
  ];

  const propertyTypes = [
    'Residential House',
    'Apartment/Flat',
    'Commercial Building',
    'Office',
    'Retail Store',
    'Industrial',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      // Send email to info@castlecrewglazing.co.uk
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          to: 'info@castlecrewglazing.co.uk',
          subject: `New Quote Request - ${formData.service || 'General Inquiry'}`,
          urgent: formData.urgent
        }),
      });

      if (response.ok) {
        setStatus({
          type: 'success',
          message: 'Thank you! Your message has been sent successfully to Castle Crew Glazing. We\'ll get back to you within 24 hours with your free quote.'
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          property: '',
          message: '',
          urgent: false
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus({
        type: 'error',
        message: 'Sorry, there was an error sending your message. Please try again or call us directly at +44 7949 821925.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-2xl font-bold text-slate-800 mb-6">Get Your Free Quote</h3>
        <p className="text-slate-600 mb-6">
          Fill out the form below and we'll send your quote to <strong>info@castlecrewglazing.co.uk</strong>
        </p>
        
        {status.message && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`flex items-center space-x-3 p-4 rounded-lg mb-6 ${
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

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          {/* Phone and Service */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors"
                placeholder="Your phone number"
              />
            </div>
            <div>
              <label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-2">
                Service Required *
              </label>
              <select
                id="service"
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

          {/* Property Type */}
          <div>
            <label htmlFor="property" className="block text-sm font-medium text-slate-700 mb-2">
              Property Type
            </label>
            <select
              id="property"
              name="property"
              value={formData.property}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors"
            >
              <option value="">Select property type</option>
              {propertyTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
              Project Details
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors resize-none"
              placeholder="Please describe your project requirements, timeline, and any specific needs..."
            />
          </div>

          {/* Urgent Checkbox */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="urgent"
              name="urgent"
              checked={formData.urgent}
              onChange={handleChange}
              className="w-4 h-4 text-slate-600 border-slate-300 rounded focus:ring-slate-500"
            />
            <label htmlFor="urgent" className="text-sm font-medium text-slate-700">
              This is urgent (requires immediate attention)
            </label>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-4 px-6 rounded-lg font-semibold transition-all duration-300 ${
              isSubmitting
                ? 'bg-slate-400 text-slate-200 cursor-not-allowed'
                : 'bg-slate-600 text-white hover:bg-slate-700'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-slate-300 border-t-transparent rounded-full animate-spin"></div>
                <span>Sending Message...</span>
              </span>
            ) : (
              'Send Message & Get Free Quote'
            )}
          </motion.button>

          {/* Privacy Notice */}
          <p className="text-xs text-slate-500 text-center">
            By submitting this form, you agree to our privacy policy. We'll only use your information 
            to provide the requested quote and glazing services from Castle Crew Glazing.
          </p>
        </form>
      </motion.div>
    </div>
  );
}