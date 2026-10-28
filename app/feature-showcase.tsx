"use client";

import { useEffect, useRef, useState } from "react";
import { app, showcaseMedia } from "@/lib/release";
import { Badge } from "@/components/ui/badge";

// Feature summary drawn from the product docs (product-feat/README.md).
const features = [
  {
    title: "AI agents that know your board",
    body: "Voltron, Aura, Legal and RAOARA stream answers with citations, images and Action Panels. Type @ to point them at board files.",
  },
  {
    title: "Action Lists, Items and Goals",
    body: "Track tasks with Eisenhower priority, dates, tags and assignees, and set board goals with owners and status.",
  },
  {
    title: "Team Messages",
    body: "Live board chat with threads, reactions, attachments, and mentions of people, lists, goals and tasks.",
  },
  {
    title: "Resource files",
    body: "Folders, bulk uploads and tags, with files indexed so the AI can read and reference them.",
  },
  {
    title: "Calendar and Members",
    body: "A shared board schedule with attendees, and invites for Members and Admins.",
  },
];

export function FeatureShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Play only while on screen, and never autoplay for reduced-motion users.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motion.matches);
    if (motion.matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.35 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="page-container grid items-center gap-8 pt-16 pb-8 md:grid-cols-[minmax(0,1fr)_minmax(0,320px)] md:gap-16"
      id="market-analysis"
      aria-labelledby="showcase-h"
    >
      <div className="grid min-w-0 justify-items-start gap-5">
        <Badge variant="secondary">Board-aware AI</Badge>
        <h2 id="showcase-h" className="max-w-[18ch] text-section">
          Your team’s work, with an AI that knows it.
        </h2>
        <p className="max-w-[44ch] text-lede text-foreground-2">
          {app.name} keeps a team’s tasks, goals, files, chat and calendar together in boards. Its AI agents read
          that context to plan, research, draft and get work done.
        </p>
        <ol className="my-2 grid w-full max-w-[34rem] [counter-reset:feature]">
          {features.map((s) => (
            <li
              key={s.title}
              className="relative grid gap-0.5 border-b py-4 pl-10 [counter-increment:feature] first:pt-0 last:border-0 last:pb-0 before:absolute before:left-0 before:font-mono before:text-[0.9375rem] before:content-[counter(feature,decimal-leading-zero)]"
            >
              <h3 className="text-base tracking-normal">{s.title}</h3>
              <p className="text-foreground-2">{s.body}</p>
            </li>
          ))}
        </ol>
        <p>
          In the video, Market Analysis, one of many things {app.name} can do: a single question about a men’s cloth
          shop in Chittagong becomes live web research and a full trend and competitor readout.
        </p>
      </div>

      <div className="phone-stage max-md:max-w-[280px]">
        <span className="orb orb--1" aria-hidden="true" />
        <span className="orb orb--2" aria-hidden="true" />
        <span className="orb orb--3" aria-hidden="true" />
        <div className="phone">
          <video
            ref={videoRef}
            className="phone-screen"
            src={showcaseMedia.video}
            poster={showcaseMedia.poster}
            width={540}
            height={1170}
            muted
            loop
            playsInline
            preload="metadata"
            controls={reducedMotion}
            aria-label={`${app.name} AI chat running a market analysis: the question is planned, searched, researched and answered`}
          />
        </div>
      </div>
    </section>
  );
}
