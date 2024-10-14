import Image from "next/image";
import humedad_f1_v2 from "../../../public/assets/humedad/humedad_f1_v2_loopable.gif";
import humedad_f1_v1 from "../../../public/assets/humedad/humedad_f1_v1.png";
import viento_f1_v1 from "../../../public/assets/viento/viento_f1_v1.png";
import viento_f1_v2 from "../../../public/assets/viento/viento_f1_v2.gif";
import viento_f1_v3 from "../../../public/assets/viento/viento_f1_v3.gif";
import viento_f2_v2 from "../../../public/assets/viento/viento_f2_v2.gif";
import viento_f2_v3 from "../../../public/assets/viento/viento_f2_v3.gif";
import viento_f2_v4 from "../../../public/assets/viento/viento_f2_v4.gif";
import { ApiWeatherData } from "../../../pages/api/weather";
import { useEffect, useState } from "react";

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

const branchImages = [
  {
    range: { min: -Infinity, max: 2 },
    image: viento_f1_v1,
    className: "top-[-4%] left-[1%]",
  },
  {
    range: { min: 2, max: 4 },
    image: viento_f1_v2,
    className: "scale-[45%] top-[1%] left-[5%]",
  },
  {
    range: { min: 4, max: Infinity },
    image: viento_f1_v3,
    className: "scale-[45%] top-[0%] left-[14%]",
  },
];

const jarheadImages = [
  {
    range: { min: -Infinity, max: 2 },
    image: null,
  },
  // todo iterate every 10 seconds or so
  {
    range: { min: 2, max: 3.5 },
    image: viento_f2_v2,
    className: "z-[-1] top-[7%]",
  },
  {
    range: { min: 3.5, max: 5 },
    image: viento_f2_v3,
    className: "z-[-1] scale-[65%] left-[-7%] top-[9%]",
  },
  {
    range: { min: 5, max: Infinity },
    // image: viento_f2_v4,
    // className: "z-[2] top-[4%] left-[1%]",
    image: viento_f2_v2,
    className: "z-[-1] top-[7%]",
  },
];

export default function Viento({ windInfo }: { windInfo?: ApiWeatherData }) {
  const windValue = windInfo?.value ?? 4;
  const [shouldDisplayJarhead, setShouldDisplayJarhead] = useState(true);

  const lightbulb = lightbulbImages.find(
    (i) => i.range.min <= windValue && windValue < i.range.max
  );

  let jarhead = jarheadImages.find(
    (i) => i.range.min <= windValue && windValue < i.range.max
  );

  const branch = branchImages.find(
    (i) => i.range.min <= windValue && windValue < i.range.max
  );

  // Bit of a hacky way to make the cycle happen once every 5 seconds instead of looping constantly
  useEffect(() => {
    if (jarhead?.image === viento_f2_v2 && shouldDisplayJarhead) {
      setTimeout(() => {
        setShouldDisplayJarhead(false);
      }, 1000);

      setTimeout(() => {
        setShouldDisplayJarhead(true);
      }, 10000);
    }
  }, [jarhead, shouldDisplayJarhead]);

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
      {branch?.image && (
        <Image
          src={branch.image}
          alt={branch.image.src}
          className={`absolute z-[4] max-h-full ${branch.className}`}
        />
      )}

      {/* bichito que pasa */}
      {jarhead?.image && shouldDisplayJarhead && (
        <Image
          src={jarhead.image}
          alt={jarhead.image.src}
          className={`absolute max-h-full ${jarhead.className}`}
        />
      )}
    </>
  );
}
