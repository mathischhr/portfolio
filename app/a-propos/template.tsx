"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Template({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animation d'entrée : la page arrive en fondu
    // Cela rendra le passage Accueil <-> À Propos <-> Projets très fluide
    gsap.fromTo(
      containerRef.current,
      { 
        opacity: 0, 
      },
      { 
        opacity: 1, 
        duration: 0.8, 
        ease: "power2.out",
        clearProps: "all" // Nettoie les styles après l'animation
      }
    );
  }, []);

  return (
    <div ref={containerRef}>
      {children}
    </div>
  );
}