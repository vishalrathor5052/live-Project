import React, { useState, useCallback, useEffect } from "react";
import "./style.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Input from "../../component/input/Input";
import Browser from "../../component/browser/browser";
import ButtonComponent from "../../component/button/ButtonComponent";
import axios from "axios";
import ApiComponents from "../../constant/ApiComponents";
import CustomizedSnackbars from "../../utils/CustomizedSnackbars";
const Config = () => {
  const [value, setValue] = React.useState("1");
  const [logo, setLogo] = useState<any>();
  const [favicon, setFavicon] = useState<any>();
  const [logoUrl, setLogoUrl] = useState();
  const [faviconUrl, setFaviconUrl] = useState();
  const [message, setMessage] = useState();
  const [open, setOpen] = useState(false);
  const [minOrder, setMinOrder] = useState<number>(1);
  const [maxOrder, setMaxOrder] = useState<number>(20);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const payload = {
    logo: logoUrl,
    favicon: faviconUrl,
  };

  const payloadorder = {
    minQuantityOrder: Number(minOrder),
    maxQuantityOrder: Number(maxOrder),
  };

  const handleSnackBar = () => {
    setOpen(false);
  };
  //logo and Favicon upload...................

  useEffect(() => {
    if (logo) {
      setLogo("");
      newFile(logo, setLogoUrl);
    } else if (favicon) {
      setFavicon("");
      newFile(favicon, setFaviconUrl);
    }
  }, [logo, favicon]);

  const newFile = useCallback(async (data: any, setPath: any) => {
    const formData: any = new FormData();
    formData.append("image", data);
    await axios
      .post(`http://34.200.195.34:7000/api/uploads`, formData)
      .then((res: any) => {
        setPath(res?.data?.data.url);
      })
      .catch((err) => console.log("err", err));
  }, []);

  ///favicon

  const handleSave = async (payload: any) => {
    await ApiComponents.LogoUpload(payload)
      .then((res: any) => {
        setMessage(res);
        setOpen(true);
      })
      .finally(() => {});
  };

  //orderQunatity.....................

  const handleOrderQuantity = async (payload: any) => {
    await ApiComponents.orderQuantity(payload)
      .then((res: any) => {
        setMessage(res);
        setOpen(true);
      })
      .finally(() => {});
  };
  const onhandleOrder = () => {
    handleOrderQuantity(payloadorder);
  };

  return (
    <div className="config-label-color">
      {open ? (
        <CustomizedSnackbars
          openBar={open}
          message={message}
          handleSnackBar={() => handleSnackBar()}
        />
      ) : null}

      <Box sx={{ width: "100%", typography: "body1",}}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider",  }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Admin Portal" value="1" />
              <Tab label="Checkout / Cart" value="2" />
            </TabList>
          </Box>

          <TabPanel value="1">
            <div className="admin-portal">
              <div className="admin-portal-left-div">
                <Input
                  label="Logo"
                  labelClass="logo-label-config"
                  name="logo"
                  value={logo?.name}
                />
              </div>
              <div className="admin-portal-right-div">
                <Box
                  sx={{
                    fontSize: "16px",
                    fontFamily: "Source Sans Pro",
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  <Browser
                    className="browser-btn"
                    handleImage={(e: any) => {
                      setLogo(e);
                    }}
                  />
                </Box>
              </div>
            </div>
            <div className="admin-portal">
              <div className="admin-portal-left-div">
                <Input
                  label="Favicon"
                  labelClass="favicon-label"
                  value={favicon?.name}
                />
              </div>
              <div className="admin-portal-right-div">
                <Browser className="browser-btn" handleImage={(e: any) => setFavicon(e)} />
              </div>
              <div className="config-bottom-div">
                <ButtonComponent
                  type="button"
                  title="CANCEL"
                  customStyles={{
                    background: "white",
                    border: "1px solid #F8D40C !important",
                  }}
                />
                <ButtonComponent
                  type="button"
                  title="SAVE"
                  onClick={() => handleSave(payload)}
                />
              </div>
            </div>
          </TabPanel>
          <TabPanel value="2">
            <div className="admin-portal">
              <div className="admin-portal-left-div">
                <Input
                  type="number"
                  label="Minimum Order Quantity"
                  labelClass="minimun-order-quantity-label"
                  value={`${minOrder}`}
                  onHandleChange={(e: any) => {
                    e.target.value <= 0
                      ? setMinOrder(0)
                      : e.target.value >= 6
                      ? setMinOrder(5)
                      : setMinOrder(e.target.value);
                  }}
                  customStyles="inputField"
                />
              </div>
            </div>
            <div className="admin-portal">
              <div className="admin-portal-left-div">
                <Input
                  type="number"
                  label="Maximum Order Quantity"
                  labelClass="maximum-order-quantity-label"
                  onHandleChange={(e: any) => {
                    e.target.value <= 0
                      ? setMaxOrder(0)
                      : setMaxOrder(e.target.value);
                  }}
                  value={`${maxOrder}`}
                />
              </div>
            </div>
            <div className="config-bottom-div">
              <ButtonComponent
                type="button"
                title="CANCEL"
                customStyles={{
                  background: "white",
                  border: "1px solid #F8D40C !important",
                }}
              />
              <ButtonComponent
                type="button"
                title="SAVE"
                onClick={onhandleOrder}
              />
            </div>
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default Config;
