import ButtonComponent from "../../components/button/Button";
import Footer from "../../components/footer/Footer";
import NavBar from "../../components/navBar/NavBar";
import MobileHeader from "../../components/mobileHeader/MobileHeader";
import "./style.css";
import MobileFooter from "../../components/mobileFooter/MobileFooter";
import Images from "../../constant/Images";
import { landingConstants, PATH } from "../../constant/Constant";
import { objectCheck } from "../../constant/Constant";
import FooterMenuTab from "../../components/footerMenuTab/FooterMenuTab";
import axios from "axios";
import { useEffect, useState, memo } from "react";
import { useSelector } from "react-redux";
import CircularCategory from "../../components/circularCategory/CircularCategory";
import TablePagination from "@mui/material/TablePagination";
import moment from "moment";
import Loader from "../../components/loader/Loader";

const OrderHistory = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [productId, setProductId] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(6);
  const [isLoader, setIsLoader] = useState(true);
  const { userDetail } = useSelector((state: any) => state.userDetails);

  useEffect(() => {
    window.scrollTo(0, 0);
    getOrderHistory();
  }, [page]);

  const handleChangePage = async (event: unknown, newPage: number) => {
    await setPage(newPage);
    // window.scrollTo(0, 0);
    // var element = document.getElementById("scrollRef");
    // element?.scrollIntoView({behavior:"smooth", inline:"nearest"});
    // element?.scrollIntoView({ behavior: "smooth", inline: "nearest" });
    // await getProduct(selectedMenu);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 3));
    // setPage(page);
    // setPage(0);
  };

  const getOrderHistory = () => {
    setIsLoader(true);
    let offsets: number = page * rowsPerPage;
    console.log("page and rowsPerPage", page, rowsPerPage, offsets);
    axios
      .get(
        `${PATH}order/orderHistory/${userDetail.userId}?limit=${rowsPerPage}&offset=${offsets}`
      )
      .then((res: any) => {
        setData(res?.data?.data?.rows ?? res?.data?.data);
        setCount(res?.data?.data?.count);
        setIsLoader(false);
      })
      .catch((err) => {});
  };

  return (
    <>
      <div className="orderHistory-container">
        <NavBar />
        <MobileHeader />
        <div className="circular-cat-main">
          <CircularCategory />
        </div>
        <div className="orderHistory-main">
          <div className="cat-heading-container">
            <div style={{ display: "flex", position: "relative" }}>
              <div className="cat-heading-div">
                <h4 className="heading-category">
                  {objectCheck?.OrderHistory?.heading_category}
                </h4>
              </div>
              <div className="cake-logo-div">
                <img className="cake-logo" src={Images.logo} alt="cake-logo" />
              </div>
            </div>
            <div className="order-history-bottom-div"></div>
          </div>
          {isLoader && <Loader />}
          {!isLoader && data.length === 0 ? (
            <div className="d-flex justify-content-center">
              {/* <h3 className="">Data not found</h3> */}
              <img
                className="search-image"
                src={Images.searchImage}
                alt="search-image"
              />
            </div>
          ) : (
            !isLoader &&
            data?.map((elm: any) => {
              return (
                <div className="orderHistory-card-div" key={elm?.id}>
                  <div className="orderHistory-left-div">
                    <div>
                      <img
                        src={`http://34.200.195.34/upload/${elm?.image}`}
                        alt=""
                        className="cakeImage"
                      />
                    </div>
                    <div className="orderhistory-left-content">
                      <p className="orderHistory-heading">{elm?.productName}</p>
                      <p className="orderHistory-para">{elm?.address}</p>
                      <p className="orderHistory-para">{`${
                        elm?.razorpayOrderId
                      } | 
                      
                      ${
                        moment(
                          elm?.deliveryDateAndTime.split("from")[0]
                        ).format("DD MMMM yyyy") +
                        "," +
                        elm?.deliveryDateAndTime.split("from")[1].split("to")[0]
                      }`}</p>
                      <div className="orderHistory-btn">
                        <ButtonComponent
                          type="button"
                          title="REORDER"
                          // onClick={() => {
                          // }}
                          customStyles={{
                            fontSize: "18px",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="orderHistory-delivery-date">
                      Delivered on{" "}
                      {moment(elm?.deliveryDateAndTime.split("from")[0]).format(
                        "DD MMMM yyyy"
                      ) +
                        "," +
                        elm?.deliveryDateAndTime
                          .split("from")[1]
                          .split("to")[0]}
                      {/* Delivered on {elm?.deliveryDateAndTime} */}
                    </p>
                    <p className="orderHistory-price">${elm?.price}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
        {/* .........mobile view ..........*/}
        <div className="mobile-cat-container">
          <div className="cat-heading-container">
            <div style={{ display: "flex", position: "relative" }}>
              <div className="cat-heading-div">
                <h4 className="heading-category">
                  {objectCheck?.OrderHistory?.heading_category}
                </h4>
              </div>
              <div className="cake-logo-div">
                <img className="cake-logo" src={Images.logo} alt="cake-logo" />
              </div>
            </div>
            <div className="order-history-bottom-div"></div>
          </div>
          {isLoader ? (
            <Loader />
          ) : data.length === 0 ? (
            <div className="d-flex justify-content-center">
              {/* <h3 className="">Data not found</h3> */}
              <img
                className="search-image"
                src={Images.searchImage}
                alt="search-image"
              />
            </div>
          ) : (
            data?.map((elm: any) => {
              console.log("data in orderHistory", data);
              return (
                <div className="mobile-orderHistory-card-div" key={elm?.id}>
                  <div className="orderHistory-left-div">
                    <div>
                      <img
                        src={`http://34.200.195.34/upload/${elm?.image}`}
                        alt=""
                        className="cakeImage"
                      />
                    </div>
                    <div className="orderhistory-left-content">
                      <p className="orderHistory-heading">{elm?.productName}</p>
                      <p className="orderHistory-delivery-date">
                        Delivered on{" "}
                        {moment((elm?.deliveryDateAndTime).slice(0, 13)).format(
                          "DD MMMM yyyy"
                        ) +
                          "," +
                          (elm?.deliveryDateAndTime).slice(28, 37)}
                        {/* {elm?.deliveryDateAndTime} */}
                      </p>
                      <p className="orderHistory-para">{elm?.address}</p>
                      <p className="orderHistory-para">{`${elm?.razorpayOrderId} `}</p>
                      <p className="orderHistory-para">
                        {moment((elm?.deliveryDateAndTime).slice(0, 13)).format(
                          "DD MMMM yyyy"
                        ) +
                          "," +
                          (elm?.deliveryDateAndTime).slice(28, 37)}
                        {/* {`${elm?.dateOfOrder}`} */}
                      </p>

                      <div className="orderHistory-btn">
                        <ButtonComponent
                          customClass="orderHistory-reorder-btn"
                          type="button"
                          title="REORDER"
                          // onClick={() => {
                          // }}
                          customStyles={{
                            fontSize: "12px",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <p className="orderHistory-price">${elm?.price}</p>
                    </div>
                  </div>
                  <div className="add-to-card-middle "></div>
                </div>
              );
            })
          )}
        </div>
        {/* <div className="landing-pagination"> */}
        <TablePagination
          rowsPerPageOptions={[9]}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {/* </div> */}
        <Footer data={landingConstants.footerData} />
        <MobileFooter data={landingConstants.footerData} />
        <FooterMenuTab />
      </div>
    </>
  );
};

export default memo(OrderHistory);
