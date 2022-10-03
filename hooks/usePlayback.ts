import { useCallback, useEffect, useState } from "react";
import { ApiWeatherResult } from "../pages/api/weather";
import useAudioContext from "./useAudioContext";
import { useTracks } from "./useTracks";

export default function usePlayback() {
  const audioContext = useAudioContext();
  const {
    tracks,
    stems,
    setTracks,
    isLoading: isLoadingFiles,
    weatherData,
    analyser,
  } = useTracks(audioContext);
  const [isPlaying, setIsPlaying] = useState(false);

  const pauseAllStems = useCallback(() => {
    for (const track of tracks) {
      for (const stemRef of track.stemRefs) {
        const stem = stems.get(stemRef.stemId);
        if (!stem) {
          throw new Error(`Stem ${stemRef.stemId} not found`);
        }
        stem.pause();
      }
    }
  }, [tracks, stems]);

  const setActiveStem = useCallback(
    (trackId: string, stemId: string) => {
      setTracks((curr) => {
        return curr.map((t) => {
          if (t.id === trackId) {
            t.stemRefs.forEach((s) => {
              s.active = s.stemId === stemId;
            });
          }

          return t;
        });
      });
    },
    [setTracks]
  );

  const setActiveStems = useCallback(
    (weatherData: ApiWeatherResult) => {
      setTracks((curr) => {
        return curr.map((t) => {
          return {
            ...t,
            stemRefs: t.stemRefs.map((ref) => {
              return {
                ...ref,
                active: weatherData[t.id].stemId === ref.stemId,
              };
            }),
          };
        });
      });
    },
    [setTracks]
  );

  useEffect(() => {
    if (!weatherData) {
      return;
    }

    setActiveStems(weatherData);
  }, [weatherData, setActiveStems]);

  const playActiveStems = useCallback(() => {
    for (const track of tracks) {
      for (const stemRef of track.stemRefs) {
        const stem = stems.get(stemRef.stemId);
        if (!stem) {
          throw new Error(`Stem ${stemRef.stemId} not found`);
        }

        stemRef.active ? stem.play() : stem.pause();
      }
    }
  }, [tracks, stems]);

  const handlePlay = () => {
    if (audioContext?.state === "suspended") {
      audioContext.resume();
    }

    playActiveStems();
    setIsPlaying(true);
  };

  const handlePause = () => {
    if (audioContext?.state === "suspended") {
      audioContext.resume();
    }

    pauseAllStems();
    setIsPlaying(false);
  };

  return {
    tracks,
    setActiveStem,
    handlePlay,
    handlePause,
    isLoadingFiles,
    weatherData,
    analyser,
    isPlaying,
  };
}
