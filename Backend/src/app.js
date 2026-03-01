const express = require("express");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth.routes");
const clinicRoutes = require("./routes/clinic.routes");
const Clinic_Card = require("./routes/clinicCard.routes");
const patient_Appointment = require("./routes/patient.routes");
const cors = require("cors");
const path  = require("path")


const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("./public"));

app.use("/api/auth",authRouter);
app.use("/api/auth/clinic", clinicRoutes);
app.use("/api/clinic/card",Clinic_Card);
app.use("/api/user/appointment",patient_Appointment);


app.use("*name",(req,res)=>{
    res.sendFile(path.join(__dirname,"../public/index.html"))
})


module.exports = app;