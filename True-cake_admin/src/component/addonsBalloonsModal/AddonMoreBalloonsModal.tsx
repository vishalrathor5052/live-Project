import React, { useState, useCallback, memo } from "react";
import ButtonComponent from "../button/ButtonComponent";
import Input from "../input/Input";
import "./style.css";
import ApiComponents from "../../constant/ApiComponents";
import axios from "axios";
import Button from "@mui/material/Button";
import CustomizedSnackbars from "../../utils/CustomizedSnackbars";
import { Box, Link, Modal } from "@mui/material";
// import {useSelector } from "react-redux";
import DropdownComponent from "../dropdownComponent/DropdownComponent";
import Image from "../../constant/Image";
import defaultImg from "../../assets/Images/common/profile.png";
const AddonMoreBalloonsModal = ({
  onHandleAddItems,
  ballonIdValue,
  data,
  onDataShow,
  onHandleClose,
  setUpdateOption,
}: any) => {
  // var optionDropDown:any= [];
  // const { userData } = useSelector((State: any) => State.trueCake);
  // const { id, categoryId, type, productName, productPrice, quantity, image } =
  //   userData;
  const [message, setMessage] = useState();
  const [open, setOpen] = useState(false);
  const [price, setPrice] = useState<any>("");
  const [cnames, setCname] = useState<any>();
  const [quantitys, setQuantity] = useState<any>("");
  const [url, setUrl] = useState<any>();
  const [imageUrls, setImageUrl] = useState<any>();
  const [count, setCount] = useState<number>(0);
  const [optionDropDown, setOptionDropDown] = useState<any>([]);
  const [error, setError] = useState<Record<string, string | any>>({});
  let popupValues = false;
  const handleSnackBar = () => {
    setOpen(false);
  };
  const AddMorePayload = {
    productId: ballonIdValue,
    name: cnames?.trim(),
    price: price,
    quantity: quantitys,
    image: url,
    type: 3,
  };

  //uploadIMage..................................
  const newFile = useCallback(async (data: any) => {
    const formData: any = new FormData();
    formData.append("image", data);

    await axios
      .post(`http://34.200.195.34:7000/api/uploads`, formData)
      .then((res: any) => {
        setUrl(res?.data?.data.url);
      })
      .catch((err) => console.log("err", err));
  }, []);

  const hadleFile = (e: any) => {
    setImageUrl(e.target.files[0].name);
    // newFile(e.target.files[0]);
    const file = e.target.files[0];
    let files = e.target.files[0];

    const extenstion = file.name.substring(file.name.indexOf("."));

    const date = new Date();
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();
    const hour = date.getHours().toString();
    const minute = date.getMinutes().toString();
    const second = date.getSeconds().toString();

    const changedFileName =
      year + month + day + hour + minute + second + extenstion;

    // try{
    files = new File([file], changedFileName, { type: file.type });
    // }
    newFile(files);
  };
  //.........................createAddone type3.....................

  const createItems = () => {
    if (isValidated()) {
      popupValues = false;
      handleAddone(AddMorePayload);
    }
  };

  const handleAddMore = () => {
    if (isValidated()) {
      popupValues = true;
      handleAddone(AddMorePayload);
    }
  };
  const handleAddone = (payload: any) => {
    if (isValidated()) {
      ApiComponents.createAddon(payload).then((res: any) => {
        if (res?.response?.data?.message) {
          setOpen(true);
          setMessage(res?.response?.data?.message);
        } else {
          setOptionDropDown((prev: any) => [...prev, { cnames: cnames }]);
          setCount(count + 1);
          setOpen(true);
          setUpdateOption(true);
          setMessage(res);
          setCname("");
          setPrice("");
          setQuantity("");
          setImageUrl("");
          setUrl("");
          if (!popupValues) {
            onHandleClose();
          }
        }
      });
    }
  };
  const handleClose = () => {
    onHandleClose();
    setUpdateOption(true);
    // onHandleAddItems(false, "addonMoreBalloonsModal");
    // onHandleAddItems(false, "addonsballoons");
  };

  /**
   * @description validation...
   * @returns
   */
  const isValidated = () => {
    let isValid = true;
    let updateError = { ...error };
    if (!cnames) {
      updateError.cnames = "This field is required.";
      isValid = false;
    } else if (cnames.trim().length === 0) {
      updateError.cnames = "This field is required.";
      isValid = false;
    }
    if (!imageUrls) {
      updateError.imageUrls = "This field is required.";
      isValid = false;
    }
    if (price < 1) {
      updateError.price = "This field is required.";
      isValid = false;
    } else if (/\s/.test(price)) {
      updateError.price = "This field is required.";
      isValid = false;
    }
    if (quantitys < 1) {
      updateError.quantitys = "This field is required.";
      isValid = false;
    } else if (/\s/.test(quantitys)) {
      updateError.quantitys = "This field is required.";
      isValid = false;
    }
    setError(updateError);
    return isValid;
  };
  const closeCakeItem = () => {
    setUpdateOption && setUpdateOption(true);
    onHandleClose();
  };
  return (
    <>
      {open ? (
        <CustomizedSnackbars
          openBar={open}
          message={message}
          handleSnackBar={() => handleSnackBar()}
        />
      ) : null}
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="Addon-Container">
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
            <h4>Addons: {data} </h4>
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

          <div>
            {count ? (
              <div style={{ marginBottom: "10px", marginLeft: "40px" }}>
                <DropdownComponent
                  fieldName="cnames"
                  customWidth="90%"
                  //editData={cnames}
                  menuItem={optionDropDown}
                  marginTop="0px"
                />
              </div>
            ) : null}
            <div className="addon-balloon-modal-container">
              <div className="addon-balloon-modal-left">
                <div
                  className="Addon"
                  style={{
                    overflowY: "auto",
                    maxHeight: "400px",
                    height: "65%",
                    paddingBottom: "3px",
                    // width: "600px",
                  }}
                >
                  <Box sx={{ mb: 3 }}>
                    <Input
                      label="Name *"
                      placeholder="Name"
                      onHandleChange={(e: any) => {
                        setError((prev) => ({ ...prev, cnames: "" }));
                        setCname(e.target.value || "");
                      }}
                      value={cnames}
                      error={error.cnames}
                    />
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Input
                      label="Price *"
                      type="number"
                      placeholder="Price"
                      onHandleChange={(e: any) => {
                        setError((prev) => ({ ...prev, price: "" }));
                        setPrice(e.target.value);
                      }}
                      value={price || ""}
                      error={error?.price}
                      customStyles="inputQunity"
                    />
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Input
                      label="Quantity *"
                      type="number"
                      placeholder="Quantity"
                      onHandleChange={(e: any) => {
                        setError((prev) => ({ ...prev, quantitys: "" }));
                        setQuantity(e.target.value);
                      }}
                      value={quantitys || ""}
                      error={error?.quantitys}
                      customStyles="inputQunity"
                    />
                  </Box>
                  <div className="option-image-lable">
                    <label>Add Cover Image *</label>
                  </div>
                  <div className="option-image-browse-main">
                    <div className="option-image-name-div">
                      <Input
                        value={imageUrls}
                        disabled
                        error={error.imageUrls}
                      />
                    </div>
                    <div className=" option-browse-main-div">
                      <Button
                        variant="outlined"
                        component="label"
                        className="browser"
                      >
                        Browser
                        <input
                          hidden
                          accept="image/*"
                          multiple
                          type="file"
                          onChange={(e: any) => {
                            setError((prev) => ({
                              ...prev,
                              imageUrls: "",
                            }));
                            hadleFile(e);
                          }}
                        />
                      </Button>
                    </div>
                  </div>
                </div>
                <Box sx={{ ml: 2 }} className="add-more-link">
                  <p onClick={() => handleAddMore()}>+Add More {data}</p>
                </Box>
                <div style={{ position: "relative", left: "85%" }}>
                  {count ? <Link> {count} Items added</Link> : null}
                </div>
                <div className="option-cancal-save-div">
                  <ButtonComponent
                    type="button"
                    title="CANCEL"
                    onClick={handleClose}
                    customStyles={{
                      background: "white",
                      border: "1px solid #F8D40C !important",
                    }}
                  />
                  <ButtonComponent
                    type="button"
                    title="SAVE"
                    onClick={() => createItems()}
                  />
                </div>
              </div>

              <div className="addon-balloon-modal-right">
                <img
                  style={{
                    width: "100%",
                    borderRadius: "5px",
                    height: "288px",
                    marginTop: "53px",
                    border: "0.5px solid #f8d40c",
                  }}
                  src={url ? `http://34.200.195.34/upload/${url}` : defaultImg}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default memo(AddonMoreBalloonsModal);
