import { Fragment, useEffect } from "react";
import { AudioTrack } from "../hooks/useAudioFiles";
import useWeather from "../hooks/useWeather";
import WeatherInfo from "./WeatherInfo";

interface Props {
  tracks: AudioTrack[];
  setActiveStem: (trackId: string, stemId: string) => void;
}

export default function TrackView({ tracks, setActiveStem }: Props) {
  const { weatherData } = useWeather();

  useEffect(() => {
    if (!weatherData) {
      return;
    }

    tracks.forEach((t) => {
      console.log(weatherData[t.id].stemId);

      setActiveStem(t.id, weatherData[t.id].stemId);
    });
  }, [weatherData]);

  return (
    // todo improve className below
    <div className="flex flex-col p-4 w-full md:w-2/3 h-full self-center justify-center">
      <div className="grid grid-cols-3 gap-8">
        {tracks.map((track) => (
          <Fragment key={track.id}>
            {weatherData && <WeatherInfo data={weatherData[track.id]} />}
            <span className="text-center text-gray-400">{track.name}</span>
            {track.stems.map(
              (stem) =>
                stem.active && (
                  <span key={stem.id} className="text-right text-gray-600">
                    {stem.id}
                  </span>
                )
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
