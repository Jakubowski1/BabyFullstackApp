import React, { useState } from "react";
import axios from "axios";
import "../App.css"
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("admin");
    const [password, setPassword] = useState("password");

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
                window.location.href = '/'
            })
            .catch(err => console.log(err));
      
    }
        return (

            <div class="main">
                <input type="checkbox" id="chk" aria-hidden="true" />

                <div class="signup">
                    <form>
                        <label for="chk" aria-hidden="true">Sign up</label>
                        <input type="text" name="txt" placeholder="User name" required="" />
                        <input type="email" name="email" placeholder="Email" required="" />
                        <input type="password" name="pswd" placeholder="Password" required="" />
                        <button>Sign up</button>
                    </form>
                </div>

                <div class="login">
                    <form>
                        <label for="chk" aria-hidden="true">Login</label>
                        <input type="email" name="email" placeholder="Email" required="" />
                        <input type="password" name="pswd" placeholder="Password" required="" />
                        <button onClick={handleSubmit}>Login</button>
                    </form>
                </div>
            </div>

        );
    }

export default LoginPage;