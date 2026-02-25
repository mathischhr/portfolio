"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "../context/LanguageContext";

export default function Hero() {
  const container = useRef(null);
  const titleRef = useRef(null);
  const { lang } = useLanguage();

  useGSAP(
    () => {
      gsap.from(".hero-text", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
      });

      const handleMouseMove = (e: MouseEvent) => {
        if (window.innerWidth < 768) return;
        const { clientX, clientY } = e;
        gsap.to(titleRef.current, {
          x: (clientX - window.innerWidth / 2) * 0.03,
          y: (clientY - window.innerHeight / 2) * 0.03,
          duration: 1,
          ease: "power2.out",
        });
        gsap.to(".floating-shape", {
          x: (clientX - window.innerWidth / 2) * -0.04,
          y: (clientY - window.innerHeight / 2) * -0.04,
          duration: 1.5,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      gsap.to(".shape-bounce", {
        y: "-=20",
        duration: 2.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: 0.5,
      });
      gsap.to(".shape-spin", {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "linear",
      });

      return () => window.removeEventListener("mousemove", handleMouseMove);
    },
    { scope: container },
  );

  const scrollToSkills = () => {
    const skillsSection = document.getElementById("skills");
    if (skillsSection) skillsSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={container}
      className="h-screen flex flex-col justify-center items-center bg-zinc-50 text-zinc-900 overflow-hidden relative"
    >
      {/* TOUS TES SVGS SONT LÀ */}
      <div className="floating-shape absolute top-[20%] left-[15%] text-[#ea743f] opacity-40 z-0">
        <svg className="shape-spin w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M17 5l-10 14M22 12H2M19 19L5 5" />
        </svg>
      </div>
      <div className="floating-shape absolute top-[25%] right-[20%] text-zinc-300 z-0">
        <svg className="shape-bounce w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
        </svg>
      </div>
      <div className="floating-shape absolute bottom-[30%] left-[20%] text-zinc-300 z-0">
        <svg className="shape-bounce w-14 h-14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="4 14 10 14 10 20 20 10 14 10 14 4 4 14" />
        </svg>
      </div>

      <div className="z-10 text-center pointer-events-none">
        {/* TEXTE MÉTIER COMPLET */}
        <p className="hero-text text-zinc-500 text-sm md:text-xl uppercase tracking-[0.3em] mb-4 md:mb-6 font-medium">
          {lang === "fr" ? "STRATÉGIE & CRÉATION DIGITALE" : "DIGITAL STRATEGY & CREATION"}
        </p>

        {/* TITRE COMPLET - Espace vertical réduit sur mobile avec leading-[0.85] */}
        <h1
          ref={titleRef}
          className="text-[16vw] md:text-[10rem] font-bold uppercase tracking-tighter leading-[0.85] md:leading-none flex flex-col md:flex-row gap-0 md:gap-4 justify-center"
        >
          <span className="hero-text">Mathis</span>
          <span className="hero-text text-[#ea743f]">CHHOUR</span>
        </h1>
      </div>

      {/* BOUTON SCROLL COMPLET */}
      <button
        onClick={scrollToSkills}
        className="absolute bottom-10 flex flex-col items-center gap-2 group cursor-pointer z-20 hover:scale-105 transition-transform"
      >
        <div className="w-[1px] h-16 bg-zinc-300 overflow-hidden relative">
          <div className="w-full h-full bg-[#ea743f] animate-slide-down"></div>
        </div>
        <span className="text-xs text-zinc-400 uppercase tracking-widest group-hover:text-[#ea743f] transition-colors">
          Scroll
        </span>
      </button>
    </section>
  );
}