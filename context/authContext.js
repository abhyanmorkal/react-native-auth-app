import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    // Simulate authentication state change after 3 seconds
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
        updateUserData(user.uid);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return unsub;
  }, []);

  const updateUserData = async (userId) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let data = docSnap.data();
      setUser({ ...user, username: data.username, userId: data.userId });
    }
  };

  const signin = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (err) {
      let msg = err.message;
      if (msg.includes("(auth/invalid-email).")) msg = "Invalid email";
      if (msg.includes("(auth/invalid-credential)."))
        msg = "Invalid email or password";
      return { success: false, msg };
    }
  };

  const signup = async (email, password, username) => {
    try {
      // Implement signup logic here
      const res = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
        username
      );
      // setUser(res?.user);
      // setIsAuthenticated(true);

      await setDoc(doc(db, "users", res?.user?.uid), {
        username,
        userId: res?.user?.uid,
      });
    } catch (err) {
      let msg = err.message;
      if (msg.includes("(auth/invalid-email).")) msg = "invalid email";
      if (msg.includes("(auth/email-already-in-use)."))
        msg = "Email already registered";
      return { success: false, msg };
    }
  };

  const logout = async () => {
    try {
      // Implement logout logic here
      await signOut(auth);
      return { success: true };
    } catch (err) {
      return { success: false, msg: err.message, error: err };
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signin, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return value;
};
