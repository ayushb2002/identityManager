import React, { useState } from "react";
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { ethers } from "ethers";
import { toast, Toaster } from "react-hot-toast";
import { registerIdentity } from "../blockchain/interact";

const Register = () => {

  const [wallet, setWallet] = useState('');
  const [adhaar, setAdhaar] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState(0);
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
        toast.error(err);
        console.log(err);
      }
  };

  const registration = async () => {
    var result = await registerIdentity(adhaar, name, dob, gender, email, pwd);
    if(result)
    {
      toast.success('Your identity has been registered!');
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    }
    else
    {
      toast.error('Could not register your identity!');
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
      <h1 className="text-5xl font-bold">Register your identity</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
      <div className="form-control">
        <label className="label">
            <span className="label-text">Wallet Address</span>
          </label>
          <button className="btn btn-secondary" onClick={metaClick}>Connect Metamask</button>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Adhaar Card</span>
          </label>
          <input type="file" className="file-input file-input-ghost file-input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Adhaar Card Number</span>
          </label>
          <input type="number" min="100000000000" placeholder="xxxx xxxx xxxx" className="input input-bordered" onChange={(e) => setAdhaar(e.target.value)} />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Full Name</span>
          </label>
          <input type="text" placeholder="Name" className="input input-bordered" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email Address</span>
          </label>
          <input type="email" placeholder="Email" className="input input-bordered" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Gender</span>
          </label>
          <input type="text" placeholder="Male / Female" className="input input-bordered" onChange={(e) => setGender(e.target.value)} />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Date of birth</span>
          </label>
          <input type="date" className="input input-bordered" onChange={(e) => setDob(e.target.value)} />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="Password" className="input input-bordered" onChange={(e) => setPwd(e.target.value)} />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary" onClick={registration}>Login</button>
        </div>
      </div>
    </div>
  </div>
</div>
        <Footer />
    </section>
  )
}

export default Register