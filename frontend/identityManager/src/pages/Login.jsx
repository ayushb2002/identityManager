import React, { useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import { loginIdentity, returnEmail, identityExists } from '../blockchain/interact';
import { ReactSession } from "react-client-session";
import { useRef } from 'react';
import axios from 'axios';

const Login = () => {
  const [wallet, setWallet] = useState('');
  const [adhaar, setAdhaar] = useState('');
  const [curReg, setCurReg] = useState(0);
  const [email, setEmail] = useState('');
  const otpRef = useRef();

  const metaClick = async (e) => {
    e.preventDefault();
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      setWallet(await signer.getAddress());
      toast.success("Wallet connected!");
    }
    catch (err) {
      toast.error('Failed!');
    }
  };

  const signIn = async function (e) {
    e.preventDefault();
    const exists = await identityExists(adhaar);
    if(!exists)
      {
        toast.error('Identity does not exist!');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }

    var result = await loginIdentity(adhaar);
    if (result) {
      var _email = await returnEmail(adhaar);
      if(!_email)
      {
        toast.error('Adhaar number incorrect or user not registered!');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
      else
      {
        setCurReg(1);
        var response = await axios.post("https://decentid-node.onrender.com/send_email_verification", {
        "email": _email
      });

      setEmail(_email);
      }
    }
    else {
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
              {
                !curReg ?
                  <form>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Wallet Address</span>
                      </label>
                      <button className="btn btn-secondary" onClick={metaClick} disabled={wallet !== '' ? true : false}>
                        {wallet === '' && (<span>Connect Metamask</span>)}
                        {wallet !== '' && (<span>{wallet.substring(0, 20)}...</span>)}
                      </button>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Adhaar Number</span>
                      </label>
                      <input type="number" min="0" placeholder="xxxx-xxxx-xxxx" className="input input-bordered" onChange={(e) => setAdhaar(e.target.value)} />
                    </div>
                    <div className="form-control mt-6">
                      <button className="btn btn-primary" type='button' onClick={(e) => signIn(e)} disabled={wallet === '' ? true : false}>Login</button>
                    </div>
                  </form> :
                  <>
                    <div className="form-control">
                      <h1 className="text-xl ">
                        We have sent you an otp to you email address, enter that otp to verify your email
                      </h1>
                      <input type="number" placeholder="OTP" className="input input-bordered mt-6" ref={otpRef} />
                      <div className="form-control mt-6">
                        <button className="btn btn-primary" onClick={async () => {
                          var response = await axios.post("https://decentid-node.onrender.com/send_email_verification", {
                            "email": email
                          });
                          console.log(response)

                        }}>resend otp</button>
                      </div>
                      <div className="form-control mt-6">
                        <button className="btn btn-primary" onClick={async () => {
                          let val = otpRef.current.value;
                          var response = await axios.post("https://decentid-node.onrender.com/check_verification_code", {
                            "email": email,
                            "otp": val
                          });
                          console.log(val);
                          var emailVerify = response.data.res;
                          if (emailVerify) {
                            ReactSession.set('signedIn', true);
                            ReactSession.set('adhaar', adhaar);
                            toast.success('Verified credentials!');
                            setTimeout(() => {
                              window.location.href = '/profile';
                            }, 1000);
                          }
                          console.log(emailVerify);
                        }}>Verify</button>
                      </div>
                    </div>
                  </>
              }
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  )
}

export default Login