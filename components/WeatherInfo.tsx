import { ApiWeatherData, WeatherParameter } from "../pages/api/weather";
import HumidityIcon from "./icons/HumidityIcon";
import PressureIcon from "./icons/PressureIcon";
import TemperatureIcon from "./icons/TemperatureIcon";
import WindSpeedIcon from "./icons/WindSpeedIcon";

interface Props {
  data: ApiWeatherData;
}

function getWeatherIcon(parameter: WeatherParameter) {
  switch (parameter) {
    case "wind-speed":
      return WindSpeedIcon;
    case "humidity":
      return HumidityIcon;
    case "pressure":
      return PressureIcon;
    case "temperature":
    default:
      return TemperatureIcon;
  }
}

export default function WeatherInfo({ data }: Props) {
  const Icon = getWeatherIcon(data.parameter);

  return (
    <div className="flex flex-row text-zinc-600 font-bold text-2xl justify-center items-center">
      <Icon className="h-6 w-6 mr-2" />
      <span>{data.value}</span> <span>{data.unit}</span>
    </div>
  );
}
