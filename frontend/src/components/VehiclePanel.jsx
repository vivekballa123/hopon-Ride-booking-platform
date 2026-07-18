import React from 'react'

const VehiclePanel = (props) => {
    const {setConfirmedRidePanel,setSelectedVehicle,selectVehicle,fare,selectedVehicle,setVehiclePanel} = props
  return (
    <div>
      <h5 onClick={()=>{
                    setVehiclePanel(false)
                }} className=' w-[93%] p- text-center absolute top-0   '> <i className=" text-3xl text-gray-500 ri-arrow-down-wide-line"></i> </h5>
                <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>

                {/* UberGo */}
                <div

                    onClick={() => {
                        setSelectedVehicle('ubergo');  
                        setConfirmedRidePanel(true);
                         
                        selectVehicle('car')
                         
                    }}
                    className={`flex items-center rounded-2xl p-2 mb-2 justify-between cursor-pointer border-2 transition-all ${
                        selectedVehicle === 'ubergo'
                            ? 'border-black bg-gray-100'
                            : 'border-gray-200 bg-gray-100'
                    }`}
                >
                    <img
                        className='h-18'
                        src='https://tb-static.uber.com/prod/vehicles-importer/2022/tesla/model-3/high_res/50091_DFDEDD_3M.png'
                        alt=''
                    />

                    <div className='w-1/2'>
                        <h4 className='font-medium text-base'>
                            UberGo <span><i className="ri-user-fill"></i>4</span>
                        </h4>
                        <h5 className='font-medium text-sm'>2 mins away</h5>
                        <p className='font-light text-xs'>Affordable, compact rides</p>
                    </div>

                    <h2 className='text-lg font-semibold'>₹{fare?.car || 0}</h2>
                </div>

                {/* Moto */}
                <div
                    onClick={() =>{
                        setSelectedVehicle('moto')
                        selectVehicle('moto')
                        setConfirmedRidePanel(true);
                    }}
                    className={`flex items-center rounded-2xl p-2 mb-2 justify-between cursor-pointer border-2 transition-all ${
                        selectedVehicle === 'moto'
                            ? 'border-black bg-gray-100'
                            : 'border-gray-200'
                    }`}
                >
                    <img
                        className='h-17'
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkp8YufXKsHcZF7KznD31zy6C5nlYuRDB-qw&s'
                        alt=''
                    />
                    
                    <div className='w-1/2'>
                        <h4 className='font-medium text-base'>
                            Moto <span><i className="ri-user-fill"></i>1</span>
                        </h4>
                        <h5 className='font-medium text-sm'>3 mins away</h5>
                        <p className='font-light text-xs'>Affordable motorcycle ride</p>
                    </div>

                    <h2 className='text-lg font-semibold'>₹{fare?.moto || 0}</h2>
                </div>

                {/* UberAuto */}
                <div
                    onClick={() => {
                        setSelectedVehicle('auto')
                        setConfirmedRidePanel(true);
                        selectVehicle('auto')
                    }}
                    className={`flex items-center rounded-2xl p-2 mb-1 justify-between cursor-pointer border-2 transition-all ${
                        selectedVehicle === 'auto'
                            ? 'border-black bg-gray-100'
                            : 'border-gray-200'
                    }`}
                >
                    <img
                        className='h-13'
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMRyG_17bKVszyOE1vxUikjxMJ_PoUX4pxIQ&s'
                        alt=''
                    />

                    <div className='w-1/2'>
                        <h4 className='font-medium text-base'>
                            UberAuto <span><i className="ri-user-fill"></i>3</span>
                        </h4>
                        <h5 className='font-medium text-sm'>2 mins away</h5>
                        <p className='font-light text-xs'>Affordable Auto ride</p>
                    </div>

                    <h2 className='text-lg font-semibold'>₹{fare?.auto || 0}</h2>
                </div>
    </div>
  )
}

export default VehiclePanel
