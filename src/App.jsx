import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import "./app.css"

class App extends Component {
    constructor() {
        super();
        this.state = {
            fullName: '',
            username: '',
            email: '',
            phonenumber: '',
            mothername: '',
            fathername: '',
            adharrcard: '',
            schoolname: '',
            registration: '',
            totalmarks: '',
            voterid: '',
            password: '',
            errors: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        const { name, value } = event.target;
        let errors = { ...this.state.errors };
        switch (name) {
            case 'fullName':
                errors.fullName = value.length < 5 ? 'Full Name must be at least 5 characters long!' : '';
                break;
            case 'username':
                errors.username = value.length < 5 ? 'Username must be at least 5 characters long!' : '';
                break;
            case 'email':
                errors.email = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ? '' : 'Please enter a valid email address!';
                break;
            case 'phonenumber':
                errors.phonenumber = /^[0-9]{10}$/.test(value) ? '' : 'Phone Number must be 10 digits!';
                break;
            case 'adharrcard':
                errors.adharrcard = /^[0-9]{12}$/.test(value) ? '' : 'Aadhar Card Number must be 12 digits!';
                break;
            case 'schoolname':
                errors.schoolname = value.length < 5 ? 'School Name must be at least 5 characters long!' : '';
                break;
            case 'registration':
                errors.registration = /^[0-9]{6}$/.test(value) ? '' : 'Registration Number must be 6 digits!';
                break;
            case 'totalmarks':
                errors.totalmarks = /^[0-9]{1,3}$/.test(value) ? '' : 'Total Marks must be 1-3 digits only!';
                break;
            case 'voterid':
                errors.voterid = /^[A-Z]{3}[0-9]{7}$/.test(value) ? '' : 'Voter ID format is invalid!';
                break;
            case 'password':
                errors.password = value.length < 8 ? 'Password must be at least 8 characters long!' : '';
                break;
            default:
                break;
        }
        this.setState({
            [name]: value,
            errors
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const isValid = this.validateForm();
        if (isValid) {
            alert('By confirming you are ready to submit the application there after the changes cannot be made please do re-check and submit the application');
            const registered = {
                fullName: this.state.fullName,
                username: this.state.username,
                email: this.state.email,
                phonenumber: this.state.phonenumber,
                mothername: this.state.mothername,
                fathername: this.state.fathername,
                adharrcard: this.state.adharrcard,
                schoolname: this.state.schoolname,
                registration: this.state.registration,
                totalmarks: this.state.totalmarks,
                voterid: this.state.voterid,
                password: this.state.password
            };
            axios.post('http://0.0.0.0:4000/app/signup', registered)
                .then(res => console.log(res.data))
                .catch(err => console.log(err));
            this.setState({
                fullName: '',
                username: '',
                email: '',
                phonenumber: '',
                mothername: '',
                fathername: '',
                adharrcard: '',
                schoolname: '',
                registration: '',
                totalmarks: '',
                voterid: '',
                password: '',

                errors: {}
                });
            }
        }
        
        validateForm() {
            let isValid = true;
            let errors = {};
        
            if (this.state.fullName.length < 5) {
                errors.fullName = 'Full Name must be at least 5 characters long!';
                isValid = false;
            }
            if (this.state.username.length < 5) {
                errors.username = 'Username must be at least 5 characters long!';
                isValid = false;
            }
            if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) {
                errors.email = 'Please enter a valid email address!';
                isValid = false;
            }
            if (!/^[0-9]{10}$/.test(this.state.phonenumber)) {
                errors.phonenumber = 'Phone Number must be 10 digits!';
                isValid = false;
            }
            if (!/^[0-9]{12}$/.test(this.state.adharrcard)) {
                errors.adharrcard = 'Aadhar Card Number must be 12 digits!';
                isValid = false;
            }
            if (this.state.schoolname.length < 5) {
                errors.schoolname = 'School Name must be at least 5 characters long!';
                isValid = false;
            }
            if (!/^[0-9]{6}$/.test(this.state.registration)) {
                errors.registration = 'Registration Number must be 6 digits!';
                isValid = false;
            }
            if (!/^[0-9]{1,3}$/.test(this.state.totalmarks)) {
                errors.totalmarks = 'Total Marks must be 1-3 digits only!';
                isValid = false;
            }
            if (!/^[A-Z]{3}[0-9]{7}$/.test(this.state.voterid)) {
                errors.voterid = 'Voter ID format is invalid!';
                isValid = false;
            }
            if (this.state.password.length < 8) {
                errors.password = 'Password must be at least 8 characters long!';
                isValid = false;
            }
            if (document.getElementById('formFile').value === '') {
                errors.adharcardfile = 'Please upload your Aadhar card!';
                isValid = false;
            }
        
            this.setState({ errors });
            return isValid;
        }
        
        render() {
            const { errors } = this.state;
            return (
                <div className="container ">
                    <h1>Application Form</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="line mb-4"></div>
                        <div className="display7">
                        <div className="form-group">
                            <label>Full Name:</label>
                            <input type="text" placeholder=''  className={`form-control ${errors.fullName ? 'is-invalid' : ''}`} name="fullName" value={this.state.fullName} onChange={this.handleChange} />
                            {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
                        </div>
                        <div className="form-group">
                            <label>Username:</label>
                            <input type="text" placeholder=""  className={`form-control ${errors.username ? 'is-invalid' : ''}`} name="username" value={this.state.username} onChange={this.handleChange} />
                            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="email" placeholder='email' className={`form-control ${errors.email ? 'is-invalid' : ''}`} name="email" value={this.state.email} onChange={this.handleChange} />
                            {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                        </div>
                        <div className="form-group">
                        <label>Phone Number:</label>
                            
                            <input type="tel" placeholder='91+' className={`form-control ${errors.phonenumber ? 'is-invalid' : ''}`} name="phonenumber" value={this.state.phonenumber} onChange={this.handleChange} />
                            {errors.phonenumber && <div className="invalid-feedback">{errors.phonenumber}</div>}
                        </div>
                        <div className="form-group">
                            <label>Mother's Name:</label>
                            <input type="text" className="form-control" name="mothername" value={this.state.mothername} onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Father's Name:</label>
                            <input type="text" className="form-control" name="fathername" value={this.state.fathername} onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Aadhar Card Number:</label>
                            <input type="text" placeholder='4334-4567-4785'className={`form-control ${errors.adharrcard ? 'is-invalid' : ''}`} name="adharrcard" value={this.state.adharrcard} onChange={this.handleChange} />
                            {errors.adharrcard && <div className="invalid-feedback">{errors.adharrcard}</div>}
                         </div>
                         </div>
                         
                         <h3 className='header mt-4'>School Details:</h3>
                         <div className="line mb-4 mt-2"></div>
                         <div className="display7"> 
                        <div className="form-group">
                             <label>School Name:</label>
                             <input type="text" className={`form-control ${errors.schoolname ? 'is-invalid' : ''}`} name="schoolname" value={this.state.schoolname} onChange={this.handleChange} />
                             {errors.schoolname && <div className="invalid-feedback">{errors.schoolname}</div>}
                          </div>
                        <div className="form-group">
                             <label>Registration Number:</label>
                             <input type="text" placeholder='XXXXXX'className={`form-control ${errors.registration ? 'is-invalid' : ''}`} name="registration" value={this.state.registration} onChange={this.handleChange} />
                             {errors.registration && <div className="invalid-feedback">{errors.registration}</div>}
                        </div>
                        <div className="form-group">
                            <label>Total Marks:</label>
                            <input type="text" placeholder='/600'className={`form-control ${errors.totalmarks ? 'is-invalid' : ''}`} name="totalmarks" value={this.state.totalmarks} onChange={this.handleChange} />
                            {errors.totalmarks && <div className="invalid-feedback">{errors.totalmarks}</div>}
                        </div>
                        </div>
                        <h3 className='header mt-4'>Other Details:</h3>
                         <div className="line mb-4 mt-2"></div>
                         <div className="display7">
                        <div className="form-group">
                            <label>Parent Voter ID:</label>
                            <input type="text" placeholder='ex: AZ123W5431'className={`form-control ${errors.voterid ? 'is-invalid' : ''}`} name="voterid" value={this.state.voterid} onChange={this.handleChange} />
                            {errors.voterid && <div className="invalid-feedback">{errors.voterid}</div>}
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} name="password" value={this.state.password} onChange={this.handleChange} />
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>
                        <div className="form-group">
                            <label for="formFile" className="form-label mt-2">Upload Your Aadhar card</label>
                            <input className={`form-control ${errors.adharcardfile ? 'is-invalid' : ''}`} type="file" id="formFile" name="file" onChange={this.handleChange}/>
                            {errors.adharcardfile && <div className="invalid-feedback">{errors.adharcardfile}</div>}
                          </div>

                        </div>
                        <div className='btnn'>
                        <button type="submit" className="btn btn-primary mt-10">Submit</button>
                        </div>
                </form>
            </div>
             );
         }
     }
        export default App;
        