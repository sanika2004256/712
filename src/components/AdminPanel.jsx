import React, { useState, useEffect, useMemo } from 'react';
import { 
  FileDown, 
  Printer, 
  RefreshCw, 
  Search, 
  Filter, 
  Phone, 
  MapPin, 
  Calendar, 
  CheckCircle, 
  Clock, 
  UserCheck, 
  XCircle, 
  Eye, 
  Download,
  Building2,
  FileSpreadsheet,
  Loader2,
  Sparkles,
  MessageCircle
} from 'lucide-react';
import { fetchAllFranchiseApplications, updateFranchiseStatus } from '../services/firebase';

export default function AdminPanel({ lang, onSelectApplicationForView }) {
  const isMr = lang === 'mr';

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDistrict, setFilterDistrict] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [statusUpdatingId, setStatusUpdatingId] = useState(null);

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

  // KPI Counts
  const stats = useMemo(() => {
    const total = applications.length;
    const uniqueDist = new Set(applications.map(a => a.district)).size;
    const uniqueTal = new Set(applications.map(a => `${a.district}-${a.taluka}`)).size;
    const pending = applications.filter(a => a.status === 'Pending').length;
    const contacted = applications.filter(a => a.status === 'Contacted').length;
    const approved = applications.filter(a => a.status === 'Approved').length;

    return { total, uniqueDist, uniqueTal, pending, contacted, approved };
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

  return (
    <div className="admin-container">
      {/* Printable Report Header (Visible only in Print / PDF export) */}
      <div className="print-only-header">
        <div className="print-logo-row">
          <h2>🌸 अस्तित्व सॅनिटरी पॅड (Astitva Sanitary Pads)</h2>
          <span className="print-date">तारीख: {new Date().toLocaleDateString('mr-IN')}</span>
        </div>
        <h3 className="print-report-title">फ्रँचायझी अर्जदार मास्टर अहवाल (Official Franchise Report)</h3>
        <p className="print-report-meta">
          एकूण अर्ज: {filteredApps.length} • फिल्टर: {filterDistrict !== 'ALL' ? filterDistrict : 'सर्व जिल्हे'} • स्थिती: {filterStatus !== 'ALL' ? filterStatus : 'सर्व'}
        </p>
      </div>

      {/* Admin Screen Header */}
      <div className="admin-header-row no-print">
        <div className="admin-title-area">
          <h2 className="admin-main-title">
            {isMr ? 'अस्तित्व फ्रँचायझी ॲडमिन पॅनेल' : 'Astitva Admin Dashboard'}
          </h2>
          <p className="admin-main-subtitle">
            {isMr 
              ? 'सर्व जिल्ह्यांमधून व खेड्यापाड्यांतून आलेले फ्रँचायझी अर्ज पहा व PDF एक्सपोर्ट करा:' 
              : 'Manage applications and export PDF reports:'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="admin-action-buttons">
          {/* Refresh Button */}
          <button 
            type="button" 
            className="admin-btn refresh-btn"
            onClick={loadApplications}
            disabled={loading}
          >
            <RefreshCw size={14} className={`inline mr-1 ${loading ? 'spinner-icon' : ''}`} />
            <span>{isMr ? 'रिफ्रेश' : 'Refresh'}</span>
          </button>

          {/* Export to CSV */}
          <button 
            type="button" 
            className="admin-btn csv-btn"
            onClick={handleExportCSV}
          >
            <FileSpreadsheet size={15} className="inline mr-1 text-emerald-600" />
            <span>{isMr ? 'CSV / Excel' : 'Excel'}</span>
          </button>

          {/* Export to PDF */}
          <button 
            type="button" 
            className="admin-btn pdf-btn"
            onClick={handleExportPDF}
          >
            <Printer size={15} className="inline mr-1 text-white" />
            <span>{isMr ? 'PDF एक्सपोर्ट' : 'Export PDF'}</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="kpi-cards-grid no-print">
        <div className="kpi-card total">
          <span className="kpi-label">{isMr ? 'एकूण अर्ज' : 'Total Applications'}</span>
          <strong className="kpi-val">{stats.total}</strong>
          <span className="kpi-sub">{isMr ? 'फायरबेस फायरस्टोअर' : 'In Firestore'}</span>
        </div>

        <div className="kpi-card districts">
          <span className="kpi-label">{isMr ? 'जिल्हे' : 'Districts'}</span>
          <strong className="kpi-val">{stats.uniqueDist} / ३६</strong>
          <span className="kpi-sub">{isMr ? 'महाराष्ट्रातील जिल्हे' : 'MH Districts'}</span>
        </div>

        <div className="kpi-card talukas">
          <span className="kpi-label">{isMr ? 'तालुके' : 'Talukas'}</span>
          <strong className="kpi-val">{stats.uniqueTal}</strong>
          <span className="kpi-sub">{isMr ? 'विविध तालुके' : 'Unique Talukas'}</span>
        </div>

        <div className="kpi-card pending">
          <span className="kpi-label">{isMr ? 'प्रलंबित' : 'Pending'}</span>
          <strong className="kpi-val text-amber-600">{stats.pending}</strong>
          <span className="kpi-sub">{isMr ? 'संपर्क करायचा आहे' : 'Need contact'}</span>
        </div>

        <div className="kpi-card approved">
          <span className="kpi-label">{isMr ? 'मंजूर' : 'Approved'}</span>
          <strong className="kpi-val text-emerald-600">{stats.approved}</strong>
          <span className="kpi-sub">{isMr ? 'सक्रिय फ्रँचायझी' : 'Active units'}</span>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="admin-filter-toolbar no-print">
        {/* Search */}
        <div className="admin-search-wrapper">
          <Search size={16} className="admin-search-icon" />
          <input
            type="text"
            className="admin-search-input"
            placeholder={isMr ? 'नाव, मोबाईल, गाव, तालुका किंवा अर्ज क्र...' : 'Search by name, mobile, village, ID...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button type="button" className="clear-search-btn" onClick={() => setSearchTerm('')}>✕</button>
          )}
        </div>

        {/* District Filter */}
        <div className="admin-filter-dropdown-wrap">
          <Filter size={14} className="text-slate-500 inline mr-1 flex-shrink-0" />
          <select
            className="admin-select"
            value={filterDistrict}
            onChange={(e) => setFilterDistrict(e.target.value)}
          >
            <option value="ALL">-- {isMr ? 'सर्व जिल्हे' : 'All Districts'} --</option>
            {uniqueDistricts.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="admin-filter-dropdown-wrap">
          <select
            className="admin-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="ALL">-- {isMr ? 'सर्व स्थिती' : 'All Status'} --</option>
            <option value="Pending">{isMr ? 'Pending (प्रलंबित)' : 'Pending'}</option>
            <option value="Contacted">{isMr ? 'Contacted (संपर्क झाला)' : 'Contacted'}</option>
            <option value="Approved">{isMr ? 'Approved (मंजूर)' : 'Approved'}</option>
            <option value="Rejected">{isMr ? 'Rejected (नामंजूर)' : 'Rejected'}</option>
          </select>
        </div>
      </div>

      {/* Applications Data Container */}
      <div className="admin-table-card">
        {loading ? (
          <div className="admin-loading-screen">
            <Loader2 size={32} className="spinner-icon text-rose-600 mb-2" />
            <p>{isMr ? 'फायरबेस फायरस्टोअरमधून अर्ज लोड होत आहेत...' : 'Loading applications from Firebase Firestore...'}</p>
          </div>
        ) : filteredApps.length === 0 ? (
          <div className="admin-empty-screen">
            <Sparkles size={36} className="text-rose-300 mx-auto mb-2" />
            <h4 className="font-bold text-slate-800">{isMr ? 'कोणतेही अर्ज आढळले नाहीत' : 'No applications found'}</h4>
            <p className="text-sm text-slate-500">
              {isMr 
                ? 'नवीन अर्ज सादर होताच ते येथे आपोआप दिसू लागतील.' 
                : 'As soon as users apply, they will automatically appear here.'}
            </p>
          </div>
        ) : (
          <>
            {/* 1. MOBILE CARDS VIEW (Clean, touch-friendly phone view) */}
            <div className="admin-mobile-cards-list mobile-only-view no-print">
              {filteredApps.map((item, idx) => (
                <div key={item.id || item.applicationNumber || idx} className="admin-mobile-app-card">
                  {/* Top Bar: ID + Status Selector */}
                  <div className="mobile-card-top-row">
                    <div className="flex flex-col">
                      <span className="app-id-pill font-mono">{item.applicationNumber}</span>
                      <span className="text-xs text-slate-500 mt-0.5">
                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString('mr-IN') : 'आज'}
                      </span>
                    </div>

                    <select
                      className={`status-select-badge ${item.status || 'Pending'}`}
                      value={item.status || 'Pending'}
                      onChange={(e) => handleStatusChange(item.id || item.applicationNumber, e.target.value)}
                      disabled={statusUpdatingId === (item.id || item.applicationNumber)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>

                  {/* Applicant Name & Model */}
                  <div className="mobile-card-applicant-info">
                    <h4 className="mobile-applicant-name">{item.applicantName}</h4>
                    <span className="mobile-model-tag">
                      🌸 {item.franchiseModelTitle} ({item.franchiseInvestment})
                    </span>
                  </div>

                  {/* Location Info */}
                  <div className="mobile-card-location">
                    <MapPin size={14} className="text-rose-600 inline mr-1 flex-shrink-0" />
                    <span>
                      <strong>{item.village}</strong>, {item.taluka}, {item.district}
                    </span>
                  </div>

                  {/* Quick Action Buttons for Phone */}
                  <div className="mobile-card-actions">
                    <a 
                      href={`tel:${item.mobileNumber}`}
                      className="mobile-action-btn call-action"
                    >
                      <Phone size={14} />
                      <span>{item.mobileNumber}</span>
                    </a>

                    {item.whatsappNumber && (
                      <a 
                        href={`https://api.whatsapp.com/send?phone=91${item.whatsappNumber}&text=${encodeURIComponent(`नमस्कार ${item.applicantName}, अस्तित्व सॅनिटरी पॅड फ्रँचायझी अर्जाबाबत आम्ही संपर्क करत आहोत.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mobile-action-btn wa-action"
                      >
                        <MessageCircle size={14} />
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
                      <span>{isMr ? 'तपशील' : 'View'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* 2. DESKTOP & PRINT TABLE VIEW */}
            <div className="table-responsive-wrapper desktop-and-print-view">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th style={{ width: '13%' }}>{isMr ? 'अर्ज क्र. व तारीख' : 'App ID & Date'}</th>
                    <th style={{ width: '18%' }}>{isMr ? 'अर्जदाराचे नाव' : 'Applicant Name'}</th>
                    <th style={{ width: '15%' }}>{isMr ? 'मोबाईल / व्हॉट्सॲप' : 'Contact'}</th>
                    <th style={{ width: '20%' }}>{isMr ? 'स्थान (गाव, तालुका, जिल्हा)' : 'Location'}</th>
                    <th style={{ width: '16%' }}>{isMr ? 'फ्रँचायझी मॉडेल' : 'Franchise Model'}</th>
                    <th style={{ width: '10%' }}>{isMr ? 'स्थिती' : 'Status'}</th>
                    <th style={{ width: '8%' }} className="no-print">{isMr ? 'कृती' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApps.map((item, idx) => (
                    <tr key={item.id || item.applicationNumber || idx}>
                      <td>
                        <span className="app-id-pill font-mono">{item.applicationNumber}</span>
                        <span className="app-date-text">
                          {item.createdAt ? new Date(item.createdAt).toLocaleDateString('mr-IN') : 'आज'}
                        </span>
                      </td>

                      <td>
                        <strong className="applicant-name-bold">{item.applicantName}</strong>
                        {item.premisesStatus && (
                          <div className="premises-badge-micro">{item.premisesStatus}</div>
                        )}
                      </td>

                      <td>
                        <div className="contact-cell">
                          <a 
                            href={`tel:${item.mobileNumber}`} 
                            className="phone-link text-slate-900"
                            title="Call"
                          >
                            <Phone size={13} className="inline mr-1 text-rose-600" />
                            <span>{item.mobileNumber}</span>
                          </a>
                          {item.whatsappNumber && (
                            <a
                              href={`https://api.whatsapp.com/send?phone=91${item.whatsappNumber}&text=${encodeURIComponent(`नमस्कार ${item.applicantName}, अस्तित्व सॅनिटरी पॅड फ्रँचायझी अर्जाबाबत आम्ही संपर्क करत आहोत.`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="whatsapp-micro-link"
                              title="Chat on WhatsApp"
                            >
                              <span>WA: {item.whatsappNumber}</span>
                            </a>
                          )}
                        </div>
                      </td>

                      <td>
                        <div className="location-cell">
                          <strong className="village-bold">{item.village}</strong>
                          <span className="taluka-dist-sub">{item.taluka}, {item.district}</span>
                        </div>
                      </td>

                      <td>
                        <div className="model-cell">
                          <span className="model-name font-semibold text-rose-800">{item.franchiseModelTitle}</span>
                          <span className="model-invest-badge">{item.franchiseInvestment}</span>
                        </div>
                      </td>

                      <td>
                        <select
                          className={`status-select-badge ${item.status || 'Pending'}`}
                          value={item.status || 'Pending'}
                          onChange={(e) => handleStatusChange(item.id || item.applicationNumber, e.target.value)}
                          disabled={statusUpdatingId === (item.id || item.applicationNumber)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Approved">Approved</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>

                      <td className="no-print text-center">
                        <button
                          type="button"
                          className="view-slip-btn"
                          onClick={() => onSelectApplicationForView(item)}
                          title={isMr ? 'पूर्ण पावती पहा' : 'View Full Details'}
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
