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
          ? "Élaboration de stratégies de communication globales, création de contenu et suivi du budget"
          : "Crafting global communication strategies, managing content creation, and overseeing budget monitoring.",
      items:
        lang === "fr"
          ? ["Stratégie 360°", "Social Media", "Web & SEO", "Analyse & Reporting"]
          : ["360° Strategy", "Social Media", "Web & SEO", "Analytics & Reporting"],
    },
    {
      cat: lang === "fr" ? "Design Graphique & UI/UX" : "Graphic & UI/UX Design",
      desc:
        lang === "fr"
          ? "Conception d'identités visuelles, supports print et interfaces digitales"
          : "Visual identity design, print materials, and digital interfaces",
      items: 
        lang === "fr"
          ? ["Identité Visuelle", "Supports Print", "Web Design", "Design UI/UX"]
          : ["Visual Identity", "Print Design", "Web Design", "UI/UX Design"],
    },
    {
      cat: lang === "fr" ? "Développement Web" : "Web Development",
      desc:
        lang === "fr"
          ? "Intégration de sites vitrines, gestion de bases de données et déploiement"
          : "Showcase website integration, database management, and deployment",
      items: 
        lang === "fr"
          ? ["HTML / CSS / JS", "PHP / SQL", "Gestion de CMS (Wordpress)", "Déploiement de service"]
          : ["HTML / CSS / JS", "PHP / SQL", "CMS Management (WordPress)", "Service Deployment"],
    },
    {
      cat: lang === "fr" ? "Audiovisuel & Photographie" : "Audiovisual & Photography",
      desc:
        lang === "fr"
          ? "Captation, montage vidéo pour les réseaux sociaux et retouche photographique."
          : "Filming, video editing for social networks, and photo retouching.",
      items:
        lang === "fr"
          ? ["Captation Vidéo", "Montage & Colorimétrie", "Shooting Photo", "Post-production"]
          : ["Video Production", "Editing & Color Grading", "Photo Shoots", "Post-production"],
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