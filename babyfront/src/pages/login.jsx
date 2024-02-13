import React, { useState } from "react";
import axios from "axios";
import "../App.css"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

function LoginPage() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("DefaultUserName");
    const [password, setPassword] = useState("DefaultPassword")
    const [name, setName] = useState("DefaultName")
    const [doB, setdoB] = useState("2024-02-11")
    const { setAuth } = useAuth();

    function handleSubmit(event) {
        event.preventDefault();
        const loginPayload = {
            userName: userName,
            password: password,
        };

        axios
            .post("http://localhost:21436/api/Login/login", loginPayload)
            .then((response) => {
                const token = response.data.token;
                localStorage.setItem("token", token);
                if (token) {
                    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

                }
                else {
                    delete axios.defaults.headers.common["Authorization"];
                }
                setAuth(true);
                navigate("/Doctor");
            })
            .catch(err => console.log(err));

    }
    function handleSubmitSignIn(event) {
        event.preventDefault();
        const SignInPayload = { userName, password, name, doB };

        axios.post("http://localhost:21436/api/Registration", SignInPayload)
            .then((response) => {

                navigate("/Doctor");
            })
            .catch(err => {
                console.log(err)
            });
    }

    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
    };
    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handledDobChange = (event) => {
        setdoB(event.target.value);

    }

    return (
        <div className="cont">
            <div className="main">

                <div className="bouncingblobs-container">
                    <div className="bouncingblob bouncingblob--blue"></div>
                    <div className="bouncingblob bouncingblob--purple"></div>
                    <div className="bouncingblob bouncingblob--pink"></div>
                </div>

                <input type="checkbox" id="chk" aria-hidden="true" />


                <div className="signup">
                    <form>
                        <label htmlFor="chk" aria-hidden="true">Sign up</label>

                        <input type="text" name="txt" onChange={handleNameChange} placeholder="Name" required="" />
                        <input type="password" name="pswd" onChange={handlePasswordChange} placeholder="Password" required="" />
                        <input type="password" name="pswd" onChange={handlePasswordChange} placeholder="Confirm password" required="" />
                        <button onClick={handleSubmitSignIn}>Sign up</button>
                    </form>
                </div>

                <div className="login">
                    <form>
                        <label htmlFor="chk" aria-hidden="true">Login</label>
                        <input type="email" name="email" onChange={handleUserNameChange} placeholder="Email" required="" />
                        <input type="password" name="pswd" onChange={handlePasswordChange} placeholder="Password" required="" />
                        <button onClick={handleSubmit}>Login</button>
                    </form>
                </div>

            </div>
        </div >
    );
}

export default LoginPage;
