import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './ViewClaim1.css';
import Logo from './back.png';


function ViewClaim1() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8051/claim/${id}`)
      .then((response) => setData(response.data))
      .catch((err) => console.log("Error fetching data:", err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting data:", data);

    axios.put("http://localhost:8051/claim", data) 
      .then((res) => {
        console.log("Update response:", res); 
        alert("Status Updated Successfully");
        navigate("/landingpage3");
      })
      .catch((err) => {
        console.error("Error updating claim:", err); 
        alert("Failed to update status. Please try again.");
      });
  };

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <div className="view-claim-container-fluid">
      <header className="view-cars-banner bg-info">
        <button className="go-back-button" onClick={handleGoBack}>
          <img src={Logo} alt="Logo" className="logo" />
        </button>
        <h1 className="banner-title text-dark">Applied for Insurance Claim</h1>
      </header>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="claim_id">Claim Id:</label>
            <input
              type="text"
              disabled
              name="claim_id"
              className="form-control"
              value={data.claim_id || ''}
            />
          </div>

          <div className="form-group">
            <label htmlFor="claim_issue">Car Owner:</label>
            <input
              type="text"
              name="claim_issue"
              className="form-control"
              disabled
              value={data?.carinsurance?.customer?.customer_name || ''}
              onChange={(e) => setData({ ...data, claim_issue: e.target.value })}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="car_number">Car Number:</label>
            <input
              type="text"
              name="car_number"
              className="form-control"
              disabled
              value={data.car_number || ''}
              onChange={(e) => setData({ ...data, car_number: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="claim_status">Claim Status:</label>
            <select
              name="claim_status"
              id="claim_status"
              className="form-control"
              value={data.claim_status || ''}
              onChange={(e) => setData({ ...data, claim_status: e.target.value })}
            >
              <option value="" disabled>Select Status</option>
              <option value="Verifying">Verifying</option>
              <option value="Validating">Validating</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <br />

          <button type="submit" className="btn btn-info">Update</button>
        </form>
      </div>
    </div>
  );
}

export default ViewClaim1;
