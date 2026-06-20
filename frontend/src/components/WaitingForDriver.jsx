import React from 'react'

const WaitingForDriver = (props) => {
  const {setWaitingForDriver}= props
  return (
    <div>
      <h5 onClick={() => {
        setWaitingForDriver(false)
      }} className=' w-[93%] p- text-center absolute top-0   '> <i className=" text-3xl text-gray-500 ri-arrow-down-wide-line"></i> </h5>
      <div className='flex items-center justify-between'>
        <img
          className='h-20 '
          src='https://tb-static.uber.com/prod/vehicles-importer/2022/tesla/model-3/high_res/50091_DFDEDD_3M.png'
          alt=''
        />
        <div className='text-right'>
          <h2 className='text-lg font-medium' >Vivek </h2>
          <h4 className='text-lg font-semibold -mt-1 -mb-1'>AP23 AL 5656</h4>
          <p className='text-sm text-gray-600'>Maruthi Suzuki Alto</p>
        </div>
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
      </div>
    </div>
  )
}

export default WaitingForDriver
