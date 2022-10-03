import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AudioVisualizer from "../components/AudioVisualizer";
import Controls from "../components/Controls";
import DebugTable from "../components/DebugTable";
import Spinner from "../components/Spinner";
import TrackView from "../components/TrackView";
import { useDebugMode } from "../context/debug-context";
import usePlayback from "../hooks/usePlayback";

const Home: NextPage = () => {
  const { isDebugMode, setIsDebugMode } = useDebugMode();
  const {
    tracks,
    setActiveStem,
    handlePlay,
    handlePause,
    isLoadingFiles,
    weatherData,
    analyser,
    isPlaying,
  } = usePlayback();
  const router = useRouter();

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
    <div className="flex flex-col h-full text-lg">
      <div className="h-full flex flex-col justify-evenly">
        {isDebugMode && <DebugTable tracks={tracks} />}
        {analyser && <AudioVisualizer analyser={analyser} play={isPlaying} />}
        <TrackView
          tracks={tracks}
          setActiveStem={setActiveStem}
          weatherData={weatherData}
        />
      </div>
      <div className="flex border-t border-t-gray-900 bg-black gap-4 justify-center z-10">
        <Controls onPause={handlePause} onPlay={handlePlay} />
      </div>
    </div>
  );
};

export default Home;
