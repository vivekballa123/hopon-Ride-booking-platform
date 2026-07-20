import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import LiveTraking from '../components/LiveTraking'

const CaptainRiding = () => {
    const location = useLocation()
    const ride = location.state?.ride

    const [finishRidePanel, setFinishRidePanel] = useState(false)
    const finishRidePanelRef = useRef(null)

    console.log(ride)
    useGSAP(() => {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [finishRidePanel])

    const passengerName = ride?.user?.fullname
        ? `${ride.user.fullname.firstname} ${ride.user.fullname.lastname}`
        : 'Passenger'

    return (
        <div className='h-screen'>
            <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
                <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                <Link to='/captain-home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>

            <div className='h-4/5'>
                <LiveTraking/>
            </div>

            <div className="h-1/5 bg-yellow-400 px-6 py-5 rounded-t-3xl shadow-lg">
                <div className="flex items-center justify-between">

                    {/* Distance & Time */}
                    <div className="flex flex-col">
                        <p className="text-sm font-medium text-gray-700 uppercase tracking-wider">
                            Ride Progress
                        </p>

                        <h2 className="text-3xl font-bold text-gray-900 mt-1">
                            {(ride?.distance / 1000).toFixed(1)} km
                        </h2>

                        <div className="flex items-center gap-2 mt-2">
                            <i className="ri-time-line text-gray-700 text-lg"></i>
                            <span className="text-lg font-semibold text-gray-800">
                                {Math.ceil(ride?.duration / 60)} mins
                            </span>
                        </div>
                        <h1>Customer Loc: {ride.pickup}</h1>
                    </div>

                    {/* Button */}
                    <button
                        onClick={() => setFinishRidePanel(true)}
                        className="bg-green-700 hover:bg-green-800 active:scale-95 transition-all duration-200 text-white font-semibold px-7 py-3 rounded-xl shadow-md"
                    >
                        Complete Ride
                    </button>

                </div>
            </div>

            <div ref={finishRidePanelRef} className='fixed z-10 bottom-0 translate-y-full py-6 px-3 pt-12 bg-white w-full'>
                <FinishRide
                    ride={ride}
                    setFinishRidePanel={setFinishRidePanel}
                />
            </div>
        </div>
    )
}

export default CaptainRiding
