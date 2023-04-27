import "./style.css";
import Image from "../../constant/Images";

const Review = (props: any) => {
  return (
    <div className="customer-review-conatiner">
      <div>
        <img
          className="customer-image"
          src={props.data.image}
          alt="customer_image"
        />
      </div>
      <div>
        <div className="testimony-div">
          <img src={Image.testimony} alt="" className="testimony-image" />
          <p className="john-doe-heading">{props.data.name}</p>
        </div>
        <div className="customer-review-content-div">
          <p className="customer-review-pera truncate-line-clamp">
            {props.data.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Review;
