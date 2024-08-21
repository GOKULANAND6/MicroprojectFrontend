import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupCustomer.css';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBirthdayCake, FaLock, FaMapPin, FaTransgender } from 'react-icons/fa';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import Logo from './back.png';

function SignupCustomer() {
  const navigate = useNavigate();

  const [inputData, setInputData] = useState({
    customer_name: '',
    customer_email: '',
    customer_mobile: '',
    customer_address: '',
    customer_pincode: '',
    customer_dob: '',
    customer_age: '',
    customer_gender: '',
    customer_password: ''
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateValues(inputData);

    if (Object.keys(validationErrors).length === 0) {
      axios
        .post('http://localhost:8051/customer', inputData)
        .then((res) => {
          alert('Data added Successfully');
          navigate('/logincustomer');
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      setErrors(validationErrors);
    }
  };

  const validateValues = (data) => {
    const errors = {};
    if (!data.customer_name) {
      errors.customer_name = 'Please enter the Name';
    }
    if (!data.customer_email) {
      errors.customer_email = 'Please enter the Email';
    }
    if (!data.customer_password) {
      errors.customer_password = 'Please enter a Valid Password';
    }
    return errors;
  };

  
  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <div id="signup">
      <div className="container">
      <header className="view-cars-banner bg-info">   
        <button className="go-back-button" onClick={handleGoBack}>
          <img src={Logo} alt="Logo" className="logo" />
        </button>
        <MDBIcon fas icon="user" className="banner-icon" />
        <h1 className="banner-title text-dark">Customer Registration Form</h1>
      </header>
        <h1>Kindly fill up this Registration Form</h1>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="customerName">
              <FaUser /> Customer Name
            </label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              required
              onChange={(e) =>
                setInputData({ ...inputData, customer_name: e.target.value })
              }
            />
            {errors.customer_name && <span className="error">{errors.customer_name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="mobile">
              <FaPhone /> Mobile Number
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              required
              onChange={(e) =>
                setInputData({ ...inputData, customer_mobile: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">
              <FaMapMarkerAlt /> Address
            </label>
            <textarea
              id="address"
              name="address"
              rows="4"
              required
              onChange={(e) =>
                setInputData({ ...inputData, customer_address: e.target.value })
              }
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="email">
              <FaEnvelope /> Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              onChange={(e) =>
                setInputData({ ...inputData, customer_email: e.target.value })
              }
            />
            {errors.customer_email && <span className="error">{errors.customer_email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="age">
              <FaBirthdayCake /> Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              min="1"
              max="120"
              required
              onChange={(e) =>
                setInputData({ ...inputData, customer_age: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="dob">
              <FaBirthdayCake /> Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              required
              onChange={(e) =>
                setInputData({ ...inputData, customer_dob: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="pincode">
              <FaMapPin /> Your Pincode
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              required
              onChange={(e) =>
                setInputData({ ...inputData, customer_pincode: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">
              <FaTransgender /> Gender
            </label>
            <select
              id="gender"
              name="gender"
              required
              onChange={(e) =>
                setInputData({ ...inputData, customer_gender: e.target.value })
              }
            >
              <option value="" disabled defaultValue>
                Select your gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="password">
              <FaLock /> Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              onChange={(e) =>
                setInputData({ ...inputData, customer_password: e.target.value })
              }
            />
            {errors.customer_password && <span className="error">{errors.customer_password}</span>}
          </div>
          <div className="form-group">
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupCustomer;
