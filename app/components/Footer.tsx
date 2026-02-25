"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const pathname = usePathname();
  const { lang } = useLanguage();

  if (pathname.startsWith("/projets")) return null;

  const getActiveColor = () => {
    if (pathname.startsWith("/a-propos")) return "#8ea522";
    return "#ea743f";
  };

  const activeColor = getActiveColor();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = [
    { name: lang === "fr" ? "Accueil" : "Home", path: "/" },
    { name: lang === "fr" ? "Projets" : "Projects", path: "/projets" },
    { name: lang === "fr" ? "À propos de moi" : "About me", path: "/a-propos" },
  ];

  return (
    <footer className="bg-zinc-50 pt-20 md:pt-32 pb-10 border-t border-zinc-200 relative overflow-hidden">
      <div className="px-6 md:px-24 relative z-10">
        
        {/* === SECTION TOP : CALL TO ACTION === */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-10">
          <div className="max-w-3xl">
            {/* Taille ajustée pour mobile (text-5xl) */}
            <h2 className="text-5xl md:text-[5.5rem] font-black tracking-tighter text-zinc-900 leading-[0.95] md:leading-[0.9]">
              {lang === "fr" ? "Prêt à créer" : "Ready to create"} <br />
              <span className="text-zinc-400">
                {lang === "fr" ? "ensemble" : "together"}
              </span>
              <span
                className="transition-colors duration-500"
                style={{ color: activeColor }}
              >
                {" "}
                ?
              </span>
            </h2>
          </div>

          <a
            href="mailto:mathis.chhour@gmail.com"
            className="group relative inline-flex items-center gap-4 px-8 md:px-10 py-4 md:py-5 text-lg md:text-xl font-bold text-white bg-zinc-900 rounded-full overflow-hidden transition-all duration-300 hover:shadow-xl"
          >
            <span
              className="absolute inset-0 w-0 h-full transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:w-full"
              style={{ backgroundColor: activeColor }}
            ></span>
            <span className="relative z-10">
              {lang === "fr" ? "Me contacter" : "Contact me"}
            </span>
            <svg
              className="relative z-10 w-5 h-5 transition-transform duration-500 group-hover:translate-x-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

        {/* === SECTION MIDDLE : LIENS === */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-12 py-12 border-t border-zinc-200">
          {/* Colonne 1 : Infos */}
          <div className="flex flex-col gap-4">
            <span className="font-bold text-2xl tracking-tighter text-zinc-900">
              MC<span style={{ color: activeColor }}>.</span>
            </span>
            <p className="text-zinc-500 text-sm max-w-xs leading-relaxed">
              {lang === "fr" ? (
                <>
                  Étudiant en BUT MMI passionné par la communication et le design digital.
                  <strong className="text-zinc-700 font-medium italic">
                    {" "}À la recherche d'une alternance pour Septembre 2026.
                  </strong>
                </>
              ) : (
                <>
                  MMI student passionate about communication and digital design.
                  <strong className="text-zinc-700 font-medium italic">
                    {" "}Looking for a work-study opportunity.
                  </strong>
                </>
              )}
            </p>
          </div>

          {/* Colonne 2 : Navigation */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Navigation</span>
            <nav className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="group flex items-center text-zinc-500 font-medium w-fit transition-all duration-300 hover:text-zinc-900 hover:translate-x-2"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Colonne 3 : Réseaux */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              {lang === "fr" ? "Réseaux" : "Socials"}
            </span>
            <nav className="flex flex-col gap-3">
              {[
                { name: "LinkedIn", link: "https://www.linkedin.com/in/mathis-chhour/" },
                { name: "Instagram", link: "https://www.instagram.com/mathischhour/" },
                { name: lang === "fr" ? "Mon CV (PDF)" : "My Resume (PDF)", link: "/cv-mathis-chhour.pdf" }
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-zinc-500 font-medium w-fit transition-colors hover:text-zinc-900"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full transition-all duration-300 group-hover:w-5 group-hover:rounded-md"
                    style={{ backgroundColor: activeColor }}
                  ></span>
                  {social.name}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* === SECTION BOTTOM === */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-zinc-200 text-xs md:text-sm text-zinc-400 gap-4">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} Mathis CHHOUR.{" "}
            {lang === "fr" ? "Tous droits réservés." : "All rights reserved."}
          </p>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 hover:text-zinc-900 transition-colors"
          >
            {lang === "fr" ? "Retour en haut" : "Back to top"}
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1"
              style={{ color: activeColor }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>

      {/* LETTRAGE GEANT : Caché sur mobile pour éviter le scroll horizontal, visible dès sm: */}
      <div className="hidden sm:block absolute -bottom-20 left-1/2 -translate-x-1/2 text-[10rem] md:text-[15rem] font-black text-zinc-900/5 whitespace-nowrap pointer-events-none select-none">
        MATHIS CHHOUR
      </div>
    </footer>
  );
}