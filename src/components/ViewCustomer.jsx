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
    navigate(-1);
  };

  return (
    <div className="view-cars-container">
      <div className="view-cars-banner">
        <button className="go-back-button" onClick={handleGoBack}>
          <img src={Logo} alt="Logo" className="logo" />
        </button>
        <h1 className="banner-title">Customer Details</h1>
      </div>

      <table className="cars-table">
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Address</th>
            <th>Pincode</th>
            <th>Date of Birth</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {records.map((d, i) => (
            <tr key={i}>
              <td>{d.customer_id}</td>
              <td>{d.customer_name}</td>
              <td>{d.customer_email}</td>
              <td>{d.customer_mobile}</td>
              <td>{d.customer_address}</td>
              <td>{d.customer_pincode}</td>
              <td>{d.customer_dob}</td>
              <td>{d.customer_age}</td>
              <td>
                <Link to={`/viewpolicy/${d.customer_id}`}>
                  <button className="btn-info">View Policy</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewCustomer;
