import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Controls from "../components/Controls";
import Spinner from "../components/Spinner";
import TrackView from "../components/TrackView";
import useTracks from "../hooks/useTracks";

const Home: NextPage = () => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const { tracks, setActiveStem, handlePlay, handlePause, isLoadingFiles } =
    useTracks(audioContext);

  useEffect(() => {
    if (!audioContext) {
      setAudioContext(new AudioContext());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoadingFiles) {
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
        <Controls onPause={handlePause} onPlay={handlePlay} />
      </div>
    </>
  );
};

export default Home;
