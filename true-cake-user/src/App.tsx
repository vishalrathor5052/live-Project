import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Route, Routes } from "react-router-dom";
import { RouteList } from "./utils/Routes";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./screens/reduxSetup/Store";
import persistStore from "redux-persist/lib/persistStore";
import { PersistGate } from "redux-persist/integration/react";
import setUpInterceptor from "./components/axios/Interceptor";
import axios from "axios";
import { PATH } from "./constant/Constant";
import { addCategoryList } from "./screens/reduxSetup/ApiResponseSlice";

function App() {
  // const {
  //   apiResponse: { categoryList },
  //   userDetails: { selectedMobileCat },
  // } = useSelector((state: any) => state);
  let persistor = persistStore(store);
  const dispatch = useDispatch();
  const [isAuthToken, setIsAuthToken] = useState(false);
  const { userDetail } = useSelector((state: any) => state.userDetails);
  useEffect(() => {
    if (userDetail?.tokenId?.data && !isAuthToken) {
      setUpInterceptor(userDetail.tokenId?.data);
      setIsAuthToken(true);
    }
    getMenu();
  }, []);

  const getMenu = useCallback(async () => {
    await axios
      .get(`${PATH}category/list`, {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: userDetail.tokenId?.data
            ? "Bearer " + userDetail.tokenId?.data
            : "",
        },
      })
      .then((res: any) => {
        console.log("cat menu response", res?.data?.data);
        dispatch(addCategoryList(res?.data?.data?.data ?? res?.data?.data));
        // setProductId(res?.data?.data[0].id);
        // let productCake = res?.data?.data?.data
        // setProductItems(res?.data?.data?.data)
        // !productId && getProduct(res?.data?.data[0].id);
      })
      .catch((err) => {});
  }, []);

  return (
    <>
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
    </>
  );
}
export default App;
