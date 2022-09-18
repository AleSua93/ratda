import { useQuery } from "@tanstack/react-query";
import { ApiWeatherResult } from "../pages/api/weather";

const REFETCH_INTERVAL_MS = 5000;

export default function useWeather() {
  const { data: weatherData, isLoading } = useQuery<ApiWeatherResult>(
    ["weather-result"],
    async () => {
      const response = await fetch("/api/weather");
      const data = await response.json();
      return data;
    },
    { refetchInterval: REFETCH_INTERVAL_MS, refetchIntervalInBackground: true }
  );

  return { weatherData, isLoading };
}
