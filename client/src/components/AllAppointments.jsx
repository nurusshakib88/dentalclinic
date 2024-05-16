import { useAppointment } from "../context/AppointmentContext";
import React, { useState } from "react";

const AllAppointments = () => {
  const {
    patientName,
    setPatientName,
    service,
    setService,
    status,
    setStatus,
    appointments,
    Submit,
    handleDelete,
    updateAppointment,
  } = useAppointment();

  const [editAppointmentId, setEditAppointmentId] = useState(null);
  const [editPatientName, setEditPatientName] = useState("");
  const [editService, setEditService] = useState("");
  const [editStatus, setEditStatus] = useState("pending");

  const handleEditClick = (appointment) => {
    setEditAppointmentId(appointment._id);
    setEditPatientName(appointment.patientName);
    setEditService(appointment.service);
    setEditStatus(appointment.status);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedData = {
      patientName: editPatientName,
      service: editService,
      status: editStatus,
    };
    updateAppointment(editAppointmentId, updatedData);
    setEditAppointmentId(null);
  };

  return (
    <div>
      <form onSubmit={Submit}>
        <input
          type="text"
          placeholder="Patient Name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Service"
          value={service}
          onChange={(e) => setService(e.target.value)}
        />
        <button type="submit" className="btn btn-success">
          Create Appointment
        </button>
      </form>

      <h1>All Services</h1>
      {appointments.map((appointment) => (
        <div key={appointment._id}>
          {editAppointmentId === appointment._id ? (
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                placeholder="Patient Name"
                value={editPatientName}
                onChange={(e) => setEditPatientName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Service"
                value={editService}
                onChange={(e) => setEditService(e.target.value)}
              />
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
              <button
                type="button"
                onClick={() => setEditAppointmentId(null)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </form>
          ) : (
            <div>
              <h3>{appointment.patientName}</h3>
              <p>{appointment.service}</p>
              <p>{appointment.status}</p>
              <button
                type="button"
                onClick={() => handleEditClick(appointment)}
                className="btn btn-warning"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDelete(appointment._id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AllAppointments;
