import Humedad from "./humedad/Humedad";
import Temperatura from "./temperatura/Temperatura";
import Presion from "./presion/Presion";
import Viento from "./viento/Viento";
import { ApiWeatherResult } from "../../pages/api/weather";

export default function AnimationDisplay({
  weatherData,
}: {
  weatherData?: ApiWeatherResult;
}) {
  return (
    <>
      <div className="relative flex self-center overflow-clip w-full max-w-[900px] max-h-[900px] h-full">
        <Presion pressureInfo={weatherData?.melodia} />
        <Temperatura temperatureInfo={weatherData?.bajo} />
        <Humedad humidityInfo={weatherData?.sosten} />
        <Viento windInfo={weatherData?.contramelodia} />
      </div>
    </>
  );
}
