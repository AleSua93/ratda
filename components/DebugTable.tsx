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
          </tr>
        </thead>
        <tbody>
          {tracks.map((t) => {
            return t.stemRefs.map((s) => {
              return (
                <tr key={s.stemId}>
                  <td>{s.stemId}</td>
                  <td className={`${s.active && "text-green-500"}`}>
                    {s.active ? "true" : "false"}
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
