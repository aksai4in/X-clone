import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAQZ0P2b3lJvP2C8CWxAaGB6ELwyqcLi1Q",
  authDomain: "twitter-clone-6871c.firebaseapp.com",
  projectId: "twitter-clone-6871c",
  storageBucket: "twitter-clone-6871c.appspot.com",
  messagingSenderId: "304603431283",
  appId: "1:304603431283:web:58a867a84bb2f06af40506",
  measurementId: "G-PQTWF6HB0W",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
