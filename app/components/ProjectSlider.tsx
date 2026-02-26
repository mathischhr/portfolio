"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

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
  const [isMobile, setIsMobile] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const startX = useRef<number>(0);
  const isDragging = useRef<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
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

  const onMouseDown = (e: React.MouseEvent) => {
    if (isMobile || isExploring) return;
    isDragging.current = true;
    startX.current = e.clientX;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const currentX = e.clientX;
    setDragOffset(currentX - startX.current);
  };

  const onMouseUp = () => {
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

  if (isExploring && isMobile) return null;

  if (isMobile) {
    return (
      <div
        ref={scrollContainerRef}
        className="fixed inset-0 w-full h-screen overflow-y-auto bg-black z-30 snap-y snap-mandatory px-6 pt-32 pb-40 no-scrollbar"
      >
        {projects.map((proj, idx) => (
          <div key={proj.id} data-index={idx} className="project-card flex flex-col gap-6 mb-32 snap-center shrink-0">
            <div className="relative w-full h-[50vh] rounded-2xl overflow-hidden shadow-2xl">
              <Image src={proj.image} alt={proj.title} fill className="object-cover" sizes="95vw" priority={idx === 0} />
            </div>
            <div className="flex flex-col gap-4 px-2">
              <h2 className="font-black uppercase tracking-tighter text-4xl leading-none" style={{ color: proj.textColor }}>{proj.title}</h2>
              <button onClick={() => setIsExploring(true)} className="w-fit font-bold uppercase text-[12px] tracking-widest border-b-2 pb-1" style={{ color: proj.textColor, borderColor: proj.textColor }}>Explore +</button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`absolute inset-0 h-full w-full flex items-center justify-center z-10 select-none cursor-grab active:cursor-grabbing transition-opacity duration-1000 ${
        isExploring ? "opacity-0 pointer-events-none" : "opacity-100"
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
              transition: isDragging.current ? "none" : "transform 1s cubic-bezier(0.23, 1, 0.32, 1), opacity 1s",
              transform: `translate(calc(-50% + ${xPos}px), -50%) scale(${offset === 0 ? 1 : 0.8})`,
              opacity: offset === 0 ? 1 : 0.2,
              zIndex: offset === 0 ? 20 : 10,
              pointerEvents: "none",
            }}
          >
            <Image src={proj.image} alt={proj.title} fill className="object-cover" draggable={false} />
          </div>
        );
      })}
    </div>
  );
}