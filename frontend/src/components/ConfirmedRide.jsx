import React from 'react'

const ConfirmedRide = (props) => {
    const { pickup, destination, createRide, setConfirmedRidePanel, setVehicleFound, fare, vehicleType } = props

    const vehicleImages = {
        car: "https://tb-static.uber.com/prod/vehicles-importer/2022/tesla/model-3/high_res/50091_DFDEDD_3M.png",
        moto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkp8YufXKsHcZF7KznD31zy6C5nlYuRDB-qw&s",
        auto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMRyG_17bKVszyOE1vxUikjxMJ_PoUX4pxIQ&s"
    };

    return (
        <div>
            <h5 onClick={() => {
                setConfirmedRidePanel(false)
            }} className=' w-[93%] p- text-center absolute top-0   '> <i className=" text-3xl text-gray-500 ri-arrow-down-wide-line"></i> </h5>
            <h3 className='text-2xl font-semibold mb-5'>Confirm your Ride</h3>
            <div className='flex justify-between flex-col items-center '>
                <img
                    className="h-30"
                    src={vehicleImages[vehicleType]}
                    alt={vehicleType}
                />

                <div className='w-full flex flex-col gap-3  '>
                    <div className='flex items-center  -mt-3 border-b-2 border-gray-300  '>
                        <i className=" flex justify-center items-center p-4 ri-map-pin-2-line"></i>
                        <div>
                             
                            <h5 className='text-l text-black'>{pickup}</h5>
                        </div>
                    </div>
                    <div className='flex items-center  border-b-2 border-gray-300 '>
                        <i className=" flex justify-center items-center p-4 ri-square-fill"></i>
                        <div>
                             
                            <h5 className='text-l text-black'>{destination}</h5>
                        </div>
                    </div>
                    <div className='flex mb-4 '>
                        <i className=" flex justify-center items-center p-4 ri-currency-line"></i>
                        <div>
                            <h1 className='text-lg font-medium'>₹ {fare || 0}</h1>
                            <h5 className='text-sm text-gray-600'>Cash Cash</h5>
                        </div>
                    </div>

                </div>
                <button onClick={() => {
                    setVehicleFound(true)
                    setConfirmedRidePanel(false)
                    createRide()
                }} className='w-full bg-green-700 text-white font-semibold p-2 rounded-lg  '>Confirm</button>
            </div>
        </div>
    )
}

export default ConfirmedRide
