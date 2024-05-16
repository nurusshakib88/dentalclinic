import React from "react";
import Banner from "../components/Banner";
import Services from "../components/Services";
import WhyChoose from "../components/WhyChoose";
import DedicatedDoctor from "../components/DedicatedDoctor";
import PatientTestimonial from "../components/PatientTestimonial";
import GetInTouch from "../components/GetInTouch";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <div className="bg-gradient-to-b from-slate-400 via-orange-300 to-orange-500">
        <div className="px-36 mx-auto">
          <Navbar />
          <Banner />
          <Services />
        </div>
        <div>
          <WhyChoose />

          <div className="px-36 mx-auto">
            <DedicatedDoctor />
            <PatientTestimonial />
            <GetInTouch />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;
