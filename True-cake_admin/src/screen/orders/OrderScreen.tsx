import React, { memo, useCallback, useEffect, useState } from "react";
import ButtonComponent from "../../component/button/ButtonComponent";
import DropdownComponent from "../../component/dropdownComponent/DropdownComponent";
import Input from "../../component/input/Input";
import TableComponent from "../../component/table/Table";
import { useLocation } from "react-router-dom";
import {
  orderTableHeader,
  orderTableStatus,
  orderTablePaymentStatus,
} from "../../constant/String";
import Image from "../../constant/Image";
import "./style.css";
import Loader from "../../component/loader/Loader";
import CustomizedSnackbars from "../../utils/CustomizedSnackbars";
import ApiComponents from "../../constant/ApiComponents";
import { useDispatch, useSelector } from "react-redux";
import { add, ClosePopup, getAdminProfile } from "../../Store/CartSlice";
import OrderDetailModal from "../../component/orderDetailsModal/OrderDetailModal";
import { useAppDispatch } from "../../Store/Store";

const OrderScreen = () => {
  const location = useLocation();
  const messages = location?.state?.message;
  const [cancelOrder, setCancelOrder] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(true);
  const [isSearch, setIsSearch] = useState<any>(false);
  const [isUpdate, setIsUpdate] = useState<any>({});
  const [inputValue, setInputValue] = useState<Record<string, string | any>>({
    search: "",
    startDate: "",
    endDate: "",
  });
  const [totalPage, setTotalPage] = useState<number>();
  const [rowPerPage, setRowPerPage] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [status, setStatus] = useState<Record<string, string | any>>({});
  const [message, setMessage] = useState<string>(messages);
  const [postPayload, setPostPayload] = useState<boolean>(false);
  const [isDisbled, setIsDisbled] = useState<boolean>(false);
  const [isResponse, setIsResponse] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [isModal, setIsModal] = useState(false);
  const [editOrder, setEditOrder] = useState<any>();
  const [updateOrder, setUpdateOrder] = useState(false);
  const { closePopup } = useSelector((state: any) => state.trueCake);

  const onHandleSearch = () => {
    setIsResponse(true);
    if (Object.keys(isUpdate).length !== 0) {
      setIsDisbled(true);
      setIsSearch(true);
      setLoader(true);
      setPostPayload(true);
    }
  };

  const handleChange = (e: any) => {
    setInputValue((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };


  const Crossfild = async () => {
    if (Object.keys(isUpdate).length !== 0) {
      setPostPayload(false);
      setIsUpdate({});
      setInputValue({
        search: "",
        startData: "DD/MM/YYYY",
        endData: "DD/MM/YYYY",
      });
      if (isDisbled) {
        setIsSearch(true);
        setLoader(true);
        setIsDisbled(false);
        searchOrder({});
        // setIsClose(true);
        // onhandlecross();
      }
      // setIsDisbled(false);
    }
  };

  const handledelete = (data: any) => {
    dispatch(add(" " as never));
    setMessage("");
    setOpen(false);
    ApiComponents.orderDelete(data?.id).then((res: any) => {
      setMessage(res?.message);
      setOpen(true);
    });
  };

  const handleEdit = (editPayload: any) => {
    if (closePopup) {
      dispatch(ClosePopup("" as any));
    }
    dispatch(add(" " as never));
    setMessage("");
    ApiComponents.orderStatusUpdate(editPayload).then((res: any) => {
      setMessage(res);
      setOpen(true);
    });
  };
  const handleChangeSelect = (e: any, data: any) => {
    const payload = {
      id: data?.id,
      orderStatus: +e,
      mobileNo: data?.mobileNo,
      razorpay_order_id: data?.razorpayOrderId,
    };
    handleEdit(payload);
    setStatus((prev) => ({ ...prev, [data]: e }));
  };
  /**
   * Search order...
   * Api calling...
   */
  const searchOrder = async (payload: any) => {
    let offsets: number = page * rowPerPage;
    offsets = isSearch ? 0 : page * rowPerPage;

    const updatedStatus = { ...status };

    await ApiComponents.SearchOrder(rowPerPage, offsets, payload, isSearch)
      .then((response: any) => {
        response?.rows?.map((a: any) => {
          return (
            (a.customername = a?.razorOrderDeatails[0]?.customername
              ? a?.razorOrderDeatails[0]?.customername
              : "--"),
            (a.mobileNo = a?.razorOrderDeatails[0]?.mobileNo
              ? a?.razorOrderDeatails[0]?.mobileNo
              : "--"),
            (a.address = a?.razorOrderDeatails[0]?.address
              ? a?.razorOrderDeatails[0]?.address
              : "--"),
            (a.dateOfOrder = a?.razorOrderDeatails[0]?.dateOfOrder
              ? a?.razorOrderDeatails[0]?.dateOfOrder
              : "--"),
            (a.deliveryDateAndTime = a?.razorOrderDeatails[0]
              ?.deliveryDateAndTime
              ? a?.razorOrderDeatails[0]?.deliveryDateAndTime
              : "--")
          );
        });
        response?.rows?.map(
          (elm: any) => (updatedStatus[elm?.id] = elm?.orderStatus)
        );
        setStatus(updatedStatus);
        setTotalPage(response?.count);
        setOrderList(response?.rows);
        setLoader(false);
        setIsResponse(false);
        // setIsDisbled(false);

        // setIsSearch(false);
        return response;
      })
      .catch((error: any) => {
        return error.response;
      });
    setStatus(updatedStatus);
    dispatch(add(" " as never));
    setMessage("");
    if (closePopup) {
      // setIsClose(true);
      dispatch(ClosePopup("" as any));
    }
  };

  // useEffect(() => {
  //   if (isClose === true && isSearch === true) {
  //     onhandlecross();
  //   }
  // }, [isClose]);
  // const onhandlecross = useCallback(() => {
  //   setTimeout(() => {
  //     setLoader(true);
  //     searchOrder({});
  //   }, 700);
  // }, []);

  useEffect(() => {
    if (Object.keys(isUpdate).length !== 0 && postPayload === true) {
      searchOrder(isUpdate);
    } else {
      searchOrder({});
    }
  }, [cancelOrder, message, page, closePopup, postPayload]);

 

  useEffect(() => {
    if (
      Object.keys(isUpdate).length !== 0 ||
      (postPayload === true && isSearch === true)
    ) {
      searchOrder(isUpdate);
      // setIsSearch(false);
    }
  }, [isSearch]);

  useEffect(() => {
    if (isDisbled) {
      setIsSearch(false);
    }
  }, [isDisbled]);

  const onHandleEdit = (data: any) => {
    setEditOrder(data);
    setIsModal(true);
  };

  const handleClose = () => {
    setEditOrder("");
    setIsModal(false);
    updateOrder && searchOrder({});
  };

  return (
    <>
      {isModal && (
        <OrderDetailModal
          onHandleClose={handleClose}
          data={editOrder ? editOrder : ""}
          setUpdateOrder={setUpdateOrder}
        />
      )}
      {message && (
        <CustomizedSnackbars
          openBar={open}
          message={message}
          handleSnackBar={() => setOpen(false)}
        />
      )}
      <div className="order-screen-container">
        <div className="order-screen-top-section">
          <div className="order-search-input">
            <Input
              placeholder="Search Order"
              label="Search By Order"
              customWidth="170px"
              labelClass="search-order-label"
              value={inputValue?.search}
              id="search"
              name="razorpayOrderId"
              onHandleChange={(e: React.FormEvent<HTMLInputElement> | any) => {
                //setIsSearch(true);
                // setIsSearch(false);
                setIsDisbled(false);
                const {
                  target: { name, value },
                } = e;
                setIsUpdate((prevState: any) => ({
                  ...prevState,
                  [name]: value,
                }));
                handleChange(e);
              }}
            />
          </div>
          <div className="order-status-div">
            <DropdownComponent
              label="Status"
              fieldName="value"
              customWidth="100%"
              marginTop={0}
              menuItem={orderTableStatus}
              selectedValue={isUpdate?.orderStatus}
              isParent={true}
              // onHandleChange = {handleDropdownChange}
              getValue={(e: any) => {
                //setIsSearch(true);
                // setIsSearch(false);
                setIsDisbled(false);
                setIsUpdate((prevState: any) => ({
                  ...prevState,
                  ["orderStatus"]: e,
                }));
              }}
            // onHandleChange={(e: React.FormEvent<HTMLInputElement>) => {
            //   handleChange(e);
            // }}
            />
          </div>
          <div className="payment-status ">
            <DropdownComponent
              label="Payment Status"
              fieldName="value"
              customWidth="100%"
              marginTop={0}
              selectedValue={isUpdate.paymentStatus}
              isParent={true}
              menuItem={orderTablePaymentStatus}
              getValue={(e: any) => {
                setIsDisbled(false);
                setIsUpdate((prevState: any) => ({
                  ...prevState,
                  ["paymentStatus"]: e,
                }));
              }}
            />
          </div>
          <div className="start-div">
            <Input
              type="date"
              label="Start"
              id="startDate"
              labelClass="start-label"
              name="startDate"
              value={inputValue?.startDate || ""}
              onHandleChange={(e: React.FormEvent<HTMLInputElement> | any) => {
                //setIsSearch(true);
                // setIsSearch(false);
                setIsDisbled(false);
                const {
                  target: { name, value },
                } = e;
                setIsUpdate((prevState: any) => ({
                  ...prevState,
                  [name]: `${value}T00:00:00.000Z`,
                }));
                handleChange(e);
              }}
            />
          </div>
          <div className="end-div">
            <Input
              type="date"
              label="End"
              labelClass="end-lable"
              id="endDate"
              name="endDate"
              value={inputValue.endDate || ""}
              onHandleChange={(e: React.FormEvent<HTMLInputElement> | any) => {
                // setIsSearch(true);
                // setIsSearch(false);

                setIsDisbled(false);
                const {
                  target: { name, value },
                } = e;
                setIsUpdate((prevState: any) => ({
                  ...prevState,
                  [name]: `${value}T23:59:59.000Z`,
                }));
                handleChange(e);
              }}
            />
          </div>
          <div className="search-button">
            {isDisbled ? (
              <ButtonComponent
                // disabled={isDisbled}
                title="SEARCH"
                type="button"
              // onClick={onHandleSearch}
              />
            ) : (
              <ButtonComponent
                // disabled={isDisbled}
                title="SEARCH"
                type="button"
                onClick={onHandleSearch}
              />
            )}
          </div>
          <div className="cross-div">
            <img src={Image.crossBlack} alt="" onClick={() => Crossfild()} />
          </div>
        </div>
        {loader ? (
          <Loader />
        ) : (
          <div className="order-screen-table-container">
            <TableComponent
              headerTable={orderTableHeader}
              data={orderList}
              selectedData={status}
              isEditDelete={true}
              pagination={totalPage}
              onHandleDelete={handledelete}
              onHandleChangeSelect={handleChangeSelect}
              RowPerPageTable={(e: any) => setRowPerPage(e)}
              PageTable={(e: any) => setPage(e)}
              // onDataShow={onReciveMessage}
              setCancelOrder={setCancelOrder}
              pageSearch={isUpdate && 0}
              setIsSearch={setIsSearch}
              isSearch={isSearch}
              onHandleEdit={onHandleEdit}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default memo(OrderScreen);
