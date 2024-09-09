import Image from "next/image";
import humedad_f1_v2 from "../../../public/assets/humedad/humedad_f1_v2_loopable.gif";
import humedad_f1_v1 from "../../../public/assets/humedad/humedad_f1_v1.png";
import viento_f1_v1 from "../../../public/assets/viento/viento_f1_v1.png";
import viento_f2_v3 from "../../../public/assets/viento/viento_f2_v3.gif";
import { ApiWeatherData } from "../../../pages/api/weather";

export default function Viento({ windInfo }: { windInfo?: ApiWeatherData }) {
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
      <Image
        src={viento_f1_v1}
        alt="viento_f1_v1"
        className="absolute z-[4] top-[-110px] left-[10px]"
      />
      {/* todo make loopable */}
      {/* <Image
        src={viento_f2_v3}
        alt="viento_f2_v3"
        className="absolute z-[4] top-[-110px] left-[10px]"
      /> */}
    </>
  );
}
