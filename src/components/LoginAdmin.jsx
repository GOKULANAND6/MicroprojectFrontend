import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import './LoginCustomer.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginCustomer() {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    admin_name: '',
    admin_password: '',
  });
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8051/admin/all');
        setRegisteredUsers(response.data);
      } catch (error) {
        console.error('Error fetching registered users data:', error);
        alert('Failed to fetch users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { admin_name, admin_password } = inputData;

    const user = registeredUsers.find(
      (user) => user.admin_name === admin_name && user.admin_password === admin_password
    );

    if (user) {
      alert('You Logged In Successfully');
      navigate('/landingpage3');
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">
      {/* Title Banner */}
      <div className="login-banner">
        <MDBIcon fas icon="user-shield" className="banner-icon" />
        <p className="banner-title">Admin Login</p>
      </div>
      
      <MDBRow>
        <MDBCol col='10' md='6'>
          <img 
            src="https://thumbs.dreamstime.com/b/home-insurance-concept-house-sitting-brochure-white-background-66430826.jpg" 
            className="img-fluid" 
            alt="Home Insurance Concept" 
          />
        </MDBCol>

        <MDBCol col='4' md='6'>
          <div className="login-form-wrapper p-4 bg-light shadow rounded">
            <div className="d-flex flex-row align-items-center justify-content-center mb-4">
              <p className="lead fw-normal mb-0 me-3">Sign in with</p>
              <MDBBtn floating size='md' tag='a' className='me-2'>
                <MDBIcon fab icon='facebook-f' />
              </MDBBtn>
              <MDBBtn floating size='md' tag='a' className='me-2'>
                <MDBIcon fab icon='twitter' />
              </MDBBtn>
              <MDBBtn floating size='md' tag='a' className='me-2'>
                <MDBIcon fab icon='linkedin-in' />
              </MDBBtn>
            </div>

            <div className="divider d-flex align-items-center my-4">
              <p className="text-center fw-bold mx-3 mb-0">Or</p>
            </div>

            <form onSubmit={handleSubmit}>
              <MDBInput
                wrapperClass='mb-4 position-relative'
                label='Admin Name'
                id='formControlL'
                type='text'
                size="lg"
                name="admin_name"
                value={inputData.admin_name}
                onChange={(e) => setInputData({ ...inputData, admin_name: e.target.value })}
                prepend={<MDBIcon fas icon="user" />}
              />
              <MDBInput
                wrapperClass='mb-4 position-relative'
                label='Password'
                id='formControlLg'
                type='password'
                size="lg"
                name="admin_password"
                value={inputData.admin_password}
                onChange={(e) => setInputData({ ...inputData, admin_password: e.target.value })}
                prepend={<MDBIcon fas icon="lock" />}
              />

              <div className="d-flex justify-content-between mb-4">
                <MDBCheckbox name='remember_me' id='flexCheckDefault' label='Remember me' />
                <a href="#">Forgot password?</a>
              </div>

              <div className='text-center text-md-start mt-4 pt-2'>
                <MDBBtn className="mb-0 px-5" size='lg' type='submit'>Login</MDBBtn>
              </div>
            </form>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default LoginCustomer;
