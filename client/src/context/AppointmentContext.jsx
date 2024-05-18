import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";

const AppointmentContext = createContext();

export const useAppointment = () => useContext(AppointmentContext);

export const AppointmentProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [patientName, setPatientName] = useState("");
  const [service, setService] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("waiting");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/appointments/all")
      .then((response) => setAppointments(response.data))
      .catch((error) => console.error("Error fetching appointments:", error));

    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:3001/user", {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setUser(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError("Error fetching user data");
          console.log("Error fetching user data:", error);
          setLoading(false);
        });
    } else {
      setError("No token found");
      console.log("No token found");
      setLoading(false);
    }
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
    if (!user) {
      console.log("User not authenticated");
      return;
    }
    const formData = {
      patientName,
      service,
      status,
      phone,
      time,
      date,
      msg,
      userId: user._id,
    };
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
      setStatus("waiting");
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
        user,
        setUser,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};
