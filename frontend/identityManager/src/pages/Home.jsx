import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import heroImg from "../img/hero-img.png";

const Home = () => {
  return (
    <section>
      <Navbar />
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src={heroImg}
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">Decent ID</h1>
            <p className="py-6">
            Unlock Your Digital Identity with Our Decentralized Verification Center
            </p>
            <a href="/register"><button className="btn btn-primary">Get Started</button></a>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Home;
