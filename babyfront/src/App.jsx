import { BrowserRouter as Router, Route,Routes, Link} from 'react-router-dom';
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
import AuthProvider from "./provider/authProvider";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import Home from "./pages/Home";
import RouteGuard from "./components/RouteGuard";   

function App() {
    const options = {
        preset: "seaAnemone",
    };
    const initialize = (instance) => {
        loadSeaAnemonePreset(instance);
    };

    return (
        <div>
 
            <div className="content-container">
                <nav
                    className="navbar navbar-expand navbar-dark lg-shadow round"    >
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
                        <Route path="/login" element={<Login />} />
                        <Route path="/Doctor" element={<RouteGuard component={<DoctorsList />} />} />
                        <Route path="/Patient" element={<PatientsList/> }/>
                        </Routes>
         
                </div>
            </div>
        </div>
    );
}

export default App;
