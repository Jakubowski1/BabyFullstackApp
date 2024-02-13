import { useAuth } from "./provider/authProvider";
import { useNavigate, Link } from "react-router-dom";
import Logo  from "./assets/warsaw-health-center-high-resolution-logo-transparent.png"


const Navbar = () => {

    const auth = useAuth();
    const navigate = useNavigate();

    const logout = () => {
                localStorage.clear();
                navigate('/login');
                return;
      
    }

    return (
        <nav
            className="navbar navbar-expand navbar-dark lg-shadow round">
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
                        <Link to={"/login"} onClick={logout} className="nav-link">
                            Log out
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;

