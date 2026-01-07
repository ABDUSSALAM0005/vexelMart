import React, { useRef } from "react";
import VexelMartLogo from "../assets/img/VexelMartLogo";

const OtpVerificationUI = ({
  email,
  otp,
  setOtp,
  timeLeft,
  loading,
  onSubmit,
  onResend,
}) => {
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) inputRefs.current[index + 1].focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-12">

      {/* Logo */}
      <div className="mb-6 rounded-full bg-orange-100 p-4">
        <VexelMartLogo className="h-8 w-8 fill-primary" />
      </div>

      <h2 className="text-2xl font-bold text-gray-900">
        Verify your email address
      </h2>

      <p className="mt-2 text-center text-sm text-gray-600 max-w-sm">
        We have sent a verification code to <br />
        <span className="font-medium text-gray-900">{email}</span>
      </p>

      {/* OTP */}
      <form onSubmit={onSubmit} className="mt-8 w-full max-w-xs">
        <div className="flex gap-4 justify-center mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="h-14 w-14 border rounded-md text-center text-2xl font-semibold focus:ring-2 focus:ring-primary outline-none"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-3 rounded-md font-semibold hover:bg-orange-600 disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Submit"}
        </button>
      </form>

      {/* Resend */}
      <p className="mt-6 text-sm text-gray-600">
        Didn’t receive the code?{" "}
        <button
          onClick={onResend}
          disabled={timeLeft > 0}
          className={`font-medium ${
            timeLeft > 0
              ? "text-gray-400 cursor-not-allowed"
              : "text-orange-500 hover:text-orange-600"
          }`}
        >
          {timeLeft > 0 ? `Resend in ${timeLeft}s` : "Resend now"}
        </button>
      </p>
    </div>
  );
};

export default OtpVerificationUI;
