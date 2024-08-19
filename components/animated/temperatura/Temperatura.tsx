import Image from "next/image";
import temperatura_f1_v1 from "../../../public/assets/temperatura/temperatura_f1_v1.png";
import temperatura_f1_v2 from "../../../public/assets/temperatura/temperatura_f1_v2.png";
import temperatura_f2_v1 from "../../../public/assets/temperatura/temperatura_f2_v1.gif";
import temperatura_f2_v2 from "../../../public/assets/temperatura/temperatura_f2_v2.gif";
import temperatura_f2_v3 from "../../../public/assets/temperatura/temperatura_f2_v3.gif";
import temperatura_f2_v4 from "../../../public/assets/temperatura/temperatura_f2_v4.gif";

export default function Temperatura() {
  return (
    <>
      <>
        {/* Door */}
        {/* <Image
          src={temperatura_f1_v1}
          alt="humedad"
          className="absolute z-[-1] left-[170px] top-[-5px] scale-[130%]"
        /> */}
        <Image
          src={temperatura_f1_v2}
          alt="humedad"
          className="absolute z-[-1] left-[170px] top-[-5px] scale-[130%]"
          style={{
            filter: "drop-shadow(1px 0 0 gray)",
          }}
        />
      </>
      <>
        {/* Boy */}
        <Image
          src={temperatura_f2_v1}
          alt="temperatura_f2_v1"
          className="absolute left-[210px] scale-50"
          style={{
            filter:
              "drop-shadow(2px 0 0 black) drop-shadow(0 2px 0 black) drop-shadow(0 0 1px black)",
          }}
        />
        {/* <Image
          src={temperatura_f2_v2}
          alt="temperatura_f2_v2"
          className="absolute left-[210px] scale-50"
          style={{
            filter:
              "drop-shadow(2px 0 0 black) drop-shadow(0 2px 0 black) drop-shadow(0 0 1px black)",
          }}
        /> */}
        {/* <Image
          src={temperatura_f2_v3}
          alt="temperatura_f2_v3"
          className="absolute left-[210px] scale-50"
          style={{
            filter:
              "drop-shadow(2px 0 0 black) drop-shadow(0 2px 0 black) drop-shadow(0 0 1px black)",
          }}
        /> */}
        {/* <Image
          src={temperatura_f2_v4}
          alt="temperatura_f2_v4"
          className="absolute left-[210px] scale-50"
          style={{
            filter:
              "drop-shadow(2px 0 0 black) drop-shadow(0 2px 0 black) drop-shadow(0 0 1px black)",
          }}
        /> */}
      </>
    </>
  );
}
