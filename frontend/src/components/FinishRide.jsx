import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FinishRide = (props) => {
    const {setFinishRidePanel,ride} = props
    const navigate = useNavigate()
    const endRide = async () => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
            {
                rideId: ride._id
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        );

        console.log("End ride response:", response);

        if (response.status === 200) {
            navigate("/captain-home", {
                replace: true
            });
        }

    } catch (error) {
        console.error(
            "Error ending ride:",
            error.response?.data || error.message
        );
    }
};

    return (
        <div>
            <div className='h-[90%]'>
                <h5 onClick={() => {
                    setFinishRidePanel(false)
                }} className=' w-[93%]  text-center absolute top-0   '> <i className=" text-3xl text-gray-300 ri-arrow-down-wide-line"></i> </h5>
                <h3 className='text-2xl mb-5 font-semibold mb-2'>Finish the Ride</h3>
                <div className='flex items-center justify-between mb-8 border-3 border-amber-400 p-3 rounded-md'>
                    <div className='flex items-center gap-3 '>
                        <img className='h-10 w-10 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s" alt="" />
                        <h2 className='text-lg text-black font-medium' >{ride?.user.fullname.firstname}</h2>
                    </div>
                    <h5 className='text-lg text-black font-semibold'>{ride?.distance ? `${(ride.distance / 1000).toFixed(1)} KM` : ""}</h5>
                </div>
                <div className='flex justify-between flex-col items-center '>


                    <div className='w-full flex flex-col gap-3  '>
                        <div className='flex items-center -mt-3 border-b-2 border-gray-300 '>
                            <i className=" flex justify-center items-center p-4 ri-map-pin-2-line"></i>
                            <div>
                                 
                                <h5 className='text-sm text-gray-600'>{ride?.pickup}</h5>
                            </div>
                        </div>
                        <div className='flex  border-b-2 border-gray-300 '>
                            <i className=" flex justify-center items-center p-4 ri-square-fill"></i>
                            <div>
                                 
                                <h5 className='text-sm text-gray-600'>{ride?.destination}</h5>
                            </div>
                        </div>
                        <div className='flex  '>
                            <i className=" flex justify-center items-center p-4 ri-currency-line"></i>
                            <div>
                                <h1 className='text-lg font-medium'>₹{ride?.fare}</h1>
                                <h5 className='text-sm text-gray-600'>Cash Cash</h5>
                            </div>
                        </div>

                    </div>
                    <div className='mt-6 w-full '>
                         
                            <button onClick={endRide}   className=' text-lg flex justify-center p-3 items-center text-lg  w-full bg-green-700 text-white font-semibold p-2 rounded-lg  '>Finish Ride
                            </button>
                             <p className=' text-xs p-4 text-center' >click on finish ride if you have completed the payment</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FinishRide
