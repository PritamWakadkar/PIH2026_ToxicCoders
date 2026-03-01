const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const clinicSchema = new mongoose.Schema(
  {
    clinicName: {
      type: String,
      required: true,
    },

    medicalLicense: {
      type: String,
      required: true,
      unique: true,
    },

    city: {
      type: String,
      required: true,
    },

    adminEmail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter valid email"],
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);




module.exports = mongoose.model("Clinic", clinicSchema);