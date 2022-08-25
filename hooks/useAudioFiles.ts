import { useQuery } from "@tanstack/react-query";
import JSZip, { JSZipObject } from "jszip";
import { useState } from "react";
import { AudioFilesDownloadUrl } from "../pages/api/v2/audio-files";

export function useAudioFiles() {
  const [files, setFiles] = useState<any[]>([]);
  const { data: audioFilesDownloadUrl } = useQuery<AudioFilesDownloadUrl>(
    ["audio-files-dl-url"],
    async () => {
      const response = await fetch("/api/v2/audio-files");
      const data = await response.json();
      return data;
    }
  );

  const parseDownloadedFiles = async (zippedFiles: {
    [key: string]: JSZipObject;
  }) => {
    const keys = Object.keys(zippedFiles);

    for (const key of keys) {
      const file = zippedFiles[key];
      if (!file.name.includes(".mp3")) {
        continue;
      }

      const blob = await file.async("blob");
      console.log(file.name, blob);
    }
  };

  const { data: audioFiles, isLoading } = useQuery<any>(
    ["downloaded-audio-files"],
    async () => {
      if (audioFilesDownloadUrl) {
        const response = await fetch(audioFilesDownloadUrl);
        const data = await response.blob();

        const newZip = new JSZip();
        newZip.loadAsync(data).then(async (zip) => {
          const parsedFiles = await parseDownloadedFiles(zip.files);
        });

        return {};
      }
    },
    { enabled: audioFilesDownloadUrl !== undefined }
  );

  return {
    files,
    isLoading,
  };
}
