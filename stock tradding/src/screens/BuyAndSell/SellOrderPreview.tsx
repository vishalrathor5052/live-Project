import * as IMG from "../../components/common/Images";
import { sellorderpreview } from "../../utility/Table";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../components/common/constants";
import { ToastContainer, toast, Slide } from "react-toastify";

const SellOrderPreview = () => {
  const location = useLocation();
  const u_id: any = localStorage.getItem("userId");
  const {
    companyName,
    ISIN_Number,
    typeOfOrder,
    price,
    quantity,
    brokerageAmount,
    netAmount,
    validity,
  } = location?.state?.sellData;
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate(-1);
  };

  const user_ID = JSON.parse(u_id);

  const handleConfirm = () => {
    const book_data = location?.state?.sellData;
    const orderData = {
      companyId: book_data.companyId,
      userId: user_ID,
      companyName: book_data.companyName,
      companyISINNO: book_data.ISIN_Number,
      orderType: book_data.typeOfOrder.toLowerCase() === "limit" ? 2 : 1,
      typeOfData: book_data.typeOfData,
      minPrice: book_data.maxPrice,
      maxPrice: book_data.minPrice,
      lotSize: book_data.lotSize,
      brAmount: book_data.brokerageAmount,
      validity: Number(book_data.validity),
      netAmount: book_data.netAmount,
      price: book_data.price,
      quantity: book_data.quantity,
      orderStatus: book_data.orderStatus,
      particulars: book_data.particulars,
      status: book_data.status,
      isDeleted: book_data.isDeleted,
    };
    axios
      .post(`/companies/sellShares/${book_data.companyId}`, orderData)
      .then((response: any) => {
        if (response?.status === 200) {
          navigate("/selladvancepaymentdetail", {
            state: { sellData: location?.state?.sellData },
          });
        } else {
        }
      })
      .catch((err: any) => {
        toast.error(err?.response?.data?.message);
        return err.response;
      });
  };
  return (
    <div className="sell-order-main">
      <div className="order-main">
        <div className="sell-container sell-line">
          <div className="sell-left-content">
            <p>
              <img
                src={IMG.backOrange}
                className="back-btnn"
                onClick={handleCancel}
              />
            </p>
            <p>
              <img
                src={`http://34.203.56.127:3000/stockTradingUploads/Image1669275918056favicon.png`}
                alt=""
                className="logo-sell-company"
              />
            </p>
            <p className="para-preview">{companyName}</p>
          </div>
        </div>
      </div>
      <div className="sell-order-data-container">
        <p className="order-Preview">Order Preview:</p>
        <div
          className="order-book-table-container"
          // style={{
          //   margin: "15px 50px 0 50px",
          //   backgroundColor: "var(--priorange)",
          // }}
        >
          {sellorderpreview.map((data: any) => (
            <div className="order-book-table-heading">
              <p>{data.header}</p>
            </div>
          ))}
        </div>
        <div className="preview-table-row">
          <div className="preview-table-data">
            <p>
              <img
                src={`http://34.203.56.127:3000/stockTradingUploads/Image1669275918056favicon.png`}
                alt=""
                className="logo-sell-company"
              />
            </p>
          </div>
          <p
            className="sell-preview-border"
            style={{ color: "var(--priorange)" }}
          ></p>
          <div className="preview-table-data">
            <p>{companyName}</p>
          </div>
          <p className="sell-preview-border"></p>
          <div className="preview-table-data">
            <p>{ISIN_Number}</p>
          </div>
          <p className="sell-preview-border"></p>
          <div className="preview-table-data">
            <p>{price}</p>
          </div>
          <p className="sell-preview-border"></p>
          <div className="preview-table-data">
            <p>{quantity}</p>
          </div>
          <p className="sell-preview-border"></p>
          <div className="preview-table-data">
            <p>{brokerageAmount}</p>
          </div>
          <p className="sell-preview-border"></p>
          <div className="preview-table-data">
            <p>{netAmount}</p>
          </div>
        </div>
        <div className="sell-order-bottom-btn">
          <div style={{ marginRight: 15 }}>
            <button
              className="btn-cancel sell-btn-cancel"
              onClick={handleCancel}
            >
              Cancel Order
            </button>
          </div>
          <div>
            <button
              className="btn-confirm sell-btn-confirm"
              name="result"
              onClick={handleConfirm}
            >
              Confirm Order
            </button>
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

export default SellOrderPreview;
