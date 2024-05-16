import React from "react";
import TeethImg from "../assets/teeth.png";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="grid grid-cols-12 items-center pb-32">
      <div className="col-span-6">
        <h3 className="font-medium flex gap-2">
          <span className="text-primary">-</span>EXPERT MEDICAL TREATMENT
        </h3>
        <h1 className="text-[62px] font-bold leading-tight mb-5">
          Embrace a Radiant Smile with Our Expert Care
        </h1>
        <p className="mb-5">
          We provide exceptional dental care services to our patients at a
          reasonable cost.
        </p>
        <Link
          to="/appointment"
          className="btn btn-primary outline outline-white"
        >
          Book an Appointment
        </Link>
      </div>

      <div className="col-span-6 ">
        <div className="relative flex justify-center">
          <img src={TeethImg} className="z-20 relative" alt="" />
          <div className="bg-primary w-[387px] aspect-square absolute bottom-0 rounded-full z-10"></div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
