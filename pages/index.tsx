import { PlayIcon, StopIcon } from "@heroicons/react/solid";
import type { NextPage } from "next";
import React, { useContext, useEffect, useRef, useState } from "react";
import TrackView from "../components/TrackView";
import { AppAudioContext } from "../context/app-audio-context";

export interface AudioStem {
  id: string;
  audioElement: HTMLAudioElement;
  filePath: string;
  active: boolean;
}

export interface AudioTrack {
  name: string;
  id: string;
  stems: AudioStem[];
}

const trackNames = ["track_1", "track_2", "track_3", "track_4"];
const prefix = "audio_files";
const stemNames = [
  "broken subbass 1 A",
  "cello contramelo 3",
  "viento roto 1 B",
  "violin 1 contramelo 2",
];
const extension = ".mp3";

const Home: NextPage = () => {
  const { audioContext, setAudioContext } = useContext(AppAudioContext);
  const [tracks, setTracks] = useState<AudioTrack[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let ctx = audioContext ?? new AudioContext();
    if (!audioContext) {
      setAudioContext(ctx);
    }

    const tracks: AudioTrack[] = trackNames.map((name) => {
      const stems = stemNames.map((stemName, idx) => {
        const filePath = `${prefix}/${stemName}${extension}`;
        const audioElement = new Audio(filePath);
        return {
          id: stemName,
          filePath,
          audioElement,
          active: idx === 0,
        };
      });

      return {
        id: name,
        stems,
        name,
      };
    });

    setTracks(tracks);
  }, [audioContext, setAudioContext]);

  const handlePlay = () => {
    if (audioContext?.state === "suspended") {
      audioContext.resume();
    }

    for (const track of tracks) {
      getActiveStem(track.id)?.audioElement.play();
    }

    setIsPlaying(true);
  };

  const handlePause = () => {
    if (audioContext?.state === "suspended") {
      audioContext.resume();
    }

    for (const track of tracks) {
      getActiveStem(track.id)?.audioElement.pause();
    }

    setIsPlaying(false);
  };

  const getActiveStem = (trackId: string) => {
    return tracks.find((t) => t.id === trackId)?.stems.find((s) => s.active);
  };

  return (
    <>
      <div className="flex gap-4 col-start-1 row-start-4 self-start justify-self-center">
        <button
          type="button"
          className={`${
            isPlaying ? "opacity-20" : ""
          } text-black p-2 rounded-md hover:pointer`}
          disabled={isPlaying}
          onClick={handlePlay}
        >
          <PlayIcon className="text-gray-300" />
        </button>
        <button
          type="button"
          className={`${
            !isPlaying ? "opacity-20" : ""
          } text-black p-2 rounded-md hover:pointer `}
          disabled={!isPlaying}
          onClick={handlePause}
        >
          <StopIcon className="text-gray-300" />
        </button>
      </div>
      <div className="col-start-1 col-span-1">
        <TrackView tracks={tracks} setTracks={setTracks} />
      </div>
    </>
  );
};

export default Home;
