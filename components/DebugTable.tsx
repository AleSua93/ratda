import { AudioTrack } from "../hooks/useTracks";

interface Props {
  tracks: AudioTrack[];
}

export default function DebugTable({ tracks }: Props) {
  return (
    <div className="overflow-scroll bg-gray-700 bg-opacity-50">
      <table className="text-left text-sm border-separate border-spacing-x-8">
        <thead>
          <tr>
            <th>trackID</th>
            <th>active</th>
            <th>is playing</th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((t) => {
            return t.stems.map((s) => {
              return (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td className={`${s.active && "text-green-500"}`}>
                    {s.active ? "true" : "false"}
                  </td>
                  <td className={`${s.isPlaying() && "text-green-500"}`}>
                    {s.isPlaying() ? "true" : "false"}
                  </td>
                </tr>
              );
            });
          })}
        </tbody>
      </table>
    </div>
  );
}
