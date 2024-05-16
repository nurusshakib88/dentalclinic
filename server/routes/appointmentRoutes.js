//DoctorRoutes.js
const express = require("express");
const router = express.Router();
const AppointmentController = require("../controllers/appointmentController");

router.post("/add", AppointmentController.createAppointment);
router.get("/all", AppointmentController.getAllAppointments);
router.delete("/delete/:id", AppointmentController.deleteAppointment);
router.put("/update/:id", AppointmentController.updateAppointment);

module.exports = router;
