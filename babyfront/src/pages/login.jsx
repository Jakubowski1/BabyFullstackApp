import React, { useState } from "react";
import axios from "axios";
import "../App.css"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

function LoginPage() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("admin");
    const [password, setPassword] = useState("password");

    function handleSubmit(event) {
        event.preventDefault();
        const { setAuth } = useAuth();
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
                    setAuth(true);
                }
                else {
                    delete axios.defaults.headers.common["Authorization"];
                }
                window.location.href = '/Doctor'
            })
            .catch(err => console.log(err));
      
    }
    const handleNameChange = (event) => {
        setUserName(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
        return (

            <div className="main">
                <input type="checkbox" id="chk" aria-hidden="true" />

                <div className="signup">
                    <form>
                        <label htmlFor="chk" aria-hidden="true">Sign up</label>
                        <input type="text" name="txt" placeholder="User name" required="" />
                        <input type="email" name="email" placeholder="Email" required="" />
                        <input type="password" name="pswd" placeholder="Password" required="" />
                        <button>Sign up</button>
                    </form>
                </div>

                <div className="login">
                    <form>
                        <label htmlFor="chk" aria-hidden="true">Login</label>
                        <input type="email" name="email" onChange={handleNameChange} placeholder="Email" required="" />
                        <input type="password" name="pswd" onChange={handlePasswordChange} placeholder="Password" required="" />
                        <button onClick={handleSubmit}>Login</button>
                    </form>
                </div>
            </div>

        );
    }

export default LoginPage;