import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Contact = () => {
  return (
    <section>
      <Navbar />
      <div className="p-5 flex justify-center">
        <span className="text-3xl">Meet the team</span>
      </div>
      <div className="p-5 grid grid-cols-3">
        {/* Identity card begins */}

        <div className="card w-96 bg-base-100 shadow-xl my-10">
          <figure>
            <img
              src="https://picsum.photos/400/200?random=1"
              alt="human"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Ayush Bansal</h2>
            <p>ML Developer, Blockchain developer, Web Developer</p>
            <div className="card-actions justify-end">
              <a href="#"><button className="btn btn-primary">Contact me</button></a>
            </div>
          </div>
        </div>

        {/* Identity card ends */}

        {/* Identity card begins */}

        <div className="card w-96 bg-base-100 shadow-xl my-10">
          <figure>
            <img
              src="https://picsum.photos/400/200?random=2"
              alt="human"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Ganesh G. Setty</h2>
            <p>ML Developer, Web Developer</p>
            <div className="card-actions justify-end">
              <a href="#"><button className="btn btn-primary">Contact me</button></a>
            </div>
          </div>
        </div>

        {/* Identity card ends */}

        {/* Identity card begins */}

        <div className="card w-96 bg-base-100 shadow-xl my-10">
          <figure>
            <img
              src="https://picsum.photos/400/200?random=3"
              alt="human"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Yathansh Tewatia</h2>
            <p>ML Developer, Web Developer</p>
            <div className="card-actions justify-end">
              <a href="#"><button className="btn btn-primary">Contact me</button></a>
            </div>
          </div>
        </div>

        {/* Identity card ends */}

        {/* Identity card begins */}

        <div className="card w-96 bg-base-100 shadow-xl my-10">
          <figure>
            <img
              src="https://picsum.photos/400/200?random=4"
              alt="human"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Vedant Agnihotri</h2>
            <p>ML Developer, Web Developer</p>
            <div className="card-actions justify-end">
              <a href="#"><button className="btn btn-primary">Contact me</button></a>
            </div>
          </div>
        </div>

        {/* Identity card ends */}

      </div>
      <Footer />
    </section>
  );
};

export default Contact;
