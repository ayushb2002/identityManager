import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { toast } from "react-hot-toast";
import { ReactSession } from "react-client-session";
import { useLayoutEffect } from "react";
import { returnIdentity } from "../blockchain/interact";

const Welcome = () => {
  ReactSession.setStoreType("localStorage");
  const [loggedIn, setLoggedIn] = useState(ReactSession.get("signedIn"));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState(0);
  const [adhaar, setAdhaar] = useState('');

  useLayoutEffect(() => {
    (async () => {
      try {
        setAdhaar(ReactSession.get("adhaar"));
        const identity = await returnIdentity(adhaar);
        setName(identity[1]);
        setGender(identity[3]);
        setEmail(identity[4]);
        setDob(toNumber(identity[2]));
      } catch (err) {
        console.log(err);
        toast.error("Could not find your identity!");
        setTimeout(() => {
          window.location.href = "/logout";
        }, 1000);
      }
    })();
  });

  return (
    <section>
      {loggedIn && (
        <div>
          <Navbar />
          <div className="min-h-screen py-10 px-5">
            <div className="chat chat-start">
              <div className="chat-bubble chat-bubble-accent">
                Name
              </div>
            </div>

            <div className="chat chat-end">
              <div className="chat-bubble chat-bubble-info">
                {name}
              </div>
            </div>

            <div className="chat chat-start">
              <div className="chat-bubble chat-bubble-accent">
                Email Address
              </div>
            </div>

            <div className="chat chat-end">
              <div className="chat-bubble chat-bubble-info">
                {email}
              </div>
            </div>

            <div className="chat chat-start">
              <div className="chat-bubble chat-bubble-accent">
                Adhaar Number
              </div>
            </div>
            
            <div className="chat chat-end">
              <div className="chat-bubble chat-bubble-info">
                {adhaar}
              </div>
            </div>

            <div className="chat chat-start">
              <div className="chat-bubble chat-bubble-accent">
                Gender
              </div>
            </div>

            <div className="chat chat-end">
              <div className="chat-bubble chat-bubble-info">
                I{gender}
              </div>
            </div>

            <div className="chat chat-start">
              <div className="chat-bubble chat-bubble-accent">
                Date of Birth
              </div>
            </div>

            <div className="chat chat-end">
              <div className="chat-bubble chat-bubble-info">
                {dob}
              </div>
            </div>

          </div>
          <Footer />
        </div>
      )}
      {!loggedIn && (
        <div>
          <span className="text-3xl">404 | Not found!</span>
        </div>
      )}
    </section>
  );
};

export default Welcome;
