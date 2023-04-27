import { Routes, Route } from "react-router-dom";
import { RouteList } from "../../utility/Routes";

const Master = () => {
  return (
    <div>
      <Routes>
        {RouteList.map(
          (elm: any, i: any) =>
            elm.role && (
              <Route
                key={`user-route-${i}`}
                path={elm.path}
                element={elm.component}
              />
            )
        )}
      </Routes>
    </div>
  );
};

export default Master;
