import React, { useEffect, useState } from 'react'
import Axios from '../utils/axios'
import Header from '../components/Header';
import CategoryNav from '../components/CategoryNav';
import { ChevronRight, Tag, Trash2 } from 'lucide-react';
import useCartStore from '../store/useCartStore';

function ShoppingCart() {
    const [cartData, setCartData] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState()
    const [totalAmount, setTotalAmount] = useState<any>(1)
    const [quantities, setQuantities] = useState();
    const cartCount = useCartStore(state => state.cartCount);
    const { removeFromCart, isLoading, items } = useCartStore();
    


    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);


    useEffect(() => {
        fetchCartItem()
        setCartData(items)
    }, [cartCount]);


    const fetchCartItem = async () => {
        try {
            const response = await Axios.get('/cart');
            if (response) {
                setCartData(response?.data?.data)
                setTotalAmount(response?.data?.total)
            }
        } catch (error: any) {
            setError(error?.response?.data?.message)
        }
    }


    const updateQuantity = (id: string, delta: number) => {
        console.log(id,"updat id");
        
        setQuantities((prev: any) => ({
            ...prev,
            [id]: Math.max(1, prev[id] + delta)
        }));
    };

    const removeProductFromCart=(product_id:string)=>{
        removeFromCart(product_id)
    }
    const discount = Math.floor(totalAmount * 0.1);
    const deliveryFee = 15;
    const total: number = totalAmount - discount + deliveryFee;

    const handleCheckout = () => {
        try {
            const options = {
                key: "rzp_test_uK9P2oS8UQtKUQ", // Replace with your Razorpay Test Key
                amount: total * 100,
                currency: "INR",
                name: "Stinger Store",
                description: "Test Transaction",
                image: "https://your-logo-url.com/logo.png", // Optional logo
                // order_id: "order_123456", // Dummy Order ID
                handler: function (response: any) {
                    alert("Payment Successful!");
                    console.log("Payment ID:", response.razorpay_payment_id);
                    console.log("Order ID:", response.razorpay_order_id);
                    console.log("Signature:", response.razorpay_signature);
                },
                prefill: {
                    name: "John Doe",
                    email: "john.doe@example.com",
                    contact: "6238611816",
                },
                theme: {
                    color: "#000000",
                },
            };

            const razorpay = new (window as any).Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.log(error);

        }

    };



    return (
        <div className="max-w-screen-xl mx-auto">
            <Header />
            <CategoryNav />

            {

                error ? <div className="flex bg-yellow-200 justify-center items-center">
                    {error}
                </div> :
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            {
                                cartData?.map(item => (
                                    <div key={item.id} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
                                        <img
                                            src={item?.product?.imageURLs[0]}
                                            alt={item?.product?.name}
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-semibold text-lg">{item?.product?.name}</h3>
                                                    <p className="text-gray-600">Size: {item?.size}</p>
                                                    <p className="text-gray-600">Color: {item?.color}</p>
                                                </div>
                                                <button onClick={()=>removeProductFromCart(item?.id)} className="text-red-500">
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>

                                            <div className="flex justify-between items-center mt-4">
                                                <p className="font-semibold text-lg">₹ {item?.product?.price}</p>
                                                <div className="flex items-center gap-4 bg-gray-100 rounded-3xl">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className="px-4 py-2 text-xl"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="text-lg">{item?.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="px-4 py-2 text-xl"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                ))}
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow h-fit">
                            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-semibold">₹ {totalAmount}</span>
                                </div>

                                <div className="flex justify-between text-red-500">
                                    <span>Discount (-10%)</span>
                                    <span>-₹ {discount}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-600">Delivery Fee</span>
                                    <span className="font-semibold">₹ {deliveryFee}</span>
                                </div>

                                <div className="border-t pt-4 flex justify-between">
                                    <span className="font-semibold">Total</span>
                                    <span className="font-semibold">₹ {total}</span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <div className="flex gap-2 mb-4">
                                    <div className="flex border items-center bg-gray-200 rounded-3xl">
                                        <Tag className="text-gray-600 w-5 mx-3 font-semibold" />
                                        <input
                                            type="text"
                                            placeholder="Add promo code"
                                            className="flex-1 px-4  bg-gray-200 py-2 border-none rounded-3xl outline-none"
                                        />
                                    </div>

                                    <button className="bg-black text-white px-6 py-2 rounded-3xl">
                                        Apply
                                    </button>
                                </div>

                                <button onClick={handleCheckout} className="w-full bg-black text-white py-3 rounded-3xl flex items-center justify-center gap-2">
                                    Go to Checkout
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
            }


        </div>
    )
}

export default ShoppingCart