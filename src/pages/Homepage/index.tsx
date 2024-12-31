// internalimports
import { useQuery } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import useUserLocation from "../../hooks/useUserLocation";

// essential components
import Alert from "../../components/ui/Alert";
import SkeletonLoading from "../../components/ui/SkeletonLoading";

// types
import { WeatherData } from "../../types/apiResponse";
import { IForecast } from "../../types/API_Forecast";

// dynamic imports
const CurrentStat = lazy(() => import("./components/CurrentStat"));
const WeatherHighlights = lazy(() => import("./components/WeatherHighlights"));
const ForeCast = lazy(() => import("./components/ForeCast"));

const Homepage = () => {
  const {
    coordinates,
    error: locationError,
    isLoading: locationLoading,
  } = useUserLocation();

  // current wether of current location
  const {
    isLoading,
    error,
    data: weatherData,
  } = useQuery({
    queryKey: ["userLocationData"],
    queryFn: async (): Promise<WeatherData | undefined> => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${
          coordinates?.latitude
        }&lon=${coordinates?.longitude}&appid=${
          import.meta.env.VITE_OPEN_WEATHER_API_KEY
        }&units=metric`
      );
      return response.json();
    },
    enabled: !!coordinates,
  });

  // forecast api for last 24 hours data
  const {
    isLoading: historicalDataLoading,
    error: historicalError,
    data: historicalData,
  } = useQuery({
    queryKey: ["historicalWeather"],
    queryFn: async (): Promise<IForecast | undefined> => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${
          coordinates?.latitude
        }&lon=${coordinates?.longitude}&appid=${
          import.meta.env.VITE_OPEN_WEATHER_API_KEY
        }&units=metric`
      );
      return response.json();
    },
    enabled: !!coordinates,
  });

  if (locationError) {
    return <Alert alertMessage={locationError} />;
  }

  if (locationLoading || isLoading) {
    return <SkeletonLoading />;
  }

  if (error) {
    return <Alert alertMessage={error.message} />;
  }

  return (
    <section className="lg:content-area min-h-screen grid  grid-cols-2 auto-rows-min lg:grid-rows-2 lg:grid-cols-5 xl:grid-cols-4 gap-4">
      <Suspense>
        <CurrentStat currentStat={weatherData} />
      </Suspense>
      {/* todays highlights */}
      <Suspense>
        <WeatherHighlights highlights={weatherData} />
      </Suspense>
      <Suspense>
        {historicalDataLoading && "loading historical data"}
        {historicalError && <Alert alertMessage={historicalError.message} />}
        {historicalData && <ForeCast forecastData={historicalData} />}
      </Suspense>
    </section>
  );
};

export default Homepage;
