import { useCallback, useEffect, useState } from "react";
import * as IMG from "../../components/common/Images";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "../../components/common/constants";
import { Slide, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
const Sell = () => {
  const location = useLocation();
  const { price, id, companyName, ISIN } = location?.state?.result[0];
  const Params: any = useParams();
  const storedData = useSelector((state: any) => state?.stock?.companiesData);
  const [companyBidList, setCompanyBidList] = useState([]);
  const [totalqty, setTotalQty] = useState([]);
  const [sellShares, setSellShares] = useState<any>();
  const [quantity, setQuantity] = useState<number>(0);
  const [netAmount, setNetAmount] = useState<number>(0);
  const [type, setHandleType] = useState<string>("Market");
  const [brokerageAmount, setBrokerageAmount] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [validity, setValidity] = useState<number>(1);
  const [sellLtp, setSellLtp] = useState<any>({});

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
    SellData();
    setTotalPrice(price);
    getCompaniesSellShare();
  }, []);
  const initialValue = 0;
  const totalSum = totalqty?.slice(0,5).reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  );

  const SellData = useCallback(() => {
    const dataLtp = [];
    let currentData: any = {};
    for (let elm in storedData) {
      if (storedData[elm].id === parseInt(Params?.id)) {
        currentData = storedData[elm];
        dataLtp.push(currentData);
        setSellLtp(dataLtp);
      }
    }
  }, []);

  const navigate = useNavigate();
  const handletypecheck = (e: any) => {
    setHandleType(e.target.value);
  };

  const handleChange = (e: any) => {
    setTotalPrice(e.target.value);
  };
  const increment = () => {
    if (quantity < 5) {
      setQuantity(quantity + 1);
    } else {
      setQuantity(5);
    }
  };
  const decrement = () => {
    if (quantity === 1) {
      setQuantity(1);
    } else if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const getCompaniesSellShare = useCallback(() => {
    axios
      .get(`/companies/sellShares/${id}`)
      .then((res: any) => {
        if (res?.status === 200) {
          if (res?.data?.data) {
            setSellShares(res?.data?.data);
          }
        }
      })
      .catch((err: any) => {
        return err.response;
      });
  }, []);

  const sellData = {
    companyName: companyName,
    ISIN_Number: ISIN,
    typeOfOrder: type,
    price: totalPrice,
    quantity: quantity,
    brokerageAmount: brokerageAmount,
    netAmount: netAmount,
    validity: validity,
    companyId: id,
    maxPrice: sellShares?.maxPrice,
    minPrice: sellShares?.minPrice,
    lotSize: sellShares?.lotSize,
    typeOfData: 2,
    orderStatus: sellShares?.orderStatus,
    particulars: 1,
    status: sellShares?.status === "true" ? 1 : 0,
    isDeleted: sellShares?.isDeleted === "true" ? 1 : 0,
  };

  const handleNavigate = () => {
    navigate("/sellorderpreview", { state: { sellData: sellData } });
  };
  useEffect(() => {
    let total = quantity * 50 * totalPrice;
    setNetAmount(total);
  }, [quantity, totalPrice]);
  return (
    <div className="Buy-container">
      <div className="company-logo-name-wrapper buy-sell-page-company-logo sell-line">
        <img
          src={`http://34.203.56.127:3000/stockTradingUploads/Image1669275918056favicon.png`}
          alt=""
          className="company-logo"
        />
        <p>{companyName}</p>
      </div>
      <div className="Buy-wrapper-main">
        <div className="Buy-box">
          <div className="buy-sell-order-row">
            <p
              className="buy-sell-order-row-label"
              style={{ borderColor: "orange" }}
            >
              ISIN Number
            </p>
            <div
              className="buy-sell-order-row-input"
              style={{ borderColor: "orange" }}
            >
              <input
                className="sell-input"
                placeholder="INE2854582"
                style={{backgroundColor: '#e9ecef' }}
                value={ISIN}
                disabled={true}
              />
            </div>
          </div>
          <div className="buy-sell-order-row">
            <p className="buy-sell-order-row-label">Type of order</p>
            <div className="buy-sell-order-row-input">
              <select
                className="sell-dropdown-style"
                disabled={false}
                style={{
                  color: "#fc9e22",
                  padding: "1%",
                  // boxShadow: "inset 0px 0px 5px var(--priorange)",
                }}
                onChange={(e) => handletypecheck(e)}
              >
                <option style={{ color: "#fc9e22" }}>Market</option>
                <option style={{ color: "#fc9e22" }}>Limit</option>
              </select>
            </div>
          </div>
          <div className="buy-sell-order-row">
            <p className="buy-sell-order-row-label">Price</p>
            <div className="buy-sell-order-row-input">
              <input
                className="sell-input"
                placeholder="250.5"
                name="price"
                value={totalPrice}
                onChange={handleChange}
                disabled={type === "Market" ? true : false}
                style={{backgroundColor: type === "Market" ? '#e9ecef': '#ffffff'}}
              />
            </div>
          </div>

          <div className="buy-sell-order-row">
            <p className="buy-sell-order-row-label">
              Quantity<br></br>
              <span style={{ fontSize: "14px" }}>*Lot size-50</span>
            </p>
            <div className="buy-sell-order-incre-decre">
              <button
                type="button"
                className="sell-incre-btn"
                onClick={decrement}
              >
                -
              </button>

              <input
                className="quantity-input-sell"
                placeholder="0"
                name="quantity"
                value={quantity}
                onChange={handleChange}
                disabled={type === "Market" ? true : false}
              />
                <button
                  type="button"
                  className="sell-incre-btn"
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
                className="sell-input"
                placeholder="0"
                name="brokerageAmount"
                value={brokerageAmount}
                onChange={(e: any) => {
                  setBrokerageAmount(e.target.value);
                }}
                disabled={true}
                style={{backgroundColor: '#e9ecef'}}
              />
            </div>
          </div>
          <div className="buy-sell-order-row">
            <p className="buy-sell-order-row-label">Net Amount</p>
            <div className="buy-sell-order-row-input">
              <input
                className="sell-input"
                placeholder="0"
                disabled={true}
                value={netAmount}
                style={{backgroundColor: '#e9ecef'}}
              />
            </div>
          </div>
          <div className="buy-sell-order-row">
            <p className="buy-sell-order-row-label">Validity</p>
            <div className="buy-sell-order-row-input">
              <select
                className="sell-dropdown-style"
                style={{backgroundColor:'#e9ecef'}}
                value={validity}
                disabled={true}
                onChange={(e: any) => {
                  setValidity(e.target.value);
                }}
              >
                <option style={{ color: "#fc9e22" }} value={1}>
                  1 Day
                </option>
                <option style={{ color: "#fc9e22" }} value={4}>
                  4 Days
                </option>
                <option style={{ color: "#fc9e22" }} value={7}>
                  7 Days
                </option>
                <option style={{ color: "#fc9e22" }} value={15}>
                  15 Days
                </option>
                <option style={{ color: "#fc9e22" }} value={30}>
                  30 Days
                </option>
              </select>
            </div>
          </div>

          <div className="cancel-confirm-btn-container">
            <div style={{ marginRight: 15 }}>
              <button
                className="btn-cancel sell-btn-cancel"
                onClick={() => {
                  navigate(`/dashboard`);
                }}
              >
                Cancel Order
              </button>
            </div>
            <div style={{}}>
              <button
                className="btn-confirm sell-btn-confirm"
                onClick={handleNavigate}
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
        <div className="buy-balance-box">
          <div
            className="buy-sell"
            style={{ width: "100%", marginBottom: '16px' }}
            onClick={() => {
              navigate(`/buy/${id}`, {
                state: { result: location?.state?.result },
              });
            }}
          >
            <div className="sell-page-buy-button">
              <img
                src={IMG.buyBlack}
                alt=""
                className=""
                style={{ width: 16, height: 16 }}
              />
              <p>Buy:Our Buy Rate' @ {price}</p>
            </div>
            <div className="sell-page-sell-button">
              <img
                src={IMG.sellBlack}
                alt=""
                className=""
                style={{ width: 16, height: 16 }}
              />
              <p>Sell</p>
            </div>
          </div>
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
          <h3>{sellLtp[0]?.ltp}</h3>
          <div className="traded-price-value sell-value">
            <img
              src={IMG.downwardIcon}
              alt=""
              className="sell-icon"
              style={{ width: 16, height: 16 }}
            />
            <p>+{sellLtp[0]?.ltpPercent}%</p>
          </div>
        </div>
        <div className="open-high-low-wrapper">
          <div>
            <span>Open</span>
            <p>{sellLtp[0]?.open}</p>
          </div>
          <div className="line"></div>
          <div>
            <span>High</span>
            <p>{sellLtp[0]?.high}</p>
          </div>
          <div className="line"></div>
          <div>
            <span>Low</span>
            <p>{sellLtp[0]?.low}</p>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
    </div>
  );
};

export default Sell;
