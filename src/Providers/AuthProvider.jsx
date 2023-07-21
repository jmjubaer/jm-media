/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import app from "../Firebase/firebase.config";
export const AuthContext = createContext(null);

const auth = getAuth(app);
const AuthProvider = ({children}) => {
    const [user, setUser] = useState("");
    console.log(user);
    const createUser = (email,password) => {
       return createUserWithEmailAndPassword(auth,email,password);
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
        createUser,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;