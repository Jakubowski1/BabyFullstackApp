import { useState, useEffect, useCallback } from "react";
import PatientDataService from "../services/patient.service";
import { Link } from "react-router-dom";





const PatientsList = () => {
  const [state, setState] = useState({
    patients: [],
    currentPatient: null,
    currentIndex: -1,
    searchName: ""
  });

  const retrievePatients = useCallback(() => {
    PatientDataService.getAll()
      .then(response => {
        setState({
          patients: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, []); 

  useEffect(() => {
    retrievePatients();
  }, [retrievePatients]);

  const refreshList = () => {
    retrievePatients();
    setState({ ...state, currentPatient: null, currentIndex: -1 });
  };

  const setActivePatient = (patient, index) => {
    setState({ ...state, currentPatient: patient, currentIndex: index });
  };

  const onChangeSearchName = (e) => {
    const { value } = e.target;
    setState((prevState) => ({
      ...prevState,
      searchName: value
    }));
    
  };

  const searchName = () => {
    setState((prevState) => ({
      ...prevState,
      currentPatient: null,
      currentIndex: -1
    }));

    PatientDataService.findByName(state.searchName)
      .then((response) => {
        setState((prevState) => ({
          ...prevState,
          patients: response.data,
        }));
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="btn-toolbar">
        <div className="btn-toolbar">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={state.searchName}
            onChange={onChangeSearchName}
          />
          
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={searchName}
              style={
                {
                  marginRight: 1 + 'em',
                  marginTop: 1 + "em",
                  marginBottom: 1+ "em"
                }
              }
            >
              Search
            </button>
            <button type="button" onClick={refreshList} className="btn btn-secondary"    style={
                {
                  marginRight: 1 + 'em',
                  marginTop: 1 + "em",
                  marginBottom: 1+ "em"
                }
              }>
          Refresh List
              </button >
              <Link to={"/add"} >
              <button type="button" className="btn btn-success"    style={
                {
                  marginRight: 1 + 'em',
                  marginTop: 1 + "em",
                  marginBottom: 1+ "em"
                }
              }>
                Add
                </button>
              </Link>
          
        </div>
      </div>
      <div className="col-md-6">
        <h4>Patient List</h4>

        <ul className="list-group">
          {state.patients &&
            state.patients.map((patient, index) => (
              <li
                className={
                  "list-group-item " +
                  (index === state.currentIndex ? "active" : "")
                }
                onClick={() => setActivePatient(patient, index)}
                key={index}
              >
                {patient.name}
              </li>
            ))}
        </ul>

       
      </div>
      <div className="col-md-6">
        {state.currentPatient ? (
          <div>
            <h4>Patient</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {state.currentPatient.name}
            </div>
            <div>
              <label>
                <strong>ID:</strong>
              </label>{" "}
              {state.currentPatient.id}
            </div>
            <div>
              <label>
                <strong>Phone numer:</strong>
              </label>{" "}
              {state.currentPatient.phoneNumber}
            </div>
            <div>
              <label>
                <strong>Email:</strong>
              </label>{" "}
              {state.currentPatient.email}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {state.currentPatient.published ? "Published" : "Pending"}
            </div>
            
            <Link to={"/patient/" + state.currentPatient.id}>
                <button type="button" className="btn btn-info">
              Edit
              </button>
            </Link>
         
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Patient...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientsList;
