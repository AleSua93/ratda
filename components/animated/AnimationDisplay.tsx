import Humedad from "./humedad/Humedad";
import Temperatura from "./temperatura/Temperatura";
import Presion from "./presion/Presion";
import Viento from "./viento/Viento";
import { ApiWeatherResult } from "../../pages/api/weather";
import { useMobileMediaQuery } from "../../hooks/responsive";
import clsx from "clsx";

export default function AnimationDisplay({
  weatherData,
}: {
  weatherData?: ApiWeatherResult;
}) {
  const isMobile = useMobileMediaQuery();

  return (
    <>
      {/* <div className="w-[900px] h-[1200px] bg-red-300 self-center bg-cover bg-[url('/assets/presion/presion_f2_v4.png')]"></div> */}
      <div
        className={clsx(
          "relative self-center",
          isMobile
            ? "min-w-[400px] w-[400px] h-[240px] min-h-[240px]"
            : "min-w-[1000px] w-[1000px] h-[600px] min-h-[600px]"
          // : "min-h-[600px] min-w-[1000px] w-[1000px] h-[600px]"
        )}
      >
        <Presion pressureInfo={weatherData?.melodia} />
        <Temperatura temperatureInfo={weatherData?.bajo} />
        <Humedad humidityInfo={weatherData?.sosten} />
        <Viento windInfo={weatherData?.contramelodia} />
      </div>
    </>
  );
}
