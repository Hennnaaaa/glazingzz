import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';
import { HiArrowLeft, HiCheckCircle, HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { servicesData } from '@/data/services';
import Layout from '@/components/layout/Layout';

export default function ServiceDetailPage() {
  const router = useRouter();
  const { serviceId } = router.query;
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const service = servicesData.find(s => s.id === serviceId);
  
  // Use actual gallery images from service data, fallback to generated paths
  const serviceImages = service ? [
    service.image, // Primary image from services data
    ...(service.gallery || []), // Use actual gallery if available
    // Fallback to generated paths if gallery is empty
    ...(!service.gallery || service.gallery.length === 0 ? [
      `/images/services/${service.id}/gallery-1.jpg`,
      `/images/services/${service.id}/gallery-2.jpg`, 
      `/images/services/${service.id}/gallery-3.jpg`,
      `/images/services/${service.id}/gallery-4.jpg`,
      `/images/services/${service.id}/gallery-5.jpg`,
      `/images/services/${service.id}/gallery-6.jpg`
    ] : [])
  ] : [];

  // Gallery images (excluding the main hero image)
  const galleryImages = serviceImages.slice(1);

  if (!service) {
    return (
      <Layout title="Service Not Found - Castle Crew Glazing">
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-white">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-800 mb-4">Service Not Found</h1>
            <Link href="/services" className="text-slate-600 hover:text-slate-800 font-medium">
              Back to Services
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

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

  const openImageViewer = (image, index) => {
    setSelectedImage({ src: image, index });
    setCurrentImageIndex(index);
  };

  const closeImageViewer = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % galleryImages.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage({ src: galleryImages[nextIndex], index: nextIndex });
  };

  const prevImage = () => {
    const prevIndex = currentImageIndex === 0 ? galleryImages.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
    setSelectedImage({ src: galleryImages[prevIndex], index: prevIndex });
  };

  return (
    <Layout title={`${service.title} - Castle Crew Glazing`}>
      <div className="min-h-screen bg-white">
        
        {/* Combined Hero & Main Content Section with Background Image */}
        <section className="relative">
          {/* Background Image with Blur */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
              style={{
                imageRendering: 'high-quality',
                filter: 'blur(1px) brightness(0.4)'
              }}
              onError={(e) => {
                e.target.src = '/images/services/placeholder.jpg';
              }}
            />
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/50"></div>
          </div>

          {/* Hero Section */}
          <div className="relative z-10 pt-32 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
              >
                <Link 
                  href="/services" 
                  className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors text-lg font-medium"
                >
                  <HiArrowLeft className="w-6 h-6 mr-3" />
                  Back to Services
                </Link>
                
                <div className="max-w-4xl">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                    {service.title}
                  </h1>
                  
                  <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
                    Professional glazing solutions with exceptional quality and craftsmanship.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Main Content Section - Image Left, Details Right */}
          <div className="relative z-10 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
              >
                {/* Image Section - Left */}
                <motion.div
                  variants={fadeInUp}
                  className="relative"
                >
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-auto object-cover"
                      style={{
                        imageRendering: 'high-quality',
                        minHeight: '400px',
                        maxHeight: '600px'
                      }}
                      onError={(e) => {
                        e.target.src = '/images/services/placeholder.jpg';
                      }}
                    />
                    
                    
                  </div>
                </motion.div>

                {/* Content Section - Right */}
                <motion.div
                  variants={fadeInUp}
                  className="space-y-8"
                >
                  {/* Glass Card Container */}
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
                    {/* Service Description */}
                    <div className="mb-8">
                      <p className="text-lg md:text-xl text-white leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Key Features with Icons */}
                    {service.features && service.features.length > 0 && (
                      <div className="space-y-4 mb-8">
                        {service.features.slice(0, 4).map((feature, index) => (
                          <div key={index} className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                              <div className="w-6 h-6 rounded-full bg-green-500/30 flex items-center justify-center">
                                <HiCheckCircle className="w-4 h-4 text-green-300" />
                              </div>
                            </div>
                            <p className="text-white text-lg leading-relaxed">{feature}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* CTA Button */}
                    <div className="mb-6">
                      <Link
                        href="/contact"
                        className="bg-white text-slate-800 px-8 py-4 rounded-xl font-bold hover:bg-slate-100 transition-all duration-300 text-center shadow-lg hover:shadow-xl inline-block w-full sm:w-auto"
                      >
                        Get Free Quote
                      </Link>
                    </div>

                    {/* Tagline */}
                    <div className="pt-6 border-t border-white/20">
                      <p className="text-white/90 leading-relaxed">
                        Transform your space with our professional glazing solutions designed for lasting performance and modern elegance.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        {galleryImages.length > 0 && (
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                  Project Gallery
                </h2>
                <p className="text-xl text-slate-600">
                  Explore our {service.title.toLowerCase()} installations and designs
                </p>
              </motion.div>

              {/* Gallery Grid */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {galleryImages.map((image, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    onClick={() => openImageViewer(image, index)}
                    className="group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-white"
                  >
                    <div className="relative w-full overflow-hidden">
                      <img
                        src={image}
                        alt={`${service.title} - Gallery Image ${index + 1}`}
                        className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-105"
                        style={{
                          imageRendering: 'high-quality',
                          display: 'block',
                          minHeight: '200px',
                          maxHeight: '400px'
                        }}
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = service.image;
                        }}
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      
                      {/* Content Overlay */}
                      <div className="absolute inset-0 flex items-end p-4">
                        <div className="text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                          <h3 className="font-semibold text-lg mb-1">{service.title}</h3>
                          <p className="text-sm text-white/90">Professional Installation</p>
                        </div>
                      </div>

                      {/* View Button */}
                      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        View
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Show More Button for Large Galleries */}
              {galleryImages.length > 8 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-center mt-12"
                >
                  <button className="bg-slate-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors duration-300">
                    View All {galleryImages.length} Images
                  </button>
                </motion.div>
              )}
            </div>
          </section>
        )}

        {/* Enhanced Image Viewer Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-4">
            <div className="max-w-7xl w-full h-full flex items-center justify-center relative">
              
              {/* Close Button */}
              <button
                onClick={closeImageViewer}
                className="absolute top-4 right-4 z-10 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-colors duration-200"
              >
                <HiX className="w-6 h-6" />
              </button>

              {/* Navigation Arrows */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-colors duration-200"
                  >
                    <HiChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-colors duration-200"
                  >
                    <HiChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Main Image */}
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src={selectedImage.src}
                  alt={`${service.title} - Gallery Image ${selectedImage.index + 1}`}
                  className="max-w-full max-h-full object-contain"
                  style={{
                    imageRendering: 'high-quality'
                  }}
                />
              </div>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/40 text-white px-4 py-2 rounded-full text-sm">
                {currentImageIndex + 1} of {galleryImages.length}
              </div>
            </div>
          </div>
        )}

        {/* Features Section - Extended */}
        {service.features && service.features.length > 4 && (
          <section className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                  Complete Features
                </h2>
                <p className="text-xl text-slate-600">
                  Everything that makes our {service.title.toLowerCase()} exceptional
                </p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {service.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex-shrink-0">
                      <HiCheckCircle className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <p className="text-slate-700 leading-relaxed">{feature}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        )}

        {/* Process Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                Our Installation Process
              </motion.h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-4 gap-8"
            >
              {[
                { step: "01", title: "Site Survey", desc: "Free consultation and measurements" },
                { step: "02", title: "Design", desc: "Custom design and detailed quote" },
                { step: "03", title: "Manufacturing", desc: "Precision crafted in Britain" },
                { step: "04", title: "Installation", desc: "Professional fitting and finish" }
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
                  <p className="text-slate-600">{process.desc}</p>
                  
                  {index < 3 && (
                    <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-slate-200 -z-10"></div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

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
                Ready to Transform Your Space?
              </h2>
              
              <p className="text-xl text-slate-200">
                Get started with your {service.title.toLowerCase()} project today. Contact our experts for a free consultation.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="tel:+447949821925"
                  className="bg-white text-slate-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300"
                >
                  Call Now: +44 7949 821925
                </a>
                <Link
                  href="/contact"
                  className="text-white hover:text-slate-200 font-medium text-lg"
                >
                  Or send us a message →
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
}