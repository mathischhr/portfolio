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
      // Rotation de l'étoile au scroll
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

      // Animation du bandeau défilant (Marquee)
      gsap.to(".marquee-track", {
        xPercent: -50,
        ease: "none",
        duration: 20, // Légèrement plus lent pour la lisibilité
        repeat: -1,
      });
    },
    { scope: containerRef }
  );

  const marqueeContent = (
    <>
      <span className="pr-8 md:pr-12">
        {lang === "fr" ? "Pilotage de projets —" : "Project Management —"}
      </span>
      <span className="pr-8 md:pr-12 text-[#8ea522]">
        {lang === "fr" ? "Stratégie de Communication —" : "Communication Strategy —"}
      </span>
      <span className="pr-8 md:pr-12">
        {lang === "fr" ? "Identité de marque —" : "Brand Identity —"}
      </span>
      <span className="pr-8 md:pr-12 text-[#8ea522]">
        {lang === "fr" ? "Éditorial & Social Media —" : "Editorial & Social Media —"}
      </span>
    </>
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full py-20 md:py-40 overflow-hidden flex flex-col items-center justify-center bg-[#EBE9E0]"
    >
      {/* L'étoile SVG - Réduite sur mobile pour ne pas gêner la lecture */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] md:opacity-[0.05] pointer-events-none z-0">
        <svg
          className="star-svg w-[120vw] h-[120vw] md:w-[50vw] md:h-[50vw]"
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          <path d="M50 0L53.5 35.5L85.5 14.5L64.5 46.5L100 50L64.5 53.5L85.5 85.5L53.5 64.5L50 100L46.5 64.5L14.5 85.5L35.5 53.5L0 50L35.5 46.5L14.5 14.5L46.5 35.5L50 0Z" />
        </svg>
      </div>

      {/* Titre d'appel */}
      <p className="relative z-10 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] mb-8 md:mb-12 opacity-60">
        {lang === "fr" ? "Disponible pour de nouveaux défis" : "Available for new challenges"}
      </p>

      {/* Le texte Marquee géant */}
      <div className="w-full relative z-10 flex overflow-hidden mix-blend-difference text-white py-4">
        <div className="marquee-track flex whitespace-nowrap text-[15vw] md:text-[9vw] font-black uppercase tracking-tighter leading-none">
          {marqueeContent}
          {marqueeContent} {/* Doublé pour l'effet infini */}
        </div>
      </div>

      {/* Bouton Contact & CV */}
      <div className="relative z-20 mt-16 md:mt-24 flex flex-col items-center gap-6">
        <a
          href="/cv-mathis-chhour.pdf"
          download="CV_Mathis_Chhour.pdf"
          className="group relative inline-flex items-center justify-center px-10 py-5 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold overflow-hidden border border-zinc-900 rounded-full transition-all"
        >
          <span className="relative z-10 group-hover:text-[#EBE9E0] transition-colors duration-500">
            {lang === "fr" ? "Télécharger mon CV" : "Download my CV"}
          </span>
          <div className="absolute inset-0 bg-zinc-900 scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] z-0"></div>
        </a>
        
        <a 
          href="mailto:votre-email@exemple.com" 
          className="font-mono text-[10px] uppercase tracking-widest border-b border-zinc-400 pb-1 hover:border-zinc-900 transition-colors"
        >
          {lang === "fr" ? "Me contacter par mail" : "Contact me by email"}
        </a>
      </div>
    </section>
  );
}