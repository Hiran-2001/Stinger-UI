import { Link, useNavigate } from 'react-router-dom';
import Logo from "../assets/Logo.png";
import { useCallback, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import { Loader2, Mail } from 'lucide-react';
import Axios from '../utils/axios';
// import { GoShieldLock } from "react-icons/go";


function ForgotPassword() {

  const [formData, setFormData] = useState({ email: '' });
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()


  const handleChange = useCallback((e: any) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }, [])


  const handleSubmit = async (event: any) => {
    setLoading(true)
    event.preventDefault()
    try {

      if (formData.email === "") {
        toast.error("please fill all fields")
        setLoading(false)
        return
      }

      const response = await Axios.post("users/forgot-password", { email: formData.email });
      
      toast(response?.data?.message)
      if (response.status === 201) {
        setLoading(false)
      }

    } catch (error: any) {      
      toast.error(error.response.data.message)
      setLoading(false)

    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6 font-sans">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="flex w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Form Section */}
        <div className="w-1/2 p-10 bg-white">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password</h1>
          <p className="text-gray-600 mb-8 text-sm">We'll send you a login link</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 group-focus-within:text-blue-600 transition-colors" />
              <input
                onChange={handleChange}
                name="email"
                type="email"
                placeholder="Email"
                className="w-full pl-10 pr-4 py-3 bg-white rounded-md border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md font-medium shadow-sm hover:bg-blue-700 hover:shadow-md active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Get Login Link"
              )}
            </button>
          </form>
          <p className="text-center text-gray-600 mt-6 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-all duration-200"
            >
              Log in
            </Link>
          </p>
        </div>
        {/* Image Section */}
        <div className="w-1/2 bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-10">
          <img
            className="object-contain max-h-72 w-full"
            src={Logo}
            alt="Learning Illustration"
          />
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword
