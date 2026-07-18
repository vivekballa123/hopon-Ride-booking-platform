import React from 'react'

const LookingForDriver = (props) => {
    const {
        pickup,
        destination,
        setVehicleFound,
        fare,
        vehicleType
    } = props

    const vehicleImages = {
        car: "https://tb-static.uber.com/prod/vehicles-importer/2022/tesla/model-3/high_res/50091_DFDEDD_3M.png",
        moto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkp8YufXKsHcZF7KznD31zy6C5nlYuRDB-qw&s",
        auto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMRyG_17bKVszyOE1vxUikjxMJ_PoUX4pxIQ&s"
    }

    return (
        <div>
            <h5
                onClick={() => setVehicleFound(false)}
                className="w-[93%] text-center absolute top-0 cursor-pointer"
            >
                <i className="text-3xl text-gray-500 ri-arrow-down-wide-line"></i>
            </h5>

            <h3 className="text-2xl font-semibold mb-5 text-center">
                Looking for nearby drivers
            </h3>

            {/* Pulse Location */}
            <div className="relative w-full h-1.5 rounded-full bg-gray-200 overflow-hidden mb-4">

                <div className="absolute inset-y-0 w-1/3 bg-green-500 rounded-full animate-[loading_1.2s_ease-in-out_infinite]"></div>

            </div>



            <style>{`
                @keyframes loading{
                    0%{
                        transform:translateX(-100%);
                    }
                    100%{
                        transform:translateX(320%);
                    }
                }
                `}</style>

            <p className="text-center text-gray-500 text-sm animate-pulse mb-4">
                Searching nearby drivers...
            </p>




            {/* Selected Vehicle */}
            <div className="flex justify-center mb-5">
                <img
                    className="h-28 object-contain"
                    src={vehicleImages[vehicleType]}
                    alt={vehicleType}
                />
            </div>

            {/* Ride Details */}
            <div className="w-full flex flex-col gap-3">

                <div className="flex items-center border-b-2 border-gray-200 pb-3">
                    <i className="ri-map-pin-2-line text-xl px-4"></i>

                    <div>
                        <h5 className="font-medium text-black">
                            {pickup}
                        </h5>
                    </div>
                </div>

                <div className="flex items-center border-b-2 border-gray-200 pb-3">
                    <i className="ri-square-fill text-lg px-4"></i>

                    <div>
                        <h5 className="font-medium text-black">
                            {destination}
                        </h5>
                    </div>
                </div>

                <div className="flex items-center">
                    <i className="ri-currency-line text-xl px-4"></i>

                    <div>
                        <h1 className="text-lg font-semibold">
                            ₹{fare}
                        </h1>

                        <h5 className="text-sm text-gray-500">
                            Cash
                        </h5>
                    </div>
                </div>

            </div>




        </div>
    )
}

export default LookingForDriver