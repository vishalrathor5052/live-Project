import { useCallback, useEffect, useState } from "react";
import Feature from "./Feature";
import Sector from "./Sector";
import Establish from "./Establish";
import Enroll from "./Enroll";
import axios from "../../components/common/constants";
import { useDispatch } from "react-redux";
import { companydata } from "../ReduxSetup/CartSlice";

const LandingPage = () => {
  const [result, setResult] = useState([]);
  const dispatch = useDispatch();
  const getCompaniesDetail = useCallback(() => {
    axios.get(`/companies/getCompanies`).then((res: any) => {
      if (res.status === 200) {
        setResult(res?.data?.data?.companies);
        dispatch(companydata(res?.data?.data?.companies));
      }
    });
  }, []);

  const getAdminSettings = useCallback(() => {
    axios.get(`/admin/setting`).then((res: any) => {
      console.log("check res nitish", res);

      if (res.status === 200) {
        localStorage.setItem("displaySkip", res.data.data[0].displaySkip);
        localStorage.setItem("landingPrice", res.data.data[0].changeLandingPrice);
        localStorage.setItem("footerText", res.data.data[0].changeFooterText);
        localStorage.setItem("emandatebutton", res.data.data[0].disableAndRemoveEmandate);
      }
    });
  }, []);

  useEffect(() => {
    getCompaniesDetail();
    getAdminSettings();
  }, []);

  useEffect(() => {
    const theme: any =
      localStorage.getItem("theme") ?? JSON.stringify("light-theme");
    if (theme) {
      document.body.className = JSON.parse(theme);
    } else {
      document.body.className = theme;
    }
  }, []);

  return (
    <>
      <div className="landing-container">
        <div className="landing-wrapper">
          <Feature data={result} />
          <div className="card-container"></div>
          <Establish />
          <Sector data={result} />
          <Enroll />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
