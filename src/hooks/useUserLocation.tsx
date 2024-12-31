import { useEffect, useState } from "react";

type coordinates = {
  longitude: number;
  latitude: number;
};
type TLocation = {
  coordinates: coordinates | null;
  isLoading: boolean;
  error: string | null;
};
const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState<TLocation | null>({
    coordinates: null,
    isLoading: true,
    error: null,
  });
  const getUserLocation = () => {
    setUserLocation(() => ({
      isLoading: true,
      error: null,
      coordinates: null,
    }));
    if (!navigator.geolocation) {
      setUserLocation(() => ({
        coordinates: null,
        error: "geolocation is not supported on your browser",
        isLoading: false,
      }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          coordinates: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          isLoading: false,
          error: null,
        });
      },
      (geoLocationError) => {
        setUserLocation({
          coordinates: null,
          error: geoLocationError.message,
          isLoading: false,
        });
      },
      {
        enableHighAccuracy: true,
        maximumAge:30000,timeout:3000
      }
    );
  };
  useEffect(() => {
    getUserLocation();
  }, []);
  return { ...userLocation, getUserLocation };
};

export default useUserLocation;
