import React, { useState, useLayoutEffect } from 'react';
import { ReactSession } from "react-client-session";
import GettingStarted from '../api/GettingStarted';
import Index from '../api/Index';
import NonTransaction from '../api/NonTransaction';
import Transaction from '../api/Transaction';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const API = () => {

  const [page, setPage] = useState(0);

  return (
    <section>
      <Navbar />
      <div className="grid grid-cols-5">
        <div className="p-2 min-h-[70vh]">
          <ul className="menu menu-compact lg:menu-normal bg-base-100 w-56">
          <li className="bordered">
              <a onClick={(e) => setPage(0)}>Introduction</a>
            </li>
            <li>
              <a onClick={(e) => setPage(1)}>Getting started</a>
            </li>
            <li className="bordered">
              <a onClick={(e) => setPage(2)}>Authentication</a>
            </li>
            <li>
              <a onClick={(e) => setPage(2)}>Non transaction login</a>
            </li>
            <li>
              <a onClick={(e) => setPage(3)}>Transaction login</a>
            </li>
          </ul>
        </div>
        <div className="col-span-4">
            {page==0 && (
              <Index />
            )}
            
            {page==1 && (
              <GettingStarted />
            )}

            {page==2 && (
              <NonTransaction />
            )}

            {page==3 && (
              <Transaction />
            )}

        </div>
      </div>
      <Footer />
    </section>
  );
};

export default API;
