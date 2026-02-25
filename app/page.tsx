"use client";
import Hero from "./components/Hero";
import SkillsHorizontal from "./components/SkillsHorizontal";
import Projects from "./components/Projects";
// 1. AJOUTE CET IMPORT :
import SkillsLogiciels from "./components/SkillsLogiciels"; 
import { useLanguage } from "./context/LanguageContext";

export default function Home() {
  const { lang } = useLanguage();

  return (
    <main>
      <Hero />
      <SkillsHorizontal key={`skills-${lang}`} />
      
      {/* 2. AJOUTE LE COMPOSANT ICI (par exemple après tes skills horizontaux) */}
      <SkillsLogiciels />

      <Projects key={`projects-${lang}`} />
    </main>
  );
}