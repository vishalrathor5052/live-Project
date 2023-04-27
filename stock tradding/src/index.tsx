import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./fonts/Helvetica/Helvetica.ttf";
import "./fonts/Helvetica/Helvetica-Bold.ttf";
import "./fonts/SegonUI/SegoeUIBold.ttf";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./screens/ReduxSetup/Store";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Provider store={Store}>
        <App />
      </Provider>
    </Suspense>
  </Router>
);
