import { useNavigate } from "react-router-dom";

const Enroll = () => {
  const navigates = useNavigate();
  const handleSignUp = () => {
    navigates("/chooseaccount");
  };

  return (
    <>
      <div className="signup-your-ac-section">
        <p className="signup-your-ac-title">
          Sign up your account and buy and sell in 5 minutes
        </p>
        {/* <p className="signup-your-ac-para">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy <br />
          eirmod tempor invidunt.
        </p> */}
        <button className="signup-ac-button" onClick={handleSignUp}>
          Sign up
        </button>
      </div>
    </>
  );
};
export default Enroll;
