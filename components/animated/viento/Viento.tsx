import Image from "next/image";
import viento_f1_v1 from "../../../public/assets/viento/viento_f1_v1.png";
import viento_f2_v3 from "../../../public/assets/viento/viento_f2_v3.gif";

export default function Viento() {
  return (
    <>
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
