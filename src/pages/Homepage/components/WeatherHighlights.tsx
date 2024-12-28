import { BsSunriseFill, BsSunsetFill } from "react-icons/bs";
import { WeatherData } from "../../../types/apiResponse";

type WeatherHighlightsTypes = {
  highlights: WeatherData | undefined;
};
const WeatherHighlights = ({ highlights }: WeatherHighlightsTypes) => {
  // console.log(highlights);
  return (
    <div className="md:col-start-1 md:col-end-5 md:row-start-2 md:row-end-3 lg:row-start-2 lg:row-end-3 lg:col-start-1 lg:col-end-6 col-end-2 glass rounded-3xl p-6">
      <h3 className="row-start-1 row-end-2 col-span-3 mb-2 text-xl capitalize text-gray-200 ">
        today's highlights
      </h3>

      {/* stat cards */}
      <div className="md:grid grid-cols-3 grid-rows-2 gap-4 content-center">
        {/* wind status */}
        <div className="px-4 py-4 bg-gray-800 border border-gray-100/20 rounded-xl">
          <h4 className="text-base capitalize">wind status</h4>
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold">
              {new Intl.NumberFormat(navigator.language, {
                style: "unit",
                unit: "kilometer-per-hour",
                unitDisplay: "short",
              }).format(highlights?.wind?.speed ?? 0)}
            </h2>
          </div>
        </div>

        {/* uv index */}
        <div className="px-4 py-2 bg-gray-800 border border-gray-100/20 rounded-xl">
          <h4 className="text-base capitalize">clouds</h4>
          <div className="">
            <h2 className="text-3xl font-bold">{highlights?.clouds.all}</h2>
          </div>
        </div>

        {/* sunrise sunset */}
        <div className="px-4 py-2 bg-gray-800 border border-gray-100/20 rounded-xl">
          <h4 className="text-base capitalize">sunrise and sunset</h4>
          <div className="flex gap-6 items-center">
            <div className="flex items-center gap-2">
              <BsSunriseFill className="text-2xl" />
              <h2 className="text-3xl font-bold">
                {highlights?.sys.sunrise &&
                  new Intl.DateTimeFormat(navigator.language, {
                    hour: "2-digit",
                  }).format(new Date(highlights?.sys?.sunrise * 1000))}
              </h2>
            </div>
            <div className="flex items-center gap-2">

            <BsSunsetFill className="text-2xl" />
            <h2 className="text-3xl font-bold">
              {highlights?.sys.sunset &&
                new Intl.DateTimeFormat(navigator.language, {
                  hour: "2-digit",
                }).format(new Date(highlights?.sys?.sunset * 1000))}
            </h2>
            </div>
          </div>
        </div>

        {/* humidity */}
        <div className="py-2 px-4 bg-gray-800 border border-gray-100/20 rounded-xl">
          <h4 className="text-base capitalize">humdity</h4>
          <div className="">
            <h2 className="text-3xl font-bold">{highlights?.main.humidity}%</h2>
          </div>
        </div>

        {/* visibility */}
        <div className="py-2 px-4 bg-gray-800 border border-gray-100/20 rounded-xl">
          <h4 className="text-base capitalize">visibility</h4>
          <div className="">
            <h2 className="text-3xl font-bold">
              {new Intl.NumberFormat(navigator.language, {
                style: "unit",
                unit: "kilometer",
                unitDisplay: "short",
              }).format(highlights?.visibility ?? 0)}
            </h2>
          </div>
        </div>

        {/* feels like */}
        <div className="py-2 px-4 bg-gray-800 border border-gray-100/20 rounded-xl">
          <h4 className="text-base capitalize">feels like</h4>
          <div className="flex items-center">
            <h2 className="text-3xl font-bold">
              {highlights?.main.feels_like}℃
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherHighlights;
