import React, { useEffect, useMemo, useState } from "react";
import {
    GoogleMap,
    Marker,
    Polyline,
    useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "100%",
};

const defaultCenter = {
    lat: 17.385,
    lng: 78.4867,
};

const LiveTraking = ({ ride }) => {
    const { isLoaded, loadError } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    });

    const [currentLocation, setCurrentLocation] = useState(null);
    const [pickupLocation, setPickupLocation] = useState(null);
    const [destinationLocation, setDestinationLocation] = useState(null);
    const [routePath, setRoutePath] = useState([]);

    // Live Location
    useEffect(() => {
        if (!navigator.geolocation) return;

        const updateLocation = () => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCurrentLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (err) => {
                    console.error("Location Error:", err);
                },
                {
                    enableHighAccuracy: true,
                    maximumAge: 0,
                    timeout: 10000,
                }
            );
        };

        updateLocation();
        const intervalId = setInterval(updateLocation, 10000);

        return () => clearInterval(intervalId);
    }, []);

    // Geocode Pickup & Destination
    useEffect(() => {
        if (!isLoaded || !ride?.pickup || !ride?.destination) return;

        const geocoder = new window.google.maps.Geocoder();

        const geocode = (address) =>
            new Promise((resolve) => {
                geocoder.geocode({ address }, (results, status) => {
                    if (status === "OK" && results[0]) {
                        resolve(results[0].geometry.location.toJSON());
                    } else {
                        console.log(address, status);
                        resolve(null);
                    }
                });
            });

        (async () => {
            const pickup = await geocode(ride.pickup);
            const destination = await geocode(ride.destination);

            setPickupLocation(pickup);
            setDestinationLocation(destination);
        })();
    }, [isLoaded, ride]);

    // Draw Route
    useEffect(() => {
        if (!isLoaded || !currentLocation || !destinationLocation) return;

        const directionsService =
            new window.google.maps.DirectionsService();

        directionsService.route(
            {
                origin: currentLocation,
                destination: destinationLocation,
                travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                if (
                    status === "OK" &&
                    result.routes.length > 0
                ) {
                    setRoutePath(result.routes[0].overview_path);
                }
            }
        );
    }, [isLoaded, currentLocation, destinationLocation]);

    const center = useMemo(() => {
        return currentLocation || pickupLocation || defaultCenter;
    }, [currentLocation, pickupLocation]);

    if (loadError) {
        return (
            <div className="w-full h-full min-h-75 flex items-center justify-center bg-gray-100 px-4 text-center text-sm text-gray-700">
                Google Maps could not be loaded. Please verify your Google Maps API key.
            </div>
        );
    }

    if (!isLoaded) {
        return (
            <div className="w-full h-full min-h-75 flex items-center justify-center bg-gray-100 text-sm text-gray-700">
                Loading Map...
            </div>
        );
    }

    return (
        <div className="w-full h-full relative  ">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
                options={{
                    disableDefaultUI: false,
                    zoomControl: true,
                    streetViewControl: false,
                    fullscreenControl: false,
                    scrollwheel: true,
                    gestureHandling: "greedy",
                }}
            >
                {currentLocation && (
                    <Marker position={currentLocation} label="You" />
                )}

                {pickupLocation && <Marker position={pickupLocation} label="P" />}

                {destinationLocation && (
                    <Marker position={destinationLocation} label="D" />
                )}

                {routePath.length > 0 && (
                    <Polyline
                        path={routePath}
                        options={{
                            strokeColor: "#16a34a",
                            strokeWeight: 5,
                            strokeOpacity: 0.9,
                        }}
                    />
                )}
            </GoogleMap>
        </div>
    );
};

export default LiveTraking;