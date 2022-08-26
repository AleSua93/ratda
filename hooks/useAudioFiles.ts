import { useQuery } from "@tanstack/react-query";
import JSZip, { JSZipObject } from "jszip";
import { useEffect, useState } from "react";
import { AudioFilesDownloadUrl } from "../pages/api/v2/audio-files";

export interface AudioStem {
  id: string;
  name: string;
  audioElement: HTMLAudioElement;
  active: boolean;
}

export type AudioTrack = {
  id: string;
  name: string;
  stems: AudioStem[];
};

export function useAudioFiles() {
  const [tracks, setTracks] = useState<AudioTrack[]>([]);
  const { data: audioFilesDownloadUrl } = useQuery<AudioFilesDownloadUrl>(
    ["audio-files-dl-url"],
    async () => {
      const response = await fetch("/api/v2/audio-files");
      const data = await response.json();
      return data;
    }
  );

  const { data: audioFiles, isLoading } = useQuery<any>(
    ["downloaded-audio-files"],
    async () => {
      if (audioFilesDownloadUrl) {
        const response = await fetch(audioFilesDownloadUrl);
        const data = await response.blob();
        return data;
      }
    },
    { enabled: audioFilesDownloadUrl !== undefined }
  );

  const parseDownloadedFiles = async (zippedFiles: {
    [key: string]: JSZipObject;
  }): Promise<AudioTrack[]> => {
    const keys = Object.keys(zippedFiles);

    const res = [] as AudioTrack[];

    for (const key of keys) {
      const file = zippedFiles[key];
      if (!file.name.includes(".mp3")) {
        continue;
      }

      const trackName = file.name.split("/")[0];
      const stemName = file.name.split("/")[1].split(".mp3")[0];
      const data = await file.async("blob");
      const audioElement = new Audio(URL.createObjectURL(data));

      const trackIndex = res.findIndex((t) => t.id === trackName);
      if (trackIndex === -1) {
        res.push({
          id: trackName,
          name: trackName,
          stems: [{ id: stemName, name: stemName, audioElement, active: true }],
        });
      } else {
        res[trackIndex].stems.push({
          id: stemName,
          name: stemName,
          audioElement,
          active: true,
        });
      }
    }

    return res;
  };

  useEffect(() => {
    if (audioFiles) {
      const newZip = new JSZip();
      newZip.loadAsync(audioFiles).then(async (zip) => {
        const trackData = await parseDownloadedFiles(zip.files);
        setTracks(trackData);
      });
    }
  }, [audioFiles]);

  return {
    tracks,
    setTracks,
    isLoading,
  };
}
