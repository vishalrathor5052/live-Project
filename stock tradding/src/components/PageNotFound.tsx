import { useNavigate } from "react-router-dom";
import { notFound } from "./common/Images";

const PageNotFound = () => {
  const Navigate = useNavigate();
  const GoToHome = () => {
    Navigate("/");
  };
  return (
    <>
      <img src={notFound} alt="" />
      <p style={{ textAlign: "center" }}>
        <button onClick={GoToHome} className="btn btn-primary">
          Go to Home
        </button>
      </p>
    </>
  );
};
export default PageNotFound;
