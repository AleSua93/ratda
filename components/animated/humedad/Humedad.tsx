import Image from "next/image";
import humedad_f2_v2 from "../../../public/assets/humedad/humedad_f2_v2.png";
import humedad_f2_v3 from "../../../public/assets/humedad/humedad_f2_v3.png";
import humedad_f2_v4 from "../../../public/assets/humedad/humedad_f2_v4.png";
import { ApiWeatherData, ApiWeatherResult } from "../../../pages/api/weather";

const humidityStainImages = [
  { range: { min: -Infinity, max: 50 }, image: null },
  { range: { min: 50, max: 60 }, image: humedad_f2_v2 },
  { range: { min: 60, max: 75 }, image: humedad_f2_v3 },
  { range: { min: 75, max: Infinity }, image: humedad_f2_v4 },
];

export default function Humedad({
  humidityInfo,
}: {
  humidityInfo?: ApiWeatherData;
}) {
  const humidityValue = humidityInfo?.value ?? 50;

  const stainImage = humidityStainImages.find(
    (i) => i.range.min <= humidityValue && humidityValue < i.range.max
  )?.image;

  return (
    <>
      {/* Humedad */}
      {stainImage && (
        <Image
          src={stainImage}
          alt={stainImage.src}
          className="absolute z-[2] left-[330px] top-[-25px]"
          style={{
            filter:
              "drop-shadow(2px 0 0 gray) drop-shadow(0 2px 0 gray) drop-shadow(0 0 1px gray)",
          }}
        />
      )}
    </>
  );
}
