import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./ViewCustomer.css";
import Logo from './back.png';

function ViewCustomer() {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8051/customer/all")
      .then((response) => {
        setRecords(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div id="body" className="container">
      <div className="banner">
        <button className="go-back-button" onClick={handleGoBack}>
          <img src={Logo} alt="Logo" className="logo" />
        </button>
        <h1 id="app2" className="text-center text-bg-info">
          New Customer Details
        </h1>
      </div>

      <div className="customer-cards">
        {records.map((d, i) => (
          <div key={i} className="customer-card">
            <div className="customer-card-header">
              <h2>Customer ID: {d.customer_id}</h2>
            </div>
            <div className="customer-card-body">
              <div className="customer-detail">
                <strong>Name:</strong> {d.customer_name}
              </div>
              <div className="customer-detail">
                <strong>Email:</strong> {d.customer_email}
              </div>
              <div className="customer-detail">
                <strong>Mobile:</strong> {d.customer_mobile}
              </div>
              <div className="customer-detail">
                <strong>Address:</strong> {d.customer_address}
              </div>
              <div className="customer-detail">
                <strong>Pincode:</strong> {d.customer_pincode}
              </div>
              <div className="customer-detail">
                <strong>Date of Birth:</strong> {d.customer_dob}
              </div>
              <div className="customer-detail">
                <strong>Age:</strong> {d.customer_age}
              </div>
            </div>
            <div className="customer-card-footer">
              <Link to="/viewpolicy">
                <button id="policybutton" className="btn btn-info">View Policy</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewCustomer;
