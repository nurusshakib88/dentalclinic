import { useAppointment } from "../context/AppointmentContext";
import React, { useState } from "react";

import Navbar from "../components/Navbar";

const AppointmentList = () => {
  const { appointments } = useAppointment();

  return (
    <div className="px-36 min-h-screen bg-gradient-to-b from-slate-400 via-orange-300 to-orange-500">
      <Navbar />
      <h1 className="text-4xl font-bold mb-10">My Appointments</h1>
      <div className="grid grid-cols-5 mb-2 gap-5 items-center bg-white p-5 rounded-xl font-bold">
        <h3>Time</h3>
        <h3>Patient</h3>
        <h3>Service</h3>
        <h3>Request</h3>
        <h3>Status</h3>
      </div>
      {appointments.map((appointment) => (
        <div
          key={appointment._id}
          className="grid grid-cols-5 mb-2 gap-5 items-center bg-white p-5 rounded-xl overflow-hidden"
        >
          <h3>{appointment.time}</h3>
          <h3>{appointment.patientName}</h3>
          <p>{appointment.service}</p>
          <h2 className="max-h-[50px] text-clip overflow-hidden">
            {appointment.msg}
          </h2>
          <p>{appointment.status}</p>
        </div>
      ))}
    </div>
  );
};

export default AppointmentList;
