import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaCar, FaCalendarAlt, FaMoneyBillWave, FaListAlt, FaUser, FaTools } from 'react-icons/fa';
import Logo from './back.png';
import './BuyCarInsurance2.css';

function BuyCarInsurance() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [inputData, setInputData] = useState({
    policy_name: "",
    policy_scheme: "",
    car_make: "",
    car_name: "",
    car_model: "",
    car_year: "",
    car_buyingdate: "",
    car_number: "",
    policy_amount: "",
    customer: {}
  });

  const navigate = useNavigate();

  useEffect(() => {
    const customerData = sessionStorage.getItem("loggedInUser");

    if (customerData) {
      const parsedCustomerData = JSON.parse(customerData);
      setInputData(prevState => ({
        ...prevState,
        customer: parsedCustomerData
      }));
      console.log(parsedCustomerData);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = validateValues(inputData);

    if (result) {
      axios
        .post("http://localhost:8051/carinsurance", inputData)
        .then((res) => {
          console.log(res.data);
          sessionStorage.setItem('Insurance', JSON.stringify(res.data)); 
          alert("Successfully filed a Policy");
          navigate("/landingpage2");
        })
        .catch((err) => console.error('Error submitting the form:', err));
    } else {
      alert("Please enter valid inputs!!!");
    }
  };

  const handlePolicyNameChange = (e) => {
    const policyName = e.target.value;
    let amount = "";

    switch (policyName) {
      case "Standalone Own Damage Car Insurance":
        amount = "10000";
        break;
      case "Comprehensive Car Insurance":
        amount = "20000";
        break;
      case "Third-party Car Insurance":
        amount = "30000";
        break;
      default:
        amount = "";
    }

    setInputData(prevState => ({
      ...prevState,
      policy_name: policyName,
      policy_amount: amount
    }));
  };

  const validateValues = (data) => {
    if (!data.policy_name) {
      alert("Please enter policy name !!!");
      return false;
    } else if (!data.policy_scheme) {
      alert("Please enter policy scheme !!!");
      return false;
    } else if (!data.car_make) {
      alert("Please enter your car brand name !!!");
      return false;
    } else if (!data.car_name) {
      alert("Please enter your car model name !!!");
      return false;
    } else if (!data.car_number) {
      alert("Please enter your car registration number !!!");
      return false;
    } else {
      return true;
    }
  };

  const handleGoBack = () => {
    navigate(-1); 
  };
  
  return (
    <div id="body" className="container">
      <header className="view-cars-banner bg-info">
        <button className="go-back-button" onClick={handleGoBack}>
          <img src={Logo} alt="Logo" className="logo" />
        </button>
        <h1 className="banner-title text-dark">Fill your Car Insurance Details</h1>
      </header>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="insurance-form">
          <div className="form-group">
            <label htmlFor="policy_name">
              <FaListAlt /> Policy Name:
            </label>
            <select
              name="policy_name"
              className="form-control"
              value={inputData.policy_name}
              onChange={handlePolicyNameChange}
            >
              <option value="" disabled>Select Policy</option>
              <option value="Standalone Own Damage Car Insurance">Standalone Own Damage Car Insurance</option>
              <option value="Comprehensive Car Insurance">Comprehensive Car Insurance</option>
              <option value="Third-party Car Insurance">Third-party Car Insurance</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="policy_scheme">
              <FaTools /> Policy Scheme (years):
            </label>
            <input
              type="text"
              name="policy_scheme"
              className="form-control"
              value={inputData.policy_scheme}
              onChange={(e) =>
                setInputData({ ...inputData, policy_scheme: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="car_make">
              <FaCar /> Car Brand:
            </label>
            <input
              type="text"
              name="car_make"
              className="form-control"
              value={inputData.car_make}
              onChange={(e) =>
                setInputData({ ...inputData, car_make: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="car_name">
              <FaCar /> Car Name:
            </label>
            <input
              type="text"
              name="car_name"
              className="form-control"
              value={inputData.car_name}
              onChange={(e) =>
                setInputData({ ...inputData, car_name: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="car_model">
              <FaCar /> Car Model:
            </label>
            <input
              type="text"
              name="car_model"
              className="form-control"
              value={inputData.car_model}
              onChange={(e) =>
                setInputData({ ...inputData, car_model: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="car_year">
              <FaCalendarAlt /> Car Making Year:
            </label>
            <input
              type="number"
              name="car_year"
              className="form-control"
              value={inputData.car_year}
              onChange={(e) =>
                setInputData({ ...inputData, car_year: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="car_buyingdate">
              <FaCalendarAlt /> Car Bought On:
            </label>
            <input
              type="date"
              name="car_buyingdate"
              className="form-control"
              value={inputData.car_buyingdate}
              onChange={(e) =>
                setInputData({ ...inputData, car_buyingdate: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="car_number">
              <FaCar /> Car Registration Number:
            </label>
            <input
              type="text"
              name="car_number"
              className="form-control"
              value={inputData.car_number}
              onChange={(e) =>
                setInputData({ ...inputData, car_number: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="policy_amount">
              <FaMoneyBillWave /> Policy Amount:
            </label>
            <input
              type="text"
              name="policy_amount"
              className="form-control"
              value={inputData.policy_amount}
              readOnly
            />
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default BuyCarInsurance;
