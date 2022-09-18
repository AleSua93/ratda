import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Button from "../components/common/Button";
import Controls from "../components/Controls";
import Spinner from "../components/Spinner";
import TrackView from "../components/TrackView";
import { useDebugMode } from "../context/debug-context";
import useTracks from "../hooks/useTracks";

const Home: NextPage = () => {
  const { isDebugMode, toggleDebugMode } = useDebugMode();
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
    <div className="flex flex-col h-full">
      <Button
        text={`Debug mode ${isDebugMode ? "off" : "on"}`}
        className="m-2 self-end"
        onClick={toggleDebugMode}
      />
      {isDebugMode && (
        <table>
          <thead>
            <th>trackID</th>
            <th>active</th>
            <th>is playing</th>
          </thead>
          <tbody>
            {tracks.map((t) => {
              return t.stems.map((s) => {
                return (
                  <tr key={s.id}>
                    <td>{s.id}</td>
                    <td>{s.active ? "true" : "false"}</td>
                    <td>{s.isPlaying ? "true" : "false"}</td>
                  </tr>
                );
              });
            })}
          </tbody>
        </table>
      )}
      <TrackView tracks={tracks} setActiveStem={setActiveStem} />
      <div className="flex border-t-2 border-gray-700 bg-gray-900 gap-4 justify-center z-10">
        <Controls onPause={handlePause} onPlay={handlePlay} />
      </div>
    </div>
  );
};

export default Home;
