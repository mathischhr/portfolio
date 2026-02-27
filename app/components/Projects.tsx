"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const container = useRef(null);
  const { lang } = useLanguage();

  const projects = [
    {
      id: "ppm-nouvel-an",
      title: lang === "fr" ? "ÉVÉNEMENTIEL & STRATÉGIE" : "EVENTS & STRATEGY",
      role: lang === "fr" ? "Organisateur & Communication" : "Event Planner & Communication",
      desc: lang === "fr" 
        ? "Direction complète d'un événement traditionnel pour Phnom Penh Market. Un succès public avec plus de 150 visiteurs et une visibilité locale boostée." 
        : "Full management of a traditional event for Phnom Penh Market. A public success with over 150 visitors and boosted local visibility.",
      image: "/danse-lion4.jpg",
    },
    {
      id: "yschools-comm",
      title: lang === "fr" ? "COMMUNICATION 360°" : "360° COMMUNICATION",
      role: lang === "fr" ? "Chargé de communication" : "Communication Officer",
      desc: lang === "fr" 
        ? "Gestion de la communication de l'école : de la création de contenus digitaux au pilotage CRM, pour une stratégie performante." 
        : "School communication management: from digital content creation to CRM monitoring, ensuring a high-performing strategy.",
      image: "/yschools.jpg",
    },
    {
      id: "tricking-interview",
      title: lang === "fr" ? "DIRECTION ARTISTIQUE" : "ART DIRECTION",
      role: lang === "fr" ? "Storyboarder & Éclairagiste" : "Storyboarder & Gaffer",
      desc: lang === "fr" 
        ? "Conception visuelle d'une interview sportive. Travail sur l'ambiance lumineuse et la narration pour capturer l'énergie du tricking." 
        : "Visual design for a sports interview. Focused on lighting ambiance and storytelling to capture the raw energy of tricking.",
      image: "/tricking-img.jpg",
    },
  ];

  useGSAP(
    () => {
      if (!container.current) return;

      gsap.from(".project-card", {
        y: 100,
        opacity: 0,
        stagger: 0.3,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: container.current, start: "top 75%" },
      });

      gsap.utils.toArray(".parallax-slow").forEach((layer) => {
        gsap.to(layer as Element, {
          y: -100,
          rotation: -20,
          ease: "none",
          scrollTrigger: { trigger: container.current, scrub: 1 },
        });
      });
    },
    { scope: container, dependencies: [lang] },
  );

  return (
    <section
      id="projects"
      ref={container}
      className="relative py-24 md:py-32 px-6 md:px-24 bg-white text-zinc-900 overflow-hidden"
    >
      {/* Décors en arrière-plan */}
      <div className="parallax-slow absolute top-[5%] right-[5%] text-zinc-100 z-0 pointer-events-none">
        <svg width="300" height="300" viewBox="0 0 100 100" fill="currentColor" className="blur-xl opacity-50">
          <circle cx="50" cy="50" r="50" />
        </svg>
      </div>
      <div className="parallax-slow absolute top-[60%] left-[-5%] text-[#ea743f] z-0 pointer-events-none">
        <svg width="250" height="250" viewBox="0 0 100 100" fill="currentColor" className="blur-2xl opacity-10">
          <circle cx="50" cy="50" r="50" />
        </svg>
      </div>

      <div className="relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-16 md:mb-20 text-center uppercase">
          {lang === "fr" ? "Projets Phares" : "Featured Projects"}
        </h2>

        <div className="flex flex-col gap-20 md:gap-32">
          {projects.map((proj, i) => (
            <div
              key={i}
              className={`project-card flex flex-col ${i % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"} items-start md:items-center gap-8 md:gap-12 group/card`}
            >
              {/* Image du projet */}
              <div className="w-full md:w-1/2 aspect-[4/3] bg-zinc-100 rounded-3xl overflow-hidden relative shadow-sm transition-shadow duration-500 hover:shadow-2xl hover:shadow-[#ea743f]/20">
                <Image
                  src={proj.image}
                  alt={proj.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Infos du projet */}
              <div className="w-full md:w-1/2 space-y-4 md:space-y-5 px-2 md:px-0">
                <p className="text-[#ea743f] font-bold tracking-widest text-xs md:text-sm uppercase">
                  {proj.role}
                </p>
                <h3 className="text-4xl md:text-5xl font-bold tracking-tighter">
                  {proj.title}
                </h3>
                <p className="text-base md:text-lg text-zinc-500 max-w-md leading-relaxed">
                  {proj.desc}
                </p>

                <div className="pt-2">
                  <Link
                    href="/projets"
                    className="group/btn relative inline-flex items-center gap-3 mt-2 md:mt-4 px-6 py-3 border border-zinc-300 text-zinc-700 rounded-full font-medium transition-all duration-300 hover:border-[#ea743f] hover:text-white overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-[#ea743f] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out"></span>
                    <span className="relative z-10 flex items-center gap-3">
                      <span className="text-sm md:text-base">
                        {lang === "fr" ? "Voir les détails" : "View details"}
                      </span>
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bouton global bas de page */}
        <div className="mt-24 md:mt-32 text-center">
          <Link
            href="/projets"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-base md:text-lg font-bold text-white bg-zinc-900 rounded-full overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-[#ea743f] transition-all duration-500 ease-out scale-0 group-hover:scale-100 rounded-full"></span>
            <span className="relative z-10">
              {lang === "fr" ? "Découvrir tous les projets" : "Discover all projects"}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}