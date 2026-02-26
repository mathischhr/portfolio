"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";
import { projectsData } from "../data/projectsData";

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1);
  const pathname = usePathname();
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const listRef = useRef<(HTMLLIElement | null)[]>([]);
  const { lang, toggleLanguage } = useLanguage();

  const isProjectPage = pathname.startsWith("/projets");

  const navLinks = [
    { name: lang === "fr" ? "Accueil" : "Home", path: "/", color: "#ea743f" },
    { name: lang === "fr" ? "Projets" : "Projects", path: "/projets", color: "#3b82f6" },
    { name: lang === "fr" ? "À propos" : "About", path: "/a-propos", color: "#8ea522" },
  ];

  const activeLink = navLinks.find((link) => link.path === pathname) || navLinks[0];
  const activeColor = isProjectPage ? "var(--project-color)" : activeLink.color;

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const idx = document.documentElement.getAttribute("data-project-index");
      if (idx) setCurrentIndex(parseInt(idx));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-project-index"] });
    return () => observer.disconnect();
  }, []);

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
    <header className={`fixed z-[200] transition-all duration-700 flex justify-center w-full ${isScrolled || isProjectPage ? "top-6 px-4" : "top-0 px-0"}`}>
      
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[120] md:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* MENU MOBILE SLIDE */}
      <div className={`fixed top-0 right-0 w-[80%] h-full z-[130] md:hidden flex flex-col items-center justify-center shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${isOpen ? "translate-x-0" : "translate-x-full"} bg-zinc-900`}>
        <ul className="flex flex-col items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link href={link.path} onClick={() => setIsOpen(false)} className="text-sm uppercase tracking-[0.3em] font-bold text-white/50 hover:text-white" style={{ color: pathname === link.path ? activeColor : undefined }}>{link.name}</Link>
            </li>
          ))}
          <button onClick={toggleLanguage} className="mt-4 text-white font-bold tracking-[0.2em] text-[10px]">{lang === "fr" ? "EN VERSION" : "FR VERSION"}</button>
        </ul>
      </div>

      {/* BARRE DE NAV */}
      <nav className={`relative flex items-center justify-between transition-all duration-700 z-[140]
          ${isScrolled || isProjectPage
            ? "w-full max-w-7xl rounded-full shadow-lg bg-white/95 backdrop-blur-md border border-zinc-200 px-8 py-3"
            : "w-full bg-white border-b border-zinc-100 px-8 py-6"
          }`}
      >
        <Link 
          href="/" 
          className="font-black text-2xl tracking-tighter transition-colors duration-500" 
          style={{ color: isProjectPage ? activeColor : "#18181b" }}
        >
          MC<span style={{ color: activeColor }}>.</span>
        </Link>

        {/* PAGINATION MOBILE DYNAMIQUE */}
        {isProjectPage && (
          <div className="md:hidden flex items-center gap-2 absolute left-1/2 -translate-x-1/2 pointer-events-none">
            <span className="text-[10px] font-black transition-colors duration-500" style={{ color: activeColor }}>
              0{currentIndex}
            </span>
            
            <div className="w-8 h-[2px] bg-zinc-100 relative overflow-hidden rounded-full">
               <div 
                 className="absolute inset-y-0 left-0 transition-all duration-500 ease-out" 
                 style={{ 
                   width: `${(currentIndex / projectsData.length) * 100}%`,
                   backgroundColor: activeColor 
                 }} 
               />
            </div>

            <span className="text-[10px] font-bold text-zinc-300">
              0{projectsData.length}
            </span>
          </div>
        )}

        {/* LIENS PC */}
        <div className="hidden md:flex items-center gap-12">
          <ul className="relative flex space-x-12 text-[10px] uppercase tracking-[0.2em] font-bold">
            {navLinks.map((link, index) => (
              <li key={link.path} ref={(el) => { listRef.current[index] = el; }}>
                <Link href={link.path} className="transition-colors text-zinc-400 hover:text-zinc-900" style={{ color: pathname === link.path ? activeColor : undefined }}>{link.name}</Link>
              </li>
            ))}
            <div className="absolute bottom-[-8px] h-[1.5px] transition-all duration-500" style={{ left: indicatorStyle.left, width: indicatorStyle.width, backgroundColor: activeColor, opacity: indicatorStyle.opacity }} />
          </ul>
          <button onClick={toggleLanguage} className="flex items-center gap-1 text-[10px] font-bold tracking-widest text-[#18181b]">
            <span className={lang === "fr" ? "opacity-100" : "opacity-30"}>FR</span>
            <span className={lang === "en" ? "opacity-100" : "opacity-30"}>EN</span>
          </button>
        </div>

        {/* HAMBURGER : La couleur s'adapte même quand c'est ouvert */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden p-2 flex flex-col items-end gap-1.5 z-[200] transition-colors duration-500" 
          style={{ 
            color: isProjectPage ? activeColor : (isOpen ? "white" : "#18181b") 
          }}
        >
          <div className={`h-0.5 bg-current transition-all duration-300 ${isOpen ? "w-6 rotate-45 translate-y-2" : "w-6"}`} />
          <div className={`h-0.5 bg-current transition-all duration-300 ${isOpen ? "opacity-0" : "w-4"}`} />
          <div className={`h-0.5 bg-current transition-all duration-300 ${isOpen ? "w-6 -rotate-45 -translate-y-1" : "w-2"}`} />
        </button>
      </nav>
    </header>
  );
}