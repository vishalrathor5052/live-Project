import "./style.css";
import Images from "../../constant/Images";

const MoreThanJust = (props: any) => {
  const { data } = props;

  return (
    <div className="screenimage-main-div">
      <div className="heading">
        <div className="cat-heading-container">
          <div style={{ display: "flex", position: "relative" }}>
            <div className="cat-heading-div">
              <h4 className="morethen-just-heading">{data?.heading}</h4>
            </div>
            <div className="cake-logo-div">
              <img className="cake-logo" src={Images.logo} alt="cake-logo" />
            </div>
          </div>
          <div className="morethen-heading-bottom-div"></div>
        </div>
        <p className="more-then-text">{data.description}</p>
      </div>
      <div className="img-rounded-div">
        {/* <div className="men-img">
          <img className="man-img-circle" src={data.image} alt="men" />
        </div>
        <div className="yellow-line"></div> */}
        <img src={Images.morecakeweb} alt="" width={"100%"} height={"100%"} />
      </div>
    </div>
    // mobile view
  );
};

export default MoreThanJust;
