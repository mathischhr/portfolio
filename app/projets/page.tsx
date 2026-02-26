"use client";
import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { projectsData } from "../data/projectsData";
import ProjectUI from "../components/ProjectUI";
import ProjectSlider from "../components/ProjectSlider";
import Image from "next/image";
import Link from "next/link";

export default function ProjectsPage() {
  const { lang } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExploring, setIsExploring] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const activeProject = projectsData ? projectsData[activeIndex] : null;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (activeProject) {
      document.documentElement.style.setProperty("--project-color", activeProject.textColor);
    }
  }, [activeProject]);

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
    <main className={`relative w-screen h-screen transition-colors duration-[1200ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${isExploring ? "overflow-y-auto" : "overflow-hidden"}`} style={{ backgroundColor: activeProject.bgColor }}>
      
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

      {/* --- NAV PILULE MOBILE EN HAUT --- */}
      {!isExploring && isMobile && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-[420px]">
          <div className="bg-white rounded-full py-3 px-6 flex items-center justify-between shadow-xl border border-black/5">
            {/* Logo à gauche */}
            <Link href="/" className="font-black text-lg tracking-tighter text-black">
              MC<span style={{ color: activeProject.textColor }}>.</span>
            </Link>

            {/* Pagination au centre */}
            <div className="flex items-center gap-3">
               <span className="text-xs font-black text-black">0{activeIndex + 1}</span>
               <div className="w-6 h-[1.5px] bg-zinc-100 relative overflow-hidden">
                  <div className="absolute inset-y-0 left-0 transition-all duration-500" style={{ width: `${((activeIndex + 1) / projectsData.length) * 100}%`, backgroundColor: activeProject.textColor }} />
               </div>
               <span className="text-[9px] font-bold text-zinc-300">0{projectsData.length}</span>
            </div>

            {/* Liens à droite */}
            <div className="flex items-center gap-4">
              <Link href="/a-propos" className="text-[9px] font-black uppercase tracking-widest text-zinc-400 hover:text-black">
                {lang === "fr" ? "Moi" : "Me"}
              </Link>
            </div>
          </div>
        </div>
      )}

      <ProjectUI project={activeProject} lang={lang} isExploring={isExploring} setIsExploring={setIsExploring} />
      <ProjectSlider projects={projectsData} activeIndex={activeIndex} setActiveIndex={setActiveIndex} isExploring={isExploring} setIsExploring={setIsExploring} />

      {/* MINIATURES PC */}
      <div className={`transition-all duration-[1200ms] z-50 ${isExploring ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"} hidden md:flex md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 md:flex-col md:p-8`}>
        <div className="flex flex-col gap-4 overflow-y-auto no-scrollbar" style={{ scrollbarWidth: "none" }}>
          {projectsData.map((proj, idx) => (
            <button key={proj.id} onClick={() => setActiveIndex(idx)} className={`relative overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 w-32 h-20 ${activeIndex === idx ? "border-2" : "opacity-40 hover:opacity-100"}`} style={{ borderColor: activeProject.textColor }}>
              <Image src={proj.image} alt={proj.title} fill className="object-cover" sizes="150px" />
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}