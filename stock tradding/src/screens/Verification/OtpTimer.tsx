import React from "react";
import { useEffect, useState } from "react";

const CountdownTimer = () => {
  const [seconds, setSeconds] = useState<number>(10);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) setSeconds((seconds) => seconds - 1);
      if (seconds === 0) {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  if (seconds === 0) {
    return (
      <div style={{ marginTop: 10 }}>
        <button
          className="resend-otp"
          onClick={() => {
            setSeconds(60);
          }}
        >
          Resend OTP
        </button>
      </div>
    );
  } else {
    return (
      <div style={{ textDecoration: "none" }}>
        {seconds < 10 ? " 00:0" + seconds : " 00:" + seconds}{" "}
      </div>
    );
  }
};

export default CountdownTimer;
