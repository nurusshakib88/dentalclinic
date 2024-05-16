// ServiceController.js
const ServiceModel = require("../model/Service");

const ServiceController = {
  createService: (req, res) => {
    ServiceModel.create(req.body)
      .then((services) => res.json(services))
      .catch((err) => res.json(err));
  },
  getAllServices: (req, res) => {
    ServiceModel.find({})
      .then((services) => res.json(services))
      .catch((err) => res.json(err));
  },
  deleteService: (req, res) => {
    const id = req.params.id;
    ServiceModel.findByIdAndDelete({ _id: id })
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  },
};

module.exports = ServiceController;
