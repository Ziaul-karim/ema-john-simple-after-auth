import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { useState } from "react";
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

  firebase.initializeApp(firebaseConfig)
//   if (!firebase.apps.length) {
//     firebase.initializeApp({});
// }




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

const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const history = useHistory()
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const handleSignIn = () =>{
    firebase.auth().signInWithPopup(googleProvider)
    .then(res =>{
      const {photoURL, displayName, email} = res.user
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(signedInUser);
      console.log(displayName, email,photoURL)
    })
    .catch(err =>{
      console.log(err);
      console.log(err.message)
    })
  }

  const handleFbSignIn = () =>{
    firebase.auth().signInWithPopup(fbProvider)
    .then(result => {
   
      console.log('FB user after sign in', result.user)
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;

      // ...
    });
  }

  const handleSignOut = () =>{
    firebase.auth().signOut()
    .then(res =>{
      const signedOutUser ={
        isSignedIn: false,
        name: '',
        email: '',
        error: '',
        photo: ''
      }
      setUser(signedOutUser)
    })
    .catch(err =>{
      
    })
 
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
    //console.log(user.name, user.password)
    if(user.email && user.password){
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(res =>{
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        updateUserName(user.name)
      })
      .catch(error => {
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo)
      });
    }

    if(!newUser && user.email && user.password){
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        setLoggedInUser(newUserInfo);
        history.replace(from);
        console.log('sign in user info', res.user)
      })
      .catch(error => {
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo)
      });
    }
    e.preventDefault()
  }

  const updateUserName = name =>{
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    }).then(function() {
      console.log("User Updated Successfully");
    }).catch(function(error) {
      console.log("User Updated Successfully");
    });
  }
  return (
    <div style={{textAlign: "center"}}>
        {user.isSignedIn ?<button onClick={handleSignOut}>Sign Out</button>
        : <button onClick={handleSignIn}>Sign In</button>}
        <br/>
        <button onClick={handleFbSignIn}>Sign In Using FaceBook</button>
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
