import Image from "next/image";
import humedad_f1_v2 from "../../../public/assets/humedad/humedad_f1_v2_loopable.gif";
import humedad_f1_v1 from "../../../public/assets/humedad/humedad_f1_v1.png";
import viento_f1_v1 from "../../../public/assets/viento/viento_f1_v1.png";
import { ApiWeatherData } from "../../../pages/api/weather";

const lightbulbImages = [
  {
    range: { min: -Infinity, max: 4.8 },
    image: humedad_f1_v1,
    className: "left-[65%] top-[53%] scale-[150%]",
  },
  {
    range: { min: 4.8, max: Infinity },
    image: humedad_f1_v2,
    className: "left-[45%] top-[44%]",
  },
];

export default function Viento({ windInfo }: { windInfo?: ApiWeatherData }) {
  const windValue = windInfo?.value ?? 4;

  const lightbulb = lightbulbImages.find(
    (i) => i.range.min <= windValue && windValue < i.range.max
  );

  return (
    <>
      {/* Foquito */}
      <Image
        src={lightbulb?.image!}
        alt={lightbulb?.image.src!}
        className={`absolute z-[2] max-h-full transform -translate-x-1/2 -translate-y-1/2 ${lightbulb?.className}`}
        style={{
          filter:
            "drop-shadow(2px 0 0 gray) drop-shadow(0 2px 0 gray) drop-shadow(0 0 1px gray)",
        }}
      />
      {/* Arbol */}
      <Image
        src={viento_f1_v1}
        alt="viento_f1_v1"
        className="absolute z-[4] max-h-full top-[48%] left-[50.5%] transform -translate-x-1/2 -translate-y-1/2"
      />
      {/* ni idea que es esto */}
      {/* <Image
        src={viento_f2_v3}
        alt="viento_f2_v3"
        className="absolute z-[4] top-[-110px] left-[10px]"
      /> */}
    </>
  );
}
