/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from "../Firebase/firebase.config";
export const AuthContext = createContext(null);

const auth = getAuth(app);
const AuthProvider = ({children}) => {
    const [user, setUser] = useState("");
    const createUser = (email,password) => {
       return createUserWithEmailAndPassword(auth,email,password);
    }

    const singIn = (email,password) => {
        return signInWithEmailAndPassword(auth,email,password);
    }

    const provider = new GoogleAuthProvider();
    const googleSignIn = () => {
        return signInWithPopup(auth,provider)
    }

    const logOut = () => {
        return signOut(auth)
    }
    useEffect(() => {
       const unSubscribe =  onAuthStateChanged(auth, (loggedUser)=> {
        setUser(loggedUser);
       })
       return () => {
        unSubscribe();
    };
    },[])
    const authInfo = {
        user,
        logOut,
        singIn,
        createUser,
        googleSignIn
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;