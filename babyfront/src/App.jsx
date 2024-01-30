import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Particles from "react-tsparticles";
import { loadSeaAnemonePreset } from "tsparticles-preset-sea-anemone";
import Logo from "./assets/warsaw-health-center-high-resolution-logo-transparent.png";
import AddPatient from "./components/add-patient.component";
import Patient from "./components/patient.component";
import PatientsList from "./components/patient-list.component";
import AddDoctor from "./components/add-doctor.component";
import Doctor from "./components/doctor.component";
import DoctorsList from "./components/doctor-list.component";

import SignUp from "./pages/signup";
import Login from "./pages/login";
import Home from "./pages/Home";


function App() {
    const options = {
        preset: "seaAnemone",
    };
    const initialize = (instance) => {
        loadSeaAnemonePreset(instance);
    };

    return (
        <div>
            <Particles options={options} init={initialize} />
            <div className="content-container">
                <nav
                    className="navbar navbar-expand navbar-dark lg-shadow round"
                    style={{
                        background: "rgba(0,0,0, 0.9)",
                        alignItems: "center",
                        paddingRight: "60px",
                        paddingLeft: "60px",
                        paddingTop: "3px",
                        paddingBottom: "3px",
                        backdropFilter: "blur(10px)",
                    }}
                >
                    <Link to={"/Home"} className="logo">
                        <img
                            src={Logo}
                            alt="Logo"
                            style={{ height: "40px", marginRight: "20px" }}
                        />
                    </Link>
                    <ul className="navbar-nav">
                        <li className="nav-item fs-5 fw-bold">
                            <Link to={"/Patient"} className="nav-link">
                                Patients
                            </Link>
                        </li>
                        <li className="nav-item fs-5 fw-bold">
                            <Link to={"/Doctor"} className="nav-link">
                                Doctors
                            </Link>
                        </li>
                    </ul>

                    <div className="navbar-collapse justify-content-end">
                        <ul className="navbar-nav">
                            <li className="nav-item fs-5 fw-bold">
                                <Link to={"/signup"} className="nav-link">
                                    Register
                                </Link>
                            </li>
                            <li className="nav-item fs-5 fw-bold">
                                <Link to={"/login"} className="nav-link">
                                    Login
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                <div className="container mt-3">
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/Patient" element={<PatientsList />} />
                        <Route path="/add" element={<AddPatient />} />
                        <Route path="/Patient/:id" element={<Patient />} />
                        <Route path="/Home" element={<Home />} />
                        <Route path="/Doctor" element={<DoctorsList />} />
                        <Route path="/addDoctor" element={<AddDoctor />} />
                        <Route path="/Doctor/:id" element={<Doctor />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
