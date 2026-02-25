"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const listRef = useRef<(HTMLLIElement | null)[]>([]);
  const { lang, toggleLanguage } = useLanguage();

  const isProjectPage = pathname.startsWith("/projets");
  const navLinks = [
    { name: lang === "fr" ? "Accueil" : "Home", path: "/", color: "#ea743f" },
    { name: lang === "fr" ? "Projets" : "Projects", path: "/projets", color: "#3b82f6" },
    { name: lang === "fr" ? "À propos de moi" : "About me", path: "/a-propos", color: "#8ea522" },
  ];

  const activeLink = navLinks.find((link) => link.path === pathname) || navLinks[0];
  const activeColor = isProjectPage ? "var(--project-color)" : activeLink.color;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const activeIndex = navLinks.findIndex((link) => link.path === pathname);
    const activeElement = listRef.current[activeIndex];
    if (activeElement) {
      setIndicatorStyle({ left: activeElement.offsetLeft, width: activeElement.offsetWidth, opacity: 1 });
    }
  }, [pathname, lang]);

  return (
    <header className={`fixed z-[100] transition-all duration-700 flex justify-center w-full ${isScrolled && !isProjectPage ? "top-6 px-4" : "top-0 px-0"}`}>
      
      {/* Overlay sombre */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-[120] md:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* TIROIR MOBILE CORRIGÉ */}
      <div className={`
        fixed top-0 right-0 w-[85%] h-full z-[130] md:hidden
        flex flex-col items-center justify-center shadow-2xl
        transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]
        ${isOpen ? "translate-x-0" : "translate-x-full"}
        ${isProjectPage ? "bg-zinc-900" : "bg-white"}
      `}>
        <ul className="flex flex-col items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link href={link.path} onClick={() => setIsOpen(false)}
                className={`text-sm uppercase tracking-[0.3em] font-bold transition-colors
                  ${isProjectPage ? "text-white/50 hover:text-white" : "text-zinc-400 hover:text-zinc-900"}`}
                style={{ color: pathname === link.path ? activeColor : undefined }}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        
        <button onClick={toggleLanguage} className="mt-20 flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase">
          <span className={lang === "fr" ? "opacity-100" : "opacity-30"} style={{ color: isProjectPage ? "white" : "black" }}>FR</span>
          <span className="opacity-20" style={{ color: isProjectPage ? "white" : "black" }}>/</span>
          <span className={lang === "en" ? "opacity-100" : "opacity-30"} style={{ color: isProjectPage ? "white" : "black" }}>EN</span>
        </button>
      </div>

      {/* BARRE DE NAV PRINCIPALE */}
      <nav className={`relative flex items-center justify-between transition-all duration-700 z-[140]
          ${isProjectPage ? "w-full bg-transparent px-8 py-6" : isScrolled
          ? "w-full md:w-[70%] rounded-full shadow-lg bg-white/95 backdrop-blur-md border border-zinc-200 px-8 py-3"
          : "w-full bg-white border-b border-zinc-100 px-8 py-6"
        }`}
      >
        {/* LOGO */}
        <Link href="/" className="font-black text-2xl tracking-tighter transition-colors" 
          style={{ color: isProjectPage ? activeColor : "#18181b" }}>
          MC<span style={{ color: activeColor }}>.</span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-12">
          <ul className="relative flex space-x-12 text-[10px] uppercase tracking-[0.2em] font-bold">
            {navLinks.map((link, index) => (
              <li key={link.path} ref={(el) => { listRef.current[index] = el; }}>
                <Link href={link.path} className={`transition-colors ${isProjectPage ? "text-white/70 hover:text-white" : "text-zinc-400 hover:text-zinc-900"}`}
                  style={{ color: pathname === link.path ? activeColor : undefined }}>
                  {link.name}
                </Link>
              </li>
            ))}
            <div className="absolute bottom-[-8px] h-[1.5px] transition-all duration-500"
              style={{ left: indicatorStyle.left, width: indicatorStyle.width, backgroundColor: activeColor, opacity: indicatorStyle.opacity }}
            />
          </ul>
          
          <button onClick={toggleLanguage} className="flex items-center gap-1 text-[10px] font-bold tracking-widest"
            style={{ color: isProjectPage ? activeColor : "#18181b" }}>
            <span className={lang === "fr" ? "opacity-100" : "opacity-30"}>FR</span>
            <span className={lang === "en" ? "opacity-100" : "opacity-30"}>EN</span>
          </button>
        </div>

        {/* BURGER / CROIX (MOBILE) */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 flex flex-col items-end gap-1.5 transition-colors"
          style={{ color: isProjectPage || (isOpen && isProjectPage) ? activeColor : "#18181b" }}>
          <div className={`h-0.5 bg-current transition-all duration-300 ${isOpen ? "w-6 rotate-45 translate-y-2" : "w-6"}`} />
          <div className={`h-0.5 bg-current transition-all duration-300 ${isOpen ? "opacity-0" : "w-4"}`} />
          <div className={`h-0.5 bg-current transition-all duration-300 ${isOpen ? "w-6 -rotate-45 -translate-y-1" : "w-2"}`} />
        </button>
      </nav>
    </header>
  );
}