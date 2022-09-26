import { useEffect, useState } from "react";
import { useTracks } from "./useTracks";

export default function usePlayback(audioContext: AudioContext | null) {
  const {
    tracks,
    setTracks,
    isLoading: isLoadingFiles,
    weatherData,
  } = useTracks(audioContext);
  const [isPlaying, setIsPlaying] = useState(false);

  const pauseAllStems = () => {
    for (const track of tracks) {
      for (const stem of track.stems) {
        stem.pause();
      }
    }
  };

  const setActiveStem = (trackId: string, stemId: string) => {
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
  };

  const playActiveStems = () => {
    for (const track of tracks) {
      for (const stem of track.stems) {
        stem.active ? stem.play() : stem.pause();
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
