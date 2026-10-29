import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import BenefitsSection from './components/BenefitsSection';
import ApplyPage from './components/ApplyPage';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import ApplicationDetailsModal from './components/ApplicationDetailsModal';
import { fetchAllFranchiseApplications, updateFranchiseStatus } from './services/firebase';
import { ArrowRight, Sparkles } from 'lucide-react';
import WhatsAppIcon from './components/WhatsAppIcon';
import { openDirectWhatsApp, getDirectWhatsAppHref } from './utils/whatsapp';

export default function App() {
  const [lang, setLang] = useState('mr');
  const [currentTab, setCurrentTab] = useState('landing'); // 'landing' | 'apply' | 'admin'
  const [applications, setApplications] = useState([]);
  const [selectedAppForModal, setSelectedAppForModal] = useState(null);

  // Load applications count for admin badge
  const refreshApplications = async () => {
    try {
      const list = await fetchAllFranchiseApplications();
      setApplications(list);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    refreshApplications();
  }, []);

  const handleApplicationSuccess = (newDoc) => {
    setApplications(prev => [newDoc, ...prev]);
  };

  const handleUpdateStatus = async (appId, newStatus) => {
    await updateFranchiseStatus(appId, newStatus);
    setApplications(prev => prev.map(a => {
      if (a.id === appId || a.applicationNumber === appId) {
        return { ...a, status: newStatus };
      }
      return a;
    }));
    if (selectedAppForModal && (selectedAppForModal.id === appId || selectedAppForModal.applicationNumber === appId)) {
      setSelectedAppForModal(prev => ({ ...prev, status: newStatus }));
    }
  };

  // Navigate to dedicated Apply Page
  const handleOpenApplyPage = () => {
    setCurrentTab('apply');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Return to Landing Page
  const handleBackToLanding = (targetSection = 'hero') => {
    setCurrentTab('landing');
    setTimeout(() => {
      if (targetSection === 'hero') {
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        const el = document.getElementById(targetSection);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 80);
  };

  const isMr = lang === 'mr';

  return (
    <div className="app-container inodayam-app">
      {/* Navbar with Official SVG Brand Mark */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        lang={lang}
        setLang={setLang}
        totalApplicationsCount={applications.length}
        onApplyClick={handleOpenApplyPage}
      />

      <main className="main-content-landing">
        {/* VIEW 1: INTERACTIVE LANDING PAGE */}
        {currentTab === 'landing' && (
          <>
            {/* Hero Section */}
            <HeroSection
              lang={lang}
              onApplyClick={handleOpenApplyPage}
            />

            {/* Poster-Style 6 Benefits Strip (गाव प्रतिनिधीचे फायदे) */}
            <BenefitsSection
              lang={lang}
              onApplyClick={handleOpenApplyPage}
            />

            {/* Clean Professional Bottom Call-To-Action Banner */}
            <section className="landing-bottom-apply-strip">
              <div className="section-container">
                <div className="bottom-apply-card">
                  <div className="bottom-apply-text">
                    <span className="bottom-apply-pill">
                      <Sparkles size={14} className="text-emerald" />
                      <span>{isMr ? 'अधिकृत गाव प्रतिनिधी नियुक्ती २०२६' : 'Official Representative Drive 2026'}</span>
                    </span>
                    <h3 className="bottom-apply-heading">
                      {isMr ? (
                        <>
                          आपल्या गावातच सुरू करा <span className="fresh-gradient-text">स्वावलंबी व्यवसाय!</span>
                        </>
                      ) : (
                        'Start your self-reliant business in your own village!'
                      )}
                    </h3>
                    <p className="bottom-apply-sub">
                      {isMr 
                        ? 'फक्त ₹१०,००० भांडवलात दरमहा ₹१२,००० ते ₹१५,०००+ नियमित उत्पन्न. महिलांना विशेष प्राधान्य आणि १००% मोफत प्रशिक्षण.' 
                        : 'Minimum ₹10,000 capital, ₹12,000 - ₹15,000+ monthly income. Priority for women with 100% free training.'}
                    </p>
                  </div>

                  <div className="bottom-apply-cta-box">
                    <button 
                      type="button" 
                      className="animated-hero-apply-btn"
                      onClick={handleOpenApplyPage}
                    >
                      <span className="apply-btn-sparkle" aria-hidden="true">✨</span>
                      <span className="apply-btn-text">Apply</span>
                      <ArrowRight size={20} className="apply-btn-arrow" />
                    </button>
                    <span className="bottom-trust-note">
                      🔒 {isMr ? 'अवघ्या २ मिनिटांत अर्ज • १००% सुरक्षित नोंदणी' : '2-Min Process • 100% Safe'}
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* VIEW 2: DEDICATED SEPARATE APPLICATION PAGE */}
        {currentTab === 'apply' && (
          <ApplyPage
            lang={lang}
            onBackToHome={() => handleBackToLanding('hero')}
            onApplicationSuccess={handleApplicationSuccess}
          />
        )}

        {/* VIEW 3: ADMIN PANEL */}
        {currentTab === 'admin' && (
          <div className="admin-view-wrapper">
            <div className="admin-top-nav-bar no-print">
              <button 
                type="button" 
                className="back-to-landing-btn"
                onClick={() => handleBackToLanding('hero')}
              >
                ← {isMr ? 'मुख्य लँडिंग पृष्ठावर परत जा' : 'Back to Landing Page'}
              </button>
            </div>
            <AdminPanel
              lang={lang}
              onSelectApplicationForView={(app) => setSelectedAppForModal(app)}
            />
          </div>
        )}
      </main>

      {/* Footer with Empowering Bottom Wave Banner */}
      <Footer
        lang={lang}
        onAdminClick={() => {
          setCurrentTab('admin');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onApplyClick={handleOpenApplyPage}
        onHomeClick={(sec) => handleBackToLanding(sec)}
      />

      {/* Application Details Modal */}
      {selectedAppForModal && (
        <ApplicationDetailsModal
          application={selectedAppForModal}
          onClose={() => setSelectedAppForModal(null)}
          onUpdateStatus={handleUpdateStatus}
          lang={lang}
        />
      )}

      {/* Floating WhatsApp Action Button - Direct Native App & Direct Web */}
      <a
        href={getDirectWhatsAppHref('919822012345', 'नमस्कार, Inodayam Tech गाव प्रतिनिधी म्हणून काम करण्याबाबत माहिती हवी आहे.')}
        onClick={(e) => {
          e.preventDefault();
          openDirectWhatsApp('919822012345', 'नमस्कार, Inodayam Tech गाव प्रतिनिधी म्हणून काम करण्याबाबत माहिती हवी आहे.');
        }}
        className="floating-whatsapp-btn no-print"
        title="WhatsApp Support"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon size={30} color="#ffffff" />
        <span className="floating-wa-label hide-on-mobile">WhatsApp</span>
      </a>

      {/* Mobile Sticky Quick Apply Bar */}
      {currentTab === 'landing' && (
        <div className="mobile-landing-bottom-bar no-print">
          <div className="mobile-offer-snippet">
            <span className="price-tag">फक्त ₹10,000</span>
            <span className="income-tag">मासिक ₹12,000-₹15,000</span>
          </div>
          <button 
            type="button" 
            className="mobile-apply-now-btn"
            onClick={handleOpenApplyPage}
          >
            <span>गाव प्रतिनिधी बना ➔</span>
          </button>
        </div>
      )}
    </div>
  );
}
