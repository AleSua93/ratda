import { useEffect, useRef, useState } from "react";

interface Props {
  analyser: AnalyserNode;
  play: boolean;
}

export default function AudioVisualizer({ analyser, play }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frequencyArray = useRef(new Uint8Array(analyser.frequencyBinCount));
  const [rafId, setRafId] = useState(0);

  useEffect(() => {
    if (play) {
      setRafId(requestAnimationFrame(animate));
    } else {
      cancelAnimationFrame(rafId);
    }
  }, [play]);

  const animate = () => {
    if (!canvasRef.current) {
      return;
    }

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) {
      return;
    }

    const bufferLength = analyser.frequencyBinCount;
    const barWidth = canvasRef.current.width / (bufferLength * 2);

    let x = 0;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    analyser.getByteFrequencyData(frequencyArray.current);
    for (let i = -bufferLength; i < bufferLength; i++) {
      const barHeight = frequencyArray.current[Math.abs(i)] / 1.5;

      const opacity = barHeight / 5;
      ctx.fillStyle = `rgb(${opacity}, ${opacity}, ${opacity})`;
      ctx.fillRect(
        x,
        (canvasRef.current.height - barHeight) / 2,
        barWidth,
        barHeight
      );
      x += barWidth;
    }

    setRafId(requestAnimationFrame(animate));
  };

  return <canvas ref={canvasRef} width="1024" height="260"></canvas>;
}
