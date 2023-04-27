import { useCallback, useEffect, useState } from "react";
import * as IMG from "../../components/common/Images";
import axios from "../../components/common/constants";
import Pagination from "../../utility/Pagination";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { orderBookData } from "../ReduxSetup/CartSlice";
import Loader from "../../components/common/Loader";
const OrderBook = () => {
  const [orderData, setOrderData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [showFiltered, setShowFiltered] = useState(false);
  const [OrderStatusList, setOrderStatusList] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [offset, setOffset] = useState<number>(0);
  const [loader, setLoader] = useState(true);
  const [companies, setCompanies] = useState<any>([]);

  const handlePageClick = (e: any) => {
    const selectedPage = e.selected;

    setOffset(selectedPage * 10);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // .............................get  OrderBook APi................................

  const getOrderBookDetails = useCallback(() => {
    axios
      .get(`/companies/getOrderBook?offset=${offset}`)
      .then((res: any) => {
        setPageCount(res?.data?.count);
        if (res.status === 200) {
          setLoader(false);
          if (res.data !== "") {
            setOrderData(res?.data?.data);
            setOrderStatusList(res?.data?.data);
            dispatch(orderBookData(res?.data?.data));
          }
        }
      })
      .catch((err: any) => {
        return err.response;
      });
  }, [offset]);

  useEffect(() => {
    searchInput.length === 0 && getOrderBookDetails();
  }, [searchInput, offset]);

  useEffect(()=>{
    getCompanies();
  },[]);

  const getCompanies = () => {
    axios.get(`/companies/getCompanies`).then((res: any) => {
      if (res.status === 200) {
        setCompanies(res?.data?.data?.companies);
      }
    });
  }

  // .................................Search APi...................

  const HandleSearch = () => {
    axios
      .post("/companies/searchOrderBook", {
        companyName: searchInput,
      })
      .then((response: any) => {
        setOrderData(response?.data?.data);
        setOrderStatusList(response?.data?.data);
      });
  };

  // .................................Filter APi...................
  const HandleFilter = async (e: any) => {
    if (Number(e) === 0) {
      setShowFiltered(false);
      // setOrderData(orderData);
      setOrderStatusList(orderData);
    } else {
      if (e) {
        const newData = await orderData?.filter(function (item: any) {
          const itemData = item?.orderStatus ? item?.orderStatus : "";
          const textData = Number(e);
          return itemData === textData;
        });
        setShowFiltered(true);
        setOrderStatusList(newData);
      }
    }
  };

  const handleDelete = (elm: any) => {
    const id = elm.id;
    axios
      .post("/companies/deleteOrderBook", { id: id })
      .then((res: any) => {
        if (res.status === 200) {
          if (res.data !== "") {
          }
        }
      })
      .catch((err: any) => {
        return err.response;
      });
  };
  const handleEdit = (elm: any) => {
    console.log("elememem", elm);
    let get_data = companies?.filter((item: any) =>
      Number(item?.id === Number(elm?.companyId))
    );

    navigate(`/buy/${elm.companyId}`, {
      state: {
        result: [
          {
            isUpdating: true,
            ISIN: get_data[0]?.ISIN,
            br_amount_nor: get_data[0]?.br_amount_nor,
            br_amount_pre: get_data[0]?.br_amount_pre,
            companyName: get_data[0]?.companyName,
            companyType: get_data[0]?.companyType,
            createdAt: elm?.createdAt,
            generalInfo: get_data[0]?.generalInfo,
            high: get_data[0]?.high,
            iconUrl: get_data[0]?.iconUrl ?? "",
            id: elm?.companyId,
            isDeleted: elm?.isDeleted,
            low: get_data[0]?.low,
            ltp: get_data[0]?.ltp,
            ltpPercent: get_data[0]?.ltpPercent,
            open: get_data[0]?.open,
            price: elm?.price,
            status: elm?.status,
            updatedAt: elm?.updatedAt,
            userId: elm?.userId,
            brAmount: elm?.brAmount,
            companyId: elm?.companyId,
            lotSize: elm?.lotSize,
            maxPrice: elm?.maxPrice,
            minPrice: elm?.minPrice,
            netAmount: elm?.netAmount,
            orderStatus: elm?.orderStatus,
            orderType: elm?.orderType,
            quantity: elm?.quantity,
            typeOfData: elm?.typeOfData,
            validity: elm?.validity,
          },
        ],
      },
    });
  };
  return (
    <div>
      {loader ? (
        <Loader />
      ) : (
        <div className="order-book-container">
          {/* {loader ? (
          <Loader />
        ) : ( */}
          <div
            className="company-logo-name-wrapper"
            style={{ justifyContent: "space-between", paddingBottom: 20 }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <p>Order Book</p>
              <div className="search-container">
                <form action="/action_page.php">
                  <input
                    type="text"
                    onChange={(e) => {
                      setSearchInput(e.target.value);
                    }}
                    placeholder="Search.."
                    name="search"
                    style={{ marginTop: "0px" }}
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    onClick={() => HandleSearch()}
                    className="search-btn"
                    style={{ marginTop: "0px" }}
                  >
                    <i className="fa fa-search"></i>
                  </button>
                </form>
              </div>
            </div>
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
                <img src={IMG.filtericon} alt="" />
                <option value={0}>All</option>
                <option value={1}>Executed</option>
                <option value={2}>Pending</option>
                <option value={3}>Canceled</option>
                <option value={4}>Partly Executed</option>
              </select>
            </div>
          </div>
          {/* )} */}
          <div className="order-book-table-container" style={{ width: "100%" }}>
            <div className="order-book-table-heading" style={{ width: "18%" }}>
              <p>Date/Time</p>
            </div>
            <div className="order-book-table-heading" style={{ width: "18%" }}>
              <p>Company Name</p>
            </div>
            <div className="order-book-table-heading" style={{ width: "18%" }}>
              <p>Company ISIN</p>
            </div>
            <div className="order-book-table-heading" style={{ width: "13%" }}>
              <p> Price</p>
            </div>
            <div className="order-book-table-heading" style={{ width: "13%" }}>
              <p>QTY</p>
            </div>
            <div className="order-book-table-heading" style={{ width: "6%" }}>
              <p>Status</p>
            </div>
            <div className="order-book-table-heading" style={{ width: "10%" }}>
              <p style={{ textAlign: "right" }}>Actions</p>
            </div>
          </div>
          <div className="order-book-table-row-container">
            {orderData.length === 0 ? (
              <div className="no-data">
                <h3 className="transaction-text">
                  You Don't Have Any Transaction Yet
                </h3>
              </div>
            ) : (
              OrderStatusList?.map((elm: any) => {
                return (
                  <div className="order-book-table-row">
                    <div className="order-book-table-data">
                      <span>
                        <img
                          src={
                            elm?.typeOfData === 1
                              ? IMG.buyPurpul
                              : IMG.buyorange
                          }
                          alt=""
                        />
                      </span>
                      <div
                        className="order-book-date-time d-flex" 
                      >
                        <p className="order-date">{moment(elm?.updatedAt).format("DD-MM-YYYY,")}</p>
                        <p className="order-date">{moment(elm?.updatedAt).format("HH:mm A")}</p>
                      </div>
                    </div>
                    <div
                      className="order-book-table-data"
                    >
                      <p className="company-name-order-book">
                        {elm?.companyDetails?.companyName}
                      </p>
                    </div>
                    <div
                      className="order-book-table-data"
                    >
                      <p className="order-data1">
                        {elm?.companyDetails?.ISIN
                          ? elm?.companyDetails?.ISIN
                          : "No data"}
                      </p>
                    </div>
                    <div
                      className="order-book-table-data"
                    >
                      <p className="order-data2">{elm?.price}</p>
                    </div>
                    <div
                      className="order-book-table-data"
                      
                    >
                      <p className="order-data3">{elm?.quantity}</p>
                    </div>
                    <div
                      className="order-book-table-data"
                    >
                      {elm?.orderStatus === 1 ? (
                        <p className="order-data4">Executed</p>
                      ) : elm?.orderStatus !== 0 ? (
                        <p className="order-data5">Pending</p>
                      ) : (
                        <p className="order-data6">Null</p>
                      )}
                    </div>
                    <div className="d-flex" 
                    >
                      {elm?.orderStatus !== 1 ? (
                        <>
                          {elm?.orderStatus !== 1 && (
                            <img
                              src={IMG.editicon}
                              alt=""
                              className="editIcon img-edit1"
                              onClick={() => handleEdit(elm)}
                              
                            />
                          )}
                          <img
                            src={IMG.deleteicon}
                            alt=""
                            className="deleteIcon img-edit1 ms-5"
                            onClick={() => handleDelete(elm)}
                          />
                        </>
                      ) : (
                        <img
                          src={IMG.pdfIcon}
                          alt=""
                          className="deleteIcon"
                          onClick={() => {}}
                        />
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
          {pageCount > 10 && (
            <div className="pagination-set" style={{ background: "blue" }}>
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

export default OrderBook;
