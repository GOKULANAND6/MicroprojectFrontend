import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage2 from './LandingPage2'
import LandingPage3 from './LandingPage3'
import LoginCustomer from './LoginCustomer'
import LoginAdmin from './LoginAdmin'
import SignupCustomer from './SignupCustomer'
import BuyCarInsurance from './BuyCarInsurance'
import ViewCustomer from './ViewCustomer'
import ViewPolicy from './ViewPolicy'
import FileClaim from './FileClaim'
import ViewClaim from './ViewClaim'
import ViewClaim1 from './ViewClaim1'
import ViewClaim2 from './ViewClaim2'
import ViewClaim3 from './ViewClaim3'
import ViewClaim4 from './ViewClaim4'
import ProcessClaim from './ProcessClaim'
import ViewProfile from './ViewProfile'
import SettleAmount from './SettleAmount'
import ViewSettlement from './ViewSettlement'
import LandingPage from './LandingPage'

function AppRouter() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/landingpage2" element={<LandingPage2 />} />
            <Route path="/landingpage3" element={<LandingPage3 />} />
            <Route path="/logincustomer" element={<LoginCustomer />} />
            <Route path="/loginadmin" element={<LoginAdmin />} />
            <Route path="/viewprofile/:id" element={<ViewProfile />} />
            <Route path="/signupcustomer" element={<SignupCustomer />} />
            <Route path="/buycarinsurance" element={<BuyCarInsurance />} />
            <Route path="/fileclaim" element={<FileClaim />} />
            <Route path="/viewcustomerdetails" element={<ViewCustomer />} />
            <Route path="/viewpolicy" element={<ViewPolicy />} />
            <Route path="/viewclaim" element={<ViewClaim />} />
            <Route path="/viewClaim1/:id" element={<ViewClaim1 />} />
            <Route path="/viewclaim2" element={<ViewClaim2 />} />
            <Route path="/viewclaim3" element={<ViewClaim3 />} />
            <Route path="/viewclaim4" element={<ViewClaim4 />} />
            <Route path="/processclaim" element={<ProcessClaim />} />
            <Route path="/settlement/:id" element={<SettleAmount />} />
            <Route path="/viewsettlement" element={<ViewSettlement />} />
        </Routes>
    </Router>
  )
}

export default AppRouter
