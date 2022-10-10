import React from "react";

type Props = {
  children: React.ReactNode;
};

export function Title({ children }: Props) {
  return (
    <div className="flex flex-col justify-center">
      <h1 className="px-5 py-2 text-2xl font-bold">{children}</h1>
      <hr className="border-2 border-zinc-500" />
    </div>
  );
}
