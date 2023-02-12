import { toast } from "react-hot-toast";
import React, { useState, useLayoutEffect } from "react";
import { returnIdentity } from '../blockchain/interact';
import { ReactSession } from "react-client-session";

const Data = () => {
    const [loggedIn, setLoggedIn] = useState(ReactSession.get("signedIn"));
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("");
    const [adhaar, setAdhaar] = useState(ReactSession.get('adhaar'));

    useLayoutEffect(() => {
        (async () => {
          try {
            const identity = await returnIdentity(adhaar);
            setName(identity[1]);
            setGender(identity[3]);
            setEmail(identity[4]);
            var date = new Date(1970, 1, 1);
            date.setSeconds(identity[2]);
            var strDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
            setDob(strDate);
          } catch (err) {
            console.log(err);
            toast.error("Could not find your identity!");
            setTimeout(() => {
              window.location.href = "/logout";
            }, 1000);
          }
        })();
      }, []);

  return (<>
    {loggedIn && (
        <div className="w-[30vw]">
        <div className="chat chat-start">
                    <div className="chat-bubble chat-bubble-accent">Name</div>
                  </div>
    
                  <div className="chat chat-end">
                    <div className="chat-bubble chat-bubble-info">{name}</div>
                  </div>
    
                  <div className="chat chat-start">
                    <div className="chat-bubble chat-bubble-accent">
                      Email Address
                    </div>
                  </div>
    
                  <div className="chat chat-end">
                    <div className="chat-bubble chat-bubble-info">{email}</div>
                  </div>
    
                  <div className="chat chat-start">
                    <div className="chat-bubble chat-bubble-accent">
                      Adhaar Number
                    </div>
                  </div>
    
                  <div className="chat chat-end">
                    <div className="chat-bubble chat-bubble-info">{adhaar}</div>
                  </div>
    
                  <div className="chat chat-start">
                    <div className="chat-bubble chat-bubble-accent">Gender</div>
                  </div>
    
                  <div className="chat chat-end">
                    <div className="chat-bubble chat-bubble-info">{gender}</div>
                  </div>
    
                  <div className="chat chat-start">
                    <div className="chat-bubble chat-bubble-accent">
                      Date of Birth
                    </div>
                  </div>
    
                  <div className="chat chat-end">
                    <div className="chat-bubble chat-bubble-info">{dob}</div>
                  </div>
        </div>
    )}
    {!loggedIn && (
        <span>Could not find the page requested for!</span>
    )}
    </>
  )
}

export default Data