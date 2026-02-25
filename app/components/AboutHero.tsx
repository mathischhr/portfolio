"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function AboutHero({ lang }: { lang: "fr" | "en" }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(".reveal-word", { y: "120%", rotateZ: 5 }, { y: "0%", rotateZ: 0, duration: 1.4, stagger: 0.08, ease: "power4.out" })
      .fromTo(".portrait-mask", { height: "0%" }, { height: "100%", duration: 1.5, ease: "power4.inOut" }, "-=1")
      .fromTo(".portrait-img", { scale: 1.4 }, { scale: 1, duration: 1.5, ease: "power4.inOut" }, "-=1.5")
      .fromTo(".fade-up", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" }, "-=0.8");
  }, { scope: heroRef });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current || window.innerWidth < 768) return;
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 2;
      const yPos = (clientY / window.innerHeight - 0.5) * 2;
      gsap.to(portraitRef.current, { x: xPos * 30, y: yPos * 30, duration: 1, ease: "power3.out" });
      gsap.to(textRef.current, { x: -xPos * 20, y: -yPos * 20, duration: 1, ease: "power3.out" });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section ref={heroRef} className="relative w-full min-h-screen md:h-screen flex flex-col justify-start md:justify-end p-6 md:p-12 overflow-x-hidden bg-[#EBE9E0]">
      {/* PHOTO */}
      <div ref={portraitRef} className="relative md:absolute top-0 md:top-[15%] right-0 md:right-24 w-[75vw] md:w-[28vw] aspect-[3/4] z-10 mx-auto md:mx-0 mt-20 md:mt-0">
        <div className="portrait-mask w-full h-full overflow-hidden rounded-sm shadow-xl md:shadow-none">
          <Image src="/mathis.jpg" alt="Mathis Chhour" fill className="portrait-img object-cover" sizes="(max-width: 768px) 75vw, 30vw" priority />
        </div>
      </div>

      {/* BLOC INFOS & MANIFESTO */}
      <div className="relative md:absolute md:bottom-[60%] left-0 md:left-12 flex flex-col gap-8 z-20 mt-12 mb-8 md:my-0 px-2 md:px-0 max-w-xl">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 font-mono text-[10px] md:text-xs uppercase tracking-widest">
          <div className="fade-up">
            <p className="opacity-50 mb-1 italic">{lang === "fr" ? "Localisation" : "Location"}</p>
            <p className="font-bold text-zinc-900">Paris - Troyes, France</p>
          </div>
          <div className="fade-up">
            <p className="opacity-50 mb-1 italic">Status</p>
            <div className="flex items-center gap-2 text-[#8ea522]">
              <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>
              <p className="font-bold">{lang === "fr" ? "DISPO — SEPT. 2026" : "AVAILABLE — SEPT. 2026"}</p>
            </div>
          </div>
        </div>

        <div className="fade-up font-mono text-[10px] md:text-xs uppercase tracking-widest">
          <p className="opacity-50 mb-1 italic">Expertise</p>
          <p className="font-bold leading-relaxed text-zinc-900">
            {lang === "fr" ? "STRATÉGIE COM / CRÉATION MULTIMÉDIA / WEB" : "COM STRATEGY / MULTIMEDIA CONTENT / WEB"}
          </p>
        </div>

        <div className="fade-up max-w-lg text-zinc-800 font-medium">
          <p className="text-sm md:text-base leading-relaxed">
            {lang === "fr" 
              ? "Spécialisé en communication globale, je conçois et déploie des projets en liant stratégie et production visuelle."
              : "Specialized in global communication, I design and deploy projects by linking strategy and visual production."}
          </p>
        </div>
      </div>

      {/* NOM */}
      <h1 ref={textRef} className="relative z-30 font-black uppercase tracking-tighter leading-[0.8] text-[18vw] md:text-[16vw] flex flex-col mix-blend-difference text-white pointer-events-none mt-auto md:mt-0 md:pb-6">
        <div className="overflow-hidden pb-2 -mb-2"><div className="reveal-word">Mathis</div></div>
        <div className="overflow-hidden pb-4 -mb-4 md:ml-[10vw]"><div className="reveal-word text-[#8ea522]">CHHOUR</div></div>
      </h1>
    </section>
  );
}