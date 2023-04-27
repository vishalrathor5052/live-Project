import React, { useState, useEffect, useCallback, memo } from "react";
import ButtonComponent from "../button/ButtonComponent";
import Input from "../input/Input";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import "./createCategoryModalStyle.css";
import ApiComponents from "../../constant/ApiComponents";
import axios from "axios";
import CustomizedSnackbars from "../../utils/CustomizedSnackbars";
import Image from "../../constant/Image";
import { add, AddCategory } from "../../Store/CartSlice";
import { Link } from "react-router-dom";
import { Box, Modal } from "@mui/material";
import CakeItemModal from "../birthdayspecialcomponent/CakeItemModal";
import defaultImg from "../../assets/Images/common/profile.png"
const CreateCategoryModal = ({
  onHandleAddItems,
  isModals,
  data,
  onHandleClose,
  setUpdateProductOnAddItems,
}: any) => {
  // const { userData, closePopup } = useSelector((State: any) => State.trueCake);

  const dispatch = useDispatch();
  const { id, categoryName, status, image, sortOrderId }: any = data || {};

  const [url, setUrl] = useState<any>(image);
  const [cname, setCname] = useState<string>(categoryName);
  const [imageUrl, setImageUrl] = useState<any>(image);
  const [statuss, setStatus] = useState<number>(status);
  const [message, setMessage] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [isModal, setIsModal] = useState(false);
  const [error, setError] = useState<Record<string, string | any>>({});
  const [categoryId, setCategoryId] = useState<any>();
  const [sort, setShort] = useState<any>(sortOrderId);
  const [isUpdate, setIsUpdate] = useState<any>({});
  const [isdone, setIsDone] = useState<boolean>(false);
  const [addMoreProduct, setAddMore] = useState<boolean>(false);
  let addMore = false;
  const handleSnackBar = () => {
    setOpen(false);
  };

  const heandleStatus = (e: any) => {
    setStatus(e);
  };
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

  //................createCatogery Api..............................................
  const handleSave = async (payload: any) => {
    await ApiComponents.CreateCatogery(payload)
      .then(async (res: any) => {
        if (res?.response?.data?.message) {
          setMessage(res?.response?.data?.message);
          // dispatch(AddCategory(res?.response?.data?.message));
          setOpen(true);
          return;
        } else if (res?.message) {
          if (addMore) {
            setIsModal(true);
            setAddMore(true);
            setCategoryId(res?.data);
          } else {
            setMessage(res?.message);
            dispatch(AddCategory(res?.message));
            isModals(false);
            onHandleAddItems(false);
          }
        }
      })
      .finally(() => {
        // setOpen(true);
        //onHandleAddItems(false);
      });
  };
  //.............updateCatogery Api........................................
  const handleEdit = async (editPayload: any, id: any) => {
    await ApiComponents.categoryUpdate(editPayload, id)
      .then((res: any) => {
        if (res?.response?.data?.message) {
          setMessage(res?.response?.data?.message);
          setOpen(true);
        } else {
          setMessage(res);
          dispatch(AddCategory(res));
          setOpen(true);
          onHandleClose();
        }
      })
      .finally(() => {
        dispatch(add(" " as never));
      });
  };

  const handleSaveEdit = async () => {
    if (isValidated()) {
      if (id) {
        if (Object.keys(isUpdate).length === 0) {
          // setCname("");
          // setImageUrl("");
          // setUrl("");
          // dispatch(add({}));
          onHandleClose();
        } else {
          handleEdit(isUpdate, id);
        }
      } else if (categoryId) {
        // setCname("");
        // setImageUrl("");
        // setUrl("");
        onHandleClose();
        return;
      } else {
        const payload = {
          categoryName: cname.trim(),
          image: url,
          status: statuss,
          measureUnit: 0,
        };
        handleSave(payload);
        //isModals(false);
        // onHandleAddItems(false);
      }
    }
  };

  const handleClose = () => {
    setIsModal(false);
    // setCname("");
    // setShort("");
    // setImageUrl("");
    // setUrl("");
    dispatch(add(" " as never));
    // dispatch(PopupOpenClose({ categeory: false }));
  };
  // useEffect(() => {
  //   if (closePopup) {
  //     onHandleAddItems(false);
  //   }
  // }, [closePopup]);

  /**
   * @description validation...
   * @returns
   */
  const isValidated = () => {
    let isValid = true;
    let updateError = { ...error };
    if (!cname) {
      updateError.cname = "This field is required.";
      isValid = false;
    }
    else if (cname.trim().length === 0) {
      updateError.cname = "This field is required.";
      isValid = false;
    }
    if (!imageUrl) {
      updateError.imageUrl = "This field is required.";
      isValid = false;
    }
    setError(updateError);
    return isValid;
  };
  const AddItem = (boolean: boolean) => {
    setIsModal(boolean);
  };

  const onHandleAddItemspopup = () => {
    if (isValidated()) {
      const payload = {
        categoryName: cname.trim(),
        image: url,
        status: statuss,
        measureUnit: 0,
      };
      if (id) {
        setIsModal(true);
        return;
      } else if (addMoreProduct === true) {
        setIsModal(true);
        return;
      } else {
        addMore = true;
        handleSave(payload);
      }

      // addMore = true;
      // id ? setIsModal(true) : handleSave(payload);
    }
  };

  /**
   * closePopup Autometiclly
   */
  // const optionAdded = () => {
  //   setConfirmPopUp("updated");
  //   handleClose();
  // };
  const addon = useCallback(() => {
    // setCname("");
    // setImageUrl("");
    // setUrl("");
    setIsDone(false);
  }, []);
  const handleCancal = () => {
    onHandleClose();
  };
  const onClosecrossPopup = () => {
    onHandleClose();
  };
  return (
    <>
      {open && (
        <CustomizedSnackbars
          openBar={open}
          message={message}
          handleSnackBar={() => handleSnackBar()}
        />
      )}
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="create-container">
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
            <h4>Create Category</h4>
            <div
              style={{
                position: "absolute",
                right: "10px",
                top: "5px",
                cursor: "pointer",
              }}
            >
              <img
                src={Image.cross}
                alt=""
                onClick={() => onClosecrossPopup()}
              />
            </div>
          </div>
          <div className="Modal-main-container">
            <div className="left-div">
              <div className="input-field">
                <Input
                  label="Name*"
                  type="text"
                  name="categoryName"
                  onHandleChange={(e: any) => {
                    const {
                      target: { name, value },
                    } = e;
                    setIsUpdate((prevState: any) => ({
                      ...prevState,
                      [name]: value,
                    }));
                    // setIsUpdate({ value: true, property: "categoryName" });
                    setError((prev) => ({ ...prev, cname: "" }));
                    setCname(e.target.value);
                  }}
                  value={cname}
                  error={error?.cname}
                />
              </div>
              <div className="input-field">
                {id && (
                  <Input
                    label="Sort"
                    name="sortOrderId"
                    type="number"
                    customStyles="sortinput"
                    onHandleChange={(e: any) => {
                      const {
                        target: { name, value },
                      } = e;
                      setIsUpdate((prevState: any) => ({
                        ...prevState,
                        [name]: value,
                      }));
                      setShort(e.target.value);
                    }}
                    value={sort}
                  />
                )}
              </div>
              <div className="status-lable">
                <label>Status*</label>
              </div>
              <div className="input-field">
                <select
                  name="status"
                  onChange={(e: any) => {
                    const {
                      target: { name, value },
                    } = e;
                    setIsUpdate((prevState: any) => ({
                      ...prevState,
                      [name]: value,
                    }));
                    // setIsUpdate({ value: true, property: "status" });
                    heandleStatus(e.target.value);
                  }}
                  className="select-status"
                  style={{ width: "93%", height: "45px" }}
                  value={statuss}
                >
                  <option value={1} style={{ fontWeight: "bold" }}>
                    Active
                  </option>
                  <option value={2} style={{ fontWeight: "bold" }}>
                    Inactive
                  </option>
                </select>
              </div>
              <div className="img-field">
                <label style={{ marginLeft: "4%" }}>Add Cover Image*</label>
                <div className="image-sub-div">
                  <div className="img-input">
                    <Input
                      name="ImageUrl"
                      value={imageUrl}
                      error={error.imageUrl}
                      disabled
                    />
                  </div>
                  <div className="brower-button">
                    <Button
                      variant="outlined"
                      className="browse-modal"
                      component="label"
                    >
                      Browse
                      <input
                        hidden
                        accept="image/*"
                        multiple
                        type="file"
                        name="image"
                        onChange={(e: any) => {
                          // setIsUpdate({ value: true, property: "image" });
                          setError((prev) => ({ ...prev, imageUrl: "" }));
                          hadleFile(e);
                        }}
                      />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="add-more-div">
                <Link
                  to={""}
                  className="add-product-link"
                  onClick={onHandleAddItemspopup}
                >
                  + Add Cake
                </Link>
              </div>

              <div className="cancal-save-button">
                <div className="cancal-button">
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
                <div className="save-button">
                  <ButtonComponent
                    type="button"
                    title="SAVE"
                    onClick={() => handleSaveEdit()}
                  />
                </div>
              </div>
            </div>
            <div className="right-div">
              <div className="image-box">
                  <img
                    style={{
                      width: "100%",
                      borderRadius: "5px",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    src={url ?  `http://34.200.195.34/upload/${url}` : defaultImg }
                    alt=""
                  />
              </div>
            </div>
          </div>
        </div>
      </Modal>
      {isModal && (
        <CakeItemModal
          onHandleClose={handleClose}
          data={categoryId ? categoryId : data}
          setUpdateProductOnAddItems={setUpdateProductOnAddItems}
        />
      )}
      {/* {isModal && (
        <ModalComponent
          Children="cakeitemmodal"
          isModal={setIsModal}
          modaltitle="Item Cake"
          addItems={(boolean: boolean) => AddItem(boolean)}
          data={categoryId ? categoryId : data}
          // onDataShow={optionAdded}
          // setConfirmPopUp={setConfirmPopUp}
          // crossPopup={cross}
          // addmore={addMore}
          addon={addon}
          isadded={isdone}
        />
      )} */}
    </>
  );
};

export default memo(CreateCategoryModal);
