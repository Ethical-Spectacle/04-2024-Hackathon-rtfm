import { useContext, useState, useEffect, createContext } from 'react';
import { auth, provider, firestore } from '../services/firebase.js';
import {signInWithPopup} from 'firebase/auth'
import {addDoc, collection} from 'firebase/firestore'

const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signup = (email, password, fullName) => {
    let promise = new Promise(function (resolve, reject) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((ref) => {
          ref.user.updateProfile({
            displayName: fullName,
          });
          resolve(ref);
        })
        .catch((error) => reject(error));
    });
    return promise;
  };
  const signin = (email, password) => {
    let promise = new Promise(function (resolve, reject) {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((ref) => {
          resolve(ref);
        })
        .catch((error) => {
          reject(error);
        });
    });
    return promise;
  };
  const signout = () => {
    return auth.signOut();
  };
  const passwordReset = (email) => {
    let promise = new Promise(function (resolve, reject) {
      auth
        .sendPasswordResetEmail(email)
        .then(() => {
          resolve(`Password Reset Email sent to ${email}`);
        })
        .catch((error) => {
          reject(error);
        });
    });
    return promise;
  };
  const signUpWithGoogle = () => {
    let promise = new Promise(function (resolve, reject) {
      signInWithPopup(auth, provider)
        .then((ref) => {
          // console.log(ref)
          if(ref._tokenResponse.isNewUser){
            addDoc(collection(firestore, 'users'), {
              uid: ref.user.uid,
              email: ref.user.email,
              displayName: ref.user.displayName,
              balance: 0,
              approved: false,
              createdAt: new Date(),
            })
          }
          // ref.user.updateProfile({
          //   displayName: 'Bank',
          // });
          resolve(ref);
        })
        .catch((error) => reject(error));
    });
    return promise;
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, [currentUser]);
const value = {
    currentUser,
    signup,
    signin,
    signout,
    passwordReset,
    signUpWithGoogle
};
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}