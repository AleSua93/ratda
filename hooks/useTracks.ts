import { useQuery } from "@tanstack/react-query";
import JSZip, { JSZipObject } from "jszip";
import { useCallback, useState } from "react";
import AudioStem from "../classes/AudioStem";
import { AudioFilesDownloadUrl } from "../pages/api/audio-files";
import { ApiWeatherResult, TrackId } from "../pages/api/weather";
import useWeather from "./useWeather";

export type AudioTrack = {
  id: TrackId;
  name: string;
  stems: AudioStem[];
};

export function useTracks(audioContext: AudioContext | null) {
  const [tracks, setTracks] = useState<AudioTrack[]>([]);
  const { weatherData } = useWeather();
  const [isLoading, setIsLoading] = useState(true);
  const { data: audioFilesDownloadUrl } = useQuery<AudioFilesDownloadUrl>(
    ["audio-files-dl-url"],
    async () => {
      const response = await fetch("/api/audio-files");
      const data = await response.json();
      return data;
    },
    { enabled: audioContext !== null }
  );

  const { data: audioFiles } = useQuery<any>(
    ["downloaded-audio-files"],
    async () => {
      if (audioFilesDownloadUrl) {
        const response = await fetch(audioFilesDownloadUrl);
        const data = await response.blob();
        return data;
      }
    },
    {
      enabled: !!audioFilesDownloadUrl && !!weatherData,
      async onSuccess(data) {
        if (!weatherData) {
          throw Error("Weather data not present for some reason");
        }

        const tracks = await unzipAndConfigureTracks(data, weatherData);
        setTracks(tracks);
      },
    }
  );

  const setActiveStem = (
    audioTracks: AudioTrack[],
    trackId: string,
    stemId: string
  ) => {
    return audioTracks.map((t) => {
      if (t.id === trackId) {
        t.stems.forEach((s) => {
          s.active = s.id === stemId;
        });
      }

      return t;
    });
  };

  const setActiveStems = (
    audioTracks: AudioTrack[],
    weatherData: ApiWeatherResult
  ) => {
    audioTracks.forEach((t) => {
      setActiveStem(audioTracks, t.id, weatherData[t.id].stemId);
    });

    return audioTracks;
  };

  const parseDownloadedFiles = useCallback(
    async (zippedFiles: {
      [key: string]: JSZipObject;
    }): Promise<AudioTrack[]> => {
      const res = [] as AudioTrack[];

      if (!audioContext) {
        return res;
      }

      const keys = Object.keys(zippedFiles);

      for (const key of keys) {
        const file = zippedFiles[key];
        if (!file.name.includes(".mp3")) {
          continue;
        }

        const trackName = file.name.split("/")[0];
        const trackId = trackName.toLowerCase() as TrackId; // make this the same for now
        const stemName = file.name.split("/")[1].split(".mp3")[0];
        const data = await file.async("blob");
        const audioElement = new Audio(URL.createObjectURL(data));

        const trackIndex = res.findIndex((t) => t.id === trackId);
        if (trackIndex === -1) {
          res.push({
            id: trackId,
            name: trackName,
            stems: [new AudioStem(audioContext, audioElement, stemName, false)],
          });
        } else {
          res[trackIndex].stems.push(
            new AudioStem(audioContext, audioElement, stemName, false)
          );
        }
      }

      setIsLoading(false);
      return res;
    },
    [audioContext]
  );

  const unzipAndConfigureTracks = async (
    audioFiles: any,
    weatherData: ApiWeatherResult
  ) => {
    const newZip = new JSZip();

    let tracks: AudioTrack[] = [];
    await newZip.loadAsync(audioFiles).then(async (zip) => {
      const trackData = await parseDownloadedFiles(zip.files);
      const tracksWithActiveStems = setActiveStems(trackData, weatherData);

      tracks = tracksWithActiveStems;
    });

    return tracks;
  };

  return {
    tracks,
    setTracks,
    isLoading,
    weatherData,
  };
}
