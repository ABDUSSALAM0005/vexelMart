import VexelMartLogo from "../assets/img/VexelMartLogo"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useContext, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { register} from '../components/lib/auth';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';


export default function Register() {
    const { search } = useLocation();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // 1. NEW: State for Confirm Password
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { registerAction } = useAuth();
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        // 2. NEW: Validation Logic
        if (password !== confirmPassword) {
            toast.error("Passwords does not match");
            return; // Stop the function here, don't send to backend
        }

        setLoading(true);
        setError(null);

        try {
            const userData = await register(name, email, password)
            registerAction(userData);
            toast.success("Account Created successfully!")
            navigate('/')
        } catch (error) {
            // Safely handle error message structure
            const message = error.response?.data?.message || "Registration failed";
            toast.error(message);
            setError(message);
        }  finally{
            setLoading(false);
        }
    }

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
           <VexelMartLogo className="h-12 mx-auto w-auto"/>
          {/* Updated text as discussed */}
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Create your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={submitHandler} className="space-y-6">
            
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm/6 font-medium text-gray-100">Name</label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">Email address</label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">Password</label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            {/* 3. NEW: Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm/6 font-medium text-gray-100">Confirm Password</label>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Register'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}