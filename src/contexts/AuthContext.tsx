import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "../services/firebase";





type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContexType = {
  user: User | undefined;
  signInWithGoolge: () => Promise<void>;
}

type AuthContexProviderProps = {
  children: ReactNode;
}


export const AuthContext = createContext({} as AuthContexType);

export function AuthContextProvider(props: AuthContexProviderProps){

  const [user, setUser] = useState<User>();

  useEffect (() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user){
        const {displayName, photoURL, uid} = user;

        if(!displayName || !photoURL){
          throw new Error('Missing infromation from google acount.');
        }

        //isso so da certo pq o if ai em cima descara um objeto vazaio do tipo name ou avatar
        // se quiser fazer eles faltar tem q colocar no tys que ele aceite algo nullo
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })

    return () => {
      unsubscribe();
    }
  }, [])

  async function signInWithGoolge()
  {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth,provider);

      if(result.user){
        
        const {displayName, photoURL, uid} = result.user;

        if(!displayName || !photoURL){
          throw new Error('Missing infromation from google acount.');
        }

        //isso so da certo pq o if ai em cima descara um objeto vazaio do tipo name ou avatar
        // se quiser fazer eles faltar tem q colocar no tys que ele aceite algo nullo
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
  }

  return (
    <AuthContext.Provider value={{user, signInWithGoolge}}>
      {props.children}
    </AuthContext.Provider>
  );
}