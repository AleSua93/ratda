import React from "react";

type ButtonVariant = "primary" | "outline";

interface Props {
  text: string;
  variant?: ButtonVariant;
  className?: string;
  onClick: (ev: React.MouseEvent<HTMLElement>) => void;
}

export default function Button({
  text,
  onClick,
  className,
  variant = "primary",
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`bg-zinc-200 text-zinc-200 bg-opacity-0 p-2 rounded-md border border-white max-w-fit hover:bg-opacity-25 ${
        className && className
      }`}
    >
      {text}
    </button>
  );
}
