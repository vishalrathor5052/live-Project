import axios from "axios";
export const BaseUrl = "http://34.203.56.127:3000/api";
const instance: any = axios.create({
  baseURL: "http://34.203.56.127:3000/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config: any) {
    const authToken = JSON.parse(localStorage.getItem("authToken") as any);
    config.headers["Authorization"] = `Bearer ${authToken}`;
    return config;
  },
  function (error: any) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default instance;

// .....................................Header & Dropdown Links.................................
export const HeaderLinks = [
  {
    id: "90",
    linkid: "/dashboard",
    name: "Dashboard",
  },
  {
    id: "91",
    linkid: "/orderbook",
    name: "Order Book",
  },
];

export const ReportDropDown = [
  {
    id: "101",
    linkid: "/profitloss",
    name: "Profit and Loss",
  },
  {
    id: "102",
    linkid: "/fundsstatement",
    name: "Funds Statement",
  },
  {
    id: "103",
    linkid: "/equity",
    name: "Equity Inflow & Outflow",
  },
  {
    id: "104",
    linkid: "/dividends",
    name: "Dividend Statement",
  },
  {
    id: "105",
    linkid: "/orderreport",
    name: "Orders Report/Tradebook",
  },
  {
    id: "106",
    linkid: "/holdingstatement",
    name: "Holding Statement",
  },
];

export const ProfileDropDown = [
  {
    id: "101",
    linkid: "/profilesetting",
    name: "Profile Setting",
  },
  {
    id: "102",
    linkid: "/referral",
    name: "Referral Code",
  },
  {
    id: "103",
    linkid: "/support",
    name: "Support",
  },
];
