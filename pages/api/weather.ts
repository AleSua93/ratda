import type { NextApiRequest, NextApiResponse } from "next";
import { getStemId } from "./utils";

// See https://openweathermap.org/current
type WeatherResult = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  base: string;
  main: {
    temp: number; // In celsius
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number; // In meters
  wind: {
    speed: number; // In meters per sec
    deg: number;
  };
  clouds: {
    all: number; // % of cloudiness
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export type TrackId = "melodia" | "contramelodia" | "sosten" | "bajo";

export type WeatherParameter =
  | "wind-speed"
  | "temperature"
  | "humidity"
  | "pressure";

export type ApiWeatherData = {
  value: number;
  unit: string;
  stemId: string;
  parameter: WeatherParameter;
};

export type ApiWeatherResult = Record<TrackId, ApiWeatherData>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const appId = process.env.OPEN_WEATHER_API_KEY ?? "";
  const url = new URL("https://api.openweathermap.org/data/2.5/weather");

  // for Buenos Aires
  url.searchParams.set("lat", "-34.6075682");
  url.searchParams.set("lon", "-58.4370894");
  url.searchParams.set("appid", appId);
  url.searchParams.set("units", "metric");

  const data = await fetch(url);
  const weatherData = (await data.json()) as WeatherResult;

  console.log(weatherDataToApi(weatherData));

  res.status(200).json(weatherDataToApi(weatherData));
}

const weatherDataToApi = (data: WeatherResult): ApiWeatherResult => {
  return {
    melodia: {
      value: data.main.pressure,
      unit: "hPa",
      parameter: "pressure",
      stemId: getStemId("pressure", data.main.pressure),
    },
    contramelodia: {
      value: data.wind.speed,
      unit: "m/s",
      parameter: "wind-speed",
      stemId: getStemId("wind-speed", data.wind.speed),
    },
    bajo: {
      value: data.main.temp,
      unit: "°C",
      parameter: "temperature",
      stemId: getStemId("temperature", data.main.temp),
    },
    sosten: {
      value: data.main.humidity,
      unit: "%",
      parameter: "humidity",
      stemId: getStemId("humidity", data.main.humidity),
    },
  };
};
