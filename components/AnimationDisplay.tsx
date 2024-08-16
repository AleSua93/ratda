import Image from "next/image";
import presión_f2_v4 from "../public/assets/presion/presión_f2_v4.png";
import temperatura_f2_v1 from "../public/assets/temperatura/temperatura_f2_v1.gif";
import humedad_f2_v1 from "../public/assets/humedad/humedad_f1_v2_loopable.gif";

export default function AnimationDisplay() {
  return (
    <div className="relative overflow-clip w-full h-full">
      <Image src={presión_f2_v4} alt="temperatura" className="absolute" />
      <Image
        src={temperatura_f2_v1}
        alt="presion"
        className="absolute left-[210px] scale-50"
        style={{
          filter:
            "drop-shadow(2px 0 0 black) drop-shadow(0 2px 0 black) drop-shadow(0 0 1px black)",
        }}
      />
      <Image
        src={humedad_f2_v1}
        alt="humedad"
        className="absolute z-10"
        style={{
          filter:
            "drop-shadow(2px 0 0 gray) drop-shadow(0 2px 0 gray) drop-shadow(0 0 1px gray)",
        }}
      />
    </div>
  );
}
