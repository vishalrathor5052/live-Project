import React, { useCallback, useState, useEffect, memo } from "react";
import ButtonComponent from "../button/ButtonComponent";
import DropdownComponent from "../dropdownComponent/DropdownComponent";
import Input from "../input/Input";
import Button from "@mui/material/Button";
import "./AddItemProductStyle.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import ApiComponents from "../../constant/ApiComponents";
import CustomizedSnackbars from "../../utils/CustomizedSnackbars";
import ModalComponent from "../../component/modalComponent/ModalComponent";
import { add, AddCategory } from "../../Store/CartSlice";
import Image from "../../constant/Image";
import { Box, Modal } from "@mui/material";
import AddLabelModal from "./AddLabelModal";
import defaultImg from "../../assets/Images/common/profile.png"
const AddItemCreateProductModal = ({
  isClose,
  onHandleAddItems,
  data,
  onHandleClose,
}: any) => {
  let editProduct = useSelector((State: any) => State.trueCake);
  let { labelName, userData, productData } = editProduct;

  const dispatch = useDispatch();
  const {
    id,
    categoryId,
    type,
    productName,
    productDescription,
    productPrice,
    quantity,
    image,
    unitsInStock,
    measurementDetails,
    lableDetails,
    categoryProductDetails,
    sortOrderId,
  } = data;

  const [url, setUrl] = useState(image);
  const [message, setMessage] = useState<string>("");
  const [imageUrls, setImageUrl] = useState<any>(image);
  const [cnames, setCname] = useState<string>(productName);
  const [descriptions, setDescription] = useState<string>(productDescription);
  const [categorys, setCategory] = useState<any>(
    categoryProductDetails?.categoryName
  );
  const [open, setOpen] = useState<boolean>(false);
  const [categoryIds, setCategoryId] = useState(categoryId);
  const [lablesName, setLablesName] = useState<any>(lableDetails?.labelNames);
  const [lablesId, setLablesId] = useState<any>(lableDetails?.id);
  const [isModal, setIsModal] = useState(false);
  const [lable, setLable] = useState<any>([{}]);
  const [formValues, setFormValues] = useState<any>([
    { id: "", productId: "", measurementSymbol: "", productPrice: "" },
  ]);
  const [error, setError] = useState<Record<string, string | any>>({});
  const [CategoryDopdown, setCategoryDopdown] = useState<any>();
  const [sort, setSort] = useState<number>(sortOrderId);
  const [isUpdate, setIsUpdate] = useState<any>({});
  const [isLable, setIsLable]= useState(false)
  const payload = {
    categoryId: categoryIds,
    type: 1,
    productName: cnames?.trim(),
    productDescription: descriptions,
    labelsId: lablesId,
    image: url,
    measurementDetails: formValues,
  };
  const editPayload = {
    id: id,
    categoryId: categoryIds,
    type: 1,
    productName: cnames?.trim(),
    productDescription: descriptions,
    labelsId: lablesId,
    image: url,
    measurementDetails: formValues,
    sortOrderId: +sort,
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
  //CreateProduct........................................
  const handleSave = (payload: any) => {
    ApiComponents.productAdd(payload).then((res: any) => {
      if (res?.response?.data?.message) {
        setMessage(res?.response?.data?.message);
        setOpen(true);
        // dispatch(add({}));
      } else {
        // setMessage(res);
        // setOpen(true);

        dispatch(AddCategory(res?.message));
        onHandleClose();
        // onHandleAddItems(false);
      }
    });
  };
  /**
   * @description edit data
   * @param payload
   */

  const editProductApi = (payload: any, id: any) => {
    ApiComponents.productUpdate(payload, id).then((res) => {
      if (res?.response?.data?.message) {
        setMessage(res?.response?.data?.message);
        setOpen(true);
        // dispatch(AddCategory(res?.response?.data?.message));
        // onHandleAddItems(false);
        // dispatch(add({}));
      } else {
        dispatch(AddCategory(res));
        onHandleClose();
        // dispatch(add({}));
        // onHandleAddItems(false);
      }
    });
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
    } 
    else if (cnames.trim().length === 0) {
      updateError.cnames = "This field is required.";
      isValid = false;
    }
    formValues.map((elm: any, idx: number) => {
      if (elm.measurementSymbol == "") {
        updateError[`measurementSymbol${idx}`] = "This field is required.";
        isValid = false;
      }
       else if (elm.measurementSymbol.trim().length === 0) {
        updateError[`measurementSymbol${idx}`] = "This field is required.";
        isValid = false;
      }
      if (elm.productPrice == "") {
        updateError[`productPrice${idx}`] = "This field is required.";
        isValid = false;
      } else if (/\s/.test(elm.productPrice)) {
        updateError[`productPrice${idx}`] = "This field is required.";
        isValid = false;
      }
    });
    if (!lablesName) {
      updateError.lablesName = "This field is required.";
      isValid = false;
    }
    // if(!lablesId){

    // }
    if (!imageUrls) {
      updateError.imageUrls = "This field is required.";
      isValid = false;
    }
    if (!categorys) {
      updateError.categorys = "This field is required.";
      isValid = false;
    }
    setError(updateError);
    return isValid;
  };

  /**
   * @description Save data
   */
  const CreateProduct = () => {
    if (isValidated()) {
      if (id) {
        if (Object.keys(isUpdate).length === 0) {
          onHandleClose();
          // onHandleAddItems(false);
          // dispatch(add({}));
        } else {
          editProductApi(isUpdate, id);
        }
      } else {
        if (isUpdate) {
          handleSave(payload);
        }
      }
    }
  };
  /**
   * @description close Componets cancle button
   */
  const handleClose = () => {
    setIsModal(false);
    // dispatch(add({}));
    // onHandleAddItems(false);
  };

  const onhandleAddLable = () => {
    setIsModal(true);
  };
  const AddItem = (boolean: boolean) => {
    setIsModal(boolean);
  };

  useEffect(() => {
    ApiComponents.getLable().then((res: any) => {
      setLable(res?.data);
    });
  }, []);

  let handleChange = (i: any, e: any) => {
    let newFormValues: any = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
    setIsUpdate((prevState: any) => ({
      ...prevState,
      ["measurementDetails"]: newFormValues,
    }));
  };

  let addFormFields = () => {
    setFormValues([...formValues, { measurementSymbol: "", productPrice: "" }]);
    setIsUpdate((prevState: any) => ({
      ...prevState,
      ["measurementDetails"]: formValues,
    }));
  };

  useEffect(() => {
    let limit: any = 100;
    const offset = 0;
    ApiComponents.getCategory().then((res: any) => {
      setCategoryDopdown(res);
    });

    if (measurementDetails) {
      const updatedData = measurementDetails?.map((elm: any) => {
        return {
          measurementSymbol: elm.measurementSymbol,
          productPrice: elm.productPrice,
          id: elm?.id,
          productId: elm?.productId,
        };
      });
      setFormValues(updatedData);
    }
  }, []);
  const fn1 = useCallback(
    (e: any) => {
      ApiComponents.getLable().then((res: any) => {
        setLable(res?.data);
      });
    },
    [labelName]
  );

  useEffect(()=>{
    if(isLable){
      ApiComponents.getLable().then((res: any) => {
        setLable(res?.data);
        setIsLable(false)
      });
    }
  },[isLable])

  const onhandleCancal = () => {
    onHandleClose();
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
      {isModal && (
        <AddLabelModal onHandleClose={handleClose} fn1={fn1} lables={setIsLable}/>
        // {isModal && (
        //   <ModalComponent
        //     Children="addlabel"
        //     isModal={setIsModal}
        //     ispopup={setIsModal}
        //     isPopupLable={isModal}
        //     modaltitle="Add Lable"
        //     fn1={fn1}
        //     addItems={(boolean: boolean) => AddItem(boolean)}
        //   />
      )}
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="ModalMainDiv">
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
            <h4>Add Item/Create Product</h4>
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
          <div
            className="add-item-create-product-modal-div"
            style={{ overflowY: "hidden" }}
          >
            <div
              className="add-item-create-product-modal-left"
              style={{ paddingBottom: "20%" }}
            >
              <div
                className="boxitem"
                style={{
                  overflowY: "auto",
                  maxHeight: "400px",
                  height: "100%",
                }}
              >
                <Box sx={{ mb: 3 }}>
                  <Input
                    label="Name*"
                    placeholder="Name"
                    name="productName"
                    onHandleChange={(e: any) => {
                      const {
                        target: { name, value },
                      } = e;
                      setIsUpdate((prevState: any) => ({
                        ...prevState,
                        [name]: value,
                        ["categoryId"]: categoryId,
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
                    label="Description"
                    placeholder="Description"
                    name="productDescription"
                    onHandleChange={(e: any) => {
                      const {
                        target: { name, value },
                      } = e;
                      setIsUpdate((prevState: any) => ({
                        ...prevState,
                        [name]: value,
                      }));
                      setDescription(e.target.value);
                    }}
                    value={descriptions}
                  />
                </Box>
                {id && (
                  <Box sx={{ mb: 3 }}>
                    <Input
                      label="Sort"
                      type="number"
                      placeholder="Sort"
                      customStyles="sort-input"
                      name="sortOrderId"
                      onHandleChange={(e: any) => {
                        const {
                          target: { name, value },
                        } = e;
                        setIsUpdate((prevState: any) => ({
                          ...prevState,
                          [name]: value,
                        }));
                        setSort(e.target.value);
                      }}
                      value={sort}
                    />
                  </Box>
                )}
                <div className="input-main">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "8px",
                    }}
                  >
                    <span>Label*</span>
                    <span
                      className="add-lable"
                      onClick={() => onhandleAddLable()}
                    >
                      +Add label
                    </span>
                  </div>

                  {lable === "" ? null : (
                    <DropdownComponent
                      fieldName="labelNames"
                      customWidth="100%"
                      menuItem={lable}
                      marginTop={0}
                      editData={lableDetails?.labelNames}
                      getValue={(e: any) => {
                        // setIsUpdate(true);
                        const getlable = lable.filter((item: any) => {
                          return item.id === e;
                        });
                        setLablesId(getlable[0]?.id);
                        setIsUpdate((prevState: any) => ({
                          ...prevState,
                          labelsId: getlable[0]?.id,
                        }));
                        setLablesName(getlable[0]?.labelNames);
                        setError((prev) => ({ ...prev, lablesName: "" }));
                      }}
                    />
                  )}
                </div>
                <p
                  style={{
                    position: "relative",
                    top: "9px",
                    left: "18px",
                    color: "red",
                  }}
                >
                  {error.lablesName}
                </p>
                {lable === "" ? null : (
                  <>
                    <Box
                      sx={{ ml: 3 }}
                      className="add-more-add-item-product-modal"
                    >
                      <p onClick={() => addFormFields()}>+Add More</p>
                    </Box>

                    <form>
                      {formValues?.map((element: any, index: any) => (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: "24px",
                          }}
                          key={index}
                        >
                          <div style={{ width: "30%" }}>
                            <Input
                              label="Option"
                              name="option"
                              placeholder="Option"
                              disabled
                              value={`${index + 1}` ?? ""}
                              onHandleChange={(e) => {
                                handleChange(index, e);
                              }}
                            />
                          </div>
                          <div style={{ width: "30%" }}>
                            <Input
                              label="Option Name*"
                              placeholder="Option Name"
                              name="measurementSymbol"
                              value={element.measurementSymbol ?? ""}
                              onHandleChange={(e: any) => {
                                setError((prev) => ({
                                  ...prev,
                                  [`measurementSymbol${index}`]: "",
                                }));
                                handleChange(index, e);
                              }}
                              error={error[`measurementSymbol${index}`]}
                            />
                          </div>
                          <div style={{ width: "30%" }}>
                            <Input
                              label="Price*"
                              type="number"
                              placeholder="Price"
                              name="productPrice"
                              customStyles="sort-input"
                              value={element.productPrice || ""}
                              onHandleChange={(e: any) => {
                                setError((prev) => ({
                                  ...prev,
                                  [`productPrice${index}`]: "",
                                }));
                                handleChange(index, e);
                              }}
                              error={error[`productPrice${index}`]}
                            />
                          </div>
                        </div>
                      ))}
                    </form>
                  </>
                )}
                <div className="categaory-div-add-item input-main">
                  <DropdownComponent
                    label="Categaory*"
                    marginTop={0}
                    customWidth="100%"
                    menuItem={CategoryDopdown}
                    editData={categoryProductDetails?.categoryName}
                    fieldName={"categoryName"}
                    getValue={(e: any) => {
                      const NewCategaory = CategoryDopdown.filter(
                        (item: any) => {
                          return item.id === e;
                        }
                      );
                     
                      setCategoryId(NewCategaory[0]?.id);
                      setIsUpdate((prevState: any) => ({
                        ...prevState,
                        ["productName"]: cnames,
                        ["categoryId"]: NewCategaory[0]?.id,
                      }));
                      setCategory(NewCategaory[0]?.categoryName);
                      setError((prev) => ({ ...prev, categorys: "" }));
                    }}
                  />
                  <p
                    style={{
                      color: "red",
                      position: "relative",
                      top: "9px",
                      left: "18px",
                    }}
                  >
                    {error.categorys}
                  </p>
                </div>
                <div className="add-cover-image-box-add-item">
                  <div className="add-cover-image-container">
                    <label>Add Cover Image*</label>
                    {/* <div className="add-cover-box-image">{imageUrls}</div> */}
                    <Input
                      // customStyles="add-cover-box-image"
                      value={imageUrls}
                      error={error.imageUrls}
                      disabled
                    />
                  </div>
                  <div className="product-browse-item-add">
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
                        name="image"
                        onChange={(e: any) => {
                          setError((prev) => ({ ...prev, imageUrls: "" }));
                          hadleFile(e);
                        }}
                      />
                    </Button>
                  </div>
                </div>
              </div>
              <div
                style={{
                  justifyContent: "space-between",
                  marginTop: "9%",
                  marginLeft: "3%",
                }}
              >
                <ButtonComponent
                  type="button"
                  title="CANCEL"
                  onClick={onhandleCancal}
                  customStyles={{
                    background: "white",
                    border: "1px solid #F8D40C !important",
                    marginRight: "20px",
                  }}
                />
                <ButtonComponent
                  type="button"
                  title="SAVE"
                  onClick={() => CreateProduct()}
                  customStyles={{
                    marginLeft: "40px",
                  }}
                />
              </div>
            </div>
            <div className="add-item-create-product-modal-right">
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

export default memo(AddItemCreateProductModal);
