import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';

export default function CookiePolicy() {
  return (
    <Layout 
      title="Cookie Policy - Castle Crew Glazing"
      description="Learn about how Castle Crew Glazing uses cookies to enhance your browsing experience."
    >
      <div className="min-h-screen bg-gradient-to-br from-slate-600 to-slate-700 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-white mb-4">Cookie Policy</h1>
            <p className="text-lg text-slate-200 mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-6 sm:p-8 space-y-8 border border-slate-300/20">
              <section>
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">What are cookies?</h2>
                <p className="text-slate-700 leading-relaxed">
                  Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
                  They are widely used to make websites work more efficiently and provide information to the site owners.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">How we use cookies</h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Castle Crew Glazing uses cookies to enhance your browsing experience and provide personalized content. 
                  Here's how we categorize our cookies:
                </p>

                <div className="space-y-6">
                  <div className="border-l-4 border-slate-600 pl-4 bg-slate-50/50 rounded-r-lg p-4">
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Necessary Cookies</h3>
                    <p className="text-slate-700">
                      These cookies are essential for the website to function properly. They enable basic functions like 
                      page navigation and access to secure areas of the website. The website cannot function properly without these cookies.
                    </p>
                    <p className="text-sm text-slate-600 mt-2">
                      <strong>Examples:</strong> Session management, security tokens
                    </p>
                  </div>

                  <div className="border-l-4 border-slate-500 pl-4 bg-slate-50/50 rounded-r-lg p-4">
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Analytics Cookies</h3>
                    <p className="text-slate-700">
                      These cookies help us understand how visitors interact with our website by collecting and reporting 
                      information anonymously. This helps us improve our website's performance and user experience.
                    </p>
                    <p className="text-sm text-slate-600 mt-2">
                      <strong>Examples:</strong> Page views, time spent on site, bounce rate
                    </p>
                  </div>

                  <div className="border-l-4 border-slate-400 pl-4 bg-slate-50/50 rounded-r-lg p-4">
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Personalization Cookies</h3>
                    <p className="text-slate-700">
                      These cookies remember your preferences and provide personalized content. They help us show you 
                      relevant services and remember your previous interactions with our website.
                    </p>
                    <p className="text-sm text-slate-600 mt-2">
                      <strong>Examples:</strong> Viewed services, user preferences, personalized recommendations
                    </p>
                  </div>

                  <div className="border-l-4 border-slate-600 pl-4 bg-slate-50/50 rounded-r-lg p-4">
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Marketing Cookies</h3>
                    <p className="text-slate-700">
                      These cookies are used to track visitors across websites. The intention is to display ads that are 
                      relevant and engaging for individual users.
                    </p>
                    <p className="text-sm text-slate-600 mt-2">
                      <strong>Examples:</strong> Ad targeting, conversion tracking, social media integration
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">Managing your cookie preferences</h2>
                <div className="space-y-4">
                  <p className="text-slate-700 leading-relaxed">
                    You have control over which cookies you accept. You can:
                  </p>
                  <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                    <li>Use our cookie preference center to customize your settings</li>
                    <li>Change your browser settings to refuse cookies</li>
                    <li>Delete cookies that have already been set</li>
                    <li>Visit this page anytime to update your preferences</li>
                  </ul>
                  
                  <div className="bg-gradient-to-r from-slate-100 to-slate-200 rounded-lg p-6 mt-6 border border-slate-300">
                    <p className="text-slate-800 font-semibold mb-2 flex items-center">
                      <span className="text-xl mr-2">🍪</span>
                      Update Your Cookie Preferences
                    </p>
                    <p className="text-slate-700 text-sm mb-4">
                      You can change your cookie preferences at any time by clicking the button below.
                    </p>
                    <button 
                      onClick={() => {
                        // Clear consent to show banner again
                        document.cookie = 'cookieConsent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                        window.location.reload();
                      }}
                      className="bg-slate-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-slate-700 transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      Manage Cookie Preferences
                    </button>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">Cookie retention</h2>
                <p className="text-slate-700 leading-relaxed">
                  Most cookies we use are stored for a maximum of 12 months. Some cookies, like those for remembering 
                  your preferences, may be stored longer. You can delete cookies at any time through your browser settings.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">Third-party cookies</h2>
                <div className="space-y-4">
                  <p className="text-slate-700 leading-relaxed">
                    We may also use third-party services that set their own cookies. These include:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <h4 className="font-semibold text-slate-800 mb-2">Google Analytics</h4>
                      <p className="text-sm text-slate-600">For website analytics and performance monitoring</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <h4 className="font-semibold text-slate-800 mb-2">Social Media</h4>
                      <p className="text-sm text-slate-600">For social sharing and embedded content</p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">Contact us</h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  If you have any questions about our cookie policy or how we use cookies, please contact us:
                </p>
                <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg p-6 border border-slate-200">
                  <h3 className="font-semibold text-slate-800 mb-3">Castle Crew Glazing</h3>
                  <div className="space-y-2 text-slate-700">
                    <p className="flex items-center">
                      <span className="w-16 text-sm font-medium">Email:</span>
                      <a href="mailto:info@castlecrewglazing.com" className="text-slate-600 hover:text-slate-800 transition-colors">
                        info@castlecrewglazing.com
                      </a>
                    </p>
                    <p className="flex items-center">
                      <span className="w-16 text-sm font-medium">Phone:</span>
                      <a href="tel:+12345678900" className="text-slate-600 hover:text-slate-800 transition-colors">
                        +1 (234) 567-8900
                      </a>
                    </p>
                    <p className="flex items-start">
                      <span className="w-16 text-sm font-medium">Address:</span>
                      <span className="text-slate-600">
                        123 Glazing Street<br />
                        Business District<br />
                        City, State 12345
                      </span>
                    </p>
                  </div>
                </div>
              </section>

              <section className="border-t border-slate-200 pt-6">
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">Updates to this policy</h2>
                <div className="bg-slate-50 rounded-lg p-4 border-l-4 border-slate-600">
                  <p className="text-slate-700 leading-relaxed">
                    We may update this cookie policy from time to time to reflect changes in our practices or for other 
                    operational, legal, or regulatory reasons. Please check this page periodically for updates.
                  </p>
                  <p className="text-sm text-slate-600 mt-3">
                    <strong>Last review:</strong> {new Date().toLocaleDateString()} | 
                    <strong> Next review:</strong> {new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </p>
                </div>
              </section>

              <section className="bg-gradient-to-r from-slate-600 to-slate-700 rounded-lg p-6 text-white">
                <h3 className="text-lg font-semibold mb-3">Your Privacy Matters</h3>
                <p className="text-slate-100 text-sm leading-relaxed">
                  At Castle Crew Glazing, we are committed to protecting your privacy and being transparent about how we use cookies. 
                  We believe in giving you control over your data and ensuring you have the best possible experience on our website.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
