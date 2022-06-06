import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useCallback, useContext, useMemo, useReducer, useState } from "react";
import TakiTriContext from "./TakiTriContext";
import { TakiTriReducer } from "./TakiTriReducer";
import { IS_AUTENTICATED, LOAD_FIREBASE_USER, LOAD_TAKITRI_USER } from "./TakiTriTypes";


export const TakiTriStates = ({ children }) => {
  const initialState = useMemo(
    () => ({
      userFirebase: null,
      userTakiTri: null,
      isAutenticated: false
    }),
    []
  );
  const [state, dispatch] = useReducer(TakiTriReducer, initialState);
 
  const currentAutenticatedUser=()=>{
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: LOAD_FIREBASE_USER, payload: user })
      handleUserFirebase(user)
      } else {
        // User is signed out
        // ...
      }
    });
  }
  const singInWithEmailPassword = useCallback(async (values) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in

        const user = userCredential.user;
        console.log("ligon user", user.uid)
        dispatch({ type: LOAD_FIREBASE_USER, payload: user })
        handleUserFirebase(user)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error al inciar sesion")
      });
  }, [])
  const handleUserFirebase = useCallback(async (user) => {
    const docRef = doc(global.db_Firestore, "users", user.uid);
    const docSnap = await getDoc(docRef);
    console.log("usuario firestore", docSnap.data())
    dispatch({ type: LOAD_TAKITRI_USER, payload: docSnap.data() })
    handleIsAutenticated(true);
  }, [])
  const handleIsAutenticated = useCallback(async (isAutenticated) => {
    dispatch({ type: IS_AUTENTICATED, payload: isAutenticated })

  }, [])
  const handleLogOut = useCallback(async () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      dispatch({ type: LOAD_TAKITRI_USER, payload: null })
      handleIsAutenticated(false);
    }).catch((error) => {
      // An error happened.
      console.log("error al salir de la sesion")
    });

  }, [])



  return <TakiTriContext.Provider
    value={{
      userFirebase: state.userFirebase,
      userTakiTri: state.userTakiTri,
      isAutenticated: state.isAutenticated,
      singInWithEmailPassword,
      handleLogOut,
      currentAutenticatedUser
    }}
  >
    {children}
  </TakiTriContext.Provider>
}