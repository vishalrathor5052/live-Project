import { useCallback, useEffect, useState } from "react";
import axios from "../../../components/common/constants";
import moment from "moment";
import Pagination from "../../../utility/Pagination";
import Loader from "../../../components/common/Loader";
import * as IMG from "../../../components/common/Images";

const Dividend = () => {
  const [dividendData, setDividendData] = useState<any>([]);
  const [fromDate, setFromDate] = useState<string>();
  const [toDate, setToDate] = useState<string>();
  const [pageCount, setPageCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loader, setLoader] = useState(true);
  const [startDate,setSatrtDate] =useState<string>()
  const [endDate,setEndDate] = useState<string>()

  useEffect(() => {
    getDividend();
  }, [offset]);

  const handlePageClick = (e: any) => {
    const selectedPage = e.selected;
    setOffset(selectedPage * 10);
  };

  const getDividend = useCallback(() => {
    const payload={
      startDate:startDate,
      endDate:endDate
    }
    axios
      .get(`/companies/getDividentDetails?offset=${offset}`,payload)
      .then((res: any) => {
        setPageCount(res?.data?.count);
        if (res.status === 200) {
          setLoader(false);
          setDividendData(res?.data?.data);
        }
      })
      .catch((err: any) => {
        return err.response;
      });
  }, [offset,startDate,endDate]);


  const handleDate =()=>{
    getDividend()
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
              <p>Dividend Statement</p>
            </div>
            <div className="order-book-right-section">
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  className="dateInput"
                  onChange={(e:any)=>{handleSetStartDate(e.target.value);}} 
                >
                  <input type="date"   value={startDate ?? moment().format("YYYY-MM-DD")}/>
                </div>
                <div style={{ margin: "0 10px" }}> - </div>
                <div
                  className="dateInput"
                  onChange={(e:any)=>{handleSetEndDate(e.target.value);}} 
                >
                  <input type="date"   value={endDate ?? moment().format("YYYY-MM-DD")}/>
                </div>
              </div>
              <button onClick={()=>handleDate()} className="btn btn-primary">
              Apply
        </button>
            </div>
          </div>
          <div className="order-book-table-container">
            <div className="order-book-table-heading" style={{ width: "25%" }}>
              <p>Date</p>
            </div>
            <div className="order-book-table-heading" style={{ width: "25%" }}>
              <p>Particulars</p>
            </div>
            <div className="order-book-table-heading" style={{ width: "25%" }}>
              <p>Equity Inflow outflow</p>
            </div>
            <div className="order-book-table-heading" style={{ width: "25%" }}>
              <p>Funds Inflow outflow</p>
            </div>
          </div>
          {dividendData.length === 0 ? (
            <div className="no-data">
              <img
                src={IMG.NoData}
                alt="NoData"
                style={{ width: 300, height: 300 }}
              />
              <h3 className="transaction-text">
                You haven't received any dividend yet
              </h3>
            </div>
          ) : (
            (fromDate && toDate
              ? dividendData?.filter((elm: any) =>
                  moment(elm?.createdAt).isBetween(
                    moment(fromDate),
                    moment(toDate)
                  )
                )
              : dividendData
            ).map((elm: any) => {
              console.log("legth", dividendData.length);
              return (
                <div className="order-book-table-row">
                  <div
                    className="order-book-table-data"
                    style={{ width: "25%" }}
                  >
                    <p> {moment(elm?.createdAt).format("DD-MM-YYYY")}</p>
                  </div>
                  <div
                    className="order-book-table-data"
                    style={{ width: "27%" }}
                  >
                    <p>{elm.particular}</p>
                  </div>
                  <div
                    className="order-book-table-data"
                    style={{ width: "25%" }}
                  >
                    <p>{elm.equityInFlowOutFlow}</p>
                  </div>
                  <div
                    className="order-book-table-data"
                    style={{ width: "23%" }}
                  >
                    <p>{elm.fundInFlowOutFlow}</p>
                  </div>
                </div>
              );
            })
          )}
          {/*------------------------------------- paginations------------------------------- */}
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

export default Dividend;
