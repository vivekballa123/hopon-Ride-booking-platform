import React from 'react'

const WaitingForDriver = (props) => {

    const {
        ride,
        setWaitingForDriver,
        vehicleType
    } = props

    const vehicleImages = {
        car: "https://tb-static.uber.com/prod/vehicles-importer/2022/tesla/model-3/high_res/50091_DFDEDD_3M.png",
        moto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkp8YufXKsHcZF7KznD31zy6C5nlYuRDB-qw&s",
        auto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMRyG_17bKVszyOE1vxUikjxMJ_PoUX4pxIQ&s"
    }

    return (
        <div className="p-2 pb-2 pt-0">

             


            {/* Status */}
            <h3 className="text-2xl font-semibold mb-5 text-center">
                Driver is on the way
            </h3>


            {/* Animated Loading Bar */}
            <div className="relative w-full h-1.5 rounded-full bg-gray-200 overflow-hidden mb-4">

                <div className="absolute inset-y-0 w-1/3 bg-green-500 rounded-full animate-[driverLoading_1.2s_ease-in-out_infinite]"></div>

            </div>


            {/* Animation */}
            <style>{`
                @keyframes driverLoading {
                    0% {
                        transform: translateX(-100%);
                    }

                    100% {
                        transform: translateX(320%);
                    }
                }
            `}</style>


            <p className="text-center text-gray-500 text-sm animate-pulse mb-5">
                Your driver is coming to your pickup location...
            </p>


            {/* Driver + Vehicle */}
            <div className="flex items-center justify-between">

                <img
                    className="h-25 object-contain"
                    src={vehicleImages[vehicleType]}
                    alt={ride?.vehicleType || vehicleType}
                />

                <div className="text-right">

                    <h2 className="text-lg font-medium">
                        {ride?.captain?.fullname?.firstname}
                        {" "}
                        {ride?.captain?.fullname?.lastname}
                    </h2>

                    <h4 className="text-lg font-semibold -mt-1 -mb-1">
                        {ride?.captain?.vehicle?.plate}
                    </h4>

                    <p className="text-sm text-gray-600">
                        {ride?.captain?.vehicle?.color}
                        {" "}
                        {ride?.captain?.vehicle?.vehicleType}
                    </p>

                    <h1 className="text-lg font-semibold mt-1">
                        OTP: {ride?.otp}
                    </h1>

                </div>

            </div>


            {/* Ride Details */}
            <div className="flex flex-col mb-0">

                {/* Pickup */}
                <div className="flex items-center border-b-2 border-gray-300 pb-3">

                    <i className="ri-map-pin-2-line p-4 text-xl"></i>

                    <div>
                        <h5 className="text-md font-medium">
                            {ride?.pickup}
                        </h5>
                    </div>

                </div>


                {/* Destination */}
                <div className="flex items-center border-b-2 border-gray-300 pb-3">

                    <i className="ri-square-fill p-4"></i>

                    <div>
                        <h5 className="text-md font-medium">
                            {ride?.destination}
                        </h5>
                    </div>

                </div>


                {/* Fare */}
                <div className="flex items-center pt-3">

                    <i className="ri-currency-line p-4 text-xl"></i>

                    <div>

                        <h1 className="text-lg font-semibold">
                            ₹{ride?.fare}
                        </h1>

                        <h5 className="text-sm text-gray-600">
                            Cash
                        </h5>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default WaitingForDriver