import "./style.css";
import Images from "../../constant/Images";
import NavBar from "../../components/navBar/NavBar";
import CircularCategories from "../../components/circularCategory/CircularCategory";
import QuantityCounter from "../../components/quantityCounter/QuantityCounter";
import SelectWeight from "../../components/selectweight/SelectWeight";
import Crossbtn from "../../components/croossbtn/Crossbtn";
import Footer from "../../components/footer/Footer";
import MobileHeader from "../../components/mobileHeader/MobileHeader";
import MobileFooter from "../../components/mobileFooter/MobileFooter";
import { useSelector } from "react-redux";
import ButtonComponent from "../../components/button/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { landingConstants } from "../../constant/Constant";
import FooterMenuTab from "../../components/footerMenuTab/FooterMenuTab";

const AddToCart = () => {
  const navigates = useNavigate();
  const { cart } = useSelector((state: any) => state.addToCart);
  const handleChange = () => {
    navigates("/payment");
  };
  return (
    <>
      <div className="cart-background-img">
        <NavBar />
        <MobileHeader />
        <div className="cart-circular-category">
          <CircularCategories />
        </div>
        <div className="main-cart">
          <div className="cart-heading-main">
            <div className="cart-section">
              <div className="cat-heading-container">
                <div style={{ display: "flex", position: "relative" }}>
                  <div className="cat-heading-div">
                    <h4 className="heading-category">CART</h4>
                  </div>
                  <div className="cake-logo-div">
                    <img
                      className="cake-logo"
                      src={Images.logo}
                      alt="cake-logo"
                    />
                  </div>
                </div>
                <div className="cart-bottom-div"></div>
              </div>
              <img
                className="cart-cake-img"
                src={Images.productCake}
                alt="productCake"
              />
            </div>
            <div className="cake-detail-section">
              <p className="cart-chocolate-truffle">Chocolate Truffle</p>
              <div style={{ display: "flex" }}>
                <div>
                  <p className="cart-price">$635</p>
                </div>
                <div className="cart-inclusive-text">
                  Inclusive of all taxes
                </div>
              </div>
              <div className="cart-quantity-category">
                <div>
                  <input
                    className="cart-input"
                    type="text"
                    placeholder="Happy Birthday !"
                  />
                </div>
                <div>
                  <QuantityCounter />
                </div>
                <div>
                  <SelectWeight />
                </div>
                <div>
                  <Crossbtn />
                </div>
              </div>
              <div className="cart-knife-main">
                <div style={{ display: "flex"  }} >
                  <div>
                    <img src={Images.candle} alt="candle" />
                  </div>
                  <div className="text-knife-candle">
                    <p>Knife and Candle</p>
                    <p className="cart-price-dollar">$1</p>
                  </div>
                </div>
                <div>
                  <QuantityCounter />
                </div>
              </div>
              <div style={{ marginTop: "20px" }}>
                <input
                  className="cart-coupon"
                  type="text"
                  placeholder="Apply Coupan"
                />
                <div>
                  <img
                    className="coupon-offer-img"
                    src={Images.offerCoupon}
                    alt="candle"
                  />
                </div>
              </div>
              <div className="apply-coupan-container">
                <div className="apply-coupan-input">
                  <div className="offer-discount">
                    <Form.Check type="checkbox" aria-label="radio 1" className="checkbox-div" />
                    <p className="ms-2 offer-discount-text">20% OFF On your next purchase</p>
                  </div>
                  <div>
                    <p className="offer-discount-text">Use by July, 2022</p>
                  </div>
                </div>
                <div className="apply-coupan-input">
                  <div className="offer-discount">
                    <Form.Check type="checkbox" aria-label="radio 1" className="checkbox-div" />
                    <p className="ms-2 offer-discount-text">20% OFF On your next purchase</p>
                  </div>
                  <div>
                    <p className="offer-discount-text">Use by July, 2022</p>
                  </div>
                </div>
              </div>
              <div className="cart-price-detail">
                <div className="cat-heading-container">
                  <div style={{ display: "flex", position: "relative" }}>
                    <div className="cat-heading-div">
                      <h4 className="heading-category">PRICE DETAILS</h4>
                    </div>
                    <div className="cake-logo-div">
                      <img
                        className="cake-logo"
                        src={Images.logo}
                        alt="cake-logo"
                      />
                    </div>
                  </div>
                  <div className="price-bottom-div"></div>
                </div>
                <div>
                  <div className="price-detail-div">
                    <div className="cart-total">
                      <p>Cart Total</p>
                    </div>
                    <div className="card-middle">:</div>
                    <div className="card-amount">$636</div>
                  </div>
                  <div className="price-detail-div">
                    <div className="cart-total">
                      <p>GST</p>
                    </div>
                    <div className="card-middle">:</div>
                    <div className="card-amount">$25</div>
                  </div>
                  <div className="price-detail-div">
                    <div className="cart-total">
                      <p>Packing Charges</p>
                    </div>
                    <div className="card-middle">:</div>
                    <div className="card-amount">Free</div>
                  </div>
                  <div className="price-detail-div">
                    <div className="cart-total">
                      <p>Offer Apply</p>
                    </div>
                    <div className="card-middle">:</div>
                    <div className="card-amount">-20</div>
                  </div>
                </div>
              </div>
              <div className="cart-price-detail">
                <div className="cat-heading-container">
                  <div style={{ display: "flex", position: "relative" }}>
                    <div className="cat-heading-div">
                      <h4 className="heading-category">DELIVERY ADDRESS</h4>
                    </div>
                    <div className="cake-logo-div">
                      <img
                        className="cake-logo"
                        src={Images.logo}
                        alt="cake-logo"
                      />
                    </div>
                  </div>
                  <div className="delivery-address-bottom-div"></div>
                </div>
                <div>
                  <div className="price-detail-div">
                    <div className="cart-total">
                      <p>Email Address</p>
                    </div>
                    <div className="card-middle">:</div>
                    <div className="card-amount">johndoe@gmail.com</div>
                  </div>
                  <div className="price-detail-div">
                    <div className="cart-total">
                      <p>Mobile No.</p>
                    </div>
                    <div className="card-middle">:</div>
                    <div className="card-amount">1234567890</div>
                  </div>
                  <div className="price-detail-div">
                    <div className="cart-total">
                      <p>Location</p>
                    </div>
                    <div className="card-middle">:</div>
                    <div className="card-amount">
                      Bengaluru, Karnataka, India
                    </div>
                  </div>
                  <div className="price-detail-div">
                    <div className="cart-total">
                      <p>Landmark</p>
                    </div>
                    <div className="card-middle">:</div>
                    <div className="card-amount">Bengaluru</div>
                  </div>
                </div>
              </div>
              <div className="cart-price-detail">
                <div className="cat-heading-container">
                  <div style={{ display: "flex", position: "relative" }}>
                    <div className="cat-heading-div">
                      <h4 className="heading-category">DELIVERY TIME</h4>
                    </div>
                    <div className="cake-logo-div">
                      <img
                        className="cake-logo"
                        src={Images.logo}
                        alt="cake-logo"
                      />
                    </div>
                  </div>
                  <div className="delivery-time-bottom-div"></div>
                </div>
                <div>
                  <div className="price-detail-div">
                    <div className="cart-total">
                      <p>Delivery Date</p>
                    </div>
                    <div className="card-middle">:</div>
                    <div className="card-amount">25-08-2022</div>
                  </div>
                  <div className="price-detail-div">
                    <div className="cart-total">
                      <p>Delivery Time</p>
                    </div>
                    <div className="card-middle">:</div>
                    <div className="card-amount">08:00 AM-10:00 AM</div>
                  </div>
                </div>
                <div className="make-payment-div">
                  <ButtonComponent
                    type="button"
                    title="MAKE PAYMENT"
                    onClick={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ..............mobile view................... */}
        <div className="card-main-mobile">
          <div className="cat-heading-container">
            <div style={{ display: "flex", position: "relative" }}>
              <div className="cat-heading-div">
                <h4 className="heading-category">CART</h4>
              </div>
              <div className="cake-logo-div">
                <img className="cake-logo" src={Images.logo} alt="cake-logo" />
              </div>
            </div>
            <div className="cart-bottom-div"></div>
          </div>
          <div className="card-top-view-mobile">
            <div>
              <img src={Images.arrowCard} alt="" />
            </div>
            <div>
              <p className="chocolate-truffle-heading-mobile">
                Chocolate Truffle
              </p>
              <p className="card-amount-mobile">$625.00</p>
            </div>
            <div></div>
          </div>
          <div className="product-cake-main-mobile">
            <div className="product-cake-mobile">
              <img src={Images.productCake} alt="" className="product-cake" />
            </div>
            <div className="product-cake-right-content-mobile">
              <p className="cake-msg-mobile">Cake Message:</p>
              <p className="happy-birthday">Happy Birthday!</p>
              <div className="product-cake-counter">
                <div>
                  <QuantityCounter />
                </div>
                <div>
                  <SelectWeight />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer data={landingConstants.footerData} />
        <MobileFooter />
        <FooterMenuTab />
      </div>
    </>
  );
};
export default AddToCart;
