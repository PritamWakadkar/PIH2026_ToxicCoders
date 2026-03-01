const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: [true, "Patient name is required"],
    },

    patientAge: {
      type: Number,
      required: [true, "Patient age is required"],
      min: [0, "Age cannot be negative"],
      max: [120, "Invalid age"],
    },

    preferredTime: {
      type: String,   
      required: [true, "Preferred time is required"],
    },

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
      default: "Pending",
    },

    clinic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clinic_Card",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);