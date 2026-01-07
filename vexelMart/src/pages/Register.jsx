// import VexelMartLogo from "../assets/img/VexelMartLogo"
// import { Link, useLocation, useNavigate } from "react-router-dom"
// import { useContext, useState } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { register} from '../components/lib/auth';
// import { Loader2 } from 'lucide-react';
// import toast from 'react-hot-toast';


// export default function Register() {
//     const { search } = useLocation();

//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
    
//     // 1. NEW: State for Confirm Password
//     const [confirmPassword, setConfirmPassword] = useState('');
    
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false);

//     const { registerAction } = useAuth();
//     const navigate = useNavigate();

//     const submitHandler = async (e) => {
//         e.preventDefault();

//         // 2. NEW: Validation Logic
//         if (password !== confirmPassword) {
//             toast.error("Passwords does not match");
//             return; // Stop the function here, don't send to backend
//         }

//         setLoading(true);
//         setError(null);

//         try {
//            await register(name, email, password)
           
//             navigate('/verify-email')
//             toast.success("Registration successful! Please verify email.")
//         } catch (error) {
//             // Safely handle error message structure
//             const message = error.response?.data?.message || "Registration failed";
//             toast.error(message);
//             setError(message);
//         }  finally{
//             setLoading(false);
//         }
//     }

//   return (
//     <>
//       <div className="flex min-h-full flex-col justify-center px-6 lg:px-8">
//         <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//            <VexelMartLogo className="h-12 mx-auto w-auto"/>
//           {/* Updated text as discussed */}
//           <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Create your account</h2>
//         </div>

//         <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//           <form onSubmit={submitHandler} className="space-y-6">
            
//             {/* Name Field */}
//             <div>
//               <label htmlFor="name" className="block text-sm/6 font-medium text-gray-100">Name</label>
//               <div className="mt-2">
//                 <input
//                   id="name"
//                   name="name"
//                   type="text"
//                   required
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
//                 />
//               </div>
//             </div>

//             {/* Email Field */}
//             <div>
//               <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">Email address</label>
//               <div className="mt-2">
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
//                 />
//               </div>
//             </div>

//             {/* Password Field */}
//             <div>
//               <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">Password</label>
//               <div className="mt-2">
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
//                 />
//               </div>
//             </div>

//             {/* 3. NEW: Confirm Password Field */}
//             <div>
//               <label htmlFor="confirmPassword" className="block text-sm/6 font-medium text-gray-100">Confirm Password</label>
//               <div className="mt-2">
//                 <input
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   type="password"
//                   required
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
//                 />
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
//               >
//                 {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Register'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   )
// }

// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import toast from 'react-hot-toast';
// import api from '../components/lib/axios'; // Ensure this matches your axios setup
// import VexelMartLogo from "../assets/img/VexelMartLogo";
// import { Loader2, ArrowLeft } from 'lucide-react';

// export default function Register() {
//   const [step, setStep] = useState(1); // 1 = Email, 2 = OTP, 3 = Details
//   const [loading, setLoading] = useState(false);
  
//   // --- Form State ---
//   const [email, setEmail] = useState('');
//   const [name, setName] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
  
//   // --- OTP & Timer State (From VerifyEmail) ---
//   const [otp, setOtp] = useState(['', '', '', '']);
//   const [timeLeft, setTimeLeft] = useState(57);
//   const inputRefs = useRef([]);

//   const { registerAction } = useAuth();
//   const navigate = useNavigate();

//   // --- TIMER LOGIC ---
//   useEffect(() => {
//     // Only run timer if we are on Step 2 and time > 0
//     if (step === 2 && timeLeft > 0) {
//       const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [timeLeft, step]);

//   // --- OTP INPUT HANDLERS ---
//   const handleOtpChange = (index, value) => {
//     if (isNaN(value)) return;
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);
//     // Auto-focus next input
//     if (value && index < 3) {
//       inputRefs.current[index + 1].focus();
//     }
//   };

//   const handleOtpKeyDown = (index, e) => {
//     // Auto-focus previous input on backspace
//     if (e.key === 'Backspace' && !otp[index] && index > 0) {
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   // --- STEP 1: INITIATE (Send Email) ---
//   const handleInitiate = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       // Calls the backend to send the code
//       await api.post('/users/initiate-register', { email });
//       toast.success("Verification code sent!");
//       setStep(2); // Move to OTP step
//       setTimeLeft(57); // Reset timer
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Error sending code");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- STEP 2: VERIFY (Local Check + Move to Step 3) ---
//   const handleVerifyStep = (e) => {
//     e.preventDefault();
//     const code = otp.join('');
//     if (code.length !== 4) {
//       return toast.error("Please enter the full 4-digit code");
//     }
//     // Note: We verify the code against the backend at the very end (Step 3)
//     // to keep the API simple, but you could add a check here if desired.
//     setStep(3); 
//   };

//   // --- RESEND LOGIC ---
//   const handleResend = async () => {
//     if (timeLeft > 0) return;
//     try {
//       toast.loading("Sending new code...", { id: 'resend' });
//       // Call the same initiate endpoint to send a fresh code
//       await api.post('/users/initiate-register', { email });
//       setTimeLeft(60);
//       toast.success("New code sent!", { id: 'resend' });
//     } catch (error) {
//       toast.error("Could not resend code", { id: 'resend' });
//     }
//   };

//   // --- STEP 3: FINALIZE (Create Account) ---
//   const handleFinalize = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       return toast.error("Passwords do not match");
//     }

//     setLoading(true);
//     try {
//       const code = otp.join('');
//       // Send EVERYTHING to backend: Name, Pass, Email, AND the OTP code
//       const { data } = await api.post('/users/complete-register', {
//         email,
//         code,
//         name,
//         password
//       });

//       // Login the user immediately
//       registerAction(data); 
//       toast.success("Account created successfully!");
//       navigate('/'); 

//     } catch (error) {
//       toast.error(error.response?.data?.message || "Registration failed");
//       // If the error implies the code is wrong, send them back to Step 2
//       if (error.response?.data?.message?.toLowerCase().includes("code")) {
//         setStep(2);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-full flex-col justify-center px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//         <VexelMartLogo className="h-12 mx-auto w-auto" />
//         <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
//           {step === 1 && "Enter your email"}
//           {step === 2 && "Verify your email"}
//           {step === 3 && "Finish setup"}
//         </h2>
//       </div>

//       <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        
//         {/* === STEP 1: EMAIL FORM === */}
//         {step === 1 && (
//           <form onSubmit={handleInitiate} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-100">Email address</label>
//               <input
//                 type="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline-none focus:ring-2 focus:ring-indigo-500"
//               />
//             </div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full rounded-md bg-indigo-500 py-2 text-white font-semibold hover:bg-indigo-400"
//             >
//               {loading ? <Loader2 className="animate-spin h-5 w-5 mx-auto" /> : 'Continue'}
//             </button>
//           </form>
//         )}

//         {/* === STEP 2: OTP FORM (The "VerifyEmail" Style) === */}
//         {step === 2 && (
//           <div className="space-y-6">
//             <div className="text-center text-gray-400 text-sm mb-4">
//               Sent to <span className="text-white font-medium">{email}</span>{' '}
//               <button
//                 type="button"
//                 onClick={() => setStep(1)}
//                 className="text-indigo-400 underline ml-2"
//               >
//                 Change
//               </button>
//             </div>

//             <form onSubmit={handleVerifyStep}>
//               <div className="flex justify-center gap-4 mb-6">
//                 {otp.map((digit, index) => (
//                   <input
//                     key={index}
//                     ref={(el) => (inputRefs.current[index] = el)}
//                     type="text"
//                     maxLength={1}
//                     value={digit}
//                     onChange={(e) => handleOtpChange(index, e.target.value)}
//                     onKeyDown={(e) => handleOtpKeyDown(index, e)}
//                     className="h-14 w-14 rounded-md border border-gray-600 bg-white/5 text-center text-2xl font-semibold text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
//                   />
//                 ))}
//               </div>

//               <button
//                 type="submit"
//                 className="w-full rounded-md bg-indigo-500 py-2 text-white font-semibold hover:bg-indigo-400"
//               >
//                 Verify Code
//               </button>
//             </form>

//             {/* Resend Timer Logic */}
//             <p className="mt-6 text-center text-sm text-gray-400">
//               Didn’t receive the code?{' '}
//               <button
//                 onClick={handleResend}
//                 disabled={timeLeft > 0}
//                 className={`font-medium ${
//                   timeLeft > 0
//                     ? 'text-gray-500 cursor-not-allowed'
//                     : 'text-indigo-400 hover:text-indigo-300'
//                 }`}
//               >
//                 {timeLeft > 0 ? `Resend in ${timeLeft}s` : 'Resend now'}
//               </button>
//             </p>
//           </div>
//         )}

//         {/* === STEP 3: DETAILS FORM === */}
//         {step === 3 && (
//           <form onSubmit={handleFinalize} className="space-y-6">
//             <button
//               type="button"
//               onClick={() => setStep(2)}
//               className="text-gray-400 flex items-center gap-1 mb-2 text-sm hover:text-white transition"
//             >
//               <ArrowLeft className="w-4 h-4" /> Back
//             </button>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-100">Full Name</label>
//               <input
//                 type="text"
//                 required
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline-none focus:ring-2 focus:ring-indigo-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-100">Password</label>
//               <input
//                 type="password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline-none focus:ring-2 focus:ring-indigo-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-100">Confirm Password</label>
//               <input
//                 type="password"
//                 required
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline-none focus:ring-2 focus:ring-indigo-500"
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full rounded-md bg-indigo-500 py-2 text-white font-semibold hover:bg-indigo-400"
//             >
//               {loading ? <Loader2 className="animate-spin h-5 w-5 mx-auto" /> : 'Create Account'}
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import api from '../components/lib/axios'; // Ensure this matches your axios setup
import VexelMartLogo from "../assets/img/VexelMartLogo";
import { Loader2, ArrowLeft } from 'lucide-react';

export default function Register() {
  const [step, setStep] = useState(1); // 1 = Email, 2 = OTP, 3 = Details
  const [loading, setLoading] = useState(false);
  
  // --- Form State ---
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // --- OTP & Timer State (From VerifyEmail) ---
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(57);
  const inputRefs = useRef([]);

  const { registerAction } = useAuth();
  const navigate = useNavigate();

  // --- TIMER LOGIC ---
  useEffect(() => {
    // Only run timer if we are on Step 2 and time > 0
    if (step === 2 && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, step]);

  // --- OTP INPUT HANDLERS ---
  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    // Auto-focus previous input on backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // --- STEP 1: INITIATE (Send Email) ---
  const handleInitiate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Calls the backend to send the code
      await api.post('/user/verify-email', { email });
      toast.success("Verification code sent!");
      setStep(2); // Move to OTP step
      setTimeLeft(57); // Reset timer
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending code");
    } finally {
      setLoading(false);
    }
  };

  // --- STEP 2: VERIFY (Local Check + Move to Step 3) ---
  const handleVerifyStep = (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length !== 4) {
      return toast.error("Please enter the full 4-digit code");
    }
    // Note: We verify the code against the backend at the very end (Step 3)
    // to keep the API simple, but you could add a check here if desired.
    setStep(3); 
  };

  // --- RESEND LOGIC ---
  const handleResend = async () => {
    if (timeLeft > 0) return;
    try {
      toast.loading("Sending new code...", { id: 'resend' });
      // Call the same initiate endpoint to send a fresh code
      await api.post('/user/resend-code', { email });
      setTimeLeft(60);
      toast.success("New code sent!", { id: 'resend' });
    } catch (error) {
      toast.error("Could not resend code", { id: 'resend' });
    }
  };

  // --- STEP 3: FINALIZE (Create Account) ---
  const handleFinalize = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);
    try {
      const code = otp.join('');
      // Send EVERYTHING to backend: Name, Pass, Email, AND the OTP code
      const { data } = await api.post('/user/complete-register', {
        email,
        code,
        name,
        password
      });

      // Login the user immediately
      registerAction(data); 
      toast.success("Account created successfully!");
      navigate('/'); 

    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      // If the error implies the code is wrong, send them back to Step 2
      if (error.response?.data?.message?.toLowerCase().includes("code")) {
        setStep(2);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <VexelMartLogo className="h-12 mx-auto w-auto" />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
          {step === 1 && "Enter your email"}
          {step === 2 && "Verify your email"}
          {step === 3 && "Finish setup"}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        
        {/* === STEP 1: EMAIL FORM === */}
        {step === 1 && (
          <form onSubmit={handleInitiate} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-100">Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-indigo-500 py-2 text-white font-semibold hover:bg-indigo-400"
            >
              {loading ? <Loader2 className="animate-spin h-5 w-5 mx-auto" /> : 'Continue'}
            </button>
          </form>
        )}

        {/* === STEP 2: OTP FORM (The "VerifyEmail" Style) === */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center text-gray-400 text-sm mb-4">
              Sent to <span className="text-white font-medium">{email}</span>{' '}
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-indigo-400 underline ml-2"
              >
                Change
              </button>
            </div>

            <form onSubmit={handleVerifyStep}>
              <div className="flex justify-center gap-4 mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="h-14 w-14 rounded-md border border-gray-600 bg-white/5 text-center text-2xl font-semibold text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                  />
                ))}
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-indigo-500 py-2 text-white font-semibold hover:bg-indigo-400"
              >
                Verify Code
              </button>
            </form>

            {/* Resend Timer Logic */}
            <p className="mt-6 text-center text-sm text-gray-400">
              Didn’t receive the code?{' '}
              <button
                onClick={handleResend}
                disabled={timeLeft > 0}
                className={`font-medium ${
                  timeLeft > 0
                    ? 'text-gray-500 cursor-not-allowed'
                    : 'text-indigo-400 hover:text-indigo-300'
                }`}
              >
                {timeLeft > 0 ? `Resend in ${timeLeft}s` : 'Resend now'}
              </button>
            </p>
          </div>
        )}

        {/* === STEP 3: DETAILS FORM === */}
        {step === 3 && (
          <form onSubmit={handleFinalize} className="space-y-6">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="text-gray-400 flex items-center gap-1 mb-2 text-sm hover:text-white transition"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            
            <div>
              <label className="block text-sm font-medium text-gray-100">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-100">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-100">Confirm Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-indigo-500 py-2 text-white font-semibold hover:bg-indigo-400"
            >
              {loading ? <Loader2 className="animate-spin h-5 w-5 mx-auto" /> : 'Create Account'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}