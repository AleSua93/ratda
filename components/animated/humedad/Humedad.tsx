import Image from "next/image";
import humedad_f1_v2 from "../../../public/assets/humedad/humedad_f1_v2_loopable.gif";
import humedad_f1_v1 from "../../../public/assets/humedad/humedad_f1_v1.png";
import humedad_f2_v2 from "../../../public/assets/humedad/humedad_f2_v2.png";
import humedad_f2_v3 from "../../../public/assets/humedad/humedad_f2_v3.png";
import humedad_f2_v4 from "../../../public/assets/humedad/humedad_f2_v4.png";
import { ApiWeatherData, ApiWeatherResult } from "../../../pages/api/weather";

export default function Humedad({
  humidityInfo,
}: {
  humidityInfo?: ApiWeatherData;
}) {
  return (
    <>
      {/* Foquito */}
      <Image
        src={humedad_f1_v2}
        alt="humedad_f1_v2"
        className="absolute z-[1]"
        style={{
          filter:
            "drop-shadow(2px 0 0 gray) drop-shadow(0 2px 0 gray) drop-shadow(0 0 1px gray)",
        }}
      />
      {/* Humedad */}
      {/* <Image
        src={humedad_f2_v2}
        alt="humedad"
        className="absolute z-[2] left-[330px] top-[-45px]"
        style={{
          filter:
            "drop-shadow(2px 0 0 gray) drop-shadow(0 2px 0 gray) drop-shadow(0 0 1px gray)",
        }}
      /> */}
      {/* <Image
        src={humedad_f2_v3}
        alt="humedad"
        className="absolute z-[2] left-[330px] top-[-45px]"
        style={{
          filter:
            "drop-shadow(2px 0 0 gray) drop-shadow(0 2px 0 gray) drop-shadow(0 0 1px gray)",
        }}
      /> */}
      <Image
        src={humedad_f2_v4}
        alt="humedad"
        className="absolute z-[2] left-[330px] top-[-45px]"
        style={{
          filter:
            "drop-shadow(2px 0 0 gray) drop-shadow(0 2px 0 gray) drop-shadow(0 0 1px gray)",
        }}
      />
    </>
  );
}
