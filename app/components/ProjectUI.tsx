"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

interface ProjectUIProps {
  project: any;
  projects: any[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  lang: string;
  isExploring: boolean;
  setIsExploring: (val: boolean) => void;
}

export default function ProjectUI({
  project,
  projects,
  activeIndex,
  setActiveIndex,
  lang,
  isExploring,
  setIsExploring,
}: ProjectUIProps) {
  const container = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useGSAP(
    () => {
      if (!container.current || !project) return;
      const chars = container.current.querySelectorAll(".char");
      gsap.fromTo(
        chars,
        { y: "110%" },
        { y: "0%", duration: 1.2, stagger: 0.02, ease: "power4.out" }
      );
    },
    { scope: container, dependencies: [project?.id, isExploring] }
  );

  if (!project) return null;

  return (
    <div
      ref={container}
      className={`z-40 w-full ${
        isMobile
          ? isExploring ? "relative" : "fixed inset-0 overflow-hidden pointer-events-auto"
          : "absolute inset-0 pointer-events-none"
      }`}
    >
      {/* ================= BOUTON RETOUR (PC SEULEMENT) ================= */}
      {!isMobile && (
        <div className="absolute top-12 left-1/2 -translate-x-1/2 z-[999] pointer-events-auto">
          <button
            onClick={() => setIsExploring(false)}
            className={`flex flex-col items-center cursor-pointer group transition-all duration-700 ${
              isExploring ? "opacity-100 scale-100" : "opacity-0 -translate-y-10 pointer-events-none"
            }`}
            style={{ color: project.textColor }}
          >
            <span className="text-4xl leading-none transition-transform duration-500 group-hover:rotate-90">×</span>
            <div className="w-[1px] h-10 bg-current opacity-40 my-2 transition-all duration-500 group-hover:h-14"></div>
            <span className="font-bold text-[10px] uppercase tracking-widest">{lang === "fr" ? "Retour" : "Back"}</span>
          </button>
        </div>
      )}

      {/* ================= IMAGE PRINCIPALE (PC SEULEMENT) ================= */}
      {!isMobile && isExploring && (
        <div 
          className="absolute right-[12%] top-1/2 -translate-y-1/2 w-[38vw] h-[48vh] overflow-hidden rounded-sm shadow-2xl transition-all duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] pointer-events-auto"
        >
          <Image 
            src={project.image} 
            alt={project.title} 
            fill 
            className="object-cover"
            sizes="50vw"
            priority
            quality={90}
          />
        </div>
      )}

      {/* ================= CONTENU (TEXTE + INFOS) ================= */}
      <div
        className={`flex flex-col transition-all duration-[1200ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isMobile ? "relative w-full items-center text-center px-6 pt-40 gap-10" : "absolute"
        }`}
        style={!isMobile ? {
          top: "50%",
          left: isExploring ? "10%" : "50%",
          transform: isExploring ? "translateY(-50%)" : "translate(-50%, -50%)",
          width: isExploring ? "35vw" : "100%",
          alignItems: isExploring ? "flex-start" : "center",
        } : undefined}
      >
        {/* TITRE RÉDUIT */}
        <h1
          key={project.id}
          className="font-black uppercase tracking-tighter leading-[0.85] select-none"
          style={{
            color: project.textColor,
            fontSize: isExploring 
              ? (isMobile ? "10vw" : "5.5vw") 
              : (isMobile ? "13vw" : "11vw"),
          }}
        >
          {project.title.split("").map((char: string, i: number) => (
            <span key={i} className="inline-flex overflow-hidden pb-2">
              <span className="char inline-block">{char === " " ? "\u00A0" : char}</span>
            </span>
          ))}
        </h1>

        {/* INFOS + DESCRIPTION */}
        <div
          className={`flex flex-col gap-8 transition-all duration-700 ${
            isExploring ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 invisible"
          }`}
          style={{ color: project.textColor }}
        >
          <p className="text-[11px] font-mono uppercase tracking-wider max-w-sm leading-relaxed opacity-80 mx-auto md:mx-0">
            {lang === "fr" ? project.descFr : project.descEn}
          </p>

          <div className="flex flex-wrap gap-6 justify-center md:justify-start">
            {["date", "client", "role"].map((key) => (
              <div key={key} className="flex flex-col">
                <span className="text-[8px] uppercase opacity-50 font-bold tracking-widest">{key}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider">{project[key]}</span>
              </div>
            ))}
          </div>

          {/* SECTION MOBILE EXPLORE */}
          {isMobile && isExploring && (
            <div className="flex flex-col items-center gap-12 w-full mt-4">
              <div className="w-full overflow-hidden rounded-md shadow-2xl">
                <Image src={project.image} alt={project.title} width={800} height={500} className="w-full h-auto object-cover" quality={90} />
              </div>

              <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group pointer-events-auto">
                <span className="text-3xl mb-2 transition-transform group-hover:-translate-y-1">↗</span>
                <span className="font-bold border-b border-current text-[10px] uppercase tracking-widest">
                  {lang === "fr" ? "Visiter le projet" : "Visit Project"}
                </span>
              </a>

              <div className="w-screen relative left-1/2 -translate-x-1/2 mt-4 pointer-events-auto">
                <div className="flex flex-row gap-4 overflow-x-auto px-10 no-scrollbar pb-4" style={{ scrollbarWidth: "none" }}>
                  {projects?.map((proj: any, idx: number) => (
                    <button
                      key={proj.id}
                      onClick={() => {
                        setActiveIndex(idx);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`relative flex-shrink-0 overflow-hidden w-28 h-16 rounded-sm transition-all duration-500 ${
                        activeIndex === idx ? "ring-2 ring-current ring-offset-4 scale-105" : "opacity-40"
                      }`}
                    >
                      <Image src={proj.image} alt={proj.title} fill className="object-cover" sizes="120px" />
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={() => setIsExploring(false)} className="flex flex-col items-center group pointer-events-auto pb-20">
                <div className="w-[1px] h-10 bg-current opacity-40 mb-2 transition-all duration-500 group-active:h-14"></div>
                <span className="text-4xl leading-none transition-transform duration-500 group-active:rotate-90">×</span>
                <span className="font-bold text-[10px] uppercase mt-2 tracking-widest">{lang === "fr" ? "Retour" : "Back"}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ================= BOUTONS FIXES PC (EXPLORE / VISITE) ================= */}
      {!isMobile && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 pointer-events-auto z-[120]" style={{ color: project.textColor }}>
          {!isExploring ? (
            <button onClick={() => setIsExploring(true)} className="flex flex-col items-center group">
              <span className="text-3xl transition-transform duration-500 group-hover:rotate-90">+</span>
              <div className="w-[1px] h-10 bg-current opacity-40 my-2 transition-all duration-500 group-hover:h-14"></div>
              <span className="font-bold text-[10px] uppercase tracking-widest">Explore</span>
            </button>
          ) : (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group">
              <span className="text-3xl mb-1 transition-transform group-hover:-translate-y-1">↗</span>
              <span className="font-bold border-b border-current text-[10px] uppercase tracking-widest">
                {lang === "fr" ? "Visiter le projet" : "Visit Project"}
              </span>
            </a>
          )}
        </div>
      )}

      {/* ================= BOUTON EXPLORE MOBILE (ACCUEIL) ================= */}
      {isMobile && !isExploring && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 pointer-events-auto">
          <button onClick={() => setIsExploring(true)} className="flex flex-col items-center group" style={{ color: project.textColor }}>
            <span className="text-3xl transition-transform duration-500 group-active:rotate-90">+</span>
            <div className="w-[1px] h-10 bg-current opacity-40 my-2 transition-all duration-500 group-active:h-14"></div>
            <span className="font-bold text-[10px] uppercase tracking-widest">Explore</span>
          </button>
        </div>
      )}
    </div>
  );
}