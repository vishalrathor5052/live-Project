import axios from "axios";
import ImageObj from "./Images";

export default axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
  },
});

export const url = "http://localhost:4000";

export const Baseurl = "http://localhost:4000/api";

// http://34.200.195.34/
export const PATH = "http://34.200.195.34:7000/api/";

// Array to be used to filter category
export const objectCheck = {
  Cakecategory: [
    {
      key: 1,
      item: "Birthday Specials",
      title: "Birthday Specials",
    },
    {
      key: 2,
      item: "Premium Cakes",
      title: "Premium Cakes",
    },
    {
      key: 3,
      item: "Speciality Fusion Cakes",
      title: "Speciality Fusion Cakes",
    },
    {
      key: 4,
      item: "Featured Cakes",
      title: "Featured Cakes",
    },
  ],
  Menucategory: [
    {
      key: 1,
      item: "BROWNIES",
      title: "BROWNIES",
    },
    {
      key: 2,
      item: "CAKE SHAKES",
      title: "CAKE SHAKES",
    },
    {
      key: 3,
      item: "CAKES",
      title: "CAKES",
    },
    {
      key: 4,
      item: "CUPCAKES",
      title: "CUPCAKES",
    },
    {
      key: 5,
      item: "DESSERT JARS",
      title: "DESSERT JARS",
    },
    {
      key: 6,
      item: "EXCLUSIVE COMBO DEALS",
      title: "EXCLUSIVE COMBO DEALS",
    },
    {
      key: 7,
      item: "HEART CAKES",
      title: "HEART CAKES",
    },
    {
      key: 8,
      item: "MILK SHAKES",
      title: "MILK SHAKES",
    },
    {
      key: 9,
      item: "PASTRIES",
      title: "PASTRIES",
    },
  ],
  DummyData: [
    {
      id: 0,
      // collection: "New Collection",
      // food_type: "Pure Veg",
      category: "Birthday Specials",
      image: ImageObj.cakeimage1,
      productName: "Black Forest Cake",
      productPrice: 658,
    },
    {
      id: 1,
      // collection: "New Collection",
      // food_type: "Pure Veg",
      category: "Premium Cakes",
      image: ImageObj.cakeimage2,
      productName: "Icebox cake",
      productPrice: 758,
    },
    {
      id: 2,
      // collection: "New Collection",
      // food_type: "Pure Veg",
      category: "Birthday Specials",
      image: ImageObj.cakeimage3,
      productName: "Black Forest Cake",
      productPrice: 558,
    },
    {
      id: 3,
      // collection: "Special Offer",
      // food_type: "Pure Veg",
      category: "Premium Cakes",
      image: ImageObj.cakeimage3,
      productName: "Coffee Cake",
      productPrice: 778,
    },
    {
      id: 4,
      // collection: "New Collection",
      // food_type: "Pure Veg",
      category: "Speciality Fusion Cakes",
      image: ImageObj.cakeimage4,
      productName: "Black Forest Cake",
      productPrice: 998,
    },
    {
      id: 5,
      // collection: "New Collection",
      // food_type: "Pure Veg",
      category: "Featured Cakes",
      image: ImageObj.cakeimage5,
      productName: "Banana Cake",
      productPrice: 758,
    },
    {
      id: 6,
      // collection: "New Collection",
      // food_type: "Pure Veg",
      category: "Speciality Fusion Cakes",
      image: ImageObj.cakeimage6,
      productName: "Funfetti cake",
      productPrice: 538,
    },
    {
      id: 7,
      // collection: "New Collection",
      // food_type: "Pure Veg",
      category: "Featured Cakes",
      image: ImageObj.cakeimage7,
      productName: "Black Forest Cake",
      productPrice: 658,
    },
    {
      id: 8,
      // collection: "New Collection",
      // food_type: "Pure Veg",
      category: "Speciality Fusion Cakes",
      image: ImageObj.cakeimage10,
      productName: "Lemon Cake",
      productPrice: 758,
    },
  ],
  addonsData: [
    {
      id: 1,
      heading: "Knife and Candle",
      price: 1,
      image: ImageObj.candle,
    },
    {
      id: 2,
      heading: "Balloons",
      price: 1,
      image: ImageObj.balloon,
    },
    {
      id: 3,
      heading: "Bouquet",
      price: 1,
      image: ImageObj.balloon,
    },
    {
      id: 4,
      heading: "Magic Candles",
      price: 1,
      image: ImageObj.candle,
    },
  ],
  TimeSlotData: [
    {
      id: 1,
      time: "08:00 AM-10:00 AM",
    },
    {
      id: 2,
      time: "10:00 AM-12:00 PM",
    },

    {
      id: 3,
      time: "12:00 PM-02:00 PM",
    },
    {
      id: 4,
      time: "2:00 PM-04:00 PM",
    },
    {
      id: 5,
      time: "04:00 PM-06:00 PM",
    },
    {
      id: 6,
      time: "06:00 PM-08:00 PM",
    },
    {
      id: 7,
      time: "08:00 PM-10:00 PM",
    },
    {
      id: 8,
      time: "10:00 PM-12:00 PM",
    },
  ],
  mapsHeading: {
    heading1: "Confirm Delivery Location",
    heading2: "Deliver To",
  },

  OffersScreen: {
    heading: "OFFERS",
    offercard: [
      {
        id: 1,
        offer_dreamy_title1: "Dreamy",
        offer_dreamy_title2: "Banana Cake",
        percentage: "10% OFF",
        amount: "$29.99",
      },
      {
        id: 2,
        offer_dreamy_title1: "Dreamy",
        offer_dreamy_title2: "Banana Cake",
        percentage: "10% OFF",
        amount: "$29.99",
      },
      {
        id: 3,
        offer_dreamy_title1: "Dreamy",
        offer_dreamy_title2: "Banana Cake",
        percentage: "10% OFF",
        amount: "$29.99",
      },
      {
        id: 4,
        offer_dreamy_title1: "Dreamy",
        offer_dreamy_title2: "Banana Cake",
        percentage: "10% OFF",
        amount: "$29.99",
      },
      {
        id: 5,
        offer_dreamy_title1: "Dreamy",
        offer_dreamy_title2: "Banana Cake",
        percentage: "10% OFF",
        amount: "$29.99",
      },
      {
        id: 6,
        offer_dreamy_title1: "Dreamy",
        offer_dreamy_title2: "Banana Cake",
        percentage: "10% OFF",
        amount: "$29.99",
      },
    ],
  },

  OrderHistory: {
    heading_category: "ORDER HISTORY",
    card_div: [
      {
        id: 1,
        heading: "Chocolate Truffle",
        para1: "Bengaluru, Karnataka 560076, India",
        para2: "Order #14000852014 | Thu, Aug 04, 2022, 09:01 PM",
        delivery_date: "Delivered on Thu, Aug 04, 2022, 09:48 AM",
        price: "$635",
      },

      {
        id: 2,
        heading: "Chocolate Truffle",
        para1: "Bengaluru, Karnataka 560076, India",
        para2: "Order #14000852014 | Thu, Aug 04, 2022, 09:01 PM",
        delivery_date: "Delivered on Thu, Aug 04, 2022, 09:48 AM",
        price: "$635",
      },

      {
        id: 3,
        heading: "Chocolate Truffle",
        para1: "Bengaluru, Karnataka 560076, India",
        para2: "Order #14000852014 | Thu, Aug 04, 2022, 09:01 PM",
        delivery_date: "Delivered on Thu, Aug 04, 2022, 09:48 AM",
        price: "$635",
      },

      {
        id: 4,
        heading: "Chocolate Truffle",
        para1: "Bengaluru, Karnataka 560076, India",
        para2: "Order #14000852014 | Thu, Aug 04, 2022, 09:01 PM",
        delivery_date: "Delivered on Thu, Aug 04, 2022, 09:48 AM",
        price: "$635",
      },

      {
        id: 5,
        heading: "Chocolate Truffle",
        para1: "Bengaluru, Karnataka 560076, India",
        para2: "Order #14000852014 | Thu, Aug 04, 2022, 09:01 PM",
        delivery_date: "Delivered on Thu, Aug 04, 2022, 09:48 AM",
        price: "$635",
      },

      {
        id: 6,
        heading: "Chocolate Truffle",
        para1: "Bengaluru, Karnataka 560076, India",
        para2: "Order #14000852014 | Thu, Aug 04, 2022, 09:01 PM",
        delivery_date: "Delivered on Thu, Aug 04, 2022, 09:48 AM",
        price: "$635",
      },
    ],
  },

  DeliveryAddressess: [
    {
      id: 0,
      addresses: "No.1&2 Krishna Reddy Layout",
      landmark: "Domlur,Bengaluru - 560071",
    },
    {
      id: 1,
      addresses: "No.3&4 Krishna Reddy Layout",
      landmark: "Domlur,Bengaluru - 560071",
    },
    {
      id: 2,
      addresses: "No.5&6 Krishna Reddy Layout",
      landmark: "Domlur,Bengaluru - 560071",
    },
    {
      id: 3,
      addresses: "No.7&8 Krishna Reddy Layout",
      landmark: "Domlur,Bengaluru - 560071",
    },
  ],

  MobileSlider: [
    {
      id: 1,
      offerCode: "Truecake",
      persentage: "60",
      offerAmount: "300",
      price: "700",
    },
    {
      id: 2,
      offerCode: "Truecake",
      persentage: "60",
      offerAmount: "300",
      price: "700",
    },
    {
      id: 3,
      offerCode: "Truecake",
      persentage: "60",
      offerAmount: "300",
      price: "700",
    },
    {
      id: 4,
      offerCode: "Truecake",
      persentage: "60",
      offerAmount: "300",
      price: "700",
    },
  ],

  CakeWeight: [
    {
      id: 1,
      kilogram: "500gm",
    },
    {
      id: 2,
      kilogram: "1KG",
    },
    {
      id: 3,
      kilogram: "1.5KG",
    },
    {
      id: 4,
      kilogram: "2KG",
    },
    {
      id: 5,
      kilogram: "3KG",
    },
    {
      id: 6,
      kilogram: "4KG",
    },
  ],
};

export const addons = [];

// Array to be used in menu list

// export let Menucategory = [
//     {
//         key: 1,
//         item: "BROWNIES",
//         title: "BROWNIES",
//       },
//       {
//         key: 2,
//         item: "CAKE SHAKES",
//         title: "CAKE SHAKES",
//       },
//       {
//         key: 3,
//         item: "CAKES",
//         title: "CAKES",
//       },
//       {
//         key: 4,
//         item: "CUPCAKES",
//         title: "CUPCAKES",
//       },
//       {
//         key: 5,
//         item: "DESSERT JARS",
//         title: "DESSERT JARS",
//       },
//       {
//         key: 6,
//         item: "EXCLUSIVE COMBO DEALS",
//         title: "EXCLUSIVE COMBO DEALS",
//       },
//       {
//         key: 7,
//         item: "HEART CAKES",
//         title: "HEART CAKES",
//       },
//       {
//         key: 8,
//         item: "MILK SHAKES",
//         title: "MILK SHAKES",
//       },
//       {
//         key: 9,
//         item: "PASTRIES",
//         title: "PASTRIES",
//       },
// ]

export const landingConstants = {
  mainHeading: [
    {
      text: "Bring on the cake!",
      class: "brings",
    },
    {
      text: "THERE’S NOTHING BETTER THAN CAKE BUT MORE CAKE",

      class: "theres",
    },
    // {
    //   text:"cake but more cake",
    //   class:"theres"
    // },
  ],

  categories: "MENU",
  moreThanJust: {
    heading: "More Then Just Cakes",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt",
    image: ImageObj.customerImage,
  },

  catalog: {
    heading: "Catalog",
    image: ImageObj.Catalog,
  },

  customerReviews: {
    heading: "customer reviews",
    rightArrow: [ImageObj.RightArrow, ImageObj.LeftArrow],
    cardData: [
      {
        image: ImageObj.customerReview,
        name: "Kanha",
        description:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea",
      },
      {
        image: ImageObj.customerReview,
        name: "Madhav",
        description:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea",
      },
    ],
  },
  carouselData: [
    ImageObj.caroseulImage1,
    ImageObj.caroseulImage2,
    ImageObj.caroseulImage3,
  ],
  // footerData: [ImageObj.truecakelogo, ImageObj.locationIcon],
  footerData: {
    image1: ImageObj.truecakelogo,
    image2: ImageObj.locationIcon,
    image3: ImageObj.contactIcon,
    phone: 9980499808,
    add1: "No:1 & 2, Krishna Reddy Layout,  Domlur,",
    add2: "Banglore-560071 ,",
    gst: "GSTIN-29AADCL7193D1ZA",
    bring: "Bring on the",
    cakess: "CAKESSS ...",
    menuhead: "Menu",
    menu: [
      {
        item: "Brownies",
      },
      {
        item: "Cake Shakes",
      },
      {
        item: "Cakes",
      },
      {
        item: "Cupcakes",
      },
      {
        item: "Dessert Jars",
      },
      {
        item: "Exclusive Combo Deals",
      },
      {
        item: "Heart Cakes",
      },
      {
        item: "Milk Shakes",
      },
      {
        item: "Pastries",
      },
    ],
    infohead: "Information",
    infolist: [
      {
        item: "About Us",
      },
      {
        item: "Privacy Policy",
      },
      {
        item: "Terms of Use",
      },
      {
        item: "Blog",
      },
      {
        item: "Reviews",
      },
      {
        item: "Offers",
      },
    ],
    // poweredby1: "  Powered by ",
    // poweredby2: "Masalabox Food",
    // poweredby3: " Networks Pvt. © 2022",
  },
};

export const navItems = [
  {
    image: ImageObj.searchIcon,
    name: "search",
  },
  {
    image: ImageObj.offers,
    name: "offers",
  },
  {
    image: ImageObj.profile,
    name: "profile",
  },
  {
    image: ImageObj.profile,
    name: "login",
  },
  {
    image: ImageObj.cart,
    name: "cart",
  },
];

export const verifyOtpInputList = [
  { name: "opt1" },
  { name: "opt2" },
  { name: "opt3" },
  { name: "opt4" },
];
