import { useAppointment } from "../context/AppointmentContext";
import React, { useState } from "react";
import { ArrowForward, Home } from "@mui/icons-material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Link, NavLink } from "react-router-dom";
import { useLogin } from "../context/LoginContext";

const MakeAppointment = () => {
  const {
    patientName,
    setPatientName,
    service,
    setService,
    Submit,
    date,
    setDate,
    time,
    setTime,
    msg,
    setMsg,
    phone,
    setPhone,
  } = useAppointment();

  const { user } = useLogin();

  return (
    <div className="p-36 bg-gradient-to-b from-slate-400 via-orange-300 to-orange-500 flex items-center justify-center">
      <form
        onSubmit={Submit}
        className="flex flex-col p-32 w-full h-full bg-white rounded-2xl"
      >
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-bold text-[32px]">Book your appointment now</h1>
            <p>So our team can reach out to you on times</p>
          </div>

          <NavLink to="/" className="btn btn-circle btn-primary">
            <Home />
          </NavLink>
        </div>

        <div className="grid grid-cols-2 gap-5 mb-5">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Full Name</span>
            </div>
            <input
              type="text"
              placeholder="eg. John Doe"
              className="input input-bordered w-full"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Services</span>
            </div>
            <input
              placeholder="Service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="input input-bordered w-full"
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Time</span>
            </div>
            <input
              placeholder="eg. 10 am to 1 pm"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="input input-bordered w-full"
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Available Date</span>
            </div>
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              dateFormat="MMMM d, yyyy"
              className="input input-bordered w-full"
              placeholderText="Select a date"
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Phone Number</span>
            </div>
            <PhoneInput
              country={"us"}
              value={phone}
              onChange={(phone) => setPhone(phone)}
              inputClass="PhoneInput border-0"
              containerClass="input input-bordered phonecont"
              buttonClass="PhoneButton"
              dropdownClass="custom-phone-input-dropdown"
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Request</span>
            </div>
            <input
              placeholder="Message"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              className="input input-bordered w-full"
            />
          </label>
        </div>

        {user ? (
          <button type="submit" className="btn btn-primary w-max ms-auto">
            Book Now
            <ArrowForward />
          </button>
        ) : (
          <Link to="/login" className="btn btn-primary w-max ms-auto">
            Book Now
            <ArrowForward />
          </Link>
        )}
      </form>
    </div>
  );
};

export default MakeAppointment;
