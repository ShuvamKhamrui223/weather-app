// icon imports
import { BiCalendar } from "react-icons/bi";
import { FaLocationPin } from "react-icons/fa6";

// type import
import { WeatherData } from "../../../../types/apiResponse";
import Searchbar from "./Searchbar";

type CurrentStatProps = {
  currentStat: WeatherData | undefined;
};
const CurrentStat = ({ currentStat }: CurrentStatProps) => {
  return (
    <div className="h-fit md:h-full rounded-3xl row-start-1 col-start-1 col-end-5 lg:col-end-2 lg:row-end-2 glass px-4 flex flex-col ">
      {/* searchbar */}
      <Searchbar />

      {/* icon depending on the current weather */}
      <img
        src={`https://openweathermap.org/img/wn/${currentStat?.weather[0].icon}@4x.png`}
        alt=""
        loading="lazy"
        className="size-20 invert"
      />
      {/* current location or searched location temperature */}
      <h2 className="text-5xl font-bold text-gray-100">
        {currentStat?.main?.temp}°<sup className="">c</sup>
      </h2>
      <div className="flex items-center">
        <img
          src={`https://openweathermap.org/img/wn/${currentStat?.weather[0].icon}@4x.png`}
          alt=""
          loading="lazy"
          className="size-10 invert"
        />{" "}
        <span className="first-letter:uppercase text-sm">
          {currentStat?.weather[0].description}
        </span>
      </div>
      <div className="w-full h-[0.01rem] my-1 bg-gray-200/20"></div>
      {/* location name,date, time */}
      <div className="flex flex-col gap-1">
        <div className="flex gap-1 items-center">
          <FaLocationPin />
          <p className="capitalize text-sm">{currentStat?.name}</p>
        </div>
        <div className="flex gap-1 items-center">
          <BiCalendar />
          <p className="capitalize text-sm">
            {new Intl.DateTimeFormat(navigator.language, {
              dateStyle: "medium",
            }).format(new Date().getTime())}
            <strong className="font-bold uppercase ">
              {" "}
              {new Intl.DateTimeFormat(navigator.language, {
                timeStyle: "short",
              }).format(new Date().getTime())}
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrentStat;
