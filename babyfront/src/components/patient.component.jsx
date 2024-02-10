import  { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PatientDataService from "../services/patient.service";
import { withRouter } from '../common/with-router';

const Patient = () => {
  const [currentPatient, setCurrentPatient] = useState({
    id: null,
    name: "",
    doB: "",
    phoneNumber: "",
    email: "",
    userName: ""
  });

  const [message, setMessage] = useState("");

  const { id } = useParams();

  useEffect(() => {
    getPatient(id);
  }, [id]);

  const onChangeName = (e) => {
    const name = e.target.value;
    setCurrentPatient((prevPatient) => ({ ...prevPatient, name }));
  };

  const onChangeDoB = (e) => {
    const doB = e.target.value;
    setCurrentPatient((prevPatient) => ({ ...prevPatient, doB }));
  };

  const onChangePhoneNumber = (e) => {
    const phoneNumber = e.target.value;
    setCurrentPatient((prevPatient) => ({ ...prevPatient, phoneNumber }));
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setCurrentPatient((prevPatient) => ({ ...prevPatient, email }));
  };

  const onChangeUserName = (e) => {
    const userName = e.target.value;
    setCurrentPatient((prevPatient) => ({ ...prevPatient, userName }));
  };

  const getPatient = (id) => {
    PatientDataService.get(id)
      .then(response => {
        setCurrentPatient(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

    const updatePatient = (e) => {
        e.preventDefault();
        console.log("Update button clicked");
    PatientDataService.update(currentPatient.id, currentPatient)
      .then(response => {
        console.log(response.data);
        setMessage("The Patient was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

    const deletePatient = () => {  
      
    PatientDataService.delete(currentPatient.id)
      .then(response => {
        console.log(response.data);
        setMessage("The Patient was deleted successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentPatient ? (
        <div className="edit-form">
          <h4>Patient</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={currentPatient.name}
                onChange={onChangeName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="doB">Date of Birth</label>
              <input
                type="date"
                className="form-control"
                id="doB"
                value={currentPatient.doB}
                onChange={onChangeDoB}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                value={currentPatient.phoneNumber}
                onChange={onChangePhoneNumber}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={currentPatient.email}
                onChange={onChangeEmail}
              />
            </div>
            <div className="form-group">
              <label htmlFor="userName">Username</label>
              <input
                type="text"
                className="form-control"
                id="userName"
                value={currentPatient.userName}
                onChange={onChangeUserName}
              />
            </div>
          </form>

          <button onClick={deletePatient} className="btn btn-danger">Remove</button>

          <button
            type="submit"
            className="btn btn-success"
            onClick={updatePatient}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a patient...</p>
        </div>
      )}
    </div>
  );
};

export default withRouter(Patient);
