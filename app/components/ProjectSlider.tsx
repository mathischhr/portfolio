"use client";
import Image from "next/image";

interface ProjectSliderProps {
  projects: any[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  isExploring: boolean;
}

export default function ProjectSlider({
  projects,
  activeIndex,
  setActiveIndex,
  isExploring,
}: ProjectSliderProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 overflow-hidden">
      {projects.map((proj, index) => {
        const offset = index - activeIndex;
        const isActive = offset === 0;

        const translateX = isExploring
          ? isActive
            ? 22
            : offset * 110
          : offset * 55;
        const scale = isActive ? 1 : 0.75;
        const zIndex = isActive ? 20 : 10 - Math.abs(offset);
        const opacity =
          (isExploring && !isActive) || Math.abs(offset) > 1 ? 0 : 1;
        const innerTranslateX = isExploring && isActive ? 0 : offset * -15;

        return (
          <div
            key={proj.id}
            onClick={() => {
              if (!isActive && !isExploring) setActiveIndex(index);
            }}
            className={`absolute transition-all duration-[1200ms] ease-[cubic-bezier(0.76,0,0.24,1)] shadow-2xl flex items-center justify-center
              ${!isActive && !isExploring ? "cursor-pointer pointer-events-auto group" : ""}
              ${isActive ? "pointer-events-auto" : ""}
            `}
            style={{
              width: isExploring && isActive ? "58vw" : "50vw",
              height: isExploring && isActive ? "78vh" : "65vh",
              transform: `translateX(${translateX}vw) scale(${scale})`,
              opacity: opacity,
              zIndex: zIndex,
            }}
          >
            <div className="relative w-full h-full overflow-hidden bg-zinc-900 rounded-sm">
              <Image
                src={proj.image}
                alt={proj.title}
                fill
                className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
                style={{
                  transform: `translateX(${innerTranslateX}%) scale(1.15)`,
                }}
                sizes="(max-width: 768px) 100vw, 60vw"
                priority={isActive}
              />
              <div
                className={`absolute inset-0 bg-black pointer-events-none transition-opacity duration-700 ease-out ${isActive ? "opacity-0" : "opacity-60 group-hover:opacity-30"}`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
