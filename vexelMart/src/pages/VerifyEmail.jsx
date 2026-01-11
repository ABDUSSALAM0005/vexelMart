// // import React, { useState, useEffect, useRef } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { Star } from 'lucide-react'; // Using Star icon like the image
// // import VexelMartLogo from '../assets/img/VexelMartLogo';

// // export default function VerifyEmail() {
// //   const navigate = useNavigate();
// //   const [otp, setOtp] = useState(['', '', '', '']); // 4 digit code
// //   const [timeLeft, setTimeLeft] = useState(57); // 57 seconds timer
// //   const inputRefs = useRef([]); // To handle focus jumping

// //   // 1. Timer Countdown Logic
// //   useEffect(() => {
// //     if (timeLeft > 0) {
// //       const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
// //       return () => clearTimeout(timerId);
// //     }
// //   }, [timeLeft]);

// //   // 2. Handle Typing in Input Boxes
// //   const handleChange = (index, value) => {
// //     // Only allow numbers
// //     if (isNaN(value)) return;

// //     const newOtp = [...otp];
// //     newOtp[index] = value;
// //     setOtp(newOtp);

// //     // Jump to next box if value is entered
// //     if (value && index < 3) {
// //       inputRefs.current[index + 1].focus();
// //     }
// //   };

// //   // 3. Handle Backspace (Jump back)
// //   const handleKeyDown = (index, e) => {
// //     if (e.key === 'Backspace' && !otp[index] && index > 0) {
// //       inputRefs.current[index - 1].focus();
// //     }
// //   };

// //   // 4. Submit Logic
// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     const code = otp.join('');
// //     alert(`Verifying code: ${code}`); 
// //     // Here you would call your API: await axios.post('/api/verify', { code })
// //     navigate('/'); 
// //   };

// //   return (
// //     <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-12">
      
// //       {/* Icon */}
// //       <div className="mb-6 rounded-full bg-orange-100 p-4">
// //         <VexelMartLogo className="h-8 w-8 text-primary fill-primary" />
// //       </div>

// //       {/* Headings */}
// //       <h2 className="text-2xl font-bold text-gray-900">Verify your email address</h2>
// //       <p className="mt-2 text-center text-sm text-gray-600 max-w-sm">
// //         We have sent a verification code to <br/>
// //         <span className="font-medium text-gray-900">abdussalamsuleimandjldjvl@gmail.com</span>
// //       </p>

// //       {/* OTP Inputs */}
// //       <form onSubmit={handleSubmit} className="mt-8 flex flex-col items-center w-full max-w-xs">
// //         <div className="flex gap-4 mb-6">
// //           {otp.map((digit, index) => (
// //             <input
// //               key={index}
// //               ref={(el) => (inputRefs.current[index] = el)}
// //               type="text"
// //               maxLength={1}
// //               value={digit}
// //               onChange={(e) => handleChange(index, e.target.value)}
// //               onKeyDown={(e) => handleKeyDown(index, e)}
// //               className="h-14 w-14 rounded-md border border-gray-300 text-center text-2xl font-semibold text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary outline-none transition"
// //             />
// //           ))}
// //         </div>

// //         {/* Submit Button */}
// //         <button
// //           type="submit"
// //           className="w-full rounded-md bg-primary py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition"
// //         >
// //           Submit
// //         </button>
// //       </form>

// //       {/* Resend Timer */}
// //       <p className="mt-6 text-center text-sm text-gray-600">
// //         Didn't receive the verification code? It could take a bit of time, request a new code in{' '}
// //         <span className="font-medium text-orange-500">
// //             {timeLeft > 0 ? `${timeLeft} seconds` : 'Resend now'}
// //         </span>
// //       </p>

// //       {/* Footer */}
// //       <div className="mt-auto pt-10 text-center">
// //          <p className="text-xs text-gray-500">
// //              Need help? Visit our Help Center or contact us.
// //          </p>
// //       </div>

// //     </div>
// //   );
// // }

// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom'; // Added useLocation
// import { Star } from 'lucide-react'; 
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext'; // Import your Auth Context
// import toast from 'react-hot-toast';

// export default function VerifyEmail() {
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   // 1. Get the email passed from Register page
//   // Fallback to empty string if accessed directly
//   const email = location.state?.email || ''; 

//   // Access the login/setCredentials function from your context
//   // This might be called 'dispatch', 'login', or 'setUserInfo' depending on your setup
//   const { login } = useAuth(); // <--- ADJUST THIS based on your Context name

//   const [otp, setOtp] = useState(['', '', '', '']); 
//   const [timeLeft, setTimeLeft] = useState(57); 
//   const [loading, setLoading] = useState(false);
//   const inputRefs = useRef([]); 

//   // ... (Keep your Timer Logic here) ...
//   useEffect(() => {
//     if (timeLeft > 0) {
//       const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
//       return () => clearTimeout(timerId);
//     }
//   }, [timeLeft]);

//   // ... (Keep your Handle Change/Backspace logic here) ...
//   const handleChange = (index, value) => {
//     if (isNaN(value)) return;
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);
//     if (value && index < 3) inputRefs.current[index + 1].focus();
//   };

//   const handleKeyDown = (index, e) => {
//     if (e.key === 'Backspace' && !otp[index] && index > 0) {
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   // 2. THE API CONNECTION
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const code = otp.join('');
    
//     if (code.length < 4) {
//       return toast.error("Please enter the full 4-digit code");
//     }

//     try {
//       setLoading(true);
      
//       // Call the Backend
//       const { data } = await axios.post('/api/users/verify-email', {
//         email,
//         code
//       });

//       // On Success:
//       toast.success("Email verified successfully!");
      
//       // Log the user in (save to context/localstorage)
//       // Assuming your 'login' function takes the user object
//       if (login) login(data); 
//       localStorage.setItem('userInfo', JSON.stringify(data));

//       // Redirect to Home
//       navigate('/');

//     } catch (error) {
//       console.error(error);
//       toast.error(error.response?.data?.message || "Invalid Verification Code");
//       setOtp(['', '', '', '']); // Clear inputs on error
//       inputRefs.current[0].focus(); // Focus first box
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 3. Optional: Resend Logic
//   const handleResend = async () => {
//     if (timeLeft > 0) return;
//     try {
//         toast.loading("Sending new code...", { id: "resend" });
//         await axios.post('/api/user/resend-code', { email }); 
//         setTimeLeft(60);
//         toast.success("New code sent!", { id: "resend" });
//     } catch (error) {
//         toast.error(error.response?.data?.message || "Could not send new code");
//     }
//   }

//   // Redirect if no email found (security check)
//   useEffect(() => {
//     if (!email) {
//       toast.error("No email found. Please register first.");
//       navigate('/register');
//     }
//   }, [email, navigate]);

//   return (
//     <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-12">
//       <div className="mb-6 rounded-full bg-orange-100 p-4">
//         <Star className="h-8 w-8 text-primary fill-primary" />
//       </div>

//       <h2 className="text-2xl font-bold text-gray-900">Verify your email address</h2>
//       <p className="mt-2 text-center text-sm text-gray-600 max-w-sm">
//         We have sent a verification code to <br/>
//         {/* Display the actual email */}
//         <span className="font-medium text-gray-900">{email}</span>
//       </p>

//       <form onSubmit={handleSubmit} className="mt-8 flex flex-col items-center w-full max-w-xs">
//         <div className="flex gap-4 mb-6">
//           {otp.map((digit, index) => (
//             <input
//               key={index}
//               ref={(el) => (inputRefs.current[index] = el)}
//               type="text"
//               maxLength={1}
//               value={digit}
//               onChange={(e) => handleChange(index, e.target.value)}
//               onKeyDown={(e) => handleKeyDown(index, e)}
//               className="h-14 w-14 rounded-md border border-gray-300 text-center text-2xl font-semibold text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary outline-none transition"
//             />
//           ))}
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full rounded-md bg-primary py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 disabled:opacity-50"
//         >
//           {loading ? "Verifying..." : "Submit"}
//         </button>
//       </form>

//       <p className="mt-6 text-center text-sm text-gray-600">
//         Didn't receive the verification code?{' '}
//         <button 
//             onClick={handleResend}
//             disabled={timeLeft > 0}
//             className={`font-medium ${timeLeft > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-orange-500 hover:text-orange-600'}`}
//         >
//             {timeLeft > 0 ? `Resend in ${timeLeft}s` : 'Resend now'}
//         </button>
//       </p>
//     </div>
//   );
// }

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import api from "../components/lib/axios"
import toast from 'react-hot-toast';
import VexelMartLogo from '../assets/img/VexelMartLogo';
import { useAuth } from '../context/AuthContext';

export default function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const email = location.state?.email || '';

  const [otp, setOtp] = useState(['', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(57);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  // Timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  // Redirect protection
  useEffect(() => {
    if (!email) {
      toast.error("Please register first");
      navigate('/register');
    }
  }, [email, navigate]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) inputRefs.current[index + 1].focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const code = otp.join('');

  //   if (code.length < 4) {
  //     return toast.error("Enter the full 4-digit code");
  //   }

  //   try {
  //     setLoading(true);
  //     const { data } = await api.post('/user/verify-email', {
  //       email,
  //       code
  //     });

  //     toast.success("Email verified!");
  //     if (login) login(data);
  //     localStorage.setItem('userInfo', JSON.stringify(data));
  //     navigate('/');
  //   } catch (err) {
  //     toast.error(err.response?.data?.message || "Invalid code");
  //     setOtp(['', '', '', '']);
  //     inputRefs.current[0]?.focus();
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join('');

    if (code.length < 4) {
      return toast.error("Enter the full 4-digit code");
    }

    try {
      setLoading(true);
      
      // === UPDATE THIS URL ===
      const { data } = await api.post('/users/confirm-email', {
        email,
        code
      });

      toast.success("Email verified!");
      
      // Save user data & login
      if (login) login(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      
      navigate('/');
      
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid code");
      setOtp(['', '', '', '']); // Clear inputs
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (timeLeft > 0) return;
    try {
      toast.loading("Sending new code...", { id: 'resend' });
      await axios.post('/api/user/resend-code', { email });
      setTimeLeft(60);
      toast.success("New code sent!", { id: 'resend' });
    } catch {
      toast.error("Could not resend code");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-12">

      {/* Logo */}
      <div className="mb-6 rounded-full bg-orange-100 p-4">
        <VexelMartLogo className="h-8 w-8 fill-primary" />
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900">
        Verify your email address
      </h2>

      <p className="mt-2 text-center text-sm text-gray-600 max-w-sm">
        We have sent a verification code to <br />
        <span className="font-medium text-gray-900">{email}</span>
      </p>

      {/* OTP Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-8 flex flex-col items-center w-full max-w-xs"
      >
        <div className="flex gap-4 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="h-14 w-14 rounded-md border border-gray-300 text-center text-2xl font-semibold focus:border-primary focus:ring-2 focus:ring-primary outline-none"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-primary py-3 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Submit"}
        </button>
      </form>

      {/* Resend */}
      <p className="mt-6 text-sm text-gray-600">
        Didn’t receive the code?{' '}
        <button
          onClick={handleResend}
          disabled={timeLeft > 0}
          className={`font-medium ${
            timeLeft > 0
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-orange-500 hover:text-orange-600'
          }`}
        >
          {timeLeft > 0 ? `Resend in ${timeLeft}s` : 'Resend now'}
        </button>
      </p>

    </div>
  );
}
