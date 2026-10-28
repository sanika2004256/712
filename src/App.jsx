import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import BenefitsSection from './components/BenefitsSection';
import ProfitCalculator from './components/ProfitCalculator';
import ServicesSection from './components/ServicesSection';
import RegistrationSection from './components/RegistrationSection';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import ApplicationDetailsModal from './components/ApplicationDetailsModal';
import { fetchAllFranchiseApplications, updateFranchiseStatus } from './services/firebase';
import { MessageCircle, ArrowUp, Send, Shield } from 'lucide-react';
import { openDirectWhatsApp, getDirectWhatsAppHref } from './utils/whatsapp';

export default function App() {
  const [lang, setLang] = useState('mr');
  const [currentTab, setCurrentTab] = useState('landing'); // 'landing' | 'admin'
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

  const scrollToRegistration = () => {
    if (currentTab !== 'landing') {
      setCurrentTab('landing');
      setTimeout(() => {
        const el = document.getElementById('register');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('register');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
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
        onScrollToForm={scrollToRegistration}
      />

      <main className="main-content-landing">
        {/* VIEW 1: INTERACTIVE LANDING PAGE */}
        {currentTab === 'landing' && (
          <>
            {/* Hero Section (Poster Style with Interactive UI - No static image!) */}
            <HeroSection
              lang={lang}
              onApplyClick={scrollToRegistration}
            />

            {/* Poster-Style 6 Benefits Strip (गाव प्रतिनिधीचे फायदे) */}
            <BenefitsSection
              lang={lang}
            />

            {/* Interactive Live Earnings & ROI Calculator (फक्त ₹10,000 भांडवल -> मासिक ₹12,000-₹15,000) */}
            <section className="calculator-section-wrap">
              <div className="section-container">
                <ProfitCalculator
                  lang={lang}
                  onApplyClick={scrollToRegistration}
                />
              </div>
            </section>

            {/* Services Showcase (Poster-Style Checklist Card) */}
            <ServicesSection
              lang={lang}
              onApplyClick={scrollToRegistration}
            />

            {/* Cascading LGD Registration Section (State -> District -> Taluka -> Village) */}
            <RegistrationSection
              lang={lang}
              onApplicationSuccess={handleApplicationSuccess}
            />
          </>
        )}

        {/* VIEW 2: ADMIN PANEL */}
        {currentTab === 'admin' && (
          <div className="admin-view-wrapper">
            <div className="admin-top-nav-bar no-print">
              <button 
                type="button" 
                className="back-to-landing-btn"
                onClick={() => setCurrentTab('landing')}
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
        <MessageCircle size={28} />
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
            onClick={scrollToRegistration}
          >
            <span>गाव प्रतिनिधी बना ➔</span>
          </button>
        </div>
      )}
    </div>
  );
}
