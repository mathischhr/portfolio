"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface ProjectUIProps {
  project: any;
  isExploring: boolean;
  setIsExploring: (val: boolean) => void;
  lang: "fr" | "en";
}

export default function ProjectUI({
  project,
  isExploring,
  setIsExploring,
  lang,
}: ProjectUIProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!project) return;
    gsap.fromTo(
      ".char",
      { y: "110%", rotate: 3 },
      {
        y: "0%",
        rotate: 0,
        duration: 1.2,
        stagger: 0.03,
        ease: "power4.out",
        overwrite: true,
      },
    );
  }, [project?.id]);

  if (!project) return null;

  const titleLength = project.title.length;
  const dynamicFontSize = Math.min(22, 100 / titleLength);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex flex-col justify-between px-6 py-12 md:px-12 md:py-16 z-40 pointer-events-none"
    >
      {/* BOUTON TOP : PROJECTS */}
      <div
        className={`absolute top-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-[1200ms] pointer-events-auto cursor-pointer group ${isExploring ? "opacity-100 translate-y-0 delay-300" : "opacity-0 -translate-y-10 pointer-events-none"}`}
        onClick={() => setIsExploring(false)}
        style={{ color: project.textColor }}
      >
        <span className="text-2xl font-light transition-transform duration-500 group-hover:rotate-90">
          ×
        </span>
        <div className="w-[1px] h-6 bg-current opacity-40"></div>
        <span className="font-mono text-[10px] font-bold tracking-[0.2em] border-b border-current pb-1 uppercase">
          {lang === "fr" ? "Projets" : "Projects"}
        </span>
      </div>

      {/* TITRE + DESCRIPTION : Centré par défaut, Haut-Gauche en Explore */}
      <div
        className="absolute transition-all duration-[1200ms] ease-[cubic-bezier(0.76,0,0.24,1)] flex flex-col items-start opacity-90"
        style={{
          top: isExploring ? "15%" : "50%",
          left: isExploring ? "8%" : "50%",
          transform: isExploring ? "translate(0, 0)" : "translate(-50%, -50%)",
          width: isExploring ? "30vw" : "100%",
          padding: isExploring ? "0" : "0 3rem",
        }}
      >
        <h1
          key={project.id}
          // justify-center et gap contrôlé pour moins d'espacement
          className={`w-full flex font-black uppercase tracking-tighter leading-[0.85] select-none transition-all duration-[1200ms] ${isExploring ? "flex-wrap justify-start" : "justify-center gap-[1.5vw]"}`}
          style={{
            color: project.textColor,
            transform: "scaleY(1.15)",
            fontSize: isExploring ? "6vw" : `${dynamicFontSize}vw`,
          }}
        >
          {project.title.split(" ").map((word: string, wIndex: number) => (
            <span
              key={wIndex}
              className={`inline-flex ${isExploring ? "mr-[2vw]" : ""}`}
            >
              {word.split("").map((char: string, index: number) => (
                <span
                  key={index}
                  className="inline-flex overflow-hidden pb-4 -mb-4"
                >
                  <span className="char inline-block origin-bottom-left">
                    {char}
                  </span>
                </span>
              ))}
            </span>
          ))}
        </h1>

        {/* DESCRIPTION : Apparaît sous le titre */}
        <div
          className={`mt-8 transition-all duration-[1000ms] delay-500 max-w-sm ${isExploring ? "opacity-70 translate-y-0" : "opacity-0 translate-y-10"}`}
          style={{ color: project.textColor }}
        >
          <p className="text-sm md:text-base font-medium leading-relaxed font-mono uppercase tracking-wider">
            {lang === "fr" ? project.descFr : project.descEn}
          </p>
        </div>
      </div>

      <div className="flex-1"></div>

      {/* FOOTER */}
      <div
        className="relative flex flex-col md:flex-row justify-between items-start gap-8 md:gap-0 font-mono text-[10px] md:text-xs uppercase tracking-widest transition-colors duration-[1200ms] ease-in-out pointer-events-auto"
        style={{ color: project.textColor }}
      >
        <div className="w-full md:w-1/3 grid grid-cols-[80px_1fr] md:grid-cols-[100px_1fr] gap-y-2 opacity-80 leading-relaxed pt-2">
          <span className="opacity-50">
            {lang === "fr" ? "Date" : "Completed"}
          </span>{" "}
          <span>{project.date}</span>
          <span className="opacity-50">Role</span> <span>{project.role}</span>
          <span className="opacity-50">Client</span>{" "}
          <span>{project.client}</span>
        </div>

        <div className="w-full md:w-1/3 flex justify-center order-first md:order-none relative h-20">
          <button
            onClick={() => setIsExploring(true)}
            className={`absolute top-0 flex flex-col items-center cursor-pointer group transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${isExploring ? "opacity-0 translate-y-10 pointer-events-none" : "opacity-100 translate-y-0"}`}
          >
            <span className="relative pb-1 mb-3 font-bold tracking-[0.15em] uppercase text-xs">
              Explore
            </span>
            <div className="w-[1px] h-10 md:h-14 bg-current opacity-40 mb-2"></div>
            <div className="w-4 h-4 flex items-center justify-center transition-transform duration-500 group-hover:rotate-90">
              <span className="text-lg leading-none font-light translate-y-[1px]">
                +
              </span>
            </div>
          </button>

          <a
            href="#"
            className={`absolute top-4 flex flex-col items-center cursor-pointer group transition-all duration-700 delay-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${isExploring ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}
          >
            <div className="w-4 h-4 flex items-center justify-center mb-3 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
              <span className="text-xl leading-none font-light">↗</span>
            </div>
            <span className="relative font-bold tracking-[0.15em] border-b border-current pb-1 uppercase text-xs">
              {lang === "fr" ? "Visiter le projet" : "Visit Project"}
            </span>
          </a>
        </div>

        <div className="w-full md:w-1/3 text-left md:text-right opacity-80 flex flex-col md:items-end gap-2 leading-relaxed pt-2">
          <a href="#" className="hover:opacity-50 transition-opacity">
            Email
          </a>
          <a href="#" className="hover:opacity-50 transition-opacity">
            Instagram
          </a>
          <a href="#" className="hover:opacity-50 transition-opacity">
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
