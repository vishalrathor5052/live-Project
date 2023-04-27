import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import axios from "../../../components/common/constants";
import Loader from "../../../components/common/Loader";
import Pagination from "../../../utility/Pagination";
import * as IMG from "../../../components/common/Images";
const HoldingStatement = () => {
  const [date, setdate] = useState<string>();
  const [holding, setHolding] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [totalqty, setTotalQty] = useState([]);
  const [loader, setLoader] = useState(true);
  const handlePageClick = (e: any) => {
    const selectedPage = e.selected;

    setOffset(selectedPage * 10);
  };
  const getCompaniesHoldings = useCallback(() => {
    let dataArray: any = [];

    axios
      .get(`/companies/holdingStatement?offset=${offset}`)
      .then((res: any) => {
        setPageCount(res.data.data.count[0].count);
        if (res.status === 200) {
          setLoader(false);
          setHolding(res?.data?.data?.rows);
          for (let i = 0; i < res?.data?.data?.rows.length; i++) {
            dataArray.push(
              Number(res?.data?.data?.rows[i]?.companyPrice?.currentValue)
            );
            setTotalQty(dataArray);
          }
        }
      })
      .catch((err: any) => {
        return err.response;
      });
  }, [offset]);
  useEffect(() => {
    getCompaniesHoldings();
  }, [offset]);
  const initialValue = 0;
  const totalSum = totalqty.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  );
  return (
    <div>
      {loader ? (
        <Loader />
      ) : (
        <div className="order-book-container">
          <div
            className="company-logo-name-wrapper buy-line"
            style={{ paddingBottom: 20, justifyContent: "space-between" }}
          >
            <div style={{ display: "flex" }}>
              <p>Holding Statement</p>
            </div>
            <div className="order-book-right-section">
              <p>Total Current Valuation: {totalSum}</p>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  className="dateInput"
                  onChange={(e: any) => setdate(e.target.value)}
                >
                  <input type="date" />
                </div>
              </div>
            </div>
          </div>
          <div
            className="order-book-table-container"
            style={{ justifyContent: "space-between" }}
          >
            <div className="order-book-table-heading" style={{ width: "24%" }}>
              <p>Company Name(ISIN)</p>
            </div>
            <div className="order-book-table-heading" style={{ width: "24%" }}>
              <p>QTY</p>
            </div>
            <div className="order-book-table-heading" style={{ width: "24%" }}>
              <p>Average Price</p>
            </div>
            <div className="order-book-table-heading" style={{ width: "24%" }}>
              <p>Current Valuation</p>
            </div>
          </div>
          {holding.length === 0 ? (
            <div className="no-data">
              <img
                src={IMG.NoData}
                alt="NoData"
                style={{ width: 300, height: 300 }}
              />
              <h3 className="transaction-text">
                You don't have any holdings yet
              </h3>
            </div>
          ) : (
            (date
              ? holding?.filter((datas: any) =>
                  moment(datas?.createdAt).isSame(moment(date))
                )
              : holding
            ).map((datas: any) => {
              return (
                <div className="order-book-table-row">
                  <div
                    className="order-book-table-data"
                    style={{ width: "24%" }}
                  >
                    <p>
                      {datas?.companyNames?.[0]?.companyName} (
                      {datas?.companyNames?.[0]?.ISIN})
                    </p>
                  </div>
                  <div
                    className="order-book-table-data"
                    style={{ width: "24%" }}
                  >
                    <p>{datas.qty}</p>
                  </div>
                  <div
                    className="order-book-table-data"
                    style={{ width: "24%" }}
                  >
                    <p>{datas.averagePrice}</p>
                  </div>
                  <div
                    className="order-book-table-data"
                    style={{ width: "24%" }}
                  >
                    <p>{datas?.companyPrice?.currentValue}</p>
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

export default HoldingStatement;
