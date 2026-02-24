"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { projectsData } from "../data/projectsData";
import ProjectUI from "../components/ProjectUI";
import ProjectSlider from "../components/ProjectSlider";
import Image from "next/image";

export default function ProjectsPage() {
  const { lang } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExploring, setIsExploring] = useState(false);

  const activeProject = projectsData ? projectsData[activeIndex] : null;

  // === SYNC COULEUR NAV ===
  useEffect(() => {
    if (activeProject) {
      document.documentElement.style.setProperty(
        "--project-color",
        activeProject.textColor,
      );
    }
  }, [activeProject]);

  useEffect(() => {
    let isThrottled = false;
    let timeout: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      if (isExploring || isThrottled) return;
      const threshold = 30;

      if (e.deltaY > threshold || e.deltaX > threshold) {
        setActiveIndex((prev) => Math.min(prev + 1, projectsData.length - 1));
        isThrottled = true;
      } else if (e.deltaY < -threshold || e.deltaX < -threshold) {
        setActiveIndex((prev) => Math.max(prev - 1, 0));
        isThrottled = true;
      }

      if (isThrottled) {
        timeout = setTimeout(() => {
          isThrottled = false;
        }, 1200);
      }
    };

    window.addEventListener("wheel", handleWheel);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      clearTimeout(timeout);
    };
  }, [isExploring]);

  if (!activeProject) return null;

  return (
    <main
      className="relative w-screen h-screen overflow-hidden transition-colors duration-[1200ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
      style={{ backgroundColor: activeProject.bgColor }}
    >
      {/* PAGINATION : Masquée en mode Explore */}
      {!isExploring && (
        <div
          className="absolute top-28 md:top-32 left-1/2 -translate-x-1/2 flex items-center gap-4 font-mono text-xs opacity-70 z-50 pointer-events-none transition-opacity duration-500"
          style={{ color: activeProject.textColor }}
        >
          <span>0{activeIndex + 1}</span>
          <div className="w-16 md:w-24 h-[1px] bg-current opacity-30 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-current transition-all duration-[1200ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
              style={{
                width: `${((activeIndex + 1) / projectsData.length) * 100}%`,
              }}
            ></div>
          </div>
          <span>0{projectsData.length}</span>
        </div>
      )}

      <ProjectUI
        project={activeProject}
        lang={lang}
        isExploring={isExploring}
        setIsExploring={setIsExploring}
      />

      <ProjectSlider
        projects={projectsData}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        isExploring={isExploring}
      />

      {/* MINIATURES LATÉRALES */}
      <div
        className={`absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-4 p-8 h-[80vh] overflow-y-auto z-50 transition-all duration-[1200ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isExploring
            ? "translate-x-0 opacity-100 pointer-events-auto"
            : "translate-x-full opacity-0 pointer-events-none"
        }`}
        style={{ scrollbarWidth: "none" }}
      >
        {projectsData.map((proj, idx) => (
          <button
            key={proj.id}
            onClick={() => setActiveIndex(idx)}
            className={`relative w-24 h-16 md:w-32 md:h-20 flex-shrink-0 overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 ${activeIndex === idx ? "border-2" : "opacity-50 hover:opacity-100"}`}
            style={{ borderColor: activeProject.textColor }}
          >
            <Image
              src={proj.image}
              alt={proj.title}
              fill
              className="object-cover"
              sizes="150px"
            />
          </button>
        ))}
      </div>
    </main>
  );
}
