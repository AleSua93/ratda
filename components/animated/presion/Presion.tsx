import Image from "next/image";
import presión_f1_v1 from "../../../public/assets/presion/presión_f1_v1.png";
import presión_f1_v2 from "../../../public/assets/presion/presión_f1_v2.png";
import presión_f2_v4 from "../../../public/assets/presion/presión_f2_v4.png";
import presión_f2_v1 from "../../../public/assets/presion/presión_f2_v1.png";
import presión_f2_v2 from "../../../public/assets/presion/presión_f2_v2.png";
import presión_f2_v3 from "../../../public/assets/presion/presión_f2_v3.png";

export default function Presion() {
  return (
    <>
      {/* Grietas */}
      <>
        <Image
          src={presión_f1_v1}
          alt="presión_f1_v1"
          className="absolute z-[1] left-[-250px]"
        />
        {/* <Image
          src={presión_f1_v2}
          alt="presión_f1_v2"
          className="absolute z-[1] left-[-250px]"
        /> */}
      </>
      {/* Fondo */}
      <>
        <Image src={presión_f2_v1} alt="presión_f2_v1" className="absolute" />
        {/* <Image src={presión_f2_v2} alt="presión_f2_v2" className="absolute" /> */}
        {/* <Image src={presión_f2_v3} alt="presión_f2_v3" className="absolute" /> */}
        {/* <Image src={presión_f2_v4} alt="presión_f2_v4" className="absolute" /> */}
      </>
    </>
  );
}
