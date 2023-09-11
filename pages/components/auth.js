import React, { useState } from 'react';
import { auth as firebaseAuth, googleProvider } from '../config/firebase'; 
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  console.log(firebaseAuth?.currentUser?.email);

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(firebaseAuth, googleProvider);
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(firebaseAuth);
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message);
    }
  };

  return (
    <div>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <div className='p-1'>
        <form>
          <input type="email" placeholder='Email...' onChange={(e) => setEmail(e.target.value)}  className=' font-bold py-2 px-4 border border-blue-700 rounded'  />
          <input  type="password" placeholder='Password...' onChange={(e) => setPassword(e.target.value)} className='font-bold py-2 px-4 border border-blue-700 rounded' />
          <button type="button" onClick={signIn} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Sign in</button>
        </form>
      </div>

      <div className='p-1'>
        <button type='button' onClick={signInWithGoogle} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
          signIn with google
        </button>
      </div>

      <div className='p-1'>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};
