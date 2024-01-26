/* eslint-disable react/prop-types */
import { Component } from "react";
import DoctorDataService from "../services/doctor.service";
import { withRouter } from '../common/with-router';

class Doctor extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getDoctor = this.getDoctor.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateDoctor = this.updateDoctor.bind(this);
    this.deleteDoctor = this.deleteDoctor.bind(this);

    this.state = {
      currentDoctor: {
        id: null,
        title: "",
        description: "",
        spec: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getDoctor(this.props.router.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentDoctor: {
          ...prevState.currentDoctor,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentDoctor: {
        ...prevState.currentDoctor,
        description: description
      }
    }));
  }

  getDoctor(id) {
    DoctorDataService.get(id)
      .then(response => {
        this.setState({
          currentDoctor: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentDoctor.id,
      title: this.state.currentDoctor.title,
      description: this.state.currentDoctor.description,
      spec: this.state.currentDoctor.spec,
      published: status
    };

    DoctorDataService.update(this.state.currentDoctor.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentDoctor: {
            ...prevState.currentDoctor,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateDoctor() {
    DoctorDataService.update(
      this.state.currentDoctor.id,
      this.state.currentDoctor
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Doctor was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteDoctor() {    
    DoctorDataService.delete(this.state.currentDoctor.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/Doctor');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentDoctor } = this.state;

    return (
      <div>
        {currentDoctor ? (
          <div className="edit-form">
            <h4>Doctor</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentDoctor.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentDoctor.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Specialization</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentDoctor.spec}
                  onChange={this.onChangeSpec}
                />
              </div>
              

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentDoctor.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentDoctor.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteDoctor}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateDoctor}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Doctor...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Doctor);