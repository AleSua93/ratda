import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import Controls from "../components/Controls";
import Spinner from "../components/Spinner";
import TrackView from "../components/TrackView";
import { AppAudioContext } from "../context/app-audio-context";
import { useAudioFiles } from "../hooks/useAudioFiles";
import { TrackMetadata } from "./api/audio-files";

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

const Home: NextPage = () => {
  const { audioContext, setAudioContext } = useContext(AppAudioContext);
  const [tracks, setTracks] = useState<AudioTrack[]>([]);
  const {
    data: trackMetadata,
    isLoading,
    error,
  } = useQuery<TrackMetadata[]>(["audio-files"], async () => {
    const response = await fetch("/api/audio-files");
    const data = await response.json();
    return data;
  });

  const { files, isLoading: isDownloadingFiles } = useAudioFiles();

  useEffect(() => {
    if (!trackMetadata) {
      return;
    }

    const tracks: AudioTrack[] = trackMetadata.map((trackData) => {
      const prefix = "audio_files";

      const stems = trackData.stems.map((stem, idx) => {
        const filePath = `${prefix}/${trackData.name}/${stem.name}`;
        const audioElement = new Audio(filePath);
        return {
          id: stem.id,
          filePath,
          audioElement,
          active: idx === 0,
        };
      });

      return {
        id: trackData.id,
        name: trackData.name,
        stems,
      };
    });

    setTracks(tracks);
  }, [trackMetadata]);

  const handlePlay = () => {
    let ctx = audioContext ?? new AudioContext();
    if (!audioContext) {
      setAudioContext(ctx);
    }

    if (audioContext?.state === "suspended") {
      audioContext.resume();
    }

    for (const track of tracks) {
      getActiveStem(track.id)?.audioElement.play();
    }
  };

  const handlePause = () => {
    if (audioContext?.state === "suspended") {
      audioContext.resume();
    }

    for (const track of tracks) {
      getActiveStem(track.id)?.audioElement.pause();
    }
  };

  const getActiveStem = (trackId: string) => {
    return tracks.find((t) => t.id === trackId)?.stems.find((s) => s.active);
  };

  if (isDownloadingFiles) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner className="text-gray-500 h-8 w-8" />
      </div>
    );
  }

  return (
    <>
      <TrackView tracks={tracks} setTracks={setTracks} />
      <div className="flex border-t-2 border-gray-700 bg-gray-900 gap-4 justify-center z-10">
        <Controls onPause={handlePause} onPlay={handlePlay} />
      </div>
    </>
  );
};

export default Home;
