import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewClaim.css";
import Logo from './back.png';
import { useNavigate } from "react-router-dom";

function ViewClaim() {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8051/claim/all")
      .then((response) => {
        setRecords(response.data);
      })
      .catch((err) => {
        console.log("Error fetching claims:", err);
      });
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Approved':
        return 'status-approved';
      case 'Rejected':
        return 'status-rejected';
      case 'Verifying':
      case 'Validating':
        return 'status-verifying-validating';
      case 'Pending':
        return 'status-pending';
      default:
        return '';
    }
  };

  return (
    <div className="view-claim-container">
      <header className="view-claim-banner">
        <button className="go-back-button" onClick={handleGoBack}>
          <img src={Logo} alt="Logo" className="logo" />
        </button>
        <h1 className="banner-title">Applied for Insurance Claim</h1>
      </header>

      <table className="claims-table">
        <thead>
          <tr>
            <th>Claim Id</th>
            <th>Claim Issue</th>
            <th>Customer Name</th>
            <th>Customer Email</th>
            <th>Customer Mobile</th>
            <th>Car Brand</th>
            <th>Car Name</th>
            <th>Car Model</th>
            <th>Car Year</th>
            <th>Car Registered On</th>
            <th>Car Number</th>
            <th>Claim Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((d, i) => (
            <tr key={i} className={d.isNew ? 'new-claim' : ''}>
              <td>{d.claim_id}</td>
              <td>{d.claim_issue}</td>
              <td>{d.carinsurance?.customer?.customer_name}</td>
              <td>{d.carinsurance?.customer?.customer_email}</td>
              <td>{d.carinsurance?.customer?.customer_mobile}</td>
              <td>{d.car_make}</td>
              <td>{d.car_name}</td>
              <td>{d.car_model}</td>
              <td>{d.car_year}</td>
              <td>{d.car_buyingdate}</td>
              <td>{d.car_number}</td>
              <td>
                <span className={`status-badge ${getStatusClass(d.claim_status)}`} id="claim_status">
                  {d.claim_status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewClaim;
