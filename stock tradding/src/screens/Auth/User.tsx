import React from "react";
import { Routes, Route } from "react-router-dom";
// import { RouteListOff } from "../../utility/Routes";

const User = () => {
  return (
    <div>
      {/* <Routes>
        {RouteListOff.map(
          (elm: any, i: any) =>
            elm.role && (
              <Route
                key={`user-route-${i}`}
                path={elm.path}
                element={elm.component}
              />
            )
        )}
      </Routes> */}
    </div>
  );
};

export default User;
