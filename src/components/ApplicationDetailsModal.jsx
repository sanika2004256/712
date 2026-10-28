import React from 'react';
import { X, Printer, Share2, Phone, Mail, MapPin, Building2, Store, Calendar, CheckCircle2 } from 'lucide-react';
import { openDirectWhatsApp, getDirectWhatsAppHref } from '../utils/whatsapp';

export default function ApplicationDetailsModal({ application, onClose, onUpdateStatus, lang }) {
  if (!application) return null;
  const isMr = lang === 'mr';

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `*अस्तित्व सॅनिटरी पॅड - अर्ज तपशील*\n` +
      `अर्ज क्र.: ${application.applicationNumber}\n` +
      `अर्जदार: ${application.applicantName}\n` +
      `मोबाईल: ${application.mobileNumber}\n` +
      `स्थान: ${application.village}, ${application.taluka}, ${application.district}\n` +
      `प्लॅन: ${application.franchiseModelTitle}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card wide printable-receipt" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌸</span>
            <div>
              <h3 className="modal-title font-bold text-slate-900">
                {application.applicantName}
              </h3>
              <span className="text-xs text-slate-500 font-mono">
                {application.applicationNumber} • {new Date(application.createdAt || Date.now()).toLocaleDateString('mr-IN')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 no-print">
            <button type="button" className="action-pill-btn print-modal-btn" onClick={handlePrint}>
              <Printer size={15} />
              <span>{isMr ? 'प्रिंट / PDF' : 'Print'}</span>
            </button>
            <button type="button" className="modal-close-btn" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="modal-body">
          {/* Status Bar */}
          <div className="modal-status-bar">
            <span>{isMr ? 'अर्जाची सद्यस्थिती:' : 'Current Status:'}</span>
            <select
              className={`status-select-badge ${application.status || 'Pending'}`}
              value={application.status || 'Pending'}
              onChange={(e) => onUpdateStatus(application.id || application.applicationNumber, e.target.value)}
            >
              <option value="Pending">Pending (प्रलंबित)</option>
              <option value="Contacted">Contacted (संपर्क झाला)</option>
              <option value="Approved">Approved (मंजूर)</option>
              <option value="Rejected">Rejected (नामंजूर)</option>
            </select>
          </div>

          {/* Details Grid */}
          <div className="receipt-details-grid mt-3">
            <div className="receipt-info-item">
              <span className="receipt-item-label">{isMr ? 'अर्जदाराचे नाव:' : 'Applicant Name:'}</span>
              <strong className="receipt-item-val">{application.applicantName}</strong>
            </div>

            <div className="receipt-info-item">
              <span className="receipt-item-label">{isMr ? 'मोबाईल नंबर:' : 'Mobile Number:'}</span>
              <div className="flex items-center gap-2">
                <a href={`tel:${application.mobileNumber}`} className="font-bold text-rose-700 underline">
                  {application.mobileNumber}
                </a>
              </div>
            </div>

            <div className="receipt-info-item">
              <span className="receipt-item-label">{isMr ? 'व्हॉट्सॲप नंबर:' : 'WhatsApp Number:'}</span>
              {(() => {
                const rawPhone = application.whatsappNumber || application.mobileNumber;
                const msg = `नमस्कार ${application.applicantName}, इनोदयम टेक / अस्तित्व सॅनिटरी पॅड फ्रँचायझी अर्जाबाबत आम्ही संपर्क करत आहोत.`;
                return (
                  <a 
                    href={getDirectWhatsAppHref(rawPhone, msg)}
                    onClick={(e) => {
                      e.preventDefault();
                      openDirectWhatsApp(rawPhone, msg);
                    }}
                    className="font-bold text-emerald-700 underline flex items-center gap-1.5"
                    title="WhatsApp वर थेट मेसेज करा"
                  >
                    <span>{rawPhone}</span>
                    <span style={{fontSize:'0.75rem',background:'#25d366',color:'#ffffff',padding:'2px 8px',borderRadius:'6px',textDecoration:'none',fontWeight:'800'}}>Chat ➔</span>
                  </a>
                );
              })()}
            </div>

            <div className="receipt-info-item">
              <span className="receipt-item-label">{isMr ? 'ईमेल आयडी:' : 'Email:'}</span>
              <span className="receipt-item-val">{application.email || 'उपलब्ध नाही'}</span>
            </div>

            {/* Location Hierarchy */}
            <div className="receipt-info-item">
              <span className="receipt-item-label">{isMr ? 'गाव (Village):' : 'Village:'}</span>
              <strong className="receipt-item-val text-slate-900">{application.village}</strong>
            </div>

            <div className="receipt-info-item">
              <span className="receipt-item-label">{isMr ? 'तालुका व जिल्हा:' : 'Taluka & District:'}</span>
              <strong className="receipt-item-val">{application.taluka}, {application.district}</strong>
            </div>

            <div className="receipt-info-item">
              <span className="receipt-item-label">{isMr ? 'राज्य:' : 'State:'}</span>
              <span className="receipt-item-val">{application.state || 'Maharashtra'}</span>
            </div>

            <div className="receipt-info-item">
              <span className="receipt-item-label">{isMr ? 'पिनकोड:' : 'Pincode:'}</span>
              <span className="receipt-item-val">{application.pincode || '-'}</span>
            </div>

            {/* Franchise Model & Business Details */}
            <div className="receipt-info-item full-span">
              <span className="receipt-item-label">{isMr ? 'निवडलेले फ्रँचायझी मॉडेल:' : 'Franchise Model:'}</span>
              <strong className="receipt-item-val text-rose-700 text-base">
                {application.franchiseModelTitle} ({application.franchiseInvestment})
              </strong>
            </div>

            <div className="receipt-info-item full-span">
              <span className="receipt-item-label">{isMr ? 'दुकान / जागेची उपलब्धता:' : 'Premises Status:'}</span>
              <span className="receipt-item-val font-semibold">{application.premisesStatus}</span>
            </div>

            {application.address && (
              <div className="receipt-info-item full-span">
                <span className="receipt-item-label">{isMr ? 'सविस्तर पत्ता:' : 'Full Street Address:'}</span>
                <span className="receipt-item-val">{application.address}</span>
              </div>
            )}

            {application.experienceNote && (
              <div className="receipt-info-item full-span">
                <span className="receipt-item-label">{isMr ? 'अनुभव / संदेश:' : 'Experience or Note:'}</span>
                <p className="text-sm text-slate-700 mt-1 italic">"{application.experienceNote}"</p>
              </div>
            )}
          </div>

          {/* Quick WhatsApp message action */}
          <div className="mt-4 flex gap-2 no-print">
            <a
              href={`https://api.whatsapp.com/send?phone=91${application.whatsappNumber}&text=${encodeURIComponent(`नमस्कार ${application.applicantName}, अस्तित्व सॅनिटरी पॅड फ्रँचायझीसाठी आपण अर्ज (क्र. ${application.applicationNumber}) केला होता. त्याबद्दल पुढील चर्चा करण्यासाठी संपर्क साधत आहोत.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="sweet-submit-btn flex-1 text-center py-2.5 text-sm"
              style={{ background: '#25d366' }}
            >
              <span>व्हॉट्सॲपवर चॅट सुरू करा</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
