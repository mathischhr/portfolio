"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

interface Project {
  id: string | number;
  image: string;
  title: string;
}

interface ProjectSliderProps {
  projects: Project[];
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
  const [isMobile, setIsMobile] = useState(false);
  const [dragOffset, setDragOffset] = useState(0); 
  const startX = useRef<number>(0);
  const isDragging = useRef<boolean>(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Début du toucher / clic
  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (isExploring) return;
    isDragging.current = true;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    startX.current = clientX;
  };

  // Mouvement du doigt / souris
  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current || isExploring) return;
    
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const diff = clientX - startX.current;

    // Calcul de la résistance pour que le mouvement soit fluide (en vw)
    const moveInVW = (diff / window.innerWidth) * 100;
    setDragOffset(moveInVW);
  };

  // Fin du toucher / clic
  const handleEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    // Seuil de déclenchement : si on a glissé de plus de 10vw
    if (dragOffset < -10 && activeIndex < projects.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else if (dragOffset > 10 && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }

    setDragOffset(0); // Retour à la position normale
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
      {projects.map((proj, index) => {
        const offset = index - activeIndex;
        const isActive = offset === 0;
        
        // Position de base + ce que le doigt déplace
        const baseTranslate = isMobile ? offset * 75 : offset * 45;
        const finalTranslate = baseTranslate + dragOffset;
        
        // On cache ce qui est trop loin
        const opacity = Math.abs(offset) > 1 ? 0 : isActive ? 1 : 0.4;

        return (
          <div
            key={proj.id}
            className={`absolute shadow-2xl transition-transform ${
              !isDragging.current ? "duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)]" : "duration-0"
            }`}
            style={{
              width: isMobile ? "85vw" : "40vw",
              height: isMobile ? "35vh" : "45vh",
              top: "50%",
              left: "50%",
              // On utilise finalTranslate pour que l'image bouge avec le doigt
              transform: `translate(calc(-50% + ${finalTranslate}vw), -50%) scale(${isActive ? 1 : 0.85})`,
              opacity: opacity,
              zIndex: isActive ? 20 : 10,
              visibility: opacity === 0 ? "hidden" : "visible",
              pointerEvents: "none", // Empêche l'image de bloquer le swipe du parent
            }}
          >
            <div className="relative w-full h-full overflow-hidden bg-zinc-900 rounded-lg">
              <Image
                src={proj.image}
                alt={proj.title}
                fill
                className="object-cover"
                priority={isActive}
                sizes="(max-width: 768px) 85vw, 40vw"
                draggable={false}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}