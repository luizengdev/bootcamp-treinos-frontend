"use client";

import { type ReactNode, useEffect, useRef } from "react";

interface HeatmapScrollAreaProps {
  children: ReactNode;
}

export const HeatmapScrollArea = ({ children }: HeatmapScrollAreaProps) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (scrollArea) {
      scrollArea.scrollLeft = scrollArea.scrollWidth;
    }
  }, []);

  return (
    <div
      ref={scrollAreaRef}
      className="flex w-full items-start gap-1 overflow-x-auto rounded-[12px] border border-border p-5 [scrollbar-width:none]"
    >
      {children}
    </div>
  );
};
