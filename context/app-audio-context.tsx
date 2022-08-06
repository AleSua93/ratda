import { createContext, ReactNode, useState } from "react";

interface IAppAudioContext {
  audioContext: AudioContext | null;
  setAudioContext: (context: AudioContext) => void;
}

export const AppAudioContext = createContext<IAppAudioContext>({
  audioContext: null,
  setAudioContext: () => {},
});

export default function AppAudioContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  return (
    <AppAudioContext.Provider value={{ audioContext, setAudioContext }}>
      {children}
    </AppAudioContext.Provider>
  );
}
