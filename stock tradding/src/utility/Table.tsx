import * as IMG from "../components/common/Images";

const statement = [
  { field: "img", header: "#" },
  { field: "companyName", header: "Company Name" },
  { field: "InvestmentAmt", header: "Investment Amt" },
  { field: "averagePrice", header: "Price" },
  { field: "AvgPrice", header: "Avg.Price" },
];
const balance = [
  { field: "CompanyName", header: "Company Name" },
  { field: "FundsBlock", header: "Funds Block" },
];
const investment = [
  // { field: "img", header: "" },
  { field: "companyName", header: "Company Name" },
  { field: "noOfShares", header: "No. Of Shares" },
  { field: "averagePrice", header: "Average Cost" },
  { field: "ltp", header: "LTP" },
  { field: "currentValue", header: "Current Value" },
  { field: "profitAndLoss", header: "P&L" },
  { field: "netChanges", header: "Net Chg" },
];
const FundStatement = [
  { field: "Date", header: "Date" },
  { field: "Particular", header: "Particular" },
  { field: "Debit", header: "Debit" },
  { field: "Credit", header: "Credit" },
  { field: "NetBalance", header: "Net Balance" },
];
const orderBook = [
  { field: "Date/Time", header: "Date/Time" },
  { field: "companyName", header: "Company Name" },
  { field: "companyISIN", header: "Company ISIN" },
  { field: "Price", header: "Price" },
  { field: "QTY", header: "QTY" },
  { field: "Status", header: "Status" },
];

const sellorderpreview = [
  { field: "companylogo", header: "Company logo" },
  { field: "companyName", header: "Company Name" },
  { field: "companyISIN", header: "Company ISIN" },
  { field: "Price", header: "Price" },
  { field: "Quantity", header: "Quantity" },
  { field: "Brokerage", header: "Brokerage" },
  { field: "Netamount", header: "Net Amount" },
];

// ....................Api Feck Data open...............................

const tableData = [
  {
    img: IMG.companyLogo,
    CompanyName: "chennai",
    InvestmentAmt: "10000",
    Price: "11000",
    AvgPrice: "11000",
  },
];
const invesmentData = [
  {
    img: IMG.companyLogo,
    companyName: "company name ",
    noOfShares: "9",
    averageCost: "250",
    ltp: "15",
    currentValue: "500",
    profitAndLoss: "0",
    netChanges: "1",
  },
];
const balancedata = [
  {
    companyName: "Chennai Super King",
    FundsBlock: "11000",
  },
  {
    companyName: "Pharmacy",
    FundsBlock: "11000",
  },
  {
    companyName: "Chennai Super King",
    FundsBlock: "11000",
  },
];

export {
  statement,
  balance,
  tableData,
  investment,
  invesmentData,
  FundStatement,
  balancedata,
  orderBook,
  sellorderpreview,
};
