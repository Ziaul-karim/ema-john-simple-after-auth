import React, { useContext } from 'react';
import { useState } from "react";
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn,handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './loginManager';

  

function Login() {

  const [newUser, setNewUser] = useState(false)
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    success: false,
    photo: ''
  })

  initializeLoginFramework();

const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const history = useHistory()
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () =>{
    handleGoogleSignIn()
    .then(res =>{
      handleResponse(res, true)
    })
  }

  const fbSignIn = () =>{
    handleFbSignIn()
    .then(res =>{
      handleResponse(res, true)
    })
  }

  const signOut = () =>{
    handleSignOut()
    .then(res =>{
      handleResponse(res, false)
  })
}

const handleResponse = (res, redirect) =>{
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
      history.replace(from);
    }
}

  const handleBlur = (e) =>{
    let isFieldValid = true;
    if(e.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if(e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 6;
      const isPasswordHasNum = /\d{1}/.test(e.target.value)
      isFieldValid = isPasswordValid && isPasswordHasNum
    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo)
    }
  }

  const handleSubmit = (e) =>{
    if(newUser && user.email && user.password){
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res =>{
        handleResponse(res, true)
      })
    }

    if(!newUser && user.email && user.password){
      signInWithEmailAndPassword(user.email, user.password)
      .then(res =>{
        handleResponse(res, true)
      })
    }
    e.preventDefault()
  }

  
  return (
    <div style={{textAlign: "center"}}>
        {user.isSignedIn ?<button onClick={signOut}>Sign Out</button>
        : <button onClick={googleSignIn}>Sign In</button>}
        <br/>
        
        <button onClick={fbSignIn}>Sign In Using FaceBook</button>
        {
          user.isSignedIn && 
          <div>
          <p>Welcome {user.name}</p>
          <p>Email: {user.email}</p>
          <img src={user.photo} alt=""/>
          </div>
        }

        <h1>Our Own Authentication</h1>
        <input type="checkbox" onChange={()=> setNewUser(!newUser)} name="newUser" id=""/>
        <label htmlFor="newUser"> Register New User</label>
        <form onSubmit={handleSubmit}>
          {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Your Name"/>}
          <br/>
          <input type="text" name="email" onBlur={handleBlur} placeholder="Your Email" />
          <br/>
          <input type="password" name="password" onBlur={handleBlur} placeholder="Your Password"/>
          <br/>
          <br/>
          <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'}/>
        </form>
        <p style={{color:'red'}}>{user.error}</p>
        {
          user.success && <p style={{color:'green'}}>User {newUser ? "Created" : "Logged In"} Succesfully</p>
        }
    </div>
  );
}

export default Login;
