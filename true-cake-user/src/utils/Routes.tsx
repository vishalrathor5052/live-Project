import React, { lazy } from "react";
import Landing from '../screens/landing/Landing';
// import Offers from '../screens/offers/Offers';
// import Profile from '../screens/profile/Profile';
// import Location from '../screens/location/Location';
// import AddToCart from '../screens/addToCart/AddToCart';
// import SignIn from '../screens/signIn/SignIn';
// import MenuScreen from '../screens/menu/MenuScreen';
// import Productdetail1 from "../screens/productDetails/ProductDetail1";
// import OrderHistory from "../screens/orderHistory/OrderHistory";
// import DeliveryAddress from "../screens/deliveryAddress/DeliveryAddress";
// const Landing = lazy(() => import("../screens/landing/Landing"));
const Offers = lazy(() => import("../screens/offers/Offers"));
const Profile = lazy(() => import("../screens/profile/Profile"));
const Location = lazy(() => import("../screens/location/Location"));
const AddToCart = lazy(() => import("../screens/addToCart/AddToCart"));
const SignIn = lazy(() => import("../screens/signIn/SignIn"));
const MenuScreen = lazy(() => import("../screens/menu/MenuScreen"));
const CalenderDate = lazy(() => import("../components/calendar/CalenderDate"));
const Map = lazy(() => import("../screens/map/Map"))
const Payment = lazy(() => import("../screens/payment/Payment"))
const SearchCake = lazy(() => import("../screens/searchcake/Searchcake"))
const DeliveryAddress = lazy(() => import("../screens/deliveryAddress/DeliveryAddress"))
const OrderHistory = lazy(() => import("../screens/orderHistory/OrderHistory"))
const ProductDetail = lazy(() => import("../screens/productDetails/ProductDetail1"))
const DeliveryAddressess = lazy(() => import("../screens/deliveryAddresses/DeliveryAddressess"))
const EditProfile = lazy(() => import("../screens/editProfile/Editprofile"))



export const RouteList = [
    {
        path: '/',
        component: <Landing />,
        role: [101]
    },
    {
        path: '/offers',
        component: <Offers />,
        role: [102]
    },
    {
        path: '/profile',
        component: <Profile />,
        role: [103]
    },
    // {
    //     path: '/landing',
    //     component: <Landing />,
    //     role: [104]
    // },
    {
        path: '/signin',
        component: <SignIn />,
        role: [105]
    },
    {
        path: 'cart',
        component: <AddToCart />,
        role: [106]
    },
    {
        path: '/menu',
        component: <MenuScreen />,
        role: [107]
    },
    {
        path: '/orderhistory',
        component: <OrderHistory />,
        role: [108]
    },
    {
        path: '/deliveryaddress',
        component: <DeliveryAddress />,
        role: [109]
    },
    {
        path: '/productdetails',
        component: <ProductDetail />,
        role: [110]
    },
    {
        path: '/calendar',
        component: <CalenderDate />,
        role: [111]
    },
    {
        path: '/location',
        component: <Map />,
        role: [112]
    },
    {
        path: '/payment',
        component: <Payment />,
        role: [113]
    },
    {
        path: '/search',
        component: <SearchCake />,
        role: [113]
    },
    {
        path: '/deliveryAddressess',
        component: <DeliveryAddressess />,
        role: [114]
    },
    {
        path: '/editProfile',
        component: <EditProfile />,
        role: [115]
    },
    {
        path: '/deliveryaddress/:id',
        component: <DeliveryAddress />,
        role: [116]
    },
]
