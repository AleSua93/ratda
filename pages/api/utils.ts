import { WeatherParameter } from "./weather";

const PressureStems = [
  { lowerLimit: -Infinity, upperLimit: 998, stemId: "voz frase 10" },
  { lowerLimit: 998, upperLimit: 1000.91, stemId: "voz frase 11" },
  { lowerLimit: 1000.91, upperLimit: 1003.82, stemId: "voz frase 12" },
  { lowerLimit: 1003.82, upperLimit: 1006.73, stemId: "voz frase 13" },
  { lowerLimit: 1006.73, upperLimit: 1009.64, stemId: "voz frase 14" },
  { lowerLimit: 1009.64, upperLimit: 1012.55, stemId: "voz frase 2" },
  { lowerLimit: 1012.55, upperLimit: 1015.45, stemId: "voz frase 3" },
  { lowerLimit: 1015.45, upperLimit: 1018.36, stemId: "voz frase 4" },
  { lowerLimit: 1018.36, upperLimit: 1021.27, stemId: "voz frase 5" },
  { lowerLimit: 1021.27, upperLimit: 1024.18, stemId: "voz frase 6" },
  { lowerLimit: 1024.18, upperLimit: 1027.09, stemId: "voz frase 7" },
  { lowerLimit: 1027.09, upperLimit: 1030.0, stemId: "voz frase 8" },
  { lowerLimit: 1030, upperLimit: Infinity, stemId: "voz frase 9" },
];

const TemperatureStems = [
  { lowerLimit: -Infinity, upperLimit: 0.0, stemId: "bajo raspante 1 A" },
  { lowerLimit: 0.0, upperLimit: 1.67, stemId: "bajo raspante 1 B" },
  { lowerLimit: 1.67, upperLimit: 3.33, stemId: "bajo raspante 1 C" },
  { lowerLimit: 3.33, upperLimit: 5.0, stemId: "bajo raspante 1 E" },
  { lowerLimit: 5.0, upperLimit: 6.67, stemId: "bajo raspante 1 F" },
  { lowerLimit: 6.67, upperLimit: 8.33, stemId: "bajo raspante 1 G" },
  { lowerLimit: 8.33, upperLimit: 10.0, stemId: "broken subbass 1 A" },
  { lowerLimit: 10.0, upperLimit: 11.67, stemId: "broken subbass 1 B" },
  { lowerLimit: 11.67, upperLimit: 13.33, stemId: "broken subbass 1 C" },
  { lowerLimit: 13.33, upperLimit: 15.0, stemId: "broken subbass 1 D" },
  { lowerLimit: 15.0, upperLimit: 16.67, stemId: "broken subbass 1 E" },
  { lowerLimit: 16.67, upperLimit: 18.33, stemId: "broken subbass 1 F" },
  { lowerLimit: 18.33, upperLimit: 20.0, stemId: "broken subbass 1 G" },
  {
    lowerLimit: 20.0,
    upperLimit: 21.67,
    stemId: "cello pizz bass noise 1 A",
  },
  {
    lowerLimit: 21.67,
    upperLimit: 23.33,
    stemId: "cello pizz bass noise 1 B",
  },
  {
    lowerLimit: 23.33,
    upperLimit: 25.0,
    stemId: "cello pizz bass noise 1 C",
  },
  {
    lowerLimit: 25.0,
    upperLimit: 26.67,
    stemId: "cello pizz bass noise 1 D",
  },
  {
    lowerLimit: 26.67,
    upperLimit: 28.33,
    stemId: "cello pizz bass noise 1 E",
  },
  {
    lowerLimit: 28.33,
    upperLimit: 30.0,
    stemId: "cello pizz bass noise 1 F",
  },
  {
    lowerLimit: 30.0,
    upperLimit: Infinity,
    stemId: "cello pizz bass noise 1 G",
  },
];

const WindSpeedStems = [
  {
    lowerLimit: -Infinity,
    upperLimit: 4.47,
    stemId: "cello contramelo 1",
  },
  { lowerLimit: 4.47, upperLimit: 4.52, stemId: "cello contramelo 2" },
  { lowerLimit: 4.52, upperLimit: 4.57, stemId: "cello contramelo 3" },
  { lowerLimit: 4.57, upperLimit: 4.61, stemId: "violin 1 contramelo 1" },
  { lowerLimit: 4.61, upperLimit: 4.66, stemId: "violin 1 contramelo 2" },
  { lowerLimit: 4.66, upperLimit: 4.71, stemId: "violin 1 contramelo 3" },
  { lowerLimit: 4.71, upperLimit: 4.76, stemId: "violin 1 contramelo 4" },
  { lowerLimit: 4.76, upperLimit: 4.81, stemId: "violin 1 contramelo 5" },
  { lowerLimit: 4.81, upperLimit: 4.85, stemId: "violin 1 contramelo 6" },
  { lowerLimit: 4.85, upperLimit: 4.9, stemId: "violin 2 contramelo 1" },
  { lowerLimit: 4.9, upperLimit: 4.95, stemId: "violin 2 contramelo 2" },
  { lowerLimit: 4.95, upperLimit: 5.0, stemId: "violin 2 contramelo 3" },
  { lowerLimit: 5.0, upperLimit: 5.04, stemId: "violin 2 contramelo 4" },
  { lowerLimit: 5.04, upperLimit: 5.09, stemId: "violin 2 contramelo 5" },
  { lowerLimit: 5.09, upperLimit: 5.14, stemId: "violin 2 contramelo 6" },
  {
    lowerLimit: 5.14,
    upperLimit: Infinity,
    stemId: "violin 2 contramelo 7",
  },
];

const HumidityStems = [
  { lowerLimit: -Infinity, upperLimit: 60, stemId: "gtr rev lago 1" },
  { lowerLimit: 60.0, upperLimit: 63.33, stemId: "gtr rev lago 2" },
  { lowerLimit: 63.33, upperLimit: 66.67, stemId: "gtr rev lago 3" },
  { lowerLimit: 66.67, upperLimit: 70.0, stemId: "gtr rev lago 4" },
  { lowerLimit: 70.0, upperLimit: 73.33, stemId: "viola lago 1" },
  { lowerLimit: 73.33, upperLimit: 76.67, stemId: "viola lago 2" },
  { lowerLimit: 76.67, upperLimit: 80.0, stemId: "viola lago 3" },
  { lowerLimit: 80, upperLimit: Infinity, stemId: "viola lago 4" },
];

export function getStemId(parameter: WeatherParameter, value: number) {
  let rangeArray;
  switch (parameter) {
    case "wind-speed":
      rangeArray = WindSpeedStems;
      break;
    case "temperature":
      rangeArray = TemperatureStems;
      break;
    case "humidity":
      rangeArray = HumidityStems;
      break;
    case "pressure":
    default:
      rangeArray = PressureStems;
      break;
  }

  const range = rangeArray.find((range) => {
    return value <= range.upperLimit && value > range.lowerLimit;
  });

  if (!range) {
    throw new Error(`Stem for value ${value} of type ${parameter} not found`);
  }

  return range.stemId;
}
