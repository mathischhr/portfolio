"use client";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

export default function ProjectUI({
  project,
  lang,
  isExploring,
  setIsExploring,
}: any) {
  const container = useRef<HTMLDivElement>(null);
  const mobileContent = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleBack = () => {
    if (isMobile) {
      gsap.to(container.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          setIsExploring(false);
          window.scrollTo({ top: 0, behavior: "instant" });
        }
      });
    } else {
      setIsExploring(false);
    }
  };

  useGSAP(() => {
    if (!project) return;

    if (isMobile && isExploring) {
      gsap.fromTo(container.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.6, ease: "power2.out" }
      );
      gsap.fromTo(mobileContent.current, 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" }
      );
    } else if (!isMobile) {
      const chars = container.current?.querySelectorAll(".char");
      if (chars) {
        gsap.fromTo(chars, { y: "110%" }, { y: "0%", duration: 1.2, stagger: 0.02, ease: "power4.out", overwrite: true });
      }
    }
  }, { scope: container, dependencies: [project?.id, isExploring, isMobile] });

  if (!project) return null;
  if (isMobile && !isExploring) return null;

  const arrowIcon = "\u2197\uFE0E";

  return (
    <div ref={container} className={`z-[150] ${isMobile ? "fixed inset-0 overflow-y-auto" : "absolute inset-0 pointer-events-none"}`} 
         style={isMobile ? { backgroundColor: project.bgColor, opacity: 0 } : {}}>
      
      {/* --- DESIGN MOBILE (Titre SOUS l'image) --- */}
      {isMobile && (
        <div ref={mobileContent} className="relative flex flex-col w-full min-h-full pb-20">
          
          <div className="relative w-full h-[40vh] shadow-xl">
            <Image src={project.image} alt={project.title} fill className="object-cover" priority />
          </div>

          <div className="px-8 mt-10 relative z-10 flex flex-col">
            <h1 className="font-black uppercase tracking-tighter leading-[0.85]" 
                style={{ fontSize: "15vw", color: project.textColor }}>
              {project.title}
            </h1>

            <div className="w-16 h-1 mt-6" style={{ backgroundColor: project.textColor }} />

            <p className="mt-8 text-[12px] font-bold uppercase tracking-wider leading-relaxed opacity-90" 
                style={{ color: project.textColor }}>
              {lang === "fr" ? project.descFr : project.descEn}
            </p>

            <div className="mt-12 grid grid-cols-3 gap-4 border-t border-b py-6" style={{ borderColor: `${project.textColor}33` }}>
              <div className="flex flex-col text-left">
                <span className="text-[7px] uppercase font-bold opacity-50 mb-1" style={{ color: project.textColor }}>Date</span>
                <span className="text-[10px] font-black uppercase" style={{ color: project.textColor }}>{project.date}</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[7px] uppercase font-bold opacity-50 mb-1" style={{ color: project.textColor }}>Client</span>
                <span className="text-[10px] font-black uppercase" style={{ color: project.textColor }}>{project.client}</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[7px] uppercase font-bold opacity-50 mb-1" style={{ color: project.textColor }}>Role</span>
                <span className="text-[10px] font-black uppercase" style={{ color: project.textColor }}>{project.role}</span>
              </div>
            </div>

            <a href={project.link} target="_blank" 
               className="mt-12 py-5 flex items-center justify-center rounded-xl text-[11px] font-black uppercase tracking-[0.2em]"
               style={{ backgroundColor: project.textColor, color: project.bgColor }}>
              {lang === "fr" ? "Visiter le projet" : "Visit Project"} {arrowIcon}
            </a>
            
            <button onClick={handleBack} className="mt-8 text-[9px] font-black uppercase tracking-widest opacity-40 text-center" style={{ color: project.textColor }}>
              {lang === "fr" ? "← Retourner aux projets" : "← Back to projects"}
            </button>
          </div>
        </div>
      )}

      {/* --- DESIGN PC (Titre au CENTRE de l'image) --- */}
      {!isMobile && (
        <>
          <div className="fixed top-12 left-1/2 -translate-x-1/2 z-[100] pointer-events-auto">
            <button
              onClick={handleBack}
              className={`flex flex-col items-center group transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                isExploring ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-10 scale-90 pointer-events-none"
              }`}
              style={{ color: project.textColor }}
            >
              <span className="text-4xl leading-none transition-transform duration-500 group-hover:rotate-90">×</span>
              <div className="w-[1px] h-10 bg-current opacity-30 my-2 transition-all duration-500 group-hover:h-14"></div>
              <span className="font-bold text-[10px] uppercase tracking-widest">{lang === "fr" ? "Retour" : "Back"}</span>
            </button>
          </div>

          {isExploring && (
            <div className="absolute right-[20%] top-1/2 -translate-y-1/2 w-[35vw] h-[50vh] rounded-sm overflow-hidden pointer-events-auto shadow-2xl transition-all duration-700">
              <Image src={project.image} alt={project.title} fill className="object-cover" priority />
            </div>
          )}

          <div
            className="absolute transition-all duration-[1100ms] ease-[cubic-bezier(0.76,0,0.24,1)] flex flex-col z-[20]"
            style={{
              /* RÉGLAGE ICI : 50% en mode explore, 53% pour le descendre sur le slider */
              top: isExploring ? "50%" : "56%", 
              left: isExploring ? "8%" : "50%",
              transform: isExploring ? "translateY(-50%)" : "translate(-50%, -50%)",
              width: isExploring ? "38vw" : "100%",
              alignItems: isExploring ? "flex-start" : "center",
            }}
          >
            <h1
              key={project.id}
              className="font-black uppercase tracking-tighter leading-[0.9] flex flex-wrap justify-center md:justify-start"
              style={{ 
                color: project.textColor, 
                fontSize: isExploring ? "5.5vw" : "11vw",
                textAlign: isExploring ? "left" : "center"
              }}
            >
              {project.title.split(" ").map((word: string, i: number) => (
                <span key={i} className="inline-flex mr-[0.2em] overflow-hidden">
                  {word.split("").map((char: string, j: number) => (
                    <span key={j} className="char inline-block">{char}</span>
                  ))}
                </span>
              ))}
            </h1>

            <div className={`mt-10 flex flex-col gap-8 w-full transition-all duration-700 ${isExploring ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ color: project.textColor }}>
              <p className="text-[11px] font-mono uppercase tracking-widest max-w-sm opacity-80 leading-relaxed">
                {lang === "fr" ? project.descFr : project.descEn}
              </p>
              <div className="flex gap-8">
                {["date", "client", "role"].map(k => (
                  <div key={k} className="flex flex-col">
                    <span className="text-[8px] opacity-50 uppercase font-bold">{k}</span>
                    <span className="text-[10px] font-bold uppercase">{project[k]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 pointer-events-auto z-50">
            {!isExploring ? (
              <button onClick={() => setIsExploring(true)} className="flex flex-col items-center group" style={{ color: project.textColor }}>
                <span className="text-3xl transition-transform group-hover:rotate-90 duration-500">+</span>
                <div className="w-[1px] h-10 bg-current opacity-30 my-2 transition-all duration-500 group-hover:h-14"></div>
                <span className="font-bold text-[10px] uppercase tracking-widest">Explore</span>
              </button>
            ) : (
              <a href={project.link} target="_blank" className="flex flex-col items-center group" style={{ color: project.textColor }}>
                <span className="text-2xl mb-1 transition-transform group-hover:-translate-y-1">{arrowIcon}</span>
                <span className="font-bold border-b border-current text-[10px] uppercase tracking-widest">Visit Project</span>
              </a>
            )}
          </div>
        </>
      )}
    </div>
  );
}