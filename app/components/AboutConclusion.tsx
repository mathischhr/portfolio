"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutConclusion({ lang }: { lang: "fr" | "en" }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Rotation de l'étoile
      gsap.to(".star-svg", {
        rotate: 360,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Marquee
      gsap.to(".marquee-track", {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1,
      });

      // PETITE ANIMATION TAPE À L'OEIL : Le bouton flotte doucement
      gsap.to(".cv-btn", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    },
    { scope: containerRef }
  );

  const marqueeContent = (
    <>
      <span className="pr-8 md:pr-12">{lang === "fr" ? "Pilotage de projets —" : "Project Management —"}</span>
      <span className="pr-8 md:pr-12 text-[#8ea522]">{lang === "fr" ? "Stratégie de Communication —" : "Communication Strategy —"}</span>
      <span className="pr-8 md:pr-12">{lang === "fr" ? "Identité de marque —" : "Brand Identity —"}</span>
      <span className="pr-8 md:pr-12 text-[#8ea522]">{lang === "fr" ? "Éditorial & Social Media —" : "Editorial & Social Media —"}</span>
    </>
  );

  return (
    <section ref={containerRef} className="relative w-full py-32 md:py-48 overflow-hidden flex flex-col items-center justify-center bg-[#EBE9E0]">
      
      {/* Étoile en fond */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05] pointer-events-none">
        <svg className="star-svg w-[100vw] h-[100vw] md:w-[50vw] md:h-[50vw]" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 0L53.5 35.5L85.5 14.5L64.5 46.5L100 50L64.5 53.5L85.5 85.5L53.5 64.5L50 100L46.5 64.5L14.5 85.5L35.5 53.5L0 50L35.5 46.5L14.5 14.5L46.5 35.5L50 0Z" />
        </svg>
      </div>

      <p className="relative z-10 font-mono text-[10px] uppercase tracking-[0.3em] mb-12 opacity-60">
        {lang === "fr" ? "Disponible pour de nouveaux défis" : "Available for new challenges"}
      </p>

      {/* Marquee */}
      <div className="w-full relative z-10 flex overflow-hidden mix-blend-difference text-white py-4">
        <div className="marquee-track flex whitespace-nowrap text-[15vw] md:text-[9vw] font-black uppercase tracking-tighter leading-none">
          {marqueeContent}
          {marqueeContent}
        </div>
      </div>

      {/* ZONE CV - Équilibrée mais Flashy */}
      <div className="relative z-20 mt-20 flex flex-col items-center gap-10">
        
        <a
          href="/cv-mathis-chhour.pdf"
          download="CV_Mathis_Chhour.pdf"
          className="cv-btn group relative flex items-center justify-center px-10 py-5 bg-[#8ea522] rounded-full transition-transform hover:scale-110 active:scale-95 shadow-[0_10px_30px_rgba(142,165,34,0.3)]"
        >
          <span className="relative z-10 flex items-center gap-3 font-mono text-xs md:text-sm font-bold uppercase tracking-widest text-white">
            {lang === "fr" ? "Télécharger mon CV" : "Download my CV"}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          </span>
          
          {/* Cercle d'expansion au survol */}
          <div className="absolute inset-0 bg-zinc-900 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-in-out"></div>
        </a>
        
        <a href="mailto:votre-email@exemple.com" className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors border-b border-transparent hover:border-zinc-900 pb-1">
          {lang === "fr" ? "Me contacter par mail" : "Contact me by email"}
        </a>
      </div>
    </section>
  );
}