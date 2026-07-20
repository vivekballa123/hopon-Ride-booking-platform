import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { MapPin, Navigation } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel.jsx';
import VehiclePanel from '../components/VehiclePanel.jsx';
import ConfirmedRide from '../components/ConfirmedRide.jsx';
import LookingForDriver from '../components/LookingForDriver.jsx';
import WaitingForDriver from '../components/WaitingForDriver.jsx';
import { useNavigate } from 'react-router-dom'
import { SocketDataContext } from '../context/SocketContext.jsx';
import { UserDataContext } from '../context/UserContext.jsx';
import LiveTraking from '../components/LiveTraking.jsx';


const Home = () => {
    const navigate = useNavigate();

    const [pickup, setPickup] = useState("")
    const [destination, setDestination] = useState('')
    const [panelOpen, setPanelOpen] = useState(false)
    const [selectedVehicle, setSelectedVehicle] = useState('ubergo');
    const [activeField, setActiveField] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
    const [suggestionError, setSuggestionError] = useState('');
    const panelRef = useRef(null)
    const vehiclePanelRef = useRef(null)
    const confirmedRidePanelRef = useRef(null)
    const vehicleFoundRef = useRef(null)
    const waitingForDriverRef = useRef(null)


    const panelCloseRef = useRef(null)
    const [vehiclePanel, setVehiclePanel] = useState(false)
    const [confirmedRidePanel, setConfirmedRidePanel] = useState(false)
    const [vehicleFound, setVehicleFound] = useState(false)
    const [waitingForDriver, setWaitingForDriver] = useState(false)
    const [fare, setFare] = useState(null);
    const [vehicleType, setVehicleType] = useState(null);
    const [ride, setRide] = useState(null)

    const submitHandler = (e) => {
        e.preventDefault()
    }

    const canFindTrip = pickup.trim() && destination.trim();

    const { sendMessage, isConnected } = useContext(SocketDataContext);
    const { receiveMessage } = useContext(SocketDataContext);

    const user = useContext(UserDataContext);


    useEffect(() => {
        if (!isConnected || !user.user?._id) return;



        sendMessage("join", {

            userType: "user",
            userId: user.user?._id,
        });

    }, [user, isConnected, sendMessage]);

    useEffect(() => {
        const cleanup = receiveMessage("ride-confirmed", (ride) => {
            console.log("Ride confirmed:", ride);

            setVehiclePanel(false);
            setConfirmedRidePanel(false);
            setVehicleFound(false);
            setWaitingForDriver(true);
            setRide(ride)
        });

        return cleanup;
    }, [receiveMessage]);

    useEffect(() => {
        const cleanup = receiveMessage("ride-started", (ride) => {
            console.log("Ride started:", ride);

            setRide(ride);

            // Hide waiting panel
            setWaitingForDriver(false);

            // Navigate to riding page if needed
            navigate("/riding", {
                state: {
                    ride
                }
            });
        });

        return cleanup;
    }, [receiveMessage, navigate]);

    const handleLogout = async () => {
        try {
            await axios.get(
                `${import.meta.env.VITE_BASE_URL}/users/logout`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
        } catch (err) {
            console.log(err);
        }

        localStorage.removeItem("token");
        navigate("/user-login");
    };

    const handleFindTrip = async () => {
        if (!canFindTrip) return;

        setVehiclePanel(true);
        setPanelOpen(false);
        setActiveField(null);
        setSuggestions([]);
        setSuggestionError('');
        pushPanelHistoryState('vehicle');

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
            params: { pickup, destination },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log(response.data);
        setFare(response.data);
    };

    const createRide = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/rides/create`,
                {
                    pickup,
                    destination,
                    vehicleType
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            console.log(response.data);
        } catch (error) {
            console.log(JSON.stringify(error.response?.data, null, 2));
        }
    };

    const closeLocationPanel = () => {
        setPanelOpen(false);
        setActiveField(null);
        setSuggestions([]);
        setSuggestionError('');
    };

    const pushPanelHistoryState = (screen) => {
        if (typeof window !== 'undefined') {
            window.history.pushState({ screen }, '', window.location.href);
        }
    };

    const handleFieldFocus = (field) => {
        setActiveField(field);
        setPanelOpen(true);
        pushPanelHistoryState('location');
    };

    const handleLocationInputChange = (value, field) => {
        if (field === 'pickup') {
            setPickup(value);
        } else {
            setDestination(value);
        }
        setActiveField(field);
        setPanelOpen(true);
        if (!panelOpen) {
            pushPanelHistoryState('location');
        }
    };

    const handleSuggestionSelect = (suggestion, field) => {
        const suggestionText = suggestion.description || suggestion.structured_formatting?.main_text || '';

        if (field === 'pickup') {
            setPickup(suggestionText);
        } else {
            setDestination(suggestionText);
        }

        setSuggestions([]);
        setSuggestionError('');
        setPanelOpen(true);
        setActiveField(field);
    };

    const closeAllOverlayPanels = () => {
        if (waitingForDriver) {
            setWaitingForDriver(false);
            return true;
        }

        if (confirmedRidePanel) {
            setConfirmedRidePanel(false);
            return true;
        }

        if (vehiclePanel) {
            setVehiclePanel(false);
            return true;
        }

        if (panelOpen) {
            closeLocationPanel();
            return true;
        }

        return false;
    };

    useEffect(() => {
        if (!activeField) {
            setSuggestions([]);
            setSuggestionError('');
            setPanelOpen(false);
            return;
        }

        const query = activeField === 'pickup' ? pickup : destination;

        if (!query || query.trim().length < 2) {
            setSuggestions([]);
            setSuggestionError('');
            setPanelOpen(true);
            return;
        }

        const timeoutId = window.setTimeout(async () => {
            setPanelOpen(true);
            setIsLoadingSuggestions(true);
            setSuggestionError('');

            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                    params: { input: query },
                    headers: token ? { Authorization: `Bearer ${token}` } : {}
                });

                setSuggestions(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
                setSuggestions([]);
                setSuggestionError('Unable to load suggestions right now.');
            } finally {
                setIsLoadingSuggestions(false);
            }
        }, 300);

        return () => window.clearTimeout(timeoutId);
    }, [activeField, pickup, destination]);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handlePopState = () => {
            if (closeAllOverlayPanels()) {
                window.history.pushState({ screen: 'home' }, '', window.location.href);
            }
        };

        window.history.replaceState({ screen: 'home' }, '', window.location.href);
        window.addEventListener('popstate', handlePopState);

        return () => window.removeEventListener('popstate', handlePopState);
    }, [panelOpen, vehiclePanel, confirmedRidePanel, waitingForDriver]);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        if (confirmedRidePanel) {
            pushPanelHistoryState('confirmed');
        }
    }, [confirmedRidePanel]);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        if (waitingForDriver) {
            pushPanelHistoryState('waiting');
        }
    }, [waitingForDriver]);

    useGSAP(() => {
        if (panelOpen) {
            gsap.to(panelRef.current, {
                height: '70%',
                opacity: 1,
                padding: 24
            });
            gsap.to(panelCloseRef.current, {
                opacity: 1
            })
        } else {
            gsap.to(panelRef.current, {
                height: '0%',
                opacity: 0,
                padding: 0
            });
            gsap.to(panelCloseRef.current, {
                opacity: 0
            })
        }
    }, [panelOpen]);

    useGSAP(() => {
        if (vehiclePanel) {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [vehiclePanel])

    useGSAP(() => {
        if (vehicleFound) {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [vehicleFound])

    useGSAP(() => {
        if (confirmedRidePanel) {
            gsap.to(confirmedRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmedRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [confirmedRidePanel])

    useGSAP(() => {
        if (waitingForDriver) {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [waitingForDriver])

    return (
        <div className='relative h-screen'>
            <img
                className="w-18 absolute top-5 left-8 "
                src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
                alt=""
            />
            {!panelOpen &&
                !vehiclePanel &&
                !confirmedRidePanel &&
                !vehicleFound &&
                !waitingForDriver && (
                    <button
                        onClick={handleLogout}
                        className="absolute top-5 right-5 z-50 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition"
                    >
                        <i className="ri-logout-box-r-line text-2xl"></i>
                    </button>
                )}
            <LiveTraking ride={ride} />

            <div className='h-screen flex flex-col justify-end top-0 absolute w-full  '>                <div className='h-[30%] p-5 relative bg-white'>
                <h5 ref={panelCloseRef} onClick={() => {
                    setPanelOpen(false)
                }} className='absolute opacity-0 right-50 top-6 text-2xl'>
                    <i className="ri-arrow-down-wide-line"></i>
                </h5>
                <h4 className='text-2xl font-semibold '>Get a ride</h4>
                <form onSubmit={(e) => {
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
                            onFocus={() => handleFieldFocus('pickup')}
                            onDoubleClick={(e) => e.currentTarget.select()}
                            value={pickup}
                            onChange={(e) => handleLocationInputChange(e.target.value, 'pickup')}
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
                            onFocus={() => handleFieldFocus('destination')}
                            onDoubleClick={(e) => e.currentTarget.select()}
                            value={destination}
                            onChange={(e) => handleLocationInputChange(e.target.value, 'destination')}
                            className=" mb-3 bg-[#e6e4e4] pl-12 py-2 text-base rounded-lg w-full"
                            type="text"
                            placeholder="Enter your destination"
                        />
                    </div>

                </form>
                <button
                    type="button"
                    onClick={handleFindTrip}
                    disabled={!canFindTrip}
                    className={`w-full mb-2 py-3 rounded-lg font-semibold mt-4 transition ${canFindTrip
                        ? 'bg-black text-white hover:bg-blue-600'
                        : 'bg-gray-400 text-gray-100 cursor-not-allowed'
                        }`}
                >
                    Find Trip
                </button>
            </div>
                <div ref={panelRef}
                    className='h-0 opacity-0 bg-white overflow-hidden  '>
                    <LocationSearchPanel
                        activeField={activeField}
                        suggestions={suggestions}
                        isLoading={isLoadingSuggestions}
                        error={suggestionError}
                        onSuggestionSelect={handleSuggestionSelect}
                        setPanelOpen={setPanelOpen}
                    />
                </div>
            </div>
            <div ref={vehiclePanelRef} className='fixed z-10 bottom-2    py-8 px-3 bg-white w-full'>
                <VehiclePanel

                    setConfirmedRidePanel={setConfirmedRidePanel}
                    setSelectedVehicle={setSelectedVehicle}
                    selectedVehicle={selectedVehicle}
                    setVehiclePanel={setVehiclePanel}
                    fare={fare}
                    selectVehicle={setVehicleType}
                />

            </div>
            <div ref={confirmedRidePanelRef} className='fixed z-10 bottom-0    py-6 px-3 pt-12 bg-white w-full'>
                <ConfirmedRide
                    pickup={pickup}
                    destination={destination}
                    fare={fare?.[vehicleType] || 0}
                    vehicleType={vehicleType}
                    createRide={createRide}
                    setVehicleFound={setVehicleFound}
                    setConfirmedRidePanel={setConfirmedRidePanel}
                />
            </div>
            <div ref={vehicleFoundRef} className='fixed z-10 bottom-0     py-6 px-3 pt-12 bg-white w-full'>
                <LookingForDriver
                    pickup={pickup}
                    destination={destination}
                    fare={fare?.[vehicleType] || 0}
                    vehicleType={vehicleType}
                    createRide={createRide}
                    setVehicleFound={setVehicleFound}
                    setConfirmedRidePanel={setConfirmedRidePanel}
                />
            </div>
            <div ref={waitingForDriverRef} className='fixed z-10 bottom-0  translate-y-full  py-6 px-3 pt-12 bg-white w-full'>
                <WaitingForDriver
                    ride={ride}
                    vehicleType={vehicleType}
                    setVehicleFound={setVehicleFound}
                    waitingForDriver={waitingForDriver}
                    setWaitingForDriver={setWaitingForDriver} />
            </div>
        </div>
    )
}

export default Home
