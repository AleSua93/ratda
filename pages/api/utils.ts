const PressureStems = [
  { lowerLimit: -Infinity, upperLimit: 998, stemId: "voz frase 10.mp3" },
  { lowerLimit: 998, upperLimit: 1000.91, stemId: "voz frase 11.mp3" },
  { lowerLimit: 1000.91, upperLimit: 1003.82, stemId: "voz frase 12.mp3" },
  { lowerLimit: 1003.82, upperLimit: 1006.73, stemId: "voz frase 13.mp3" },
  { lowerLimit: 1006.73, upperLimit: 1009.64, stemId: "voz frase 14.mp3" },
  { lowerLimit: 1009.64, upperLimit: 1012.55, stemId: "voz frase 2.mp3" },
  { lowerLimit: 1012.55, upperLimit: 1015.45, stemId: "voz frase 3.mp3" },
  { lowerLimit: 1015.45, upperLimit: 1018.36, stemId: "voz frase 4.mp3" },
  { lowerLimit: 1018.36, upperLimit: 1021.27, stemId: "voz frase 5.mp3" },
  { lowerLimit: 1021.27, upperLimit: 1024.18, stemId: "voz frase 6.mp3" },
  { lowerLimit: 1024.18, upperLimit: 1027.09, stemId: "voz frase 7.mp3" },
  { lowerLimit: 1027.09, upperLimit: 1030.0, stemId: "voz frase 8.mp3" },
  { lowerLimit: 1030, upperLimit: Infinity, stemId: "voz frase 9.mp3" },
];

const TemperatureStems = [
  { lowerLimit: -Infinity, upperLimit: 0.0, stemId: "bajo raspante 1 A.mp3" },
  { lowerLimit: 0.0, upperLimit: 1.67, stemId: "bajo raspante 1 B.mp3" },
  { lowerLimit: 1.67, upperLimit: 3.33, stemId: "bajo raspante 1 C.mp3" },
  { lowerLimit: 3.33, upperLimit: 5.0, stemId: "bajo raspante 1 E.mp3" },
  { lowerLimit: 5.0, upperLimit: 6.67, stemId: "bajo raspante 1 F.mp3" },
  { lowerLimit: 6.67, upperLimit: 8.33, stemId: "bajo raspante 1 G.mp3" },
  { lowerLimit: 8.33, upperLimit: 10.0, stemId: "broken subbass 1 A.mp3" },
  { lowerLimit: 10.0, upperLimit: 11.67, stemId: "broken subbass 1 B.mp3" },
  { lowerLimit: 11.67, upperLimit: 13.33, stemId: "broken subbass 1 C.mp3" },
  { lowerLimit: 13.33, upperLimit: 15.0, stemId: "broken subbass 1 D.mp3" },
  { lowerLimit: 15.0, upperLimit: 16.67, stemId: "broken subbass 1 E.mp3" },
  { lowerLimit: 16.67, upperLimit: 18.33, stemId: "broken subbass 1 F.mp3" },
  { lowerLimit: 18.33, upperLimit: 20.0, stemId: "broken subbass 1 G.mp3" },
  {
    lowerLimit: 20.0,
    upperLimit: 21.67,
    stemId: "cello pizz bass noise 1 A.mp3",
  },
  {
    lowerLimit: 21.67,
    upperLimit: 23.33,
    stemId: "cello pizz bass noise 1 B.mp3",
  },
  {
    lowerLimit: 23.33,
    upperLimit: 25.0,
    stemId: "cello pizz bass noise 1 C.mp3",
  },
  {
    lowerLimit: 25.0,
    upperLimit: 26.67,
    stemId: "cello pizz bass noise 1 D.mp3",
  },
  {
    lowerLimit: 26.67,
    upperLimit: 28.33,
    stemId: "cello pizz bass noise 1 E.mp3",
  },
  {
    lowerLimit: 28.33,
    upperLimit: 30.0,
    stemId: "cello pizz bass noise 1 F.mp3",
  },
  {
    lowerLimit: 30.0,
    upperLimit: Infinity,
    stemId: "cello pizz bass noise 1 G.mp3",
  },
];

const WindSpeedStems = [
  {
    lowerLimit: -Infinity,
    upperLimit: 4.47,
    stemId: "cello contramelo 1.mp3",
  },
  { lowerLimit: 4.47, upperLimit: 4.52, stemId: "cello contramelo 2.mp3" },
  { lowerLimit: 4.52, upperLimit: 4.57, stemId: "cello contramelo 3.mp3" },
  { lowerLimit: 4.57, upperLimit: 4.61, stemId: "violin 1 contramelo 1.mp3" },
  { lowerLimit: 4.61, upperLimit: 4.66, stemId: "violin 1 contramelo 2.mp3" },
  { lowerLimit: 4.66, upperLimit: 4.71, stemId: "violin 1 contramelo 3.mp3" },
  { lowerLimit: 4.71, upperLimit: 4.76, stemId: "violin 1 contramelo 4.mp3" },
  { lowerLimit: 4.76, upperLimit: 4.81, stemId: "violin 1 contramelo 5.mp3" },
  { lowerLimit: 4.81, upperLimit: 4.85, stemId: "violin 1 contramelo 6.mp3" },
  { lowerLimit: 4.85, upperLimit: 4.9, stemId: "violin 2 contramelo 1.mp3" },
  { lowerLimit: 4.9, upperLimit: 4.95, stemId: "violin 2 contramelo 2.mp3" },
  { lowerLimit: 4.95, upperLimit: 5.0, stemId: "violin 2 contramelo 3.mp3" },
  { lowerLimit: 5.0, upperLimit: 5.04, stemId: "violin 2 contramelo 4.mp3" },
  { lowerLimit: 5.04, upperLimit: 5.09, stemId: "violin 2 contramelo 5.mp3" },
  { lowerLimit: 5.09, upperLimit: 5.14, stemId: "violin 2 contramelo 6.mp3" },
  {
    lowerLimit: 5.14,
    upperLimit: Infinity,
    stemId: "violin 2 contramelo 7.mp3",
  },
];

const HumidityStems = [
  { lowerLimit: -Infinity, upperLimit: 60, stemId: "gtr rev lago 1.mp3" },
  { lowerLimit: 60.0, upperLimit: 63.33, stemId: "gtr rev lago 2.mp3" },
  { lowerLimit: 63.33, upperLimit: 66.67, stemId: "gtr rev lago 3.mp3" },
  { lowerLimit: 66.67, upperLimit: 70.0, stemId: "gtr rev lago 4.mp3" },
  { lowerLimit: 70.0, upperLimit: 73.33, stemId: "viola lago 1.mp3" },
  { lowerLimit: 73.33, upperLimit: 76.67, stemId: "viola lago 2.mp3" },
  { lowerLimit: 76.67, upperLimit: 80.0, stemId: "viola lago 3.mp3" },
  { lowerLimit: 80, upperLimit: Infinity, stemId: "viola lago 4.mp3" },
];

export function getStemId(
  type: "wind-speed" | "temperature" | "humidity" | "pressure",
  value: number
) {
  let rangeArray;
  switch (type) {
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
    throw new Error(`Stem for value ${value} of type ${type} not found`);
  }

  return range.stemId;
}
