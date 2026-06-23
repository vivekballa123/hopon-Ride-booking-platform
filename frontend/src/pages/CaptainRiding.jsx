import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const CaptainRiding = () => {
    const [finishRidePanel, setFinishRidePanel]=useState(false)
    const finishRidePanelRef = useRef(null)
    useGSAP(()=>{
        if(finishRidePanel){
            gsap.to(finishRidePanelRef.current,{
            transform:'translateY(0)'
        })
        }else{
            gsap.to(finishRidePanelRef.current,{
            transform:'translateY(100%)'
        })
        }
    },[finishRidePanel])
  return (
   <div className='h-screen'>
            
            <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
                <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                <Link to='/captain-home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>
            <div className='h-4/5'>
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
                
            </div>
            <div className='h-1/5 p-6 flex items-center justify-between relative gap-0.5 bg-yellow-400  '
            onClick={()=>{
                setFinishRidePanel(true)
            }}
            >
                <h5 onClick={() => {}} className=' w-[93%] p- text-center absolute top-0   '> <i className=" text-3xl text-black ri-arrow-up-wide-line"></i> </h5>
            
                <h4 className='text-xl font-semibold' >4 KM away</h4>
                <button className="bg-green-700 text-white font-semibold p-3 px-10 rounded-lg">Complete Ride</button>
            </div>

            <div ref={finishRidePanelRef} className='fixed z-10 bottom-0  translate-y-full  py-6 px-3 pt-12 bg-white w-full'>
                <FinishRide setFinishRidePanel={setFinishRidePanel}  />
            </div>
    </div>
  )
}

export default CaptainRiding
