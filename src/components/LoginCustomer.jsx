import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import './LoginCustomer.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from './back.png';


function LoginCustomer() {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    customer_email: '',
    customer_password: '',
  });
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8051/customer/all');
        setRegisteredUsers(response.data);
      } catch (error) {
        console.error('Error fetching registered users data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { customer_email, customer_password } = inputData;

    const user = registeredUsers.find(
      (user) => user.customer_email === customer_email && user.customer_password === customer_password
    );

    if (user) {
      sessionStorage.setItem('loggedInUser', JSON.stringify(user)); 
      alert('Logged In Successfully');
      navigate('/landingpage2');
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <MDBContainer  className="p-3 my-5 h-custom">
      <div>
      <header className="view-cars-banner bg-info">   
        <button className="go-back-button" onClick={handleGoBack}>
          <img src={Logo} alt="Logo" className="logo" />
        </button>
        <MDBIcon fas icon="user" className="banner-icon" />
        <h1 className="banner-title text-dark">Customer Registration Form</h1>
      </header>
      </div>
      
      <MDBRow>
        <MDBCol col='10' md='6'>
          <img src="https://thumbs.dreamstime.com/b/home-insurance-concept-house-sitting-brochure-white-background-66430826.jpg" className="img-fluid" alt="Sample" />
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
                label='Email address'
                id='formControlL'
                type='email'
                size="lg"
                name="customer_email"
                value={inputData.customer_email}
                onChange={(e) => setInputData({ ...inputData, customer_email: e.target.value })}
                prepend={<MDBIcon fas icon="envelope" />}
              />
              <MDBInput
                wrapperClass='mb-4 position-relative'
                label='Password'
                id='formControlLg'
                type='password'
                size="lg"
                name="customer_password"
                value={inputData.customer_password}
                onChange={(e) => setInputData({ ...inputData, customer_password: e.target.value })}
                prepend={<MDBIcon fas icon="lock" />}
              />

              <div className="d-flex justify-content-between mb-4">
                <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='Remember me' />
                <a href="#">Forgot password?</a>
              </div>

              <div className='text-center text-md-start mt-4 pt-2'>
                <MDBBtn className="mb-0 px-5" size='lg' type='submit'>Login</MDBBtn>
                <p className="small fw-bold mt-2 pt-1 mb-2">
                  Don't have an account? <Link to="/signupcustomer"><span className="link-danger">Register</span></Link>
                </p>
              </div>
            </form>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default LoginCustomer;
