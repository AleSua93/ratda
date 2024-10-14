import { useMediaQuery } from "react-responsive";

export const useTabletAndAboveMediaQuery = () =>
  useMediaQuery({ minWidth: 961 });

export const useMobileMediaQuery = () => useMediaQuery({ maxWidth: 960 });
