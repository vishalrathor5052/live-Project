import React, { memo, useEffect, useState } from "react";
import "./CakeItemModalStyle.css";
import ApiComponents from "../../constant/ApiComponents";
import CustomizedSnackbars from "../../utils/CustomizedSnackbars";
import Loader from "../../component/loader/Loader";
import { Box, Modal } from "@mui/material";
import Image from "../../constant/Image";
const CakeItemModal = ({
  data,
  isItem,
  onHandleClose,
  setUpdateProductOnAddItems,
}: any) => {
  const [Cake, setCake] = useState<any>([]);
  const [count, setCount] = useState(0);
  const [addItem, setAddItem] = useState<any>({});
  const [message, setMessage] = useState<string>();
  const [open, setOpen] = useState<boolean>(true);
  const [loader, setLoader] = useState(true);
  const [birtdaySpical, setBirtdaySpical] = useState<any>();
  const [CategoryId, setCategoryId] = useState(data?.id ? data?.id : 0);
  const onDataShow = async () => {
    await ApiComponents.productget().then((res: any) => {
      setCake(res?.data);
      setLoader(false);
    });
  };
  useEffect(() => {
    onDataShow();
  }, []);

  const handleSave = async (datas: any, payload: any) => {
    await ApiComponents.CreateCatogery(payload)
      .then(async (res: any) => {
        if (res?.response?.data?.message) {
          setMessage(res?.response?.data?.message);
          // dispatch(AddCategory(res?.response?.data?.message));
          setOpen(true);
          return;
        } else if (res?.message) {
          setCategoryId(res?.data?.id);
          onhandleaddCake(datas);
          setMessage(res?.message);
        }
      })
      .finally(() => {
        // setOpen(true);
        //onHandleAddItems(false);
      });
  };

  const AddButton = (datas: any, index: number) => {
    if (datas["productName"].includes(`[`)) {
      datas["productName"] = datas["productName"].split("[")[0];
      datas["productName"] = `${datas["productName"]}[${data?.categoryName}]`;
    } else {
      datas["productName"] = `${datas["productName"]}[${data?.categoryName}]`;
    }
    onhandleaddCake(datas);
    setUpdateProductOnAddItems && setUpdateProductOnAddItems(true);
  };

  const onhandleaddCake = (datas: any) => {
    setMessage("");
    setAddItem((prev: any) => ({ ...prev, [datas.id]: true }));
    // setCount(count + 1);
    ApiComponents.productaddCategory(CategoryId, datas).then((res: any) => {
      if (res?.response?.data?.message) {
        setMessage(res?.response?.data?.message);
        setOpen(true);
      } else {
        setMessage(res);
        setOpen(true);
      }
    });
  };

  useEffect(() => {
    let limit: any = 100;
    const offset = 0;
    ApiComponents.getBirthdaySpical(
      data?.id ? data?.id : CategoryId,
      limit,
      offset
    ).then((res: any) => {
      setBirtdaySpical(res?.data);
      setCount(res?.countProducts ? res?.countProducts : 0);
    });
  }, [message]);
  const handleClose = () => {};
  const closeCakeItem = () => {
    setUpdateProductOnAddItems && setUpdateProductOnAddItems(true);
    onHandleClose();
  };
  return (
    <>
      {message && (
        <CustomizedSnackbars
          openBar={open}
          message={message}
          handleSnackBar={() => setOpen(false)}
        />
      )}
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="cake-item-container">
          <div
            style={{
              background: "#313131",
              position: "relative",
              padding: "10px",
              textAlign: "center",
              color: "#FFFFFF",
              fontSize: "20px",
            }}
          >
            <h4>Item Cake</h4>
            <div
              style={{
                position: "absolute",
                right: "10px",
                top: "5px",
                cursor: "pointer",
              }}
            >
              <img src={Image.cross} alt="" onClick={() => closeCakeItem()} />
            </div>
          </div>
          <div className="cake-item-main">
            {loader ? (
              <div
                className="loader"
                style={{ position: "absolute", top: "50%", left: "45%" }}
              >
                <Loader />
              </div>
            ) : (
              <>
                {Cake?.map((data: any, index: number) => {
                  return (
                    <div className="cake-item-modal-container">
                      <div className="cake-item-left-content">
                        <div className="cake-item-sub-left-image">
                          <img
                            src={`http://34.200.195.34/upload/${data?.image}`}
                            alt=""
                            className="cake-item-img"
                          />
                        </div>
                        <div className="cake-item-sub-right-content">
                          <p className="chocolate-truffle">
                            {data?.productName}
                          </p>
                          <p className="chocolate-truffle">
                            ${data?.measurementDetails[0]?.productPrice}
                          </p>
                        </div>
                      </div>
                      <div className="cake-item-right-content">
                        <button
                          className="added-btn-cake-item"
                      
                          onClick={() => AddButton(data, index)}
                          disabled={(addItem[data?.id] ||birtdaySpical?.find(
                            (elm: any) => elm?.categoryId == data?.categoryId
                          ))  ?  true : false} 
                        >
                          {addItem[data?.id] ||
                          birtdaySpical?.find(
                            (elm: any) => elm?.categoryId == data?.categoryId
                          )
                            ? "Added"
                            : "Add"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
          <div className="birthday-special-button-div-modal">
            <div className="birthday-special-button-left-modal">
              <p className="item-added-pera-birthday">{count} Item Added</p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default memo(CakeItemModal);
