import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";

const AppointmentContext = createContext();

export const useAppointment = () => useContext(AppointmentContext);

export const AppointmentProvider = ({ children }) => {
  const [patientName, setPatientName] = useState("");
  const [service, setService] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("pending");
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/appointments/all")
      .then((response) => setAppointments(response.data))
      .catch((error) => console.error("Error fetching appointments:", error));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/appointments/delete/${id}`)
      .then((res) => {
        console.log(res);
        setAppointments(
          appointments.filter((appointment) => appointment._id !== id)
        );
      })
      .catch((err) => console.log(err));
  };

  const Submit = async (e) => {
    e.preventDefault();
    const formData = { patientName, service, status, phone, time, date, msg };
    try {
      const response = await axios.post(
        `http://localhost:3001/appointments/add`,
        formData
      );
      setAppointments([...appointments, response.data]);
      setPatientName("");
      setService("");
      setTime("");
      setDate("");
      setMsg("");
      setPhone("");
      setStatus("pending"); // Reset the status to "pending" after creation
    } catch (err) {
      console.log(err);
    }
  };

  const updateAppointment = (id, updatedData) => {
    axios
      .put(`http://localhost:3001/appointments/update/${id}`, updatedData)
      .then((response) => {
        setAppointments(
          appointments.map((appointment) =>
            appointment._id === id ? response.data : appointment
          )
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <AppointmentContext.Provider
      value={{
        patientName,
        setPatientName,
        service,
        setService,
        status,
        setStatus,
        appointments,
        setAppointments,
        Submit,
        handleDelete,
        updateAppointment,
        date,
        setDate,
        time,
        setTime,
        msg,
        setMsg,
        phone,
        setPhone,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};
