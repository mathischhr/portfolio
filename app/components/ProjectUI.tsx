"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function ProjectUI({
  project,
  lang,
  isExploring,
  setIsExploring,
}: any) {
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
        {
          y: "0%",
          duration: 1.2,
          stagger: 0.02,
          ease: "power4.out",
        }
      );
    },
    { scope: container, dependencies: [project?.id, isExploring] }
  );

  if (!project) return null;

  return (
    <div
      ref={container}
      className={`
        z-40 w-full pointer-events-none
        ${isMobile
          ? "relative flex flex-col items-center overflow-x-hidden"
          : "absolute inset-0"}
      `}
    >
      {/* ================= RETOUR ================= */}

      <div
        className={`
          ${isMobile ? "fixed top-8" : "absolute top-12"}
          left-1/2 -translate-x-1/2
          z-[999] pointer-events-auto
        `}
      >
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsExploring(false);
          }}
          className={`
            flex flex-col items-center cursor-pointer group
            transition-all duration-700
            ${
              isExploring
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 -translate-y-10 scale-90 pointer-events-none"
            }
          `}
          style={{ color: project.textColor }}
        >
          <span className="text-4xl leading-none transition-transform duration-500 group-hover:rotate-90">
            ×
          </span>

          <div className="w-[1px] h-10 bg-current opacity-40 my-2 transition-all duration-500 group-hover:h-14"></div>

          <span className="font-bold text-[10px] uppercase tracking-widest">
            {lang === "fr" ? "Retour" : "Back"}
          </span>
        </button>
      </div>

      {/* ================= CONTENU ================= */}

      <div
        className={`
          flex flex-col transition-all duration-[1200ms]
          ease-[cubic-bezier(0.76,0,0.24,1)]
          
          ${
            isMobile
              ? "relative w-full items-center text-center gap-10 px-6 pt-36 pb-20"
              : "absolute"
          }
        `}
        style={
          !isMobile
            ? {
                top: isExploring ? "30%" : "58%",
                left: isExploring ? "10%" : "50%",
                transform: isExploring
                  ? "none"
                  : "translate(-50%, -50%)",
                width: isExploring ? "40vw" : "100%",
                alignItems: isExploring ? "flex-start" : "center",
              }
            : undefined
        }
      >
        {/* ===== TITRE ===== */}

        <h1
          key={project.id}
          className="font-black uppercase tracking-tighter leading-[0.85] select-none"
          style={{
            color: project.textColor,
            fontSize: isExploring
              ? isMobile
                ? "14vw"
                : "7vw"
              : isMobile
              ? "18vw"
              : "15vw",
          }}
        >
          {project.title.split("").map((char: string, i: number) => (
            <span key={i} className="inline-flex overflow-hidden pb-2">
              <span className="char inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            </span>
          ))}
        </h1>

        {/* ===== INFOS ===== */}

        <div
          className={`flex flex-col gap-6 transition-all duration-700 ${
            isExploring ? "opacity-100" : "opacity-0 invisible"
          }`}
          style={{ color: project.textColor }}
        >
          <p className="text-xs font-mono uppercase tracking-wider max-w-sm leading-relaxed opacity-80">
            {lang === "fr" ? project.descFr : project.descEn}
          </p>

          {/* VISIT MOBILE */}
          {isMobile && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center pointer-events-auto py-4 group"
            >
              <span className="text-3xl mb-1 transition-transform group-hover:-translate-y-1">
                ↗
              </span>
              <span className="font-bold border-b border-current text-[10px] uppercase">
                {lang === "fr" ? "Visiter le projet" : "Visit Project"}
              </span>
            </a>
          )}

          <div className="flex flex-wrap gap-6 justify-center md:justify-start">
            {["date", "client", "role"].map((key) => (
              <div key={key} className="flex flex-col">
                <span className="text-[8px] uppercase opacity-50 font-bold tracking-widest">
                  {key}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {project[key]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= EXPLORE / VISIT DESKTOP ================= */}

      <div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 pointer-events-auto z-[120]"
        style={{ color: project.textColor }}
      >
        {!isExploring ? (
          <button
            onClick={() => setIsExploring(true)}
            className="flex flex-col items-center group transition-all duration-500"
          >
            <span className="text-3xl transition-transform group-hover:rotate-90">
              +
            </span>

            <div className="w-[1px] h-10 bg-current opacity-40 my-2 transition-all group-hover:h-14"></div>

            <span className="font-bold text-[10px] uppercase tracking-widest">
              Explore
            </span>
          </button>
        ) : (
          !isMobile && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group"
            >
              <span className="text-3xl mb-1 transition-transform group-hover:-translate-y-1">
                ↗
              </span>
              <span className="font-bold border-b border-current text-[10px] uppercase">
                {lang === "fr"
                  ? "Visiter le projet"
                  : "Visit Project"}
              </span>
            </a>
          )
        )}
      </div>
    </div>
  );
}