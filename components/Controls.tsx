import { PlayIcon, StopIcon } from "@heroicons/react/solid";
import { useState } from "react";

interface Props {
  onPlay: () => void;
  onPause: () => void;
}

export default function Controls({ onPlay, onPause }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <>
      <button
        type="button"
        className={`${
          isPlaying ? "opacity-20" : ""
        } text-black p-2 rounded-md hover:pointer`}
        disabled={isPlaying}
        onClick={() => {
          setIsPlaying(true);
          onPlay();
        }}
      >
        <PlayIcon className="h-16 text-gray-300" />
      </button>
      <button
        type="button"
        className={`${
          !isPlaying ? "opacity-20" : ""
        } text-black p-2 rounded-md hover:pointer `}
        disabled={!isPlaying}
        onClick={() => {
          setIsPlaying(true);
          onPause();
        }}
      >
        <StopIcon className="h-16 text-gray-300" />
      </button>
    </>
  );
}
