import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './BuyCarInsurance.css';

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
    console.log("Submitting data:", data); // Debug: Check the data being submitted

    axios.put("http://localhost:8051/claim", data) // Ensure correct endpoint and method
      .then((res) => {
        console.log("Update response:", res); // Debug: Check the response
        alert("Status Updated Successfully");
        navigate("/landingpage3");
      })
      .catch((err) => {
        console.error("Error updating claim:", err); // Debug: Log any errors
        alert("Failed to update status. Please try again.");
      });
  };

  return (
    <div id="all">
      <div
        id="edit2"
        className="d-flex w-100 vh-100 justify-content-center align-items-center"
      >
        <div className="w-50 border bg-light p-5">
          <form onSubmit={handleSubmit}>
            <h1>Update Claim Details</h1>
            <div>
              <label htmlFor="claim_id">Claim Id:</label>
              <input
                type="text"
                disabled
                name="claim_id"
                className="form-control"
                value={data.claim_id || ''}
              />
            </div>

            <div>
              <label htmlFor="claim_issue">Claim Issue:</label>
              <input
                type="text"
                name="claim_issue"
                className="form-control"
                value={data.claim_issue || ''}
                onChange={(e) => setData({ ...data, claim_issue: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="car_number">Car Number:</label>
              <input
                type="text"
                name="car_number"
                className="form-control"
                value={data.car_number || ''}
                onChange={(e) => setData({ ...data, car_number: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="claim_status">Claim Status:</label>
              <select
                name="claim_status"
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
    </div>
  );
}

export default ViewClaim1;
