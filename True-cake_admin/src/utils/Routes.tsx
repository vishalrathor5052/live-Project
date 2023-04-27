import { lazy } from "react";
import Layout from "../constant/Layout";

const Login = lazy(() => import("../screen/login/Login"));
const Addons = lazy(() => import("../screen/addon/Addons"));
const User = lazy(() => import("../screen/user/User"));
const ItemCake = lazy(() => import("../screen/itemCake/ItemCake"));
const Offers = lazy(() => import("../screen/offers/Offers"));
const Order = lazy(() => import("../screen/orders/OrderScreen"));
const ChangePassword = lazy(
  () => import("../screen/changePassword/ChangePassword")
);
const ForgotPasssword = lazy(() => import("../screen/login/ForgotPassword"));
const ResetPassword = lazy(() => import("../screen/login/ResetPassword"));
const OtpVerification = lazy(() => import("../screen/login/OtpVerification"));
const CategoryMenu = lazy(() => import("../screen/categoryMenu/CategoryMenu"));
const Config = lazy(() => import("../screen/config/Config"));
const Analytic = lazy(() => import("../screen/analytic/Analytic"));
const Dashboard = lazy(() => import("../screen/dashboard/Dashboard"));
const CreateCategoryModal = lazy(
  () => import("../component/createCategoryModal/CreateCategoryModal")
);
const ProfileSetting = lazy(
  () => import("../screen/profileSetting/ProfileSetting")
);
const LayoutOrder = Layout(Order)
const LayoutCategoryMenu = Layout(CategoryMenu)
const LayoutOffers = Layout(Offers)
const LayoutItemCake = Layout(ItemCake)
const LayoutAddons = Layout(Addons)
const LayoutUser = Layout(User)
const LayoutConfig = Layout(Config)
const LayoutAnalytic = Layout(Analytic)
const LayoutCreateCategoryModal = Layout(CreateCategoryModal)
const LayoutChangePassword = Layout(ChangePassword)
const LayoutProfileSetting = Layout(ProfileSetting)

export const RouterList = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/forgotpassword",
    element: <ForgotPasssword />,
  },
  {
    path: "/resetpassword",
    element: <ResetPassword />,
  },
  {
    path: "/otpverification",
    element: <OtpVerification />,
  },
];

export const AuthRouterList = [
  {
    path: "/orders",
    element: <LayoutOrder />,
  },
  {
    path: "/categorymenu",
    element: <LayoutCategoryMenu />,
  },
  {
    path: "/offers",
    element: <LayoutOffers />,
  },
  {
    path: "/products",
    element: <LayoutItemCake />,
  },
  {
    path: "/addons",
    element: <LayoutAddons />,
  },
  {
    path: "/user",
    element: <LayoutUser />,
  },
  {
    path: "/config",
    element: <LayoutConfig />,
  },
  {
    path: "/analytic",
    element: <LayoutAnalytic />,
  },
  {
    path: "/createcategorymodal",
    element: <LayoutCreateCategoryModal />,
  },
  {
    path: "/changepassword",
    element: <LayoutChangePassword />,
  },
  {
    path: "/profilesetting",
    element: <LayoutProfileSetting />,
  },
];
