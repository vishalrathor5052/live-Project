import "./style.css";
import cakeLogo from "../../assets/images/headingLogo/cake.svg";
import { FC } from "react";
interface HeadingComponentProps {
  headingColor?: string;
  name: string;
}
const Heading: FC<HeadingComponentProps> = ({ headingColor, name }) => {
  return (
    <>
      <div>
        <div className="cakelogo_and_heading">
          <div className="cake_heading">
            <p
              className="heading_text "
              style={{ color: headingColor ? headingColor : "black" }}
            >
              {name}
            </p>
          </div>
          <div className="cake_div">
            <div className="rule"></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Heading;
