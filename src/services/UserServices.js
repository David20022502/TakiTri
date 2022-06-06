import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs,getDoc, query, where, doc, setDoc, deleteDoc } from "firebase/firestore";

export const createUserDatabases=async(user)=>{
  console.log("usuario a almacenar",user);
    await setDoc(doc( global.db_Firestore,"users",user.id), {
        id:user.id,
        user:user.user,
        names:user.names,
        lastName:user.lastName,
        birthDate:user.birthDate,
      });
     
}
const singInWithEmailPassword=async(values)=>{
    const auth = getAuth();
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
}