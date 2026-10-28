// Service for Common Village Master Web Services (LGD Government API)
// With automatic offline fallback to local Maharashtra dataset

const BASE_PROXY_URL = '/api-cvm';
const DIRECT_API_URL = 'http://115.124.105.220/API';

// Helper for fetch with timeout
async function fetchWithTimeout(url, options = {}, timeoutMs = 4000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

// 1. Fetch All Districts
export async function getDistrictsList() {
  try {
    // Try proxy first
    const res = await fetchWithTimeout(`${BASE_PROXY_URL}/GetAllDistricts`, { method: 'POST' });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map(d => ({
          id: d.districtcode,
          code: d.districtcode,
          en: d.districtnameenglish,
          mr: d.districtlocalname,
          slug: d.districtnameenglish.toLowerCase().replace(/[^a-z0-9]/g, '_')
        })).sort((a, b) => a.mr.localeCompare(b.mr));
      }
    }
  } catch (err) {
    console.warn('Common Village Master API direct fetch failed, trying fallback...', err);
  }

  // Fallback to local static districts.json
  try {
    const localRes = await fetch('/data/districts.json');
    const localData = await localRes.json();
    return localData.map(d => ({
      id: d.id,
      code: d.id,
      en: d.en,
      mr: d.mr,
      slug: d.id,
      division: d.division,
      talukas: d.talukas
    }));
  } catch (err) {
    console.error('All district sources failed:', err);
    return [];
  }
}

// 2. Fetch Talukas of District
export async function getTalukasOfDistrict(districtCode, districtSlug) {
  try {
    const res = await fetchWithTimeout(`${BASE_PROXY_URL}/GetTalukasOfDistrict?distcode=${districtCode}`, { method: 'POST' });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map(t => ({
          id: t.subdistrictcode,
          code: t.subdistrictcode,
          en: t.subdistrictnameenglish,
          mr: t.subdistrictlocalname
        })).sort((a, b) => a.mr.localeCompare(b.mr));
      }
    }
  } catch (err) {
    console.warn(`Failed fetching talukas for distcode ${districtCode} from API:`, err);
  }

  // Fallback to local village file
  if (districtSlug) {
    try {
      const localRes = await fetch(`/data/villages/${districtSlug}.json`);
      if (localRes.ok) {
        const localData = await localRes.json();
        return Object.values(localData.talukas).map(t => ({
          id: t.id,
          code: t.id,
          en: t.en,
          mr: t.mr,
          villageCount: t.villages?.length || 0
        })).sort((a, b) => a.mr.localeCompare(b.mr));
      }
    } catch (e) {
      console.warn('Local taluka fallback failed:', e);
    }
  }

  return [];
}

// 3. Fetch Villages of District & Taluka
export async function getVillagesOfTaluka(districtCode, talukaCode, districtSlug, talukaSlug) {
  try {
    const res = await fetchWithTimeout(
      `${BASE_PROXY_URL}/GetVillagesOfDistrictAndTaluka?distcode=${districtCode}&talukacode=${talukaCode}`, 
      { method: 'POST' }
    );
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map(v => ({
          code: (v.villagecode || '').trim(),
          en: v.villagenameenglish || '',
          mr: v.villagelocalname || v.villagenameenglish || '',
          lgdCode: v.lgd_code || '',
          displayName: v.villagelocalname 
            ? `${v.villagelocalname} (${v.villagenameenglish})` 
            : v.villagenameenglish
        })).sort((a, b) => a.mr.localeCompare(b.mr));
      }
    }
  } catch (err) {
    console.warn(`Failed fetching villages from API for ${districtCode}/${talukaCode}:`, err);
  }

  // Fallback to local village file
  if (districtSlug) {
    try {
      const localRes = await fetch(`/data/villages/${districtSlug}.json`);
      if (localRes.ok) {
        const localData = await localRes.json();
        // find matching taluka
        const key = talukaSlug || Object.keys(localData.talukas).find(k => 
          k.toLowerCase() === (talukaSlug || '').toLowerCase()
        );
        const tObj = localData.talukas[key];
        if (tObj && tObj.villages) {
          return tObj.villages.map((name, idx) => ({
            code: `${1000 + idx}`,
            en: name,
            mr: name,
            lgdCode: `LGD-${districtCode}-${1000 + idx}`,
            displayName: name
          }));
        }
      }
    } catch (e) {
      console.warn('Local villages fallback failed:', e);
    }
  }

  return [];
}
