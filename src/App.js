import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import PropTypes from 'prop-types';
import { getStudent, addStudent, editStudent, deleteStudent } from './Redux/action';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import es from 'date-fns/locale/es';
import axios, { post } from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.css';

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validMobileRegex = RegExp(
  /^([0-9]{1})([234789]{1})([0-9]{8})$/i
);
const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  return valid;
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      Firstname: "",
      lastName: "",
      email: "", address: "", mobile: "", gender: "Female", dob: new Date(new Date().toDateString()), country: "", file: null
      ,
      errors: {
        Firstname: "",
        lastName: "",
        email: "", address: "", mobile: "", gender: "", dob: "", country: ""
      },
      shouldHide: true
    };
  }

  static propTypes = {
    studentes: PropTypes.array.isRequired,
    getStudent: PropTypes.func.isRequired,
    addStudent: PropTypes.func.isRequired,
    editStudent: PropTypes.func.isRequired,
    deleteStudent: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getStudent();
  }
  handleChange = (event) => {

    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'Firstname': 
      errors.Firstname = 
        value.length < 5
          ? 'First name must be at least 5 characters long!'
          : '';
      break;
      case 'lastName': 
      errors.lastName = 
        value.length < 5
          ? 'Last Name must be at least 5 characters long!'
          : '';
      break;
      case 'email':
        errors.email = 
        value.length < 5
          ? 'Email  Required!'
          : '';
        errors.email =
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
        break;
      case 'mobile':
        errors.mobile =
          validMobileRegex.test(value)
            ? ''
            : 'Mobile Number is not valid!';
        break;

      default:
        break;
    }



    this.setState({ errors, [name]: value });

  }

  submitData = () => {


    if (this.state.Firstname && this.state.lastName && this.state.email && !this.state.id) {
      const newStudent = {
        id: Math.floor(Math.random() * (999 - 100 + 1) + 100),
        Firstname: this.state.Firstname,
        lastName: this.state.lastName,
        email: this.state.email,
        address: this.state.address,
        mobile: this.state.mobile,
        gender: this.state.gender,
        dob: this.state.dob,
        country: this.state.country,
        file: this.state.file
      };

      this.props.addStudent(newStudent);
      this.clearData();
    } else if (this.state.Firstname && this.state.lastName && this.state.email && this.state.id) {
      const updatedDetails = {
        id: this.state.id,
        Firstname: this.state.Firstname,
        lastName: this.state.lastName,
        email: this.state.email,
        address: this.state.address,
        mobile: this.state.mobile,
        gender: this.state.gender,
        dob: this.state.dob,
        country: this.state.country,

        file: this.state.file
      };

      this.props.editStudent(updatedDetails);
      this.clearData();
    } else {
      alert('Enter Student Details.');
    }

    
  }

  editDetails = (data) => {
    this.handleAddClick();
    this.setState({
      id: data.id,
      Firstname: data.Firstname,
      lastName: data.lastName
      ,
      email: data.email
      ,
      address: data.address,
      mobile: data.mobile,
      gender: data.gender,
      dob: data.dob,
      country: data.country,

      file: data.file
    })
  }

  deleteStudent = (id) => {
    this.clearData();
    if (window.confirm("Are you sure?")) {
      this.props.deleteStudent(id);
    }
  }

  setGender(e) {
    this.setState({
      gender: e.target.value
    })
  }

  handleChangeDateChange = date => {
    this.setState({
      dob: date
    })
  };
  handleAddClick = () =>{
    this.setState({shouldHide: false});
  }
  clearData = () => {
    this.setState({
      id: 0,
      Firstname: "",
      lastName: "",
      email: "", address: "", mobile: "", gender: "Female", dob: null, country: "", file: null
    });
    this.setState({shouldHide: true});
  }
  handleSubmit = (event) => {
    
    event.preventDefault();
    if (validateForm(this.state.errors)) {
      console.info('Valid Form')
      this.submitData()
    } else {
      console.error('Invalid Form')
    }
  }
 
  render() {
    const { errors } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">CRUD opeartions for Student Module</h1>
        </header>
        <div className="container">
        <button onClick={this.handleAddClick} className={this.state.shouldHide ? '' : 'hidden'}>
        Add student
      </button>
      <button className="btn btn-success" onClick={this.clearData} className={this.state.shouldHide ? 'hidden' : 'btn btn-success'}>View student</button>
          <form onSubmit={this.handleSubmit} className="form-horizontal" className={this.state.shouldHide ? 'hidden' : 'form-horizontal'}>
            <div className="form-group row">
              <label className="control-label col-sm-2" >First name :</label>
              <div className="col-sm-10">
                <input name='Firstname' className="form-control" onChange={this.handleChange} value={this.state.Firstname} type="text" placeholder="First Name" noValidate />
                {errors.Firstname.length > 0 &&
                  <span className='error'>{errors.Firstname}</span>
                }
              </div>
            </div>
            <div className="form-group row">
              <label className="control-label col-sm-2" >Last name :</label>
              <div className="col-sm-10">
                <input className="form-control" name='lastName' onChange={this.handleChange} value={this.state.lastName} type="text" placeholder="Last Name" noValidate />
                {errors.lastName.length > 0 &&
                  <span className='error'>{errors.lastName}</span>
                }
              </div>
            </div>
            <div className="form-group row">
              <label className="control-label col-sm-2" >Email ID :</label>
              <div className="col-sm-10">
                <input className="form-control" type='email' name='email' onChange={this.handleChange} value={this.state.email} noValidate placeholder="Email ID" />
                {errors.email.length > 0 &&
                  <span className='error'>{errors.email}</span>
                }
              </div>
            </div>


            <div className="form-group row">
              <label className="control-label col-sm-2" >Address :</label>
              <div className="col-sm-10">
                <textarea className="form-control"
                  name="address"
                  value={this.state.address} onChange={this.handleChange} placeholder="Enter Address"
                  noValidate />
              </div>
            </div>

            <div className="form-group row">
              <label className="control-label col-sm-2" > Mobile no : </label>
              <div className="col-sm-10"> <input className="form-control" name='mobile' onChange={this.handleChange} value={this.state.mobile} type="text" placeholder="Mobile no" noValidate />
                {errors.mobile.length > 0 &&
                  <span className='error'>{errors.mobile}</span>
                }</div>
            </div>
            <div className="form-group row">
              <label className="control-label col-sm-2" > Gender  :</label>
              <div className="col-sm-4"> 
              <span className="container"  onChange={this.setGender.bind(this)}>
              <label className="radio-inline">
                <input  type="radio" value="Male" name="gender" defaultChecked={this.state.gender == "Male"} /> Male
               </label>
               <label className="radio-inline"> <input type="radio"  value="Female" name="gender" defaultChecked={this.state.gender == "Female"} />
                Female</label>
  </span>
              </div>
            </div>
            <div className="form-group row">
              <label className="control-label col-sm-2" > DOB  :</label>
              <div className="col-sm-2">
                <DatePicker className="form-control"
                  selected={this.state.dob} onChange={this.handleChangeDateChange} dateFormat="MMMM d, yyyy" />
              </div>
            </div>
            <div className="form-group row">
              <label className="control-label col-sm-2" > Country   :</label>
              <div className="col-sm-10">
                <select className="form-control" name='country'
                  value={this.state.country}
                  onChange={this.handleChange}
                >
                  <option value="">Select</option>
                  <option value="India">India</option>
                  <option value="Sri Lanka">Sri Lanka</option>
                  <option value="Switzerland">Switzerland</option>
                </select>
              </div>
            </div>
            <div className="form-group">
    <div className="col-sm-offset-2 col-sm-10">
    {this.state.id ? <button type="submit" className="btn btn-success" >Update</button> : <button  type="submit" className="btn btn-success">Save</button>}
     
    </div>
  </div>
           

          </form>
          
          <div className="table-responsive" className={this.state.shouldHide ? '' : 'hidden'}>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email ID</th>
                  <th>Address</th>
                  <th>Mobile no</th>
                  <th>Gender </th>
                  <th>DOB</th>
                  <th>Country</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.props.studentes && this.props.studentes.map((data, index) => {
                  return <tr key={(index + 1)}>
                    <td>{(index + 1)}</td>
                    <td>{data.Firstname}</td>
                    <td>{data.lastName}</td>
                    <td>{data.email}</td>
                    <td>{data.address}</td>
                    <td>{data.mobile}</td>
                    <td>{data.gender}</td>
                    <td>
                      {data.dob.toLocaleDateString()}
                    </td>
                    <td>{data.country}</td>
                    <td><button onClick={() => this.editDetails(data)}>EDIT</button> <button onClick={() => this.deleteStudent(data.id)}>DELETE</button> </td>
                  </tr>
                })}
              </tbody>
            </table>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  studentes: state.studentes
});

export default connect(mapStateToProps, { getStudent, addStudent, editStudent, deleteStudent })(App);