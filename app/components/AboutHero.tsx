"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function AboutHero({ lang }: { lang: "fr" | "en" }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".reveal-word",
        { y: "120%", rotateZ: 5 },
        {
          y: "0%",
          rotateZ: 0,
          duration: 1.4,
          stagger: 0.08,
          ease: "power4.out",
        },
      )
        .fromTo(
          ".portrait-mask",
          { height: "0%" },
          { height: "100%", duration: 1.5, ease: "power4.inOut" },
          "-=1",
        )
        .fromTo(
          ".portrait-img",
          { scale: 1.4 },
          { scale: 1, duration: 1.5, ease: "power4.inOut" },
          "-=1.5",
        )
        .fromTo(
          ".fade-up",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" },
          "-=0.8",
        );
    },
    { scope: heroRef },
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;

      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      const yPos = (clientY / window.innerHeight - 0.5) * 2;

      // Bouge la photo
      gsap.to(portraitRef.current, {
        x: xPos * 30, // 30px max
        y: yPos * 30,
        duration: 1,
        ease: "power3.out",
      });

      // Bouge le texte dans le sens inverse pour accentuer la profondeur
      gsap.to(textRef.current, {
        x: -xPos * 20,
        y: -yPos * 20,
        duration: 1,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen flex flex-col justify-end p-6 md:p-12 overflow-hidden"
    >
      {/* LA CARD PORTRAIT */}
      <div
        ref={portraitRef}
        className="absolute top-[20%] md:top-[15%] right-6 md:right-24 w-[60vw] md:w-[28vw] aspect-[3/4] z-10 pointer-events-none"
      >
        <div className="portrait-mask w-full h-full overflow-hidden origin-bottom rounded-sm">
          <Image
            src="/mathis.jpg"
            alt="Portrait de Mathis Chhour"
            fill
            className="portrait-img object-cover"
            sizes="(max-width: 768px) 60vw, 30vw"
            priority
          />
        </div>
      </div>

      {/* LES INFOS MÉTADONNÉES */}
      <div className="absolute top-[30%] md:top-[40%] left-6 md:left-12 flex flex-col gap-6 font-mono text-[10px] md:text-xs uppercase tracking-widest z-20">
        <div className="fade-up overflow-hidden">
          <p className="opacity-50 mb-1">Localisation</p>
          <p className="font-bold">Paris - Troyes, France</p>
        </div>
        <div className="fade-up overflow-hidden">
          <p className="opacity-50 mb-1">
            {lang === "fr" ? "Statut" : "Status"}
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#8ea522] animate-pulse"></div>
            <p className="font-bold">
    {lang === "fr" 
    ? "DISPO POUR ALTERNANCE — SEPT. 2026" 
    : "AVAILABLE FOR APPRENTICESHIP — SEPT. 2026"}
            </p>
          </div>
        </div>
        <div className="fade-up overflow-hidden">
          <p className="opacity-50 mb-1">Expertise</p>
          <p className="font-bold leading-relaxed">
{lang === "fr" ? "STRATÉGIE & DÉPLOIEMENT 360°" : "360° STRATEGY & DEPLOYMENT"}
<br></br>
{lang === "fr" ? "CRÉATION DE CONTENUS MULTIMÉDIA" : "MULTIMEDIA CONTENT CREATION"}
<br></br>
{lang === "fr" ? "SOCIAL MEDIA & GESTION WEB" : "SOCIAL MEDIA & WEB MANAGEMENT"}
          </p>
        </div>
      </div>

      {/* LE NOM GÉANT */}
      <h1
        ref={textRef}
        className="relative z-30 font-black uppercase tracking-tighter leading-[0.8] text-[20vw] md:text-[16vw] flex flex-col mix-blend-difference text-white pointer-events-none"
      >
        <div className="overflow-hidden pb-2 -mb-2">
          <div className="reveal-word origin-bottom-left">Mathis</div>
        </div>
        <div className="overflow-hidden pb-4 -mb-4 md:ml-[10vw]">
          <div className="reveal-word origin-bottom-left text-[#8ea522]">
            CHHOUR
          </div>
        </div>
      </h1>
    </section>
  );
}
