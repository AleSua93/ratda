import { useQuery } from "@tanstack/react-query";
import JSZip, { JSZipObject } from "jszip";
import { useCallback, useRef, useState } from "react";
import AudioStem from "../classes/AudioStem";
import { AudioFilesDownloadUrl } from "../pages/api/audio-files";
import { ApiWeatherResult, TrackId } from "../pages/api/weather";
import useWeather from "./useWeather";

export type AudioTrack = {
  id: TrackId;
  name: string;
  stemRefs: {
    stemId: string;
    active: boolean;
  }[];
};

export function useTracks(audioContext: AudioContext | null) {
  const [tracks, setTracks] = useState<AudioTrack[]>([]);
  const stems = useRef<Map<string, AudioStem>>(new Map<string, AudioStem>());
  const analyser = useRef<AnalyserNode>();
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
        console.log("configuring files");

        // Create and configure audio analyser
        if (audioContext) {
          const analyserNode = audioContext.createAnalyser();
          analyserNode.fftSize = 1024;
          analyserNode.connect(audioContext.destination);
          analyser.current = analyserNode;
        }

        if (!weatherData) {
          throw Error("Weather data not present for some reason");
        }

        const { tracks } = await unzipAndConfigureTracks(data, weatherData);

        setTracks(tracks);
      },
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const setInitialActiveStems = (
    audioTracks: AudioTrack[],
    weatherData: ApiWeatherResult
  ) => {
    return audioTracks.map((t) => {
      return {
        ...t,
        stemRefs: t.stemRefs.map((s) => {
          return {
            ...s,
            active: s.stemId === weatherData[t.id].stemId,
          };
        }),
      };
    });
  };

  const parseDownloadedFiles = useCallback(
    async (zippedFiles: {
      [key: string]: JSZipObject;
    }): Promise<{ audioTracks: AudioTrack[] }> => {
      const audioTracks = [] as AudioTrack[];

      if (!audioContext) {
        return { audioTracks };
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
        const stemId = stemName;
        const data = await file.async("blob");
        const audioElement = new Audio(URL.createObjectURL(data));

        if (!analyser.current) {
          throw new Error("Analyser node not ready");
        }

        stems.current.set(
          stemId,
          new AudioStem({
            audio: audioElement,
            name: stemName,
            audioContext,
            destinationNode: analyser.current,
            trackId,
          })
        );

        const trackIndex = audioTracks.findIndex((t) => t.id === trackId);
        if (trackIndex === -1) {
          audioTracks.push({
            id: trackId,
            name: trackName,
            stemRefs: [{ stemId, active: false }],
          });
        } else {
          audioTracks[trackIndex].stemRefs.push({
            stemId,
            active: false,
          });
        }
      }

      setIsLoading(false);
      return {
        audioTracks,
      };
    },
    [audioContext]
  );

  const unzipAndConfigureTracks = async (
    audioFiles: any,
    weatherData: ApiWeatherResult
  ) => {
    const newZip = new JSZip();

    let tracks: AudioTrack[] = [];
    return await newZip.loadAsync(audioFiles).then(async (zip) => {
      const { audioTracks } = await parseDownloadedFiles(zip.files);
      const tracksWithActiveStems = setInitialActiveStems(
        audioTracks,
        weatherData
      );

      tracks = tracksWithActiveStems;

      return { tracks };
    });
  };

  return {
    tracks,
    stems: stems.current,
    setTracks,
    isLoading,
    weatherData,
    analyser: analyser.current,
  };
}
