// internalimports
import { useQuery } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { useSearchParams } from "react-router-dom";

// direct imports
import SkeletonLoading from "../../components/ui/SkeletonLoading";
import NotFound from "./components/NotFound";

// dynamic imports
const CurrentStat = lazy(() => import("../Homepage/components/CurrentStat"));
const WeatherHighlights = lazy(
  () => import("../Homepage/components/WeatherHighlights")
);
const ForeCast = lazy(() => import("../Homepage/components/ForeCast"));

// types
import { WeatherData } from "../../types/apiResponse";
import { ISearched } from "../../types/API_geocoding";
import { IForecast } from "../../types/API_Forecast";

const SearchedResultpage = () => {
  const searchparam = useSearchParams();
  const q = searchparam[0].get("q")?.toLowerCase();

  // query to get the lon and lat of searched location
  const { isLoading: searchLoading, data: searchedData } = useQuery({
    queryKey: ["searchquery-to-coord"],
    queryFn: async (): Promise<ISearched | undefined> => {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${q}&appid=${
          import.meta.env.VITE_OPEN_WEATHER_API_KEY
        }`
      );
      return response.json();
    },
  });

  const searchedCoords = { lat: searchedData?.lat, lon: searchedData?.lon };
  // current weather of searched location
  const {
    isLoading: currentStatLoading,
    error: currentstatError,
    data: currentWeather,
  } = useQuery({
    queryKey: ["current-weather-searched-location", q],
    queryFn: async (): Promise<WeatherData | undefined> => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${
          import.meta.env.VITE_OPEN_WEATHER_API_KEY
        }&units=metric`
      );
      return response.json();
    },
    enabled: !!q,
  });

  // weather forecast data of searched location from lat and lon
  const {
    isLoading: searchedforecastLoading,
    error: searchedForecastError,
    data: seachedForecast,
  } = useQuery({
    queryKey: ["searched-weather-forecast", searchedCoords, currentWeather],
    queryFn: async (): Promise<IForecast | undefined> => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${
          currentWeather?.coord.lat
        }&lon=${currentWeather?.coord.lon}&appid=${
          import.meta.env.VITE_OPEN_WEATHER_API_KEY
        }&units=metric`
      );
      return response.json();
    },
    enabled: !!currentWeather,
  });

  if (currentStatLoading || searchLoading || searchedforecastLoading) {
    return <SkeletonLoading />;
  }

  if (currentWeather?.cod.toString() === "404") {
    return <NotFound />;
  }

  if (currentWeather?.cod === 200)
    return (
      <section className="content-area md:min-h-screen grid  grid-cols-1 auto-rows-min lg:grid-rows-3 lg:grid-cols-5 xl:grid-cols-4 gap-4">
        <Suspense fallback={<SkeletonLoading />}>
          {currentstatError && <p>{currentstatError?.message} </p>}
          {currentWeather && <CurrentStat currentStat={currentWeather} />}
        </Suspense>
        {/* todays highlights */}
        <Suspense fallback={<SkeletonLoading />}>
          {currentstatError && <p>{currentstatError?.message} </p>}
          {currentWeather && <WeatherHighlights highlights={currentWeather} />}
        </Suspense>

        {/* forecast chart */}
        <Suspense fallback={<SkeletonLoading />}>
          {searchedForecastError && <p>{searchedForecastError?.message} </p>}
          {seachedForecast && <ForeCast forecastData={seachedForecast} />}
        </Suspense>
      </section>
    );
};

export default SearchedResultpage;
