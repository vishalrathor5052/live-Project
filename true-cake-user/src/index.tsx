import React from "react";
import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./screens/reduxSetup/Store";
import persistStore from "redux-persist/lib/persistStore";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import Loader from "./components/loader/Loader";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <Router>
      <Suspense
        fallback={
          <div
            style={{
              width: "100vw",
              height: "100vh",
            }}
          >
            <Loader />
          </div>
        }
      >
        <Provider store={store}>
          <PersistGate persistor={persistStore(store)}>
            <App />
          </PersistGate>
        </Provider>
      </Suspense>
    </Router>
  </>
);
