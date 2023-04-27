import "./style.css";
import Images from "../../constant/Images";
import { useState, memo } from "react";
import ButtonComponent from "../../components/button/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";
import ToastAlert from "../../components/Toast/Toast";

const Location = () => {
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleNavigate = () => {
    // if (userDetail?.location) {
    setOpen(true);
    setMessage("Please Select Location");
    // } else {
    //   navigate("/landing");
    // }
  };
  const handleChange = (e: any) => {
    if (e.target.value !== "") {
      setLocation(e.target.value);
      setError("");
    }
  };
  const handleMap = () => {
    navigate("/location", {
      state: { heading: "Confirm Delivery Location", showbutton: true },
    });
  };

  const handleClick = () => {
    navigate("/location", {
      state: { heading: "Deliver To", showbutton: false },
    });
  };

  const handleSnackBar = () => {
    setOpen(false);
  };

  return (
    <>
      {open ? (
        <ToastAlert
          openBar={open}
          message={message}
          handleSnackBar={() => handleSnackBar()}
        />
      ) : null}
      <div className="location-background-img">
        <div className="your-location">
          {/* -------TRUECAKE LOGO------- */}
          <div className="logo-center">
            <div className="logo-div">
              <img
                className="truecake-logo"
                src={Images.trueCakeLogo}
                alt="location"
              />
            </div>
          </div>
          {/* -----END TRUECAKE LOGO----- */}
          <div className="location-div">
            <p className="your-location-text">Your Location</p>
          </div>
          <div className="location-search-section">
            <div>
              <p className="text-deliver">Deliver To</p>
            </div>
            {/* -----START SEARCH LOCATION INPUT-----  */}
            <InputGroup className="mb-3 mt-2 input-location">
              <InputGroup.Text className="search-box">
                <img src={Images.search} alt="" className="search-icon" />
              </InputGroup.Text>
              <Form.Control
                placeholder="Search street, locality..."
                aria-label="Username"
                aria-describedby="basic-addon1"
                className="search-placeholder"
                value={location}
                onChange={handleChange}
                onClick={handleClick}
                required
              />
            </InputGroup>
            {error && (
              <label style={{ color: "red" }} htmlFor="message">
                {error}
              </label>
            )}

            {/* -----END SEARCH LOCATION INPUT----- */}
            <div className="gps-main-div">
              <div className="use-current-location">
                <img className="gps-img" src={Images.gpsIcon} alt="location" />
                <p className="use-my-current-location ms-2" onClick={handleMap}>
                  Use my current location
                </p>
              </div>
              <div>
                <p className="change-location" onClick={handleMap}>
                  Change Location?
                </p>
              </div>
            </div>
            <div
              style={{
                width: "100%",
                textAlign: "center",
                margin: "auto",
                marginTop: "55px",
              }}
            >
              <ButtonComponent
                title="SELECT"
                type="button"
                onClick={handleNavigate}
                // disabled={!location}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default memo(Location);
