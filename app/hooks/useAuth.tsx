import { useState, useEffect, createContext, useContext } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { auth } from "../config/firebase";
import { router } from "expo-router";
import { User } from "firebase/auth";

const AuthContext = createContext<{
  user: User;
  fullName: string;
  firstName: string;
} | null>(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);
  const [fullName, setFullName] = useState("");
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      console.log("new user: ", user);
      setUser(user);
      if (user) {
        const fetchFullName = async () => {
          const db = getFirestore();
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const fullNameFromDb = docSnap.data().fullName;
            setFullName(fullNameFromDb);
            setFirstName(fullNameFromDb.split(" ")[0]);
          } else {
            console.log("No such document!");
          }
        };
        await fetchFullName();
        console.log("navigating to home");
        router.replace("/home");
      }
    });

    return unsubscribe;
  }, []);

  const value = user && {
    user,
    fullName,
    firstName,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default function useAuth() {
  return useContext(AuthContext);
}
