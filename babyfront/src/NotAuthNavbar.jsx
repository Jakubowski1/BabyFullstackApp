/// NotAuthNavbar.jsx
const NotAuthNavbar = () => {


    return (
        <nav
            className="navbar navbar-expand navbar-dark lg-shadow round"    >

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
    )
}

export default NotAuthNavbar;