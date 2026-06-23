import React from 'react'

const RidePopUp = (props) => {
    const { setRidePopupPanel, setConfirmRidePopupPanel } = props
    return (
        <div>
            <h5 onClick={() => {
                setRidePopupPanel(false)
            }} className=' w-[93%] p- text-center absolute top-0   '> <i className=" text-3xl text-gray-500 ri-arrow-down-wide-line"></i> </h5>
            <h3 className='text-2xl font-semibold mb-2'>New Ride Available</h3>
            <div className='flex items-center justify-between mb-4 p-2 bg-amber-300 rounded-md'>
                <div className='flex items-center gap-3 '>
                    <img className='h-10 w-10 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s" alt="" />
                    <h2 className='text-lg font-medium' >Vivek BAlla</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2KM</h5>
            </div>
            <div className='flex justify-between flex-col items-center '>


                <div className='w-full flex flex-col gap-3  '>
                    <div className='flex items-center -mt-3 border-b-2 border-gray-300  '>
                        <i className=" flex justify-center items-center p-4 ri-map-pin-2-line"></i>
                        <div>
                            <h1 className='text-lg font-medium'>562/11/A</h1>
                            <h5 className='text-sm text-gray-600'>Kaikondrahali, Hyderabad,Telangana</h5>
                        </div>
                    </div>
                    <div className='flex  border-b-2 border-gray-300 '>
                        <i className=" flex justify-center items-center p-4 ri-square-fill"></i>
                        <div>
                            <h1 className='text-lg font-medium'>562/11/A</h1>
                            <h5 className='text-sm text-gray-600'>Kaikondrahali, Hyderabad,Telangana</h5>
                        </div>
                    </div>
                    <div className='flex mb-4 '>
                        <i className=" flex justify-center items-center p-4 ri-currency-line"></i>
                        <div>
                            <h1 className='text-lg font-medium'>₹193.30</h1>
                            <h5 className='text-sm text-gray-600'>Cash Cash</h5>
                        </div>
                    </div>

                </div>
                <div className="flex w-full gap-2">
                    <button
                        onClick={() => {
                            setRidePopupPanel(false)
                        }}
                        className="flex-1 bg-gray-300 text-black font-semibold p-2 rounded-lg"
                    >
                        Ignore
                    </button>
                    <button
                        onClick={() => {
                            setConfirmRidePopupPanel(true)
                            setRidePopupPanel(false)
                        }}
                        className="flex-1 bg-green-700 text-white font-semibold p-2 rounded-lg"
                    >
                        Accept
                    </button>

                    
                </div>
            </div>
        </div>
    )
}

export default RidePopUp
