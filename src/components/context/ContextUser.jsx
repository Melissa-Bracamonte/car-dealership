import React, { createContext, useEffect, useState } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";

export const UserContext = createContext();

const UserProvider = ({children}) => {
   const [user, setUser] = useState('');

   useEffect(() => {
      const userData = onAuthStateChanged(auth, (userUid) => {
          console.log(userUid);
          setUser(userUid)
       });
     return () => userData();
   }, []);

   const loginUser = (email, password) => signInWithEmailAndPassword(auth, email, password);

   const logOut = () => signOut(auth);
   
   return (
       <UserContext.Provider value={{ user, setUser, loginUser, logOut }}>
           {children}
       </UserContext.Provider>
   );
};

export default UserProvider;