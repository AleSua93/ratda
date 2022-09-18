import { createContext, ReactNode, useContext, useState } from "react";

interface IDebugContext {
  isDebugMode: boolean;
  toggleDebugMode: () => void;
}

export const DebugContext = createContext<IDebugContext>({
  isDebugMode: false,
  toggleDebugMode: () => {},
});

export default function DebugContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isDebugMode, setIsDebugMode] = useState<boolean>(false);

  const toggleDebugMode = () => {
    setIsDebugMode(!isDebugMode);
  };

  return (
    <DebugContext.Provider value={{ isDebugMode, toggleDebugMode }}>
      {children}
    </DebugContext.Provider>
  );
}

export function useDebugMode() {
  return useContext(DebugContext);
}
