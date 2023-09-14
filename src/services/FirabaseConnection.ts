import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBnCkuOMgR9obyXtTTWx8lgo3_VhnPkjZQ",
  authDomain: "webcarros-ffaae.firebaseapp.com",
  projectId: "webcarros-ffaae",
  storageBucket: "webcarros-ffaae.appspot.com",
  messagingSenderId: "393331273367",
  appId: "1:393331273367:web:f150ac4b8b6536948f03d2"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
