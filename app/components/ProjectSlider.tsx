"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function ProjectSlider({
  projects,
  activeIndex,
  setActiveIndex,
  isExploring,
}: any) {
  const [isMobile, setIsMobile] = useState(false);
  const startX = useRef(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleStart = (e: any) => {
    startX.current = e.clientX || (e.touches && e.touches[0].clientX);
  };

  const handleEnd = (e: any) => {
    const endX = e.clientX || (e.changedTouches && e.changedTouches[0].clientX);
    const diff = startX.current - endX;
    if (isExploring || Math.abs(diff) < 50) return;
    if (diff > 0 && activeIndex < projects.length - 1) setActiveIndex(activeIndex + 1);
    else if (diff < 0 && activeIndex > 0) setActiveIndex(activeIndex - 1);
  };

  // MODIFICATION ICI : On cache le slider pour PC ET Mobile quand on explore
  // car l'image est maintenant gérée par ProjectUI uniquement
  if (isExploring) return null;

  return (
    <div
      className="absolute inset-0 h-full w-full overflow-hidden flex items-center justify-center z-10 select-none"
      onMouseDown={handleStart}
      onMouseUp={handleEnd}
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
    >
      {projects.map((proj: any, index: number) => {
        const offset = index - activeIndex;
        const isActive = offset === 0;
        
        // Espacement réduit comme demandé (75 -> 70 et 45 -> 40)
        const translateX = isMobile ? offset * 70 : offset * 40;
        const opacity = Math.abs(offset) > 1 ? 0 : isActive ? 1 : 0.4;

        return (
          <div
            key={proj.id}
            className="transition-all duration-[1200ms] ease-[cubic-bezier(0.76,0,0.24,1)] shadow-2xl absolute"
            style={{
              width: isMobile ? "80vw" : "40vw",
              height: isMobile ? "30vh" : "40vh",
              top: "50%",
              left: "50%",
              transform: `translate(calc(-50% + ${translateX}vw), -50%) scale(${isActive ? 1 : 0.8})`,
              opacity: opacity,
              zIndex: isActive ? 20 : 10,
              visibility: opacity === 0 ? "hidden" : "visible"
            }}
          >
            <div className="relative w-full h-full overflow-hidden bg-zinc-900 rounded-sm">
              <Image
                src={proj.image}
                alt={proj.title}
                fill
                className="object-cover"
                priority={isActive}
                sizes="(max-width: 768px) 80vw, 40vw"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}