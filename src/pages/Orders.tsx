import { useEffect, useState } from "react";
import Axios from "../utils/axios";
import Header from "../components/Header";
import { LinearProgress } from "@mui/material";
import { Circle } from "lucide-react";

const statusSteps = ["ORDERD", "PACKED", "SHIPPED", "DELIVERED"];

function Order() {
    const [orderItems, setOrderItems] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchOrderItems();
    }, []);

    const fetchOrderItems = async () => {
        try {
            const response = await Axios.get("/order");
            if (response?.data) {
                const mergedItems = response.data.flatMap((order:any) =>
                    order.orderItems.map((item:any) => ({
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
        }
    };

    // Function to get progress percentage
    const getProgressPercentage = (status: string) => {
        return (statusSteps.indexOf(status) / (statusSteps.length - 1)) * 100;
    };

    return (
        <div className="max-w-screen-xl mx-auto">
            <Header />
            {error ? (
                <div className="flex bg-yellow-200 justify-center items-center p-4">
                    {error}
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 my-8">
                    <div className="lg:col-span-2 space-y-6">
                        {orderItems.map((item:any, index) => {
                            const progress = getProgressPercentage(item.orderStatus);

                            return (
                                <div
                                    key={item.id || index}
                                    className="flex items-center gap-6 p-4 bg-white rounded-xl shadow-md border border-gray-200 w-full max-w-3xl mx-auto"
                                >
                                    <img
                                        src={item?.product?.imageURL}
                                        alt={item?.product?.name}
                                        className="w-20 h-20 object-cover rounded-md"
                                    />

                                    <div className="flex-1 flex flex-col gap-2">
                                        <h3 className="font-semibold text-lg">{item?.product?.name}</h3>
                                        <p className="text-gray-500 text-sm">
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
                                                    {/* <h2>hle</h2> */}
                                                    <Circle
                                                        key={i}
                                                        className={`${i <= statusSteps.indexOf(item.orderStatus)
                                                            ? "text-black"
                                                            : "text-gray-400"
                                                            }`}
                                                        size={12}
                                                        fill={i <= statusSteps.indexOf(item.orderStatus) ? "#000000" : "#E0E0E0"}
                                                    />
                                                    </>
                                                    
                                                ))}
                                            </div>
                                        </div>

                                        <p className="text-green-600 font-medium text-sm">
                                            Delivered on {new Date(item.deliveryDate).toDateString()}
                                        </p>
                                    </div>

                                    <div>
                                        {item.orderStatus !== "DELIVERED" && <button className="bg-black text-white p-1.5 rounded-md"> Cancel</button>}
                                        <p className="font-bold text-xl">₹ {item?.price}</p>
                                    </div>

                                </div>
                            );
                        })}
                    </div>

                </div>
            )}
        </div>
    );
}

export default Order;
