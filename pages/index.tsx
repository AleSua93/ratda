import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AudioVisualizer from "../components/AudioVisualizer";
import Controls from "../components/Controls";
import DebugTable from "../components/DebugTable";
import InformationPopup from "../components/InformationPopup";
import Spinner from "../components/Spinner";
import TrackView from "../components/tracks/TrackView";
import { useDebugMode } from "../context/debug-context";
import usePlayback from "../hooks/usePlayback";
import Image from "next/image";
import titulo from "../public/assets/misc/titulo.png";
import AnimationDisplay from "../components/animated/AnimationDisplay";

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

  return (
    <div className="flex flex-col h-screen text-lg">
      <div className="h-full flex flex-col">
        <div className="absolute top-8 right-8 z-50">
          <InformationPopup />
        </div>
        <div className="self-center">
          {/* RATDA */}
          <Image
            height={150}
            src={titulo}
            alt="RATDA"
            className="self-center"
          />
        </div>
        {isDebugMode && <DebugTable tracks={tracks} />}
        {/* {analyser && <AudioVisualizer analyser={analyser} play={isPlaying} />} */}
        <AnimationDisplay weatherData={weatherData} />
      </div>
      <div className="flex items-center flex-col p-2 border-t border-t-gray-900 gap-4 justify-center z-10">
        <Controls
          onPause={handlePause}
          onPlay={handlePlay}
          isLoading={isLoadingFiles}
        />
        <TrackView
          tracks={tracks}
          setActiveStem={setActiveStem}
          weatherData={weatherData}
        />
      </div>
    </div>
  );
};

export default Home;
