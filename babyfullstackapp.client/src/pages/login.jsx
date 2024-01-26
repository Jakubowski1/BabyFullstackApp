import { Link } from "react-router-dom";
import Validation from './LoginValidation';
import "../App.css";
import { useState } from "react";

export default function Login(){
   


    const [values, setValues] = useState({
        email: '',
        password:''
    })

    const [errors, setErrors] = useState({})

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]:[event.target.value]}));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
    }

	return (

        <div className="logincustom">
        <div className="p-3 rounded w-25" style={{ background: "rgba(255, 255, 255, 0.25)" }}>
          <form className="text-white">
            <div className="mb-3">
              <label htmlFor="email"><strong>Email</strong></label>
              <input type="email" placeholder="Enter Email" name='email' onChange={handleInput} className="form-control rounded-25" />
              {errors.email && <span className="text-danger">{errors.email}</span>}
            </div>
            <div className="mb-3">
              <label htmlFor="password"><strong>Password</strong></label>
              <input type="password" placeholder="Enter Password" name='password' onChange={handleInput} className="form-control rounded-25" />
              {errors.password && <span className="text-danger">{errors.password}</span>}
            </div>
            <div className="d-grid gap-3">
            <Link to="/signup" className="btn btn-default border w-100 bg-light rounded-25 text-decoration-none">Create Account</Link>
            <button
  type='submit'
  className="btn btn-success w-100 rounded-25"
  onClick={() => {
    alert("wrong pass");
     // Add this line to change the color
  }}
>
  <strong>Login</strong>
</button>

            </div>
          </form>
        </div>
</div>
      
	);
}

