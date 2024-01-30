import { useState } from "react";
import PatientDataService from "../services/patient.service";
import { Link } from "react-router-dom";
const AddPatient = () => {
  const [patient, setPatient] = useState({
    id: null,
    name: "",
    doB: "",
    userName: "",
    email: null,
    passwordHash: null,
    // Add other fields as needed
    submitted: false,
  });

  const onChangeName = (e) => {
    setPatient({ ...patient, name: e.target.value });
  };

  const onChangeDoB = (e) => {
    setPatient({ ...patient, doB: e.target.value });
  };

  const onChangeUserName = (e) => {
    setPatient({ ...patient, userName: e.target.value });
  };

  const savePatient = () => {
    const data = {
      name: patient.name,
      doB: patient.doB,
      userName: patient.userName,
      email: patient.email,
      phoneNumber: patient.phoneNumber
    };

    PatientDataService.create(data)
      .then((response) => {
        setPatient({
          ...patient,
          id: response.data.id,
          name: response.data.name,
          doB: response.data.doB,
          userName: response.data.userName,
          // Add other fields as needed
          submitted: true,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };


  return (
    <div className="submit-form">
      {patient.submitted ? (
        <Link to="/Patient">
          <button className="btn btn-success">Back</button>
        </Link>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={patient.name}
              onChange={onChangeName}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="doB">Date of Birth</label>
            <input
              type="date"
              className="form-control"
              id="doB"
              required
              value={patient.doB}
              onChange={onChangeDoB}
              name="doB"
            />
          </div>

          <div className="form-group">
            <label htmlFor="userName">Username</label>
            <input
              type="text"
              className="form-control"
              id="userName"
              required
              value={patient.userName}
              onChange={onChangeUserName}
              name="userName"
            />
          </div>

          {/* Add other input fields as needed */}

          <button onClick={savePatient} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddPatient;
