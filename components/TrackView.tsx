import { AudioTrack } from "../pages";
import { toPascalCase } from "../utils/casing";

interface Props {
  tracks: AudioTrack[];
  setTracks: (tracks: AudioTrack[]) => void;
}

export default function TrackView({ tracks, setTracks }: Props) {
  const setActiveStem = (trackId: string, stemId: string) => {
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
    <>
      <div
        style={{
          backgroundImage: `url('/background_2.jpg')`,
          opacity: 0.3,
          backgroundSize: "cover",
          height: "100%",
          width: "100%",
          position: "fixed",
          zIndex: -1,
        }}
      ></div>
      <div className="flex flex-col gap-4 my-2 items-center text-center">
        {tracks.map((track) => (
          <div key={track.id} className="flex flex-col w-1/2 gap-2">
            <div className="m-1 text-gray-400">{toPascalCase(track.name)}</div>
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
    </>
  );
}
