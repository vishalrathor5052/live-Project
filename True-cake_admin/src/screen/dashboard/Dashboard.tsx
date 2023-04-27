import React, { memo, useLayoutEffect, useState, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Header from "../../component/header/Header";
import Loader from "../../component/loader/Loader";
import Sidebar from "../../component/sideBar/Sidebar";
function Dashboard() {
  return (
    <>
      <div className="app-main App">
        <div className="left-section">
          <Sidebar />
        </div>
        <div className="right-section">
          <Header />
          <div className="data-container">
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
            {/* <Router>
            <Routes>
              {RouterList.map((elm: any, i: any) => {
                return (
                  <Route
                    key={`user-route-${i}`}
                    path={elm.path}
                    element={elm.component}
                  />
                );
              })}
            </Routes>
            </Router> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(Dashboard);
