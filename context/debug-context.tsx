import { createContext, ReactNode, useContext, useState } from "react";

interface IDebugContext {
  isDebugMode: boolean;
  setIsDebugMode: (isDebug: boolean) => void;
}

export const DebugContext = createContext<IDebugContext>({
  isDebugMode: false,
  setIsDebugMode: () => {},
});

export default function DebugContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isDebugMode, setIsDebugMode] = useState<boolean>(false);

  return (
    <DebugContext.Provider value={{ isDebugMode, setIsDebugMode }}>
      {children}
    </DebugContext.Provider>
  );
}

export function useDebugMode() {
  return useContext(DebugContext);
}
