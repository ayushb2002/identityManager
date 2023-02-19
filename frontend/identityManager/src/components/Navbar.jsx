import React, { useState, useLayoutEffect } from 'react';
import { ReactSession } from "react-client-session";
import axios from 'axios';

function useNodeStarter(){
  React.useEffect(()=>{
      try{
          fetch("https://decentid-node.onrender.com/send_email_verification", {
            'email': 'decentid@outlook.com'
          });
      }
      catch(err){
        console.log(err)
      }
  },[]);
}

function usePythonStarter(){
  React.useEffect(()=>{
      try{
          fetch("https://decentid-python.onrender.com/test");
      }
      catch(err){
        console.log(err);
      }
  },[]);
}

function useProcupyneStarter(){
  React.useEffect(()=>{
      try{
          axios.post("https://porcupyne.onrender.com/convert");
      }
      catch(err){
        console.log(err);
      }
  },[]);
}
const Navbar = () => {
  useNodeStarter();
  usePythonStarter();
  useProcupyneStarter();
  const [loggedIn, setLoggedIn] = useState(false);

  useLayoutEffect(() => {
    try
    {
      if(ReactSession.get('signedIn'))
      {
        setLoggedIn(true);
      }
      else
      {
        setLoggedIn(false);
      }
    }
    catch(err)
    {
      console.log(err);
    }
  }, [])

  const logout = (e) => {
    e.preventDefault();
    window.location.href = '/logout';
  }

  return (
    <div className="navbar bg-base-100">
  <div className="flex-1">
    <a className="btn btn-ghost normal-case text-xl" href="/">Decent ID</a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      <li><a href='/'>Home</a></li>
      <li><a href='/api'>API</a></li>
      <li><a href='/contact'>Contact</a></li>
      <li tabIndex={0}>
        <a>
          Kiosk
          <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
        </a>
        {!loggedIn && (
        <ul className="p-2 bg-base-100">
          <li><a href='/login'>Login</a></li>
          <li><a href='/register'>Register</a></li>
        </ul>
        )}

        {loggedIn && (
        <ul className="p-2 bg-base-100">
          <li><a href='/profile'>Profile</a></li>
          <li><a onClick={logout}>Logout</a></li>
        </ul>
        )}

      </li>
    </ul>
  </div>
</div>
  )
}

export default Navbar