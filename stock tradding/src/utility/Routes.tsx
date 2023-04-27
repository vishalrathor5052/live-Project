import { lazy } from "react";
import Layout from "../components/common/Layout";
import Wrapper from "../components/common/Wrapper";
import FundStatment from "../screens/Reports/Funds/FundsStatment";
import Equity from "../screens/Reports/Equity/Equity";
import Dividend from "../screens/Reports/Dividend/Dividend";
import OrderReport from "../screens/Reports/OrderStatus/OrderReport";
import CompaniesDetails from "../screens/Reports/CompaniesDetails/CompaniesDetails";
import BankDetails from "../screens/BankDetails";
import Buy from "../screens/BuyAndSell/Buy";
import Sell from "../screens/BuyAndSell/Sell";
import Support from "../screens/Support/Index";
import ProfileSetting from "../screens/UserProfile/ProfileSetting";
import HoldingStatement from "../screens/Reports/Holding/Index";
import PageNotFound from "../components/PageNotFound";
import YourInvestment from "../screens/Investment/Investment";
import LoginWithOtp from "../screens/LoginWithOtp";
import LoginOtp from "../screens/LoginOtp";
import OrderConfirmation from "../screens/BuyAndSell/OrderConfirmation";
import SellAdvancePaymentDetail from "../screens/BuyAndSell/SellAdvancePaymentDetail";
import BuyOrderConfirmationPopup from "../screens/BuyAndSell/BuyOrderConfirmationPopup";
import ProfitLoss from "../screens/Reports/ProfileLoss/Index";
import SellOrderPreview from "../screens/BuyAndSell/SellOrderPreview";
import FinancialInfoPdf from "../screens/Reports/CompaniesDetails/FinancialInfoPdf";
import Loader from "../components/common/Loader";
import TermsConditions from "../screens/PrivacyPolicy/TermsConditions";
import PrivacyPolicy from "../screens/PrivacyPolicy/PrivacyPolicy";

const LandingPage = lazy(() => import("../screens/Main/LandingPage"));
const ChooseAccount = lazy(() => import("../screens/ChooseAccount"));
const Login = lazy(() => import("../screens/Login"));
const SignUp = lazy(() => import("../screens/SignUp"));
const EmailSignUp = lazy(
  () => import("../screens/RegulerDematSignup/EmailNameSignup")
);
const EmailOtpVerifcation = lazy(
  () => import("../screens/RegulerDematSignup/EmailOtpVerification")
);
const OtpVerifcation = lazy(() => import("../screens/OtpVerification"));
const DashBoard = lazy(() => import("../screens/Dashboard"));
const ConfirmPassword = lazy(() => import("../screens/ConfirmPassword"));
const KycForm = lazy(() => import("../screens/KycForm"));
const OrderBook = lazy(() => import("../screens/OrderBook/Index"));
const BalanceScr = lazy(() => import("../screens/Balance/BalanceScr"));
const Refferal = lazy(() => import("../screens/UserProfile/Refferal"));

const AppLandingPage = Layout(LandingPage);
const StockTermsConditions = Layout(TermsConditions);
const StockPrivacyPolicy = Layout(PrivacyPolicy);
const WrapperDashBoard = Wrapper(DashBoard);
const WrapperOrderBook = Wrapper(OrderBook);
const WrapperProfitLoss = Wrapper(ProfitLoss);
const WrapperFundStatment = Wrapper(FundStatment);
const WrapperEquity = Wrapper(Equity);
const WrapperDividend = Wrapper(Dividend);
const WrapperOrderReport = Wrapper(OrderReport);
const WrapperCompaniesDetails = Wrapper(CompaniesDetails);
const WrapperBalanceScr = Wrapper(BalanceScr);
const WrapperSupport = Wrapper(Support);
const WrapperProfileSetting = Wrapper(ProfileSetting);
const WrapperRefferal = Wrapper(Refferal);
const WrapperHoldingStatement = Wrapper(HoldingStatement);
const WrapperBuy = Wrapper(Buy);
const WrapperSell = Wrapper(Sell);
const WrapperYourInvestment = Wrapper(YourInvestment);
const WrapperOrderConfirmation = Wrapper(OrderConfirmation);
const WrapperSellAdvancePaymentDetail = Wrapper(SellAdvancePaymentDetail);
const WrapperBuyOrderConfirmationPopup = Wrapper(BuyOrderConfirmationPopup);
const WrapperSellOrderPreview = Wrapper(SellOrderPreview);

export const RouteList = [
  {
    path: "/",
    component: <AppLandingPage />,
    role: [101],
  },
  {
    path: "/chooseaccount",
    component: <ChooseAccount />,
    role: [102],
  },
  {
    path: "/otpverification",
    component: <OtpVerifcation />,
    role: [103],
  },
  {
    path: "/login",
    component: <Login />,
    role: [104],
  },
  {
    path: "/signUp",
    component: <SignUp />,
    role: [105],
  },
  {
    path: "/confirmpassword",
    component: <ConfirmPassword />,
    role: [106],
  },
  {
    path: "/kycform",
    component: <KycForm />,
    role: [107],
  },
  {
    path: "/bankdetails",
    component: <BankDetails />,
    role: [108],
  },
  {
    path: "/dashboard",
    component: <WrapperDashBoard />,
    role: [109],
  },
  {
    path: "/orderbook",
    component: <WrapperOrderBook />,
    role: [110],
  },
  {
    path: "/profitloss",
    component: <WrapperProfitLoss />,
    role: [111],
  },
  {
    path: "/fundsstatement",
    component: <WrapperFundStatment />,
    role: [112],
  },
  {
    path: "/equity",
    component: <WrapperEquity />,
    role: [113],
  },
  {
    path: "/dividends",
    component: <WrapperDividend />,
    role: [114],
  },
  {
    path: "/orderreport",
    component: <WrapperOrderReport />,
    role: [115],
  },
  {
    path: "/companiesdetails/:id",
    component: <WrapperCompaniesDetails />,
    role: [116],
  },
  {
    path: "/buy/:id",
    component: <WrapperBuy />,
    role: [117],
  },
  {
    path: "/support",
    component: <WrapperSupport />,
    role: [118],
  },
  {
    path: "/balance",
    component: <WrapperBalanceScr />,
    role: [119],
  },
  {
    path: "/profilesetting",
    component: <WrapperProfileSetting />,
    role: [120],
  },
  {
    path: "/referral",
    component: <WrapperRefferal />,
    role: [121],
  },
  {
    path: "/holdingstatement",
    component: <WrapperHoldingStatement />,
    role: [122],
  },
  {
    path: "*",
    component: <PageNotFound />,
    role: [123],
  },
  {
    path: "/investment",
    component: <WrapperYourInvestment />,
    role: [124],
  },
  {
    path: "/orderconfirmation",
    component: <WrapperOrderConfirmation />,
    role: [125],
  },
  {
    path: "/selladvancepaymentdetail",
    component: <WrapperSellAdvancePaymentDetail />,
    role: [126],
  },
  {
    path: "/buyorderconfirmationpopup",
    component: <WrapperBuyOrderConfirmationPopup />,
    role: [127],
  },
  {
    path: "/sell/:id",
    component: <WrapperSell />,
    role: [128],
  },
  {
    path: "/loginwithotp",
    component: <LoginWithOtp />,
    role: [129],
  },
  {
    path: "/loginotp",
    component: <LoginOtp />,
    role: [130],
  },
  {
    path: "/emailsignup",
    component: <EmailSignUp />,
    role: [131],
  },
  {
    path: "/emailotpverification",
    component: <EmailOtpVerifcation />,
    role: [132],
  },
  {
    path: "/sellorderpreview",
    component: <WrapperSellOrderPreview />,
    role: [133],
  },
  {
    path: "/financialinfopdf",
    component: <FinancialInfoPdf />,
    role: [134],
  },
  {
    path: "/loader",
    component: <Loader />,
    role: [134],
  },
  {
    path: "/terms",
    component: <StockTermsConditions />,
    role: [135],
  },
  {
    path: "/privacypolicy",
    component: <StockPrivacyPolicy />,
    role: [136],
  },
];
