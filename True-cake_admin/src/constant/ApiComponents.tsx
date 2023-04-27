import React from "react";
import { StoreCookie } from "../Auth/sessionStore";
import instance from "../component/axios/Axios";
import {BaseUrl} from "../component/axios/Axios"
import { RouterList } from "../utils/Routes";
import axios from "axios";
//const dispatch =useDispatch();

// const {page,rowPerPage}=useSelector((state:any)=>state.trueCake);

const goToLogin = (error: any) => {
  if (error?.response?.status == 401) {
    window.location.href = RouterList[0].path;
  }
};

const ForgotPassword = async (payload: any) => {
  try {
    const response = await instance.post("admin/forgotPassword", payload);
    return response?.data ? response : "";
  } catch (error) {
    // goToLogin(error);
    return error;
  }
};
// verifyOTP....................
const VerifyOTP = async (payload: any) => {
  try {
    const response = await instance.post("admin/verifyOtp", payload);
    return response;
  } catch (error) {
    return error;
  }
};
//resetPassword........................................
const ResetPassword = async (payload: any) => {
  try {
    const response = await instance.post("admin/resetPassword", payload);
    return response?.data ? response?.data : "";
  } catch (error) {
    return error;
  }
};
//changePassword...........................................

const ChangePassword = async (payload: any) => {
  try {
    const response = await instance.post("admin/changePassword", payload);
    return response?.data ? response?.data?.message : "";
  } catch (error) {
    return error;
  }
};

//Profile......... Edit Api

const ProfileEdit = async (payload: any) => {
  try {
    const response = await instance.put("admin/editprofile", payload);
    return response?.data ? response?.data?.message : "";
  } catch (error) {
    goToLogin(error);
    return error;
  }
};
// get Admin ..................
const GetAdmin = async () => {
  try {
    const response = await instance.get("admin/getAdmin");
    StoreCookie.setItem("userData", JSON.stringify(response?.data));
    return response?.data ? response?.data : "";
  } catch (error) {
    goToLogin(error);
    return error;
  }
};
const getCurrentUser = () => {
  return StoreCookie.getItem("userToken");
};

const getCurrentUserData = () => {
  return StoreCookie.getItem("userData");
};
//search order ..................................
const SearchOrder = async (
  limit?: any,
  offset?: any,
  payload?: any,
  isSearch?: any
) => {
  try {
    const response = await instance.post(
      `order/searchList?limit=${!!limit ? limit : 5}&offset=${
        isSearch == true ? 0 : offset
      }`,
      payload
    );
    return response?.data ? response?.data?.data : "";
  } catch (error) {
    goToLogin(error);
    return error;
  }
};
//Categorymenu.tsx....................Start..................
const getCategory = async (limit?: any, offset?: any, payload?: any) => {
  try {
    // const response = await instance.get(
    //   `category/list`
    // );
    const response = await axios.get(`${BaseUrl}category/list`);
    return response?.data ? response?.data?.data : "";
  } catch (error) {
    goToLogin(error);
    return error;
  }
};

//Search category..................
const SearchCatogery = async (limit?: any, offset?: any, payload?: any) => {
  try {
    const response = await instance.get(
      `category/searchList?limit=${
        !!limit ? limit : 5
      }&offset=${offset}&category=${payload?.category}`
    );
    return response?.data ? response?.data?.data : "";
  } catch (error) {
    goToLogin(error);
    return error;
  }
};
//image upload

const UplodImage = async (formData: any) => {
  // const payload:any={
  //   image:payloadValue
  // }
  try {
    const response = await instance.post("uploads", formData);
    return response?.data ? response?.data?.data : "";
  } catch (error) {
    goToLogin(error);
    return error;
  }
};

const CreateCatogery = async (payload: any) => {
  try {
    const response = await instance.post("category/add", payload);
    return response?.data ? response?.data : "";
  } catch (error) {
    goToLogin(error);
    return error;
  }
};

const OptionDelete = async (payload: any) => {
  try {
    const response = await instance.delete(`/options/delete/[${payload}]`);
    return response?.data ? response?.data?.message : "";
  } catch (error) {
    goToLogin(error);
    return error;
  }
};
//...............deleteCategory.................................

const categoryDelete = async (payload: any) => {
  try {
    const response = await instance.delete(`category/delete/${payload}`);
    return response?.data ? response?.data?.message : "";
  } catch (error) {
    goToLogin(error);
    return error;
  }
};

//...................editeCategory......................

const categoryUpdate = async (payload: any, id: any) => {
  try {
    const response = await instance.put(`category/update/${id}`, payload);
    return response?.data ? response?.data?.message : "";
  } catch (error) {
    goToLogin(error);
    return error;
  }
};
//category cakeitemModel.....................
const productget = async () => {
  try {
    let limit: any = 100;
    const offset = 0;
    const response = await instance.get(
      `product/list?limit=${!!limit ? limit : 5}&offset=${offset}`
    );
    return response?.data ? response?.data?.data : "";
  } catch (error) {
    goToLogin(error);
    return error;
  }
};
// category cakeitemsmodal.......put data
const productaddCategory = async (id: any, payload: any) => {
  try {
    const response = await instance.post(`product/add/${id}`, payload);
    return response?.data ? response?.data?.message : "";
  } catch (error) {
    goToLogin(error);
    return error;
  }
};

//Categorymenu.tsx  and createCategorymodel.tsx....................close..................

//itemCake.tsx compontents ..................................start.................

const productList = async (limit?: any, offset?: any) => {
  try {
    const response = await instance?.get(
      `product/list?limit=${!!limit ? limit : 5}&offset=${offset}`
    );
    return response?.data ? response?.data : "";
  } catch (error) {
    goToLogin(error);
    return error;
  }
};
//search Product............

const Searchproduct = async (limit?: any, offset?: any, payload?: any) => {
  try {
    const response = await instance.get(
      `product/searchList?limit=${
        !!limit ? limit : 5
      }&offset=${offset}&product=${payload?.product}&type=${1}`
    );
    return response?.data ? response?.data?.data : "";
  } catch (error) {
    goToLogin(error);
    return error;
  }
};
//.....createCake Item.................................

const productAdd = async (payload: any) => {
  try {
    const response = await instance.post("product/add", payload);
    return response?.data ? response?.data : "";
  } catch (error) {
    goToLogin(error);
    return error;
  }
};

// ..................delete Api...........................................

const productDelete = async (payload: any) => {
  try {
    const response = await instance.delete(`product/delete/${payload}`);
    return response?.data ? response?.data?.message : "";
  } catch (error) {
    goToLogin(error);
    return error;
  }
};

//..........................update Product......................
const productUpdate = async (payload: any, id: any) => {
  try {
    const response = await instance.put(`product/update/${id}`, payload);
    return response?.data ? response?.data?.message : "";
  } catch (error) {
    goToLogin(error);
    return error;
  }
};
const getLable = async () => {
  try {
    const response = await instance?.get("label/list");

    return response?.data ? response?.data : "";
  } catch (error) {
    goToLogin(error);
    return error;
  }
};

const LabelAdd = async (payload: any) => {
  try {
    const response = await instance.post("label/add", payload);
    return response?.data ? response?.data : "";
  } catch (error) {
    goToLogin(error);
    return error;
  }
};

//................product caske itemsss........................close.................

// offers.......................start..............................

const getOffer = async (limit?: any, offset?: any) => {
  try {
    const response = await instance.get(
      `offer/list?limit=${!!limit ? limit : 5}&offset=${offset}`
    );

    return response?.data ? response?.data?.data : "";
  } catch (error) {
    goToLogin(error);
    return error;
  }
};
//search offer................

const searchOffer = async (limit?: any, offset?: any, payload?: any) => {
  try {
    const response = await instance.get(
      `offer/searchList?limit=${!!limit ? limit : 5}&offset=${offset}&offer=${
        payload?.offer
      }`
    );
    return response?.data ? response?.data?.data : "";
  } catch (error) {
    goToLogin(error);
    return error;
  }
};

//....................delete Offer.........................................

const deleteOffer = async (payload: any) => {
  try {
    const response = await instance.delete(`offer/delete/${payload}`);

    return response?.data ? response?.data : "";
  } catch (error) {
    goToLogin(error);
    return error;
  }
};

//..................editOffer.....................................
const OfferUpdate = async (payload: any, id: any) => {
  try {
    const response = await instance.put(`offer/update/${id}`, payload);

    return response?.data ? response?.data?.message : "";
  } catch (error) {
    goToLogin(error);
    return error;
  }
};
//create offer.................offer.........................
const createOffer = async (payload: any) => {
  try {
    const response = await instance.post("offer/add", payload);
    return response?.data ? response?.data : "";
  } catch (error) {
    goToLogin(error);
    return error;
  }
};

// offers .......................close............................

//Addons..........................Start.........................
const getAddon = async (limit?: any, offset?: any) => {
  try {
    const response = await instance.get(
      `product/addOnsList?limit=${!!limit ? limit : 5}&offset=${offset}`
    );
    return response?.data ? response?.data?.data : "";
  } catch (error) {
    goToLogin(error);
    return error;
  }
};
//search Addon............................
const searchAddon = async (limit?: any, offset?: any, payload?: any) => {
  try {
    const response = await instance.get(
      `product/searchList?limit=${
        !!limit ? limit : 5
      }&offset=${offset}&product=${payload?.product}&type=[2,3]`
    );
    return response?.data ? response?.data?.data : "";
  } catch (error) {
    goToLogin(error);
    return error;
  }
};
//delete Addon.........................................
const deleteAddon = async (payload: any) => {
  try {
    const response = await instance.delete(`product/delete/${payload}`);
    return response?.data ? response?.data : "";
  } catch (error) {
    goToLogin(error);
    return error;
  }
};

//createAddone   edit type3.................................................
const createAddon = async (payload: any) => {
  try {
    const response = await instance.post("options/add", payload);
    return response?.data ? response?.data?.message : "";
  } catch (error) {
    goToLogin(error);
    return error;
  }
};
//.....................editAddon.......................................
const AddonUpdate = async (payload: any, id: any) => {
  try {
    const response = await instance.put(`product/update/${id}`, payload);
    return response?.data ? response?.data?.message : "";
  } catch (error) {
    goToLogin(error);
    return error;
  }
};

//Addone ..................................close....................

// user Commonets.........................start................
const getUser = async (limit?: any, offset?: any) => {
  try {
    const response = await instance.get(
      `user/getUsers?limit=${!!limit ? limit : 5}&offset=${offset}`
    );
    return response?.data ? response?.data?.data : "";
  } catch (error) {
    goToLogin(error);
    return error;
  }
};
//search user..................

const searchUser = async (limit?: any, offset?: any, payload?: any) => {
  try {
    const response = await instance.get(
      `user/searchList?limit=${!!limit ? limit : 5}&offset=${offset}&user=${
        payload?.user
      }`
    );
    return response?.data ? response?.data?.data : "";
  } catch (error) {
    goToLogin(error);
    return error;
  }
};
const deleteUser = async (payload: any) => {
  try {
    const response = await instance.delete(`user/delete/${payload.id}`);
    return response?.data ? response?.data : "";
  } catch (error) {
    goToLogin(error);
    return error;
  }
};

const getOrderNumber = async (id: any, limit?: any, offset?: any) => {
  try {
    const response = await instance.get(
      `order/orderHistory/${id}?limit=${!!limit ? limit : 5}&offset=${offset}`
    );
    return response?.data ? response?.data?.data : "";
  } catch (error) {
    goToLogin(error);
    return error;
  }
};
//Edit order status..................
const orderStatusUpdate = async (payload: any) => {
  try {
    const response = await instance.put(`order/update/${payload.id}`, payload);
    return response?.data ? response?.data?.message : "";
  } catch (error) {
    goToLogin(error);
    return error;
  }
};

const getOrderDeatial = async (id: any, limit?: any, offset?: any) => {
  try {
    const response = await instance.get(`order/list/${id}`);
    return response?.data ? response?.data?.data : "";
  } catch (error) {
    goToLogin(error);
    return error;
  }
};

//order update........

// user Componets ........close.......................
//cofig................................................................start
const LogoUpload = async (payload: any) => {
  try {
    const response = await instance.post("logo/add", payload);
    return response?.data ? response?.data?.message : "";
  } catch (error) {
    goToLogin(error);
    return error;
  }
};

//
const orderQuantity = async (payload: any) => {
  try {
    const response = await instance.post("orderQuantity/add", payload);
    return response?.data ? response?.data?.message : "";
  } catch (error) {
    goToLogin(error);
    return error;
  }
};

//Anylitics.................................................................

const Analytics = async (payload: any) => {
  try {
    const response = await instance.get("analysis/list", payload);
    return response?.data ? response?.data?.message : "";
  } catch (error) {
    goToLogin(error);
    return error;
  }
};
// order delete api..........................................

const orderDelete = async (payload: any) => {
  try {
    const response = await instance.delete(`order/delete/${payload}`);
    return response?.data ? response?.data : "";
  } catch (error) {
    goToLogin(error);
    return error;
  }
};
//Birtdayspical Componets...........open.........
const getBirthdaySpical = async (payload: any, limit: any, offset: any) => {
  try {
    const response = await instance.get(
      `product/list/${payload}?limit=${limit}&offset=${offset}`
    );
    return response?.data ? response?.data?.data : "";
  } catch (error) {
    goToLogin(error);
    return error;
  }
};

const ApiComponents = {
  ForgotPassword,
  VerifyOTP,
  ResetPassword,
  ChangePassword,
  getCategory,
  UplodImage,
  CreateCatogery,
  categoryDelete,
  categoryUpdate,
  productList,
  productAdd,
  productDelete,
  productUpdate,
  getOffer,
  deleteOffer,
  createOffer,
  OfferUpdate,
  getAddon,
  deleteAddon,
  createAddon,
  AddonUpdate,
  getUser,
  LogoUpload,
  orderQuantity,
  Analytics,
  getLable,
  LabelAdd,
  ProfileEdit,
  GetAdmin,
  deleteUser,
  getBirthdaySpical,
  orderDelete,
  productget,
  productaddCategory,
  getOrderNumber,
  orderStatusUpdate,
  getOrderDeatial,
  SearchCatogery,
  Searchproduct,
  searchOffer,
  searchAddon,
  searchUser,
  SearchOrder,
  getCurrentUser,
  getCurrentUserData,
  OptionDelete,
};
export default ApiComponents;
