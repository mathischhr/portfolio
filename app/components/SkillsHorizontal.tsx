"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "../context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function SkillsHorizontal() {
  const container = useRef(null);
  const slider = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();

  const skills = [
    {
      cat: lang === "fr" ? "Communication & Stratégie" : "Communication & Strategy",
      desc:
        lang === "fr"
          ? "Je conçois des plans de communication complets pour booster la visibilité et gérer l'image de marque."
          : "I design complete communication plans to boost visibility and manage brand image.",
      items:
        lang === "fr"
          ? ["Gestion de projet 360°", "Ligne éditoriale", "Référencement (SEO)", "Analyse d'audience"]
          : ["360° Project Management", "Editorial Policy", "SEO Optimization", "Audience Analysis"],
    },
    {
      cat: lang === "fr" ? "Design & Expérience" : "Design & Experience",
      desc:
        lang === "fr"
          ? "Je crée des parcours fluides et des visuels qui captent l'attention tout en respectant une identité."
          : "I create seamless journeys and visuals that grab attention while respecting a brand identity.",
      items: 
        lang === "fr"
          ? ["Parcours utilisateur (UX)", "Interfaces web (UI)", "Mise en page Print", "Charte graphique"]
          : ["User Journey (UX)", "Web Interfaces (UI)", "Print Layout", "Brand Identity"],
    },
 {
  cat: lang === "fr" ? "Développement & Gestion Web" : "Web Development & Management",
  desc:
    lang === "fr"
      ? "Conception de sites vitrines et gestion d'outils marketing pour piloter la relation client."
      : "Designing showcase websites and managing marketing tools to lead customer relationships.",
  items: 
    lang === "fr"
      ? ["Intégration (HTML/CSS/JS)", "Gestion de CMS (WordPress)", "Pilotage CRM & Data", "Optimisation SEO"]
      : ["Web Integration", "CMS Management (WordPress)", "CRM & Data Monitoring", "SEO Optimization"],
},
    {
      cat: lang === "fr" ? "Audiovisuel & Narration" : "Audiovisual & Storytelling",
      desc:
        lang === "fr"
          ? "Je raconte des histoires à travers l'image, de l'idée originale jusqu'au rendu final."
          : "I tell stories through images, from the original idea to the final rendering.",
      items:
        lang === "fr"
          ? ["Écriture de script", "Mise en scène", "Direction artistique", "Post-production"]
          : ["Scriptwriting", "Staging", "Art Direction", "Post-production"],
    },
  ];

  useGSAP(
    () => {
      if (!slider.current || !container.current) return;

      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const getWidth = () => (slider.current ? slider.current.scrollWidth : 0);

        gsap.to(slider.current, {
          x: () => -(getWidth() - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            pin: true,
            scrub: 1,
            end: () => "+=" + getWidth(),
            invalidateOnRefresh: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: container, dependencies: [lang] },
  );

  return (
    <section
      id="skills"
      ref={container}
      className="relative min-h-screen md:h-screen md:overflow-hidden bg-white text-zinc-900 border-y border-zinc-100 py-16 md:py-0"
    >
      {/* TITRE : Ajout de padding-top et padding-left pour mobile */}
      <div className="md:absolute top-12 left-0 md:left-12 z-20 mb-10 md:mb-0 px-8 md:px-0">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
          {lang === "fr" ? "Mes compétences" : "My Skills"}
        </h2>
      </div>

      {/* Slider : Colonne sur mobile, Ligne sur PC */}
      <div
        ref={slider}
        className="flex flex-col md:flex-row h-full w-full md:w-fit items-center px-6 md:px-[20vw] gap-8 md:gap-4"
      >
        {skills.map((skill, index) => (
          <div
            key={index}
            className="group relative w-full md:w-[45vw] min-h-[480px] md:h-[60vh] p-8 md:p-12 bg-zinc-50 border border-zinc-200 rounded-3xl overflow-hidden flex flex-col justify-center transition-all duration-500 ease-out hover:border-[#ea743f]/30 hover:bg-white shadow-sm md:shadow-none"
          >
            {/* Numéro décoratif */}
            <span className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 text-[8rem] md:text-[15rem] font-black text-zinc-100/80 leading-none pointer-events-none z-0">
              0{index + 1}
            </span>

            <div className="z-10 relative">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-[#ea743f]">
                {skill.cat}
              </h3>
              <p className="text-zinc-500 mb-8 text-base md:text-lg max-w-sm">
                {skill.desc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {skill.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center text-zinc-800 font-medium bg-white py-3 px-4 rounded-xl shadow-sm border border-zinc-100 text-sm md:text-base"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#bf8b4d] mr-3"></span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}