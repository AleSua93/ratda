import Humedad from "./humedad/Humedad";
import Temperatura from "./temperatura/Temperatura";
import Presion from "./presion/Presion";
import Viento from "./viento/Viento";
import { ApiWeatherData, ApiWeatherResult } from "../../pages/api/weather";

export default function AnimationDisplay({
  weatherData,
}: {
  weatherData?: ApiWeatherResult;
}) {
  console.log(weatherData);

  return (
    <div className="relative overflow-clip w-full h-full">
      {/* <Presion pressureInfo={weatherData?.melodia} /> */}
      <Temperatura temperatureInfo={weatherData?.bajo} />
      {/* <Humedad humidityInfo={weatherData?.sosten} />
      <Viento windInfo={weatherData?.contramelodia} /> */}
    </div>
  );
}
