import React, { useState, useEffect } from "react";
import NavBar from "../../components/navBar/NavBar";
import Footer from "../../components/footer/Footer";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import ButtonComponent from "../../components/button/Button";
import Images from "../../constant/Images";
import "./style.css";
import { PATH } from "../../constant/Constant";
import { landingConstants } from "../../constant/Constant";
import ProductCard from "../../components/productCard/ProductCard";
import Loader from "../../components/loader/Loader";
import axios from "axios";
import CircularCategory from "../../components/circularCategory/CircularCategory";
import MobileHeader from "../../components/mobileHeader/MobileHeader";
import FooterMenuTab from "../../components/footerMenuTab/FooterMenuTab";
import { useSelector } from "react-redux";
import { TablePagination } from "@mui/material";

const Searchcake = () => {
  const [record, setRecord] = useState("");
  const [search, setSearch] = useState("");
  const [cakes, setCakes] = useState([]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [isLoader, setIsLoader] = useState(true);
  const rowsPerPage = 6;
  const {
    userDetails: { userDetail },
  } = useSelector((state: any) => state);

  const handleChange = (event: any) => {
    setRecord(event.target.value);
  };

  const getSearchCake = () => {
    setIsLoader(true);
    const offsets: number = page * rowsPerPage;
    return axios
      .get(
        `${PATH}product/searchList?product=${record}&type=1&limit=${rowsPerPage}&offset=${offsets}`,
        {
          method: "get",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: userDetail.tokenId?.data
              ? "Bearer " + userDetail.tokenId?.data
              : "",
          },
        }
      )
      .then((response) => {
        setCakes(response?.data?.data?.data ?? response?.data?.data);
        console.log("response in search cake", response?.data?.data);
        setCount(response?.data?.data?.countProducts);
        setIsLoader(false);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getSearchCake();
  }, [page]);

  const handleSearch = () => {
    setSearch(record);
    getSearchCake();
    // getSearchCake();
  };

  const handleChangePage = async (event: unknown, newPage: number) => {
    await setPage(newPage);
  };

  return (
    <div style={{ height: "100vh", width: "100vw", overflowX: "hidden" }}>
      <>
        <NavBar />
        <MobileHeader />
        <div className="circular-cat-main">{/* <CircularCategory /> */}</div>
        <div className="search-input-button">
          <InputGroup className="mb-3 mt-2 input-cake">
            <InputGroup.Text className="search-box">
              <img src={Images.search} alt="" className="search-icon" />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search your favorite cake"
              aria-label="Username"
              aria-describedby="basic-addon1"
              className="search-placeholder"
              value={record}
              onChange={handleChange}
              required
            />
          </InputGroup>
          <ButtonComponent
            title="Search"
            type="button"
            customClass="search-btn"
            onClick={handleSearch}
          />
        </div>
        {/* Heading Div */}
        {isLoader ? (
          <div style={{ height: "20%", width: "100%" }}>
            <Loader />
          </div>
        ) : (
          <div className="search-cake-container">
            <div className="search-heading-main">
              <div className="heading-category">
                {search.length > 0 ? search : "POPULAR CAKES"}
                <img
                  className="cake-logo"
                  src={Images.logo}
                  alt="search-cake-logo"
                />

                <div className="searchcake-bottom-div"></div>
              </div>
            </div>

            <div className="add-to-cart-section">
              {cakes?.length === 0 ? (
                // <h3 className="">Data not found</h3>
                <>
                  <img
                    className="search-image"
                    src={Images.searchImage}
                    alt="search-image"
                  />
                  <h1 className="No-Record">
                    Sorry !! We couldn't find {search}
                    {/* NO RECORD FOUND */}
                  </h1>
                </>
              ) : (
                cakes
                  .filter((val: any) => {
                    if (search === "") {
                      return val;
                    } else if (
                      val?.productName
                        ?.toLocaleLowerCase()
                        .includes(search.toLocaleLowerCase())
                    ) {
                      return val;
                    } else if (val?.productPrice?.toString().includes(search)) {
                      return val;
                    }
                  })
                  .map((elm: any) => {
                    return (
                      <div className="card-landing-page" key={elm?.id}>
                        <ProductCard items={elm} />
                      </div>
                    );
                  })
              )}
            </div>

            <div className="search-pagination">
              <TablePagination
                rowsPerPageOptions={[9]}
                component="div"
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
              />
            </div>
          </div>
        )}
        <div style={{ position: "fixed", bottom: 0, width: "100vw" }}>
          <FooterMenuTab menuData={true} />
        </div>
        <Footer data={landingConstants.footerData} />
      </>
    </div>
  );
};

export default Searchcake;
