import React, { useEffect, useState } from "react";
import AnalyticBlackBoxComponent from "../../component/analyticBlackBoxComponent/AnalyticBlackBoxComponent";
import AnalyticYellowBoxComponent from "../../component/analyticYellowBoxComponent/AnalyticYellowBoxComponent";
import "./style.css";
import AnylisisChart from "../../constant/LineChart";
import instance from "../../component/axios/Axios";
import Input from "../../component/input/Input";
import { Analytics } from "../../Store/CartSlice";
import { useDispatch } from "react-redux";
import DropdownComponent from "../../component/dropdownComponent/DropdownComponent";
import moment from "moment";
import { DateOption } from "../../Store/CartSlice";
import { height } from "@mui/system";

const Analytic = () => {
  let date: any = moment().subtract(30, "days").format("YYYY-MM-DD");
  const m = moment.months();
  const [inputValue, setInputValue] = useState<Record<string, string | any>>(
    {}
  );
  const [analysisData, setAnalysisData] = useState<any>();
  const [option, setOption] = useState<any>();
  const dispatch = useDispatch<any>();

  dispatch(DateOption(option));
  let Payload = {
    dateOfOrder: inputValue.startData ?? date,
    deliveryDateAndTime: inputValue.EndData ?? moment().format("YYYY-MM-DD"),
  };

  useEffect(() => {
    newApi(Payload);
  }, [inputValue.EndData, inputValue.startData]);
  const newApi = async (Payload: any) => {
    await instance
      .post(`analysis/list`, Payload)
      .then((res: any) => {
        setAnalysisData(res?.data?.data);
        dispatch(Analytics(res?.data?.data));
      })
      .catch((error: any) => {});
  };

  const handleChange = (e: any) => {
    setInputValue((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    // setSearch(e.target.value);
  };

  return (
    <div className="analytic-container">
      <div className="analytic-left-section">
        <div className="analytic-box-container">
          <div className="analytic-center-div-order">
            <AnalyticBlackBoxComponent
              title={analysisData?.TotalOrder}
              label="TOTAL ORDERS"
            />
          </div>
          <div className="analytic-center-div-revenue">
            <AnalyticYellowBoxComponent
              title={
                analysisData?.TotalRevenue &&
                "\u20B9" + analysisData?.TotalRevenue
              }
              label="TOTAL REVENUE"
            />
          </div>
        </div>
        <div className="Chart-continer">
          <div className="chart-header">
            <label className="revenueProfitLabel">REVENUE AND PROFIT</label>
            <div className="dropdown">
              <DropdownComponent
                fieldName="analytic"
                customWidth="100%"
                menuItem={[
                  { id: 1, analytic: "Year" },
                  { id: 2, analytic: "Months" },
                  { id: 3, analytic: "Weeks" },
                ]}
                getValue={(e: any) => {
                  setOption(e);
                }}
              />
            </div>
          </div>
          <div className="AnyliticChart">
            <AnylisisChart />
          </div>
        </div>
      </div>
      <div className="analytic-right-section">
        <div className="analytic-right-data-range-div">
          <div className="analytic-right-top-view">
            <h5 className="analytic-date-range-title">Date Range</h5>
          </div>
          <Input
            type="date"
            label="Start Date"
            id="startData"
            labelClass="start-label"
            name="startData"
            value={inputValue.startData ?? date}
            onHandleChange={(e: React.FormEvent<HTMLInputElement>) => {
              handleChange(e);
            }}
          />

          <Input
            type="date"
            label="End Date"
            id="EndData"
            labelClass="start-label"
            name="EndData"
            value={inputValue.EndData ?? moment().format("YYYY-MM-DD")}
            onHandleChange={(e: React.FormEvent<HTMLInputElement>) => {
              handleChange(e);
            }}
          />
        </div>
        <div
          className="analytic-right-top-performing-div"
          style={{ position: "relative", height: "42%" }}
        >
          <div className="analytic-right-top-view">
            <h5 className="analytic-date-range-title">Top Performing Cakes</h5>
          </div>
          <div className="analytic-top-performing-div">
            <div className="analytic-top-performing-sub-section-name">
              <p style={{ fontWeight: "bold" }}>Product Name</p>
            </div>
            <div className="analytic-top-performing-sub-section-middle">
              <p style={{ fontWeight: "bold" }}>Unit Sold</p>
            </div>
            <div className="analytic-top-performing-sub-section">
              <p style={{ fontWeight: "bold" }}>Total Revenue</p>
            </div>
          </div>
          <div
            style={{
              maxHeight: "190px",
              overflowY: "auto",
              height: "auto",
              minHeight: "120px",
            }}
          >
            {analysisData?.sortable?.map((elm: any) => (
              <div className="analytic-top-performing-div">
                <div className="analytic-top-performing-sub-section-name">
                  <p>{elm?.name}</p>
                </div>
                <div className="analytic-top-performing-sub-section-middle">
                  <p>{elm?.count}</p>
                </div>
                <div className="analytic-top-performing-sub-section">
                  <p>{elm?.total}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytic;
