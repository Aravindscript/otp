import React, { useState } from "react";
import "./style.css";

function App() {
  const [otp, setOtp] = useState("");
  const [displayedOtp, setDisplayedOtp] = useState([]);
  const [page, setPage] = useState("otp");
  const [generating, setGenerating] = useState(false);

  const generateOTP = () => {
    if (generating) return;

    const newOTP = Math.floor(
      10000 + Math.random() * 90000
    ).toString();

    setOtp(newOTP);
    setDisplayedOtp([]);
    setPage("otp");
    setGenerating(true);

    const digits = newOTP.split("");

    digits.forEach((digit, index) => {
      setTimeout(() => {
        setDisplayedOtp((prev) => [...prev, digit]);

        // After the 5th digit appears
        if (index === 4) {
          setTimeout(() => {
            setPage("success");
            setGenerating(false);
          }, 700);
        }
      }, index * 700);
    });
  };

  // =========================
  // SUCCESS PAGE
  // =========================

  if (page === "success") {
    return (
      <div className="page success-page">

        <div className="success-card">

          <div className="success-circle">
            ✓
          </div>

          <h1>OTP Verified</h1>

          <p>
            Your number has been successfully verified.
          </p>

          <button
            className="continue-btn"
            onClick={() => {
              setPage("otp");
              setDisplayedOtp([]);
              setOtp("");
            }}
          >
            Continue
          </button>

        </div>

      </div>
    );
  }

  // =========================
  // OTP PAGE
  // =========================

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
              Click Generate to receive your OTP
            </p>
          </div>

          <button
            onClick={generateOTP}
            disabled={generating}
          >
            {generating ? "Generating..." : "Generate"}
          </button>

        </div>

        {/* STATUS */}

        <div className="status">

          {generating ? (
            <>
              <span className="dot"></span>
              Verifying OTP...
            </>
          ) : (
            "Waiting for OTP"
          )}

        </div>

      </div>

    </div>
  );
}

export default App;