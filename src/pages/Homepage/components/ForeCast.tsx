import {
  Area,
  AreaChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { IForecast } from "../../../types/API_Forecast";

type ForeCastProps = {
  forecastData: IForecast;
};

const ForeCast = ({ forecastData }: ForeCastProps) => {
  const chartData = forecastData?.list
    .slice(0, 12)
    ?.map((singleDayForecast) => ({
      time: new Intl.DateTimeFormat(navigator.language, {
        dateStyle: "short",
        timeStyle: "short",
      }).format(new Date(singleDayForecast.dt * 1000)),
      Temparature: singleDayForecast.main.temp,
    }));

  return (
    <div className="w-full col-start-1 h-[15rem] col-end-5 md:row-start-3 md:row-end-4 lg:row-start-1 lg:col-start-2 lg:col-end-6 rounded-3xl">
      <h2 className="row-start-1 row-end-2 col-span-3 mb-2 text-xl capitalize text-gray-200">
        forecast of 12h
      </h2>
      <ResponsiveContainer height={"100%"} width={"100%"}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="Temparature" x1={1} y1={1} x2={0} y2={0}>
              <stop offset={"5%"} stopColor="gray" stopOpacity={0} />
              <stop offset={"95%"} stopColor="#00FFFF" stopOpacity={0.8} />
            </linearGradient>
          </defs>

          <Legend align="center" layout="horizontal" verticalAlign="top" />

          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload?.length) {
                return (
                  <div className="bg-gray-950/90 px-4 py-2 flex flex-col rounded-lg">
                    <div className="">
                      <span className="text-sm capitalize">temparature: </span>
                      <span className="text-sm font-semibold">
                        {payload[0]?.payload &&
                          payload[0]?.payload?.Temparature}
                        ℃
                      </span>
                    </div>
                    <div className="">
                      <span className="text-sm capitalize">date: </span>
                      <span className="text-sm font-semibold">
                        {payload[0].payload && payload[0]?.payload?.time}
                      </span>
                    </div>
                  </div>
                );
              }
            }}
          />

          <XAxis
            dataKey={"time"}
            angle={0}
            tickMargin={25}
            tickSize={2}
            fontSize={10}
            stroke="gray"
          />

          <YAxis stroke="whitesmoke" />

          <Area
            dot
            type={"monotone"}
            dataKey={"Temparature"}
            stroke="url(#Temparature)"
            fill="url(#Temparature)"
            fillOpacity={0.8}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ForeCast;
