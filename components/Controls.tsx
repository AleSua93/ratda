import { useState } from "react";
import play from "../public/assets/misc/play.jpg";
import stop from "../public/assets/misc/stop.jpg";
import Image from "next/image";

interface Props {
  onPlay: () => void;
  onPause: () => void;
  isLoading?: boolean;
}

export default function Controls({ onPlay, onPause, isLoading }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isLoading) {
    return (
      <div className="text-zinc-800 text-2xl font-bold flex gap-2 items-baseline">
        Cargando
        <div className="h-1 w-1 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-1 w-1 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-1 w-1 bg-black rounded-full animate-bounce"></div>
      </div>
    );
  }

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
        <Image src={play} alt="play" width={64} height={64} />
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
        <Image src={stop} alt="stop" width={64} height={64} />
      </button>
    </div>
  );
}
