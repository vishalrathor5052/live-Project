import { useCallback, useEffect, useState } from "react";
import { investment } from "../../utility/Table";
import axios from "../../components/common/constants";
import Loader from "../../components/common/Loader";
const YourInvestment = () => {
  const [product, setproduct] = useState([]);
  const [totalinvestment, setTotalInvestment] = useState([]);
  const [loader, setLoader] = useState(true);
  // ...............................>>Get getYourInvestment API<<<.............................

  const getInvestments = useCallback(() => {
    axios
      .get(`/dashbord/getYourInvestments`)
      .then((res: any) => {
        if (res.status === 200) {
          setLoader(false);
          setproduct(res?.data?.returnList);
          setTotalInvestment(res?.data?.data);
        }
      })
      .catch((err: any) => {
        return err.response;
      });
  }, []);
  useEffect(() => {
    getInvestments();
  }, []);
  return (
    <div>
      {loader ? (
        <Loader />
      ) : (
        <div className="order-book-container">
          {totalinvestment.map((data: any) => (
            <div className="company-logo-name-wrapper">
              <div className="head">Your Investments</div>
              <div className="investment-left-content">
                <div className="investment-value">
                  <h6>Your Investment</h6>{" "}
                  <h3>{data?.investmentsPriceTotalPrice}</h3>
                </div>
                <div className="investment-value">
                  <h6> Current Value</h6>{" "}
                  <h3>{data?.yourInvestmentsTotalPrice}</h3>
                </div>
                <div className="investment-value">
                  <h6> Total P&L</h6>{" "}
                  <h3>
                    {data?.investmentsPriceTotalPrice -
                      data?.yourInvestmentsTotalPrice}
                  </h3>
                </div>
              </div>
            </div>
          ))}

          {/* ------------------investment tables ------------------------------------*/}

          <div
            className="order-book-table-container"
            style={{ marginTop: "35px" }}
          >
            {investment.map((head: any) => (
              <div
                className="order-book-table-heading"
                style={{ width: "14%" }}
              >
                <p>{head.header}</p>
              </div>
            ))}
          </div>

          {product?.map((row: any) => (
            <div className="order-book-table-row">
              <>
                <img
                  src={`http://34.203.56.127:3000/stockTradingUploads/Image1669275918056favicon.png`}
                  alt=""
                  className="investment-king-logo"
                  //  style={{ width: "2%" }}
                ></img>
                <div className="order-book-table-data" style={{ width: "14%" }}>
                  <p>{row?.companyName}</p>
                </div>
                <div className="order-book-table-data" style={{ width: "14%" }}>
                  <p>{row?.noOfShares}</p>
                </div>
                <div className="order-book-table-data" style={{ width: "14%" }}>
                  <p>{row?.averagePrice}</p>
                </div>
                <div className="order-book-table-data" style={{ width: "14%" }}>
                  <p>{row?.ltp}</p>
                </div>
                <div className="order-book-table-data" style={{ width: "14%" }}>
                  <p>{row?.currentValue}</p>
                </div>
                <div className="order-book-table-data" style={{ width: "14%" }}>
                  <p>{row?.ProAndLoss}</p>
                </div>
                <div className="order-book-table-data" style={{ width: "14%" }}>
                  <p>{row?.netChg}</p>
                </div>
              </>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YourInvestment;
