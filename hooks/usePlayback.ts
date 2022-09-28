import { useEffect, useState } from "react";
import { ApiWeatherResult } from "../pages/api/weather";
import { useTracks } from "./useTracks";

export default function usePlayback(audioContext: AudioContext | null) {
  const {
    tracks,
    stems,
    setTracks,
    isLoading: isLoadingFiles,
    weatherData,
  } = useTracks(audioContext);
  const [isPlaying, setIsPlaying] = useState(false);

  const pauseAllStems = () => {
    for (const track of tracks) {
      for (const stemRef of track.stemRefs) {
        const stem = stems.get(stemRef.stemId);
        if (!stem) {
          throw new Error(`Stem ${stemRef.stemId} not found`);
        }
        stem.pause();
      }
    }
  };

  useEffect(() => {
    if (!weatherData) {
      return;
    }

    setActiveStems(weatherData);
  }, [weatherData]);

  const setActiveStem = (trackId: string, stemId: string) => {
    setTracks(
      tracks.map((t) => {
        if (t.id === trackId) {
          t.stemRefs.forEach((s) => {
            s.active = s.stemId === stemId;
          });
        }

        return t;
      })
    );
  };

  const setActiveStems = (weatherData: ApiWeatherResult) => {
    setTracks((curr) => {
      return curr.map((t) => {
        return {
          ...t,
          stems: t.stemRefs.map((s) => {
            return {
              ...s,
              active: false,
            };
          }),
        };
      });
    });

    tracks.forEach((t) => {
      setActiveStem(t.id, weatherData[t.id].stemId);
    });
  };

  const playActiveStems = () => {
    for (const track of tracks) {
      for (const stemRef of track.stemRefs) {
        const stem = stems.get(stemRef.stemId);
        if (!stem) {
          throw new Error(`Stem ${stemRef.stemId} not found`);
        }

        stemRef.active ? stem.play() : stem.pause();
      }
    }
  };

  useEffect(() => {
    if (isPlaying) {
      playActiveStems();
    } else {
      pauseAllStems();
    }
  }, [isPlaying, tracks]);

  const handlePlay = () => {
    if (audioContext?.state === "suspended") {
      audioContext.resume();
    }

    setIsPlaying(true);
  };

  const handlePause = () => {
    if (audioContext?.state === "suspended") {
      audioContext.resume();
    }

    setIsPlaying(false);
  };

  return {
    tracks,
    setActiveStem,
    handlePlay,
    handlePause,
    isLoadingFiles,
    weatherData,
  };
}
