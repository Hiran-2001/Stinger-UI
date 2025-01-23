import React, { useState } from "react";
import Logo from "../assets/logo.jpg";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function Register() {
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
const handleSubmit = async (event:any) =>{
    event.preventDefault()
    try {
        
       const response = await axios.post("http://localhost:5000/users",{name:formData.name,email:formData.email,password:formData.password})
     toast(response.data)
    
    } catch (error:any) {
       toast.error(error.response.data.message)
    }
}
  return (
    <div className="min-h-screen flex items-center bg-[#dab7e6] p-4">
        <ToastContainer />
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
              required
            />
          </div>

          <div className="relative bg-[#ededed] rounded-lg">
            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2 border-none bg-transparent text-black rounded-lg focus:outline-none"
              required
            />
          </div>
          <div className="relative bg-[#ededed] rounded-lg">
            <input
              name="password"
              onChange={handleChange}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-2 border-none bg-transparent text-black rounded-lg focus:outline-none"
              required
            />

            <div></div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Register
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </p>
      </div>
      <div className="hidden lg:flex items-center justify-center w-full lg:w-1/2">
        <img src={Logo} alt="Shopping Illustration" className="h-96" />
      </div>
    </div>
  );
}

export default Register;
