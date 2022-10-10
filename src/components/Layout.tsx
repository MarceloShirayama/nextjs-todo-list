import React from "react";
import { Title } from "./Title";

type Props = {
  title?: string;
  children: React.ReactNode;
};

export function Layout({ title, children }: Props) {
  return (
    <div
      className={`
      flex flex-col sm:w-full md:w-2/3
      bg-gradient-to-r from-zinc-700 via-zinc-900 to-black
      text-zinc-100
      rounded-md
    `}
    >
      <Title>{title}</Title>
      <div className="p-4">{children}</div>
    </div>
  );
}
