import { useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../utils/axios";
import { Chrome, Loader2, Lock, Mail } from "lucide-react";

function Login() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('userRole')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({

    email: "",
    password: "",
  });
  useEffect(() => {
    if (token) {
      if (role === "admin") {
        navigate('/admin/products')
      } else {
        navigate('/')
      }
    }
  }, [token]);


  const handleChange = (event: any) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      setLoading(true)
      if (

        formData.email === "" ||
        formData.password === ""
      ) {
        toast.error("Please fill all the Fields");
      }

      const response = await Axios.post("http://localhost:5000/users/login", {

        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("userRole", response.data.userRole)
      toast(response.data.message);
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      toast.error(error.response.data.message);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6 font-sans">
      <div className="flex w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Form Section */}
        <div className="w-1/2 p-10 bg-white">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Log In</h1>
          <p className="text-gray-600 mb-8 text-sm">Welcome back to your learning journey</p>
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
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 group-focus-within:text-blue-600 transition-colors" />
              <input
                name="password"
                onChange={handleChange}
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 bg-white rounded-md border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
              />
            </div>
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md font-medium shadow-sm hover:bg-blue-700 hover:shadow-md active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Log In"
              )}
            </button>
          </form>
          {/* Google Login */}
          <div className="mt-6">
          <button className="w-full flex items-center justify-center py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>
          </div>
          <p className="text-center text-gray-600 mt-6 text-sm">
            New here?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-all duration-200"
            >
              Create an account
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

export default Login;
