import { useCallback, useEffect, useState } from "react";
import { useAudioFiles } from "./useAudioFiles";
import useWeather from "./useWeather";

export default function useTracks(audioContext: AudioContext | null) {
  const {
    tracks,
    setTracks,
    isLoading: isLoadingFiles,
  } = useAudioFiles(audioContext);
  const { weatherData } = useWeather();
  const [isPlaying, setIsPlaying] = useState(false);

  const setActiveStem = useCallback(
    (trackId: string, stemId: string) => {
      setTracks(
        tracks.map((t) => {
          if (t.id === trackId) {
            t.stems.forEach((s) => {
              s.active = s.id === stemId;
            });
          }

          return t;
        })
      );
    },
    [tracks, setTracks]
  );

  useEffect(() => {
    if (!weatherData) {
      return;
    }

    if (!isLoadingFiles) {
      tracks.forEach((t) => {
        setActiveStem(t.id, weatherData[t.id].stemId);
      });
    }
  }, [weatherData, isLoadingFiles]);

  const pauseAllStems = useCallback(() => {
    for (const track of tracks) {
      for (const stem of track.stems) {
        if (stem.isPlaying) {
          stem.pause();
        }
      }
    }
  }, [tracks]);

  const playActiveStems = useCallback(() => {
    for (const track of tracks) {
      for (const stem of track.stems) {
        if (stem.active) {
          if (!stem.isPlaying) {
            stem.play();
          }
        } else {
          if (stem.isPlaying) {
            stem.pause();
          }
        }
      }
    }
  }, [tracks]);

  const handlePlay = useCallback(() => {
    if (audioContext?.state === "suspended") {
      audioContext.resume();
    }

    playActiveStems();

    setIsPlaying(true);
  }, [audioContext, playActiveStems]);

  const handlePause = useCallback(() => {
    if (audioContext?.state === "suspended") {
      audioContext.resume();
    }

    pauseAllStems();

    setIsPlaying(false);
  }, [audioContext, pauseAllStems]);

  // Handle start/stop of audio playback when controls are used or stems change
  useEffect(() => {
    if (isPlaying) {
      handlePlay();
    } else {
      handlePause();
    }
  }, [tracks, isPlaying, handlePause, handlePlay]);

  return {
    tracks,
    setActiveStem,
    handlePlay,
    handlePause,
    isLoadingFiles,
    weatherData,
  };
}
