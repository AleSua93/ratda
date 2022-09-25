import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Controls from "../components/Controls";
import DebugTable from "../components/DebugTable";
import Spinner from "../components/Spinner";
import TrackView from "../components/TrackView";
import { useDebugMode } from "../context/debug-context";
import usePlayback from "../hooks/usePlayback";

const Home: NextPage = () => {
  const { isDebugMode, setIsDebugMode } = useDebugMode();
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const {
    tracks,
    setActiveStem,
    handlePlay,
    handlePause,
    isLoadingFiles,
    weatherData,
  } = usePlayback(audioContext);
  const router = useRouter();

  useEffect(() => {
    if (!audioContext) {
      setAudioContext(new AudioContext());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (router.query.debug === "true") {
      setIsDebugMode(true);
    }
  }, [router, setIsDebugMode]);

  if (isLoadingFiles) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner className="text-gray-500 h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {isDebugMode && <DebugTable tracks={tracks} />}
      <TrackView
        tracks={tracks}
        setActiveStem={setActiveStem}
        weatherData={weatherData}
      />
      <div className="flex border-t-2 border-gray-700 bg-gray-900 gap-4 justify-center z-10">
        <Controls onPause={handlePause} onPlay={handlePlay} />
      </div>
    </div>
  );
};

export default Home;
