import { AudioTrack } from "../hooks/useAudioFiles";

interface Props {
  tracks: AudioTrack[];
  setActiveStem: (trackId: string, stemId: string) => void;
}

export default function TrackView({ tracks, setActiveStem }: Props) {
  return (
    <div className="flex flex-col h-full gap-4 p-4 w-full md:w-1/2 self-center justify-center text-center">
      {tracks.map((track) => (
        <div key={track.id} className="flex flex-col w-full gap-2">
          <div className="m-1 text-gray-400">{track.name}</div>
          <select
            className="p-4 bg-gray-900 rounded-sm hover:cursor-pointer"
            onChange={(ev) => {
              setActiveStem(track.id, ev.target.value);
            }}
          >
            {track.stems.map((stem) => (
              <option
                className="hover:cursor-pointer"
                value={stem.id}
                key={stem.id}
              >
                {stem.id}
              </option>
            ))}
          </select>
          <br />
        </div>
      ))}
    </div>
  );
}
