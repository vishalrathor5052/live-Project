import { useCallback, useEffect, useState } from "react";
import axios from "../../../components/common/constants";
import Pagination from "../../../utility/Pagination";
import moment from "moment";
import { number } from "yup/lib/locale";
import Loader from "../../../components/common/Loader";
import * as IMG from "../../../components/common/Images";
const ProfitLoss = () => {
  const [profit, setProfit] = useState([]);
  const [offset, setOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [fromDate, setFromDate] = useState<string>();
  const [toDate, setToDate] = useState<string>();
  const [loader, setLoader] = useState(true);
  const [startDate,setSatrtDate] =useState<string>()
  const [endDate,setEndDate] = useState<string>()
  const [netBalance,setNetBalance] = useState(0)

  console.log(startDate , endDate,"endDate ,startDate" )

  useEffect(() => {
  //  console.log("payload in useEffect",payload)
    getCompaniesProfitAndLoss();
  }, [offset]);

  const handlePageClick = (e: any) => {
    const selectedPage = e.selected;
    setOffset(selectedPage * 10);
  };
  const getCompaniesProfitAndLoss = useCallback(() => {
    const payload = {
      startDate : startDate,
      endDate : endDate
    }
    console.log("payload",payload)
    axios
      .post(`/companies/getProfitAndLoss?offset=${offset}`,payload)
      .then((res: any) => {
        if (res.status === 200) {
          setLoader(false);
          if (res.data !== "") {
            setPageCount(res?.data?.count);
            setProfit(res?.data?.data);
            console.log("datas", res?.data?.data?.companyName);
            const balance = res?.data?.data.reduce((total:any, num:any)=> total + parseInt(num.buyAvg), 0);
            console.log("balance",balance)
            setNetBalance(balance);
          }
        }
      })
      .catch((err: any) => {
        return err.response;
      });
  }, [offset,startDate,endDate]);

  const handleDate =()=>{
  getCompaniesProfitAndLoss()
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
              <p>Profit and Loss</p>
            </div>
            <div
              className="order-book-right-section"
              
            >
              <p className="net-profit-text">Net Profit: ${netBalance}</p>

              <div className="profit-loss-date-time-div"   
              >
                <div
                  className="dateInput"
                  onChange={(e:any)=>{handleSetStartDate(e.target.value);}}
                
                >
                  <input type="date" 
                  name="startDate"
                  value={startDate ?? moment().format("YYYY-MM-DD")}/>
                </div>
                <div style={{ margin: "0 10px" }}> - </div>
                <div
                  className="dateInput"
                  onChange={(e:any)=>{handleSetEndDate(e.target.value);}}
                >
                  <input type="date" name="endDate"  value={endDate ?? moment().format("YYYY-MM-DD")} />
                </div>
              </div>

              <button onClick={()=>handleDate()} className="btn btn-primary">
              Apply
        </button>
              {/* <button className="apply-button">Apply</button> */}

            </div>
          </div>
          <div className="order-book-table-container">
            <div className="order-book-table-heading" style={{ width: "20%" }}>
              <p>Company Name</p>
            </div>
            <div className="order-book-table-heading" style={{ width: "20%" }}>
              <p>ISIN No.</p> 
            </div>
            <div className="order-book-table-heading" style={{ width: "16%" }}>
              <p>QTY</p>
            </div>
            <div className="order-book-table-heading" style={{ width: "16%" }}>
              <p>Buy Avg</p>
            </div>
            <div className="order-book-table-heading" style={{ width: "15%" }}>
              <p>Sell Avg</p>
            </div>
            <div className="order-book-table-heading" style={{ width: "13%" }}>
              <p>Realised</p>
            </div>
          </div>
          {profit.length === 0 ? (
            <div className="no-data">
              <img src={IMG.NoData} alt="NoData" style={{width: 300, height: 300}}/>
              <h3 className="transaction-text">You Don't have any realized profit and loss</h3>
            </div>
          ) : (
            (fromDate && toDate
              ? profit?.filter((elm: any) =>
                  moment(elm?.createdAt).isBetween(
                    moment(fromDate),
                    moment(toDate)
                  )
                )
              : profit
            ).map((datas: any) => {
              return (
                <div className="order-book-table-row">
                  <div
                    className="profit-loss-table-data"
                    style={{ width: "20%" }}
                  >
                    <p>{datas?.companyNameAndISIN?.companyName ?? "----"}</p>
                  </div>
                  <div
                    className="profit-loss-table-data"
                    style={{ width: "20%" }}
                  >
                    <p>{datas?.companyNameAndISIN?.ISIN ?? "----"}</p>
                  </div>
                  <div
                    className="profit-loss-table-data"
                    style={{ width: "16%" }}
                  >
                    <p>{datas?.quantity ?? "----"}</p>
                  </div>
                  <div
                    className="profit-loss-table-data"
                    style={{ width: "16%" }}
                  >
                    <p>{datas?.buyAvg ?? "----"}</p>
                  </div>
                  <div
                    className="profit-loss-table-data "
                    style={{ width: "16%" }}
                  >
                    <p>{datas?.sellAvg ?? "----"}</p>
                  </div>
                  <div
                    className="profit-loss-table-data"
                    style={{ width: "12%" }}
                  >
                    <p>
                      {datas?.sellAvg - datas?.buyAvg < 0 ? (
                        <p>profit</p>
                      ) : (
                        <p> Loss</p> ?? "----"
                      )}
                    </p>
                  </div>
                </div>
              );
            })
          )}
          {pageCount > 0 && (
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

export default ProfitLoss;
