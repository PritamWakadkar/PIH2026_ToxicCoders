const Clinic = require("../models/clinic.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


async function registerClinic(req, res) {
  try {
    const { clinicName, medicalLicense, city, adminEmail, password } = req.body;

    if (!clinicName || !medicalLicense || !city || !adminEmail || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const isClinicAlreadyExists = await Clinic.findOne({
      $or: [{ adminEmail }, { medicalLicense }]
    });

    if (isClinicAlreadyExists) {
      return res.status(409).json({
        message: "Clinic already exists"
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const clinic = await Clinic.create({
      clinicName,
      medicalLicense,
      city,
      adminEmail,
      password: hash,
    });

    const token = jwt.sign(
      { id: clinic._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, 
    });

    return res.status(201).json({
      message: "Clinic registered successfully",
      clinic: {
        clinicName: clinic.clinicName,
        medicalLicense: clinic.medicalLicense,
        city: clinic.city,
        adminEmail: clinic.adminEmail,
      }
    });

  } catch (err) {
    console.log("CLINIC REGISTER ERROR:", err);
    return res.status(500).json({
      message: err.message
    });
  }
}


async function loginClinic(req, res) {
  try {
    const { adminEmail, password } = req.body;

    if (!adminEmail || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const clinic = await Clinic.findOne({ adminEmail });

    if (!clinic) {
      return res.status(404).json({
        message: "Clinic not found"
      });
    }

    const isPasswordValid = await bcrypt.compare(password, clinic.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid password"
      });
    }

    const token = jwt.sign(
      { id: clinic._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, 
    });

    return res.status(200).json({
      message: "Clinic logged-in successfully",
      clinic: {
        clinicName: clinic.clinicName,
        medicalLicense: clinic.medicalLicense,
        city: clinic.city,
        adminEmail: clinic.adminEmail,
      }
    });

  } catch (err) {
    console.log("CLINIC LOGIN ERROR:", err);
    return res.status(500).json({
      message: err.message
    });
  }
}




async function logoutClinic(req, res) {
  try {

    res.clearCookie("token", {
      httpOnly: true,
      secure: false, // production me true
      sameSite: "lax"
    });

    return res.status(200).json({
      message: "Clinic logged out successfully"
    });

  } catch (err) {
    console.log("CLINIC LOGOUT ERROR:", err);
    return res.status(500).json({
      message: err.message
    });
  }
}



module.exports = {
  registerClinic,
  loginClinic,
  logoutClinic
};