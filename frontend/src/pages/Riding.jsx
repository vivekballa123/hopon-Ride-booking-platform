import React from 'react'
import { Link } from 'react-router-dom'

const Riding = () => {
  return (
    <div className='h-screen flex flex-col'>

      {/* Home Button */}
      <Link
        to="/home"
        className="fixed flex items-center top-5 right-5 w-10 h-10 bg-white rounded-full p-2 shadow-md z-50"
      >
        <i className="ri-home-5-fill text-2xl"></i>
      </Link>

      {/* Top Half - Map/GIF */}
      <div className='h-1/2'>
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bottom Half - Ride Details */}
      <div className='flex-1 flex flex-col justify-end p-3'>
        <div className='p-3 flex items-center justify-between'>
          <img
            className='h-20'
            src='https://tb-static.uber.com/prod/vehicles-importer/2022/tesla/model-3/high_res/50091_DFDEDD_3M.png'
            alt=''
          />

          <div className='text-right'>
            <h2 className='text-lg font-medium'>Vivek</h2>
            <h4 className='text-lg font-semibold -mt-1 -mb-1'>
              AP23 AL 5656
            </h4>
            <p className='text-sm text-gray-600'>
              Maruthi Suzuki Alto
            </p>
          </div>
        </div>

        <div className='flex flex-col items-center'>
          <div className='w-full flex flex-col gap-3'>
            <div className='flex border-b-2 border-gray-300 pb-3'>
              <i className="flex justify-center items-center p-4 ri-square-fill"></i>

              <div>
                <h1 className='text-lg font-medium'>562/11/A</h1>
                <h5 className='text-sm text-gray-600'>
                  Kaikondrahali, Hyderabad, Telangana
                </h5>
              </div>
            </div>

            <div className='flex mb-4'>
              <i className="flex justify-center items-center p-4 ri-currency-line"></i>

              <div>
                <h1 className='text-lg font-medium'>₹193.30</h1>
                <h5 className='text-sm text-gray-600'>Cash</h5>
              </div>
            </div>
          </div>
        </div>

        <button className='w-full bg-green-700 text-white font-semibold p-3 rounded-lg mt-2'>
          Make a Payment
        </button>
      </div>
    </div>
  )
}

export default Riding