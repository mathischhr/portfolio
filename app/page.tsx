"use client";
import Hero from "./components/Hero";
import SkillsHorizontal from "./components/SkillsHorizontal";
import Projects from "./components/Projects";
import { useLanguage } from "./context/LanguageContext";

export default function Home() {
  const { lang } = useLanguage();

  return (
    <main>
      <Hero />
      <SkillsHorizontal key={`skills-${lang}`} />
      <Projects key={`projects-${lang}`} />
    </main>
  );
}
