import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ConfirmRidePopUp = (props) => {
    const[otp,setOtp] = useState("")
    const { setConfirmRidePopupPanel } = props

    const submitHandler=(e)=>{
        e.preventDefault()
    }

    return (
        <div className='h-[90%]'>
            <h5 onClick={() => {
                setConfirmRidePopupPanel(false)
            }} className=' w-[93%]  text-center absolute top-0   '> <i className=" text-3xl text-gray-300 ri-arrow-down-wide-line"></i> </h5>
            <h3 className='text-2xl mb-5 font-semibold mb-2'>Confirm to start Ride</h3>
            <div className='flex items-center justify-between mb-8 border-3 border-amber-400 p-3 rounded-md'>
                <div className='flex items-center gap-3 '>
                    <img className='h-10 w-10 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s" alt="" />
                    <h2 className='text-lg text-black font-medium' >Vivek Balla</h2>
                </div>
                <h5 className='text-lg text-black font-semibold'>2.2KM</h5>
            </div>
            <div className='flex justify-between flex-col items-center '>


                <div className='w-full flex flex-col gap-3  '>
                    <div className='flex items-center -mt-3 border-b-2 border-gray-300 '>
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
                    <div className='flex  '>
                        <i className=" flex justify-center items-center p-4 ri-currency-line"></i>
                        <div>
                            <h1 className='text-lg font-medium'>₹193.30</h1>
                            <h5 className='text-sm text-gray-600'>Cash Cash</h5>
                        </div>
                    </div>

                </div>
                <div className='mt-6 w-full '>
                        <form onSubmit={(e)=>{
                            submitHandler(e)
                        }}>
                        <input onChange={(e)=>{setOtp(e.target.value)}} value={otp} type="text" className="bg-[#e6e4e4] pl-12 py-4 text-base rounded-lg w-full mb-4" placeholder='Enter OTP' />
                        <Link to={"/captain-riding"} className='text-lg flex justify-center p-3 items-center text-lg  w-full bg-green-700 text-white font-semibold p-2 rounded-lg  '>Confirm
                        </Link>
                        <button onClick={() => {
                            setConfirmRidePopupPanel(false)
                        }} className='w-full mt-2 bg-red-600 text-white font-semibold p-3  text-xl rounded-lg  '>Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ConfirmRidePopUp
