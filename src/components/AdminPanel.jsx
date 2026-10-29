import React, { useState, useEffect, useMemo } from 'react';
import { 
  Printer, 
  RefreshCw, 
  Search, 
  Filter, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Eye, 
  FileSpreadsheet, 
  Loader2, 
  Sparkles,
  ArrowLeft,
  Copy,
  Check,
  TrendingUp,
  RotateCcw
} from 'lucide-react';
import { fetchAllFranchiseApplications, updateFranchiseStatus } from '../services/firebase';
import { openDirectWhatsApp, getDirectWhatsAppHref } from '../utils/whatsapp';
import WhatsAppIcon from './WhatsAppIcon';

const buildApplicantWhatsAppMessage = (applicantName, appNumber) => {
  return (
    `नमस्कार ${applicantName || ''},\n\n` +
    `आम्ही Inodayam Tech Private Limited / अस्तित्व सॅनिटरी पॅड कडून संपर्क करत आहोत.\n` +
    `तुमचा फ्रँचायझी अर्ज (अर्ज क्र: ${appNumber || ''}) आम्हाला प्राप्त झाला आहे.\n\n` +
    `पुढील प्रक्रियेसाठी आम्ही आपल्याशी चर्चा करू इच्छितो.`
  );
};

export default function AdminPanel({ lang, onBackToLanding, onSelectApplicationForView }) {
  const isMr = lang === 'mr';

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDistrict, setFilterDistrict] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [statusUpdatingId, setStatusUpdatingId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // Load from Firebase on Mount
  const loadApplications = async () => {
    setLoading(true);
    try {
      const list = await fetchAllFranchiseApplications();
      setApplications(list);
    } catch (err) {
      console.error('Error fetching applications for admin:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  // Update Status handler
  const handleStatusChange = async (appId, newStatus) => {
    setStatusUpdatingId(appId);
    try {
      await updateFranchiseStatus(appId, newStatus);
      setApplications(prev => prev.map(item => {
        if (item.id === appId || item.applicationNumber === appId) {
          return { ...item, status: newStatus };
        }
        return item;
      }));
    } catch (e) {
      console.error(e);
    } finally {
      setStatusUpdatingId(null);
    }
  };

  // Copy Application ID to clipboard
  const handleCopyAppId = (id) => {
    if (!id) return;
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Distinct districts from applications for filter dropdown
  const uniqueDistricts = useMemo(() => {
    const set = new Set();
    applications.forEach(a => {
      if (a.district) set.add(a.district);
    });
    return Array.from(set).sort();
  }, [applications]);

  // Filtered Applications
  const filteredApps = useMemo(() => {
    return applications.filter(app => {
      // District filter
      if (filterDistrict !== 'ALL' && app.district !== filterDistrict) {
        return false;
      }

      // Status filter
      if (filterStatus !== 'ALL' && app.status !== filterStatus) {
        return false;
      }

      // Search term
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase().trim();
        const matchName = (app.applicantName || '').toLowerCase().includes(q);
        const matchMobile = (app.mobileNumber || '').includes(q);
        const matchVillage = (app.village || '').toLowerCase().includes(q);
        const matchTaluka = (app.taluka || '').toLowerCase().includes(q);
        const matchDistrict = (app.district || '').toLowerCase().includes(q);
        const matchId = (app.applicationNumber || '').toLowerCase().includes(q);
        return matchName || matchMobile || matchVillage || matchTaluka || matchDistrict || matchId;
      }

      return true;
    });
  }, [applications, filterDistrict, filterStatus, searchTerm]);

  // KPI Counts & Progress Metrics
  const stats = useMemo(() => {
    const total = applications.length;
    const uniqueDist = new Set(applications.map(a => a.district).filter(Boolean)).size;
    const uniqueTal = new Set(applications.map(a => `${a.district}-${a.taluka}`)).size;
    const pending = applications.filter(a => a.status === 'Pending').length;
    const contacted = applications.filter(a => a.status === 'Contacted').length;
    const approved = applications.filter(a => a.status === 'Approved').length;
    const rejected = applications.filter(a => a.status === 'Rejected').length;
    const progressRate = total > 0 ? Math.round(((approved + contacted) / total) * 100) : 0;

    return { total, uniqueDist, uniqueTal, pending, contacted, approved, rejected, progressRate };
  }, [applications]);

  // Export to PDF (triggers clean print of the admin table report)
  const handleExportPDF = () => {
    window.print();
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (filteredApps.length === 0) {
      alert(isMr ? 'एक्सपोर्ट करण्यासाठी कोणताही डेटा नाही.' : 'No data to export.');
      return;
    }

    const headers = [
      'Application Number',
      'Date',
      'Applicant Name',
      'Mobile',
      'WhatsApp',
      'Email',
      'State',
      'District',
      'Taluka',
      'Village',
      'Franchise Model',
      'Investment',
      'Premises Status',
      'Status',
      'Address',
      'Pincode'
    ];

    const rows = filteredApps.map(a => [
      `"${a.applicationNumber || ''}"`,
      `"${a.createdAt ? new Date(a.createdAt).toLocaleDateString() : ''}"`,
      `"${a.applicantName || ''}"`,
      `"${a.mobileNumber || ''}"`,
      `"${a.whatsappNumber || ''}"`,
      `"${a.email || ''}"`,
      `"${a.state || 'Maharashtra'}"`,
      `"${a.district || ''}"`,
      `"${a.taluka || ''}"`,
      `"${a.village || ''}"`,
      `"${a.franchiseModelTitle || ''}"`,
      `"${a.franchiseInvestment || ''}"`,
      `"${a.premisesStatus || ''}"`,
      `"${a.status || 'Pending'}"`,
      `"${(a.address || '').replace(/"/g, '""')}"`,
      `"${a.pincode || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Astitva_Franchise_Applications_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResetFilters = () => {
    setFilterStatus('ALL');
    setFilterDistrict('ALL');
    setSearchTerm('');
  };

  const isFilterActive = filterStatus !== 'ALL' || filterDistrict !== 'ALL' || searchTerm.trim() !== '';

  return (
    <div className="admin-container sweet-admin-theme">
      {/* Printable Report Header (Visible only in Print / PDF export) */}
      <div className="print-only-header">
        <div className="print-logo-row">
          <h2>🏢 इनोदयम टेक प्रा. लि. (Inodayam Tech Pvt. Ltd.)</h2>
          <span className="print-date">तारीख: {new Date().toLocaleDateString('mr-IN')}</span>
        </div>
        <h3 className="print-report-title">अस्तित्व सॅनिटरी पॅड व गाव प्रतिनिधी फ्रँचायझी अहवाल</h3>
        <p className="print-report-meta">
          एकूण अर्ज: {filteredApps.length} • फिल्टर: {filterDistrict !== 'ALL' ? filterDistrict : 'सर्व जिल्हे'} • स्थिती: {filterStatus !== 'ALL' ? filterStatus : 'सर्व'}
        </p>
      </div>

      {/* Sweet Top Navigation / Status Header Bar */}
      <div className="sweet-admin-topbar no-print">
        <div className="topbar-left-zone">
          {onBackToLanding && (
            <button 
              type="button" 
              className="sweet-back-btn"
              onClick={onBackToLanding}
              title={isMr ? 'मुख्य वेबसाइटवर परत जा' : 'Back to Website'}
            >
              <ArrowLeft size={16} />
              <span>{isMr ? 'मुख्य वेबसाइट' : 'Main Website'}</span>
            </button>
          )}

          <div className="sweet-live-indicator-pill">
            <span className="sweet-live-pulsing-dot" />
            <span className="sweet-live-text">
              {isMr ? 'थेट फायरस्टोअर जोडणी सक्रिय' : 'Live Firestore Synced'}
            </span>
          </div>
        </div>

        <div className="topbar-right-zone">
          <span className="sweet-date-badge">
            📅 {new Date().toLocaleDateString(isMr ? 'mr-IN' : 'en-IN', { 
              day: 'numeric', 
              month: 'short', 
              year: 'numeric' 
            })}
          </span>
        </div>
      </div>

      {/* Admin Screen Title Row & Action Buttons */}
      <div className="admin-header-row sweet-header-card no-print">
        <div className="admin-title-area">
          <div className="flex items-center gap-2 mb-1">
            <span className="sweet-brand-flower">🌸</span>
            <span className="sweet-admin-pill-tag">
              {isMr ? 'प्रशासक नियंत्रण कक्ष' : 'Admin Control Hub'}
            </span>
          </div>
          <h2 className="admin-main-title">
            {isMr ? 'अस्तित्व व गाव प्रतिनिधी • डॅशबोर्ड' : 'Astitva & Village Reps • Dashboard'}
          </h2>
          <p className="admin-main-subtitle">
            {isMr 
              ? 'महाराष्ट्रातील खेड्यापाड्यांतून आलेले सर्व अर्ज पहा, स्थिती बदला व एका क्लिकवर संपर्क करा:' 
              : 'Manage village applications, update stages, and contact candidates directly:'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="admin-action-buttons">
          {/* Refresh Button */}
          <button 
            type="button" 
            className="admin-btn sweet-refresh-btn"
            onClick={loadApplications}
            disabled={loading}
            title={isMr ? 'डेटा रीलोड करा' : 'Refresh Data'}
          >
            <RefreshCw size={15} className={loading ? 'spinner-icon' : ''} />
            <span>{isMr ? 'रिफ्रेश' : 'Refresh'}</span>
          </button>

          {/* Export to CSV */}
          <button 
            type="button" 
            className="admin-btn sweet-csv-btn"
            onClick={handleExportCSV}
            title={isMr ? 'Excel / CSV फाईल डाउनलोड करा' : 'Download Excel CSV'}
          >
            <FileSpreadsheet size={16} />
            <span>{isMr ? 'Excel' : 'Excel'}</span>
          </button>

          {/* Export to PDF */}
          <button 
            type="button" 
            className="admin-btn sweet-pdf-btn"
            onClick={handleExportPDF}
            title={isMr ? 'अहवाल प्रिंट करा किंवा PDF सेव्ह करा' : 'Print PDF Report'}
          >
            <Printer size={16} />
            <span>{isMr ? 'PDF अहवाल' : 'PDF Report'}</span>
          </button>
        </div>
      </div>

      {/* Interactive KPI Bento Cards (CLICK TO FILTER!) */}
      <div className="sweet-kpi-grid no-print">
        {/* Total Applications Card */}
        <button
          type="button"
          className={`sweet-kpi-card total-kpi ${filterStatus === 'ALL' ? 'active-filter-card' : ''}`}
          onClick={() => setFilterStatus('ALL')}
          title={isMr ? 'सर्व अर्ज दाखवा' : 'Show All Applications'}
        >
          <div className="kpi-top-row">
            <span className="kpi-icon-bubble">📋</span>
            <span className="kpi-tag-label">{isMr ? 'सर्व अर्ज' : 'Total Apps'}</span>
          </div>
          <div className="kpi-val-row">
            <strong className="kpi-number">{stats.total}</strong>
            <span className="kpi-filter-hint">
              {filterStatus === 'ALL' ? (isMr ? '● निवडलेले' : '● Active') : (isMr ? 'क्लिक करा ➔' : 'Click ➔')}
            </span>
          </div>
          <span className="kpi-detail-sub">{isMr ? 'फायरबेस डेटाबेस' : 'Firebase Total'}</span>
        </button>

        {/* Pending Card */}
        <button
          type="button"
          className={`sweet-kpi-card pending-kpi ${filterStatus === 'Pending' ? 'active-filter-card' : ''}`}
          onClick={() => setFilterStatus(prev => prev === 'Pending' ? 'ALL' : 'Pending')}
          title={isMr ? 'प्रलंबित अर्ज फिल्टर करा' : 'Filter Pending Apps'}
        >
          <div className="kpi-top-row">
            <span className="kpi-icon-bubble">⏳</span>
            <span className="kpi-tag-label">{isMr ? 'प्रलंबित' : 'Pending'}</span>
          </div>
          <div className="kpi-val-row">
            <strong className="kpi-number text-amber-600">{stats.pending}</strong>
            <span className="kpi-filter-hint">
              {filterStatus === 'Pending' ? (isMr ? '● निवडलेले' : '● Active') : (isMr ? 'फिल्टर करा' : 'Filter')}
            </span>
          </div>
          <span className="kpi-detail-sub">{isMr ? 'संपर्क बाकी आहे' : 'Action required'}</span>
        </button>

        {/* Contacted Card */}
        <button
          type="button"
          className={`sweet-kpi-card contacted-kpi ${filterStatus === 'Contacted' ? 'active-filter-card' : ''}`}
          onClick={() => setFilterStatus(prev => prev === 'Contacted' ? 'ALL' : 'Contacted')}
          title={isMr ? 'संपर्क झालेले अर्ज फिल्टर करा' : 'Filter Contacted Apps'}
        >
          <div className="kpi-top-row">
            <span className="kpi-icon-bubble">📞</span>
            <span className="kpi-tag-label">{isMr ? 'संपर्क झाला' : 'Contacted'}</span>
          </div>
          <div className="kpi-val-row">
            <strong className="kpi-number text-sky-600">{stats.contacted}</strong>
            <span className="kpi-filter-hint">
              {filterStatus === 'Contacted' ? (isMr ? '● निवडलेले' : '● Active') : (isMr ? 'फिल्टर करा' : 'Filter')}
            </span>
          </div>
          <span className="kpi-detail-sub">{isMr ? 'चर्चा सुरू आहे' : 'In Discussion'}</span>
        </button>

        {/* Approved Card */}
        <button
          type="button"
          className={`sweet-kpi-card approved-kpi ${filterStatus === 'Approved' ? 'active-filter-card' : ''}`}
          onClick={() => setFilterStatus(prev => prev === 'Approved' ? 'ALL' : 'Approved')}
          title={isMr ? 'मंजूर अर्ज फिल्टर करा' : 'Filter Approved Apps'}
        >
          <div className="kpi-top-row">
            <span className="kpi-icon-bubble">✅</span>
            <span className="kpi-tag-label">{isMr ? 'मंजूर प्रतिनिधी' : 'Approved'}</span>
          </div>
          <div className="kpi-val-row">
            <strong className="kpi-number text-emerald-600">{stats.approved}</strong>
            <span className="kpi-filter-hint">
              {filterStatus === 'Approved' ? (isMr ? '● निवडलेले' : '● Active') : (isMr ? 'फिल्टर करा' : 'Filter')}
            </span>
          </div>
          <span className="kpi-detail-sub">{isMr ? 'सक्रिय फ्रँचायझी' : 'Confirmed Reps'}</span>
        </button>

        {/* Districts Coverage Card */}
        <div className="sweet-kpi-card district-kpi">
          <div className="kpi-top-row">
            <span className="kpi-icon-bubble">📍</span>
            <span className="kpi-tag-label">{isMr ? 'जिल्हे कव्हरेज' : 'Districts'}</span>
          </div>
          <div className="kpi-val-row">
            <strong className="kpi-number text-violet-700">{stats.uniqueDist} <span className="kpi-denom">/ ३६</span></strong>
            <span className="kpi-filter-hint">{stats.uniqueTal} {isMr ? 'तालुके' : 'talukas'}</span>
          </div>
          <span className="kpi-detail-sub">{isMr ? 'महाराष्ट्र विस्तार' : 'Across Maharashtra'}</span>
        </div>
      </div>

      {/* Interactive Progress & Ratio Bar */}
      <div className="sweet-progress-strip no-print">
        <div className="progress-info-row">
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-emerald-600" />
            <strong className="text-sm text-slate-800">
              {isMr ? 'अर्ज प्रक्रिया दर (Processing Rate):' : 'Processing Rate:'} {stats.progressRate}%
            </strong>
          </div>
          <span className="text-xs text-slate-500">
            {stats.approved + stats.contacted} {isMr ? 'पूर्ण किंवा संपर्कात' : 'handled'} / {stats.total} {isMr ? 'एकूण' : 'total'}
          </span>
        </div>
        <div className="progress-track">
          <div 
            className="progress-fill-bar" 
            style={{ width: `${Math.min(100, Math.max(8, stats.progressRate))}%` }}
          />
        </div>
      </div>

      {/* Interactive Toolbar: Status Pills + Search + District Dropdown */}
      <div className="sweet-filter-toolbar no-print">
        {/* Quick Status Filter Pills */}
        <div className="sweet-status-pills-row">
          <button
            type="button"
            className={`status-chip-btn ${filterStatus === 'ALL' ? 'active-chip' : ''}`}
            onClick={() => setFilterStatus('ALL')}
          >
            <span>{isMr ? 'सर्व अर्ज' : 'All'}</span>
            <span className="chip-badge">{stats.total}</span>
          </button>

          <button
            type="button"
            className={`status-chip-btn pending-chip ${filterStatus === 'Pending' ? 'active-chip' : ''}`}
            onClick={() => setFilterStatus('Pending')}
          >
            <Clock size={13} />
            <span>{isMr ? 'प्रलंबित' : 'Pending'}</span>
            <span className="chip-badge">{stats.pending}</span>
          </button>

          <button
            type="button"
            className={`status-chip-btn contacted-chip ${filterStatus === 'Contacted' ? 'active-chip' : ''}`}
            onClick={() => setFilterStatus('Contacted')}
          >
            <Phone size={13} />
            <span>{isMr ? 'संपर्क झाला' : 'Contacted'}</span>
            <span className="chip-badge">{stats.contacted}</span>
          </button>

          <button
            type="button"
            className={`status-chip-btn approved-chip ${filterStatus === 'Approved' ? 'active-chip' : ''}`}
            onClick={() => setFilterStatus('Approved')}
          >
            <CheckCircle2 size={13} />
            <span>{isMr ? 'मंजूर' : 'Approved'}</span>
            <span className="chip-badge">{stats.approved}</span>
          </button>

          {stats.rejected > 0 && (
            <button
              type="button"
              className={`status-chip-btn rejected-chip ${filterStatus === 'Rejected' ? 'active-chip' : ''}`}
              onClick={() => setFilterStatus('Rejected')}
            >
              <XCircle size={13} />
              <span>{isMr ? 'नामंजूर' : 'Rejected'}</span>
              <span className="chip-badge">{stats.rejected}</span>
            </button>
          )}
        </div>

        {/* Search & District Filter Controls */}
        <div className="sweet-controls-row">
          {/* Live Search */}
          <div className="sweet-search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              className="sweet-search-input"
              placeholder={isMr ? 'नाव, मोबाईल, गाव, तालुका किंवा अर्ज क्र. शोधा...' : 'Search name, mobile, village, ID...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                type="button" 
                className="sweet-clear-search-btn" 
                onClick={() => setSearchTerm('')}
                title="Clear"
              >
                ✕
              </button>
            )}
          </div>

          {/* District Dropdown Filter */}
          <div className="sweet-dropdown-wrap">
            <Filter size={15} className="dropdown-filter-icon" />
            <select
              className="sweet-select"
              value={filterDistrict}
              onChange={(e) => setFilterDistrict(e.target.value)}
            >
              <option value="ALL">-- {isMr ? 'सर्व जिल्हे (All Districts)' : 'All Districts'} --</option>
              {uniqueDistricts.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Reset Filters Pill (visible only when active) */}
          {isFilterActive && (
            <button
              type="button"
              className="sweet-reset-filters-btn"
              onClick={handleResetFilters}
              title={isMr ? 'सर्व फिल्टर काढा' : 'Reset All Filters'}
            >
              <RotateCcw size={14} />
              <span>{isMr ? 'फिल्टर काढा' : 'Reset'}</span>
            </button>
          )}
        </div>

        {/* Result Counter Pill */}
        <div className="sweet-results-counter">
          <span>
            {isMr ? 'दाखवत आहे:' : 'Showing:'} <strong>{filteredApps.length}</strong> {isMr ? 'अर्ज' : 'applications'}
          </span>
        </div>
      </div>

      {/* Applications Data Container */}
      <div className="sweet-table-card">
        {loading ? (
          <div className="admin-loading-screen">
            <Loader2 size={36} className="spinner-icon text-pink-600 mb-3" />
            <h4 className="font-bold text-slate-800">
              {isMr ? 'फायरबेस फायरस्टोअरमधून अर्ज लोड होत आहेत...' : 'Loading applications from Firebase...'}
            </h4>
            <p className="text-xs text-slate-400 mt-1">Please wait a moment</p>
          </div>
        ) : filteredApps.length === 0 ? (
          <div className="admin-empty-screen">
            <Sparkles size={40} className="text-pink-400 mx-auto mb-3" />
            <h4 className="font-bold text-slate-800 text-lg">
              {isMr ? 'कोणतेही अर्ज आढळले नाहीत' : 'No applications found'}
            </h4>
            <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
              {isFilterActive 
                ? (isMr ? 'तुमच्या फिल्टर निकषांशी जुळणारा कोणताही अर्ज नाही. कृपया फिल्टर रीसेट करून पहा.' : 'No items match your filter. Try resetting filters.')
                : (isMr ? 'नवीन अर्जदार नोंदणी करताच ते येथे आपोआप थेट दिसू लागतील.' : 'As applicants register, they will appear here.')}
            </p>
            {isFilterActive && (
              <button
                type="button"
                className="sweet-reset-filters-btn mt-4 inline-flex"
                onClick={handleResetFilters}
              >
                <RotateCcw size={14} />
                <span>{isMr ? 'सर्व फिल्टर रीसेट करा' : 'Reset All Filters'}</span>
              </button>
            )}
          </div>
        ) : (
          <>
            {/* 1. MOBILE CARDS VIEW (Clean, touch-friendly phone view) */}
            <div className="admin-mobile-cards-list mobile-only-view no-print">
              {filteredApps.map((item, idx) => (
                <div key={item.id || item.applicationNumber || idx} className="sweet-mobile-card">
                  {/* Top Bar: ID + Copy Button + Status Selector */}
                  <div className="mobile-card-top-row">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        className="sweet-copy-id-btn"
                        onClick={() => handleCopyAppId(item.applicationNumber)}
                        title={isMr ? 'अर्ज क्रमांक कॉपी करा' : 'Copy Application ID'}
                      >
                        <span className="app-id-pill font-mono">{item.applicationNumber}</span>
                        {copiedId === item.applicationNumber ? (
                          <Check size={13} className="text-emerald-600" />
                        ) : (
                          <Copy size={13} className="text-slate-400" />
                        )}
                      </button>

                      <span className="text-xs text-slate-400">
                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString('mr-IN') : 'आज'}
                      </span>
                    </div>

                    <select
                      className={`status-select-badge ${item.status || 'Pending'}`}
                      value={item.status || 'Pending'}
                      onChange={(e) => handleStatusChange(item.id || item.applicationNumber, e.target.value)}
                      disabled={statusUpdatingId === (item.id || item.applicationNumber)}
                    >
                      <option value="Pending">Pending (प्रलंबित)</option>
                      <option value="Contacted">Contacted (संपर्क)</option>
                      <option value="Approved">Approved (मंजूर)</option>
                      <option value="Rejected">Rejected (नामंजूर)</option>
                    </select>
                  </div>

                  {/* Applicant Name & Location */}
                  <div className="mobile-card-applicant-info">
                    <h4 className="mobile-applicant-name">{item.applicantName}</h4>
                    <div className="mobile-location-row">
                      <MapPin size={13} className="text-pink-600 flex-shrink-0" />
                      <span>
                        <strong>{item.village}</strong>, {item.taluka}, {item.district}
                      </span>
                    </div>
                  </div>

                  {/* Quick Action Buttons for Mobile */}
                  <div className="mobile-card-actions">
                    <a 
                      href={`tel:${item.mobileNumber}`}
                      className="mobile-action-btn call-action"
                      title={isMr ? 'कॉल करा' : 'Call'}
                    >
                      <Phone size={13} />
                      <span>{item.mobileNumber}</span>
                    </a>

                    {(item.whatsappNumber || item.mobileNumber) && (
                      <a 
                        href={getDirectWhatsAppHref(
                          item.whatsappNumber || item.mobileNumber,
                          buildApplicantWhatsAppMessage(item.applicantName, item.applicationNumber)
                        )}
                        onClick={(e) => {
                          e.preventDefault();
                          openDirectWhatsApp(
                            item.whatsappNumber || item.mobileNumber,
                            buildApplicantWhatsAppMessage(item.applicantName, item.applicationNumber)
                          );
                        }}
                        className="mobile-action-btn wa-action"
                        title={isMr ? 'व्हॉट्सॲपवर चॅट करा' : 'Chat on WhatsApp'}
                      >
                        <WhatsAppIcon size={14} color="#ffffff" />
                        <span>WhatsApp</span>
                      </a>
                    )}

                    <button
                      type="button"
                      className="mobile-action-btn view-action"
                      onClick={() => onSelectApplicationForView(item)}
                      title={isMr ? 'तपशील पहा' : 'View Details'}
                    >
                      <Eye size={14} />
                      <span>{isMr ? 'पावती' : 'View'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* 2. DESKTOP & PRINT TABLE VIEW */}
            <div className="table-responsive-wrapper desktop-and-print-view">
              <table className="admin-data-table sweet-table">
                <thead>
                  <tr>
                    <th style={{ width: '17%' }}>{isMr ? 'अर्ज क्र. व तारीख' : 'App ID & Date'}</th>
                    <th style={{ width: '22%' }}>{isMr ? 'अर्जदाराचे नाव' : 'Applicant Name'}</th>
                    <th style={{ width: '22%' }}>{isMr ? 'मोबाईल / व्हॉट्सॲप' : 'Contact'}</th>
                    <th style={{ width: '21%' }}>{isMr ? 'गाव, तालुका, जिल्हा' : 'Location'}</th>
                    <th style={{ width: '12%' }}>{isMr ? 'स्थिती' : 'Status'}</th>
                    <th style={{ width: '6%' }} className="no-print text-center">{isMr ? 'पावती' : 'View'}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApps.map((item, idx) => (
                    <tr key={item.id || item.applicationNumber || idx}>
                      <td>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            className="sweet-copy-id-btn"
                            onClick={() => handleCopyAppId(item.applicationNumber)}
                            title={isMr ? 'अर्ज क्र. कॉपी करा' : 'Copy Application ID'}
                          >
                            <span className="app-id-pill font-mono">{item.applicationNumber}</span>
                            {copiedId === item.applicationNumber ? (
                              <Check size={12} className="text-emerald-600" />
                            ) : (
                              <Copy size={12} className="text-slate-400" />
                            )}
                          </button>
                        </div>
                        <span className="app-date-text">
                          {item.createdAt ? new Date(item.createdAt).toLocaleDateString('mr-IN') : 'आज'}
                        </span>
                      </td>

                      <td>
                        <strong className="applicant-name-bold">{item.applicantName}</strong>
                        {item.email && (
                          <span className="text-xs text-slate-400 block truncate max-w-[200px]">{item.email}</span>
                        )}
                      </td>

                      <td>
                        <div className="contact-cell">
                          <a 
                            href={`tel:${item.mobileNumber}`} 
                            className="phone-link text-slate-900"
                            title={isMr ? 'कॉल करा' : 'Call'}
                          >
                            <Phone size={13} className="inline mr-1 text-pink-600" />
                            <span>{item.mobileNumber}</span>
                          </a>
                          {(item.whatsappNumber || item.mobileNumber) && (
                            <a
                              href={getDirectWhatsAppHref(
                                item.whatsappNumber || item.mobileNumber,
                                buildApplicantWhatsAppMessage(item.applicantName, item.applicationNumber)
                              )}
                              onClick={(e) => {
                                e.preventDefault();
                                openDirectWhatsApp(
                                  item.whatsappNumber || item.mobileNumber,
                                  buildApplicantWhatsAppMessage(item.applicantName, item.applicationNumber)
                                );
                              }}
                              className="whatsapp-micro-link"
                              title={isMr ? 'व्हॉट्सॲपवर संदेश पाठवा' : 'Chat on WhatsApp'}
                            >
                              <WhatsAppIcon size={13} color="#047857" className="inline mr-1" />
                              <span>WA: {item.whatsappNumber || item.mobileNumber}</span>
                            </a>
                          )}
                        </div>
                      </td>

                      <td>
                        <div className="location-cell">
                          <strong className="village-bold">📍 {item.village}</strong>
                          <span className="taluka-dist-sub">{item.taluka}, {item.district}</span>
                        </div>
                      </td>

                      <td>
                        <select
                          className={`status-select-badge ${item.status || 'Pending'}`}
                          value={item.status || 'Pending'}
                          onChange={(e) => handleStatusChange(item.id || item.applicationNumber, e.target.value)}
                          disabled={statusUpdatingId === (item.id || item.applicationNumber)}
                        >
                          <option value="Pending">Pending (प्रलंबित)</option>
                          <option value="Contacted">Contacted (संपर्क)</option>
                          <option value="Approved">Approved (मंजूर)</option>
                          <option value="Rejected">Rejected (नामंजूर)</option>
                        </select>
                      </td>

                      <td className="no-print text-center">
                        <button
                          type="button"
                          className="view-slip-btn sweet-view-btn"
                          onClick={() => onSelectApplicationForView(item)}
                          title={isMr ? 'पूर्ण पावती व अर्ज तपशील पहा' : 'View Full Details'}
                        >
                          <Eye size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
