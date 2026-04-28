import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBaPEEYOnDEQUnVnZjqCBm4FdL8t75w2g",
  authDomain: "bridge-alumnos.firebaseapp.com",
  projectId: "bridge-alumnos",
  storageBucket: "bridge-alumnos.firebasestorage.app",
  messagingSenderId: "352303739242",
  appId: "1:352303739242:web:eaff64a951be9ad3937513"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth=getAuth(app);

export default app;