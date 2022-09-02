import type { NextPage } from "next";
import { useCallback, useEffect, useRef, useState } from "react";
import Controls from "../components/Controls";
import Spinner from "../components/Spinner";
import TrackView from "../components/TrackView";
import { useAudioFiles } from "../hooks/useAudioFiles";

const Home: NextPage = () => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const { tracks, setTracks, isLoading } = useAudioFiles(audioContext);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!audioContext) {
      setAudioContext(new AudioContext());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pauseAllStems = useCallback(() => {
    for (const track of tracks) {
      for (const stem of track.stems) {
        stem.audioElement.pause();
      }
    }
  }, [tracks]);

  const playActiveStems = useCallback(() => {
    for (const track of tracks) {
      for (const stem of track.stems) {
        if (stem.active) {
          stem.audioElement.play();
        } else {
          stem.audioElement.pause();
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

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner className="text-gray-500 h-8 w-8" />
      </div>
    );
  }

  return (
    <>
      <TrackView tracks={tracks} setActiveStem={setActiveStem} />
      <div className="flex border-t-2 border-gray-700 bg-gray-900 gap-4 justify-center z-10">
        <Controls
          onPause={() => {
            setIsPlaying(false);
          }}
          onPlay={() => {
            setIsPlaying(true);
          }}
        />
      </div>
    </>
  );
};

export default Home;
