import { useEffect, useState } from "react";
import * as IMG from "../../components/common/Images";
import Modal from "react-bootstrap/Modal";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { map } from "highcharts";
import { Navigate, useNavigate } from "react-router-dom";

const Sector = (data: any) => {
  const NewData = data?.data;
  const [Popup, setPopUp] = useState([]);
  const [companyName, setCompanyName] = useState<string>("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const isUserLogin: any = localStorage.getItem("authToken");

  const HanldePopup = (e: number) => {
    let allNew: any = NewData.filter((elm: any) => elm.companyType === e);
    setPopUp(allNew);
  };
  const popoverSector = (
    <Popover id="popover-basic">
      <>
        <Popover.Header as="h3">Sector: {companyName}</Popover.Header>
        <Popover.Body>
          {Popup?.slice(0, 3).map((elm: any) => {
            return (
              <div className="sector-wise-comapny-name-logo">
                <img
                  src={`http://34.203.56.127:3000/stockTradingUploads/${elm.iconUrl}`}
                  alt=""
                  className="modal-company-logo"
                />

                <p
                  onClick={() => {
                    isUserLogin
                      ? navigate(`/companiesdetails/${elm.id}`)
                      : navigate(`/login`);
                  }}
                >
                  {elm?.companyName}
                </p>
              </div>
            );
          })}
        </Popover.Body>
      </>
    </Popover>
  );

  return (
    <>
      <div className="company-new-age-section">
        <div className="company-new-age-section-left">
          <div className="company-new-age-section-div">
            <p className="simple-pricing-line"></p>
            <p className="company-new-age-section-title">
              Companies by <br />
              Sector
            </p>
          </div>
          <div>
            <p className="company-new-age-para">
              We always intent for the long term investment and these investment
              can’t be done into average companies as they would generate the
              average return , but for a wealth building companies the companies
              need to have any one quality mentioned among these 4 let us
              explore the companies.
            </p>
          </div>
        </div>
        <div className="company-new-age-section-right">
          <div className="company-new-age-card-div">
            <OverlayTrigger
              trigger="click"
              rootClose
              placement="left"
              overlay={popoverSector}
            >
              <button
                className="company-new-age-card"
                onClick={() => {
                  setCompanyName("New Age");
                  HanldePopup(1);
                }}
              >
                <div>
                  <img src={IMG.sectorNew} alt="" className="hover-hide" />
                  <img src={IMG.sectorNewWhite} alt="" className="hover-show" />
                  <div className="company-sector">
                    <p>Sector: </p>
                    <p>New Age</p>
                  </div>
                </div>
              </button>
            </OverlayTrigger>
            <OverlayTrigger
              trigger="click"
              rootClose
              placement="left"
              overlay={popoverSector}
            >
              <button
                className="company-new-age-card"
                onClick={() => {
                  setCompanyName("Sustainable");
                  HanldePopup(2);
                }}
              >
                <div>
                  <img src={IMG.sustainable} alt="" className="hover-hide" />
                  <img
                    src={IMG.sustainableWhite}
                    alt=""
                    className="hover-show"
                  />
                  <div className="company-sector">
                    <p>Sector:</p>
                    <p> Sustainable</p>
                  </div>
                </div>
              </button>
            </OverlayTrigger>
          </div>
          <div className="company-new-age-card-div">
            <OverlayTrigger
              trigger="click"
              rootClose
              placement="left"
              overlay={popoverSector}
            >
              <button
                className="company-new-age-card"
                onClick={() => {
                  setCompanyName("Market Leader");
                  HanldePopup(3);
                }}
              >
                <div>
                  <img src={IMG.marketLeader} alt="" className="hover-hide" />
                  <img
                    src={IMG.marketLeaderWhite}
                    alt=""
                    className="hover-show"
                  />
                  <div className="company-sector">
                    <p>Sector:</p>
                    <p> Market Leader</p>
                  </div>
                </div>
              </button>
            </OverlayTrigger>
            <OverlayTrigger
              trigger="click"
              rootClose
              placement="left"
              overlay={popoverSector}
            >
              <button
                className="company-new-age-card"
                onClick={() => {
                  setCompanyName("Moat Business");
                  HanldePopup(4);
                }}
              >
                <div>
                  <img src={IMG.moatBusiness} alt="" className="hover-hide" />
                  <img
                    src={IMG.moatBusinessWhite}
                    alt=""
                    className="hover-show"
                  />
                  <div className="company-sector">
                    <p>Sector:</p>
                    <p> Moat Business</p>
                  </div>
                </div>
              </button>
            </OverlayTrigger>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sector;
