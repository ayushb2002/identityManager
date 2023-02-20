import React, { useState } from "react";
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import { useRef } from "react";
import { identityExists, loginIdentity, registerIdentity } from "../blockchain/interact";
import axios from "axios";

const Register = () => {

  const [wallet, setWallet] = useState('');
  const [adhaar, setAdhaar] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState(0);
  const [curReg, setCurReg] = useState(0);
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

  const adhaarVerifyCall = async (formData) => {
    const options = {
      method: "POST",
      body: formData,
    };
    var adhaarVerify = await fetch("https://decentid-python.onrender.com/aadhar_verify", options);
    console.log(adhaarVerify);
    var res = await adhaarVerify.json()
    return res;
  }

  const registration = async (e) => {
    e.preventDefault();
    toast('Beginning registration process');

    const exists = await identityExists(adhaar);
    if(exists)
      {
        toast.error('Identity already exists or has been deactivated!');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }

    const fileInput = document.querySelector("#aadhaar_image");
    const formData = new FormData();

    formData.append("file", fileInput.files[0]);
    formData.append("aadhaar", adhaar);
    formData.append("name", name);
    formData.append("wallet", wallet);
    formData.append("email", email);
    formData.append("gender", gender);
    formData.append("dob", dob);

    var adhaarVerify = await adhaarVerifyCall(formData);
    console.log(adhaarVerify)
    if (adhaarVerify) {
      var response = await axios.post("https://decentid-node.onrender.com/send_email_verification", {
        "email": email
      });
      console.log(response)
      setCurReg(1);
      setTimeout(() => {
        toast.success('Adhaar details matched successfully!');
      }, 1000);
    }
    else {
      toast.error("Aadhaar couldn't be verified!");
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
              {
                !curReg ?
                  <form onSubmit={registration}>
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
                        <span className="label-text">Adhaar Card</span>
                      </label>
                      <input type="file" id="aadhaar_image" className="file-input file-input-ghost file-input-bordered" />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Adhaar Card Number</span>
                      </label>
                      <input type="number" min="0" placeholder="xxxx xxxx xxxx" className="input input-bordered" onChange={(e) => setAdhaar(e.target.value)} />
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
                      <select id="" onChange={(e) => setGender(e.target.value)}>
                        <option value="" selected="true" disabled="true">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Date of birth</span>
                      </label>
                      <input type="date" className="input input-bordered" onChange={(e) => setDob(e.target.value)} />
                    </div>
                    <div className="form-control mt-6">
                      <button className="btn btn-primary" type="submit" disabled={wallet !== '' ? false : true}>Register</button>
                    </div>
                  </form>
                  :
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
                          var emailVerify = response.data.res;
                          if (emailVerify) {
                            var result = await registerIdentity(adhaar, name, dob, gender, email);
                            if (result) {
                              toast.success('Your identity has been registered!');
                              setTimeout(() => {
                                window.location.href = "/login";
                              }, 1000);
                            }
                            else {
                              toast.error('Could not register your identity!');
                              setTimeout(() => {
                                window.location.reload();
                              }, 1000);
                            }
                          }
                          else
                          {
                            toast.error('Invalid OTP!');
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

export default Register