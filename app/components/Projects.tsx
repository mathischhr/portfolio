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
      title: "Utopia",
      role:
        lang === "fr"
          ? "Identité Visuelle & Direction Artistique"
          : "Visual Identity & Art Direction",
      desc:
        lang === "fr"
          ? "Création complète de la charte graphique pour un cinéma d'art et d'essai."
          : "Complete creation of the visual identity and guidelines for an art house cinema.",
      image: "/charte_utopia_Page_1.jpg",
    },
    {
      title: "Phnom Penh",
      role: lang === "fr" ? "Web & Print" : "Web & Print Design",
      desc:
        lang === "fr"
          ? "Refonte de la communication du magasin, création du site WordPress et supports print."
          : "Store communication redesign, WordPress website creation, and print materials.",
      image: "/siteppp.jpg",
    },
    {
      title: "Y SCHOOLS",
      role: lang === "fr" ? "Communication Globale" : "Global Communication",
      desc:
        lang === "fr"
          ? "Déploiement du plan de communication, événementiel et gestion des réseaux sociaux."
          : "Deployment of the communication plan, events, and social media management.",
      image: "/linkedin.jpg",
    },
  ];

  useGSAP(
    () => {
      // SÉCURITÉ : on vérifie que le container existe bien
      if (!container.current) return;

      gsap.from(".project-card", {
        y: 100,
        opacity: 0,
        stagger: 0.3,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: container.current, start: "top 75%" },
      });
      gsap.utils.toArray(".parallax-fast").forEach((layer) => {
        gsap.to(layer as Element, {
          y: -300,
          rotation: 45,
          ease: "none",
          scrollTrigger: { trigger: container.current, scrub: 0.5 },
        });
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
      className="relative py-32 px-6 md:px-24 bg-white text-zinc-900 overflow-hidden"
    >
      {/* === COUCHES DE PROFONDEUR (SVGs) === */}
      <div className="parallax-slow absolute top-[5%] right-[5%] text-zinc-100 z-0">
        <svg
          width="300"
          height="300"
          viewBox="0 0 100 100"
          fill="currentColor"
          className="blur-xl opacity-50"
        >
          <circle cx="50" cy="50" r="50" />
        </svg>
      </div>
      <div className="parallax-slow absolute top-[60%] left-[-5%] text-[#ea743f] z-0">
        <svg
          width="250"
          height="250"
          viewBox="0 0 100 100"
          fill="currentColor"
          className="blur-2xl opacity-10"
        >
          <circle cx="50" cy="50" r="50" />
        </svg>
      </div>
      <div className="parallax-fast absolute top-[20%] right-[15%] text-[#bf8b4d] z-0 opacity-20 pointer-events-none">
        <svg
          width="60"
          height="60"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 2v20M2 12h20" />
        </svg>
      </div>
      <div className="parallax-fast absolute bottom-[30%] left-[10%] text-zinc-300 z-0 opacity-40 pointer-events-none">
        <svg
          width="80"
          height="80"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        </svg>
      </div>
      <div className="parallax-fast absolute top-[70%] right-[5%] text-[#ea743f] z-0 opacity-20 pointer-events-none">
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="4 14 10 14 10 20 20 10 14 10 14 4 4 14" />
        </svg>
      </div>

      <div className="relative z-10">
        <h2 className="text-5xl font-bold tracking-tighter mb-20 text-center">
          {lang === "fr" ? "Projets Phares" : "Featured Projects"}
        </h2>

        <div className="flex flex-col gap-16 md:gap-32">
          {projects.map((proj, i) => (
            <div
              key={i}
              className={`project-card flex flex-col ${i % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-12 group/card`}
            >
              <div className="w-full md:w-1/2 aspect-[4/3] bg-zinc-100 rounded-3xl overflow-hidden relative shadow-sm transition-shadow duration-500 hover:shadow-2xl hover:shadow-[#ea743f]/20">
                <Image
                  src={proj.image}
                  alt={`Visuel du projet ${proj.title}`}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover/card:bg-black/10 z-10"></div>
              </div>

              <div className="w-full md:w-1/2 space-y-5">
                <p className="text-[#ea743f] font-bold tracking-widest text-xs md:text-sm uppercase">
                  {proj.role}
                </p>
                <h3 className="text-5xl font-bold tracking-tighter">
                  {proj.title}
                </h3>
                <p className="text-lg text-zinc-500 max-w-md leading-relaxed">
                  {proj.desc}
                </p>

                <div className="pt-2">
                  {/* CORRECTION ICI : Le lien pointe maintenant vers le slider global */}
                  <Link
                    href="/projets"
                    className="group/btn inline-flex items-center gap-3 mt-4 px-6 py-3 border border-zinc-300 text-zinc-700 rounded-full font-medium transition-all duration-300 hover:bg-[#ea743f] hover:border-[#ea743f] hover:text-white cursor-pointer"
                  >
                    <span>
                      {lang === "fr" ? "Voir les détails" : "View details"}
                    </span>
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 text-center">
          <Link
            href="/projets"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-zinc-900 rounded-full overflow-hidden cursor-pointer"
          >
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#ea743f] rounded-full group-hover:w-full group-hover:h-56"></span>
            <span className="relative">
              {lang === "fr"
                ? "Découvrir tous les projets"
                : "Discover all projects"}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
