import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import Dashboard from '../components/Dashboard';

const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
  projectId: "YOUR_FIREBASE_PROJECT_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function Home() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);
  const login = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };
  if (!user) return <button onClick={login}>Login with Google</button>;
  return <Dashboard user={user} />;
}