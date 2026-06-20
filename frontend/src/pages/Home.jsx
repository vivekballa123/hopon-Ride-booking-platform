import React, { useRef, useState } from 'react'
import { MapPin, Navigation } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel.jsx';
import VehiclePanel from '../components/VehiclePanel.jsx';
import ConfirmedRide from '../components/ConfirmedRide.jsx';
import LookingForDriver from '../components/LookingForDriver.jsx';
import WaitingForDriver from '../components/WaitingForDriver.jsx';

const Home = () => {

    const [pickup,setPickup]=useState("")
    const [destination,setDestination] = useState('')
    const [panelOpen,setPanelOpen] = useState(false)
    const [selectedVehicle, setSelectedVehicle] = useState('ubergo');
    const panelRef = useRef(null)
    const vehiclePanelRef = useRef(null)
    const confirmedRidePanelRef = useRef(null)
    const vehicleFoundRef = useRef(null)
    const waitingForDriverRef = useRef(null)


    const panelCloseRef = useRef(null)
    const [vehiclePanel,setVehiclePanel] = useState(false)
    const [confirmedRidePanel,setConfirmedRidePanel] = useState(false)
    const [vehicleFound,setVehicleFound] = useState(false)
    const [waitingForDriver ,setWaitingForDriver] = useState(false)


    const submitHandler = (e)=>{
        e.preventDefault()
    }
    useGSAP(() => {
        if (panelOpen) {
            gsap.to(panelRef.current, {
                height: '70%',
                opacity:1,
                padding:24
            });
            gsap.to(panelCloseRef.current,{
                opacity:1
            })
        } else {
            gsap.to(panelRef.current, {
                height: '0%',
                opacity:0,
                padding:0
            });
            gsap.to(panelCloseRef.current,{
                opacity:0
            })
        }
    }, [panelOpen]);

    useGSAP(()=>{
        if(vehiclePanel){
            gsap.to(vehiclePanelRef.current,{
            transform:'translateY(0)'
        })
        }else{
            gsap.to(vehiclePanelRef.current,{
            transform:'translateY(100%)'
        })
        }
    },[vehiclePanel])

    useGSAP(()=>{
        if(vehicleFound){
            gsap.to(vehicleFoundRef.current,{
            transform:'translateY(0)'
        })
        }else{
            gsap.to(vehicleFoundRef.current,{
            transform:'translateY(100%)'
        })
        }
    },[vehicleFound])

    useGSAP(()=>{
        if(confirmedRidePanel){
            gsap.to(confirmedRidePanelRef.current,{
            transform:'translateY(0)'
        })
        }else{
            gsap.to(confirmedRidePanelRef.current,{
            transform:'translateY(100%)'
        })
        }
    },[confirmedRidePanel])

    useGSAP(()=>{
        if(waitingForDriver){
            gsap.to(waitingForDriverRef.current,{
            transform:'translateY(0)'
        })
        }else{
            gsap.to(waitingForDriverRef.current,{
            transform:'translateY(100%)'
        })
        }
    },[waitingForDriver])
    return (
        <div className='h-screen relative overflow-hidden '>
            <img className='w-18 absolute top-5 ml-8' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
            <div>
                {/* temp img */}
                <img
                    src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
                    alt="Background"
                    className="w-full h-screen object-cover"
                />
            </div>
            <div className='h-screen  flex flex-col justify-end  top-0 absolute   w-full '>
                <div className='h-[30%] p-5 relative bg-white'>
                    <h5 ref={panelCloseRef} onClick={()=>{
                        setPanelOpen(false)
                    }} className=' absolute opacity-0 top-6 right-6 text-2xl '>
                        <i className=" hover:cursor-pointer ri-arrow-down-wide-line"></i>
                    </h5>
                    <h4 className='text-2xl font-semibold '>Get a ride</h4>
                <form onSubmit={(e)=>{
                    submitHandler(e)
                    }} className="relative">

                        {/* Vertical line connecting icons */}
                        <div className="absolute left-[22px] top-[28px] h-[35px] w-[4px] bg-gray-800 rounded-full z-10"></div>

                        <div className="relative mt-5">
                            <MapPin
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-black  "
                            />

                            <input
                                onClick={()=>{
                                    setPanelOpen(true)
                                }}
                                value={pickup}
                                onChange={(e)=>{
                                    setPickup(e.target.value)
                                }}
                                className="bg-[#e6e4e4] pl-12 py-2 text-base rounded-lg w-full"
                                type="text"
                                placeholder="Add a pick-up location"
                            />
                        </div>

                        <div className="relative mt-3">
                            <Navigation
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-black  "
                            />

                            <input
                                onClick={()=>{
                                    setPanelOpen(true)
                                }}
                                value={destination}
                                onChange={(e)=>{
                                    setDestination(e.target.value)
                                }}
                                className="bg-[#e6e4e4] pl-12 py-2 text-base rounded-lg w-full"
                                type="text"
                                placeholder="Enter your destination"
                            />
                        </div>

                    </form>
                </div>
                <div ref={panelRef} 
                    className='h-0 opacity-0 bg-white overflow-hidden  '>
                        <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanel = {setVehiclePanel}/>
                </div>
            </div>
            <div ref={vehiclePanelRef} className='fixed z-10 bottom-2    py-8 px-3 bg-white w-full'>
                <VehiclePanel 
                setConfirmedRidePanel={setConfirmedRidePanel} 
                setSelectedVehicle = {setSelectedVehicle} 
                selectedVehicle={selectedVehicle}
                setVehiclePanel = {setVehiclePanel} />
            </div>
            <div ref={confirmedRidePanelRef} className='fixed z-10 bottom-0    py-6 px-3 pt-12 bg-white w-full'>
                <ConfirmedRide  setVehicleFound={setVehicleFound} setConfirmedRidePanel={setConfirmedRidePanel} />
            </div>
            <div ref={vehicleFoundRef}  className='fixed z-10 bottom-0     py-6 px-3 pt-12 bg-white w-full'>
                <LookingForDriver setVehicleFound = {setVehicleFound} />
            </div>
            <div ref={waitingForDriverRef} className='fixed z-10 bttom-0  translate-y-full  py-6 px-3 pt-12 bg-white w-full'>
                <WaitingForDriver waitingForDriver={waitingForDriver} setWaitingForDriver ={setWaitingForDriver} />
            </div>
        </div>
    )
}

export default Home
