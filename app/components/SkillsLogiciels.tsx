"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function SkillsLogiciels() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(".track-1", { xPercent: -16.66, ease: "none", duration: 18, repeat: -1 });
    gsap.fromTo(".track-2", { xPercent: -16.66 }, { xPercent: 0, ease: "none", duration: 32, repeat: -1 });
    gsap.to(".track-3", { xPercent: -16.66, ease: "none", duration: 45, repeat: -1 });
    gsap.to(".star-svg", { rotation: 360, duration: 50, ease: "none", repeat: -1 });
  }, { scope: containerRef });

  const orange = "text-[#ea743f]";
  const bleu = "text-[#3b82f6]";
  const vert = "text-[#8ea522]";

  const Content1 = () => (
    <span className="pr-8 md:pr-12">
      <span className={orange}>SUITE ADOBE</span> &nbsp;—&nbsp; CANVA &nbsp;—&nbsp; <span className={bleu}>CAPCUT</span> &nbsp;—&nbsp; <span className={vert}>LIGHTROOM</span> &nbsp;—&nbsp; INDESIGN &nbsp;—&nbsp;
    </span>
  );

  const Content2 = () => (
    <span className="pr-8 md:pr-12">
      <span className={bleu}>WORDPRESS</span> &nbsp;—&nbsp; <span className={orange}>FIGMA</span> &nbsp;—&nbsp; VS CODE &nbsp;—&nbsp; <span className={bleu}>GOOGLE ANALYTICS</span> &nbsp;—&nbsp; GIT/GITHUB &nbsp;—&nbsp;
    </span>
  );

  const Content3 = () => (
    <span className="pr-8 md:pr-12">
      <span className={vert}>NOTION</span> &nbsp;—&nbsp; <span className={vert}>TRELLO</span> &nbsp;—&nbsp; SUITE OFFICE &nbsp;—&nbsp; SOLIDWORKS &nbsp;—&nbsp; MATLAB &nbsp;—&nbsp; ARDUINO &nbsp;—&nbsp;
    </span>
  );

  return (
    <section ref={containerRef} className="relative w-full py-16 md:py-32 overflow-hidden flex flex-col items-center justify-center bg-white text-[#1a1a1a]">
      
      {/* Étoile : plus grande sur mobile (85vw) et plus petite sur PC (30vw) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none z-0 text-gray-400">
        <svg className="star-svg w-[85vw] h-[85vw] md:w-[30vw] md:h-[30vw]" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 0L53.5 35.5L85.5 14.5L64.5 46.5L100 50L64.5 53.5L85.5 85.5L53.5 64.5L50 100L46.5 64.5L14.5 85.5L35.5 53.5L0 50L35.5 46.5L14.5 14.5L46.5 35.5L50 0Z" />
        </svg>
      </div>

      <div className="relative z-10 w-full flex flex-col gap-6 md:gap-4">
        {/* Tailles de texte : text-3xl sur mobile, 2vw sur PC */}
        <div className="w-full flex overflow-hidden py-1">
          <div className="track-1 flex whitespace-nowrap text-3xl md:text-[2vw] font-black uppercase tracking-tighter">
            <Content1 /><Content1 /><Content1 /><Content1 /><Content1 /><Content1 />
          </div>
        </div>

        <div className="w-full flex overflow-hidden py-1">
          <div className="track-2 flex whitespace-nowrap text-3xl md:text-[2vw] font-black uppercase tracking-tighter">
            <Content2 /><Content2 /><Content2 /><Content2 /><Content2 /><Content2 />
          </div>
        </div>

        <div className="w-full flex overflow-hidden py-1">
          <div className="track-3 flex whitespace-nowrap text-3xl md:text-[2vw] font-black uppercase tracking-tighter">
            <Content3 /><Content3 /><Content3 /><Content3 /><Content3 /><Content3 />
          </div>
        </div>
      </div>

    </section>
  );
}