import { useState } from "react";
import Logo from "../assets/Logo.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
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
      setLoading(true)
      if (
        formData.name === "" ||
        formData.email === "" ||
        formData.password === ""
      ) {
        toast.error("Please fill all the Fields");
      }

      const response = await axios.post("http://localhost:5000/users", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      toast(response.data);
      navigate("/login")
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      toast.error(error.response.data.message);
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
          Register
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative bg-[#ededed] rounded-lg">
            <input
              onChange={handleChange}
              name="name"
              type="text"
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-2 border-none bg-transparent text-black rounded-lg focus:outline-none"

            />
          </div>

          <div className="relative bg-[#ededed] rounded-lg">
            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2 border-none bg-transparent text-black rounded-lg focus:outline-none"

            />
          </div>
          <div className="relative bg-[#ededed] rounded-lg">
            <input
              name="password"
              onChange={handleChange}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-2 border-none bg-transparent text-black rounded-lg focus:outline-none"

            />
          </div>


          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >

            {loading ? <CircularProgress size="30px" /> : "Register"}
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-16 mr-12">
        <img
          className="object-contain p-8 "
          src={Logo}
          alt="Shopping Illustration"
        />
      </div>
    </div>
  );
}

export default Register
