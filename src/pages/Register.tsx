import { Link } from 'react-router-dom';
import registerLogo from '../assets/logo.jpg'
import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

function Register() {

    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const response = await axios.post('http://localhost:5000/users', {
            name: formData?.name,
            email: formData?.email,
            password: formData?.password
        })
        console.log(response.data,"dataaaaaaaaaaa");
    
        toast(response.data);

    }

    return (

        <div className=" flex h-screen bg-[#fefefe] ">
            <ToastContainer />
            <div className="px-28 py-14 shadow-md mx-12 my-10 bg-white rounded-lg">
                <h1 className="text-2xl font-semibold text-orange-600 mb-4">Logo Here</h1>
                <p className="text-gray-500 mb-8">Welcome to Stinger</p>
                <h2 className="text-3xl font-bold mb-6 ml-0">Sign up</h2>

                <form onSubmit={handleSubmit} className="w-full max-w-sm">
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="name"
                        >
                            Name
                        </label>
                        <input
                            onChange={handleChange}
                            name="name"
                            type="text"
                            placeholder="Full Name"
                            className="w-full px-3 py-2 border rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
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
                            className="w-full px-3 py-2 border rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            onChange={handleChange}
                            name="password"
                            type="password"
                            placeholder="********"
                            className="w-full px-3 py-2 border rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <a
                            href="#"
                            className="text-sm text-orange-600 hover:underline float-right mt-1"
                        >
                            Forgot Password?
                        </a>
                    </div>
                    <button
                        type="submit"
                        className="mx-12 my-5 w-52 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg shadow-md focus:outline-none"
                    >
                        SIGN IN
                    </button>
                </form>
                <p className="text-gray-500 mt-6">
                    Don’t have an account?{" "}
                    <Link to="/login" className="text-orange-600 hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
            <div className="hidden lg:flex items-center justify-center w-full lg:w-1/2 bg-[#ef905d] ">
                <img
                    src={registerLogo}
                    alt="Shopping Illustration"
                    className="h-96"
                />
            </div>
        </div>

    );
}

export default Register