import { Fragment, useState } from "react";
import { useDebugMode } from "../../context/debug-context";
import { AudioTrack } from "../../hooks/useTracks";
import { ApiWeatherResult } from "../../pages/api/weather";
import WeatherInfo from "../WeatherInfo";
import { clsx } from "clsx";
import Image from "next/image";
import arrow_down from "../../public/assets/misc/arrow down.jpg";
import arrow_up from "../../public/assets/misc/arrow up.jpg";

interface Props {
  tracks: AudioTrack[];
  setActiveStem: (trackId: string, stemId: string) => void;
  weatherData?: ApiWeatherResult;
}

export default function TrackView({
  tracks,
  setActiveStem,
  weatherData,
}: Props) {
  const { isDebugMode } = useDebugMode();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHoveringButton, setIsHoveringButton] = useState(false);

  return (
    <div className="flex gap-8 flex-col p-4 w-full md:w-4/5 self-center">
      <div className="self-center">
        <button
          onMouseEnter={() => {
            setIsHoveringButton(true);
          }}
          onMouseLeave={() => {
            setIsHoveringButton(false);
          }}
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
          className={clsx(
            "flex gap-2 items-center text-2xl font-bold",
            isHoveringButton && "underline"
          )}
        >
          {isExpanded ? "Esconder" : "Mostrar"} emociones{" "}
          <span>
            {isExpanded ? (
              <Image src={arrow_up} alt="arrow up" width={30} height={30} />
            ) : (
              <Image src={arrow_down} alt="arrow down" width={30} height={30} />
            )}
          </span>
        </button>
      </div>
      {isExpanded && (
        <div className="grid grid-cols-4 gap-8">
          {isDebugMode ? (
            <>
              {tracks.map((track) => (
                <div key={track.id} className="flex flex-col w-full gap-2">
                  <div className="m-1 text-zinc-400">{track.name}</div>
                  <select
                    className="p-4 rounded-sm hover:cursor-pointer"
                    value={track.stemRefs.find((s) => s.active)?.stemId}
                    onChange={(ev) => {
                      setActiveStem(track.id, ev.target.value);
                    }}
                  >
                    {track.stemRefs.map((stemRef) => (
                      <option
                        className="hover:cursor-pointer"
                        value={stemRef.stemId}
                        key={stemRef.stemId}
                      >
                        {stemRef.stemId}
                      </option>
                    ))}
                  </select>
                  <br />
                </div>
              ))}
            </>
          ) : (
            <>
              {tracks.map((track) => (
                <Fragment key={track.id}>
                  {weatherData && <WeatherInfo data={weatherData[track.id]} />}
                  {/* <span className="text-center text-zinc-400">
                    {track.name}
                  </span> */}
                  {/* {track.stemRefs.map(
                    (stemRef) =>
                      stemRef.active && (
                        <span
                          key={stemRef.stemId}
                          className="text-right text-zinc-600"
                        >
                          {stemRef.stemId}
                        </span>
                      )
                  )} */}
                </Fragment>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
