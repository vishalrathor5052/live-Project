import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import Pagination from "../../../utility/Pagination";
import axios from "../../../components/common/constants";
import Loader from "../../../components/common/Loader";
import * as IMG from "../../../components/common/Images";
const Equity = () => {
  const [equityData, setEquityData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [fromDate, setFromDate] = useState<string>();
  const [toDate, setToDate] = useState<string>();
  const [loader, setLoader] = useState(true);
  const [startDate,setSatrtDate] =useState<string>()
  const [endDate,setEndDate] = useState<string>()


  useEffect(() => {
    getEquity();
  }, []);


  const handlePageClick = (e: any) => {
    const selectedPage = e.selected;
    setOffset(selectedPage * 10);
  };

  const getEquity = useCallback(() => {
    const payload = {
      startDate : startDate,
      endDate : endDate
    }
    axios
      .get("/companies/getEquityDetails",payload)
      .then((res: any) => {
        if (res.status === 200) {
          setLoader(false);
          setEquityData(res?.data?.data);
          const NewData = res?.data?.data;
        }
      })
      .catch((err: any) => {
        return err.response;
      });
  }, [startDate,endDate]);

  const handleDate =()=>{
   getEquity()
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
              <p>Equity Inflow-Outflow</p>
            </div>
            <div className="order-book-right-section">
              <div style={{ display: "flex", alignItems: "cenˀter" }}>
                <div
                  className="dateInput"
                  onChange={(e:any)=>{handleSetStartDate(e.target.value);}}
                >
                  <input type="date"  value={startDate ?? moment().format("YYYY-MM-DD")} />
                </div>
                <div style={{ margin: "0 10px" }}> - </div>
                <div
                  className="dateInput"
                  onChange={(e:any)=>{handleSetEndDate(e.target.value);}}
                >
                  <input type="date"  value={endDate ?? moment().format("YYYY-MM-DD")} />
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
            <div className="order-book-table-heading" style={{ width: "30%" }}>
              <p>Company(with ISIN)</p>
            </div>
            <div className="order-book-table-heading" style={{ width: "23%" }}>
              <p>Debit/Credit</p>
            </div>
            <div className="order-book-table-heading" style={{ width: "22%" }}>
              <p>Net Holding</p>
            </div>
          </div>
          {equityData.length === 0 ? (
            <div className="no-data">
              <img
                src={IMG.NoData}
                alt="NoData"
                style={{ width: 300, height: 300 }}
              />
              <h3 className="transaction-text">
                You haven't invested yet-Start investing
              </h3>
            </div>
          ) : (
            (fromDate && toDate
              ? equityData?.filter((elm: any) =>
                  moment(elm?.createdAt).isBetween(
                    moment(fromDate),
                    moment(toDate)
                  )
                )
              : equityData
            ).map((item: any, index: any) => {
              return (
                <div key={index} className="order-book-table-row">
                  <div
                    className="order-book-table-data"
                    style={{ width: "25%" }}
                  >
                    <p>
                      {moment(item?.createdAt ?? "----").format("DD-MM-YYYY")}
                    </p>
                  </div>
                  <div
                    className="order-book-table-data"
                    style={{ width: "32%" }}
                  >
                    <p>{item.company ?? "----"}</p>
                  </div>
                  <div
                    className="order-book-table-data"
                    style={{ width: "23%" }}
                  >
                    <p>{item?.creditDebit ?? "----"}</p>
                  </div>

                  <div
                    className="order-book-table-data"
                    style={{ width: "20%" }}
                  >
                    <p>{item.netHolding ?? "----"}</p>
                  </div>
                </div>
              );
            })
          )}
          {/*------------------------- pagination------------------------------------ */}
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

export default Equity;
