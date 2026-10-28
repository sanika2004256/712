// Firebase Configuration and Firestore Service
import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  serverTimestamp,
  query,
  orderBy 
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBN3BrGXepr-VTKHdRQvWcUXamKASR4SGU",
  authDomain: "astitva712-fd137.firebaseapp.com",
  projectId: "astitva712-fd137",
  storageBucket: "astitva712-fd137.firebasestorage.app",
  messagingSenderId: "889544805463",
  appId: "1:889544805463:web:a3e4d73993b7a94482e712",
  measurementId: "G-33RWK0SD9B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const COLLECTION_NAME = "franchise_applications";
const LOCAL_STORAGE_KEY = "astitva_franchise_applications_cache";

// Helper to get local cache
function getLocalCache() {
  if (typeof window === 'undefined' || !window.localStorage) return [];
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

// Helper to save local cache
function saveLocalCache(list) {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.warn("Failed to cache locally:", e);
  }
}

/**
 * Save new Sanitary Pad Franchise Application
 */
export async function submitFranchiseApplication(formData) {
  const applicationNumber = `AST-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
  
  const applicationData = {
    ...formData,
    applicationNumber,
    status: "Pending", // Pending | Contacted | Approved | Rejected
    createdAt: new Date().toISOString(),
    createdTimestamp: Date.now()
  };

  let firestoreId = null;

  try {
    // 1. Try to save to Cloud Firestore
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...applicationData,
      firestoreTimestamp: serverTimestamp()
    });
    firestoreId = docRef.id;
    applicationData.id = firestoreId;
    console.log("Application stored in Firebase Firestore with ID:", firestoreId);
  } catch (err) {
    console.warn("Firestore write error (using local storage fallback):", err);
    applicationData.id = `local-${Date.now()}`;
  }

  // 2. Always update local cache for instant UI feedback and offline support
  const cache = getLocalCache();
  const updatedCache = [applicationData, ...cache];
  saveLocalCache(updatedCache);

  return applicationData;
}

/**
 * Fetch all Franchise Applications for Admin
 */
export async function fetchAllFranchiseApplications() {
  let firestoreList = [];
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("createdTimestamp", "desc"));
    const snapshot = await getDocs(q);
    snapshot.forEach(docSnap => {
      firestoreList.push({
        id: docSnap.id,
        ...docSnap.data()
      });
    });
  } catch (err) {
    console.warn("Could not fetch from Firestore, falling back to cache:", err);
  }

  // Merge with local cache to avoid missing any recently submitted docs
  const localCache = getLocalCache();
  const map = new Map();

  firestoreList.forEach(item => map.set(item.applicationNumber || item.id, item));
  localCache.forEach(item => {
    const key = item.applicationNumber || item.id;
    if (!map.has(key)) {
      map.set(key, item);
    }
  });

  const merged = Array.from(map.values()).sort((a, b) => {
    const timeA = a.createdTimestamp || 0;
    const timeB = b.createdTimestamp || 0;
    return timeB - timeA;
  });

  saveLocalCache(merged);
  return merged;
}

/**
 * Update Application Status (e.g. Approved, Contacted, Rejected)
 */
export async function updateFranchiseStatus(id, newStatus) {
  // Update Firestore if id is not local
  if (id && !id.startsWith("local-")) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, { status: newStatus });
    } catch (e) {
      console.warn("Firestore status update failed:", e);
    }
  }

  // Update local cache
  const cache = getLocalCache();
  const updated = cache.map(item => {
    if (item.id === id || item.applicationNumber === id) {
      return { ...item, status: newStatus };
    }
    return item;
  });
  saveLocalCache(updated);
  return updated;
}
