import React, { useState } from 'react';
import { X, Calculator, ArrowRightLeft, Sparkles } from 'lucide-react';

// Conversion factors relative to 1 Guntha (1 Guntha = 1089 sq ft = 1 Are approx = 101.17 sq meters)
// 1 Guntha = 1 Guntha
// 1 Acre = 40 Gunthas
// 1 Hectare = 98.84 Gunthas (100 Ares)
// 1 Are = 1 Guntha (approximately in Maharashtra land measurement)
// 1 Guntha = 1089 Sq. Feet
// 1 Guntha = 101.171 Sq. Meters
// 1 Bigha (MH standard) = 20 Gunthas

export default function AreaCalculatorModal({ isOpen, onClose, lang }) {
  const [val, setVal] = useState(1);
  const [unit, setUnit] = useState('guntha'); // 'guntha' | 'acre' | 'hectare' | 'sqft' | 'sqm' | 'are'

  if (!isOpen) return null;
  const isMr = lang === 'mr';

  const numVal = parseFloat(val) || 0;

  // Convert input value to Gunthas first
  let inGunthas = 0;
  if (unit === 'guntha' || unit === 'are') {
    inGunthas = numVal;
  } else if (unit === 'acre') {
    inGunthas = numVal * 40;
  } else if (unit === 'hectare') {
    inGunthas = numVal * 98.842;
  } else if (unit === 'sqft') {
    inGunthas = numVal / 1089;
  } else if (unit === 'sqm') {
    inGunthas = numVal / 101.171;
  } else if (unit === 'bigha') {
    inGunthas = numVal * 20;
  }

  // Calculate all other units
  const results = {
    guntha: inGunthas,
    acre: inGunthas / 40,
    hectare: inGunthas / 98.842,
    are: inGunthas,
    sqft: inGunthas * 1089,
    sqm: inGunthas * 101.171,
    bigha: inGunthas / 20
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="flex items-center gap-2">
            <Calculator className="text-green-700" size={22} />
            <h3 className="modal-title">
              {isMr ? 'जमीन क्षेत्रफळ गणकयंत्र (Land Area Converter)' : 'Land Area Calculator'}
            </h3>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <p className="modal-desc">
            {isMr 
              ? 'एकर, गुंठे, हेक्टर, आर आणि चौरस फूट यांमध्ये सहज रूपांतर करा.' 
              : 'Easily convert between Acre, Guntha, Hectare, Are, and Square Feet.'}
          </p>

          <div className="calculator-input-row">
            <div className="calc-val-input-wrap">
              <label className="input-label">{isMr ? 'मूल्य टाका:' : 'Enter Value:'}</label>
              <input
                type="number"
                min="0"
                step="any"
                value={val}
                onChange={(e) => setVal(e.target.value)}
                className="calc-input"
              />
            </div>

            <div className="calc-unit-select-wrap">
              <label className="input-label">{isMr ? 'एकक निवडा:' : 'Select Unit:'}</label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="calc-select"
              >
                <option value="guntha">{isMr ? 'गुंठा (Guntha)' : 'Guntha'}</option>
                <option value="acre">{isMr ? 'एकर (Acre)' : 'Acre'}</option>
                <option value="hectare">{isMr ? 'हेक्टर (Hectare)' : 'Hectare'}</option>
                <option value="are">{isMr ? 'आर (Are)' : 'Are'}</option>
                <option value="sqft">{isMr ? 'चौरस फूट (Sq. Feet)' : 'Sq. Feet'}</option>
                <option value="sqm">{isMr ? 'चौरस मीटर (Sq. Meter)' : 'Sq. Meter'}</option>
                <option value="bigha">{isMr ? 'बिघा (Bigha)' : 'Bigha'}</option>
              </select>
            </div>
          </div>

          {/* Converted Values Grid */}
          <div className="calc-results-grid">
            <div className="calc-result-box highlight">
              <span className="calc-res-label">{isMr ? 'गुंठे (Gunthas)' : 'Gunthas'}</span>
              <strong className="calc-res-val">{results.guntha.toFixed(2)}</strong>
            </div>

            <div className="calc-result-box highlight">
              <span className="calc-res-label">{isMr ? 'एकर (Acres)' : 'Acres'}</span>
              <strong className="calc-res-val">{results.acre.toFixed(3)}</strong>
            </div>

            <div className="calc-result-box">
              <span className="calc-res-label">{isMr ? 'हेक्टर (Hectares)' : 'Hectares'}</span>
              <strong className="calc-res-val">{results.hectare.toFixed(4)}</strong>
            </div>

            <div className="calc-result-box">
              <span className="calc-res-label">{isMr ? 'आर (Ares)' : 'Ares'}</span>
              <strong className="calc-res-val">{results.are.toFixed(2)}</strong>
            </div>

            <div className="calc-result-box">
              <span className="calc-res-label">{isMr ? 'चौरस फूट (Sq. Ft)' : 'Square Feet'}</span>
              <strong className="calc-res-val">{Math.round(results.sqft).toLocaleString('en-IN')}</strong>
            </div>

            <div className="calc-result-box">
              <span className="calc-res-label">{isMr ? 'चौरस मीटर (Sq. M)' : 'Square Meter'}</span>
              <strong className="calc-res-val">{results.sqm.toFixed(2)}</strong>
            </div>
          </div>

          {/* Quick Maharashtra Rule of Thumb */}
          <div className="calc-quick-facts">
            <h4 className="facts-title">
              <Sparkles size={14} className="inline mr-1 text-amber-600" />
              {isMr ? 'महाराष्ट्र जमीन मोजणी मुख्य सूत्रे:' : 'Key Conversion Formulas:'}
            </h4>
            <ul className="facts-list">
              <li><strong>१ एकर</strong> = ४० गुंठे = ४३,५६० चौरस फूट</li>
              <li><strong>१ गुंठा</strong> = ३३ फूट × ३३ फूट = १,०८९ चौरस फूट = १ आर (अंदाजे)</li>
              <li><strong>१ हेक्टर</strong> = २.४७ एकर = १०० आर = ९८.८४ गुंठे</li>
              <li><strong>१ आर</strong> = १०० चौरस मीटर (१०७६.४ चौ. फूट)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
