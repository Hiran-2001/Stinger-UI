import { Link, useNavigate } from 'react-router-dom';
import registerLogo from '../assets/Register-Logo.png'
import stingerLogo from '../assets/Stinger.png'
import { useCallback, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import { FaEye, FaEyeSlash } from "react-icons/fa";


function Login() {

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
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

            if (formData.email === "" || formData.password === "") {
                toast.error("please fill all fields")
                setLoading(false)
                return
            }

            if (formData.password.length < 8) {
                toast.error('Password length should be 8 or above')
                setLoading(false)
                return
            }

            const response = await axios.post("http://localhost:5000/users/login", { email: formData.email, password: formData.password })
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

    const togglePasswordVisibility = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        setShowPassword(prev => !prev);
    }, []);

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

                <img
                    src={stingerLogo}
                    alt="Shopping Illustration"
                    className="h-16"
                />
                <p className="text-gray-500 mb-8">Welcome Back !!!</p>
                <h2 className="text-3xl font-bold mb-6 ml-0">Login</h2>

                <form className="w-full max-w-sm">

                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            onChange={handleChange}
                            name="email"
                            type="email"
                            placeholder="test@gmail.com"
                            className="w-full px-3 py-2 border rounded-lg shadow-sm text-gray-700 focus:outline-none"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <div className='flex justify-center items-center border rounded-lg px-2'>
                            <input
                                onChange={handleChange}
                                name="password"
                                type={showPassword ? "text" : "password" }
                                placeholder="********"
                                className="w-full px-3 py-2 border-none rounded-lg shadow-sm text-gray-700 focus:outline-none focus:no-underline"
                            />
                            <button type="button" onClick={togglePasswordVisibility}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        <Link to="/forgot-password"
                            className="text-sm text-black hover:underline float-right mt-1"
                        >
                            Forgot Password?
                        </Link>
                    </div>
                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className="mx-12 my-5 w-3/4 bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg shadow-md focus:outline-none"
                    >
                        {loading ? <CircularProgress size={25} /> : 'Login'}
                    </button>
                </form>
                <p className="text-gray-500 mt-6 ml-20">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-blue-400 hover:underline">
                        Sign up
                    </Link>
                </p>
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

export default Login
