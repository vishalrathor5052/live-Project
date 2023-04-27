import React, { useEffect, memo, useCallback } from "react";
import "./style.css";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Addons from "../addons/addons";
import ButtonComponent from "../button/Button";
import QuantityCounter from "../../components/quantityCounter/QuantityCounter";
import axios from "axios";
import { PATH } from "../../constant/Constant";
import { useDispatch, useSelector } from "react-redux";
import {
  addOption,
  addAddToCartData,
} from "../../screens/reduxSetup/CartSlice";
import Loader from "../loader/Loader";
import TablePagination from "@mui/material/TablePagination";
import Images from "../../constant/Images";

const ModalBallons = (props: any) => {
  const {
    ballonMod,
    newShow,
    addonId,
    handleGetCartData,
    optionDetail = {},
    onHandleNext,
  } = props;

  console.log("optionDetail: ", optionDetail, props);
  const [ballons, setBallons] = useState([]);
  const [modal, setModal] = useState(false);
  const [isLoader, setIsLoading] = useState(true);
  const [toggle, setToggle] = useState(0);
  const [page, setPage] = useState(0);
  const [totalPrice, setTotalPrice] = useState<any>(
    optionDetail?.totalPrice ?? 0
  );
  const [rowsPerPage, setRowsPerPage] = useState<number>(2);
  const [productCount, setProductCount] = useState(0);
  const [count, setCount] = useState<Record<string, string | any>>({});
  const { options, addToCartData } = useSelector(
    (state: any) => state.addToCart
  );
  const {
    userDetails: { userDetail },
  } = useSelector((state: any) => state);
  const dispatch = useDispatch();
  let optionIdToRemove: any = [];

  const filteredOptionDataFromCart = addToCartData?.cartDetails?.filter(
    (elm: any) => elm.productType === 3
  );

  useEffect(() => {
    handlePageUpdate();
  }, [page]);

  const handlePageUpdate = useCallback(() => {
    setIsLoading(true);
    const offsets: number = page * rowsPerPage;
    axios
      .get(
        `${PATH}options/list/${addonId}/?limit=${rowsPerPage}&offset=${offsets}`
      )
      .then((res: any) => {
        console.log("response Addons Vishal", res);
        const {
          data: {
            data: { rows = [] },
          },
        } = res;
        // for(let row of rows){
        //   dispatch(addOption({ data: row, isRemover: false }));
        // }
        setBallons(res?.data?.data?.rows ?? res?.data?.data);
        setProductCount(res?.data?.data?.count ?? res?.data.data.length);
        setIsLoading(false);
      })
      .catch((err) => {});
  }, [page]);

  const handleChange = async() => {
    let optionDataInCart: any = {};
    console.log("options add to cart: ", options);

    for (let elm of options) {
      console.log("elm iterate", elm);
      if (elm.productId === addonId) {
        let productsList = [
          {
            productId: addonId,
            productType: 3,
            productPrice: 0,
          },
        ];
        let temp: any = {};
        temp.optionId = elm?.id;
        temp.optionQuantity = elm?.productQuantity;
        temp.optionPrice = +elm?.price;

        console.log("temp: ", temp, optionDataInCart);

        if (!optionDataInCart.productsList && temp.optionPrice)
          optionDataInCart = { productsList, optionsList: [temp] };
        else if (temp.optionPrice)
          optionDataInCart.optionsList = [
            ...optionDataInCart.optionsList,
            temp,
          ];
      }
    }

    console.log("optionDataInCart: ", optionDataInCart);

    if (
      userDetail?.tokenId?.isVerify === true &&
      optionDataInCart?.optionsList?.length > 0
    )
      await addToCartApi(optionDataInCart);
    if (updatedArray.length > 0) updateAddons();

    ballonMod(false);
    newShow && newShow(true);
  };

  const handleClose = () => {
    console.log("on close the popup.")
    // updateAddons();
    ballonMod(false);
    newShow && newShow(true);
  };

  const switchToggle = (elm: any, quantity: Number) => {
    setToggle(elm.id);
    addCounterHandler(elm, quantity);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    // window.scrollTo(0, 0);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 3));
    setPage(0);
  };

  const addCounterHandler = async (elm: any, quantity: Number) => {
    let temp: any = { ...count };
    if (elm.name in count) {
      if (count[elm.name] < elm.quantity) {
        temp[elm.name] = temp[elm.name] + 1;
      }
    } else {
      temp[elm.name] = 1;
    }
    elm.productType = 3;
    dispatch(addOption({ data: elm, increment: true }));
    setCount(temp);
    setTotalPrice((prevPrice: any) => (prevPrice = +prevPrice + +elm.price));
  };

  const subCounterHandler = (elm: any, quantity: Number) => {
    let temp: any = { ...count };
    if (count[elm.name] > 0) {
      temp[elm.name] = temp[elm.name] - 1;
    }
    dispatch(addOption({ data: elm, increment: false }));
    setCount(temp);
    if (+quantity - 1 === 0) {
      optionIdToRemove.push(elm.id);
      removeOptionInCart(elm);
    }
    setTotalPrice((prevPrice: any) => (prevPrice = +prevPrice - +elm.price));
  };

  //addToCartApi to add data in cart
  const addToCartApi = async (optiondataForAddToCartApi: any) => {
    await axios(PATH + "cart/orderItem", {
      method: "post",
      data: optiondataForAddToCartApi,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userDetail?.tokenId?.data,
      },
    })
      .then(async(res: any) => {
        if (res?.data?.success) {
          await handleGetCartData();
          onHandleNext && onHandleNext();
        }
      })
      .catch((error) => {
        return error.value;
      });
  };
  let updatedArray: any = [];

  //update addons api to update the quantity of product
  const updateAddons = async () => {
    let updatedAddonsList = options?.map((elm: any) => {
      let temp: any = {}; //An empty object to store temperary data
      //add data in temp
      temp.orderId = userDetail?.orderId;
      temp.productId = elm?.id;
      temp.productQuantity = elm?.productQuantity;
      updatedArray.push(temp); //push temp data in apiData (empty array)
    });
    await axios(PATH + "cart/update", {
      method: "put",
      data: { addonDetails: updatedArray },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userDetail?.tokenId?.data,
      },
    })
      .then((res: any) => {})
      .catch((error) => {});
  };

  //removeOptionInCart api to remove the product in cart
  const removeOptionInCart = async (option: any) => {
    let optionIds: any = [];
    let flteredData = addToCartData?.cartDetails?.filter(
      (elm: any) => elm.productType === 3
    );
    for (let elm of flteredData) {
      for (let optionData of elm?.productDetails?.optionItemDetails) {
        if (optionData.optionId === option.id) optionIds.push(optionData.id);
      }
    }
    if (optionIds.length > 0) {
      return axios
        .delete(`${PATH}cartOption/delete/${addonId}`, {
          method: "delete",
          data: { id: optionIds },
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userDetail.tokenId?.data,
          },
        })
        .then(async (res: any) => {
          // await dispatch(addOption({ data: option, increment: false }));
          if (res?.data?.success) {
            await handleGetCartData();
            onHandleNext && onHandleNext();
          }
        })
        .catch((err: any) => {});
    }
  };

  // //calculatePrice for calulate all price of addons and options
  // const calculatePrice = useCallback(() => {
  //   console.log("vishal verify options: ", options);
  //   let filteredData = options.filter((elm: any) => elm.productId === addonId);

  //   let totalCalculateAmount = filteredData?.reduce(
  //     (acc: any, curr: any) => (acc += +curr?.price * +curr?.productQuantity),
  //     0
  //   );
  //   return addonId && totalCalculateAmount;
  // }, [addonId]);

  // useEffect(() => {
  //   console.log("useeffect options", filteredOptionDataFromCart);
  //   // dispatch on options for add filterOptionData -> productDetails -> optionItemDetails
  //   calculatePrice();
  // }, [addonId]);

  return (
    <Modal show={ballonMod} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="balloon-option-container">
          <div className="balloon-option-container">
            <h4 className="balloon-option-heading">OPTIONS</h4>
          </div>
        </Modal.Title>
      </Modal.Header>
      {isLoader ? (
        <div className="mt-5">
          <Loader />
        </div>
      ) : (
        <Modal.Body>
          <div className="balloon-option-main">
            {ballons.length === 0 ? (
              <div className="d-flex justify-content-center">
                {/* <h3 className="">Data not found</h3> */}
                <img
                  className="search-image"
                  src={Images.searchImage}
                  alt="search-image"
                />
              </div>
            ) : (
              ballons.map((elm: any) => {
                let optionList = options?.find(
                  (option: any) => option.id === elm.id
                );

                console.log("optionList 290", optionList);

                return (
                  <div key={elm.id} className="balloon-option-div">
                    <div className="balloon-option">
                      <div>
                        <img
                          className="balloon-option-image"
                          src={`http://34.200.195.34/upload/${elm?.image}`}
                          alt=""
                        />
                      </div>
                      <div className="balloon-color-option">
                        <p className="balloon-color-name">{elm.name}</p>
                        <p className="balloon-color-name">{"\u20B9" + elm.price}</p>
                      </div>
                    </div>
                    <div>
                      <>
                        {console.log(
                          "optionList?.productQuantity: ",
                          optionList?.productQuantity
                        )}
                      </>
                      {optionList?.productQuantity ? (
                        <QuantityCounter
                          count={optionList?.productQuantity}
                          addCounterHandler={() =>
                            addCounterHandler(elm, optionList?.productQuantity)
                          }
                          subCounterHandler={() =>
                            subCounterHandler(elm, optionList?.productQuantity)
                          }
                        />
                      ) : (
                        <button
                          className="add-button-div"
                          onClick={() =>
                            switchToggle(elm, optionList?.productQuantity)
                          }
                        >
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div>
            <TablePagination
              rowsPerPageOptions={[2]}
              component="div"
              count={productCount}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
          <div className="card-total-main">
            <div className="cart-total-heading-div">
              <p>Balloon Total</p>
            </div>
            <div className="cart-dot">:</div>
            <div className="cart-total-heading-div">
              <p>{totalPrice > 0 ? totalPrice : 0}</p>
              <p>{}</p>
            </div>
          </div>
        </Modal.Body>
      )}
      <Modal.Footer>
        <div className="popup-buttuon-div">
          {modal && <Addons show={setModal} optionPrice={setModal} />}

          <ButtonComponent
            customClass="balloon-mdl-btn"
            type="button"
            title="Next"
            onClick={handleChange}
          />
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default memo(ModalBallons);

// function every(arg0: boolean) {
//   throw new Error("Function not implemented.");
// }
