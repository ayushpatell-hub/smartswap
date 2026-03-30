import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAohtqisKH65K9UPFpwpQuUoi2-ADzgCUw",
  authDomain: "smartswap-a4caf.firebaseapp.com",
  projectId: "smartswap-a4caf",
  storageBucket: "smartswap-a4caf.firebasestorage.app",
  messagingSenderId: "500751554406",
  appId: "1:500751554406:web:e455b82e1d23194e821aa7",
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
export const auth = getAuth(app)
export default app