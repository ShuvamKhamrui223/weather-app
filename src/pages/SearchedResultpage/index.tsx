import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import { ISearched } from "../../types/API_geocoding";
import SkeletonLoading from "../../components/ui/SkeletonLoading";
import { WeatherData } from "../../types/apiResponse";
import CurrentStat from "../Homepage/components/CurrentStat";
import WeatherHighlights from "../Homepage/components/WeatherHighlights";

const SearchedResultpage = () => {
  const searchparam = useSearchParams();
  const q = searchparam[0].get("q")?.toLowerCase();

  // query to get the lon and lat of searched location
  const {
    isLoading: searchLoading,
    error: searchError,
    data: searchedData,
  } = useQuery({
    queryKey: ["searchquery-to-coord", q],
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
    enabled: !!searchedCoords,
  });

  // weather forecast data of searched location from lat and lon
  // const {
  //   isLoading: searchedforecastLoading,
  //   error: searchedForecastError,
  //   data: seachedForecast,
  // } = useQuery({
  //   queryKey: ["searched-weather-forecast"],
  //   queryFn: async (): Promise<IForecast | undefined> => {
  //     const response = await fetch(
  //       `https://api.openweathermap.org/data/2.5/forecast?lat=${
  //         searchedCoords.lat ?? 0
  //       }&lon=${searchedCoords.lon ?? 0}&appid=${
  //         import.meta.env.VITE_OPEN_WEATHER_API_KEY
  //       }&units=metric`
  //     );
  //     return response.json();
  //   },
  //   enabled: !!searchedCoords,
  // });
  if (searchLoading || currentStatLoading) {
    return <SkeletonLoading />;
  }
  if (searchError || currentstatError) {
    return <p>{searchError?.message || currentstatError?.message}</p>;
  }
  if (currentWeather?.cod.toString() === "404") {
    return <p>no data found</p>;
  }
  if (currentWeather) {
    console.log(currentWeather);
  }

  if (currentWeather?.cod === 200)
    return (
      <section className="content-area min-h-screen grid  grid-cols-1 auto-rows-min lg:grid-rows-2 lg:grid-cols-5 xl:grid-cols-4 gap-4">
        {/* <h2>seach result: {searchparam[0].get("q")}</h2> */}
        <Suspense>
          <CurrentStat currentStat={currentWeather} />
        </Suspense>
        {/* todays highlights */}
        <Suspense>
          <WeatherHighlights highlights={currentWeather} />
        </Suspense>
      </section>
    );
};

export default SearchedResultpage;
