import React, { useEffect, useState } from 'react'
import Axios from '../utils/axios'
import Header from '../components/Header';
import CategoryNav from '../components/CategoryNav';
import { ChevronRight, Tag, Trash2 } from 'lucide-react';
import useCartStore from '../store/useCartStore';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ShoppingCart() {
    const [cartData, setCartData] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState()
    const [totalAmount, setTotalAmount] = useState<any>(1)
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
    const cartCount = useCartStore(state => state.cartCount);
    const { removeFromCart, isLoading, items } = useCartStore();
    const [madeOrder, setMadeOrder] = useState(false)


    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);


    useEffect(() => {
        fetchCartItem()
        setCartData(items)
    }, [cartCount, madeOrder]);


    const fetchCartItem = async () => {
        try {
            setLoading(true);
            const response = await Axios.get('cart');
            console.log(response);

            if (response) {
                setCartData(response?.data?.data)
                setTotalAmount(response?.data?.total)
            }
        } catch (error: any) {
            setError(error?.response?.data?.message)
        } finally {
            setLoading(false);
        }
    }


    // const updateQuantity = (id: string, delta: number) => {
    //     console.log(id,"id");

    //     setQuantities((prev: any) => ({

    //         ...prev,
    //         [id]: Math.max(1, prev[id] + delta)
    //     }));
    // };

    const updateQuantity = (id: string, delta: number) => {
        console.log(id, "id");

        setQuantities((prev: any) => {
            const newPrev = prev || {}; // Ensure prev is always an object
            return {
                ...newPrev,
                [id]: Math.max(1, (newPrev[id] || 0) + delta) // Default to 0 if undefined
            };
        });
    };

    const removeProductFromCart = (product_id: string) => {
        removeFromCart(product_id)
    }

    const handleOrder = async (orderData: any) => {
        console.log(orderData);
        const orderItems = cartData.map(item => ({
            productId: item.product_id,  // Ensure it's mapped correctly
            quantity: item.quantity,
            size: item.size,
            color: item.color,
            paymentMethod: "CARD",  // You may need to dynamically assign this
        }));
        try {
            const response = await Axios.post("/order", {
                items: orderItems
            })
            console.log(response, "order response");
            setMadeOrder(true)
        } catch (error) {
            console.error("Order API error", error);
        } finally {

        }
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
                    handleOrder(cartData)
                    console.log("Payment ID:", response);
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

    const CartItemSkeleton = () => (
        <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
            <Skeleton width={80} height={80} borderRadius={8} />
            <div className="flex-1">
                <div className="flex justify-between items-start">
                    <div>
                        <Skeleton width={150} height={24} />
                        <Skeleton width={80} height={16} className="mt-2" />
                        <Skeleton width={80} height={16} className="mt-1" />
                    </div>
                    <Skeleton circle width={20} height={20} />
                </div>

                <div className="flex justify-between items-center mt-4">
                    <Skeleton width={60} height={24} />
                    <Skeleton width={120} height={40} borderRadius={24} />
                </div>
            </div>
        </div>
    );

    const OrderSummarySkeleton = () => (
        <div className="bg-white p-6 rounded-lg shadow h-fit">
            <Skeleton width={150} height={28} className="mb-6" />

            <div className="space-y-4">
                <div className="flex justify-between">
                    <Skeleton width={80} height={18} />
                    <Skeleton width={60} height={18} />
                </div>

                <div className="flex justify-between">
                    <Skeleton width={100} height={18} />
                    <Skeleton width={60} height={18} />
                </div>

                <div className="flex justify-between">
                    <Skeleton width={90} height={18} />
                    <Skeleton width={60} height={18} />
                </div>

                <div className="border-t pt-4 flex justify-between">
                    <Skeleton width={40} height={20} />
                    <Skeleton width={70} height={20} />
                </div>
            </div>


            

            <div className="mt-6">
                <div className="flex gap-2 mb-4">
                    <Skeleton width="75%" height={44} borderRadius={24} />
                    <Skeleton width="25%" height={44} borderRadius={24} />
                </div>

                <Skeleton width="100%" height={48} borderRadius={24} />
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition duration-300">

            <div className="max-w-screen-xl mx-auto">
                <Header />
                <CategoryNav />

                {error ? (
                    // <div className="flex bg-yellow-200 justify-center items-center">
                    //     {error}
                    // </div>
                    <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-900">
                        <p className="text-xl font-semibold mb-4 dark:text-gray-100">Your cart is empty</p>
                        <p className="text-gray-600 mb-6 dark:text-gray-400">Add items to your cart to see them here.</p>
                        <Link to={"/"}>
                            <button className="bg-black text-white px-6 py-2 rounded-3xl dark:text-white">
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                ) :
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            {loading ?
                                (Array(3).fill(0).map((_, index) => (
                                    <CartItemSkeleton key={index} />
                                ))
                                ) : (
                                    cartData?.map(item => (
                                        <div key={item.id} className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 transition duration-300">
                                            <img
                                                src={item?.product?.imageURLs[0]}
                                                alt={item?.product?.name}
                                                className="w-20 h-20 object-cover rounded"
                                            />
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="font-semibold text-lg text-black dark:text-gray-100">{item?.product?.name}</h3>
                                                        <p className="text-gray-600 dark:text-gray-400">Size: {item?.size}</p>
                                                        <p className="text-gray-600 dark:text-gray-400">Color: {item?.color}</p>
                                                    </div>
                                                    <button onClick={() => removeProductFromCart(item?.id)} className="text-red-500 dark:text-red-400">
                                                        <Trash2 size={20} />
                                                    </button>
                                                </div>

                                                <div className="flex justify-between items-center mt-4">
                                                    <p className="font-semibold text-lg text-black dark:text-gray-100">₹ {item?.product?.price}</p>
                                                    <div className="flex items-center gap-4 bg-gray-100 dark:bg-gray-700 rounded-3xl border border-gray-200 dark:border-gray-600">                                                    <button
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className="px-4 py-2 text-xl text-gray-700 dark:text-gray-300"                                                    >
                                                        -
                                                    </button>
                                                        <span className="text-lg text-gray-800 dark:text-gray-100">{item?.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, 1)}
                                                            className="px-4 py-2 text-xl text-gray-700 dark:text-gray-300"                                                    >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}

                            {/* {!loading && (!cartData || cartData.length === 0) && (
                            <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow">
                                <p className="text-xl font-semibold mb-4">Your cart is empty</p>
                                <p className="text-gray-600 mb-6">Add items to your cart to see them here.</p>
                                <button className="bg-black text-white px-6 py-2 rounded-3xl">
                                    Continue Shopping
                                </button>
                            </div>
                        )} */}
                        </div>


                        <div>
                            {loading ? (
                                <OrderSummarySkeleton />
                            ) : (
                                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow h-fit border border-gray-200 dark:border-gray-700 transition duration-300">
                                    <h2 className="text-xl font-semibold mb-6 text-black dark:text-gray-100">Order Summary</h2>
                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                                            <span className="font-semibold text-black dark:text-gray-100">₹ {totalAmount}</span>
                                        </div>

                                        <div className="flex justify-between text-red-500 dark:text-red-400">
                                            <span>Discount (-10%)</span>
                                            <span>-₹ {discount}</span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Delivery Fee</span>
                                            <span className="font-semibold text-black dark:text-gray-100">₹ {deliveryFee}</span>
                                        </div>

                                        <div className="border-t dark:border-gray-700 pt-4 flex justify-between">
                                            <span className="font-semibold text-black dark:text-gray-100">Total</span>
                                            <span className="font-semibold text-black dark:text-gray-100">₹ {total}</span>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <div className="flex gap-2 mb-4">
                                            <div className="flex border border-gray-300 dark:border-gray-600 items-center bg-gray-200 dark:bg-gray-700 rounded-3xl">
                                                <Tag className="text-gray-600 dark:text-gray-300 w-5 mx-3 font-semibold" />
                                                <input
                                                    type="text"
                                                    placeholder="Add promo code"
                                                    className="w-full flex-1 px-4 bg-gray-200 dark:bg-gray-700 py-2 border-none rounded-3xl outline-none text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 min-w-0"
                                                />
                                            </div>

                                            <button className="bg-black dark:bg-gray-50 text-white dark:text-black px-6 py-2 rounded-3xl hover:bg-gray-800 dark:hover:bg-gray-200">
                                                Apply
                                            </button>
                                        </div>

                                        <button
                                            onClick={handleCheckout}
                                            className="w-full bg-black dark:bg-gray-50 text-white dark:text-black py-3 rounded-3xl flex items-center justify-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-200"
                                        >
                                            Go to Checkout
                                            <ChevronRight size={20} className="text-white dark:text-gray-100" />
                                        </button>
                                    </div>

                                </div>
                            )}

                        </div>
                    </div>
                }


            </div>
        </div>
    )
}

export default ShoppingCart