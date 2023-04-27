import { useCallback, useEffect, useState } from "react";
import * as IMG from "../../../components/common/Images";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import OverviewChart from "./OverviewChart";
import axios from "../../../components/common/constants";
import { useNavigate, useParams } from "react-router-dom";
import PieChartShareholding from "../../Dashboard/Charts/PieChartShareholding";
import moment from "moment";
import ExportToExcel from "../../../utility/Excel/Excelfile";
import { useDispatch, useSelector } from "react-redux";
import { companydata } from "../../../screens/ReduxSetup/CartSlice";

// import { companydata } from "./ReduxSetup/CartSlice";
const CompaniesDetails = () => {
  const companiesVal = useSelector((state: any) => state?.stock?.companiesData);
  // const companiesData = useSelector((state:any)=>state?.stock)
  const Params: any = useParams();
  const auth: any = localStorage.getItem("authToken");

  const [buttons, setButton] = useState<number>(0);
  const [button, setButtons] = useState<number>(0);

  const [result, setResult] = useState<any>({});
  const [financial, setFinancial] = useState([]);
  const [info, setInfo] = useState([]);
  const [pdffile, setPdfFile] = useState(false);
  const [companyBidList, setCompanyBidList] = useState([]);
  const [companyState, setCompanyState] = useState<any>({});
  const [totalqty, setTotalQty] = useState([]);
  const [pdfData, setPdfData] = useState([]);
  const dispatch = useDispatch();
  

  console.log("companiesVal",companiesVal)

  const navigate = useNavigate();
  const heading = [
    {
      first: "Financial",
      second: "Total Revenue",
      third: "EBITDA",
      fourth: "PBIT",
      fifth: "PBT",
      sixth: "Net Income",
      seventh: "EPS",
      eighth: "DPS",
      nineth: "Payment Ratio",
    },
  ];
  const headerKey = [
    "first",
    "second",
    "third",
    "fourth",
    "fifth",
    "sixth",
    "seventh",
    "eighth",
    "nineth",
  ];
  const bodyKey = [
    "financialYear",
    "totalRevenue",
    "ebitda",
    "pbit",
    "pbt",
    "netIncome",
    "eps",
    "dps",
    "paymentRatio",
  ];
  function downloadPdfFile(financialList: any) {
    const custs: any = [];
    for (let i = 0; i < financialList?.length; i++) {
      custs[i] = {
        financialYear: `${
          "FY" + moment(financialList[i]?.financialYear).format("YYYY")
        }`,
        totalRevenue: `${financialList[i]?.totalRevenue}`,
        ebitda: `${financialList[i]?.ebitda}`,
        pbit: `${financialList[i]?.pbit}`,
        pbt: `${financialList[i]?.pbt}`,
        netIncome: `${financialList[i]?.netIncome}`,
        eps: `${financialList[i]?.eps}`,
        dps: `${financialList[i]?.dps}`,
        paymentRatio: `${financialList[i]?.paymentRatio}`,
      };
    }
    return setPdfData(custs);
  }
  const wscols = [
    {
      wch: Math.max(...pdfData.map((item: any) => item.financialYear.length)),
    },
    {
      wch: Math.max(...pdfData.map((item: any) => item.totalRevenue.length)),
    },
    {
      wch: Math.max(...pdfData.map((item: any) => item.ebitda.length)),
    },
    {
      wch:
        Math.max(...pdfData.map((customer: any) => customer.pbit.length)) + 3,
    },
    {
      wch: Math.max(...pdfData.map((item: any) => item.pbt.length)),
    },
    {
      wch: Math.max(...pdfData.map((item: any) => item.netIncome.length)),
    },
    {
      wch: Math.max(...pdfData.map((item: any) => item.eps.length)),
    },
    {
      wch: Math.max(...pdfData.map((item: any) => item.dps.length)),
    },
    {
      wch: Math.max(...pdfData.map((item: any) => item.paymentRatio.length)),
    },
  ];

  useEffect(() => {
    getCompaniesGeneralInfo();
    getCompaniesStatesAndBidsData();
    // getCompaniesDetail();
    getCompaniesDetail();
  }, []);

  const user_Role: any = localStorage.getItem("role");
  const handleBuy = (elm: any) => {
    auth && navigate(`/buy/${elm.id}`, { state: { result: result } });
  };

  const handleSell = (elm: any) => {
    user_Role !== "3" &&
      user_Role &&
      navigate(`/sell/${elm.id}`, { state: { result: result } });
  };

  const pdfFile = () => {
    setPdfFile(true);
  };
  // .........................................Get Companies APi.........................
  const getCompaniesStatesAndBidsData = useCallback(() => {
    let dataArray: any = [];

    axios
      .get(`/companies/getCompaniesStatesAndBids?comapnyId=${Params?.id}`)
      .then((res: any) => {
        if (res.status === 200) {
          setCompanyBidList(res?.data?.data?.bidList);
          setCompanyState(res?.data?.data?.states);

          console.log("res?.data?.data?.bidList",res?.data?.data?.bidList.length)
          for (let i = 0; i <= res?.data?.data?.bidList?.length; i++) {
            dataArray.push(Number(res?.data?.data?.bidList[i].qty));
            setTotalQty(dataArray);
          }
          // dataArray.push()
        }
      });
  }, []);
  const initialValue = 0;
  const totalSum = totalqty.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  );

  // useEffect(() => {
  //   getCompaniesStatesAndBidsData();
  // }, []);
  // const getCompaniesDetail = useCallback(() => {
  //   const newData = [];
  //   let currentData: any = {};
  //   for (let elm in companiesVal) {
  //     if (companiesVal[elm]?.id === parseInt(Params?.id)) {
  //       currentData = companiesVal[elm];
  //       newData.push(currentData);  
  //       setResult(newData);
  //     }
  //   }
  // }, []);

  const getCompaniesDetail = useCallback(() => {
    axios.get(`/companies/getCompanies`).then((res: any) => {
      if (res.status === 200) {
        // setLoader(false);
        setResult(res?.data?.data?.companies);
        dispatch(companydata(res?.data?.data?.companies));
      }
    });
  }, []);
  // useEffect(() => {
  //   getCompaniesDetail();
  // }, []);
  // ..................................Get Company FinancialInfo Api..........................
  const getCompaniesFinancialInfo = useCallback(() => {
    axios
      .get("/companies/getFinancialInformation")
      .then((res: any) => {
        if (res.status === 200) {
          if (res.data !== "") {
            setFinancial(res?.data?.data);
            downloadPdfFile(res?.data?.data);
          }
        }
      })
      .catch((err: any) => {
        return err.response;
      });
  }, []);

  // useEffect(() => {
  //   getCompaniesFinancialInfo();
  // }, []);

  // .................................Get GeneralInformation Api.............................
  const getCompaniesGeneralInfo = useCallback(() => {
    axios
      .get("/companies/getGeneralInformation")
      .then((res: any) => {
        if (res.status === 200) {
          if (res.data !== "") {
            setInfo(res?.data?.data);
          }
        }
      })
      .catch((err: any) => {
        return err.response;
      });
  }, []);

  // useEffect(() => {
  //   getCompaniesGeneralInfo();
  // }, []);

  return (
    <div>
      <div className="order-book-container">
        <div className="company-logo-name-wrapper company-details-top-section">
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={`http://34.203.56.127:3000/stockTradingUploads/Image1669275918056favicon.png`}
              alt=""
              className="company-logo"
            />
            <p>{result[0]?.companyName}</p>
          </div>
          <div className="buy-sell-button-top-section-container">
            {/* ................. BUY button..................... */}
            {buttons == 0 ? null : (
              <>
                <button
                  className="buy-button-top-section"
                  onClick={() => handleBuy(result[0])}
                  style={{ display: "show" }}
                >
                  <img
                    src={IMG.buyWhite}
                    alt=""
                    className=""
                    style={{ width: 16, height: 16 }}
                  />
                  <span onClick={() => handleBuy(result[0])}>
                    <p className="buy-sell-button-text">BUY</p>
                  </span>
                </button>
                <button
                  className="buy-button-top-section"
                  style={{ backgroundColor: "#fc9e22", marginLeft: 35 }}
                >
                  <img
                    src={IMG.sellWhite}
                    alt=""
                    className=""
                    style={{ width: 16, height: 16 }}
                  />
                  <span onClick={() => handleSell(result[0])}>
                    <p className="buy-sell-button-text">SELL</p>
                  </span>
                </button>

                {/* ..................PDF files button............... */}
                {buttons == 1 ? (
                  <>
                    {!pdffile ? (
                      <>
                        <button
                          className="pdf-files-button"
                          style={{ marginLeft: 35 }}
                        >
                          <img
                            src={IMG.pdfBtn}
                            alt=""
                            className=""
                            style={{ width: 16, height: 16 }}
                          />
                          <p className="buy-sell-button-text" onClick={pdfFile}>
                            PDF Files
                          </p>
                        </button>
                      </>
                    ) : (
                      false
                    )}
                  </>
                ) : null}
              </>
            )}
          </div>
        </div>

        <div style={{ marginTop: "40px" }} className="overview-mobile">
          <Tabs
            defaultActiveKey="home"
            id="justify-tab-example"
            className="mb-3 tab-container overview-mobile"
            justify
            fill={false}
            onSelect={(e: any) => {
              setButton(
                e === "home"
                  ? 0
                  : e === "profile"
                  ? 1
                  : e === "longer-tab"
                  ? 2
                  : e === "contact"
                  ? 3
                  : 0
              );
            }}
          >
            <Tab eventKey="home" title="Overview">
              <div className="price">
                <div className="last-traded-price-wrapper">
                  <span>LTP</span>
                  <h3>{result[0]?.ltp}</h3>
                  <div className="traded-price-value">
                    <img
                      src={IMG.upwardIcon}
                      alt=""
                      className=""
                      style={{ width: 16, height: 16 }}
                    />
                    <p>+{result[0]?.ltpPercent}%</p>
                  </div>
                </div>
                <div className="open-high-low-wrapper">
                  <div>
                    <span>Open</span>
                    <p>{result[0]?.open}</p>
                  </div>
                  <div className="line"></div>
                  <div>
                    <span>High</span>
                    <p>{result[0]?.high}</p>
                  </div>
                  <div className="line"></div>
                  <div>
                    <span>Low</span>
                    <p>{result[0]?.low}</p>
                  </div>
                </div>
              </div>
              <div className="graph-buy-sell-stats-wrapper">
                <div className="graph-container">
                  <OverviewChart />
                </div>
                <div
                  className={
                    button === 0 ? "buy-balance-box" : "sell-balance-box"
                  }
                >
                  <Tabs
                    style={{ justifyContent: "space-between" }}
                    variant={"pills"}
                    defaultActiveKey="buy"
                    id="buy-sell-tab"
                    fill={false}
                    onSelect={(e: any) => {
                      setButtons(e === "buy" ? 0 : e === "sell" ? 1 : 0);
                    }}
                  >
                    <Tab
                      eventKey="buy"
                      id="buy-tab"
                      className="buy-tab-test"
                      title={
                        <div
                          className={
                            button === 0 ? "buy-detail" : "buy-detail-no-image"
                          }
                        >
                          <img
                            src={IMG.buyBlack}
                            alt=""
                            className=""
                            style={{ width: 16, height: 16 }}
                          />
                          <p className="buy-sell-table-header">
                            {button === 0
                              ? "Buy"
                              : `Buy:Our Buy Rate’ @ ${result[0]?.price}`}
                          </p>
                        </div>
                      }
                    >
                      <div className="buy-sell-table-design">
                        <div className="table-heading">
                          <p>BID (Top 5)</p>
                        </div>
                        <div className="table-heading">
                          <p>ORDERS</p>
                        </div>

                        <div className="table-heading">
                          <p>QTY</p>
                        </div>
                      </div>

                      {companyBidList.slice(0,5)?.map((item: any, index: any) => {
                        return (
                          <div key={index} className="table-data">
                            <div className="order-table-data">
                              <p>{item.bid ?? "---"}</p>
                            </div>
                            <div className="order-table-data">
                              <p>{item.orders ?? "---"}</p>
                            </div>

                            <div className="order-table-data">
                              <p>{item.qty ?? "---"}</p>
                            </div>
                          </div>
                        );
                      })}
                    </Tab>

                    <Tab
                      eventKey="sell"
                      id="sell-tab"
                      disabled={ user_Role !==3 ? true : false}
                      title={
                        <div
                          className={
                            button === 1
                              ? "sell-detail"
                              : "sell-detail-no-image"
                          }
                        >
                          <img
                            src={IMG.sellBlack}
                            alt=""
                            className=""
                            style={{ width: 16, height: 16 }}
                          />
                          <p onClick={() => {}}>
                            {button === 1 && user_Role !==3
                              ? "Sell"
                              : `Sell:Our Sell Rate’ @ ${result[0]?.price}`}
                          </p>
                        </div>
                      }
                    >
                      <div className="buy-sell-table-design">
                        <div className="table-heading">
                          <p>BID (Top 5)</p>
                        </div>
                        <div className="table-heading">
                          <p>ORDERS</p>
                        </div>

                        <div className="table-heading">
                          <p>QTY</p>
                        </div>
                      </div>

                      {companyBidList?.map((item: any, index: any) => {
                        return (
                          <div key={index} className="table-data">
                            <div className="order-table-data">
                              <p>{item.bid ?? "---"}</p>
                            </div>
                            <div className="order-table-data">
                              <p>{item.orders ?? "---"}</p>
                            </div>

                            <div className="order-table-data">
                              <p>{item.qty ?? "---"}</p>
                            </div>
                          </div>
                        );
                      })}
                    </Tab>
                  </Tabs>
                  {/* <div className="buy-sell-table-design">
                    <div className="table-heading">
                      <p>BID</p>
                    </div>
                    <div className="table-heading">
                      <p>ORDERS</p>
                    </div>

                    <div className="table-heading">
                      <p>QTY</p>
                    </div>
                  </div>

                  {companyBidList?.map((item: any, index: any) => {
                    return (
                      <div key={index} className="table-data">
                        <div className="order-table-data">
                          <p>{item.bid ?? "---"}</p>
                        </div>
                        <div className="order-table-data">
                          <p>{item.orders ?? "---"}</p>
                        </div>

                        <div className="order-table-data">
                          <p>{item.qty ?? "---"}</p>
                        </div>
                      </div>
                    );
                  })} */}
                  <div className="table-data">
                    <div className="order-table-data">
                      <p>Total</p>
                    </div>
                    <div className="order-table-data">
                      <p></p>
                    </div>
                    <div className="order-table-data">
                      <p>{totalSum ?? 0}</p>
                    </div>
                  </div>
                </div>

                <div className="company-stats-with-buy-sell-button">
                  <div className="company-stats-container">
                    <div className="stats-text-container">
                      <p>Company's Stats</p>
                    </div>
                    <div className="company-stats-data">
                      <div className="company-stats-data-row">
                        <p className="row-text">Market Cap</p>
                        <p className="row-text">11500</p>
                      </div>
                      <div className="company-stats-data-row">
                        <p className="row-text">52 week high</p>
                        <p className="row-text">{companyState?.high ?? "0"}</p>
                      </div>
                      <div className="company-stats-data-row">
                        <p className="row-text">52 week low</p>
                        <p className="row-text">{companyState?.low ?? "0"}</p>
                      </div>
                      <div className="company-stats-data-row">
                        <p className="row-text">Volume</p>
                        <p className="row-text">2700</p>
                      </div>
                      <div className="company-stats-data-row">
                        <p className="row-text">Last traded time</p>
                        <p className="row-text">-</p>
                      </div>
                      <div className="company-stats-data-row">
                        <p className="row-text">Face Value</p>
                        <p className="row-text">0.1</p>
                      </div>
                    </div>
                  </div>
                  <div className="buy-sell-button-container">
                    <div className="buy-sell-button">
                      <button
                        className="buy-button"
                        onClick={() => handleBuy(result[0])}
                      >
                        <img
                          src={IMG.buyWhite}
                          alt=""
                          className=""
                          style={{ width: 16, height: 16 }}
                        />
                        <span
                          onClick={() => {
                            handleBuy(result[0]);
                          }}
                        >
                          <p className="buy-sell-button-text">BUY</p>
                        </span>
                      </button>
                      <button
                        className="buy-button"
                        style={{ backgroundColor: "#fc9e22" }}
                        onClick={() => handleSell(result[0])}
                      >
                        <img
                          src={IMG.sellWhite}
                          alt=""
                          className=""
                          style={{ width: 16, height: 16 }}
                        />
                        <span onClick={() =>  handleSell(result[0])}>
                          <p className="buy-sell-button-text">SELL</p>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {info.map((elm: any) => {
                return (
                  <div className="general-info-container">
                    <p className="general-info-text">General information</p>
                    <p className="info-text">{elm.description}</p>
                  </div>
                );
              })}
            </Tab>
            <Tab eventKey="profile" title="Financial Information">
              {pdffile ? (
                <>
                  <div
                    style={{
                      backgroundColor: "#e9f2ff",
                      height: "calc(100vh - 80px)",
                    }}
                  >
                    <div className="order-book-table-row">
                      <div className="order-book-table-data">
                        <p>
                          <img src={IMG.pdfIcon} alt="" className="pdf-img" />
                        </p>
                        <p style={{ marginLeft: "20px", fontWeight: "bold" }}>
                          Company File
                        </p>
                      </div>
                      <div className="order-book-table-data">
                        <p>{result[0]?.companyName}</p>
                      </div>
                      <div className="order-book-table-data">
                        <p>2.5 MB</p>
                      </div>

                      <div className="order-book-table-data">
                        <div
                          className="bi bi-download"
                          style={{ paddingLeft: "40px" }}
                        >
                          <ExportToExcel
                            csvData={pdfData}
                            fileName="Financial_Infomation_xlsx"
                            wscols={wscols}
                            heading={heading}
                            headerKeys={headerKey}
                            bodyKeys={bodyKey}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="finance-info-table">
                  <div style={{ width: "20%" }}>
                    <p
                      style={{
                        marginTop: "10px",
                        backgroundColor: "#ffffff",
                        width: "100%",
                        paddingLeft: "15px",
                      }}
                    >
                      Financial Year
                    </p>
                    <p
                      style={{
                        marginTop: "10px",
                        backgroundColor: "#ffffff",
                        width: "100%",
                        paddingLeft: "15px",
                      }}
                    >
                      Total Revenue
                    </p>
                    <p
                      style={{
                        marginTop: "10px",
                        backgroundColor: "#ffffff",
                        width: "100%",
                        paddingLeft: "15px",
                      }}
                    >
                      EBITDA:
                    </p>
                    <p
                      style={{
                        marginTop: "10px",
                        backgroundColor: "#ffffff",
                        width: "100%",
                        paddingLeft: "15px",
                      }}
                    >
                      PBIT:
                    </p>
                    <p
                      style={{
                        marginTop: "10px",
                        backgroundColor: "#ffffff",
                        width: "100%",
                        paddingLeft: "15px",
                      }}
                    >
                      PBT:
                    </p>
                    <p
                      style={{
                        marginTop: "10px",
                        backgroundColor: "#ffffff",
                        width: "100%",
                        paddingLeft: "15px",
                      }}
                    >
                      Net Income:
                    </p>
                    <p
                      style={{
                        marginTop: "10px",
                        backgroundColor: "#ffffff",
                        width: "100%",
                        paddingLeft: "15px",
                      }}
                    >
                      EPS:
                    </p>
                    <p
                      style={{
                        marginTop: "10px",
                        backgroundColor: "#ffffff",
                        width: "100%",
                        paddingLeft: "15px",
                      }}
                    >
                      DPS:
                    </p>
                    <p
                      style={{
                        marginTop: "10px",
                        backgroundColor: "#ffffff",
                        width: "100%",
                        paddingLeft: "15px",
                      }}
                    >
                      Payment Ratio:
                    </p>
                  </div>
                  {financial?.map((elm: any) => {
                    return (
                      <div style={{ width: "10%" }}>
                        <p
                          style={{
                            marginTop: "10px",
                            backgroundColor: "#ffffff",
                            width: "100%",
                          }}
                        >
                          {"FY" + moment(elm?.financialYear).format("YYYY")}
                        </p>
                        <p
                          style={{
                            marginTop: "10px",
                            backgroundColor: "#ffffff",
                            width: "100%",
                          }}
                        >
                          {elm?.totalRevenue}
                        </p>
                        <p
                          style={{
                            marginTop: "10px",
                            backgroundColor: "#ffffff",
                            width: "100%",
                          }}
                        >
                          {elm?.ebitda}
                        </p>
                        <p
                          style={{
                            marginTop: "10px",
                            backgroundColor: "#ffffff",
                            width: "100%",
                          }}
                        >
                          {elm?.pbit}
                        </p>
                        <p
                          style={{
                            marginTop: "10px",
                            backgroundColor: "#ffffff",
                            width: "100%",
                          }}
                        >
                          {elm?.pbt}
                        </p>
                        <p
                          style={{
                            marginTop: "10px",
                            backgroundColor: "#ffffff",
                            width: "100%",
                          }}
                        >
                          {elm?.netIncome}
                        </p>
                        <p
                          style={{
                            marginTop: "10px",
                            backgroundColor: "#ffffff",
                            width: "100%",
                          }}
                        >
                          {elm?.eps}
                        </p>
                        <p
                          style={{
                            marginTop: "10px",
                            backgroundColor: "#ffffff",
                            width: "100%",
                          }}
                        >
                          {elm?.dps}
                        </p>
                        <p
                          style={{
                            marginTop: "10px",
                            backgroundColor: "#ffffff",
                            width: "100%",
                          }}
                        >
                          {elm?.paymentRatio}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </Tab>
            <Tab eventKey="longer-tab" title="Shareholding">
              <div className="shareholdingChart">
                <div
                  className="donutchart"
                  // style={{ height: "40%", width: "32%" }}
                >
                  <PieChartShareholding />
                </div>
                <div
                  className="donutchart"
                  // style={{ height: "40%", width: "32%" }}
                >
                  <PieChartShareholding />
                </div>
                <div
                  className="donutchart"
                  // style={{ height: "40%", width: "32%" }}
                >
                  <PieChartShareholding />
                </div>
              </div>
            </Tab>

            <Tab eventKey="contact" title="General Info/News">
              <div className="company-detail-main">
                {info?.map((elm: any) => {
                  return (
                    <div className="company-detail-left">
                      <h4>{elm.title}</h4>
                      <p className="company-detail-left-para">
                        {elm.description}
                      </p>
                    </div>
                  );
                })}
                {info?.map((elm: any) => {
                   return (
                  <div className="company-detail-right">
                  <div className="company-detail-news">
                    <p>{elm?.news1}</p>
                  </div>
                  <div className="company-detail-news">
                    <p>{elm?.news2}</p>
                  </div>
                  <div className="company-detail-news">
                   <p>{elm?.news3}</p>
                  </div>
                  <div className="company-detail-news">
                     <p>{elm?.news4}</p>
                  </div>
                  <div className="company-detail-news">
                     <p>{elm?.news5}</p>
                  </div>
                   <div className="company-detail-news">
                     <p>{elm?.news6}</p>
                  </div>
                </div>
                  );
                })}
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CompaniesDetails;
