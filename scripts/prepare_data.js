import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Division mapping for Maharashtra
const DIVISION_MAP = {
  // Konkan
  'mumbai_city': { en: 'Konkan', mr: 'कोकण' },
  'mumbai_suburban': { en: 'Konkan', mr: 'कोकण' },
  'thane': { en: 'Konkan', mr: 'कोकण' },
  'palghar': { en: 'Konkan', mr: 'कोकण' },
  'raigad': { en: 'Konkan', mr: 'कोकण' },
  'ratnagiri': { en: 'Konkan', mr: 'कोकण' },
  'sindhudurg': { en: 'Konkan', mr: 'कोकण' },
  // Pune
  'pune': { en: 'Pune', mr: 'पुणे' },
  'satara': { en: 'Pune', mr: 'पुणे' },
  'sangli': { en: 'Pune', mr: 'पुणे' },
  'solapur': { en: 'Pune', mr: 'पुणे' },
  'kolhapur': { en: 'Pune', mr: 'पुणे' },
  // Nashik
  'nashik': { en: 'Nashik', mr: 'नाशिक' },
  'ahmednagar': { en: 'Nashik', mr: 'नाशिक' },
  'dhule': { en: 'Nashik', mr: 'नाशिक' },
  'jalgaon': { en: 'Nashik', mr: 'नाशिक' },
  'nandurbar': { en: 'Nashik', mr: 'नाशिक' },
  // Chhatrapati Sambhajinagar (Aurangabad)
  'chhatrapati_sambhajinagar': { en: 'Chhatrapati Sambhajinagar', mr: 'छत्रपती संभाजीनगर' },
  'jalna': { en: 'Chhatrapati Sambhajinagar', mr: 'छत्रपती संभाजीनगर' },
  'parbhani': { en: 'Chhatrapati Sambhajinagar', mr: 'छत्रपती संभाजीनगर' },
  'hingoli': { en: 'Chhatrapati Sambhajinagar', mr: 'छत्रपती संभाजीनगर' },
  'beed': { en: 'Chhatrapati Sambhajinagar', mr: 'छत्रपती संभाजीनगर' },
  'nanded': { en: 'Chhatrapati Sambhajinagar', mr: 'छत्रपती संभाजीनगर' },
  'dharashiv': { en: 'Chhatrapati Sambhajinagar', mr: 'छत्रपती संभाजीनगर' },
  'latur': { en: 'Chhatrapati Sambhajinagar', mr: 'छत्रपती संभाजीनगर' },
  // Amravati
  'amravati': { en: 'Amravati', mr: 'अमरावती' },
  'akola': { en: 'Amravati', mr: 'अमरावती' },
  'buldhana': { en: 'Amravati', mr: 'अमरावती' },
  'washim': { en: 'Amravati', mr: 'अमरावती' },
  'yavatmal': { en: 'Amravati', mr: 'अमरावती' },
  // Nagpur
  'nagpur': { en: 'Nagpur', mr: 'नागपूर' },
  'wardha': { en: 'Nagpur', mr: 'नागपूर' },
  'bhandara': { en: 'Nagpur', mr: 'नागपूर' },
  'gondia': { en: 'Nagpur', mr: 'नागपूर' },
  'chandrapur': { en: 'Nagpur', mr: 'नागपूर' },
  'gadchiroli': { en: 'Nagpur', mr: 'नागपूर' },
};

// District name mappings & translations
const DISTRICT_INFO = {
  'ahmadnagar': { id: 'ahmednagar', en: 'Ahilyanagar (Ahmednagar)', mr: 'अहिल्यानगर (अहमदनगर)' },
  'akola': { id: 'akola', en: 'Akola', mr: 'अकोला' },
  'amravati': { id: 'amravati', en: 'Amravati', mr: 'अमरावती' },
  'aurangabad': { id: 'chhatrapati_sambhajinagar', en: 'Chhatrapati Sambhajinagar (Aurangabad)', mr: 'छत्रपती संभाजीनगर (औरंगाबाद)' },
  'bhandara': { id: 'bhandara', en: 'Bhandara', mr: 'भंडारा' },
  'bid': { id: 'beed', en: 'Beed', mr: 'बीड' },
  'buldana': { id: 'buldhana', en: 'Buldhana', mr: 'बुलढाणा' },
  'chandrapur': { id: 'chandrapur', en: 'Chandrapur', mr: 'चंद्रपूर' },
  'dhule': { id: 'dhule', en: 'Dhule', mr: 'धुळे' },
  'gadchiroli': { id: 'gadchiroli', en: 'Gadchiroli', mr: 'गडचिरोली' },
  'gondiya': { id: 'gondia', en: 'Gondia', mr: 'गोंदिया' },
  'hingoli': { id: 'hingoli', en: 'Hingoli', mr: 'हिंगोली' },
  'jalgaon': { id: 'jalgaon', en: 'Jalgaon', mr: 'जळगाव' },
  'jalna': { id: 'jalna', en: 'Jalna', mr: 'जालना' },
  'kolhapur': { id: 'kolhapur', en: 'Kolhapur', mr: 'कोल्हापूर' },
  'latur': { id: 'latur', en: 'Latur', mr: 'लातूर' },
  'nagpur': { id: 'nagpur', en: 'Nagpur', mr: 'नागपूर' },
  'nanded': { id: 'nanded', en: 'Nanded', mr: 'नांदेड' },
  'nandurbar': { id: 'nandurbar', en: 'Nandurbar', mr: 'नंदुरबार' },
  'nashik': { id: 'nashik', en: 'Nashik', mr: 'नाशिक' },
  'osmanabad': { id: 'dharashiv', en: 'Dharashiv (Osmanabad)', mr: 'धाराशिव (उस्मानाबाद)' },
  'parbhani': { id: 'parbhani', en: 'Parbhani', mr: 'परभणी' },
  'pune': { id: 'pune', en: 'Pune', mr: 'पुणे' },
  'raigarh': { id: 'raigad', en: 'Raigad', mr: 'रायगड' },
  'ratnagiri': { id: 'ratnagiri', en: 'Ratnagiri', mr: 'रत्नागिरी' },
  'sangli': { id: 'sangli', en: 'Sangli', mr: 'सांगली' },
  'satara': { id: 'satara', en: 'Satara', mr: 'सातारा' },
  'sindhudurg': { id: 'sindhudurg', en: 'Sindhudurg', mr: 'सिंधुदुर्ग' },
  'solapur': { id: 'solapur', en: 'Solapur', mr: 'सोलापूर' },
  'thane': { id: 'thane', en: 'Thane', mr: 'ठाणे' },
  'wardha': { id: 'wardha', en: 'Wardha', mr: 'वर्धा' },
  'washim': { id: 'washim', en: 'Washim', mr: 'वाशीम' },
  'yavatmal': { id: 'yavatmal', en: 'Yavatmal', mr: 'यवतमाळ' }
};

// Talukas to separate from Thane into Palghar
const PALGHAR_TALUKAS = ['palghar', 'dahanu', 'talasari', 'jawhar', 'mokhada', 'vada', 'vikramgad', 'vasai'];

// Marathi Taluka names mapping dictionary
const TALUKA_MARATHI_MAP = {
  // Pune
  'ambegaon': 'आंबेगाव', 'baramati': 'बारामती', 'bhor': 'भोर', 'daund': 'दौंड',
  'haveli': 'हवेली', 'indapur': 'इंदापूर', 'junnar': 'जुन्नर', 'khed': 'खेड',
  'mawal': 'मावळ', 'mulshi': 'मुळशी', 'pune city': 'पुणे शहर', 'purandhar': 'पुरंदर',
  'shirur': 'शिरूर', 'velhe': 'वेल्हे',
  // Satara
  'satara': 'सातारा', 'karad': 'कराड', 'wai': 'वाई', 'koregaon': 'कोरेगाव',
  'javali': 'जावळी', 'patankodoli': 'पाटण', 'patan': 'पाटण', 'khandala': 'खंडाळा',
  'khatav': 'खटाव', 'man': 'माण', 'phaltan': 'फलटण', 'mahabaleshwar': 'महाबळेश्वर',
  // Kolhapur
  'karvir': 'करवीर', 'kagal': 'कागल', 'panhala': 'पन्हाळा', 'shahuwadi': 'शाहूवाडी',
  'radhanagari': 'राधानगरी', 'gaganbawada': 'गगनबावडा', 'bhudargad': 'भुदरगड',
  'gadhinglaj': 'गडहिंग्लज', 'chandgad': 'चंदगड', 'ajra': 'आजरा', 'hatkanangle': 'हातकणंगले',
  'shirol': 'शिरोळ',
  // Sangli
  'miraj': 'मिरज', 'tasgaon': 'तासगाव', 'khanapur': 'खानापूर (विटा)', 'walwa': 'वाळवा (इस्लामपूर)',
  'shirala': 'शिराळा', 'atpadi': 'आटपाडी', 'jat': 'जत', 'kadegaon': 'कडेगाव',
  'palus': 'पलूस', 'kavathe mahankal': 'कवठे महांकाळ',
  // Solapur
  'solapur north': 'उत्तर सोलापूर', 'solapur south': 'दक्षिण सोलापूर', 'barshi': 'बार्शी',
  'akkalkot': 'अक्कलकोट', 'mohol': 'मोहोळ', 'madha': 'माढा', 'karmala': 'करमाळा',
  'pandharpur': 'पंढरपूर', 'sangole': 'सांगोला', 'malshiras': 'माळशिरस', 'mangallwedha': 'मंगळवेढा',
  // Nashik
  'nashik': 'नाशिक', 'igatpuri': 'इगतपुरी', 'dindori': 'दिंडोरी', 'peth': 'पेठ',
  'surgana': 'सुरगाणा', 'kalwan': 'कलवण', 'deola': 'देवळा', 'baglan': 'बागलाण (सटाणा)',
  'malegaon': 'मालेगाव', 'chandvad': 'चांदवड', 'nandgaon': 'नांदगाव', 'yeola': 'येवला',
  'niphad': 'निफाड', 'sinnar': 'सिन्नर', 'trimbakeshwar': 'त्र्यंबकेश्वर',
  // Ahmednagar / Ahilyanagar
  'nagar': 'नगर', 'akola': 'अकोले', 'sangamner': 'संगमनेर', 'kopargaon': 'कोपरगाव',
  'rahta': 'राहाता', 'shrirampur': 'श्रीरामपूर', 'nevasa': 'नेवासा', 'shevgaon': 'शेवगाव',
  'pathardi': 'पाथर्डी', 'jamkhed': 'जामखेड', 'karjat': 'कर्जत', 'shrigonda': 'श्रीगोंदा',
  'parner': 'पारनेर', 'rahuri': 'राहुरी',
  // Thane
  'thane': 'ठाणे', 'kalyan': 'कल्याण', 'bhiwandi': 'भिवंडी', 'ulhasnagar': 'उल्हासनगर',
  'ambarnath': 'अंबरनाथ', 'murbad': 'मुरबाड', 'shahapur': 'शहापूर',
  // Palghar
  'palghar': 'पालघर', 'vasai': 'वसई', 'dahanu': 'डहाणू', 'talasari': 'तलासरी',
  'jawhar': 'जव्हार', 'mokhada': 'मोखाडा', 'vada': 'वाडा', 'vikramgad': 'विक्रमगड',
  // Raigad
  'alibag': 'अलिबाग', 'pen': 'पेण', 'murud': 'मुरुड', 'panvel': 'पनवेल', 'uran': 'उरण',
  'karjat': 'कर्जत', 'khalapur': 'खालापूर', 'mangaon': 'माणगाव', 'roha': 'रोहा',
  'sudhagad': 'सुधागड (पाली)', 'mahad': 'महाड', 'poladpur': 'पोलादपूर', 'shrivardhan': 'श्रीवर्धन',
  'mhasla': 'म्हसळा', 'tala': 'तळा',
  // Ratnagiri
  'ratnagiri': 'रत्नागिरी', 'chiplun': 'चिपळूण', 'khed': 'खेड', 'guhagar': 'गुहागर',
  'dapoli': 'दापोली', 'mandangad': 'मंडणगड', 'sangameshwar': 'संगमेश्वर', 'lanja': 'लांजा',
  'rajapur': 'राजापूर',
  // Sindhudurg
  'kankavli': 'कणकवली', 'kudal': 'कुडाळ', 'malwan': 'मालवण', 'sawantwadi': 'सावंतवाडी',
  'devgad': 'देवगड', 'vengurla': 'वेंगुर्ला', 'dodamarg': 'दोडामार्ग', 'vaibhavvadi': 'वैभववाडी',
  // Chhatrapati Sambhajinagar
  'aurangabad': 'छत्रपती संभाजीनगर', 'kannad': 'कन्नड', 'soegaon': 'सोयगाव', 'sillod': 'सिल्लोड',
  'phulambri': 'फुलंब्री', 'khuldabad': 'खुलताबाद', 'vaijapur': 'वैजापूर', 'gangapur': 'गंगापूर',
  'paithan': 'पैठण',
  // Jalna
  'jalna': 'जालना', 'bhokardan': 'भोकरदन', 'jafrabad': 'जाफ्राबाद', 'badnapur': 'बदनपूर',
  'ambad': 'अंबड', 'ghansawangi': 'घनसावंगी', 'partur': 'परतूर', 'mantha': 'मंठा',
  // Parbhani
  'parbhani': 'परभणी', 'sonpeth': 'सोनपेठ', 'gangakhed': 'गंगाखेड', 'palam': 'पालम',
  'purna': 'पूर्णा', 'sailu': 'सेलू', 'jintur': 'जिंतूर', 'manwath': 'मानवत', 'pathri': 'पाथरी',
  // Hingoli
  'hingoli': 'हिंगोली', 'sengon': 'सेनगाव', 'kalamnuri': 'कलमनुरी', 'basmath': 'वसमत', 'aundha nagnath': 'औंढा नागनाथ',
  // Nanded
  'nanded': 'नांदेड', 'mudkhed': 'मुदखेड', 'arapur': 'अर्धापूर', 'ardhapur': 'अर्धापूर',
  'bhokar': 'भोकर', 'umri': 'उमरी', 'loha': 'लोहा', 'kandhar': 'कंधार',
  'kinwat': 'किनवट', 'himayatnagar': 'हिमायतनगर', 'hadgaon': 'हदगाव', 'mahur': 'माहूर',
  'deglur': 'देगलूर', 'mukhed': 'मुखेड', 'dharmabad': 'धर्माबाद', 'biloli': 'बिलोली', 'naigaon': 'नायगाव',
  // Beed
  'beed': 'बीड', 'ashti': 'आष्टी', 'patoda': 'पाटोदा', 'shirur kasardegloor': 'शिरूर (कासार)',
  'shirur (kasar)': 'शिरूर (कासार)', 'georai': 'गेवराई', 'majlegaon': 'माजलगाव',
  'wadwani': 'वडवणी', 'kaij': 'केज', 'dharur': 'धारूर', 'parli': 'परळी (वैजनाथ)', 'ambajogai': 'अंबाजोगाई',
  // Latur
  'latur': 'लातूर', 'ausa': 'औसा', 'renapur': 'रेणापूर', 'nilanga': 'निलंगा',
  'shirur anantpal': 'शिरूर अनंतपाळ', 'deoni': 'देवणी', 'udgir': 'उदगीर', 'ahmadpur': 'अहमदपूर',
  'chakur': 'चाकूर', 'jalkot': 'जळकोट',
  // Dharashiv
  'osmanabad': 'धाराशिव', 'tuljapur': 'तुळजापूर', 'bhum': 'भूम', 'paranda': 'परांडा',
  'washi': 'वाशी', 'kalamb': 'कळंब', 'omerga': 'उमरगा', 'lohara': 'लोहारा',
  // Amravati
  'amravati': 'अमरावती', 'bhatkuli': 'भातकुली', 'nandgaon khandeshwar': 'नांदगाव खंडेश्वर',
  'dharni': 'धारणी', 'chikhaldara': 'चिखलदरा', 'achlapur': 'अचलपूर', 'chandurbazar': 'चांदूर बाजार',
  'morshi': 'मोर्शी', 'warud': 'वरुड', 'teosa': 'तिवसा', 'tiwsa': 'तिवसा', 'daryapur': 'दर्यापूर',
  'anjan-gaon surji': 'अंजनगाव सुर्जी', 'chandur': 'चांदूर रेल्वे', 'dhamangaon railway': 'धामणगाव रेल्वे',
  // Akola
  'akola': 'अकोला', 'akot': 'अकोट', 'telhara': 'तेल्हारा', 'balapur': 'बाळापूर',
  'patur': 'पातूर', 'barshitakli': 'बार्शीटाकळी', 'murtijapur': 'मुर्तिजापूर',
  // Buldhana
  'buldana': 'बुलढाणा', 'chikhli': 'चिखली', 'dehgam': 'देऊळगाव राजा', 'deulgaon raja': 'देऊळगाव राजा',
  'sindkhed raja': 'सिंदखेड राजा', 'mehkar': 'मेहकर', 'lonar': 'लोणार', 'khamgaon': 'खामगाव',
  'shegaon': 'शेगाव', 'malkapur': 'मलकापूर', 'motala': 'मोताळा', 'nandura': 'नांदुरा',
  'jalgaon jamod': 'जळगाव जामोद', 'sangrampur': 'संग्रामपूर',
  // Washim
  'washim': 'वाशीम', 'malegaon': 'मालेगाव', 'risod': 'रिसोड', 'mangrulpir': 'मंगरुळपीर',
  'karanja': 'कारंजा', 'manora': 'मानोरा',
  // Yavatmal
  'yavatmal': 'यवतमाळ', 'arani': 'आर्णी', 'babhulgaon': 'बाभूळगाव', 'kalamb': 'कळंब',
  'darwha': 'दारव्हा', 'digras': 'दिग्रस', 'ner': 'नेर', 'pusad': 'पुसद',
  'umarkhed': 'उमरखेड', 'mahagaon': 'महागाव', 'wani': 'वणी', 'maregaon': 'मारेगाव',
  'zari-jamani': 'झरी जामणी', 'ghatanji': 'घाटंजी', 'kelapur': 'पांढरकवडा (केळापूर)', 'ralegaon': 'राळेगाव',
  // Nagpur
  'nagpur': 'नागपूर (शहर व ग्रामीण)', 'nagpur (rural)': 'नागपूर (ग्रामीण)', 'nagpur (urban)': 'नागपूर (शहर)',
  'kamptee': 'कामठी', 'hingna': 'हिंगणा', 'katol': 'काटोल', 'narkhed': 'नरखेड',
  'savner': 'सावनेर', 'kalameshwar': 'कलमेश्वर', 'ramtek': 'रामटेक', 'mouda': 'मौदा',
  'parsiwani': 'पारशिवनी', 'umred': 'उमरेड', 'kuhi': 'कुही', 'bhiwapur': 'भिवापूर',
  // Wardha
  'wardha': 'वर्धा', 'deoli': 'देवळी', 'seloo': 'सेलू', 'arvi': 'आर्वी',
  'ashti': 'आष्टी', 'karanja': 'कारंजा', 'hinganghat': 'हिंगणघाट', 'samudrapur': 'समुद्रपूर',
  // Bhandara
  'bhandara': 'भंडारा', 'tumsar': 'तुमसर', 'pauni': 'पवनी', 'mohad': 'मोहाडी',
  'sakoli': 'साकोली', 'lakhani': 'लाखनी', 'lakhandur': 'लाखांदूर',
  // Gondia
  'gondiya': 'गोंदिया', 'tirora': 'तिरोडा', 'goregaon': 'गोरेगाव', 'salekasa': 'सालेकसा',
  'amgaon': 'आमगाव', 'deori': 'देवरी', 'sadak-arjuni': 'सडक अर्जुनी', 'arjuni morgaon': 'अर्जुनी मोरगाव',
  // Chandrapur
  'chandrapur': 'चंद्रपूर', 'bhadravati': 'भद्रावती', 'warora': 'वरोरा', 'chimur': 'चिमूर',
  'nagbhir': 'नागभीड', 'bramhapuri': 'ब्रह्मपुरी', 'sindewahi': 'सिंदेवाही', 'mul': 'मूल',
  'sawali': 'सावली', 'pomhurna': 'पोंभुर्णा', 'ballarpur': 'बल्लारपूर', 'korpana': 'कोरपना',
  'rajura': 'राजुरा', 'jiwati': 'जिवती', 'gondpipri': 'गोंडपिपरी',
  // Gadchiroli
  'gadchiroli': 'गडचिरोली', 'dhanora': 'धानोरा', 'chamorshi': 'चामोर्शी', 'mulchera': 'मुलचेरा',
  'desaiganj (vadasa)': 'देसाईगंज (वडसा)', 'armori': 'आरमोरी', 'kurkheda': 'कुरखेडा', 'korchi': 'कोरची',
  'aheri': 'अहेरी', 'etapalli': 'एटापल्ली', 'bhamragad': 'भामरागड', 'sironcha': 'सिरोंचा',
  // Dhule
  'dhule': 'धुळे', 'sakri': 'साक्री', 'sindkhede': 'शिंदखेडा', 'shirpur': 'शिरपूर',
  // Jalgaon
  'jalgaon': 'जळगाव', 'jamner': 'जामनेर', 'erandol': 'एरंडोल', 'dharangaon': 'धरणगाव',
  'bhusawal': 'भुसावळ', 'raver': 'रावेर', 'muktainagar': 'मुक्ताईनगर (एदलाबाद)', 'bodwad': 'बोधवड',
  'yawal': 'यावल', 'amalner': 'अमळनेर', 'parola': 'पारोळा', 'chopda': 'चोपडा',
  'pachora': 'पाचोरा', 'bhadgaon': 'भडगाव', 'chalisgaon': 'चाळीसगाव',
  // Nandurbar
  'nandurbar': 'नंदुरबार', 'navapur': 'नवापूर', 'shahade': 'शहादा', 'talode': 'तळोदा',
  'akkalkuwa': 'अक्कलकुवा', 'dhadgaon': 'धडगाव (अक्राणी)'
};

async function main() {
  console.log('Fetching Maharashtra dataset...');
  const res = await fetch('https://raw.githubusercontent.com/pranshumaheshwari/indian-cities-and-villages/master/By%20States/Maharashtra.json');
  if (!res.ok) throw new Error('Failed to fetch dataset');
  const rawData = await res.json();
  console.log('Raw data loaded. Processing districts & talukas...');

  const outputDir = path.resolve(__dirname, '../public/data');
  const villagesDir = path.join(outputDir, 'villages');

  if (!fs.existsSync(villagesDir)) {
    fs.mkdirSync(villagesDir, { recursive: true });
  }

  // We will build:
  // 1. districtsSummary: list of 36 districts with metadata, talukas list (without full villages array, to keep it light)
  // 2. Per-district village files: public/data/villages/{district_id}.json

  const districtMap = new Map();

  for (const rawDist of rawData.districts) {
    const rawNameKey = rawDist.district.toLowerCase().trim();
    const info = DISTRICT_INFO[rawNameKey] || {
      id: rawNameKey.replace(/\s+/g, '_'),
      en: rawDist.district,
      mr: rawDist.district
    };

    if (rawNameKey === 'thane') {
      // Split Thane and Palghar
      const thaneSub = [];
      const palgharSub = [];

      for (const sub of rawDist.subDistricts) {
        const subKey = sub.subDistrict.toLowerCase().trim();
        if (PALGHAR_TALUKAS.includes(subKey)) {
          palgharSub.push(sub);
        } else {
          thaneSub.push(sub);
        }
      }

      // Add Thane
      districtMap.set('thane', {
        id: 'thane',
        en: 'Thane',
        mr: 'ठाणे',
        division: DIVISION_MAP['thane'],
        subDistricts: thaneSub
      });

      // Add Palghar
      districtMap.set('palghar', {
        id: 'palghar',
        en: 'Palghar',
        mr: 'पालघर',
        division: DIVISION_MAP['palghar'],
        subDistricts: palgharSub
      });
    } else {
      districtMap.set(info.id, {
        id: info.id,
        en: info.en,
        mr: info.mr,
        division: DIVISION_MAP[info.id] || { en: 'Maharashtra', mr: 'महाराष्ट्र' },
        subDistricts: rawDist.subDistricts
      });
    }
  }

  // Ensure Mumbai City and Mumbai Suburban are represented properly
  if (!districtMap.has('mumbai_suburban')) {
    districtMap.set('mumbai_suburban', {
      id: 'mumbai_suburban',
      en: 'Mumbai Suburban',
      mr: 'मुंबई उपनगर',
      division: DIVISION_MAP['mumbai_suburban'],
      subDistricts: [
        {
          subDistrict: 'Andheri',
          villages: ['Andheri East', 'Andheri West', 'Bandra', 'Juhu', 'Versova', 'Vile Parle', 'Santacruz', 'Oshiwara']
        },
        {
          subDistrict: 'Borivali',
          villages: ['Borivali East', 'Borivali West', 'Kandivali', 'Malad', 'Dahisar', 'Gorai', 'Charkop']
        },
        {
          subDistrict: 'Kurla',
          villages: ['Kurla', 'Ghatkopar', 'Mulund', 'Bhandup', 'Vikhroli', 'Powai', 'Chembur', 'Trombay', 'Deonar']
        }
      ]
    });
  }

  if (!districtMap.has('mumbai_city')) {
    districtMap.set('mumbai_city', {
      id: 'mumbai_city',
      en: 'Mumbai City',
      mr: 'मुंबई शहर',
      division: DIVISION_MAP['mumbai_city'],
      subDistricts: [
        {
          subDistrict: 'Mumbai City',
          villages: [
            'Colaba', 'Fort', 'Marine Lines', 'Nariman Point', 'Malabar Hill',
            'Girgaon', 'Tardeo', 'Byculla', 'Parel', 'Dadar', 'Worli', 'Prabhadevi', 'Sewri', 'Wadala'
          ]
        }
      ]
    });
  }

  let totalDistricts = 0;
  let totalTalukas = 0;
  let totalVillages = 0;

  const districtsIndex = [];

  for (const [distId, distData] of districtMap.entries()) {
    totalDistricts++;
    const talukaList = [];
    const districtVillagesMap = {};

    for (const sub of distData.subDistricts) {
      totalTalukas++;
      const subKey = sub.subDistrict.toLowerCase().trim();
      const subEn = sub.subDistrict;
      const subMr = TALUKA_MARATHI_MAP[subKey] || subEn;
      const vList = Array.from(new Set(sub.villages || [])).sort();
      totalVillages += vList.length;

      const talukaId = subKey.replace(/[^a-z0-9]/gi, '_');

      talukaList.push({
        id: talukaId,
        en: subEn,
        mr: subMr,
        villageCount: vList.length
      });

      districtVillagesMap[talukaId] = {
        id: talukaId,
        en: subEn,
        mr: subMr,
        villages: vList
      };
    }

    // Save individual district village file
    const distVillageFile = path.join(villagesDir, `${distId}.json`);
    fs.writeFileSync(distVillageFile, JSON.stringify({
      districtId: distId,
      districtEn: distData.en,
      districtMr: distData.mr,
      talukas: districtVillagesMap
    }, null, 2), 'utf-8');

    districtsIndex.push({
      id: distId,
      en: distData.en,
      mr: distData.mr,
      division: distData.division,
      talukaCount: talukaList.length,
      villageCount: Object.values(districtVillagesMap).reduce((acc, t) => acc + t.villages.length, 0),
      talukas: talukaList.sort((a, b) => a.en.localeCompare(b.en))
    });
  }

  districtsIndex.sort((a, b) => a.en.localeCompare(b.en));

  // Save districts summary
  fs.writeFileSync(path.join(outputDir, 'districts.json'), JSON.stringify(districtsIndex, null, 2), 'utf-8');

  // Save summary
  const summary = {
    totalDistricts,
    totalTalukas,
    totalVillages,
    lastUpdated: new Date().toISOString()
  };
  fs.writeFileSync(path.join(outputDir, 'summary.json'), JSON.stringify(summary, null, 2), 'utf-8');

  console.log('Finished successfully!');
  console.log(`Districts: ${totalDistricts}`);
  console.log(`Talukas: ${totalTalukas}`);
  console.log(`Villages: ${totalVillages}`);
}

main().catch(err => {
  console.error('Error generating data:', err);
  process.exit(1);
});
