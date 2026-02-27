"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutManifesto({ lang }: { lang: "fr" | "en" }) {
  const manifestoRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const bioLines = gsap.utils.toArray(".bio-line");

      bioLines.forEach((line: any) => {
        gsap.fromTo(
          line,
          { opacity: 0.1 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: line,
              start: "top 85%",
              end: "top 50%",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: manifestoRef },
  );

  return (
    <section
      ref={manifestoRef}
      className="relative w-full py-24 md:py-48 px-6 md:px-24 flex justify-center border-t border-zinc-300/30 bg-[#EBE9E0]"
    >
      <div className="max-w-5xl text-[7.5vw] md:text-6xl font-black uppercase tracking-tighter leading-[1.1] text-zinc-900">
        {lang === "fr" ? (
          <div className="flex flex-wrap gap-x-[1.5vw]">
            <span className="bio-line inline-block">Expert en stratégie et</span>{" "}
            <span className="bio-line inline-block text-[#8ea522]">
              communication digitale,
            </span>{" "}
            <span className="bio-line inline-block">
              je fusionne vision créative
            </span>{" "}
            <span className="bio-line inline-block">et maîtrise technique.</span>{" "}
            
            <span className="w-full h-6 md:h-12"></span>

            <span className="bio-line inline-block">
              Mon but : propulser votre
            </span>{" "}
            <span className="bio-line inline-block text-[#8ea522]">
              visibilité en ligne
            </span>{" "}
            <span className="bio-line inline-block">
              et garantir l'impact
            </span>{" "}
            <span className="bio-line inline-block">
              de chacun de vos messages.
            </span>
          </div>
        ) : (
          <div className="flex flex-wrap gap-x-[1.5vw]">
            <span className="bio-line inline-block">
              Digital strategy and
            </span>{" "}
            <span className="bio-line inline-block text-[#8ea522]">
              communication specialist,
            </span>{" "}
            <span className="bio-line inline-block">
              I blend creative vision
            </span>{" "}
            <span className="bio-line inline-block">with technical mastery.</span>{" "}

            <span className="w-full h-6 md:h-12"></span>

            <span className="bio-line inline-block">
              My goal: boosting your
            </span>{" "}
            <span className="bio-line inline-block text-[#8ea522]">
              online visibility
            </span>{" "}
            <span className="bio-line inline-block">and ensuring the impact</span>{" "}
            <span className="bio-line inline-block">
              of your every message.
            </span>
          </div>
        )}
      </div>
    </section>
  );
}