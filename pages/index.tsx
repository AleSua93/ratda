import type { NextPage } from "next";
import { useContext } from "react";
import Controls from "../components/Controls";
import Spinner from "../components/Spinner";
import TrackView from "../components/TrackView";
import { AppAudioContext } from "../context/app-audio-context";
import { useAudioFiles } from "../hooks/useAudioFiles";

const Home: NextPage = () => {
  const { audioContext, setAudioContext } = useContext(AppAudioContext);
  const { tracks, setTracks, isLoading } = useAudioFiles();

  const handlePlay = () => {
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
  };

  const handlePause = () => {
    if (audioContext?.state === "suspended") {
      audioContext.resume();
    }

    for (const track of tracks) {
      getActiveStem(track.id)?.audioElement.pause();
    }
  };

  const getActiveStem = (trackId: string) => {
    return tracks.find((t) => t.id === trackId)?.stems.find((s) => s.active);
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
      <TrackView tracks={tracks} setTracks={setTracks} />
      <div className="flex border-t-2 border-gray-700 bg-gray-900 gap-4 justify-center z-10">
        <Controls onPause={handlePause} onPlay={handlePlay} />
      </div>
    </>
  );
};

export default Home;
