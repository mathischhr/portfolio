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

      gsap.to(".marquee-track", {
        xPercent: -50,
        ease: "none",
        duration: 15,
        repeat: -1,
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 md:py-32 overflow-hidden flex flex-col items-center justify-center"
    >
      {/* L'étoile SVG qui tourne au scroll */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none z-0">
        <svg
          className="star-svg w-[90vw] h-[90vw] md:w-[40vw] md:h-[40vw]"
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          <path d="M50 0L53.5 35.5L85.5 14.5L64.5 46.5L100 50L64.5 53.5L85.5 85.5L53.5 64.5L50 100L46.5 64.5L14.5 85.5L35.5 53.5L0 50L35.5 46.5L14.5 14.5L46.5 35.5L50 0Z" />
        </svg>
      </div>

      {/* Le texte Marquee géant */}
      <div className="w-full relative z-10 flex overflow-hidden mix-blend-difference text-white">
  <div className="marquee-track flex whitespace-nowrap text-[12vw] md:text-[8vw] font-black uppercase tracking-tighter">
    
    {/* Bloc 1 : Appel à l'action */}
    <span className="pr-12">
      {lang === "fr" ? "Discutons de votre projet —" : "Let's talk about your project —"}
    </span>

    {/* Bloc 2 : Stratégie & Communication 360 (en couleur) */}
    <span className="pr-12 text-[#8ea522]">
      {lang === "fr" ? "Stratégie & Com 360° —" : "360° Strategy & Comm —"}
    </span>

    {/* Bloc 3 : Création de contenus & Design */}
    <span className="pr-12">
      {lang === "fr" ? "Contenu & Design —" : "Content & Design —"}
    </span>

    {/* Bloc 4 : Web & Social Media (en couleur) */}
    <span className="pr-12 text-[#8ea522]">
      {lang === "fr" ? "Web & Social Media —" : "Web & Social Media —"}
    </span>

  </div>
</div>

      {/* Bouton Contact */}
     <div className="relative z-20 mt-12 md:mt-24">
  <a
    href="/cv-mathis-chhour.pdf" // Remplacez par le chemin exact de votre fichier
    download="CV_Mathis_Chhour.pdf"
    className="group relative inline-flex items-center justify-center px-8 py-4 font-mono text-sm uppercase tracking-[0.2em] font-bold overflow-hidden border border-current rounded-full"
  >
    <span className="relative z-10 group-hover:text-[#EBE9E0] transition-colors duration-500">
      {lang === "fr" ? "Télécharger mon CV" : "Download my CV"}
    </span>
    {/* L'effet de remplissage au survol */}
    <div className="absolute inset-0 bg-current scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] z-0"></div>
  </a>
</div>
    </section>
  );
}
