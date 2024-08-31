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
  { range: { min: -Infinity, max: 15 }, image: temperatura_f1_v1 },
  { range: { min: 15, max: Infinity }, image: temperatura_f1_v2 },
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

  if (!boyImage || !doorImage) {
    throw new Error(
      `No suitable image found for ${temperatureInfo?.value} ${temperatureInfo?.unit}`
    );
  }

  return (
    <>
      <>
        {/* Door */}
        <Image
          src={doorImage}
          alt={doorImage.src}
          className="absolute z-[-1] left-[170px] top-[-5px] scale-[130%]"
        />
      </>
      <>
        {/* Boy */}
        <Image
          src={boyImage}
          alt={boyImage.src}
          className="absolute left-[210px] scale-50"
          style={{
            filter:
              "drop-shadow(2px 0 0 black) drop-shadow(0 2px 0 black) drop-shadow(0 0 1px black)",
          }}
        />
      </>
    </>
  );
}
