import React, { useState, useEffect } from "react";
import axios from "axios";
import QRCode from "qrcode.react";

function App() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [qrCode, setQRCode] = useState("");

  useEffect(() => {
    async function getQRCode() {
      try {
        const response = await axios.get("/get-qr-code");
        setQRCode(response.data);
      } catch (error) {
        setStatusMessage(`Error: ${error.message}`);
      }
    }
    getQRCode();
  }, []);

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/send-message", {
        phoneNumber,
        message,
      });
      setStatusMessage(response.data);
    } catch (error) {
      setStatusMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      {qrCode && <QRCode value={qrCode} />}
      <form onSubmit={handleSubmit}>
        <label>
          Phone Number:
          <input
            type="text"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </label>
        <label>
          Message:
          <input type="text" value={message} onChange={handleMessageChange} />
        </label>
        <button type="submit">Send Message</button>
      </form>
      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
}

export default App;
