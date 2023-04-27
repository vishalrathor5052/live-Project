import React, { memo, useCallback, useEffect, useState } from "react";
import ButtonComponent from "../button/ButtonComponent";
import Input from "../input/Input";
import "./style.css";
import axios from "axios";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import ApiComponents from "../../constant/ApiComponents";
import Image from "../../constant/Image";
import { add, AddCategory } from "../../Store/CartSlice";
import CustomizedSnackbars from "../../utils/CustomizedSnackbars";
import moment from "moment";
import { Box, Modal } from "@mui/material";
import defaultImg from "../../assets/Images/common/profile.png";
const CreateOfferComponentModal = ({
  onHandleAddItems,
  onHandleClose,
  data,
}: any) => {
  const { userData } = useSelector((State: any) => State?.trueCake);
  const {
    id,
    offerCode,
    image,
    offerCategory,
    offerAmount,
    price,
    userLimit,
    status,
    createdAt,
    endDate,
    offer,
    minPrice,
  } = data;
  var offerdata = offer?.replace("%", "");
  const [message, setMessage] = useState();
  const [url, setUrl] = useState(image);
  const [imageUrls, setImageUrl] = useState(image);
  const [offers, setOfferCode] = useState(offerCode);
  const [offerCategorys, setOfferCategory] = useState<any>(offerCategory ?? 1);
  const [prices, setPrice] = useState<any>(
    +offerCategorys == 1 ? +price : +offerCategorys == 2 ? +minPrice : ""
  );
  const [UsageLimit, setUsageLimit] = useState<any>(userLimit ? userLimit : "");
  const [statuss, setStatus] = useState(status ?? 1);
  const [error, setError] = useState<Record<string, string | any>>({});
  const [inputValue, setInputValue] = useState<Record<string, string | any>>({
    startDate: moment(createdAt).format("YYYY-MM-DD"),
    endDate: moment(endDate).format("YYYY-MM-DD"),
  });
  const [isUpdate, setIsUpdate] = useState<any>({});
  const [offerPrice, setOfferPrice] = useState<any>(
    +offerdata ? +offerdata : ""
  );
  const [open, setOpen] = useState<boolean>(false);
  const [minPrices, setMinPrice] = useState(+minPrice ? +minPrice : "");
  console.log("minPrices", minPrices);
  const dispatch = useDispatch();
  const payload = {
    offerCode: offers?.trim(),
    offerCategory: Number(offerCategorys),
    offerAmount: +offerPrice,
    price: +offerCategorys == 2 ? +minPrices : +prices,
    minPrice: +offerCategorys == 2 ? +prices : +minPrices,
    userLimit: +UsageLimit,
    status: Number(statuss),
    startDate: inputValue?.startDate,
    endDate: inputValue?.endDate,
  };
  const Editpayload = {
    offerCode: offers?.trim(),
    offerCategory: Number(offerCategorys),
    offerAmount: +offerPrice,
    price: +offerCategorys == 2 ? +minPrices : +prices,
    minPrice: +offerCategorys == 2 ? +prices : +minPrices,
    userLimit: +UsageLimit,
    status: Number(statuss),
    startDate: inputValue?.startDate,
    endDate: inputValue?.endDate,
  };

  //   useEffect(()=>{
  // if(offerCategory == 2){
  //   setPrice("")
  // }
  //   },[offerCategory])
  //image.........open

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
        setMessage(res?.data?.message);
      })
      .catch((err) => console.log(err));
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
  //image........close
  //category......................Dropdowm.............open

  const CreateOffer = async (payload: any) => {
    await ApiComponents.createOffer(payload).then((res: any) => {
      if (res?.response?.data?.message) {
        setMessage(res?.response?.data?.message);
        dispatch(add(" " as never));
        setOpen(true);
      } else {
        // setMessage(res);
        // setOpen(true);
        dispatch(AddCategory(res?.message));
        onHandleClose();
        // onHandleAddItems(false);
      }
    });
  };

  //edit offer.......................................
  const handleEdit = (editPayload: any, id: any) => {
    ApiComponents.OfferUpdate(editPayload, id).then((res: any) => {
      if (res?.response?.data?.message) {
        setMessage(res?.response?.data?.message);
        setOpen(true);
      } else {
        dispatch(AddCategory(res));
        onHandleClose();
        // dispatch(add({}));
        // onHandleAddItems(false);
      }
    });
  };

  //category......................Dropdowm..........close
  const handleChange = (e: any) => {
    setInputValue((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    // setSearch(e.target.value);
  };

  const handleClose = () => {
    onHandleClose();
  };
  const handleSaveEdit = () => {
    if (isValidated()) {
      if (id) {
        if (Object.keys(isUpdate).length === 0) {
          onHandleClose();
          // dispatch(add({}));
          // onHandleAddItems(false);
        } else {
          handleEdit(Editpayload, id);
        }
      } else {
        if (isUpdate) {
          CreateOffer(payload);
        }
        // onHandleAddItems(false);
      }
    }
  };

  /**
   * @description validation
   * @returns
   */
  const isValidated = () => {
    let isValid = true;
    let updateError = { ...error };
    if (!offers) {
      updateError.offers = "This field is required";
      isValid = false;
    } else if (offers.trim().length === 0) {
      updateError.offers = "This field is required";
      isValid = false;
    }
    if (!offerPrice) {
      updateError.offerPrice = "This field is required.";
      isValid = false;
    }
    if (!minPrices) {
      updateError.minPrices = "This field is required.";
      isValid = false;
    }
    if (!UsageLimit) {
      updateError.UsageLimit = "This field is required.";
      isValid = false;
    }
    if (!imageUrls) {
      updateError.imageUrls = "This field is required.";
      isValid = false;
    }
    if (offerPrice < 1) {
      updateError.offerPrice = "Offer price should be greater than 0";
      isValid = false;
    }
    if (+minPrices < +offerPrice) {
      updateError.minPrices =
        "Minimum order value should be grater than offer amount.";
      isValid = false;
    }
    if (UsageLimit < 1) {
      updateError.UsageLimit = "User limit should be greater than 0";
      isValid = false;
    }
    if (offerCategorys == 2 && offerPrice > 99) {
      updateError.offerPrice = "Offer percentage should be lower than 100%.";
      isValid = false;
    }
    if (offerCategorys == 2 && +minPrice < +offerPrice) {
      updateError.prices = "Price should be grater than offer Price.";
      isValid = false;
    }
    if (offerCategorys == 2 && +prices > +minPrices) {
      updateError.prices =
        "Maximum discount should be less than minimum order value ";
      isValid = false;
    }

    // if (offerCategorys == 2 && +minPrices > +prices) {
    //   updateError.minPrices = "Min price should be lower than max price.";
    //   isValid = false;
    // }
    if (inputValue?.startDate >= inputValue?.endDate) {
      updateError.endDate = "End date should be grater than start date.";
      isValid = false;
    }
    if (!offerCategorys) {
      updateError.offerCategorys = "This field is required.";
      isValid = false;
    }
    setError(updateError);
    return isValid;
  };

  const HandleMinPrice = (e: any) => {
    const {
      target: { name, value },
    } = e;
    setIsUpdate((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
    setMinPrice(e.target.value);
    if (+minPrice < +offerAmount) {
      setError((prev) => ({
        ...prev,
        minPrices: "Offer amount should be less than minimum order value",
      }));
    } else {
      setError((prev) => ({ ...prev, minPrices: "" }));
    }
  };

  return (
    <>
      {open && (
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
        <div className="OfferModal-container">
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
            y<h4>Create Offers</h4>
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
          <div className="create-offer-container-modal">
            <div className="create-offer-left-section-modal">
              <div
                className="boxitem"
                style={{
                  overflowY: "auto",
                  maxHeight: "500px",
                  height: "80%",
                  overflowX: "hidden",
                }}
              >
                <Input
                  label="Offer Code*"
                  value={offers}
                  placeholder="Offer Code"
                  name="offerCode"
                  onHandleChange={(e: any) => {
                    const {
                      target: { name, value },
                    } = e;
                    setIsUpdate((prevState: any) => ({
                      ...prevState,
                      [name]: value,
                    }));
                    setError((prev) => ({ ...prev, offers: "" }));
                    setOfferCode(e.target.value);
                  }}
                  error={error.offers}
                />
                <Box sx={{ mt: 3, width: "94%", ml: 2.5 }}>
                  <label>Offer Type*</label>
                  <select
                    name="offerCategory"
                    onChange={(e: any) => {
                      const {
                        target: { name, value },
                      } = e;
                      setIsUpdate((prevState: any) => ({
                        ...prevState,
                        [name]: value,
                      }));

                      setOfferCategory(e.target.value);
                      setError((prev) => ({ ...prev, offerCategorys: "" }));
                    }}
                    className="offer-select-category"
                    style={{ width: "100%" }}
                    value={offerCategorys}
                  >
                    <option value={1}>Flat</option>
                    <option value={2}>Percentage(%)</option>
                  </select>
                  <p style={{ color: "red" }}>{error.offerCategorys}</p>
                </Box>
                {offerCategorys ? (
                  <Box sx={{ mt: 3 }}>
                    <Input
                      customStyles="input-box"
                      type="number"
                      name="offerAmount"
                      label={
                        offerCategorys == 1
                          ? "Offer Amount*"
                          : "Offer Percentage(%)*"
                      }
                      placeholder={
                        offerCategorys == 1
                          ? "Offer Amount"
                          : "Offer Percentage(%)"
                      }
                      onHandleChange={(e: any) => {
                        const {
                          target: { name, value },
                        } = e;
                        setIsUpdate((prevState: any) => ({
                          ...prevState,
                          [name]: value,
                        }));
                        setError((prev) => ({
                          ...prev,
                          offerPrice: "",
                          minPrices: "",
                        }));
                        setOfferPrice(e.target.value);
                      }}
                      value={offerPrice}
                      error={error?.offerPrice}
                    />
                  </Box>
                ) : null}
                <Box sx={{ mt: 3 }}>
                  <Input
                    label="Minimum Order Value(MOV)*"
                    name="minPrice"
                    type="number"
                    value={minPrices}
                    placeholder="Minimum order value"
                    customStyles="input-box"
                    onHandleChange={(e: any) => {
                      const {
                        target: { name, value },
                      } = e;
                      setIsUpdate((prevState: any) => ({
                        ...prevState,
                        [name]: value,
                      }));
                      setError((prev) => ({
                        ...prev,
                        minPrices: "",
                        prices: "",
                      }));
                      setMinPrice(e.target.value);
                    }}
                    error={error?.minPrices}
                  />
                </Box>
                <Box sx={{ mt: 3 }}>
                  {offerCategorys == 2 ? (
                    <Input
                      label="Maximum Discount*"
                      name="price"
                      type="number"
                      value={prices}
                      placeholder="Maximum discount"
                      customStyles="input-box"
                      onHandleChange={(e: any) => {
                        const {
                          target: { name, value },
                        } = e;
                        setIsUpdate((prevState: any) => ({
                          ...prevState,
                          [name]: value,
                        }));
                        setError((prev) => ({ ...prev, prices: "" }));
                        setPrice(e.target.value);
                      }}
                      error={error?.prices}
                    />
                  ) : null}
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Input
                    label="User Limit*"
                    name="userLimit"
                    type="number"
                    placeholder="User Limits"
                    onHandleChange={(e: any) => {
                      const {
                        target: { name, value },
                      } = e;
                      setIsUpdate((prevState: any) => ({
                        ...prevState,
                        [name]: value,
                      }));
                      setError((prev) => ({ ...prev, UsageLimit: "" }));
                      setUsageLimit(e.target.value);
                    }}
                    value={UsageLimit}
                    error={error?.UsageLimit}
                    customStyles="input-box"
                  />
                </Box>
                <Box sx={{ mt: 3, width: "94%", ml: 2.5 }}>
                  <label>Status*</label>
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
                      setStatus(e.target.value);
                    }}
                    className="offer-status-dropdown"
                    style={{ width: "100%" }}
                    value={statuss}
                  >
                    <option>Select Option*</option>
                    <option value={1}>active</option>
                    <option value={2}>inactive</option>
                  </select>
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Input
                    type="date"
                    label="Start Date*"
                    id="startDate"
                    labelClass="start-label"
                    name="startDate"
                    value={
                      inputValue?.startDate
                        ? inputValue?.startDate
                        : moment(createdAt).format("YYYY-MM-DD")
                    }
                    onHandleChange={(
                      e: React.FormEvent<HTMLInputElement> | any
                    ) => {
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
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Input
                    type="date"
                    label="End Date*"
                    id="endDate"
                    labelClass="start-label"
                    name="endDate"
                    error={error?.endDate}
                    value={
                      inputValue.endDate
                        ? inputValue.endDate
                        : moment(endDate).format("YYYY-MM-DD")
                    }
                    onHandleChange={(
                      e: React.FormEvent<HTMLInputElement> | any
                    ) => {
                      const {
                        target: { name, value },
                      } = e;
                      setIsUpdate((prevState: any) => ({
                        ...prevState,
                        [name]: value,
                      }));
                      handleChange(e);
                      setError((prev) => ({ ...prev, endDate: "" }));
                    }}
                  />
                </Box>
                <div className="image-lable-div">
                  <label>Add Cover Image*</label>
                </div>
                <div className="image-browser-main-div">
                  <div className="image-name-input">
                    <Input
                      type="text"
                      value={imageUrls}
                      error={error.imageUrls}
                      disabled
                    />
                  </div>
                  <div className="browser-button-div">
                    <Button
                      variant="outlined"
                      component="label"
                      className="browse-modal"
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
                        className="browse-add-item"
                      />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="save-cancle-button">
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
                  title="CREATE"
                  onClick={() => handleSaveEdit()}
                />
              </div>
            </div>
            <div className="create-offer-right-section-modal">
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
      </Modal>
    </>
  );
};

export default memo(CreateOfferComponentModal);
