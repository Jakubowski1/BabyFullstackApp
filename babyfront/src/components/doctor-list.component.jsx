import  { Component } from "react";
import DoctorDataService from "../services/doctor.service";
import { Link } from "react-router-dom";

export default class DoctorsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveDoctors = this.retrieveDoctors.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveDoctor = this.setActiveDoctor.bind(this);
    this.removeAllDoctors = this.removeAllDoctors.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      Doctors: [],
      currentDoctor: null,
      currentIndex: -1,
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrieveDoctors();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  retrieveDoctors() {
    DoctorDataService.getAll()
      .then(response => {
        this.setState({
          doctors: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveDoctors();
    this.setState({
      currentDoctor: null,
      currentIndex: -1
    });
  }

  setActiveDoctor(doctor, index) {
    this.setState({
      currentDoctor: doctor,
      currentIndex: index
    });
  }

  removeAllDoctors() {
    DoctorDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchName() {
    this.setState({
      currentDoctor: null,
      currentIndex: -1
    });

    DoctorDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          doctors: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchName, doctors, currentDoctor, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Doctors List</h4>

          <ul className="list-group">
            {doctors &&
              doctors.map((doctor, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveDoctor(doctor, index)}
                  key={index}
                >
                  {doctor.name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-danger"
            onClick={this.removeAllDoctors}
          >
            Remove All
          </button>
          <Link to="/addDoctor">
        <button className="btn btn-success">New Doctor</button>
      </Link>
        </div>
        <div className="col-md-6">
          {currentDoctor ? (
            <div>
              <h4>Doctor</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentDoctor.name}
              </div>
              <div>
                <label>
                  <strong>Date of Birth:</strong>
                </label>{" "}
                {currentDoctor.doB}
              </div>
              <div>
                <label>
                  <strong>ID:</strong>
                </label>{" "}
                {currentDoctor.id}
              </div>
              <div>
                <label>
                  <strong>Specialization:</strong>
                </label>{" "}
                {currentDoctor.spec}
              </div>
              {/* Add other fields as needed */}

              <Link
                to={"Doctor/" + currentDoctor.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Doctor...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
