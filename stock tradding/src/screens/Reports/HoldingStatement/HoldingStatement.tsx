import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import buyorange from "../../../assets/Images/sell-orange.svg";
import buyPurpul from "../../../assets/Images/buy-purple.svg";
import Dropdown from "react-bootstrap/Dropdown";
import filtericon from "../../../assets/Images/filter.svg";
import arrowRight from "../../../assets/Images/arrow-right.svg";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const HoldingStatement = () => {
  return (
    <div>
      <div className="order-book-container">
        <div
          className="company-logo-name-wrapper"
          style={{ paddingBottom: 20, justifyContent: "space-between" }}
        >
          <div style={{ display: "flex" }}>
            <p>Your Investments</p>
          </div>
          <div className="order-book-right-section">
            <p className="net-profit-text">Net Profit: 244</p>
            <div className="profit-loss-date-time-div">
              <div className="dateInput">
                <input type="date" />
              </div>
              <div style={{ margin: "0 10px" }}> - </div>
              <div className="dateInput">
                <input type="date" />
              </div>
            </div>
            <Dropdown className="filter-button">
              <Dropdown.Toggle
                variant=""
                id="dropdown-basic"
                className="filter-button"
              >
                <img src={filtericon} alt="" /> Filter
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="order-book-table-container">
          <div className="order-book-table-heading">
            <p>Company Name</p>
          </div>
          <div className="order-book-table-heading">
            <p>ISIN No.</p>
          </div>
          <div className="order-book-table-heading">
            <p>QTY</p>
          </div>
          <div className="order-book-table-heading">
            <p>Buy Avg</p>
          </div>
          <div className="order-book-table-heading">
            <p>Sell Avg</p>
          </div>
          <div className="order-book-table-heading">
            <p>Realised</p>
          </div>
        </div>
        <div className="order-book-table-row">
          <div className="order-book-table-data">
            <p>Realised</p>
          </div>
          <div className="order-book-table-data">
            <p>INE852S0101</p>
          </div>
          <div className="order-book-table-data">
            <p>10</p>
          </div>
          <div className="order-book-table-data">
            <p>1200</p>
          </div>
          <div className="order-book-table-data">
            <p>100</p>
          </div>
          <div className="order-book-table-data">
            <p>Loss</p>
          </div>
        </div>

        {/* ...........tab company details page ............ */}
        <br />
        <Tabs
          defaultActiveKey="profile"
          id="justify-tab-example"
          className="mb-3 tab-container company-detail-mobile"
          justify
          fill={false}
        >
          <Tab eventKey="home" title="Overview">
            <p>para1</p>
          </Tab>

          <Tab eventKey="profile" title="Financial Information">
            <p>para2</p>
          </Tab>
          <Tab eventKey="longer-tab" title="Shareholding">
            <p>para3</p>
          </Tab>
          <Tab eventKey="contact" title="General Info/News">
            <p>para4</p>
          </Tab>
        </Tabs>
        <br />
        <div className="shareholding-main-div">
          <div className="shareholding-heading">
            <p>Shareholding 1</p>
          </div>
          <div className="shareholding-bottom-div">
            <div className="shareholding-progress-bar"></div>
          </div>
        </div>

        <br />
        <div className="payment-container">
          <div className="upi-title">
            <p>UPI</p>
          </div>
          <div className="arrow-div">
            <img src={arrowRight} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoldingStatement;
