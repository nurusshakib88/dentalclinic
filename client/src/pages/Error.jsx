import React from "react";
import { NavLink } from "react-router-dom";

const Error = () => {
  return (
    <div className="bg-gradient-to-b from-slate-400 via-orange-300 to-orange-500 h-screen flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold">Error 404</h1>
      <h3 className="capitalize py-5">page not found</h3>
      <p>
        Go back to{" "}
        <NavLink to="/" className="underline text-accent">
          Home
        </NavLink>
      </p>
    </div>
  );
};

export default Error;
