import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useContext ,useEffect } from 'react'
import { SocketDataContext } from '../context/SocketContext'
import { useNavigate } from 'react-router-dom'
import LiveTraking from '../components/LiveTraking'

const Riding = () => {
    const location = useLocation()
    const ride = location.state?.ride
    const { receiveMessage } = useContext(SocketDataContext);
    const navigate = useNavigate()

    useEffect(() => {
      const cleanup = receiveMessage("ride-ended", (data) => {
          console.log("✅ ride-ended received", data);
          navigate("/home");
      });

      return cleanup;
  }, [receiveMessage, navigate]);

    console.log("Ride Data:", ride)
    console.log("Vehicle Type:", ride?.vehicleType)

    const captainName = ride?.captain?.fullname
        ? `${ride.captain.fullname.firstname} ${ride.captain.fullname.lastname}`
        : 'Captain'

    const captainVehicle =
        ride?.captain?.vehicle?.vehicleType  || 'Vehicle'

    const captainPlate =
        ride?.captain?.vehicle?.plate || 'Vehicle Number'

    const vehicleImages = {
        car: "https://tb-static.uber.com/prod/vehicles-importer/2022/tesla/model-3/high_res/50091_DFDEDD_3M.png",
        moto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkp8YufXKsHcZF7KznD31zy6C5nlYuRDB-qw&s",
        auto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMRyG_17bKVszyOE1vxUikjxMJ_PoUX4pxIQ&s"
    }

    return (
        <div className='h-screen flex flex-col'>

            {/* Home Button */}
            <Link
                to="/home"
                className="fixed flex items-center justify-center top-5 right-5 w-10 h-10 bg-white rounded-full shadow-md z-50"
            >
                <i className="ri-home-5-fill text-2xl"></i>
            </Link>

            {/* Map */}
            <div className='h-1/2'>
                <LiveTraking ride={ride} />
            </div>

            {/* Ride Details */}
            <div className='flex-1 flex flex-col justify-end p-4'>

                <div className='flex items-center justify-between mb-5'>

                    <img
                        className='h-30 pl-6 object-contain'
                        src={vehicleImages[ride?.vehicleType] || vehicleImages.car}
                        alt={ride?.vehicleType}
                    />

                    <div className='text-right'>
                        <h2 className='text-lg font-medium'>
                            {captainName}
                        </h2>

                        <h4 className='text-lg font-semibold'>
                            {captainPlate}
                        </h4>

                        <p className='text-sm text-gray-600'>
                            {captainVehicle}
                        </p>
                    </div>

                </div>

                <div className='flex flex-col gap-4'>

                    <div className='flex items-center border-b-2 border-gray-300 pb-3'>
                        <i className="ri-map-pin-2-fill text-xl px-4"></i>

                        <div>
                            <h3 className='text-lg font-semibold'>
                                {ride?.pickup || "Pickup Location"}
                            </h3>

                            <p className='text-sm text-gray-600'>
                                Pickup
                            </p>
                        </div>
                    </div>

                    <div className='flex items-center border-b-2 border-gray-300 pb-3'>
                        <i className="ri-square-fill text-xl px-4"></i>

                        <div>
                            <h3 className='text-lg font-semibold'>
                                {ride?.destination || "Destination"}
                            </h3>

                            <p className='text-sm text-gray-600'>
                                Destination
                            </p>
                        </div>
                    </div>

                    <div className='flex items-center'>
                        <i className="ri-currency-line text-xl px-4"></i>

                        <div>
                            <h3 className='text-lg font-semibold'>
                                ₹{ride?.fare || 0}
                            </h3>

                            <p className='text-sm text-gray-600'>
                                Cash
                            </p>
                        </div>
                    </div>

                </div>

                <button className='w-full bg-green-700 text-white font-semibold p-3 rounded-lg mt-6'>
                    Make a Payment
                </button>

            </div>

        </div>
    )
}

export default Riding