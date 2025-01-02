// type import
import { useLocation } from "react-router-dom";
import { WeatherData } from "../../../../types/apiResponse";
import Searchbar from "./Searchbar";
import { displayTimeWithOffset } from "../../../../utils/formaters";
type CurrentStatProps = {
  currentStat: WeatherData | undefined;
};

// time from timezone

const CurrentStat = ({ currentStat }: CurrentStatProps) => {
  const currentPage = useLocation();

  return (
    <div className="h-fit w-full rounded-3xl row-start-1 col-start-1 col-end-5 lg:col-end-3 lg:row-end-2 xl:col-end-2 bg-gray-800 card-padding flex flex-col ">
      {/* searchbar */}
      {currentPage.pathname === "/" && <Searchbar />}

      {/* location name,date, time */}
      <div className="flex flex-col my-4">
        <p className="capitalize text-xl text-gray-100">
          {currentStat?.name} - {currentStat?.sys.country}
        </p>

        <p className="capitalize text-sm text-gray-400/80">
          <strong className="font-bold uppercase ">
            {new Date().toLocaleDateString()}{" "}
            {currentStat?.timezone && displayTimeWithOffset(currentStat?.timezone)}
          </strong>
        </p>
      </div>

      {/* icon depending on the current weather */}
      <div className="flex items-center">
        <img
          src={`https://openweathermap.org/img/wn/${currentStat?.weather[0].icon}@4x.png`}
          alt=""
          loading="lazy"
          className="size-32 brightness-200"
        />
        {/* current location or searched location temperature */}
        <h2 className="text-5xl font-bold text-gray-100">
          {currentStat?.main?.temp}°<sup className="">c</sup>
        </h2>
      </div>

      {/* weather desc, high low, feels like */}
      <div className="">
        <p className="first-letter:uppercase text-lg">
          {currentStat?.weather[0].description}
        </p>

        <p className="">
          {currentStat?.main.temp_max}℃ / {currentStat?.main.temp_min}℃
        </p>

        <p className="">
          feels like: <span className="">{currentStat?.main.feels_like}℃</span>
        </p>
      </div>
    </div>
  );
};

export default CurrentStat;
