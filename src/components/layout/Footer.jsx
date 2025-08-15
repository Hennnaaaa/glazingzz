import Link from 'next/link';
import { HiPhone, HiMail, HiLocationMarker } from 'react-icons/hi';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    'UPVC and Aluminium Casement',
    'Bifolding Doors',
    'Sliding Doors',
    'Composite Doors',
    'Tilt and Turn Windows',
    'Roof Lanterns and Flat Glass'
  ];

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Our Services', href: '/services' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Get Quote', href: '/contact' }
  ];

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-500 to-slate-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">CC</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Castle Crew Glazing</h3>
                <p className="text-slate-400 text-sm">Premium Glass Solutions</p>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Leading glazing specialists providing high-quality windows, doors, and glass solutions 
              for residential and commercial properties. Excellence in every installation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-slate-300 transition-colors">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-300 transition-colors">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-300 transition-colors">
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-300 transition-colors">
                <FaInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Our Services</h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <Link 
                    href="/services" 
                    className="text-slate-300 hover:text-slate-100 transition-colors text-sm"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-slate-300 hover:text-slate-100 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <HiLocationMarker className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                <div className="text-slate-300 text-sm">
                  <p>16 Industrial Estate</p>
                  <p>Welwyn Garden</p>
                  <p>AL7 4ST</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <HiPhone className="w-5 h-5 text-slate-400 flex-shrink-0" />
                <a 
                  href="tel:+447949821925" 
                  className="text-slate-300 hover:text-slate-100 transition-colors text-sm"
                >
                  +44 7949 821925
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <HiMail className="w-5 h-5 text-slate-400 flex-shrink-0" />
                <a 
                  href="mailto:info@castlecrewglazing.co.uk" 
                  className="text-slate-300 hover:text-slate-100 transition-colors text-sm"
                >
                  info@castlecrewglazing.co.uk
                </a>
              </div>
            </div>
            
            {/* Business Hours */}
            <div className="mt-6">
              <h5 className="font-medium text-white mb-2">Business Hours</h5>
              <div className="text-slate-300 text-sm space-y-1">
                <p>Monday - Saturday: 8:00 AM - 6:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-slate-400 text-sm">
              © {currentYear} Castle Crew Glazing. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-slate-400 hover:text-slate-300 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-slate-400 hover:text-slate-300 transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookie-policy" className="text-slate-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
              <Link href="/sitemap" className="text-slate-400 hover:text-slate-300 transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}