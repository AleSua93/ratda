import type { NextPage } from "next";
import { useCallback, useContext, useEffect, useState } from "react";
import Controls from "../components/Controls";
import Spinner from "../components/Spinner";
import TrackView from "../components/TrackView";
import { AppAudioContext } from "../context/app-audio-context";
import { useAudioFiles } from "../hooks/useAudioFiles";

const Home: NextPage = () => {
  const { audioContext, setAudioContext } = useContext(AppAudioContext);
  const { tracks, setTracks, isLoading } = useAudioFiles();
  const [isPlaying, setIsPlaying] = useState(false);

  const getActiveStem = useCallback(
    (trackId: string) => {
      return tracks.find((t) => t.id === trackId)?.stems.find((s) => s.active);
    },
    [tracks]
  );

  const handlePlay = useCallback(() => {
    let ctx = audioContext ?? new AudioContext();
    if (!audioContext) {
      setAudioContext(ctx);
    }

    if (audioContext?.state === "suspended") {
      audioContext.resume();
    }

    for (const track of tracks) {
      getActiveStem(track.id)?.audioElement.play();
    }

    setIsPlaying(true);
  }, [audioContext, tracks, getActiveStem, setAudioContext]);

  const handlePause = useCallback(() => {
    if (audioContext?.state === "suspended") {
      audioContext.resume();
    }

    for (const track of tracks) {
      getActiveStem(track.id)?.audioElement.pause();
    }

    setIsPlaying(false);
  }, [audioContext, tracks, getActiveStem]);

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
