import { useState, useEffect, useCallback } from "react";
import * as IMG from "../components/common/Images";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../components/common/constants";
import { balance, balancedata } from "../utility/Table";
import DonutChart from "./Dashboard/Charts/DonutChart";
import OverviewChart from "./Reports/CompaniesDetails/OverviewChart";
import { useDispatch, useSelector } from "react-redux";
import { companydata } from "./ReduxSetup/CartSlice";
import Overlay from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Loader from "../components/common/Loader";

const Dashboard: any = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Params: any = useParams();


  const name: any = localStorage.getItem("UserName");
  const auth: any = localStorage.getItem("authToken");
  const [result, setResult] = useState([]);
  const [bidResult, setBidResult] = useState<any>([]);
  const [showHoldingTable, setShowHoldingTable] = useState(false);
  const [showBalanceTable, setShowBalanceTable] = useState(false);
  const [showCompanyInfo, setShowCompanyInfo] = useState(false);
  const [companyObjID, setCompanyObjId] = useState<any>();
  const user_Role: any = localStorage.getItem("role");
  const [holdings, setHoldings] = useState<any>([]);
  const [loader, setLoader] = useState(true);
  

  
  const userId=localStorage.getItem("userId");
  

  const onCLickHoldingStatement = () => {
    const DatasHold = {
      holdings,
    };

    if (showHoldingTable === false) {
      setShowHoldingTable(true);
      setShowBalanceTable(false);
    } else {
      setShowHoldingTable(false);
    }
    axios
      .get("/companies/holdingStatement")
      .then((res: any) => {
        console.log("holding statement",res);
        if (res?.status == 200) {
          console.log("holding statement true",res?.data?.data?.rows);
          setHoldings(res?.data?.data?.rows);
        }
      })
      .catch((err: any) => {
        return err.response;
      });
  };
  const onClickBalance = () => {
    if (showBalanceTable === false) {
      setShowBalanceTable(true);
      setShowHoldingTable(false);
    } else {
      setShowBalanceTable(false);
    }
  };
  const onClickGraphIcon = () => {
    if (showCompanyInfo === false) {
      setShowCompanyInfo(true);
    } else {
      setShowCompanyInfo(false);
    }
  };
  const getCompaniesDetail = useCallback(() => {
    axios.get(`/companies/getCompanies?userId=${userId}`).then((res: any) => {
      console.log("Response",res);
      if (res.status === 200) {
        setLoader(false);
        setResult(res?.data?.data?.companies);
        dispatch(companydata(res?.data?.data?.companies));
      }
    });
  }, []);

  useEffect(() => {
    getCompaniesDetail();
  }, []);

  // .................Api call in Details ......................................//
  const handleBuy = (obj: any) => {
    navigate(`/companiesdetails/${obj.id}`);
  };

  const OrderPlaced = () => {
    navigate("/orderbook");
  };
  const onCLickDetailSummary = () => {
    navigate("/investment");
  };
  const partnerAccountTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      You have to open Partner Broker account for sale.
    </Tooltip>
  );
  const HandleDisable = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      You Need To Signup Or Login For Access.
    </Tooltip>
  );
  // ...............................Company Bid List Api Buy Sell.......................
  const getBidList = useCallback((obj: any) => {
    axios
      .get(`/companies/getCompaniesBidsDashboard?companyId=${obj}`)
      .then((res: any) => {
        if (res.status === 200) {
          setBidResult(res?.data?.data);
          console.log("reultdata", res?.data?.data);
        }
      });
  }, []);
  // const getBidList = ()=>{
  const BidData = [bidResult];
  console.log("biddata", BidData);

  useEffect(() => {
    if (companyObjID) {
      console.log("compayId", companyObjID);
      getBidList(companyObjID);
    } else {
      console.log("id not pass");
    }
  }, [companyObjID]);

  // const onclickGraph = (obj:any) => {
  //   if (companyObjID) {
  //     setBidResult(companyObjID);
  //        console.log("compayId", companyObjID);
  //      } else {
  //          console.log("id not pass");
  //        }
  //   axios
  //   .get(`/companies/getCompaniesBidsDashboard?companyId=${obj}`)
  //   .then((res: any) => {
  //     if (res.status === 200) {
  //       setBidResult(res?.data?.data);
  //       console.log("reultdata", res?.data?.data);
  //     }
  //   });
  // };

  //Order Book Dataaaaaa.................................

  return (
    <div>
      {loader ? (
        <Loader />
      ) : (
        <div className="dashboard-container">
          <h3 className="dashboard-title">
            {JSON.parse(name) ?? "For More Access Please Login"}
          </h3>
          {/* yaha se disable */}
          {auth && (
            <div
              className="dashboard-wrapper-main"
              style={{ position: "relative" }}
            >
              {showHoldingTable && (
                <div
                  className="show-holding-statement"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  <div className="upper-section-row">
                    <div style={{ width: "20%" }}>
                      <div
                        className="click-statement-balance-row"
                        onClick={() => auth && onCLickHoldingStatement()}
                      >
                        <h1 className="statement-balance-text mobile-statement-balance-text">
                          Holding Statement
                        </h1>
                        <img
                          src={IMG.arrowRight}
                          className="arrow-dropdown-icon mobile-arrow-dropdown-icon"
                          alt=""
                        />
                      </div>
                      <div>
                        {auth ? (
                          <p
                            className="details-summary-text"
                            onClick={onCLickDetailSummary}
                          >
                            {" "}
                            Details Summary
                          </p>
                        ) : (
                          <Overlay
                            placement="right"
                            delay={{ show: 100, hide: 300 }}
                            overlay={HandleDisable}
                          >
                            <p
                              className="details-summary-text"
                              onClick={onCLickDetailSummary}
                            >
                              Details Summary
                            </p>
                          </Overlay>
                        )}
                        <div
                          style={{
                            margin: "20px auto 0 auto", maxHeight: 150, maxWidth: 150
                          }}
                        >
                          <DonutChart cutout={60}/>
                        </div>
                        <div style={{ marginTop: 5 }}>
                          <p className="invested-text-on-dropdown">
                            Investment amount:{" "}
                            <span className="invested-value-text-on-dropdown">
                              0
                            </span>
                          </p>
                          <p className="invested-text-on-dropdown">
                            Current value of investment:
                            <span className="invested-value-text-on-dropdown">
                              0
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        border: "0.5px solid #7522de",
                        display: "flex",
                        // width: "100%",
                        marginTop: "20px",
                        height: "50%",
                      }}
                    ></div>
                    {/* -----------------------------Holdings Statement Table----------------------------------- */}
                    <table className="my-table" style={{ width: "78%" }}>
                      <tbody>
                        <tr className="table-row">
                          <th></th>
                          <th>Company Name</th>
                          <th>Investment Amt</th>
                          <th>Price</th>
                          <th>Avg.Price</th>
                        </tr>
                        {holdings.map((row: any) => (
                          <>
                         { console.log("row data",row)}
                        
                          <tr className="table-row">
                            <td>
                              <img
                                src={`http://34.203.56.127:3000/stockTradingUploads/Image1669275918056favicon.png`}
                                alt=""
                                className="-logo"
                                style={{ width: "40px", height: "33px" }}
                              />
                            </td>
                            <td>{row?.companyNames?.[0]?.companyName}</td>
                            <td>{row?.amountDetails?.netAmount}</td>
                            <td>{row?.companyNames?.[0]?.price}</td>
                            <td>{row.averagePrice}</td>
                          </tr>
                          </>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              <div
                className="dashboard-holding-statement-box"
                style={{ zIndex: 0 }}
              >
                <div className="dashboard-balance-title">
                  <div>
                    <div>
                      <div
                        className="click-statement-balance-row"
                        onClick={() => auth && onCLickHoldingStatement()}
                      >
                        {auth ? (
                          <h1 className="statement-balance-text">
                            Holding Statement
                          </h1>
                        ) : (
                          <Overlay
                            placement="right"
                            delay={{ show: 100, hide: 300 }}
                            overlay={HandleDisable}
                          >
                            <h1 className="statement-balance-text">
                              Holding Statement
                            </h1>
                          </Overlay>
                        )}

                        <img
                          src={IMG.arrowRight}
                          className="arrow-dropdown-icon"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => auth && onCLickDetailSummary()}
                      className="investment-link"
                      style={{
                        textDecoration: "none",
                        borderStyle: "none",
                        background: "none",
                      }}
                    >
                      {auth ? (
                        <p className="details-summary-text"> Details Summary</p>
                      ) : (
                        <Overlay
                          placement="left"
                          delay={{ show: 100, hide: 300 }}
                          overlay={HandleDisable}
                        >
                          <p className="detail-summary">Detail Summary</p>
                        </Overlay>
                      )}
                    </button>
                  </div>
                </div>

                <div className="dashboard-balance-data">
                  <div style={{maxHeight: 200, maxWidth: 200}}>
                    <DonutChart cutout={80}/>
                  </div>
                  <div className="bashboard-balance-border"></div>
                  <div className="holding-statement-content">
                    <p>Investment amount: 0 </p>
                    <p>Current value of investment: 0</p>
                  </div>
                </div>
              </div>
              {/* ----------------------------------------balance ------------------------*/}

              <div
                className="dashboard-balance-box"
                style={{ position: "relative" }}
              >
                {showBalanceTable && (
                  <div className="show-balance">
                    <div
                      className="click-statement-balance-row"
                      onClick={() => auth && onClickBalance()}
                    >
                      <h1 className="statement-balance-text">Balance</h1>
                      <img
                        src={IMG.arrowRight}
                        className="arrow-dropdown-icon"
                        alt=""
                      />
                    </div>

                    <div className="dashboard-balance-data">
                      <div>
                        <p className="dashboard-balance-number">5000</p>
                        <p className="dashboard-available-balance">
                          Available balance
                        </p>
                      </div>
                      <div
                        className="bashboard-balance-border"
                        style={{ height: "90px" }}
                      ></div>
                      <div className="mt-2">
                        <p className="dashboard-balance-number">31000</p>
                        <p className="dashboard-available-balance">
                          Funds Blocked
                        </p>
                      </div>
                    </div>

                    <div className="balance-dropdown-table">
                      <div className="balance-heading">
                        Comapany Name
                        <p className="balance-row">Chennai Super Kings</p>
                        <p className="balance-border-bottom"></p>
                      </div>

                      <div
                        className="bashboard-balance-border"
                        style={{
                          height: "90px",
                          marginTop: "10px",
                        }}
                      ></div>
                      <div className="balance-heading">
                        Funds Block
                        <p className="balance-row">11000</p>
                        <p className="balance-border-bottom"></p>
                      </div>
                    </div>

                    {/* <table className="balance-dropdown-table">
                      <tbody>
                        <tr className="table-row">
                          {balance.map((head) => (
                            <th>{head.header}</th>
                          ))}
                        </tr>
                        {balancedata.map((datas: any) => (
                          <tr className="table-row">
                            <td>{datas.companyName}</td>
                            <td>{datas.FundsBlock}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table> */}
                  </div>
                )}
                <div>
                  <div
                    className="click-statement-balance-row"
                    onClick={() => auth && onClickBalance()}
                  >
                    {auth ? (
                      <h1 className="statement-balance-text">Balance</h1>
                    ) : (
                      <Overlay
                        placement="right"
                        delay={{ show: 100, hide: 300 }}
                        overlay={HandleDisable}
                      >
                        <h1 className="statement-balance-text">Balance</h1>
                      </Overlay>
                    )}
                    <img
                      src={IMG.arrowRight}
                      className="arrow-dropdown-icon"
                      alt=""
                    />
                  </div>
                </div>
                <div className="dashboard-balance-data">
                  <div>
                    <p className="dashboard-balance-number">5000</p>
                    <p className="dashboard-available-balance">
                      Available balance
                    </p>
                  </div>
                  <div className="bashboard-balance-border"></div>
                  <div className="mt-2">
                    <p className="dashboard-balance-number">31000</p>
                    
                    <p className="dashboard-available-balance">Funds Blocked</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/*---------------------------  Api Call------------------------------------------ */}
          {result?.map((obj: any, index: any) => {
            return (
              <div>
                <div className="bottom-div-super-king" key={obj.id}>
                  <div className="dashboard-super-logo">
                    <img
                      src={`http://34.203.56.127:3000/stockTradingUploads/${obj?.iconUrl}`}
                      alt=""
                      className="company-logo"
                    />
                  </div>
                  <div className="chenni-super-king-title">
                    <p
                      style={{ cursor: "pointer",textTransform:"uppercase" }}
                      onClick={() => handleBuy(obj)}
                    >
                      {obj.companyName}
                    </p>
                  </div>
                  <div className="dashboard-price mobile-dashboard-price">
                    <p>Rs. {Number(obj?.price).toFixed(2)} </p>
                    <p className="mobile-dashboard-table">
                      {obj?.ltpPercent > 0 ?
                    <>
                      <img src={IMG.upwardIcon} alt="" />
                      <span >{obj?.ltpPercent}</span>
                      </>
                      :
                          <>
                      <img src={IMG.downwardIcon} alt="" />
                      <span >{obj?.ltpPercent}</span>
                      </>
                      }

                    </p>
                  </div>
                  <div style={{width:"60%", display:"flex", justifyContent:"flex-end"}}>
                    <div style={{width:"50%", display:"flex", justifyContent:"space-between"}}>
                  <div className="dashboard-third-box">
                    <span
                      onClick={() =>
                        auth &&
                        navigate(`/buy/${obj.id}`, {
                          state: { result: [obj] },
                        })
                      }
                    >
                      {auth ? (
                        <p>B</p>
                      ) : (
                        <Overlay
                          placement="right"
                          delay={{ show: 100, hide: 300 }}
                          overlay={HandleDisable}
                        >
                          <p>B</p>
                        </Overlay>
                      )}
                    </span>
                    {/* </button> */}
                  </div>
                  <div className="dashboard-fourth-box">
                    <span
                      onClick={() =>
                        user_Role !== "3" &&
                        user_Role !== null &&
                        navigate(`/sell/${obj.id}`, {
                          state: { result: [obj] },
                        })
                      }
                    >
                      {user_Role === "3" || auth === null ? (
                        <Overlay
                          placement="right"
                          delay={{ show: 100, hide: 300 }}
                          overlay={partnerAccountTooltip}
                        >
                          <p>S</p>
                        </Overlay>
                      ) : (
                        <p>S</p>
                      )}
                    </span>
                  </div>

                  <div
                    className="dashboard-fifth-box"
                    onClick={() =>
                      auth === null
                        ? console.log(
                            "If You Want Full Access Need To Signup Or Login."
                          )
                        : companyObjID == obj?.id
                        ? setCompanyObjId("0")
                        : setCompanyObjId(obj?.id)
                    }
                  >
                    {auth ? (
                      <img src={IMG.graph} alt="" />
                    ) : (
                      <Overlay
                        placement="right"
                        delay={{ show: 100, hide: 300 }}
                        overlay={HandleDisable}
                      >
                        <img src={IMG.graph} alt="" />
                      </Overlay>
                    )}
                  </div>
                  </div>
                  {obj?.userLastOrderDetails?.price? 
                  <div style={{width:"50%"}} className="dashboard-sixth-box">
                    {/* Todo uncomment this  */}
                    {/* {newOrder?.orderStatus !== 1 ? null : ( */}
                    <button
                      onClick={() => auth && OrderPlaced()}
                      className="otp-link mobile-view-otp-link"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      
                      {auth ? (
                        <a href="">Order placed: Buy at {obj?.userLastOrderDetails?.price}</a>
                      ) : (
                        <Overlay
                          placement="left"
                          delay={{ show: 100, hide: 300 }}
                          overlay={HandleDisable}
                        >
                          <a href="">Order placed: Buy at {obj?.userLastOrderDetails?.price}</a>
                        </Overlay>
                      )}
                    </button>
                  </div>
                  : null
                }
                  </div>
                  {obj?.ltpPercent > 0 ?
                  <div className="up-down-border" style={{backgroundColor: '#7522de'}}></div>:
                  <div className="up-down-border" style={{backgroundColor: '#FC9E22'}}></div> 
                   }
                  {/*  .......... backgroundColor should be #7522de for UP and #FC9E22 for DOWN.............. */}
                </div>
                {companyObjID === obj?.id && (
                  <div
                    style={{
                      backgroundColor: "#ffffff",
                      width: "100%",
                      height: 220,
                      marginTop: 10,
                      display: "flex",
                      justifyContent: "space-between",
                      borderRadius: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "40%",
                        height: "100%",
                        padding: "25px",
                        borderRight: "1px solid #7522de",
                      }}
                    >
                      <p style={{ textAlign: "left" }}>Company Chart</p>
                      <div>
                        <OverviewChart />
                      </div>
                    </div>
                    {BidData.map((obj?: any) => {
                      // console.log("bids", obj?.buy?.[0].bid);
                      // {obj?.buy?.map((elm:any)=>{

                      //   console.log("buy",elm?.bid)
                      // }
                      return (
                        <>
                          <div
                            style={{
                              width: "30%",
                              height: "100%",
                              display: "flex",
                              padding: "25px 0",
                              borderRight: "1px solid #7522de",
                            }}
                          >
                            <div style={{ width: "50%" }}>
                              <p className="buy-price-text">Price</p>
                              <p className="buy-value-text">
                                {obj?.buy?.[0]?.bid ?? "----"}
                              </p>
                            </div>
                            <div style={{ width: "50%" }}>
                              <p className="buy-price-text">Quantity</p>
                              <p className="buy-value-text">
                                {obj?.buy?.[0]?.qty ?? "----"}
                              </p>
                            </div>
                          </div>
                          <div
                            style={{
                              width: "30%",
                              height: "100%",
                              display: "flex",
                              padding: "25px 0",
                            }}
                          >
                            <div style={{ width: "50%" }}>
                              <p className="sell-price-text">Price</p>
                              <p className="sell-value-text">
                                {obj?.sell?.[0]?.bid ?? "----"}
                              </p>
                            </div>
                            <div style={{ width: "50%" }}>
                              <p className="sell-price-text">Quantity</p>
                              <p className="sell-value-text">
                                {obj?.sell?.[0]?.qty ?? "----"}
                              </p>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
