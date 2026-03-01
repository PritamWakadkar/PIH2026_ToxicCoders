const Clinic = require("../models/clinicCard.model");

async function createClinic(req, res){
  try {
    const clinic = await Clinic.create(req.body);

    res.status(201).json({
      success: true,
      message: "Clinic created successfully",
      data: clinic,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

async function getAllClinics(req, res){
  try {
    const clinics = await Clinic.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: clinics.length,
      data: clinics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

async function getSingleClinic(req, res){
  try {
    const clinic = await Clinic.findById(req.params.id);

    if (!clinic) {
      return res.status(404).json({
        success: false,
        message: "Clinic not found",
      });
    }

    res.status(200).json({
      success: true,
      data: clinic,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

async function updateClinic(req, res){
  try {
    const clinic = await Clinic.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!clinic) {
      return res.status(404).json({
        success: false,
        message: "Clinic not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Clinic updated successfully",
      data: clinic,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

async function deleteClinic(req, res){
  try {
    const clinic = await Clinic.findByIdAndDelete(req.params.id);

    if (!clinic) {
      return res.status(404).json({
        success: false,
        message: "Clinic not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Clinic deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
    createClinic,
    getAllClinics,
    getSingleClinic,
    updateClinic,
    deleteClinic,
}