import { useCallback, useEffect, useState } from "react";
import * as IMG from "../../../components/common/Images";
import Pagination from "../../../utility/Pagination";
import axios from "../../../components/common/constants";
import moment from "moment";
import Loader from "../../../components/common/Loader";

const OrderReport = () => {
  const [orderreport, setOrderReport] = useState<any>([]);
  const [showFiltered, setShowFiltered] = useState(false);
  const [fromDate, setFromDate] = useState<string>();
  const [toDate, setToDate] = useState<string>();
  const [loader, setLoader] = useState(true);
  // ............................Order Report Get Api..................................
  const [orderStatusList, setOrderStatusList] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [startDate,setSatrtDate] =useState<string>()
  const [endDate,setEndDate] = useState<string>()

  useEffect(() => {
    getCompaniesOrdersReport();
  }, [offset]);

  const handlePageClick = (e: any) => {
    const selectedPage = e.selected;
    setOffset(selectedPage * 10);
  };

  const getCompaniesOrdersReport = useCallback(() => {
    const payload = {
      startDate : startDate,
      endDate : endDate
    }
    axios
      .get(`/companies/getOrdersReport?offset=${offset}`,payload)
      .then((res: any) => {
        setPageCount(res?.data?.count);
        if (res.status === 200) {
          setLoader(false);
          setOrderReport(res?.data?.data);
        }
      })
      .catch((err: any) => {
        return err.response;
      });
  }, [offset,startDate,endDate]);
  
  const HandleFilter = async (e: any) => {
    setFromDate("");
    setToDate("");
    if (e === "0") {
      setShowFiltered(false);
      setOrderReport(orderreport);
    } else {
      if (e) {
        const NewFilterData = await orderreport?.filter(function (item: any) {
          return item?.orderStatus === e;
        });
        setShowFiltered(true);
        setOrderStatusList(NewFilterData);
      }
    }
  };

  const handleDate =()=>{
    getCompaniesOrdersReport()
    }
     
    const handleSetStartDate=(date:any)=>{
      console.log("date in handleSetDate",date )
      setSatrtDate(date)
    }
    const handleSetEndDate=(date:any)=>{
      console.log("date in handleSetDate",date )
      setEndDate(date)
    }

  return (
    <div>
      {loader ? (
        <Loader />
      ) : (
        <div className="order-book-container">
          <div
            className="company-logo-name-wrapper"
            style={{ paddingBottom: 20, justifyContent: "space-between" }}
          >
            <div style={{ display: "flex" }}>
              <p>Order Report/Tradebook</p>
            </div>
            <div className="order-book-right-section mobile-order-book-right-section">
              <div className="order-book-right-section-div">
                <div
                  className="dateInput"
                  onChange={(e:any)=>{handleSetStartDate(e.target.value);}}
                >
                  <input type="date" value={startDate ?? moment().format("YYYY-MM-DD")}/>
                </div>
                <div style={{ margin: "0 10px" }}> -</div>
                <div
                  className="dateInput"
                  onChange={(e:any)=>{handleSetEndDate(e.target.value);}}
                >
                  <input type="date" value={endDate ?? moment().format("YYYY-MM-DD")}/>
                </div>
              </div>
              <button onClick={()=>handleDate()} className="btn btn-primary">
              Apply
        </button>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img src={IMG.filtericon} alt="" className="filter-img" />
                <select
                  className=""
                  onChange={(e) => {
                    HandleFilter(e.target.value);
                  }}
                >
                  <option value={0}>All</option>
                  <option value={1}>Executed</option>
                  <option value={2}>Pending</option>
                  <option value={3}>Canceled</option>
                  <option value={4}>Partly Executed</option>
                </select>
              </div>
            </div>
          </div>
          <div className="order-book-table-container">
            <br></br>
            <div className="order-book-table-heading" style={{ width: "20%" }}>
              <p>Date</p>
            </div>
            <div className="order-book-table-heading" style={{ width: "20%" }}>
              <p>Company(with ISIN)</p>
            </div>
            <div className="order-book-table-heading" style={{ width: "16%" }}>
              <p>Amount</p>
            </div>
            <div className="order-book-table-heading" style={{ width: "16%" }}>
              <p>Price</p>
            </div>
            <div className="order-book-table-heading" style={{ width: "13%" }}>
              <p>QTY</p>
            </div>
            <div className="order-book-table-heading" style={{ width: "15%" }}>
              <p>Status</p>
            </div>
          </div>
          {orderreport.length === 0 ? (
            <div className="no-data">
              <img
                src={IMG.NoData}
                alt="NoData"
                style={{ width: 300, height: 300 }}
              />
              <h3 className="transaction-text">
                You don't have any order report yet
              </h3>
            </div>
          ) : (
            (showFiltered ? orderStatusList : orderreport)?.map(
              (datas: any) => {
                return (
                  <div className="order-book-table-row">
                    <img src={IMG.buyPurpul} alt="" />
                    <div
                      className="order-book-table-data"
                      style={{ width: "20%" }}
                    >
                      <p>{moment(datas?.createdAt).format("DD-MM-YYYY")}</p>
                    </div>
                    <div
                      className="order-book-table-data"
                      style={{ width: "20%" }}
                    >
                      <p>{datas?.companyNameWithISINNo}</p>
                    </div>
                    <div
                      className="order-book-table-data"
                      style={{ width: "16%" }}
                    >
                      <p>{datas?.amount}</p>
                    </div>
                    <div
                      className="order-book-table-data"
                      style={{ width: "16%" }}
                    >
                      <p>{datas?.price}</p>
                    </div>
                    <div
                      className="order-book-table-data"
                      style={{ width: "13%" }}
                    >
                      <p>{datas?.quantity}</p>
                    </div>
                    <div
                      className="order-book-table-data"
                      style={{ width: "15%" }}
                    >
                      <p>
                        {datas?.orderStatus === "1" ? (
                          <p>Executed</p>
                        ) : datas?.orderStatus === "2" ? (
                          <p>Pending</p>
                        ) : datas?.orderStatus === "3" ? (
                          <p>cancelled</p>
                        ) : datas?.orderStatus === "4" ? (
                          <p>Partially Executed </p>
                        ) : (
                          <p>------</p>
                        )}
                      </p>
                    </div>
                  </div>
                );
              }
            )
          )}

          {/*----------------------------------- pagination------------------------------------------------ */}
          {pageCount > 10 && (
            <div className="pagination-set">
              <Pagination
                onPageChangeClick={handlePageClick}
                countPage={pageCount / 10}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderReport;
