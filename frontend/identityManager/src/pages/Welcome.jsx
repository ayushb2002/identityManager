import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ReactSession } from "react-client-session";
import Data from "../components/Data";
import HumanVerification from "../components/HumanVerification";
import IDVerification from "../components/IDVerification";
import SecurityQuestions from "../components/SecurityQuestions";
import Deactivate from "../components/Deactivate";

const Welcome = () => {
  const [loggedIn, setLoggedIn] = useState(ReactSession.get("signedIn"));
  const [menu, setMenu] = useState(0);
  return (
    <section>
      {loggedIn && (
        <div>
          <Navbar />
          <div className="grid grid-cols-3 p-5">
            <div className="p-5">
              <ul className="menu bg-base-300 w-[60%]">
                <li>
                  <a onClick={(e) => setMenu(1)}>Human verification</a>
                </li>
                <li>
                  <a onClick={(e) => setMenu(2)}>Identity card verification</a>
                </li>
                <li>
                  <a onClick={(e) => setMenu(3)}>Set security questions</a>
                </li>
                <li>
                  <a onClick={(e) => setMenu(4)}>Deactivate identity</a>
                </li>
              </ul>
            </div>
            <div className="col-span-2 flex justify-center" id="changeContent">
              {menu==0 && (
                <Data />
              )}

              {menu == 1 && (
                <HumanVerification />
              )}

              {menu == 2 && (
                <IDVerification />
              )}

              {menu == 3 && (
                <SecurityQuestions />
              )}

              {menu==4 && (
                <Deactivate />
              )}

            </div>
          </div>
          <Footer />
        </div>
      )}
      {!loggedIn && (
        <div>
          <span className="text-3xl">404 | Not found!</span>
          {ReactSession.get('adhaar')}
        </div>
      )}
    </section>
  );
};

export default Welcome;
