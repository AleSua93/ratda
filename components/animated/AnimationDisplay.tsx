import Humedad from "./humedad/Humedad";
import Temperatura from "./temperatura/Temperatura";
import Presion from "./presion/Presion";
import Viento from "./viento/Viento";

export default function AnimationDisplay() {
  return (
    <div className="relative overflow-clip w-full h-full">
      <Presion />
      <Temperatura />
      <Humedad />
      <Viento />
    </div>
  );
}
