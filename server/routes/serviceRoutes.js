//DoctorRoutes.js
const express = require("express");
const router = express.Router();
const ServiceController = require("../controllers/serviceController");

router.post("/add", ServiceController.createService);
router.get("/all", ServiceController.getAllServices);
router.delete("/delete/:id", ServiceController.deleteService);

module.exports = router;
