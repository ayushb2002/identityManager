import React, { useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import { ReactSession } from 'react-client-session';
import { loginIdentity } from '../blockchain/interact';

const Login = () => {
  ReactSession.setStoreType("localStorage");
  const [wallet, setWallet] = useState('');
  const [adhaar, setAdhaar] = useState('');
  const [pwd, setPwd] = useState('');

  const metaClick = async (e) => {
    e.preventDefault();
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      setWallet(await signer.getAddress());
      toast.success("Wallet connected!");
      }
      catch(err)
      {
        toast.error('Failed!');
      }
  };

  const signIn = async (e) => {
    e.preventDefault();
    var result = await loginIdentity(adhaar, pwd);
    console.log(result);
    if(result)
    {
      ReactSession.set('signedIn', true);
      ReactSession.set('wallet', wallet);
      toast.success('Verified credentials!');
      setTimeout(() => {
        window.location.href = '/profile';
      }, 1000);
    }
    else
    {
      toast.error('Invalid credentials!');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }

  return (
    <section>
        <Navbar />
        <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
      <div className="form-control">
        <label className="label">
            <span className="label-text">Wallet Address</span>
          </label>
          <button className="btn btn-secondary" onClick={metaClick} disabled={wallet!==''?true:false}>
          {wallet==='' && (<span>Connect Metamask</span>)}
          {wallet!=='' && (<span>{wallet.substring(0,20)}...</span>)}
          </button>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Adhaar Number</span>
          </label>
          <input type="number" min="100000000000" placeholder="xxxx-xxxx-xxxx" className="input input-bordered" onChange={(e) => setAdhaar(e.target.value)} />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" className="input input-bordered" onChange={(e) => setPwd(e.target.value)} />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary" onClick={signIn} disabled={wallet === ''? true:false}>Login</button>
        </div>
      </div>
    </div>
  </div>
</div>
        <Footer />
    </section>
  )
}

export default Login