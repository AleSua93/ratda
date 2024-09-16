import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";
import ReactModal from "react-modal";
import info from "../public/assets/misc/info.jpg";

export default function InformationPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<"es" | "en">("es");

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
          <div className="flex justify-between">
            <div className="flex flex-row gap-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="language_radio"
                  value={language}
                  checked={language === "es"}
                  onChange={() => {
                    setLanguage("es");
                  }}
                  className="accent-zinc-800"
                />
                ES
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="language_radio"
                  value={language}
                  checked={language === "en"}
                  onChange={() => {
                    setLanguage("en");
                  }}
                  className="accent-zinc-800"
                />
                EN
              </label>
            </div>
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
          {language === "es" ? (
            <>
              <p>
                RATDA (Recomposición a través de algoritmos) es un proyecto de
                música y nuevas tecnologías que consta de un dispositivo
                artístico-tecnológico capaz de producir música de manera
                continua a partir de muestras de audio que, atravesando por
                distintos procesamientos, funcionan como capas o células sonoras
                que el dispositivo utiliza para generar diferentes combinaciones
                del material.
              </p>
              <p>
                Este dispositivo se encuentra a su vez sujeto a parámetros
                pre-estipulados que guardan relación con el comportamiento en
                tiempo real de distintos elementos de la naturaleza y del clima,
                los cuales fueron utilizados como lenguaje simbólico en las
                letras de las canciones de las que parten las muestras de audio.
              </p>
              <p>
                Al igual que la atmósfera sonora, la interfaz visual responde a
                determinados parámetros que inciden en las representaciones que
                suceden y en el comportamiento de los objetos visuales en la
                plataforma.
              </p>
              <p>
                El proyecto ha recibido dos Becas Creación del Fondo
                Metropolitano de la Cultura, las Artes y las Ciencias (2021 y
                2023) de la Ciudad de Buenos Aires.
              </p>
              <p>Por Julián Ventura, Alejandro Suárez y Juan Cruz Dibella.</p>
            </>
          ) : (
            <>
              <p>
                RATDA (Recomposition through Algorithms) is a project that
                merges music and new technologies. It consists of an
                artistic-technological device capable of continuously producing
                music from audio samples. These samples, after undergoing
                various processes, function as layers or sound cells that the
                device uses to generate different combinations of material.
              </p>
              <p>
                This device is also subject to pre-stipulated parameters linked
                to the real-time behavior of different natural elements and
                weather conditions. These elements were used as symbolic
                language in the lyrics of the songs from which the audio samples
                are drawn.
              </p>
              <p>
                In a similar manner to the sound atmosphere, the visual
                interface responds to certain parameters that influence the
                representations and the behavior of visual objects on the
                platform.
              </p>
              <p>
                The project has been awarded two Creation Grants by the
                Metropolitan Fund for Culture, Arts, and Sciences (2021 and
                2023) from the City of Buenos Aires.
              </p>
              <p>By Julián Ventura, Alejandro Suárez and Juan Cruz Dibella.</p>
            </>
          )}
        </div>
      </ReactModal>
    </>
  );
}
