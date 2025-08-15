import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiStar, HiCheckCircle, HiExclamationCircle, HiUser, HiChevronLeft, HiChevronRight } from 'react-icons/hi';

// Custom hook for managing reviews
const useReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = () => {
    try {
      const storedReviews = localStorage.getItem('castleCrewReviews');
      if (storedReviews) {
        const parsedReviews = JSON.parse(storedReviews);
        // Sort by rating (highest first), then by date (newest first)
        const sortedReviews = parsedReviews.sort((a, b) => {
          if (b.rating !== a.rating) {
            return b.rating - a.rating;
          }
          return new Date(b.date) - new Date(a.date);
        });
        setReviews(sortedReviews);
      }
    } catch (error) {
      console.error('Error loading reviews:', error);
      setReviews([]);
    }
  };

  const addReview = (reviewData) => {
    try {
      const newReview = {
        id: `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        ...reviewData,
        date: new Date().toISOString(),
        timestamp: Date.now()
      };

      const existingReviews = JSON.parse(localStorage.getItem('castleCrewReviews') || '[]');
      const updatedReviews = [newReview, ...existingReviews];
      
      localStorage.setItem('castleCrewReviews', JSON.stringify(updatedReviews));
      setReviews(updatedReviews);
      return { success: true };
    } catch (error) {
      console.error('Error saving review:', error);
      return { success: false, error: 'Failed to save review' };
    }
  };

  const getReviewStats = () => {
    if (reviews.length === 0) return { average: 0, total: 0, distribution: {} };

    const total = reviews.length;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    const average = (sum / total).toFixed(1);
    
    const distribution = reviews.reduce((acc, review) => {
      acc[review.rating] = (acc[review.rating] || 0) + 1;
      return acc;
    }, {});

    return { average: parseFloat(average), total, distribution };
  };

  return { reviews, addReview, loadReviews, getReviewStats };
};

// Review Form Component
const ReviewForm = ({ onReviewSubmitted }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    location: '',
    rating: 5,
    reviewText: '',
    serviceType: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addReview } = useReviews();

  const services = [
    'Bi-Folding Doors',
    'Sliding Doors', 
    'UPVC & Aluminium Casement Windows',
    'Composite Doors',
    'Roof Lanterns & Flat Glass',
    'Tilt & Turn Windows',
    'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const validateForm = () => {
    if (formData.customerName.trim().length < 2) {
      throw new Error('Please enter your full name');
    }
    if (formData.reviewText.trim().length < 15) {
      throw new Error('Please write a more detailed review (at least 15 characters)');
    }
    if (!formData.rating || formData.rating < 1 || formData.rating > 5) {
      throw new Error('Please select a valid rating');
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      validateForm();
      
      const result = addReview({
        customerName: formData.customerName.trim(),
        location: formData.location.trim() || 'Not specified',
        rating: parseInt(formData.rating),
        reviewText: formData.reviewText.trim(),
        serviceType: formData.serviceType || 'General Service'
      });

      if (result.success) {
        setStatus({
          type: 'success',
          message: 'Thank you for your review! It has been published successfully.'
        });
        
        // Reset form
        setFormData({
          customerName: '',
          location: '',
          rating: 5,
          reviewText: '',
          serviceType: ''
        });

        // Notify parent to refresh reviews
        if (onReviewSubmitted) {
          setTimeout(onReviewSubmitted, 500);
        }
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 border border-slate-200">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-600 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
          <HiStar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-800">Share Your Experience</h3>
      </div>
      
      {status.message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
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
          <p className="text-sm font-medium">{status.message}</p>
        </motion.div>
      )}

      <div className="space-y-6">
        {/* Name and Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Your Name *
            </label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200"
              placeholder="Your city or area"
            />
          </div>
        </div>

        {/* Service Type */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Service Received
          </label>
          <select
            name="serviceType"
            value={formData.serviceType}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200"
          >
            <option value="">Select the service you received</option>
            {services.map((service) => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Rating *
          </label>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingChange(star)}
                className="transition-all duration-200 hover:scale-110"
              >
                <HiStar 
                  className={`w-6 h-6 sm:w-8 sm:h-8 ${
                    star <= formData.rating 
                      ? 'text-yellow-400' 
                      : 'text-slate-300'
                  }`} 
                />
              </button>
            ))}
            <span className="ml-3 text-sm font-medium text-slate-600">
              {formData.rating} star{formData.rating !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Review Text */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Your Review *
          </label>
          <textarea
            name="reviewText"
            value={formData.reviewText}
            onChange={handleInputChange}
            rows={5}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 resize-none"
            placeholder="Tell us about your experience with Castle Crew Glazing..."
          />
          <p className="text-xs text-slate-500 mt-1">
            Minimum 15 characters ({formData.reviewText.length}/15)
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 ${
            isSubmitting
              ? 'bg-slate-400 text-slate-200 cursor-not-allowed'
              : 'bg-slate-600 text-white hover:bg-slate-700 hover:shadow-lg'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-slate-300 border-t-transparent rounded-full animate-spin"></div>
              <span>Publishing Review...</span>
            </span>
          ) : (
            'Publish Review'
          )}
        </button>
      </div>
    </div>
  );
};

// Individual Review Display Component
const ReviewCard = ({ review, index }) => {
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Recently';
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 min-h-[280px] sm:min-h-[300px] flex flex-col w-full"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
            <HiUser className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="font-semibold text-slate-800 text-base sm:text-lg truncate">{review.customerName}</h4>
            {review.location !== 'Not specified' && (
              <p className="text-xs sm:text-sm text-slate-500 truncate">{review.location}</p>
            )}
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="flex items-center space-x-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <HiStar
                key={i}
                className={`w-3 h-3 sm:w-4 sm:h-4 ${
                  i < review.rating ? 'text-yellow-400' : 'text-slate-300'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-slate-500">{formatDate(review.date)}</p>
        </div>
      </div>

      {/* Review Content */}
      <div className="mb-4 flex-grow">
        <p className="text-slate-700 leading-relaxed italic break-words text-sm sm:text-base">"{review.reviewText}"</p>
      </div>

      {/* Service Type */}
      {review.serviceType && (
        <div className="mt-auto">
          <span className="inline-block bg-slate-100 text-slate-600 text-xs font-medium px-3 py-1 rounded-full">
            {review.serviceType}
          </span>
        </div>
      )}
    </motion.div>
  );
};

// Reviews Carousel Component with Mobile Optimization
const ReviewsCarousel = ({ reviews }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate reviews per page based on screen size
  const reviewsPerPage = isMobile ? 1 : 3;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const getCurrentReviews = () => {
    const startIndex = currentIndex * reviewsPerPage;
    return reviews.slice(startIndex, startIndex + reviewsPerPage);
  };

  // For small number of reviews on desktop, show all in grid
  if (!isMobile && reviews.length <= 3) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {reviews.map((review, index) => (
          <ReviewCard key={review.id} review={review} index={index} />
        ))}
      </div>
    );
  }

  // Show navigation only if there are multiple pages
  const showNavigation = totalPages > 1;

  return (
    <div className="relative">
      {/* Navigation Arrows */}
      {showNavigation && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-200 border border-slate-200 hover:bg-slate-50"
          >
            <HiChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-200 border border-slate-200 hover:bg-slate-50"
          >
            <HiChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" />
          </button>
        </>
      )}

      {/* Reviews Grid */}
      <div className="overflow-hidden px-2 sm:px-4">
        <motion.div
          className={`grid gap-6 lg:gap-8 ${
            isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {getCurrentReviews().map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </motion.div>
      </div>

      {/* Pagination Dots */}
      {showNavigation && (
        <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-slate-600'
                  : 'bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Main Reviews Section Component
const ReviewsSection = () => {
  const { reviews, getReviewStats } = useReviews();
  const [refreshKey, setRefreshKey] = useState(0);
  const stats = getReviewStats();

  const handleReviewSubmitted = () => {
    setRefreshKey(prev => prev + 1);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div key={refreshKey} className="py-12 sm:py-20 bg-gradient-to-br from-slate-400 to-grey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4 sm:mb-6">
            Customer Reviews
          </h2>
          {reviews.length > 0 ? (
            <div className="space-y-4">
              <p className="text-lg sm:text-xl text-slate-600">
                See what our customers are saying
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <HiStar
                        key={i}
                        className={`w-5 h-5 sm:w-6 sm:h-6 ${
                          i < Math.round(stats.average) ? 'text-yellow-400' : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-slate-800">
                    {stats.average}/5
                  </span>
                </div>
                <div className="text-slate-600 text-sm sm:text-base">
                  Based on {stats.total} review{stats.total !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-lg sm:text-xl text-slate-600">
              Be the first to share your experience with Castle Crew Glazing
            </p>
          )}
        </motion.div>

        {/* Reviews Display */}
        {reviews.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-12 sm:mb-16"
          >
            <ReviewsCarousel reviews={reviews} />
          </motion.div>
        )}

        {/* Review Form */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-2xl mx-auto"
        >
          <ReviewForm onReviewSubmitted={handleReviewSubmitted} />
        </motion.div>

        {reviews.length === 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mt-8 sm:mt-12 p-6 sm:p-8 bg-white rounded-2xl shadow-sm border border-slate-200"
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiStar className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-2">No Reviews Yet</h3>
            <p className="text-slate-600 text-sm sm:text-base">
              Be the first customer to share your experience and help others learn about our services.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ReviewsSection;