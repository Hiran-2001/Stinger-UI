import { Link, useNavigate } from 'react-router-dom';
import registerLogo from '../assets/Register-Logo.png'
import { useCallback, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import { GoShieldLock } from "react-icons/go";


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
    console.log('submit trigger');

    setLoading(true)
    event.preventDefault()
    try {

      if (formData.email === "") {
        toast.error("please fill all fields")
        setLoading(false)
        return
      }

      const response = await axios.post("http://localhost:5000/users/forget-password", { email: formData.email })
      toast(response?.data?.message)
      if (response.status === 201) {
        localStorage.setItem('token', response?.data?.token)
        setLoading(false)
        navigate('/')
      }

    } catch (error: any) {
      toast.error(error.response.data.message)
      setLoading(false)

    }
  }


  return (

    <div className=" flex w-100 h-screen bg-[#ffffff] ">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"

      />
      <div className="px-14 h-3/4 w-2/5 py-6 shadow-2xl mx-12 my-24 bg-red rounded-lg">

        <div className=' flex justify-center h-52'>
          <GoShieldLock className='size-48' />
        </div>

        <div className='flex flex-col justify-center items-center'>
          <h2 className="text-3xl font-mono mb-6 ml-0">Trouble in login ?</h2>
          <h5>Enter your email and we'll send you a link to get back into your account.</h5>
        </div>


        <form className="w-full max-w-sm mt-5">

          <div className="mb-4">
  
            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="test@gmail.com"
              className="w-full px-3 py-2 border rounded-lg shadow-sm text-gray-700 focus:outline-none"
            />
          </div>

          <button
            onClick={handleSubmit}
            type="submit"
            className="mx-12 my-5 w-3/4 bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg shadow-md focus:outline-none"
          >
            {loading ? <CircularProgress size={25} /> : 'Send Login Link'}
          </button>
        </form>
      </div>
      <div className="hidden lg:flex items-center justify-center w-full lg:w-3/4 bg-[#000000] ">
        <img
          src={registerLogo}
          alt="Shopping Illustration"
          className="h-2/3 rounded-lg"
        />
      </div>
    </div>

  );
}

export default ForgotPassword
