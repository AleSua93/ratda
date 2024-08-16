import { PlayIcon, StopIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

interface Props {
  onPlay: () => void;
  onPause: () => void;
}

export default function Controls({ onPlay, onPause }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className="self-center flex gap-4">
      <button
        type="button"
        className={`${
          isPlaying ? "opacity-20" : ""
        } text-black rounded-md hover:pointer`}
        disabled={isPlaying}
        onClick={() => {
          setIsPlaying(true);
          onPlay();
        }}
      >
        <PlayIcon className="h-16 text-gray-800" />
      </button>
      <button
        type="button"
        className={`${
          !isPlaying ? "opacity-20" : ""
        } text-black rounded-md hover:pointer `}
        disabled={!isPlaying}
        onClick={() => {
          setIsPlaying(false);
          onPause();
        }}
      >
        <StopIcon className="h-16 text-gray-800" />
      </button>
    </div>
  );
}
