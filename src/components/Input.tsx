import { InputHTMLAttributes } from "react";

type Props = {
  text: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function Input({ text, ...props }: Props) {
  return (
    <div className="flex flex-col">
      <label>{text}</label>
      <input
        {...props}
        className={`
          border border-zinc-300 rounded-lg
          focus:outline-none
          bg-zinc-800
          text-zinc-50
          placeholder:text-zinc-400
          px-4 py-2 my-4
          ${props.readOnly ? "" : "focus:bg-zinc-900"}
        `}
      />
    </div>
  );
}
