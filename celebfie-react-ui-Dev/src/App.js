import { useEffect, useState } from "react";
import { Routes, Route, Navigate} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import AuthService from "./services/auth.service";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import NoMatch from "./pages/404";
import KycVerification from "./pages/KycVerification";
import KycThankyou from "./pages/KycThankyou";
import Kycform from "./pages/Kycform";

import { UserContext } from "./utility/context";
import ResetPassword from "./pages/ResetPassword";
import AdminTransactions from "./pages/AdminTransactions";
import Transactions from "./pages/Transactions";
import Users from "./pages/Users";
import UserDetails from "./pages/UserDetails";


function App() {
  
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentUserData, setCurrentUserData] = useState(undefined);
  /*const [currentUserRole, setCurrentUserRole] = useState(undefined);*/


  useEffect(() => {
    const user = AuthService.getCurrentUser();
    
    if (user) {
      setCurrentUser(user);
      const userData = AuthService.getCurrentUserData();
      setCurrentUserData(userData);

      
    }
   
  }, []);
  


  return (
    <>
    <UserContext.Provider value={{currentUserData,setCurrentUserData}}>
      <Routes>

          <Route exact path="/" element={ currentUser ? <Profile/> :<Login />} />
          <Route exact path="/login" element={currentUser ? <Navigate replace to="/profile" /> : <Login />} />
         

          <Route exact path="/register" element={currentUser ? <Navigate replace to="/profile" /> : <Register />} />
          <Route exact path="/forgotpassword" element={currentUser ? <Navigate replace to="/profile" /> : <ForgotPassword />} />
          <Route exact path="/resetpassword" element={currentUser ? <Navigate replace to="/profile" /> : <ResetPassword />} />

          <Route exact path="/profile" element={ currentUser ? <Profile/> :<Login />} />
          <Route exact path="/kycverification" element={ currentUser ? <KycVerification/> :<Login />} />
          <Route exact path="/kycthankyou" element={ currentUser ? <KycThankyou/> :<Login />} />
          <Route exact path="/kycform" element={ currentUser ? <Kycform/> :<Login />} />
          
          <Route exact path="/dashboard" element={currentUser ? <Dashboard/> :<Login />} />
          <Route exact path="/admintransactions" element={currentUser ? <AdminTransactions/> :<Login />} />
          {/* <Route exact path="/users" element={AuthService.ifCurrentUserAdmin() ? <Users/> :<Navigate replace to="/profile" /> } /> : '';


          <Route exact path="/userdetails" element={AuthService.ifCurrentUserAdmin() ? <UserDetails/> :<Navigate replace to="/profile" /> } /> : ''; */}

          <Route exact path="/users" element={ currentUser ? <Users/> :<Login />} />
          <Route exact path="/userdetails" element={ currentUser ? <UserDetails/> :<Login />} />

          

          <Route exact path="/transactions" element={currentUser ? <Transactions /> :<Login />} />
        
          <Route exact path="*" element={<NoMatch />} />

      </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
