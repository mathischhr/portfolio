"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "../context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function SkillsHorizontal() {
  const container = useRef(null);
  // On précise le type (HTMLDivElement) pour être plus propre
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
          : ["Video Produdction", "Editing & Color Grading", "Photo Shoots", "Post-production"],
    },
  ];

  useGSAP(
    () => {
      // SÉCURITÉ ANTI-CRASH : On empêche GSAP de se lancer si la div n'est pas encore rendue
      if (!slider.current) return;

      // Recalcul de la taille
      const getWidth = () => (slider.current ? slider.current.scrollWidth : 0);

      gsap.to(slider.current, {
        x: () => -(getWidth() - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + getWidth() * 1.5,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: container, dependencies: [lang] },
  );

  return (
    <section
      id="skills"
      ref={container}
      className="h-screen overflow-hidden bg-white text-zinc-900 relative border-y border-zinc-100"
    >
      <div className="absolute top-12 left-12 z-20">
        <h2 className="text-5xl font-bold tracking-tighter">
          {lang === "fr" ? "Mes compétences" : "My Skills"}
        </h2>
      </div>

      <div
        ref={slider}
        className="flex h-full w-fit items-center px-[10vw] md:px-[20vw]"
      >
        {skills.map((skill, index) => (
          <div
            key={index}
            className="group relative w-[85vw] md:w-[45vw] h-[60vh] mx-4 p-12 bg-zinc-50 border border-zinc-200 rounded-3xl overflow-hidden flex flex-col justify-center transition-all duration-500 ease-out hover:-translate-y-4 hover:shadow-[0_20px_40px_-15px_rgba(234,116,63,0.15)] hover:border-[#ea743f]/30 hover:bg-white cursor-default"
          >
            <span className="absolute -bottom-10 -right-10 text-[15rem] font-black text-zinc-100/80 leading-none pointer-events-none z-0 transition-all duration-700 ease-out group-hover:scale-110 group-hover:-translate-y-8 group-hover:text-zinc-100">
              0{index + 1}
            </span>

            <div className="z-10 relative">
              <h3 className="text-4xl font-bold mb-4 text-[#ea743f] transition-transform duration-500 ease-out group-hover:translate-x-3">
                {skill.cat}
              </h3>
              <p className="text-zinc-500 mb-8 text-lg max-w-sm transition-colors duration-500 group-hover:text-zinc-700">
                {skill.desc}
              </p>

              <div className="grid grid-cols-2 gap-4">
                {skill.items.map((item, i) => (
                  <div
                    key={i}
                    className="group/pill flex items-center text-zinc-800 font-medium bg-white py-3 px-4 rounded-xl shadow-sm border border-zinc-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-[#ea743f]/30 cursor-crosshair"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#bf8b4d] mr-3 transition-all duration-300 group-hover/pill:scale-150 group-hover/pill:bg-[#ea743f]"></span>
                    <span className="transition-colors duration-300 group-hover/pill:text-[#ea743f]">
                      {item}
                    </span>
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
