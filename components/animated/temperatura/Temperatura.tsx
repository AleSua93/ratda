import Image from "next/image";
import temperatura_f1_v1 from "../../../public/assets/temperatura/temperatura_f1_v1.png";
import temperatura_f1_v2 from "../../../public/assets/temperatura/temperatura_f1_v2.png";
import temperatura_f2_v1 from "../../../public/assets/temperatura/temperatura_f2_v1.gif";
import temperatura_f2_v2 from "../../../public/assets/temperatura/temperatura_f2_v2.gif";
import temperatura_f2_v3 from "../../../public/assets/temperatura/temperatura_f2_v3.gif";
import temperatura_f2_v4 from "../../../public/assets/temperatura/temperatura_f2_v4.gif";
import { ApiWeatherData } from "../../../pages/api/weather";

const temperatureBoyImages = [
  { range: { min: -Infinity, max: 5 }, image: temperatura_f2_v1 },
  { range: { min: 5, max: 15 }, image: temperatura_f2_v2 },
  { range: { min: 15, max: 25 }, image: temperatura_f2_v3 },
  { range: { min: 25, max: Infinity }, image: temperatura_f2_v4 },
];

const temperatureDoorImages = [
  { range: { min: -Infinity, max: 10 }, image: temperatura_f1_v1 },
  { range: { min: 10, max: 15 }, image: temperatura_f1_v2 },
  { range: { min: 15, max: Infinity }, image: null },
];

export default function Temperatura({
  temperatureInfo,
}: {
  temperatureInfo?: ApiWeatherData;
}) {
  const temperatureValue = temperatureInfo?.value ?? 20;

  const boyImage = temperatureBoyImages.find(
    (i) => i.range.min <= temperatureValue && temperatureValue < i.range.max
  )?.image;

  const doorImage = temperatureDoorImages.find(
    (i) => i.range.min <= temperatureValue && temperatureValue < i.range.max
  )?.image;

  if (!boyImage) {
    throw new Error(
      `No suitable image found for ${temperatureInfo?.value} ${temperatureInfo?.unit}`
    );
  }

  return (
    <>
      <>
        {/* Door */}
        {doorImage && (
          <Image
            src={doorImage}
            alt={doorImage.src}
            className="absolute z-[-1] scale-[130%] max-h-full top-[49%] left-[63%] transform -translate-x-1/2 -translate-y-1/2"
            unoptimized
          />
        )}
      </>
      <>
        {/* Boy */}
        <Image
          src={boyImage}
          alt={boyImage.src}
          className="absolute scale-50 max-h-full top-[10%] left-[16%]"
          style={{
            filter:
              "drop-shadow(2px 0 0 black) drop-shadow(0 2px 0 black) drop-shadow(0 0 1px black)",
          }}
          unoptimized
        />
      </>
    </>
  );
}
