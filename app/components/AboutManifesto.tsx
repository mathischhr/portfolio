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
  className="relative w-full py-32 md:py-48 px-6 md:px-24 flex justify-center border-t border-zinc-300/30"
>
  <div className="max-w-5xl text-3xl md:text-6xl font-black uppercase tracking-tighter leading-[1.1]">
    {lang === "fr" ? (
      <>
        <span className="bio-line inline-block">
          Expert en stratégie et
        </span>{" "}
        <span className="bio-line inline-block text-[#8ea522]">
          communication digitale,
        </span>{" "}
        <span className="bio-line inline-block">
          je fusionne vision créative
        </span>{" "}
        <span className="bio-line inline-block">et outils techniques.</span>{" "}
        <span className="bio-line inline-block mt-8">
          Mon but est de valoriser
        </span>{" "}
        <span className="bio-line inline-block">
          l'image de marque
        </span>{" "}
        <span className="bio-line inline-block">
          et de maximiser
        </span>{" "}
        <span className="bio-line inline-block">
          l'impact de vos messages.
        </span>
      </>
    ) : (
      <>
        <span className="bio-line inline-block">
          Specialist in strategy and
        </span>{" "}
        <span className="bio-line inline-block text-[#8ea522]">
          digital communication,
        </span>{" "}
        <span className="bio-line inline-block">
          I merge creative vision
        </span>{" "}
        <span className="bio-line inline-block">with technical tools.</span>{" "}
        <span className="bio-line inline-block mt-8">
          My goal is to enhance
        </span>{" "}
        <span className="bio-line inline-block">brand identity</span>{" "}
        <span className="bio-line inline-block">and to maximize</span>{" "}
        <span className="bio-line inline-block">
          your message's impact.
        </span>
      </>
    )}
  </div>
</section>
  );
}
