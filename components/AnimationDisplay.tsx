import Image from "next/image";
import presión_f2_v4 from "../public/assets/presion/presión_f2_v4.png";
import temperatura_f2_v1 from "../public/assets/temperatura/temperatura_f2_v1.gif";

export default function AnimationDisplay() {
  return (
    <div className="relative">
      <Image src={presión_f2_v4} alt="presión_f2_v4" className="absolute" />
      <Image
        src={temperatura_f2_v1}
        alt="presión_f2_v4"
        className="absolute"
        unoptimized
      />
    </div>
  );
}
