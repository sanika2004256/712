import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  ShoppingBag, 
  GraduationCap, 
  Building2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function ProfitCalculator({ lang, onApplyClick }) {
  const isMr = lang === 'mr';

  // State sliders
  const [households, setHouseholds] = useState(120); // Astitva Mart & Sanitary Pad buyers
  const [students, setStudents] = useState(25);     // School ERP / Coaching enrollments
  const [digitalServices, setDigitalServices] = useState(40); // 7/12, Realty, PAN, etc.

  // Earnings model based on realistic village unit economics
  const martIncome = households * 35;
  const educationIncome = students * 200;
  const digitalIncome = digitalServices * 80;

  const totalMonthlyIncome = martIncome + educationIncome + digitalIncome;
  const investment = 10000;
  const roiDays = Math.max(18, Math.round((investment / totalMonthlyIncome) * 30));

  return (
    <div className="profit-calculator-card" id="calculator">
      <div className="calc-header-badge">
        <Calculator size={16} className="text-blue-600" />
        <span>{isMr ? 'उत्पन्न सिम्युलेटर (Earnings Calculator)' : 'Live Earnings Simulator'}</span>
      </div>

      <div className="calc-headline-row">
        <div>
          <h3 className="calc-title">
            {isMr ? 'तुमच्या गावातील अंदाजित मासिक कमाई' : 'Estimate Your Village Monthly Earnings'}
          </h3>
          <p className="calc-subtitle">
            {isMr 
              ? 'फक्त ₹10,000 भांडवलात Inodayam Tech चे प्रतिनिधी बनून दरमहा किमान ₹12,000 – ₹15,000+ कसे कमवाल ते पाहा:' 
              : 'See how you can easily earn ₹12,000 – ₹15,000+ monthly with just ₹10,000 capital:'}
          </p>
        </div>
        <div className="investment-guarantee-pill">
          <ShieldCheck size={18} className="text-blue-600" />
          <span>{isMr ? 'भांडवल: फक्त ₹१०,०००' : 'Capital: Just ₹10,000'}</span>
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="calc-sliders-grid">
        {/* Slider 1: Astitva Mart & Sanitary Pads */}
        <div className="calc-slider-box">
          <div className="slider-label-row">
            <span className="slider-title">
              <ShoppingBag size={16} className="text-blue-600" />
              {isMr ? 'अस्तित्व मार्ट (सॅनिटरी पॅड्स व गृहोपयोगी ग्राहक)' : 'Astitva Mart & Sanitary Pad Families'}
            </span>
            <span className="slider-val-badge">{households} {isMr ? 'कुटुंबे' : 'families'}</span>
          </div>
          <input 
            type="range" 
            min="30" 
            max="300" 
            step="10"
            value={households} 
            onChange={(e) => setHouseholds(Number(e.target.value))}
            className="custom-range-slider blue-slider"
          />
          <div className="slider-subtext">
            <span>{isMr ? 'अंदाजित नफा:' : 'Estimated profit:'} <strong>₹{martIncome.toLocaleString('en-IN')}/महिना</strong></span>
            <span className="rate-note">₹35/कुटुंब</span>
          </div>
        </div>

        {/* Slider 2: School ERP & CET/NEET */}
        <div className="calc-slider-box">
          <div className="slider-label-row">
            <span className="slider-title">
              <GraduationCap size={16} className="text-indigo-600" />
              {isMr ? 'शाळा ERP व CET/NEET विद्यार्थी' : 'School ERP & Coaching Students'}
            </span>
            <span className="slider-val-badge">{students} {isMr ? 'विद्यार्थी' : 'students'}</span>
          </div>
          <input 
            type="range" 
            min="5" 
            max="80" 
            step="5"
            value={students} 
            onChange={(e) => setStudents(Number(e.target.value))}
            className="custom-range-slider indigo-slider"
          />
          <div className="slider-subtext">
            <span>{isMr ? 'अंदाजित नफा:' : 'Estimated profit:'} <strong>₹{educationIncome.toLocaleString('en-IN')}/महिना</strong></span>
            <span className="rate-note">₹200/विद्यार्थी</span>
          </div>
        </div>

        {/* Slider 3: Digital Services & Realty */}
        <div className="calc-slider-box">
          <div className="slider-label-row">
            <span className="slider-title">
              <Building2 size={16} className="text-emerald-600" />
              {isMr ? 'अस्तित्व रियल्टी व इतर डिजिटल सेवा व्यवहार' : 'Realty & Digital Transactions'}
            </span>
            <span className="slider-val-badge">{digitalServices} {isMr ? 'व्यवहार' : 'trans'}</span>
          </div>
          <input 
            type="range" 
            min="10" 
            max="120" 
            step="5"
            value={digitalServices} 
            onChange={(e) => setDigitalServices(Number(e.target.value))}
            className="custom-range-slider emerald-slider"
          />
          <div className="slider-subtext">
            <span>{isMr ? 'अंदाजित नफा:' : 'Estimated profit:'} <strong>₹{digitalIncome.toLocaleString('en-IN')}/महिना</strong></span>
            <span className="rate-note">₹80/नोंदणी</span>
          </div>
        </div>
      </div>

      {/* Outcome Banner */}
      <div className="calc-results-banner">
        <div className="calc-result-left">
          <span className="calc-result-tag">
            {isMr ? 'एकूण अंदाजित मासिक उत्पन्न' : 'Total Estimated Monthly Income'}
          </span>
          <div className="calc-big-earnings">
            <span className="currency">₹</span>
            <span>{totalMonthlyIncome.toLocaleString('en-IN')}</span>
            <span className="per-month">{isMr ? '/ दरमहा' : '/ month'}</span>
          </div>
          <div className="calc-breakdown-tags">
            <span className="break-tag">🌸 {isMr ? 'सॅनिटरी मार्ट:' : 'Mart:'} ₹{martIncome.toLocaleString('en-IN')}</span>
            <span className="break-tag">📚 {isMr ? 'शिक्षण:' : 'Edu:'} ₹{educationIncome.toLocaleString('en-IN')}</span>
            <span className="break-tag">🏢 {isMr ? 'रियल्टी:' : 'Realty:'} ₹{digitalIncome.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div className="calc-result-right">
          <div className="roi-highlight-box">
            <TrendingUp size={20} className="text-emerald-300" />
            <div>
              <strong>{isMr ? `अवघ्या ${roiDays} दिवसांत भांडवल वसूल!` : `Capital Recovered in ${roiDays} Days!`}</strong>
              <span>{isMr ? '₹10,000 ची गुंतवणूक पहिल्याच महिन्यात सुरक्षितपणे परत' : '₹10,000 capital recovered in 1st month'}</span>
            </div>
          </div>

          <button 
            type="button" 
            className="calc-apply-now-btn"
            onClick={onApplyClick}
          >
            <span>{isMr ? 'हे उत्पन्न मिळवण्यासाठी अर्ज करा' : 'Apply to Start Earning'}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
