import React from "react";
import DoctorVideo1 from "../assets/video1.png";
import DoctorVideo2 from "../assets/video2.jpg";
import { PlayCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";

const WhyChoose = () => {
  return (
    <div className="px-16 py-20 bg-[#D1CCA3]">
      <div className="px-[350px] text-center">
        <h3 className="text-white font-semibold">Services</h3>
        <h1 className="text-[36px] font-bold mb-10">
          Watch video to learn why he is the right doctor for you
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-16">
        <Link
          to="https://www.youtube.com/@DoctorMike/videos"
          target="_blank"
          className="relative"
        >
          <img
            src={DoctorVideo1}
            className="rounded-2xl h-[350px] w-full object-cover"
          />
          <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 z-20 w-[60px] aspect-square bg-white text-blue-100 rounded-full flex items-center justify-center">
            <PlayCircle sx={{ fontSize: "35px" }} />
          </div>
        </Link>
        <Link
          to="https://www.youtube.com/@DoctorMike/videos"
          target="_blank"
          className="relative"
        >
          <img
            src={DoctorVideo2}
            className="rounded-2xl h-[350px] w-full object-cover"
          />
          <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 z-20 w-[60px] aspect-square bg-white text-blue-100 rounded-full flex items-center justify-center">
            <PlayCircle sx={{ fontSize: "35px" }} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default WhyChoose;
