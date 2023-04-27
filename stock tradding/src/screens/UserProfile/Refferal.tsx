import { useState } from "react";
import { ToastContainer, Slide } from "react-toastify";

const Refferal = () => {
  const [text, setText] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const refferalCode: any = localStorage.getItem("refferalCode");

  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };
  return (
    <div className="refferal">
      <div className="refferal-main">
        <div className="refferal-container">
          <p className="refferal-title">Refferal</p>
          <p className="refferal-pera">
            all Referral codes can be used to refer for stock trading
          </p>
        </div>
        <div className="search-container">
          <form>
            <div className="reff-code">
              <p>Enter Referral Code</p>
            </div>
            <div>
              <input
                readOnly={true}
                className="input-box input-referral-div"
                type="text"
                value={JSON.parse(refferalCode)}
                defaultValue="KSTSTOCK555"
                name="text box"
                onChange={(event) => setText(event.target.value)}
                style={{
                  height: "40px",
                  width: "65%",
                  border: "1px solid #7522DE",
                }}
              />
              <button
                type="button"
                className="copy-btn"
                style={{
                  height: "45px",
                  width: "120px",
                  color: "white",
                  borderRadius: "5px",
                  marginLeft: "30px",
                }}
                onCopy={onCopyText}
              >
                Copy
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={10}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
    </div>
  );
};
export default Refferal;
