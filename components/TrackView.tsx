import { AudioTrack } from "../pages";
import { toPascalCase } from "../utils/casing";

interface Props {
  tracks: AudioTrack[];
  setTracks: (tracks: AudioTrack[]) => void;
}

export default function TrackView({ tracks, setTracks }: Props) {
  const setActiveStem = (trackId: string, stemId: string) => {
    console.log(stemId);

    setTracks(
      tracks.map((t) => {
        if (t.id === trackId) {
          t.stems.forEach((s) => {
            s.active = s.id === stemId;
            s.id === stemId ? s.audioElement.play() : s.audioElement.pause();
          });
        }

        return t;
      })
    );
  };

  return (
    <div className="flex flex-col gap-4 my-2">
      {tracks.map((track) => (
        <div key={track.id} className="flex flex-col gap-2">
          <div className="p-1 rounded-sm">{toPascalCase(track.name)}</div>
          <select
            className="p-1 rounded-sm hover:cursor-pointer"
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
