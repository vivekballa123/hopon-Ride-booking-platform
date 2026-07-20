import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ConfirmRidePopUp = (props) => {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { ride, setConfirmRidePopupPanel, setRidePopupPanel } = props;

    const navigate = useNavigate();

    const submitHander = async (e) => {
        e.preventDefault();

        if (isSubmitting) return;

        if (!otp.trim()) {
            setError("Please enter the OTP.");
            return;
        }

        try {
            setError("");
            setIsSubmitting(true);

            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
                {
                    rideId: ride?._id,
                    otp
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            if (response.status === 200) {
                setConfirmRidePopupPanel(false);
                setRidePopupPanel(false);

                navigate("/captain-riding", {
                    state: { ride: response.data }
                });
            }
        } catch (err) {
            console.log(err.response?.data || err);

            setError(
                err.response?.data?.error ||
                err.response?.data?.message ||
                "Invalid OTP. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="h-full">
            <h5
                onClick={() => setConfirmRidePopupPanel(false)}
                className="w-[93%] text-center absolute top-0"
            >
                <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
            </h5>

            <h3 className="text-2xl font-semibold mb-5">
                Confirm to Start Ride
            </h3>

            <div className="flex items-center justify-between mb-8 border-3 border-amber-400 p-3 rounded-md">
                <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-green-600 text-white flex items-center justify-center text-lg font-bold uppercase">
                        {ride?.user?.fullname?.firstname?.[0] || ""}
                        {ride?.user?.fullname?.lastname?.[0] || ""}
                    </div>

                    <h2 className="text-lg text-black font-medium">
                        {ride?.user?.fullname?.firstname}{" "}
                        {ride?.user?.fullname?.lastname}
                    </h2>
                </div>

                <h5 className="text-lg text-black font-semibold">
                    {ride?.distance
                        ? `${(ride.distance / 1000).toFixed(1)} KM`
                        : ""}
                </h5>
            </div>

            <div className="flex justify-between flex-col items-center">
                <div className="w-full flex flex-col gap-3">
                    <div className="flex items-center -mt-3 border-b-2 border-gray-300">
                        <i className="flex justify-center items-center p-4 ri-map-pin-2-line"></i>
                        <div>
                            <h5 className="text-md font-medium">
                                {ride?.pickup}
                            </h5>
                        </div>
                    </div>

                    <div className="flex border-b-2 border-gray-300">
                        <i className="flex justify-center items-center p-4 ri-square-fill"></i>
                        <div>
                            <h5 className="text-md font-medium">
                                {ride?.destination}
                            </h5>
                        </div>
                    </div>

                    <div className="flex">
                        <i className="flex justify-center items-center p-4 ri-currency-line"></i>
                        <div>
                            <h1 className="text-lg font-medium">
                                ₹{ride?.fare}
                            </h1>
                            <h5 className="text-sm text-gray-600">
                                Cash
                            </h5>
                        </div>
                    </div>
                </div>

                <div className="mt-6 w-full">
                    <form onSubmit={submitHander}>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => {
                                setOtp(e.target.value);
                                setError("");
                            }}
                            className={`bg-[#e6e4e4] pl-12 py-4 text-base rounded-lg w-full ${error
                                    ? "border-2 border-red-500"
                                    : "border border-transparent"
                                }`}
                            placeholder="Enter OTP"
                        />

                        {error && (
                            <div className="flex items-center gap-2 text-red-600 mt-2 mb-4 text-sm font-medium">
                                <i className="ri-error-warning-fill text-lg"></i>
                                <span>{error}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-green-700 text-white font-semibold p-3 rounded-lg mt-2 hover:bg-green-800 transition disabled:opacity-70"
                        >
                            {isSubmitting ? "Confirming..." : "Confirm"}
                        </button>

                        <button
                            type="button"
                            onClick={() => setConfirmRidePopupPanel(false)}
                            className="w-full mt-3 bg-red-600 text-white font-semibold p-3 rounded-lg hover:bg-red-700 transition"
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ConfirmRidePopUp;