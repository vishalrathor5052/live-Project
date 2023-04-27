import { useState, useEffect, useCallback } from "react";
import * as IMG from "../../components/common/Images";
import axios from "../../components/common/constants";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useSelector } from "react-redux";

const Buy = () => {
  const navigates = useNavigate();
  const location = useLocation();
  const Params: any = useParams();
  const storedData = useSelector((state: any) => state?.stock?.companiesData);

  const buy_data = location.state.result[0];
  const { price, id } = buy_data;
  const [result, setResult] = useState<any>({});
  const [companyBidList, setCompanyBidList] = useState([]);
  const [totalqty, setTotalQty] = useState([]);
  const [quantity, setQuantity] = useState<number>(buy_data?.quantity ?? 1);
  const [netAmount, setNetAmount] = useState<number>(0);
  const [totalNetAmount, setTotalNetAmount] = useState<number>(0);
  const [type, setHandleType] = useState<string>("Market");
  const [brokerageAmount, setBrokerageAmount] = useState<number>(0);
  const [button, setButton] = useState<number>(0);
  const [validity, setValidity] = useState<string>("1 Day");
  const [buyShares, setbuyShares] = useState<any>();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  let paidAmount = buy_data?.price * buy_data?.quantity * 50 ?? 0;

  const handleChange = (e: any) => {
    setTotalPrice(e.target.value);
  };
  const user_Role: any = localStorage.getItem("role");

  const BuyData = useCallback(() => {
    const dataLtp = [];
    let currentData: any = {};
    for (let elm in storedData) {
      if (storedData[elm].id === parseInt(Params?.id)) {
        currentData = storedData[elm];
        dataLtp.push(currentData);
        setResult(dataLtp);
      }
    }
  }, []);
  useEffect(() => {
    BuyData();
  }, []);
  const handletypecheck = (e: any) => {
    setHandleType(e.target.value);
  };

  useEffect(() => {
    let total = quantity * 50 * totalPrice;
    setNetAmount(total);
    total > paidAmount
      ? setTotalNetAmount(total - paidAmount)
      : setTotalNetAmount(paidAmount - total);
  }, [quantity, totalPrice]);

  const getCompaniesStatesAndBidsData = useCallback(() => {
    let dataArray: any = [];
    axios
      .get(`/companies/getCompaniesStatesAndBids?comapnyId=${Params?.id}`)
      .then((res: any) => {
        if (res.status === 200) {
          setCompanyBidList(res?.data?.data?.bidList);
          for (let i = 0; i <= res?.data?.data?.bidList.length; i++) {
            dataArray.push(Number(res?.data?.data?.bidList[i].qty));
            setTotalQty(dataArray);
          }
        }
      });
  }, []);
  useEffect(() => {
    getCompaniesStatesAndBidsData();
  }, []);

  const initialValue = 0;
  const totalSum = totalqty.slice(0,5).reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  );
  const getCompaniesBuyShare = useCallback(() => {
    axios
      .get(`/companies/buyShares/${id}`)
      .then((res: any) => {
        if (res?.status === 200) {
          if (res?.data?.data) {
            setbuyShares(res?.data?.data);
          }
        }
      })
      .catch((err: any) => {
        return err.response;
      });
  }, []);
  useEffect(() => {
    setTotalPrice(price);
    getCompaniesBuyShare();
  }, []);

  const buyData = {
    update_order_id: buy_data?.id,
    updated_Net_Amount: netAmount,
    isUpdating: buy_data?.isUpdating ?? false,
    companyId: id,
    companyName: buyShares?.companyName,
    companyISINNO: buyShares?.ISIN,
    typeOfOrder: type,
    orderType: type,
    price: totalPrice,
    quantity: quantity,
    maxPrice: price,
    minPrice: price,
    lotSize: quantity,
    typeOfData: 1,
    orderStatus: 2,
    brokerageAmount: brokerageAmount,
    netAmount: buy_data?.isUpdating ? totalNetAmount : netAmount,
    totalOrderAmount: netAmount,
    validity: validity,
    particulars: 2,
  };

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigates("/orderConfirmation", { state: { buyData: buyData } });
  };
  const increment = () => {
    setQuantity(quantity + 1);
  };
  const decrement = () => {
    if (quantity == 1) {
      setQuantity(1);
    } else if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <div className="Buy-container">
      <div className="company-logo-name-wrapper buy-sell-page-company-logo buy-line">
        <img
          src={`http://34.203.56.127:3000/stockTradingUploads/Image1669275918056favicon.png`}
          alt=""
          className="company-logo"
        />

        <p>{buyShares?.companyName}</p>
      </div>
      <div className="Buy-wrapper-main">
        <div className="Buy-box">
          <div>
            <div className="buy-sell-order-row">
              <p className="buy-sell-order-row-label">ISIN Number</p>

              <div className="buy-sell-order-row-input">
                <input
                  className="form-control"
                  disabled={true}
                  placeholder="INE2854582"
                  value={buyShares?.ISIN}
                />
              </div>
            </div>
            <div className="buy-sell-order-row">
              <p className="buy-sell-order-row-label">Type of order</p>
              <div className="buy-sell-order-row-input">
                <select
                  className="buy-dropdown-style"
                  disabled={false}
                  onChange={(e) => handletypecheck(e)}
                >
                  <option style={{ color: "#7522de" }}>Market</option>
                  <option style={{ color: "#7522de" }}>Limit</option>
                </select>
              </div>
            </div>
            <div className="buy-sell-order-row">
              <p className="buy-sell-order-row-label">Price</p>
              <div className="buy-sell-order-row-input">
                <input
                  className="form-control"
                  placeholder="250.5"
                  name="price"
                  value={totalPrice}
                  onChange={handleChange}
                  disabled={type === "Market" ? true : false}
                />
              </div>
            </div>
            <div className="buy-sell-order-row">
              <p className="buy-sell-order-row-label">
                Quantity<br></br>
                <span>*Lot size-50</span>
              </p>
              <div className="buy-sell-order-incre-decre">
                <button
                  type="button"
                  className="incre-btn"
                  onClick={() => !buy_data?.isUpdating ? decrement():null}
                >
                  -
                </button>

                <input
                  className="quantity-input"
                  placeholder="0"
                  name="quantity"
                  value={quantity}
                  onChange={handleChange}
                />
                  <button
                    type="button"
                    className="incre-btn"
                    onClick={increment}
                  >
                    +
                  </button>
              </div>
            </div>
            <div className="buy-sell-order-row">
              <p className="buy-sell-order-row-label">Brokerage Amount</p>
              <div className="buy-sell-order-row-input">
                <input
                  className="form-control"
                  placeholder="0"
                  name="brokerageAmount"
                  value={brokerageAmount}
                  onChange={(e: any) => {
                    setBrokerageAmount(e?.target?.value);
                  }}
                  disabled={true}
                />
              </div>
            </div>
            <div className="buy-sell-order-row">
              <p className="buy-sell-order-row-label">Net Amount</p>
              <div className="buy-sell-order-row-input">
                <input
                  className="form-control"
                  placeholder="0"
                  disabled
                  value={netAmount}
                />
              </div>
            </div>
            <div className="buy-sell-order-row">
              <p className="buy-sell-order-row-label">Validity</p>
              <div className="buy-sell-order-row-input">
                <select
                  className="buy-dropdown-style"
                  value={validity}
                  disabled={type === "Market" ? true : false}
                  style={{backgroundColor: type === "Market" ? '#e9ecef' : '#ffffff'}}
                  onChange={(e: any) => {
                    setValidity(e.target.value);
                  }}
                >
                  <option style={{ color: "#7522de" }} value={1}>1 Day</option>
                  <option style={{ color: "#7522de" }} value={4}>4 Days</option>
                  <option style={{ color: "#7522de" }} value={7}>7 Days</option>
                  <option style={{ color: "#7522de" }} value={15}>15 Days</option>
                  <option style={{ color: "#7522de" }} value={30}>30 Days</option>
                </select>
              </div>
            </div>
          </div>
          <div
            className=""
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "flex-end",
              marginTop: 15,
            }}
          >
            <div style={{ marginRight: 15 }}>
              <button
                className="btn-cancel buy-btn-cancel"
                onClick={() => {
                  navigate(`/dashboard`);
                }}
              >
                Cancel Order
              </button>
            </div>
            <div>
              <button
                className="btn-confirm buy-btn-confirm"
                onClick={() => handleNavigate()}
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
        <div className={button === 0 ? "buy-balance-box" : "sell-balance-box"}>
          <Tabs
            defaultActiveKey="buy"
            id="buy-sell-tab"
            className="mb-3"
            style={{ justifyContent: "space-between" }}
            fill={false}
            variant={"pills"}
            
            onSelect={(e: any) => {
              setButton(e === "buy" ? 0 : 1);
              user_Role &&
                user_Role !== "3" &&
                navigate(`/sell/${id}`, {
                  state: { result: location?.state?.result },
                });
            }}
          >
            <Tab
              eventKey="buy"
              id="buy-tab"
              disabled={ user_Role == 3 ? true : false}
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
                  <p>{button === 0 ? "Buy" : `Buy:Our Buy Rate’ @ ${price}`}</p>
                </div>
              }
            ></Tab>
            <Tab
              eventKey="sell"
              disabled={ user_Role !==3 ? true : false}
              id="sell-tab"
              title={
                <div
                  className={
                    button === 1 ? "sell-detail" : "sell-detail-no-image"
                  }
                >
                  <img
                    src={IMG.sellBlack}
                    alt=""
                    className=""
                    style={{ width: 16, height: 16 }}
                  />
                  <p onClick={() => {}}>
                    {button === 1 ? "Sell" : `Sell:Our Sell Rate’ @ ${price}`}
                  </p>
                </div>
              }
            ></Tab>
          </Tabs>

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
          {companyBidList?.slice(0,5)?.map((item: any) => {
            return (
              <div className="table-data">
                <div className="order-table-data">
                  <p>{item?.bid ?? "---"}</p>
                </div>
                <div className="order-table-data">
                  <p>{item?.orders ?? "---"}</p>
                </div>

                <div className="order-table-data">
                  <p>{item?.qty ?? "---"}</p>
                </div>
              </div>
            );
          })}
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
      </div>
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
    </div>
  );
};

export default Buy;
