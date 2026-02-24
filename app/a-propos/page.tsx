"use client";
import { useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import AboutHero from "../components/AboutHero";
import AboutManifesto from "../components/AboutManifesto";
import AboutConclusion from "../components/AboutConclusion";

export default function AboutPage() {
  const { lang } = useLanguage();

  const bgColor = "#EBE9E0";
  const textColor = "#1C1C1C";

  useEffect(() => {
    document.documentElement.style.setProperty("--project-color", textColor);
  }, []);

  return (
    <main
      className="w-full min-h-screen selection:bg-zinc-900 selection:text-white"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <AboutHero lang={lang} />
      <AboutManifesto lang={lang} />
      <AboutConclusion lang={lang} />
    </main>
  );
}
