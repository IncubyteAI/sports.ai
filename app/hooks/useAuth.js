import { useState, useEffect, createContext, useContext } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { auth } from '../config/firebase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState('');
  const [firstName, setFirstName] = useState('');
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        const fetchFullName = async () => {
          const db = getFirestore();
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const fullNameFromDb = docSnap.data().fullName;
            setFullName(fullNameFromDb);
            setFirstName(fullNameFromDb.split(' ')[0]);
            
          } else {
            console.log('No such document!');
          }
        };
        fetchFullName();
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    fullName,
    firstName
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default function useAuth() {
  return useContext(AuthContext);
}