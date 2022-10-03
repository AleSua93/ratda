import { useEffect, useState } from "react";

export default function useAudioContext() {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  useEffect(() => {
    if (!audioContext) {
      setAudioContext(new AudioContext());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return audioContext;
}
