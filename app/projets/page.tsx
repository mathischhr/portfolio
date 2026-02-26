"use client";
import { useEffect, useState, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import { projectsData } from "../data/projectsData";
import ProjectUI from "../components/ProjectUI";
import ProjectSlider from "../components/ProjectSlider";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function ProjectsPage() {
  const { lang } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExploring, setIsExploring] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const mainRef = useRef(null);

  const activeProject = projectsData ? projectsData[activeIndex] : null;

  useGSAP(() => {
    gsap.fromTo(mainRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 1, ease: "power2.out" }
    );
  }, { scope: mainRef });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (activeProject) {
      document.documentElement.style.setProperty("--project-color", activeProject.textColor);
      document.documentElement.setAttribute("data-project-index", (activeIndex + 1).toString());
    }
  }, [activeProject, activeIndex]);

  useEffect(() => {
    let isThrottled = false;
    const handleWheel = (e: WheelEvent) => {
      if (isExploring || isThrottled) return;
      const threshold = 30;
      if (Math.abs(e.deltaY) > threshold || Math.abs(e.deltaX) > threshold) {
        if (e.deltaY > 0 || e.deltaX > 0) setActiveIndex((p) => Math.min(p + 1, projectsData.length - 1));
        else setActiveIndex((p) => Math.max(p - 1, 0));
        isThrottled = true;
        setTimeout(() => { isThrottled = false; }, 1200);
      }
    };
    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isExploring]);

  if (!activeProject) return null;

  return (
    <main 
      ref={mainRef}
      className={`relative w-screen h-screen transition-colors duration-[1200ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${isExploring ? "overflow-y-auto" : "overflow-hidden"}`} 
      style={{ backgroundColor: activeProject.bgColor }}
    >
      
      {/* PAGINATION PC */}
      {!isExploring && !isMobile && (
        <div className="absolute top-32 left-1/2 -translate-x-1/2 flex items-center gap-4 font-mono text-xs opacity-70 z-50 pointer-events-none" style={{ color: activeProject.textColor }}>
          <span>0{activeIndex + 1}</span>
          <div className="w-24 h-[1px] bg-current opacity-30 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full bg-current transition-all duration-[1200ms]" style={{ width: `${((activeIndex + 1) / projectsData.length) * 100}%` }}></div>
          </div>
          <span>0{projectsData.length}</span>
        </div>
      )}

      <ProjectUI project={activeProject} lang={lang} isExploring={isExploring} setIsExploring={setIsExploring} />
      <ProjectSlider projects={projectsData} activeIndex={activeIndex} setActiveIndex={setActiveIndex} isExploring={isExploring} setIsExploring={setIsExploring} />

      {/* MINIATURES PC - STYLE RACCORCI ET DÉFILANT */}
      <div className={`fixed right-8 top-1/2 -translate-y-1/2 z-50 transition-all duration-[1000ms] hidden md:flex ${isExploring ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10 pointer-events-none"}`}>
        <div className="bg-black/20 backdrop-blur-md p-3 rounded-2xl border border-white/10 max-h-[45vh] flex flex-col">
          <div className="flex flex-col gap-3 overflow-y-auto no-scrollbar py-1 px-1" style={{ scrollbarWidth: "none" }}>
            {projectsData.map((proj, idx) => (
              <button 
                key={proj.id} 
                onClick={() => setActiveIndex(idx)} 
                className={`relative overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 w-24 h-14 shrink-0 rounded-lg ${activeIndex === idx ? "ring-2 ring-offset-2 ring-white" : "opacity-40 hover:opacity-100"}`}
                style={{ borderColor: activeIndex === idx ? activeProject.textColor : "transparent" }}
              >
                <Image src={proj.image} alt={proj.title} fill className="object-cover" sizes="100px" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}