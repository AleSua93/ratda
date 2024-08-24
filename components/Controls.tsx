import { useState } from "react";
import play from "../public/assets/misc/play.jpg";
import stop from "../public/assets/misc/stop.jpg";
import Image from "next/image";

interface Props {
  onPlay: () => void;
  onPause: () => void;
}

export default function Controls({ onPlay, onPause }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className="self-center text-zinc-800 flex gap-4">
      <button
        type="button"
        className={`${isPlaying ? "opacity-20" : ""} text-black hover:pointer`}
        disabled={isPlaying}
        onClick={() => {
          setIsPlaying(true);
          onPlay();
        }}
      >
        <Image src={play} alt="play" width={96} height={96} />
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
        <Image src={stop} alt="stop" width={96} height={96} />
      </button>
    </div>
  );
}
