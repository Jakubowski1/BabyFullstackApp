/* eslint-disable react/prop-types */
import DoctorDataService from "../services/doctor.service";


import { Component } from "react";



export default class AddDoctor extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDoB = this.onChangeDoB.bind(this);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeSpec = this.onChangeSpec.bind(this);
        this.saveDoctor = this.saveDoctor.bind(this);
        this.newDoctor = this.newDoctor.bind(this);

        this.state = {
            id: null,
            name: "",
            doB: "",
            userName: "",
            spec: "",
            email: null,
            passwordHash: null,
            // Add other fields as needed

            submitted: false
        };
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeDoB(e) {
        this.setState({
            doB: e.target.value
        });
    }

    onChangeUserName(e) {
        this.setState({
            userName: e.target.value
        });
    }

    onChangeSpec(e) {
        this.setState({
            spec: e.target.value
        });
    }

    saveDoctor() {
        var data = {
            name: this.state.name,
            doB: this.state.doB,
            userName: this.state.userName,
            spec: this.state.spec,
            // Add other fields as needed
        };

        DoctorDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    name: response.data.name,
                    doB: response.data.doB,
                    userName: response.data.userName,
                    spec: response.data.spec,
                    // Add other fields as needed

                    submitted: true
                });
                console.log(response.data);

                // After successful submission, navigate back to the previous page
                this.props.history.goBack();
            })
            .catch(e => {
                console.log(e);
            });
    }
    newDoctor() {
        this.setState({
            id: null,
            name: "",
            doB: "",
            userName: "",
            spec: "",
            email: null,
            passwordHash: null,
            // Add other fields as needed

            submitted: false
        });
    }


    render() {
        return (
            <div className="submit-form">
                <h1>Add a Doctor</h1>
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newDoctor}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                required
                                value={this.state.name}
                                onChange={this.onChangeName}
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
                                value={this.state.doB}
                                onChange={this.onChangeDoB}
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
                                value={this.state.userName}
                                onChange={this.onChangeUserName}
                                name="userName"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="spec">Specialization</label>
                            <input
                                type="text"
                                className="form-control"
                                id="spec"
                                required
                                value={this.state.spec}
                                onChange={this.onChangeSpec}
                                name="spec"
                            />
                        </div>

                        {/* Add other input fields as needed */}

                        <button onClick={this.saveDoctor} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );
    }
}
