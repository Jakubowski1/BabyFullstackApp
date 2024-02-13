import { useAuth } from "./provider/authProvider";
import { useNavigate, Link } from "react-router-dom";
import "./App.css";
import Logo from "./assets/warsaw-health-center-high-resolution-logo-transparent.png"
import User from "./assets/Profile User Round White Icon Symbol PNG.jpg"
import Navbar from "./Navbar";



const NotAuthNavbar = () => {

    const auth = useAuth();
    const navigate = useNavigate();

    const logout = async () => {
        await axios.get("http://localhost:21436/api/Login/login", { withCredentials: true })
            .then(res => {
                console.log(res.data);
                navigate('/login');
                return;
            })
    }

    return (
        <nav>
        <ul>
            <li style={{ float: 'left' }}>

                <Link to={"/Home"} className="logo">
                    <img
                        src={Logo}
                        alt="Logo"
                        style={{ height: "30px", marginLeft: "300px", marginBottom: "5px" }}
                    />
                </Link>
            </li>
            <li style={{ float: 'left' }} className="nav-item fs-5 fw-bold">
                <a >
                    <Link to={"/Home"} className="nav-link" >
                        Home
                    </Link>
                </a>
            </li>
            <li className="nav-item fs-5 fw-bold">
                <a >
                    <Link to={"/login"} className="nav-link" >
                        Log out
                    </Link>
                </a>
            </li>
            <li style={{ float: 'right' }}>

                <Link to={"/Home"} className="logo">
                    <img
                        src={User}
                        alt="User"
                        style={{ height: "30px", marginLeft: "300px", marginBottom: "5px" }}
                    />
                </Link>
            </li>

        </ul>

        </nav>
    )
}

export default NotAuthNavbar

