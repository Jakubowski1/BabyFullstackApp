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
import SignUp from "./pages/signup";
import Login from "./pages/login";
import Home from "./pages/Home";
import RouteGuard from "./components/RouteGuard";  
import {useAuth }from './provider/authProvider'
import Navbar from './Navbar';
import NotAuthNavbar from './NotAuthNavbar'

function App() {
    const { auth } = useAuth();

    const options = {
        preset: "seaAnemone",
    };
    const initialize = (instance) => {
        loadSeaAnemonePreset(instance);
    };

     return (
                <div className="container mt-3">
                         {auth ? <Navbar /> : <NotAuthNavbar />}
                        <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/Doctor" element={<RouteGuard>
                            <DoctorsList />
                        </RouteGuard>   } />
                        <Route path="/Patient" element={<PatientsList />} />
                        <Route path="/Home" element={<Home />} />
                         </Routes>
         
                </div>
     

    );
}

export default App;
