import React from 'react';
import { X, Bookmark, Trash2, ExternalLink, Calendar, MapPin, FileText } from 'lucide-react';

export default function SavedRecordsDrawer({ 
  isOpen, 
  onClose, 
  savedRecords, 
  onSelectRecord, 
  onDeleteRecord, 
  lang 
}) {
  if (!isOpen) return null;
  const isMr = lang === 'mr';

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="flex items-center gap-2">
            <Bookmark className="text-green-700" size={20} />
            <h3 className="drawer-title">
              {isMr ? 'जतन केलेले सातबारा' : 'Saved 7/12 Records'}
            </h3>
            <span className="saved-count-pill">
              {savedRecords.length}
            </span>
          </div>
          <button type="button" className="drawer-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="drawer-body">
          {savedRecords.length === 0 ? (
            <div className="empty-saved-box">
              <FileText size={44} className="text-gray-300 mx-auto mb-3" />
              <p className="empty-saved-title">
                {isMr ? 'कोणतेही जतन केलेले सातबारा नाहीत.' : 'No saved 7/12 records yet.'}
              </p>
              <p className="empty-saved-desc">
                {isMr 
                  ? 'कोणताही सातबारा पाहताना "जतन करा" बटणावर क्लिक करून तो येथे ऑफलाइन साठवून ठेवता येतो.' 
                  : 'Click "Save" when viewing any 7/12 extract to access it quickly here anytime.'}
              </p>
            </div>
          ) : (
            <div className="saved-records-list">
              {savedRecords.map(rec => (
                <div key={rec.verificationCode} className="saved-record-item">
                  <div className="item-header">
                    <span className="saved-gat-tag">गट क्र. {rec.gatNo}</span>
                    <button
                      type="button"
                      className="delete-saved-btn"
                      onClick={() => onDeleteRecord(rec.verificationCode)}
                      title={isMr ? 'काढून टाका' : 'Delete'}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div className="item-location">
                    <MapPin size={13} className="inline mr-1 text-green-700" />
                    <strong>{rec.village}</strong>, {rec.talukaMr}, {rec.districtMr}
                  </div>

                  <div className="item-owner">
                    खातेदार: {rec.owners.map(o => o.name).join(', ')}
                  </div>

                  <div className="item-meta">
                    <span>क्षेत्र: {rec.area.total} हे.आर</span>
                    <span className="item-date">
                      <Calendar size={12} className="inline mr-1" />
                      {rec.generatedAt}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="view-saved-btn"
                    onClick={() => {
                      onSelectRecord(rec);
                      onClose();
                    }}
                  >
                    <span>{isMr ? 'सातबारा उघडा' : 'Open 7/12'}</span>
                    <ExternalLink size={13} className="inline ml-1" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
