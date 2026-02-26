"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function ProjectSlider({ projects, activeIndex, setActiveIndex, isExploring }: any) {
  const [isMobile, setIsMobile] = useState(false);
  const [dragOffset, setDragOffset] = useState(0); // Pour le mouvement en direct
  const startX = useRef(0);
  const isDragging = useRef(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleStart = (e: any) => {
    isDragging.current = true;
    startX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };

  const handleMove = (e: any) => {
    if (!isDragging.current || isExploring) return;
    const currentX = e.touches ? e.touches[0].clientX : e.clientX;
    const diff = currentX - startX.current;
    
    // On divise par 10 pour que le mouvement soit proportionnel à l'écran (en vw)
    setDragOffset(diff / 10); 
  };

  const handleEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    // Si on a glissé de plus de 5 unités (environ 50px)
    if (dragOffset < -5 && activeIndex < projects.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else if (dragOffset > 5 && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }

    setDragOffset(0); // On remet à zéro pour l'animation finale
  };

  if (isExploring) return null;

  return (
    <div
      className="absolute inset-0 h-full w-full overflow-hidden flex items-center justify-center z-10 touch-none select-none"
      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
    >
      {projects.map((proj: any, index: number) => {
        const offset = index - activeIndex;
        const isActive = offset === 0;
        
        // On ajoute le dragOffset au calcul du déplacement
        const baseTranslate = isMobile ? offset * 70 : offset * 40;
        const finalTranslate = baseTranslate + dragOffset;
        
        const opacity = Math.abs(offset) > 1 ? 0 : isActive ? 1 : 0.4;

        return (
          <div
            key={proj.id}
            className={`absolute shadow-2xl ${!isDragging.current ? "transition-all duration-700 ease-out" : ""}`}
            style={{
              width: isMobile ? "80vw" : "40vw",
              height: isMobile ? "30vh" : "40vh",
              top: "50%",
              left: "50%",
              transform: `translate(calc(-50% + ${finalTranslate}vw), -50%) scale(${isActive ? 1 : 0.85})`,
              opacity: opacity,
              zIndex: isActive ? 20 : 10,
              visibility: opacity === 0 ? "hidden" : "visible",
            }}
          >
            <div className="relative w-full h-full overflow-hidden bg-zinc-900 rounded-sm pointer-events-none">
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