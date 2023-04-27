import React, { useEffect, useState, Suspense } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { RouterList, AuthRouterList } from "./utils/Routes";
import { useNavigate } from "react-router-dom";
import { StoreCookie } from "./Auth/sessionStore";
import { useAppDispatch } from "./Store/Store";
import { getAdminProfile } from "./Store/CartSlice";
function App() {
  const isAuthenticated = localStorage.getItem("authToken");
  console.log("isAuthenticated",isAuthenticated)
  const isAuthenticate = StoreCookie.getItem("userToken");
  console.log("isAuthenticate",isAuthenticate)
  const navigator = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

useEffect(()=>{
  if(!isAuthenticated){
    localStorage.setItem("authToken", JSON.stringify(isAuthenticate));
  }
},[isAuthenticated])

  useEffect(() => {
    const protectedRoutes = [
      "/forgotpassword",
      "/resetpassword",
      "/otpverification",
    ];
    const pureRoutes = [
      "/orders",
      "/products",
      "/categorymenu",
      "/offers",
      "/addons",
      "/user",
      "/config",
      "/analytic",
      "/createcategorymodal",
      "/changepassword",
      "/profilesetting",
    ];

    const redirectPath = isAuthenticate ? location.pathname : "/";

    if (!isAuthenticate && protectedRoutes.includes(location.pathname)) {
      navigator(location);
    } else if (isAuthenticate && !pureRoutes.includes(location.pathname)) {
      navigator(-1);
    } else {
      navigator(redirectPath);
    }
  }, [isAuthenticate, location.pathname]);

  useEffect(() => {
    isAuthenticate && dispatch(getAdminProfile());
  }, [isAuthenticate]);

  return (
    <>
      <div className="app-main App">
        {/* <Router> */}
        <Routes>
          {isAuthenticate
            ? AuthRouterList.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))
            : RouterList.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
        </Routes>
        {/* </Router> */}
      </div>
    </>
  );
}

export default App;
