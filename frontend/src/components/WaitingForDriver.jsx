import React from 'react'

const WaitingForDriver = (props) => {
    const { ride, setWaitingForDriver,vehicleType } = props

    const vehicleImages = {
        car: "https://tb-static.uber.com/prod/vehicles-importer/2022/tesla/model-3/high_res/50091_DFDEDD_3M.png",
        moto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkp8YufXKsHcZF7KznD31zy6C5nlYuRDB-qw&s",
        auto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMRyG_17bKVszyOE1vxUikjxMJ_PoUX4pxIQ&s"
    }
     
    return (
        <div className='p-5'>
            <h5
                onClick={() => setWaitingForDriver(false)}
                className="w-[93%] text-center absolute top-0 cursor-pointer"
            >
                <i className="text-3xl text-gray-500 ri-arrow-down-wide-line"></i>
            </h5>
            
            <div className="flex items-center justify-between">

                <img
                    className="h-25"
                    src={vehicleImages[vehicleType]}
                    alt={ride?.vehicleType}
                />

                <div className="text-right">
                    <h2 className="text-lg font-medium">
                        {ride?.captain?.fullname?.firstname} {ride?.captain?.fullname?.lastname}
                    </h2>

                    <h4 className="text-lg font-semibold -mt-1 -mb-1">
                        {ride?.captain?.vehicle?.plate}
                    </h4>

                    <p className="text-sm text-gray-600">
                        {ride?.captain?.vehicle?.color} {ride?.captain?.vehicle?.vehicleType}
                    </p>
                    <h1 className="text-lg font-semibold -mt-1 -mb-1">{ride?.otp}</h1>
                </div>

            </div>

            <div className="flex flex-col mt-6">

                <div className="flex items-center border-b-2 border-gray-300 pb-3">
                    <i className="ri-map-pin-2-line p-4 text-xl"></i>

                    <div>
                        <h5 className="text-md font-medium">
                            {ride?.pickup}
                        </h5>
                    </div>
                </div>

                <div className="flex items-center border-b-2 border-gray-300 pb-3">
                    <i className="ri-square-fill p-4"></i>

                    <div>
                        <h5 className="text-md font-medium">
                            {ride?.destination}
                        </h5>
                    </div>
                </div>

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