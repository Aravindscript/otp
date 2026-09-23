import React, { useEffect, useState } from "react";
import "./style.css";

function App() {
  const [otp, setOtp] = useState("");
  const [displayedOtp, setDisplayedOtp] = useState([]);
  const [verified, setVerified] = useState(false);

  const generateOTP = () => {
    const newOTP = Math.floor(
      10000 + Math.random() * 90000
    ).toString();

    setOtp(newOTP);
    setDisplayedOtp([]);
    setVerified(false);

    const digits = newOTP.split("");

    digits.forEach((digit, index) => {
      setTimeout(() => {
        setDisplayedOtp((prev) => [
          ...prev,
          digit
        ]);
      }, index * 700);
    });
  };

  useEffect(() => {
    generateOTP();
  }, []);

  const verifyOTP = () => {
    if (displayedOtp.length < 5) {
      alert("Please wait until the complete OTP appears.");
      return;
    }

    const enteredOTP = displayedOtp.join("");

    if (enteredOTP === otp) {
      setVerified(true);
    }
  };

  return (
    <div className="page">

      <h1>
        <span>OTP</span> Verification
      </h1>

      <div className="otp-card">

        <div className="brand">
          NEXORA
        </div>

        <h2>Verify Number</h2>

        <p className="description">
          Enter the 5-digit code sent to
          <b> +91 8072223638</b>
        </p>

        {/* OTP BOXES */}
        <div className="otp-boxes">

          {[0, 1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className={`otp-box ${
                displayedOtp[index] !== undefined
                  ? "active"
                  : ""
              }`}
            >
              {displayedOtp[index] || ""}
            </div>
          ))}

        </div>

        {/* MESSAGE */}
        <div className="message-box">

          <div>
            <span>MESSAGE</span>

            <p>
              NEXORA — OTP generated successfully
            </p>
          </div>

          <button onClick={generateOTP}>
            Generate
          </button>

        </div>

        {/* VERIFY BUTTON */}
        <button
          className={`verify-btn ${
            displayedOtp.length === 5
              ? "ready"
              : ""
          }`}
          onClick={verifyOTP}
        >
          Verify OTP
        </button>

        {/* VERIFIED POPUP */}
        {verified && (
          <div className="verified-popup">

            <div className="check-circle">
              ✓
            </div>

            <div>
              <strong>OTP Verified</strong>

              <p>
                Your number has been successfully verified.
              </p>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default App;