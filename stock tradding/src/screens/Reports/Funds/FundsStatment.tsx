import { useCallback, useEffect } from "react";
import axios from "../../../components/common/constants";
import ExportToExcel from "../../../utility/Excel/Excelfile";
import { useState } from "react";
import { FundStatement } from "../../../utility/Table";
import moment from "moment";
import Pagination from "../../../utility/Pagination";
import Loader from "../../../components/common/Loader";
import * as IMG from "../../../components/common/Images";
const FundStatment = () => {
  const [pdfData, setPdfData] = useState([]);
  const [fund, setFund] = useState<any>([]);
  const [offset, setOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [loader, setLoader] = useState(true);
  const [startDate,setSatrtDate] =useState<string>()
  const [endDate,setEndDate] = useState<string>()

  useEffect(() => {
    getCompaniesFundsStatement();
  }, [offset]);

  const handlePageClick = (e: any) => {
    const selectedPage = e.selected;
    setOffset(selectedPage * 10);
  };

  function pdfFileData(fundList: any) {
    const custs: any = [];
    for (let i = 0; i < fundList?.length; i++) {
      custs[i] = {
        date: `${moment(fundList[i]?.createdAt).format("DD-MM-YYYY")}`,
        particular: `${fundList[i]?.particular}`,
        debit: `${fundList[i]?.debit}`,
        credit: `${fundList[i]?.credit}`,
        netBalance: `${fundList[i]?.netBalance}`,
      };
    }
    return setPdfData(custs);
  }
  const heading = [
    {
      first: "Date",
      second: "Particular",
      third: "Debit",
      fourth: "Credit",
      fifth: "Net Balance",
    },
  ];
  const wscols = [
    {
      wch: Math.max(...pdfData.map((item: any) => item.date.length)),
    },
    {
      wch: Math.max(...pdfData.map((item: any) => item.particular.length)),
    },
    {
      wch: Math.max(...pdfData.map((item: any) => item.debit.length)),
    },
    {
      wch: Math.max(...pdfData.map((item: any) => item.credit.length)),
    },
    {
      wch:
        Math.max(
          ...pdfData.map((customer: any) => customer.netBalance.length)
        ) + 3,
    },
  ];
  // -----------------------Date Functionality ------------------------
  const [fromDate, setFromDate] = useState<string>();
  const [toDate, setToDate] = useState<string>();

  //-------------------Get FundStatement Api .....................
  const getCompaniesFundsStatement = useCallback(() => {
    const payload = {
      startDate : startDate,
      endDate : endDate
    }
    let fundsList = [];
    axios
      .get(`/companies/getFundsStatement?offset=${offset}`,payload)
      .then((res: any) => {
        setPageCount(res?.data?.count);
        if (res.status === 200) {
          setLoader(false);
          if (res.data !== "") {
            fundsList = res?.data?.data;
            setFund(fundsList);
            pdfFileData(fundsList);
          }
        }
      })
      .catch((err: any) => {
        return err.response;
      });
  }, [offset,startDate,endDate]);


  const handleDate =()=>{
    getCompaniesFundsStatement()
   }
    
   const handleSetStartDate=(date:any)=>{
     console.log("date in handleSetDate",date )
     setSatrtDate(date)
   }
   const handleSetEndDate=(date:any)=>{
     console.log("date in handleSetDate",date )
     setEndDate(date)
   }
   
  // ----------------------------close--------------------------

  const headerKey = ["first", "second", "third", "fourth", "fifth"];
  const bodykey = ["date", "particular", "debit", "credit", "netBalance"];

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
              <p>Fund Statement</p>
            </div>
            <div className="order-book-right-section">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  className="dateInput"
                  onChange={(e:any)=>{handleSetStartDate(e.target.value);}}
                >
                  <input type="date"  value={startDate ?? moment().format("YYYY-MM-DD")} />
                </div>
                <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                  {" "}
                  -{" "}
                </div>
                <div
                  className="dateInput"
                  onChange={(e:any)=>{handleSetEndDate(e.target.value);}}
                >
                  <input type="date"   value={endDate ?? moment().format("YYYY-MM-DD")}/>
                </div>
                <button onClick={()=>handleDate()} className="btn btn-primary">
              Apply
        </button>
                {pageCount > 0 && (
                  <div className="bi bi-download">
                    <ExportToExcel
                      headerKeys={headerKey}
                      bodyKeys={bodykey}
                      heading={heading}
                      csvData={pdfData}
                      fileName="Fund Statement"
                      wscols={wscols}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="order-book-table-container order-book-paddingleft">
            {FundStatement.map((head: any) => (
              <div
                className="order-book-table-heading"
                style={{ width: "20%" }}
              >
                <p>{head.header}</p>
              </div>
            ))}
          </div>
          {fund.length === 0 ? (
            <div className="no-data">
              <img
                src={IMG.NoData}
                alt="NoData"
                style={{ width: 300, height: 300 }}
              />
              <h3 className="transaction-text">
                You don't have any funds transfer yet
              </h3>
            </div>
          ) : (
            (fromDate && toDate
              ? fund?.filter((elm: any) =>
                  moment(elm?.createdAt).isBetween(
                    moment(fromDate),
                    moment(toDate)
                  )
                )
              : fund
            ).map((ele: any) => {
              return (
                <div className="order-book-table-row">
                  <div
                    className="order-book-table-data"
                    style={{ width: "20%" }}
                  >
                    <p>{moment(ele?.createdAt).format("DD-MM-YYYY")}</p>
                  </div>
                  <div
                    className="order-book-table-data"
                    style={{ width: "20%" }}
                  >
                    <p>{ele?.particular}</p>
                  </div>
                  <div
                    className="order-book-table-data"
                    style={{ width: "20%" }}
                  >
                    <p>{ele?.debit}</p>
                  </div>
                  <div
                    className="order-book-table-data"
                    style={{ width: "20%" }}
                  >
                    <p>{ele?.credit}</p>
                  </div>
                  <div
                    className="order-book-table-data"
                    style={{ width: "20%" }}
                  >
                    <p>{ele?.netBalance}</p>
                  </div>
                </div>
              );
            })
          )}
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

export default FundStatment;
