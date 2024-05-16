// AppointmentController.js
const AppointmentModel = require("../model/Appointment");

const AppointmentController = {
  createAppointment: (req, res) => {
    AppointmentModel.create(req.body)
      .then((appointments) => res.json(appointments))
      .catch((err) => res.json(err));
  },
  getAllAppointments: (req, res) => {
    AppointmentModel.find({})
      .then((appointments) => res.json(appointments))
      .catch((err) => res.json(err));
  },
  deleteAppointment: (req, res) => {
    const id = req.params.id;
    AppointmentModel.findByIdAndDelete({ _id: id })
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  },
  
  updateAppointment: (req, res) => {
    const id = req.params.id;
    const updateData = req.body;
    AppointmentModel.findByIdAndUpdate(id, updateData, { new: true })
      .then((appointment) => {
        if (!appointment) {
          return res.status(404).json({ message: "Appointment not found" });
        }
        res.json(appointment);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = AppointmentController;
