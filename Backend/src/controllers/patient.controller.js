const Appointment = require("../models/patient.model");

// =============================
// 📌 Create Appointment
// =============================
async function createAppointment(req, res){
  try {
    const { patientName, patientAge, preferredTime, clinic } = req.body;

    // Basic validation
    if (!patientName || !patientAge || !preferredTime || !clinic) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 🚨 Check for double booking (same clinic, same time)
    const existingAppointment = await Appointment.findOne({
      clinic,
      preferredTime: new Date(preferredTime),
      status: { $in: ["Pending", "Confirmed"] },
    });

    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message: "This time slot is already booked",
      });
    }

    const appointment = await Appointment.create({
      patientName,
      patientAge,
      preferredTime,
      clinic,
    });

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      data: appointment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// =============================
// 📌 Get All Appointments (Clinic wise)
// =============================
// async function getClinicAppointments(req, res){
//   try {
//     const { clinicId } = req.params;

//     const appointments = await Appointment.find({ clinic: clinicId })
//       .sort({ preferredTime: 1 });

//     res.status(200).json({
//       success: true,
//       count: appointments.length,
//       data: appointments,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };
async function getAllAppointments(req, res) {
  try {
    const appointments = await Appointment.find()
      .populate("clinic")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}



// =============================
// 📌 Update Appointment Status
// =============================
// async function updateAppointmentStatus(req, res){
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     const appointment = await Appointment.findByIdAndUpdate(
//       id,
//       { status },
//       { new: true, runValidators: true }
//     );

//     if (!appointment) {
//       return res.status(404).json({
//         success: false,
//         message: "Appointment not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Appointment updated successfully",
//       data: appointment,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };


async function updateAppointment(req, res){
  try {
    const { id } = req.params;

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment updated successfully",
      data: appointment,
    });

  } catch (error) {
    console.log("UPDATE ERROR 👉", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// 📌 Delete Appointment
// =============================
async function deleteAppointment(req, res){
  try {
    const { id } = req.params;

    const appointment = await Appointment.findByIdAndDelete(id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
    createAppointment,
    getAllAppointments,
    updateAppointment,
    deleteAppointment,
}

