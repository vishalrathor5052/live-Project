import Footer from "../footer/Footer";
import Heading from "../heading/Heading";
import NavBar from "../navBar/NavBar";
import ButtonComponent from "../../components/button/Button";
import "./style.css";
const AddDeliveryAddress = () => {
  return (
    <div className="add-delivery-main">
      <NavBar />
      <div className="add-delivery-container">
        <Heading name="ADD DELIVERY ADDRESS" />
        <div className="inputbox-main-div">
          <div>
            <label className="input-lable ">Name</label>
            <input className="inputbox-txt" type="text" />
          </div>
          <div className="label-div">
            <label className="input-lable ">Email*</label>
            <input className="inputbox-txt " type="text" name="email" />
          </div>
          <div className="label-div">
            <label className="input-lable ">Mobile No.</label>
            <input className="inputbox-txt " type="text" name="email" />
          </div>
          <div className="label-div">
            <label className="input-lable ">Location</label>
            <input className="inputbox-txt " type="text" name="email" />
          </div>
          <div className="label-div">
            <label className="input-lable ">Landmark</label>
            <input className="inputbox-txt " type="text" name="email" />
          </div>
          <div className="label-div">
            <label className="input-lable ">Pincode</label>
            <input className="inputbox-txt " type="text" name="Pincode" />
          </div>
          <div style={{ width: "30%", marginTop: "55px" }}>
            <ButtonComponent
              title="SAVE ADDRESS"
              customStyles={{ padding: "0px 50px" }}
              // onClick={() => {
              // }}
              type="button"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default AddDeliveryAddress;
