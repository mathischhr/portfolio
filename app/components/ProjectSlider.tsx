"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Fonction pour assombrir la couleur
const darkenColor = (hex: string, amount: number) => {
  let color = hex.replace("#", "");
  let num = parseInt(color, 16);
  let r = (num >> 16) - amount;
  let g = ((num >> 8) & 0x00FF) - amount;
  let b = (num & 0x0000FF) - amount;
  return "#" + (
    0x1000000 +
    (r < 0 ? 0 : r) * 0x10000 +
    (g < 0 ? 0 : g) * 0x100 +
    (b < 0 ? 0 : b)
  ).toString(16).slice(1);
};

interface Project {
  id: string | number;
  image: string;
  title: string;
  textColor: string;
  [key: string]: any;
}

interface ProjectSliderProps {
  projects: Project[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  isExploring: boolean;
  setIsExploring: (val: boolean) => void;
}

export default function ProjectSlider({
  projects,
  activeIndex,
  setActiveIndex,
  isExploring,
  setIsExploring,
}: ProjectSliderProps) {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const startX = useRef<number>(0);
  const isDragging = useRef<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // --- LA MODIFICATION EST ICI ---
  // On récupère la couleur du projet et on la fonce de 160 pour le fond
  const currentBgColor = projects[activeIndex]?.textColor 
    ? darkenColor(projects[activeIndex].textColor, 160) 
    : "#000000";

  useGSAP(() => {
    if (!isExploring) {
      gsap.fromTo(sliderRef.current, 
        { opacity: 0, y: 15 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.4, 
          ease: "power2.out",
          overwrite: true 
        }
      );
    }
  }, { dependencies: [isExploring] });

  useEffect(() => {
    const handleResize = (): void => {
      setIsMobile(window.innerWidth < 768);
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile || isExploring || !scrollContainerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveIndex(Number(entry.target.getAttribute("data-index")));
          }
        });
      },
      { threshold: 0.6 }
    );
    const cards = scrollContainerRef.current.querySelectorAll(".project-card");
    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, [isMobile, isExploring, setActiveIndex]);

  const handleExplore = (): void => {
    if (isMobile) {
      gsap.to(sliderRef.current, {
        opacity: 0,
        y: -15,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => setIsExploring(true)
      });
    } else {
      setIsExploring(true);
    }
  };

  const onMouseDown = (e: React.MouseEvent): void => {
    if (isMobile || isExploring) return;
    isDragging.current = true;
    startX.current = e.clientX;
  };

  const onMouseMove = (e: React.MouseEvent): void => {
    if (!isDragging.current) return;
    const currentX = e.clientX;
    setDragOffset(currentX - startX.current);
  };

  const onMouseUp = (): void => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const threshold = 100;
    if (dragOffset < -threshold && activeIndex < projects.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else if (dragOffset > threshold && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
    setDragOffset(0);
  };

  // --- MOBILE ---
  if (isMobile) {
    return (
      <div
        ref={sliderRef}
        style={{ 
          display: isExploring ? 'none' : 'block',
          opacity: 0,
          backgroundColor: currentBgColor,
          transition: "background-color 0.8s ease"
        }}
        className="fixed inset-0 w-full h-screen overflow-y-auto z-30 snap-y snap-mandatory px-6 pt-32 pb-40 no-scrollbar"
      >
        <div ref={scrollContainerRef}>
          {projects.map((proj, idx) => (
            <div key={proj.id} data-index={idx} className="project-card flex flex-col gap-6 mb-32 snap-center shrink-0">
              <div className="relative w-full h-[50vh] rounded-2xl overflow-hidden shadow-2xl">
                <Image src={proj.image} alt={proj.title} fill className="object-cover" sizes="95vw" priority={idx === 0} />
              </div>
              <div className="flex flex-col gap-4 px-2">
                <h2 className="font-black uppercase tracking-tighter text-4xl leading-none text-white">{proj.title}</h2>
                <button 
                  onClick={handleExplore} 
                  className="w-fit font-bold uppercase text-[12px] tracking-widest border-b-2 pb-1 text-white border-white"
                >
                  Explore +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // --- PC ---
  if (!isMobile && isExploring) return null;

  return (
    <div
      ref={sliderRef}
      style={{ 
        opacity: 0,
        backgroundColor: currentBgColor,
        transition: "background-color 0.8s ease"
      }}
      className={`absolute inset-0 h-full w-full flex items-center justify-center z-10 select-none cursor-grab active:cursor-grabbing ${
        isExploring ? "pointer-events-none" : ""
      }`}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      {projects.map((proj, index) => {
        const offset = index - activeIndex;
        const xPos = offset * (windowWidth * 0.4) + dragOffset;
        
        if (Math.abs(offset) > 2) return null;
        
        return (
          <div
            key={proj.id}
            className="absolute shadow-2xl rounded-xl bg-zinc-900 overflow-hidden"
            style={{
              width: "35vw",
              height: "48vh",
              left: "50%",
              top: "50%",
              transition: isDragging.current ? "none" : "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.6s",
              transform: `translate(calc(-50% + ${xPos}px), -50%) scale(${offset === 0 ? 1 : 0.8})`,
              opacity: offset === 0 ? 1 : 0.2,
              zIndex: offset === 0 ? 20 : 10,
              pointerEvents: "none",
            }}
          >
            <Image 
              src={proj.image} 
              alt={proj.title} 
              fill 
              className="object-cover" 
              draggable={false} 
              priority={Math.abs(offset) <= 1}
            />
          </div>
        );
      })}
    </div>
  );
}