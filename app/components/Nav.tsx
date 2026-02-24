"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const listRef = useRef<(HTMLLIElement | null)[]>([]);
  const { lang, toggleLanguage } = useLanguage();

  const isProjectPage = pathname.startsWith("/projets");

  const navLinks = [
    { name: lang === "fr" ? "Accueil" : "Home", path: "/", color: "#ea743f" },
    {
      name: lang === "fr" ? "Projets" : "Projects",
      path: "/projets",
      color: "#3b82f6",
    },
    {
      name: lang === "fr" ? "À propos de moi" : "About me",
      path: "/a-propos",
      color: "#8ea522",
    },
  ];

  const activeLink =
    navLinks.find((link) => link.path === pathname) || navLinks[0];

  const activeColor = isProjectPage ? "var(--project-color)" : activeLink.color;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const activeIndex = navLinks.findIndex((link) => link.path === pathname);
    const activeElement = listRef.current[activeIndex];
    const updateIndicator = () => {
      if (activeElement) {
        setIndicatorStyle({
          left: activeElement.offsetLeft,
          width: activeElement.offsetWidth,
          opacity: 1,
        });
      }
    };
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [pathname, lang]);

  const handleLangSwitch = () => {
    document.documentElement.style.scrollBehavior = "auto";
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    toggleLanguage();
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.body.style.overflow = "";
      setTimeout(() => {
        document.documentElement.style.scrollBehavior = "smooth";
      }, 50);
    }, 300);
  };

  return (
    <header
      className={`fixed z-[100] transition-all duration-700 flex justify-center w-full ${isScrolled && !isProjectPage ? "top-6" : "top-0"}`}
    >
      <nav
        className={`relative flex items-center justify-between px-8 py-6 transition-all duration-700 ${
          isProjectPage
            ? "w-full bg-transparent border-transparent shadow-none"
            : isScrolled
              ? "w-[90%] md:w-[70%] rounded-full shadow-lg bg-white/90 backdrop-blur-md border border-zinc-200"
              : "w-full bg-white border-b border-zinc-100"
        }`}
        style={{ color: isProjectPage ? activeColor : undefined }}
      >
        {/* Logo */}
        <Link
          href="/"
          className={`font-black text-2xl tracking-tighter transition-colors duration-500 ${isProjectPage ? "" : "text-zinc-900"}`}
          style={{ color: isProjectPage ? activeColor : undefined }}
        >
          MC<span style={{ color: activeColor }}>.</span>
        </Link>

        {/* Liens */}
        <ul className="relative flex space-x-2 md:space-x-12 text-[10px] uppercase tracking-[0.2em] font-bold items-center">
          {navLinks.map((link, index) => {
            const isActive = pathname === link.path;
            return (
              <li
                key={link.path}
                ref={(el) => {
                  listRef.current[index] = el;
                }}
                className="relative z-10"
              >
                <Link
                  href={link.path}
                  className={`block px-2 py-2 transition-colors duration-500 ${
                    isProjectPage
                      ? "hover:opacity-50"
                      : isActive
                        ? "text-zinc-900"
                        : "text-zinc-400 hover:text-zinc-600"
                  }`}
                  style={{
                    color: isProjectPage && isActive ? activeColor : undefined,
                  }}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
          {/* L'indicateur */}
          <div
            className="absolute bottom-0 h-[1.5px] transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
              backgroundColor: activeColor,
              opacity: indicatorStyle.opacity,
            }}
          />
        </ul>

        {/* Bouton Langue */}
        <button
          onClick={handleLangSwitch}
          className={`flex items-center gap-1 text-[10px] font-bold tracking-widest transition-colors duration-500 ${!isProjectPage ? "text-zinc-900" : ""}`}
          style={{ color: isProjectPage ? activeColor : undefined }}
        >
          <span className={`${lang === "fr" ? "opacity-100" : "opacity-40"}`}>
            FR
          </span>
          <span className="mx-1 opacity-20">/</span>
          <span className={`${lang === "en" ? "opacity-100" : "opacity-40"}`}>
            EN
          </span>
        </button>
      </nav>
    </header>
  );
}
