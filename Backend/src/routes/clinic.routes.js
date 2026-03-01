const express = require("express");
const router = express.Router();

const {
  registerClinic,
  loginClinic,
  logoutClinic,
} = require("../controllers/clinic.controller");

// 🏥 Register Clinic
router.post("/register", registerClinic);

// 🔐 Login Clinic
router.post("/login", loginClinic);


router.post("/register", registerClinic);
router.post("/login", loginClinic);
router.post("/logout", logoutClinic);


module.exports = router;