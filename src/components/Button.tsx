import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

type Props = {
  children: ReactNode;
  color?: "green" | "blue" | "zinc";
  className?: string;
  // onClick?: () => void;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function Button({ children, color, className, ...props }: Props) {
  const selectedColor =
    color === "green"
      ? "bg-green-700"
      : color === "blue"
      ? "bg-cyan-700"
      : "bg-zinc-700";

  const hover =
    color === "green"
      ? "hover:bg-green-500"
      : color === "blue"
      ? "hover:bg-cyan-500"
      : "hover:bg-zinc-500";

  const focus =
    color === "green"
      ? "focus:bg-green-500"
      : color === "blue"
      ? "focus:bg-cyan-500"
      : "focus:bg-zinc-500";

  return (
    <button
      {...props}
      className={`
        ${selectedColor}
        ${hover}
        ${focus}
        text-zinc-100 px-4 py-2 rounded-md
        ${className}
      `}
    >
      {children}
    </button>
  );
}
