import { useEffect, useState } from "react";
import Axios from "../utils/axios";
import Header from "../components/Header";
import { LinearProgress } from "@mui/material";
import { Circle } from "lucide-react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Link } from "react-router-dom";
const statusSteps = ["ORDERD", "PACKED", "SHIPPED", "DELIVERED"];


function Order() {
    const [orderItems, setOrderItems] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    console.log(orderItems, "order item");

    useEffect(() => {
        fetchOrderItems();
    }, []);

    const fetchOrderItems = async () => {
        setLoading(true);
        try {
            const response = await Axios.get("/order");
            if (response?.data) {
                const mergedItems = response.data.flatMap((order: any) =>
                    order.orderItems.map((item: any) => ({
                        ...item,
                        deliveryDate: order.createdAt,
                        paymentStatus: order.paymentStatus,
                        orderStatus: order.status,
                    }))
                );

                setOrderItems(mergedItems);
            }
        } catch (error: any) {
            setError(error?.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false)
        }
    };

    const cancleOrder = async (id: any) => {

    }

    // Function to get progress percentage
    const getProgressPercentage = (status: string) => {
        return (statusSteps.indexOf(status) / (statusSteps.length - 1)) * 100;
    };

    const OrderItemSkeleton = () => (
        <div className="flex items-center gap-6 p-4 bg-white rounded-xl shadow-md border border-gray-200 w-full max-w-3xl mx-auto">
            <Skeleton width={80} height={80} className="rounded-md" />

            <div className="flex-1 flex flex-col gap-2">
                <Skeleton width="70%" height={24} />
                <Skeleton width="40%" height={16} />

                {/* Progress Bar Skeleton */}
                <div className="relative w-full my-2">
                    <Skeleton height={4} />
                    <div className="absolute flex justify-between w-full top-1/2 -translate-y-1/2">
                        {[...Array(4)].map((_, i) => (
                            <Skeleton key={i} circle width={12} height={12} />
                        ))}
                    </div>
                </div>

                <Skeleton width="60%" height={16} />
            </div>

            <div>
                <Skeleton width={80} height={36} className="mb-2" />
                <Skeleton width={60} height={24} />
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition duration-300">

            <div className="max-w-screen-xl mx-auto">
                <Header />
                {error ? (
                    <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-900">
                        <p className="text-xl font-semibold mb-4 dark:text-gray-100">No Orders yet</p>
                        <p className="text-gray-600 mb-6 dark:text-gray-400">Make an order see them here.</p>
                        <Link to={"/"}>
                            <button className="bg-black text-white px-6 py-2 rounded-3xl dark:text-white">
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 my-8">
                        <div className="lg:col-span-2 space-y-6">
                            {
                                loading ? (
                                    [...Array(3)].map((_, index) => (
                                        <OrderItemSkeleton key={index} />
                                    ))
                                ) : (
                                    orderItems.map((item: any, index) => {
                                        const progress = getProgressPercentage(item.orderStatus);

                                        return (
                                            <div
                                                key={item.id || index}
                                                className="flex items-center gap-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 w-full max-w-3xl mx-auto transition duration-300"                                            >
                                                <img
                                                    src={item?.product?.imageURLs[0]}
                                                    alt={item?.product?.name}
                                                    className="w-20 h-20 object-cover rounded-md"
                                                />

                                                <div className="flex-1 flex flex-col gap-2">
                                                    <h3 className="font-semibold text-lg text-black dark:text-gray-100">{item?.product?.name}</h3>
                                                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                                                        Size: {item?.size} | Color: {item?.color}
                                                    </p>

                                                    {/* Progress Bar Between Details & Price */}
                                                    <div className="relative w-full my-2">
                                                        <LinearProgress
                                                            variant="determinate"
                                                            value={progress}
                                                            sx={{
                                                                height: 4,
                                                                borderRadius: 4,
                                                                backgroundColor: "#dddddd",
                                                                "& .MuiLinearProgress-bar": { backgroundColor: "#000000" },
                                                            }}
                                                        />
                                                        <div className="absolute flex justify-between w-full top-1/2 -translate-y-1/2">
                                                            {statusSteps.map((step, i) => (
                                                                <>
                                                                    <Circle
                                                                        key={i}
                                                                        className={`${i <= statusSteps.indexOf(item.orderStatus)
                                                                            ? "text-black dark:text-white"
                                                                            : "text-gray-400 dark:text-gray-500"
                                                                            }`}
                                                                        size={12}
                                                                        fill={i <= statusSteps.indexOf(item.orderStatus) ? "#000000" : "#E0E0E0"}
                                                                    />
                                                                </>

                                                            ))}
                                                        </div>
                                                    </div>

                                                    <p className="text-green-600 dark:text-green-400 font-medium text-sm">
                                                        Delivered on {new Date(item.deliveryDate).toDateString()}
                                                    </p>
                                                </div>

                                                <div>
                                                    {item.orderStatus !== "DELIVERED" && <button onClick={() => cancleOrder(item.id)} className="bg-black dark:bg-gray-700 text-white dark:text-gray-100 p-1.5 rounded-md hover:bg-gray-800 dark:hover:bg-gray-600"> Cancel</button>}
                                                    <p className="font-bold text-xl text-black dark:text-gray-100">₹ {item?.price}</p>
                                                </div>

                                            </div>
                                        );
                                    })
                                )}
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}

export default Order;
