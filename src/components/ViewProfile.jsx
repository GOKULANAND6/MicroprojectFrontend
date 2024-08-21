import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { FaIdCard, FaUser, FaEnvelope, FaPhone, FaHome, FaMapPin, FaCalendar, FaBirthdayCake, FaGenderless } from "react-icons/fa";
import Logo from './back.png';
import './ViewProfile.css';

function ViewProfile() {
  const { id } = useParams();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8051/customer/all");
        const profiles = response.data;
        const profile = profiles.find(prod => prod.customer_id === parseInt(id));
        if (profile) {
          setRecord(profile);
        } else {
          setError("Customer not found");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Error fetching profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);
  
  const handleGoBack = () => {
    navigate(-1); 
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center">{error}</div>;

  return (
    <div className="profile-container">
      <header className="view-cars-banner bg-info">
        <button className="go-back-button" onClick={handleGoBack}>
          <img src={Logo} alt="Logo" className="logo" />
        </button>
        <h1 className="banner-title text-dark">Your Info's</h1>
      </header>
      
      {record ? (
        <div className="profile-card">
          <div className="profile-card-header">
            <h2 className="profile-card-title">Profile Details</h2>
          </div>
          <div className="profile-card-body">
            <table className="profile-table">
              <tbody>
                <tr>
                  <td className="profile-icon"><FaIdCard /></td>
                  <td className="profile-detail">
                    <div className="profile-label">Customer Id:</div>
                    <div className="profile-value">{record.customer_id}</div>
                  </td>
                </tr>
                <tr>
                  <td className="profile-icon"><FaUser /></td>
                  <td className="profile-detail">
                    <div className="profile-label">Customer Name:</div>
                    <div className="profile-value">{record.customer_name}</div>
                  </td>
                </tr>
                <tr>
                  <td className="profile-icon"><FaEnvelope /></td>
                  <td className="profile-detail">
                    <div className="profile-label">Customer Email:</div>
                    <div className="profile-value">{record.customer_email}</div>
                  </td>
                </tr>
                <tr>
                  <td className="profile-icon"><FaPhone /></td>
                  <td className="profile-detail">
                    <div className="profile-label">Customer Mobile:</div>
                    <div className="profile-value">{record.customer_mobile}</div>
                  </td>
                </tr>
                <tr>
                  <td className="profile-icon"><FaHome /></td>
                  <td className="profile-detail">
                    <div className="profile-label">Customer Address:</div>
                    <div className="profile-value">{record.customer_address}</div>
                  </td>
                </tr>
                <tr>
                  <td className="profile-icon"><FaMapPin /></td>
                  <td className="profile-detail">
                    <div className="profile-label">Customer Pincode:</div>
                    <div className="profile-value">{record.customer_pincode}</div>
                  </td>
                </tr>
                <tr>
                  <td className="profile-icon"><FaBirthdayCake /></td>
                  <td className="profile-detail">
                    <div className="profile-label">Customer DOB:</div>
                    <div className="profile-value">{record.customer_dob}</div>
                  </td>
                </tr>
                <tr>
                  <td className="profile-icon"><FaCalendar /></td>
                  <td className="profile-detail">
                    <div className="profile-label">Customer Age:</div>
                    <div className="profile-value">{record.customer_age}</div>
                  </td>
                </tr>
                <tr>
                  <td className="profile-icon"><FaGenderless /></td>
                  <td className="profile-detail">
                    <div className="profile-label">Gender:</div>
                    <div className="profile-value">{record.customer_gender}</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center">No profile data available</div>
      )}
    </div>
  );
}

export default ViewProfile;
