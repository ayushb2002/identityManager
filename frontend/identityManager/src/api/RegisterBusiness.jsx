import React, { useState, useLayoutEffect } from "react";
import { ReactSession } from "react-client-session";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import { registerBusiness } from "../blockchain/interact";

const RegisterBusiness = () => {

  const [wallet, setWallet] = useState('');
  const [adhaar, setAdhaar] = useState('');
  const [name, setName] = useState('');
  const [passphrase, setPassphrase] = useState('');

  const metaClick = async (e) => {
    e.preventDefault();
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      setWallet(await signer.getAddress());
      toast.success("Wallet connected!");
    } catch (err) {
      toast.error("Failed!");
    }
  };

  const businessRegister = async (e) => {
    e.preventDefault();
    const query = await registerBusiness(adhaar, name, passphrase);
    if(query)
    {
      toast.success('Successfully registered as business platform!');
      setTimeout(() => {
        window.location.href = '/api';
      }, 1000);
    }
    else
    {
      toast.error('Could not register your platform with us!');
      setTimeout(() => {
        window.location.href = '/business';
      }, 1000);
    }
  }

  return (
    <>
      <Navbar />
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Registration Portal</h1>
            <p className="py-6">
              Ensure that the adhaar being used for registration here is already
              a verified identity! <br />
              Also, upon deletion of the identity, the host will no longer be
              able to use our services.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Wallet Address</span>
                </label>
                <button
                  className="btn btn-secondary"
                  onClick={metaClick}
                  disabled={wallet !== "" ? true : false}
                >
                  {wallet === "" && <span>Connect Metamask</span>}
                  {wallet !== "" && <span>{wallet.substring(0, 20)}...</span>}
                </button>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Adhaar</span>
                </label>
                <input
                  type="number"
                  min='0'
                  placeholder="xxxx-xxxx-xxxx"
                  className="input input-bordered"
                  onChange={(e) => setAdhaar(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name of Business Platform</span>
                </label>
                <input
                  type="text"
                  placeholder="Decent ID"
                  className="input input-bordered"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Set a passphrase for authentication
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="You won't be able to reset this!"
                  className="input input-bordered"
                  onChange={(e) => setPassphrase(e.target.value)}
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary" onClick={businessRegister} disabled={wallet === ''? true:false}>Register business</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RegisterBusiness;
