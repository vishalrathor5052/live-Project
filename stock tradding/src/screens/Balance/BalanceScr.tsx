import { useCallback, useEffect, useState } from "react";
import * as IMG from "../../components/common/Images";
import axios from "../../components/common/constants";
import moment from "moment";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Loader from "../../components/common/Loader";

const BalanceScr = () => {
  const [walletbalance, setBalance] = useState<any>([]);
  const [showFiltered, setShowFiltered] = useState(false);
  const [ParticularsList, setParticulars] = useState<any>([]);
  const [loader, setLoader] = useState(true);
  const [netBalance, setNetBalance]= useState(null);
  // let balance;

  console.log("walletbalance in balance", walletbalance, "ParticularsList", ParticularsList);
  const timelineTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      The idle period before remaining funds could be returned.
    </Tooltip>
  );
  const getWalletDetail = useCallback(() => {
    axios
      .get("/wallet/getWalletDetails")
      .then((res: any) => {
        if (res.status === 200) {
          setLoader(false);
          setBalance(res?.data?.data);
          setParticulars(res?.data?.data)
          console.log("api data", res?.data?.data);
        }
      })
      .catch((err: any) => {
        return err.response;
      });
  }, []);
  useEffect(() => {
    getWalletDetail();
  }, []);

  useEffect(()=>{
    if(walletbalance.length>0){
      const filter = walletbalance.filter((elm:any) => elm.particulars === 2);
      const balance = filter.reduce((total:any, num:any)=> total + parseInt(num.netAmount), 0);
      setNetBalance(balance);
      console.log("walletbalance in useeffect", filter, walletbalance, balance)
    }
  },[walletbalance]);

  const HandleFilter = async (e: any) => {
    if (Number(e) === 0) {
      setShowFiltered(false);
      setBalance(walletbalance);
      setParticulars(walletbalance);
    } else {
      if (e) {
        const NewFilterData = await walletbalance?.filter(function (item: any) {
          const itemData = item?.particulars ? item?.particulars : "";
          const textData = Number(e);
          return itemData === textData;
        });
        setShowFiltered(true);
        setParticulars(NewFilterData);
      }
    }
  };
  // const HandleFilter = async (e: any) => {
  //   if (e) {
  //     const NewFilterData = await walletbalance?.filter(function (item: any) {
  //       const itemData = item?.particulars ? item?.particulars : "";
  //       const textData = Number(e);
  //       return itemData === textData;
  //     });
  //     setShowFiltered(true);
  //     setParticulars(NewFilterData);
  //   } else {
  //     setBalance(walletbalance);
  //   }
  // };

  return (
    <div className="balance-main">
      {loader ? (
        <Loader />
      ) : (
        <div
          className="company-logo-name-wrapper"
          style={{ padding: "15px 0", justifyContent: "space-between" }}
        >
          <div style={{ display: "flex" }}>
            <p style={{ width: "100%" }}>Wallet: Net Balance</p>
            <p>{netBalance}</p>
          </div>
          <div className="order-book-right-section">
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <OverlayTrigger
                  placement="left"
                  delay={{ show: 100, hide: 300 }}
                  overlay={timelineTooltip}
                >
                  {/* <div
                  style={{
                    height: 20,
                    width: 20,
                    marginRight: 10,
                    marginTop: -5,
                  }}
                >
                  <img
                    src={IMG.infoIcon}
                    alt="infoIcon"
                    className=""
                    style={{ width: "100%", height: "100%" }}
                  />
                </div> */}
                  {/* </OverlayTrigger> */}
                  <select className="one-day" style={{}}>
                    <img src={IMG.filtericon} alt="" />
                    <option value={1}>One Day</option>
                    <option value={2}>Seven Days</option>
                    <option value={3}>Fifteen Days</option>
                  </select>
                </OverlayTrigger>
              </div>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={IMG.filtericon}
                  alt=""
                  className="filter-img"
                  // style={{ width: 15, height: 15, position: "absolute", left: 7 }}
                />
                <select
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
        </div>
      )}
      {ParticularsList.length === 0 ? (
        <div className="no-data">
          <img
            src={IMG.NoData}
            alt="NoData"
            style={{ width: 300, height: 300 }}
          />
          <h3 className="transaction-text">
            You haven't placed a order- jump start your investment.
          </h3>
        </div>
      ) : (
        <div>
          {ParticularsList?.map(
            (elm: any, idx: number) => {
              return (
                <div className="balance-info-row">
                  <p className="balance-title">
                    {moment(elm?.updatedAt).format("DD MMM, YYYY")}
                  </p>
                  <div className="balance-data-container">
                    <div className="balance-down-aarow">
                      <img
                        src={
                          elm?.typeOfData === 1
                            ? IMG.buyDownArrow
                            : IMG.sellDownArrow
                        }
                        alt=""
                      />
                    </div>
                    <div className="balance-company-div">
                      <p className="company-name">{elm?.companyName}</p>
                      <p className="time">04:00 PM</p>
                    </div>
                    <div className="balance-particulars">
                      <p>
                        {elm?.particulars === 1 ? (
                          <p>Executed</p>
                        ) : elm?.particulars === 2 ? (
                          <p>Pending</p>
                        ) : elm?.particulars === 3 ? (
                          <p>cancelled</p>
                        ) : elm?.particulars === 4 ? (
                          <p>Partially Executed </p>
                        ) : (
                          <p>-----</p>
                        )}
                      </p>
                    </div>
                    <div className="balance-amount-div">
                      <p>{elm?.netAmount}</p>
                    </div>
                  </div>
                </div>
              );
            }
          )}
          {/* {(showFiltered ? ParticularsList : walletbalance)?.map((elm: any) => {
          return (
            <div className="balance-info-row">
              <p className="balance-title">
                {moment(walletbalance?.updatedAt).format("DD MMM, YYYY")}
              </p>

              <div className="balance-data-container">
                <div className="balance-down-aarow">
                  <img 
                    src={
                      elm?.typeOfData === 1
                        ? IMG.buyDownArrow
                        : IMG.sellDownArrow
                    }
                    alt=""
                  />
                </div>
                <div className="balance-company-div">
                  <p className="company-name">{elm?.companyName}</p>
                  <p className="time">04:00 PM</p>
                </div>
                <div className="balance-particulars">
                  <p>
                    {elm?.particulars === 1 ? (
                      <p>Executed</p>
                    ) : elm?.particulars === 2 ? (
                      <p>Pending</p>
                    ) : elm?.particulars === 3 ? (
                      <p>cancelled</p>
                    ) : elm?.particulars === 4 ? (
                      <p>Partially Executed </p>
                    ) : (
                      <p>-----</p>
                    )}
                  </p>
                </div>
                <div className="balance-amount-div">
                  <p>{elm?.netAmount}</p>
                </div>
              </div>
              <div className="balance-data-container">
                <div className="balance-down-aarow">
                  <img
                    src={
                      elm?.typeOfData === 1
                        ? IMG.buyDownArrow
                        : IMG.sellDownArrow
                    }
                    alt=""
                  />
                </div>
                <div className="balance-company-div">
                  <p className="company-name">{elm?.companyName}</p>
                  <p className="time">04:00 PM</p>
                </div>
                <div className="balance-particulars">
                  <p>
                    {elm?.particulars === 1 ? (
                      <p>Executed</p>
                    ) : elm?.particulars === 2 ? (
                      <p>Pending</p>
                    ) : elm?.particulars === 3 ? (
                      <p>cancelled</p>
                    ) : elm?.particulars === 4 ? (
                      <p>Partially Executed </p>
                    ) : (
                      <p>-----</p>
                    )}
                  </p>
                </div>
                <div className="balance-amount-div">
                  <p>{elm?.netAmount}</p>
                </div>
              </div>
              <div className="balance-data-container">
                <div className="balance-down-aarow">
                  <img
                    src={
                      elm?.typeOfData === 1
                        ? IMG.buyDownArrow
                        : IMG.sellDownArrow
                    }
                    alt=""
                  />
                </div>
                <div className="balance-company-div">
                  <p className="company-name">{elm?.companyName}</p>
                  <p className="time">04:00 PM</p>
                </div>
                <div className="balance-particulars">
                  <p>
                    {elm?.particulars === 1 ? (
                      <p>Executed</p>
                    ) : elm?.particulars === 2 ? (
                      <p>Pending</p>
                    ) : elm?.particulars === 3 ? (
                      <p>cancelled</p>
                    ) : elm?.particulars === 4 ? (
                      <p>Partially Executed </p>
                    ) : (
                      <p>-----</p>
                    )}
                  </p>
                </div>
                <div className="balance-amount-div">
                  <p>{elm?.netAmount}</p>
                </div>
              </div>
            </div>
          );
        })} */}
        </div>
      )}
    </div>
  );
};

export default BalanceScr;
