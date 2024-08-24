import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";
import ReactModal from "react-modal";
import info from "../public/assets/misc/info.jpg";

export default function InformationPopup() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <Image
          src={info}
          alt="info"
          width={36}
          height={36}
          className="hover:opacity-60"
        />
      </button>
      <ReactModal
        isOpen={isOpen}
        style={{
          content: {
            width: "50%",
            height: "fit-content",
            margin: "auto",
            borderRadius: "5px",
            background: "white",
          },
          overlay: {
            background: "rgba(0, 0, 0, 0.5)",
            opacity: "1",
            zIndex: 1000,
          },
        }}
        contentLabel="Info Modal"
      >
        <div className="flex flex-col gap-4 text-zinc-800">
          <div className="flex self-end">
            {/* todo add language selector */}
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <XMarkIcon className="h-8 hover:opacity-60" />
            </button>
          </div>
          <div>
            Recomposición a través de algoritmos es un proyecto de música y
            nuevas tecnologías que consta de un dispositivo
            artístico-tecnológico capaz de producir música de manera continua a
            partir de muestras de audio que, atravesando por distintos
            procesamientos, funcionan como capas o células sonoras que el
            dispositivo utiliza para generar diferentes combinaciones del
            material.
          </div>
          <p>
            Este dispositivo se encuentra a su vez sujeto a parámetros
            pre-estipulados que guardan relación con el comportamiento en tiempo
            real de distintos elementos de la naturaleza y del clima, los cuales
            fueron utilizados como lenguaje simbólico en las letras de las
            canciones de las que parten las muestras de audio.
          </p>
          <p>
            El proyecto ha recibido una Beca Creación del Fondo Metropolitano de
            la Cultura, las Artes y las Ciencias en 2021.
          </p>
          <p>
            Por Julián Ventura, Pilar Victorio, Juan Cruz Dibella, Alejandro
            Suárez y Gioconda Cañas.
          </p>
        </div>
      </ReactModal>
    </>
  );
}
