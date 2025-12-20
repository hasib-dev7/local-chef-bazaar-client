import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { AuthContext } from "../authContext/AuthContext";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase.init";
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("email");
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  //  create new user
  const createUser = (email, password) => {
    setAuthLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //   sign in user
  const signInUser = (email, password) => {
    setAuthLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  // update user profile
  const updateUserProfile = (updateUser) => {
    return updateProfile(auth.currentUser, updateUser);
  };
  // gogole signIn
  const googleSignIn = () => {
    setAuthLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  //   logout
  const logOut = () => {
    setAuthLoading(true);
    return signOut(auth);
  };

  //   the current user
  useEffect(() => {
    // the observer user
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
      // console.log(currentUser);
    });
    // the observer unmount
    return () => {
      unsubscribe();
    };
  }, []);
  const userInfo = {
    user,
    setUser,
    authLoading,
     setAuthLoading,
    createUser,
    signInUser,
    googleSignIn,
    updateUserProfile,
    logOut,
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  )
    
};

export default AuthProvider;
