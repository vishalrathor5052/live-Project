import React, { useState, useCallback, useEffect, memo } from "react";
import ButtonComponent from "../button/ButtonComponent";
import Input from "../input/Input";
import "./style.css";
import ApiComponents from "../../constant/ApiComponents";
import axios from "axios";
import Button from "@mui/material/Button";
import CustomizedSnackbars from "../../utils/CustomizedSnackbars";
import ModalComponent from "../../component/modalComponent/ModalComponent";
import { useDispatch, useSelector } from "react-redux";
import { AddCategory, add } from "../../Store/CartSlice";
import Image from "../../constant/Image";
import { Box, Modal } from "@mui/material";
import AddonMoreBalloonsModal from "./AddonMoreBalloonsModal";
import defaultImg from "../../assets/Images/common/profile.png"
const AddonBalloonsModal = ({
  onHandleAddItems,

  onHandleClose,
  data,
  setUpdateOption,
}: any) => {
  const { userData } = useSelector((State: any) => State.trueCake);
  const { id, categoryId, type, productName, price, quantity, image } = data;
  const dispatch = useDispatch();
  const [dataOnMoreBallon, setdataOnMoreBallon] = useState<any>("");
  const [message, setMessage] = useState();
  const [open, setOpen] = useState(false);
  const [productprice, setPrice] = useState<number | any>(+price ? price : "");
  const [cnames, setCname] = useState(productName);
  const [quantitys, setQuantity] = useState<number | any>(
    +quantity ? quantity : ""
  );
  const [url, setUrl] = useState(image);
  const [imageUrls, setImageUrl] = useState<any>(image);
  const [isModal, setIsModal] = useState(false);
  const [ballonsId, setBallonsId] = useState();
  const [error, setError] = useState<Record<string, string | any>>({});
  const [isUpdate, setIsUpdate] = useState(false);
  const [addMoreOption, setAddMoreOption] = useState<boolean>(false);
  let addMore = false;
  const [isdone, setIsDone] = useState<boolean>(false);
  //uploadIMage..................................
  const newFile = useCallback(async (data: any) => {
    const formData: any = new FormData();
    formData.append("image", data);

    await axios
      .post(`http://34.200.195.34:7000/api/uploads`, formData)
      .then((res: any) => {
        setUrl(res?.data?.data.url);
        setIsUpdate((prevState: any) => ({
          ...prevState,
          ["image"]: res?.data?.data.url,
        }));
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
  //editProduct...................................................
  //create Addonsssss.....................................
  const handleSave = async (payload: any) => {
    setUpdateOption(true);
    setIsModal(false);
    await ApiComponents.productAdd(payload).then(async (res: any) => {
      if (res?.response?.data?.message) {
        setMessage(res?.response?.data?.message);
        dispatch(add(" " as never));
        setOpen(true);
      } else if (res?.data?.type == 2) {
        dispatch(AddCategory(res?.message));
        setUpdateOption(true);
        setMessage(res?.message);
        setOpen(true);

        onHandleClose();
        // onHandleAddItems(false, "addonsballoons");
      } else if (res?.data?.type == 3) {
        setBallonsId(res?.data?.id);
        setAddMoreOption(true);
        setIsModal(true);
        // AddItem(true);

        // setCname("");
        // setPrice(0);
        // setQuantity(0);
        // setImageUrl("");
      }
    });
  };

  useEffect(() => {
    if (dataOnMoreBallon) {
      setMessage(dataOnMoreBallon);
      setOpen(true);
    }
  }, []);
  //.........................createAddone type3.....................

  //......................EditAddone.....................

  const EditAddone = (payload: any, id: any) => {
    ApiComponents.AddonUpdate(payload, id).then((res: any) => {
      if (res?.response?.data?.message) {
        setMessage(res?.response?.data?.message);
        setOpen(true);
        // onHandleClose();
        return;
      } else {
        dispatch(AddCategory(res));
        setUpdateOption(true);
        onHandleClose();
        // onHandleAddItems(false, "addonsballoons");
      }
    });
  };

  const createItems = () => {
    if (isValidated()) {
      if (id) {
        if (Object.keys(isUpdate).length === 0) {
          onHandleClose();
          // onHandleAddItems(false);
          // dispatch(add({}));
        } else {
          EditAddone(isUpdate, id);
          return;
        }

        // const EditAddonPayload = {
        //   id: id,
        //   productName: cnames,
        //   price: +productprice,
        //   quantity: +quantitys,
        //   image: url,
        //   categoryId: 0,
        //   type: 2,
        // };
        // if (isUpdate) {
        //   EditAddone(EditAddonPayload);
        // } else {
        //   onHandleAddItems(false, "addonsballoons");
        // }
      } else if (ballonsId) {
        // setCname("");
        // setImageUrl("");
        // setUrl("");
        onHandleClose();
        return;
      } else {
        const payload = {
          productName: cnames?.trim(),
          price: +productprice,
          quantity: +quantitys,
          image: url,
          type: 2,
          categoryId: 0,
          unitsInStock: 0,
        };
        id ? setIsModal(true) : handleSave(payload);
      }
    }
  };

  const AddOptions = async () => {
    if (isValidated()) {
      const payloadAddon = {
        productName: cnames?.trim(),
        price: +productprice,
        quantity: quantitys,
        image: url,
        type: 3,
        categoryId: 0,
        unitsInStock: 0,
      };

      if (id) {
        setIsModal(true);
        return;
      } else if (addMoreOption === true) {
        setIsModal(true);
        return;
      } else {
        handleSave(payloadAddon);
      }

      // id ? setIsModal(true) : handleSave(payloadAddon);
      // setIsDone(true);
      // AddItem(true)
      // setIsModal(true)
    }
  };

  const handleClose = () => {
    setIsModal(false);
    // dispatch(add({}));
    // onHandleAddItems(false, "addonsballoons");
  };

  // const AddItem = (boolean: boolean) => {
  //   setIsModal(boolean);
  // };

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
    if (productprice < 1) {
      updateError.productprice = "This field is required.";
      isValid = false;
    } else if (/\s/.test(productprice)) {
      updateError.productprice = "This field is required.";
      isValid = false;
    }
    if (quantitys < 1) {
      updateError.quantitys = "This field is required.";
      isValid = false;
    } else if (/\s/.test(quantitys)) {
      updateError.quantitys = "This field is required.";
      isValid = false;
    }
    if (!imageUrls) {
      updateError.imageUrls = "This field is required.";
      isValid = false;
    }
    setError(updateError);
    return isValid;
  };

  const optionAdded = () => {
    handleClose();
  };

  // useEffect(() => {
  //   if (isdone === true) {
  //     setCname("");
  //     setPrice(0);
  //     setQuantity(0);
  //     setImageUrl("");
  //     setIsDone(false);
  //   }
  // }, [isdone]);
  const addon = useCallback(() => {
    setCname("");
    setPrice(0);
    setQuantity(0);
    setImageUrl("");
    setIsDone(false);
  }, []);

  const handleCancal = () => {
    onHandleClose();
  };

  // const handleData = () => {

  // };
  return (
    <>
      {open ? (
        <CustomizedSnackbars
          openBar={open}
          message={message}
          handleSnackBar={() => setOpen(false)}
        />
      ) : null}

      {isModal && (
        <AddonMoreBalloonsModal
          onHandleClose={handleClose}
          data={cnames}
          ballonIdValue={id ? id : ballonsId}
          setUpdateOption={setUpdateOption}
        />
      )}
      {/* {isModal && (
        <ModalComponent
          Children="addonMoreBalloonsModal"
          isModal={isModal}
          modaltitle={`Addons: ${cnames}`}
          addItems={(boolean: boolean) => AddItem(boolean)}
          ballonIdValue={id ? id : ballonsId}
          data={cnames}
          addon={addon}
          isadded={isdone}
          onDataShow={optionAdded}
        />
      )} */}
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
            <h4>Addons</h4>
            <div
              style={{
                position: "absolute",
                right: "10px",
                top: "5px",
                cursor: "pointer",
              }}
            >
              <img src={Image.cross} alt="" onClick={() => onHandleClose()} />
            </div>
          </div>
          <div className="addon-main-container">
            <div className="addon-left input-main">
              <div
                className="Addon"
                style={{ overflowY: "auto", maxHeight: "400px", height: "80%" }}
              >
                <Box sx={{ mb: 3 }}>
                  <Input
                    label="Name*"
                    name="productName"
                    placeholder="Name"
                    onHandleChange={(e: any) => {
                      const {
                        target: { name, value },
                      } = e;
                      setIsUpdate((prevState: any) => ({
                        ...prevState,
                        [name]: value,
                      }));
                      setError((prev) => ({ ...prev, cnames: "" }));
                      setCname(e.target.value);
                    }}
                    value={cnames}
                    error={error.cnames}
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Input
                    label="Price*"
                    type="number"
                    placeholder="Price"
                    name="price"
                    customStyles="input-box"
                    onHandleChange={(e: any) => {
                      const {
                        target: { name, value },
                      } = e;
                      setIsUpdate((prevState: any) => ({
                        ...prevState,
                        [name]: value,
                      }));
                      setError((prev) => ({ ...prev, productprice: 0 }));
                      setPrice(e.target.value);
                    }}
                    value={productprice}
                    error={error.productprice}
                    // disabled={types === 2 ? false : true}
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Input
                    label="Quantity*"
                    name="quantity"
                    type="number"
                    customStyles="input-box"
                    placeholder="Quantity"
                    onHandleChange={(e: any) => {
                      const {
                        target: { name, value },
                      } = e;
                      setIsUpdate((prevState: any) => ({
                        ...prevState,
                        [name]: value,
                      }));
                      setError((prev) => ({ ...prev, quantitys: 0 }));
                      setQuantity(e.target.value);
                    }}
                    value={quantitys}
                    error={error.quantitys}

                    // disabled={types === 2 ? false : true}
                  />
                </Box>
                <div className="Addons-image-lable">
                  <label>Add Cover Image*</label>
                </div>
                <div className="image-browse-main">
                  <div className="image-name-div">
                    <Input value={imageUrls} error={error.imageUrls} disabled />
                  </div>
                  <div className="browse-main-div">
                    <div>
                      <Button
                        variant="outlined"
                        component="label"
                        className="browser"
                      >
                        Browse
                        <input
                          hidden
                          accept="image/*"
                          multiple
                          type="file"
                          onChange={(e: any) => {
                            setError((prev) => ({ ...prev, imageUrls: "" }));
                            hadleFile(e);
                          }}
                        />
                      </Button>
                      {/* </Box> */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="addon-cancal-save-button">
                <div className="addon-cancal-div">
                  <ButtonComponent
                    type="button"
                    title="CANCEL"
                    onClick={handleCancal}
                    customStyles={{
                      background: "white",
                      border: "1px solid #F8D40C !important",
                      marginRight: "10px",
                    }}
                  />
                </div>
                <div className="addon-save-div">
                  <ButtonComponent
                    type="button"
                    title="SAVE"
                    // onClick={handleData}
                    // onClick={() => console.log("savs")}
                    onClick={() => createItems()}
                  />
                </div>
              </div>
            </div>

            <div className="addon-balloon-modal-right">
              {id && type === 2 ? null : (
                <ButtonComponent
                  type="button"
                  title="ADD OPTIONS"
                  customStyles={{
                    marginBottom: "30px",
                    border: "1px solid #F8D40C !important",
                  }}
                  onClick={() => AddOptions()}
                />
              )}
              <div
                className={
                  id && type === 2 ? "image-type2-continer" : "image-container"
                }
              >
                  <img
                    style={{
                      width: "100%",
                      borderRadius: "5px",
                      height: "100%",
                      objectFit: "cover",
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

export default memo(AddonBalloonsModal);
