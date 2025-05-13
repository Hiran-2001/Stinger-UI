import { useState } from "react";
import Logo from "../assets/Logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgress } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import Axios from "../utils/axios";
import { Loader2, Lock } from "lucide-react";

function Resetpassword() {
  const param = useParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmpassword: ""
  });
  const handleChange = (event: any) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      setLoading(true);
      if (formData.password === "") {
        toast.error("Please fill all the Fields");
      }

      if (formData.password != formData.confirmpassword) {
        toast.error("Password and Confirm Password Should be same")
      }
      const response = await Axios.patch(
        `http://localhost:5000/users/reset-password/${param?.token}`,
        {
          password: formData.password,
        }
      );
      localStorage.setItem("token", response.data.token);
      toast(response.data.message);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      //   toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6 font-sans">
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
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 bg-white">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Reset Password</h1>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 group-focus-within:text-blue-600 transition-colors" />
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 bg-white rounded-md border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 group-focus-within:text-blue-600 transition-colors" />
              <input
                type="password"
                name="confirmpassword"
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full pl-10 pr-4 py-3 bg-white rounded-md border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md font-medium shadow-sm hover:bg-blue-700 hover:shadow-md active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (<Loader2 className="h-5 w-5 animate-spin" />) : ("Reset Password")}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-gray-600 mt-6 text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-all duration-200"
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* Image Section */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-50 to-gray-100 items-center justify-center p-10">
          <img
            className="object-contain max-h-72 w-full"
            src={Logo}
            alt="Shopping Illustration"
          />
        </div>
      </div>
    </div>
  );

}

export default Resetpassword;
