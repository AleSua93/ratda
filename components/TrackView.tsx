import { Fragment } from "react";
import { useDebugMode } from "../context/debug-context";
import { AudioTrack } from "../hooks/useTracks";
import { ApiWeatherResult } from "../pages/api/weather";
import WeatherInfo from "./WeatherInfo";

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

  return (
    <div className="flex flex-col p-4 w-full md:w-2/3 h-full self-center justify-center">
      <div className="grid grid-cols-3 gap-8">
        {isDebugMode ? (
          <>
            {tracks.map((track) => (
              <div key={track.id} className="flex flex-col w-full gap-2">
                <div className="m-1 text-gray-400">{track.name}</div>
                <select
                  className="p-4 bg-gray-900 rounded-sm hover:cursor-pointer"
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
                <span className="text-center text-gray-400">{track.name}</span>
                {track.stemRefs.map(
                  (stemRef) =>
                    stemRef.active && (
                      <span
                        key={stemRef.stemId}
                        className="text-right text-gray-600"
                      >
                        {stemRef.stemId}
                      </span>
                    )
                )}
              </Fragment>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
