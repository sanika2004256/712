// Realistic 7/12 and 8A Land Record Generator based on Village, Taluka, District

const COMMON_SURNAMES = [
  'पाटील', 'कदम', 'जाधव', 'देशमुख', 'पवार', 'शिंदे', 'मोरे', 'चव्हाण', 
  'सावंत', 'भोसले', 'गायकवाड', 'जोशी', 'कुलकर्णी', 'माने', 'खरात', 'शेलार', 
  'थोरात', 'जगताप', 'वाघमारे', 'इंगळे', 'कांबळे', 'वाघ', 'कोल्हे', 'गव्हाणे'
];

const FIRST_NAMES_MALE = [
  'रमेश', 'सुरेश', 'दत्तात्रय', 'मारुती', 'प्रकाश', 'तुकाराम', 'ज्ञानेश्वर', 
  'चंद्रकांत', 'विठ्ठल', 'संजय', 'तानाजी', 'अशोक', 'तानाजी', 'गणपत', 'भास्कर'
];

const CROPS_BY_SEASON = {
  kharif: [
    { name: 'सोयाबीन (Soybean)', water: 'पावसाचे पाणी / कोरडवाहू', type: 'बागायत/जिरायत' },
    { name: 'ऊस (Sugarcane)', water: 'विहीर / ठिबक सिंचन', type: 'बागायत' },
    { name: 'बाजरी (Bajra)', water: 'पावसाचे पाणी', type: 'जिरायत' },
    { name: 'कपाशी / कापूस (Cotton)', water: 'कूपनलिका / विहीर', type: 'बागायत' },
    { name: 'भात / धान (Paddy)', water: 'पावसाचे पाणी / कालवा', type: 'बागायत' }
  ],
  rabi: [
    { name: 'गहू (Wheat)', water: 'विहीर / स्प्रिंकलर', type: 'बागायत' },
    { name: 'हरभरा / चणा (Gram)', water: 'विहीर / संरक्षित पाणी', type: 'जिरायत' },
    { name: 'ज्वारी (Jowar)', water: 'पावसाचे पाणी / जिरायत', type: 'जिरायत' },
    { name: 'कांदा (Onion)', water: 'कूपनलिका / ठिबक', type: 'बागायत' },
    { name: 'मका (Maize)', water: 'विहीर', type: 'बागायत' }
  ]
};

const BANKS = [
  'बँक ऑफ महाराष्ट्र',
  'स्टेट बँक ऑफ इंडिया',
  'पुणे जिल्हा मध्यवर्ती सहकारी बँक',
  'जिल्हा मध्यवर्ती सहकारी बँक',
  'बँक ऑफ बडोदा',
  'युनियन बँक ऑफ इंडिया'
];

export function generateSatbaraRecord({ district, taluka, village, searchType, query }) {
  // Generate deterministic but realistic values based on input
  const seed = (district.en + taluka.en + village + query).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  
  const gatNo = (searchType === 'surveyNo' && query.trim()) ? query.trim() : `${(seed % 350) + 1}/${(seed % 4) + 1}`;
  const khataNo = ((seed * 7) % 850) + 101;
  const ferfarNo1 = ((seed * 13) % 4000) + 1200;
  const ferfarNo2 = ferfarNo1 + 245;

  // Determine owner name
  let primaryName = '';
  if ((searchType === 'lastName' || searchType === 'firstName' || searchType === 'fullName') && query.trim()) {
    primaryName = query.trim();
  } else {
    const sName = COMMON_SURNAMES[seed % COMMON_SURNAMES.length];
    const fName = FIRST_NAMES_MALE[(seed + 3) % FIRST_NAMES_MALE.length];
    const mName = FIRST_NAMES_MALE[(seed + 7) % FIRST_NAMES_MALE.length];
    primaryName = `${sName} ${fName} ${mName}`;
  }

  const brotherName = `${primaryName.split(' ')[0]} ${FIRST_NAMES_MALE[(seed + 5) % FIRST_NAMES_MALE.length]} ${primaryName.split(' ')[2] || 'पांडुरंग'}`;

  // Land area (Hectares . Ares . Sq.M)
  const jirayatAres = ((seed % 150) + 40); // 0.40 to 1.90
  const bagayatAres = ((seed % 180) + 50); // 0.50 to 2.30
  const potkharabAres = (seed % 8) + 1;

  const totalJirayat = (jirayatAres / 100).toFixed(2);
  const totalBagayat = (bagayatAres / 100).toFixed(2);
  const totalArea = ((jirayatAres + bagayatAres) / 100).toFixed(2);
  const potkharab = (potkharabAres / 100).toFixed(2);

  // Guntha & Acre calculation
  const totalGunthe = Math.round((jirayatAres + bagayatAres) * 1.0);
  const acres = Math.floor(totalGunthe / 40);
  const remGunthe = totalGunthe % 40;

  // Assessment (Aakarani in Rupees)
  const aakarani = ((jirayatAres * 0.12) + (bagayatAres * 0.25)).toFixed(2);

  // Bank loan / Boja
  const bank = BANKS[seed % BANKS.length];
  const loanAmount = (((seed % 6) + 1) * 50000).toLocaleString('en-IN');
  const hasLoan = (seed % 3) !== 0;

  // Crops
  const kharifCrop = CROPS_BY_SEASON.kharif[seed % CROPS_BY_SEASON.kharif.length];
  const rabiCrop = CROPS_BY_SEASON.rabi[(seed + 2) % CROPS_BY_SEASON.rabi.length];

  const currentYear = '2025-2026';
  const prevYear = '2024-2025';

  const ulpinCode = `MH${(seed % 30) + 10}-${(seed % 8999) + 1000}-${(seed % 89999) + 10000}`;

  return {
    districtEn: district.en,
    districtMr: district.mr,
    talukaEn: taluka.en,
    talukaMr: taluka.mr,
    village,
    gatNo,
    khataNo,
    ulpinCode,
    bhudharana: 'भोगवटादार वर्ग - १ (सज्ञान जमीन)',
    owners: [
      { name: primaryName, share: '१/२ हिस्सा', khata: khataNo },
      { name: brotherName, share: '१/२ हिस्सा', khata: khataNo }
    ],
    area: {
      jirayat: totalJirayat,
      bagayat: totalBagayat,
      total: totalArea,
      potkharabA: potkharab,
      potkharabB: '०.००',
      totalPotkharab: potkharab,
      gunthe: totalGunthe,
      acresText: `${acres} एकर ${remGunthe} गुंठे`
    },
    aakarani,
    mutationEntries: [ferfarNo1, ferfarNo2],
    otherRights: [
      hasLoan ? `${bank} शाखा ${taluka.mr} यांचेकडील पीक कर्ज रु. ${loanAmount}/- चा बोजा. (फेरफार क्र. ${ferfarNo2})` : null,
      `विहीर व शेत रस्ता सामाईक वहिवाट अधिकार कायम (फेरफार क्र. ${ferfarNo1})`,
      `शासकीय सिंचन कालवा लाभक्षेत्र अंतर्गत नोंद.`
    ].filter(Boolean),
    crops: [
      {
        year: currentYear,
        season: 'खरीप (Kharif)',
        cropName: kharifCrop.name,
        waterSource: kharifCrop.water,
        cultivatedArea: totalBagayat,
        unirrigatedArea: totalJirayat
      },
      {
        year: currentYear,
        season: 'रब्बी (Rabi)',
        cropName: rabiCrop.name,
        waterSource: rabiCrop.water,
        cultivatedArea: (bagayatAres * 0.7 / 100).toFixed(2),
        unirrigatedArea: '०.००'
      },
      {
        year: prevYear,
        season: 'खरीप (Kharif)',
        cropName: 'सोयाबीन व भुईमूग',
        waterSource: 'पावसाचे पाणी',
        cultivatedArea: totalArea,
        unirrigatedArea: totalJirayat
      }
    ],
    generatedAt: new Date().toLocaleDateString('mr-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }),
    verificationCode: `MAHA-712-${seed.toString(36).toUpperCase()}-${Date.now().toString(36).slice(-4).toUpperCase()}`
  };
}

export function generate8ARecord({ district, taluka, village, satbaraRecord }) {
  const seed = (district.en + taluka.en + village).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  
  const khataNo = satbaraRecord ? satbaraRecord.khataNo : ((seed * 7) % 850) + 101;
  const ownerName = satbaraRecord ? satbaraRecord.owners[0].name : 'पाटील रमेश तुकाराम';
  
  const gat1 = satbaraRecord ? satbaraRecord.gatNo : `${(seed % 300) + 1}`;
  const gat2 = `${parseInt(gat1.split('/')[0]) + 15}/२`;

  return {
    districtEn: district.en,
    districtMr: district.mr,
    talukaEn: taluka.en,
    talukaMr: taluka.mr,
    village,
    khataNo,
    ownerName,
    entries: [
      {
        gatNo: gat1,
        bhudharana: 'भोगवटादार वर्ग - १',
        area: satbaraRecord ? satbaraRecord.area.total : '१.८५',
        potkharab: '०.०२',
        aakarani: satbaraRecord ? satbaraRecord.aakarani : '१४.५०',
        ferfarNo: satbaraRecord ? satbaraRecord.mutationEntries[0] : '३४२१'
      },
      {
        gatNo: gat2,
        bhudharana: 'भोगवटादार वर्ग - १',
        area: '०.९५',
        potkharab: '०.००',
        aakarani: '८.२०',
        ferfarNo: '२८९०'
      }
    ],
    totalArea: satbaraRecord ? (parseFloat(satbaraRecord.area.total) + 0.95).toFixed(2) : '२.८०',
    totalAakarani: satbaraRecord ? (parseFloat(satbaraRecord.aakarani) + 8.20).toFixed(2) : '२२.७०',
    generatedAt: new Date().toLocaleDateString('mr-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  };
}
