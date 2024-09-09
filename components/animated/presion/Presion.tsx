import Image from "next/image";
import presión_f1_v1 from "../../../public/assets/presion/presión_f1_v1.png";
import presión_f1_v2 from "../../../public/assets/presion/presión_f1_v2.png";
import presión_f2_v4 from "../../../public/assets/presion/presión_f2_v4.png";
import presión_f2_v1 from "../../../public/assets/presion/presión_f2_v1.png";
import presión_f2_v2 from "../../../public/assets/presion/presión_f2_v2.png";
import presión_f2_v3 from "../../../public/assets/presion/presión_f2_v3.png";
import { ApiWeatherData } from "../../../pages/api/weather";

const pressureCrackImages = [
  { range: { min: -Infinity, max: 1020 }, image: null },
  { range: { min: 1020, max: 1025 }, image: presión_f1_v1 },
  { range: { min: 1025, max: Infinity }, image: presión_f1_v2 },
];

const pressureBackgroundImages = [
  { range: { min: -Infinity, max: 1009 }, image: presión_f2_v4 },
  { range: { min: 1009, max: 1020 }, image: presión_f2_v3 },
  { range: { min: 1020, max: 1025 }, image: presión_f2_v2 },
  { range: { min: 1025, max: Infinity }, image: presión_f2_v1 },
];

export default function Presion({
  pressureInfo,
}: {
  pressureInfo?: ApiWeatherData;
}) {
  const pressureValue = pressureInfo?.value ?? 1019;

  const backgroundImage = pressureBackgroundImages.find(
    (i) => i.range.min <= pressureValue && pressureValue < i.range.max
  )?.image;

  const crackImage = pressureCrackImages.find(
    (i) => i.range.min <= pressureValue && pressureValue < i.range.max
  )?.image;

  if (!backgroundImage) {
    throw new Error(
      `No suitable background image found for ${pressureInfo?.value} ${pressureInfo?.unit}`
    );
  }

  return (
    <>
      {/* Grietas */}
      <>
        {crackImage && (
          <Image
            src={crackImage}
            alt={crackImage.src}
            className="absolute z-[1] left-[-250px]"
          />
        )}
      </>
      {/* Fondo */}
      <>
        <Image
          src={backgroundImage}
          alt={backgroundImage.src}
          className="absolute"
        />
      </>
    </>
  );
}
