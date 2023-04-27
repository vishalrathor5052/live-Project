import Image from "./Image";

// order header data
export const orderTableHeader = [
  {
    id: 1,
    key: "razorpayOrderId",
    label: "Order Number",
    minWidth: "130px",
  },
  {
    id: 2,
    key: "dateOfOrder",
    label: "Date of Order",
    minWidth: "150px",
  },
  {
    id: 3,
    key: "deliveryDateAndTime",
    label: "Delivery Date/Time",
    minWidth: "200px",
  },
  {
    id: 4,
    key: "address",
    label: "Address",
    minWidth: "300px",
  },
  {
    id: 5,
    key: "mobileNo",
    label: "Phone Number",
    minWidth: "130px",
  },
  {
    id: 6,
    key: "customername",
    label: "Customer Name",
    minWidth: "130px",
  },
  {
    id: 7,
    key: "paymentStatus",
    label: "Payment Status",
    minWidth: "130px",
  },
  {
    id: 8,
    key: "orderStatus",
    label: "Order Status",
  },
];
// categories header data
export const categoriesTableHeader = [
  {
    id: 1,
    key: "categoryName",
    label: "Categories Name",
  },
  {
    id: 2,
    key: "count",
    label: "Items(Cakes)",
  },
  {
    id: 3,
    key: "status",
    label: "Order Status",
  },
  // {
  //   id:4,
  //   key:"",
  //   label:""
  // },
  // {
  //   id:5,
  //   key:"",
  //   label:""
  // },
];
// item cake header data
export const itemTableHeader = [
  {
    id: 1,
    key: "productName",
    label: "Cake Name",
    isImage: true,
  },
  {
    id: 2,
    key: "productDescription",
    label: "Description",
  },
  {
    id: 3,
    key: "measurementDetails",
    label: "Price",
  },
  // {
  //   id:4,
  //   key:"quantity",
  //   label:"Qantity"
  // },
  {
    id: 4,
    key: "status",
    label: "status",
  },
  {
    id: 5,
    key: "",
    label: "",
  },
  {
    id: 6,
    key: "",
    label: "",
  },
];
// offer header data
export const offerTableHeader = [
  {
    id: 1,
    key: "offerCode",
    label: "Offer Code",
  },
  {
    id: 2,
    key: "offerDescription",
    label: "Offer Amount",
  },
  {
    id: 3,
    key: "price",
    label: "Actual Price",
    minWidth: "100px",
  },
  {
    id: 4,
    key: "offerAmount",
    label: "Offer Price",
    minWidth: "100px",
  },
  {
    id: 5,
    key: "userLimit",
    label: "Usage Limit",
    minWidth: "100px",
  },
  {
    id: 6,
    key: "status",
    label: "Status",
  },
  {
    id: 7,
    key: "",
    label: "",
  },
  {
    id: 8,
    key: "",
    label: "",
  },
];
// addon header data

export const addonTableHeader = [
  {
    id: 2,
    key: "productName",
    label: "Name",
    isImage: true,
  },
  {
    id: 3,
    key: "price",
    label: "Price",
  },
  {
    id: 4,
    key: "quantity",
    label: "Qantity",
  },
];
export const userTableHeader = [
  {
    id: 1,
    key: "firstName",
    label: "Name",
    isImage: true,
  },
  {
    id: 2,
    key: "email",
    label: "Email",
  },
  {
    id: 3,
    key: "mobileNo",
    label: "Mobile Number",
    minWidth: "130px",
  },
  {
    id: 4,
    key: "address",
    label: "Address",
    minWidth: "300px",
  },
  {
    id: 5,
    key: "orderCount",
    label: "Orders No.",
    minWidth: "100px",
  },
  {
    id: 6,
    key: "deliveryDateAndTime",
    label: "Delivery Date/Time",
    minWidth: "180px",
  },
  {
    id: 7,
    key: "status",
    label: "Status",
  },
];

export const OrderNumberHeader = [
  {
    id: 1,
    key: "",
    label: "",
    isImage: true,
  },
  {
    id: 2,
    key: "productName",
    label: "Cake Name",
  },
  {
    id: 3,
    key: "price",
    label: "Price",
  },
  {
    id: 4,
    key: "quantity",
    label: "Qantity",
  },
  {
    id: 5,
    key: "measurmentSymbol",
    label: "Size",
  },
];

export const sideNavBar = [
  {
    link: "/orders",
    text: "Orders",
    image: Image.order,
    activeImage: Image.activeOrder,
  },
  {
    link: "/categorymenu",
    text: "Categories",
    headerHeading: "CATEGORY/MENU",
    image: Image.categories,
    activeImage: Image.activeCategory,
  },
  {
    link: "/products",
    text: "Products",
    headerHeading: "ITEMS(CAKES)",
    image: Image.cakeItems,
    activeImage: Image.activeCakeItem,
  },
  {
    link: "/offers",
    text: "Offers",
    image: Image.offer,
    activeImage: Image.activeOffer,
  },
  {
    link: "/addons",
    text: "Addons",
    image: Image.addons,
    activeImage: Image.activeAddon,
  },
  {
    link: "/analytic",
    text: "Analytics",
    image: Image.analyitic,
    activeImage: Image.activeAnaytics,
  },
  {
    link: "/user",
    text: "User",
    image: Image.user,
    activeImage: Image.activeUser,
  },
  {
    link: "/config",
    text: "Config",
    image: Image.config,
    activeImage: Image.activeConfig,
  },
];

export const orderTableStatus = [
  {
    id: 1,
    value: "Order Placed",
  },
  {
    id: 2,
    value: "order Confirmed",
  },
  {
    id: 3,
    value: "Order  Processed",
  },
  {
    id: 4,
    value: "Ready To PickUp",
  },
  {
    id: 5,
    value: "Order Cancaled",
  },
];

export const orderTablePaymentStatus = [
  {
    id: 1,
    value: "Paid",
  },
  {
    id: 2,
    value: "Unpaid",
  },
];

export const verifyOtpInputList = [
  { name: "opt1" },
  { name: "opt2" },
  { name: "opt3" },
  { name: "opt4" },
];
