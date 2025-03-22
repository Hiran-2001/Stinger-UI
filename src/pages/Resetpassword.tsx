import { useState } from "react";
// import Logo from "../assets/Logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgress } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import Axios from "../utils/axios";

function Resetpassword() {
  const param = useParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmpassword:""
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

      if(formData.password != formData.confirmpassword){
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
    console.log(error)
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-around bg-[#dab7e6] ">
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
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-7">
        <h1 className="text-3xl font-bold text-purple-800 text-center mb-6">
          Reset Password
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative bg-[#ededed] rounded-lg">
            <input
              name="password"
              onChange={handleChange}
              placeholder=" Password"
              className="w-full pl-10 pr-10 py-2 border-none bg-transparent text-black rounded-lg focus:outline-none"
            />
          </div>
          <div className="relative bg-[#ededed] rounded-lg">
            <input
              name="confirmpassword"
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full pl-10 pr-10 py-2 border-none bg-transparent text-black rounded-lg focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            {loading ? <CircularProgress size="30px" /> : "Reset Password"}
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
          dosen't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-16 mr-12">
        <img
          className="object-contain p-8 "
          // src={Logo}
          alt="Shopping Illustration"
        />
      </div>
    </div>
  );
}

export default Resetpassword;
