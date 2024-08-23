import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaCar, FaCalendarAlt, FaFileSignature } from 'react-icons/fa';
import Logo from './back.png';
import './FileClaim.css';

function FileClaim() {
  const [inputData, setInputData] = useState({
    claim_issue: "",
    car_make: "",
    car_name: "",
    car_model: "",
    car_year: "",
    car_buyingdate: "",
    car_number: "",
    claim_status: "Pending",
    vehicle_invoice: "",
    present_image: "",
    customer_name: "",
    customer_email: "",
    customer_mobile: "",
    carinsurance: {}
  });

  const navigate = useNavigate();

  useEffect(() => {
    const policyData = sessionStorage.getItem("Insurance");
    if (policyData) {
      const parsedPolicyData = JSON.parse(policyData);
      setInputData(prevState => ({
        ...prevState,
        carinsurance: parsedPolicyData
      }));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateValues(inputData)) {
      axios
        .post("http://localhost:8051/claim", inputData)
        .then((res) => {
          alert("Claim Filed Successfully");
          navigate("/landingpage2");
        })
        .catch((err) => console.error('Error submitting the form:', err));
    } else {
      alert("Please enter valid inputs!");
    }
  };

  const validateValues = (data) => {
    if (!data.claim_issue) {
      alert("Please select a claim reason!");
      return false;
    } else if (!data.car_make) {
      alert("Please enter Car Brand!");
      return false;
    } else if (!data.car_name) {
      alert("Please enter Car Name!");
      return false;
    } else if (!data.customer_name) {
      alert("Please enter your name!");
      return false;
    } else if (!data.customer_email || !/\S+@\S+\.\S+/.test(data.customer_email)) {
      alert("Please enter a valid email address!");
      return false;
    } else if (!data.customer_mobile || !/^\d+$/.test(data.customer_mobile)) {
      alert("Please enter a valid mobile number!");
      return false;
    }
    return true;
  };

  const handleGoBack = () => {
    navigate(-1); 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="file-claim-container">
      <header className="view-cars-banner bg-info">
        <button className="go-back-button" onClick={handleGoBack}>
          <img src={Logo} alt="Logo" className="logo" />
        </button>
        <h1 className="banner-title text-dark">Fill the Claim Detail Form</h1>
      </header>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="claim_issue"><FaFileSignature /> Claim Reason:</label>
            <select
              name="claim_issue"
              id="claim_issue"
              className="form-control"
              value={inputData.claim_issue}
              onChange={handleChange}
            >
              <option value="" disabled>Select Reason</option>
              <option value="Accident">Accident</option>
              <option value="Repair">Repair</option>
              <option value="Service">Service</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="customer_name"><FaUser /> Your Name:</label>
            <input
              type="text"
              name="customer_name"
              className="form-control"
              placeholder='Enter your name'
              value={inputData.customer_name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="customer_email"><FaEnvelope /> Your Email:</label>
            <input
              type="email"
              name="customer_email"
              className="form-control"
              placeholder='Enter your email'
              value={inputData.customer_email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="customer_mobile"><FaPhone /> Your Mobile Number:</label>
            <input
              type="text"
              name="customer_mobile"
              className="form-control"
              placeholder='Enter mobile number'
              value={inputData.customer_mobile}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="car_make"><FaCar /> Vehicle Brand:</label>
            <input
              type="text"
              name="car_make"
              className="form-control"
              placeholder='Enter vehicle brand'
              value={inputData.car_make}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="car_name"><FaCar /> Vehicle Name:</label>
            <input
              type="text"
              name="car_name"
              className="form-control"
              placeholder='Enter vehicle name'
              value={inputData.car_name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="car_model"><FaCar /> Vehicle Model:</label>
            <input
              type="text"
              name="car_model"
              className="form-control"
              placeholder='Enter vehicle model'
              value={inputData.car_model}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="car_year"><FaCalendarAlt /> Vehicle Year:</label>
            <input
              type="text"
              name="car_year"
              className="form-control"
              placeholder='Enter vehicle year'
              value={inputData.car_year}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="car_buyingdate"><FaCalendarAlt /> Vehicle Registered On:</label>
            <input
              type="text"
              name="car_buyingdate"
              className="form-control"
              placeholder='Enter vehicle registration date'
              value={inputData.car_buyingdate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="car_number"><FaCar /> Vehicle Registration Number:</label>
            <input
              type="text"
              name="car_number"
              className="form-control"
              placeholder='Enter vehicle registration number'
              value={inputData.car_number}
              onChange={handleChange}
            />
          </div>

          <button className="btn-submit" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default FileClaim;
