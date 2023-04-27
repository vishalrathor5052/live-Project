import { Box, List } from "@mui/material";
import Image from "../../constant/Image";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import "./style.css";
import { sideNavBar } from "../../constant/String";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setHeaders } from "../../Store/CartSlice";
import { memo, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<
    Record<string, string | any>
  >({});
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const updateHeading: any = path.includes("categorymenu")
      ? { Categories: true }
      : path === "/orders"
      ? { Orders: true }
      : path.includes("products")
      ? { Products: true }
      : path.includes("offers")
      ? { Offers: true }
      : path.includes("user")
      ? { User: true }
      : path.includes("addons")
      ? { Addons: true }
      : path.includes("analytic")
      ? { Analytics: true }
      : path.includes("config")
      ? { Config: true }
      : path.includes("/orders")
      ? { Orders: true }
      : {};

    setSelectedItem(updateHeading);
  }, [location]);

  return (
    <div className="sidebar-container">
      <div className="sidebar-logo-div">
        <img src={Image.withoutbglogo} alt="" />
      </div>
      <div className="sidebar-main">
        <List>
          {sideNavBar?.map((elm: any, idx: any) => {
            return (
              <Box
                onClick={async () => {
                  // setSelectedItem({ [elm.text]: true });
                  await dispatch(setHeaders(elm));
                  navigate(elm.link);
                }}
                sx={{ my: 1 }}
                className={`mt-3 ${
                  selectedItem[elm.text] ? "selected-list-item" : ""
                }`}
              >
                {/* <div > */}
                <ListItemButton className="list-button">
                  <ListItemIcon>
                    <img
                      src={
                        selectedItem[elm?.text] ? elm?.activeImage : elm?.image
                      }
                      alt="order"
                    />
                  </ListItemIcon>
                  <ListItemText primary={elm?.text} className="listText" />
                  <ListItemIcon>
                    {/* <img src={Image.arrowWhite} alt="arrow" /> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="9.009"
                      height="16.016"
                      viewBox="0 0 9.009 16.016"
                    >
                      <g
                        id="Iconly_Broken_Arrow---white"
                        data-name="Iconly/Broken/Arrow---white"
                        transform="translate(9.009) rotate(90)"
                      >
                        <path
                          id="Arrow---Down-2"
                          d="M.242,8.765a.815.815,0,0,0,1.165,0h0L8.591,1.429a.846.846,0,0,0,0-1.185.813.813,0,0,0-1.164,0h0L.241,7.58A.847.847,0,0,0,.242,8.765Zm14.366,0a.815.815,0,0,0,1.166,0,.847.847,0,0,0,0-1.185h0L11.006,2.71a.813.813,0,0,0-1.164,0,.847.847,0,0,0,0,1.185h0Z"
                          transform="translate(0)"
                          fill={selectedItem[elm?.text] ? "#000" : "#fff"}
                        />
                      </g>
                    </svg>
                  </ListItemIcon>
                </ListItemButton>
                {/* </div> */}
              </Box>
            );
          })}
        </List>
      </div>
    </div>
  );
};

export default memo(Sidebar);
