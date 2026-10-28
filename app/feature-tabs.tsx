"use client";

import type { CSSProperties, ReactNode } from "react";
import {
  AtSign,
  CalendarDays,
  CircleCheckBig,
  Folder,
  Grid2x2,
  ListTodo,
  MessageCircle,
  Tag,
  Target,
  Users,
  Zap,
  Check,
} from "lucide-react";
import { app } from "@/lib/release";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type FeatureCard = { title: string; body: string; accent: string; icon: ReactNode; visual: ReactNode };
type Tab = { id: string; label: string; cards: FeatureCard[] };

const delay = (i: number, step = 0.12) => ({ animationDelay: `${i * step}s` });
const tile = "fv-tile flex justify-between gap-3 px-3 py-2.5";
const meta = "font-mono text-[0.8125rem] text-(--band-muted)";

/* ---- small decorative illustrations, one per card ---- */

const StatusRings = () => (
  <div className="fv-rings">
    {["todo", "doing", "review", "done"].map((s) => (
      <span key={s} className={`fv-ring fv-ring--${s}`}>
        {s === "done" && <Check className="size-5" />}
      </span>
    ))}
  </div>
);

const Matrix = () => (
  <div className="grid grid-cols-2 gap-2">
    {["Todo", "In progress", "AutoActionAssist", "Done"].map((t, i) => (
      <div
        key={t}
        className={`fv-tile grid min-h-16 place-items-center p-3 text-center font-medium break-all ${t === "AutoActionAssist" ? "bg-[#6c22e0]! shadow-[0_0_24px_rgb(108_34_224/0.55)]" : ""}`}
        style={delay(i, 0.15)}
      >
        {t}
      </div>
    ))}
  </div>
);

const Bars = ({ rows }: { rows: [string, number, string?][] }) => (
  <ul className="grid gap-3">
    {rows.map(([t, p, tag], i) => (
      <li key={t}>
        <div className="flex justify-between gap-3">
          <span>{t}</span>
          {tag && <em className={`${meta} not-italic`}>{tag}</em>}
        </div>
        <i className="fv-bar" style={{ "--p": `${p}%`, ...delay(i, 0.3) } as CSSProperties} />
      </li>
    ))}
  </ul>
);

const Lines = ({ rows }: { rows: [string, string][] }) => (
  <ul className="grid gap-2">
    {rows.map(([a, b], i) => (
      <li key={a} className={tile} style={delay(i)}>
        <span>{a}</span>
        <em className={`${meta} not-italic`}>{b}</em>
      </li>
    ))}
  </ul>
);

const Chips = ({ items }: { items: string[] }) => (
  <div className="flex flex-wrap gap-2">
    {items.map((c, i) => (
      <span
        key={c}
        className="fv-tile fv-tile--hot rounded-full border border-white/15 px-3 py-1.5 font-mono text-[0.8125rem]"
        style={delay(i, 0.1)}
      >
        {c}
      </span>
    ))}
  </div>
);

const Month = () => {
  const events = new Set([3, 8, 9, 14, 17, 22, 27]);
  return (
    <div className="grid grid-cols-7 gap-1 text-center font-mono text-[0.8125rem]">
      {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
        <b key={i} className="font-normal text-(--band-muted)">
          {d}
        </b>
      ))}
      {Array.from({ length: 28 }, (_, i) => i + 1).map((d) => (
        <span key={d} className={`relative rounded-lg pt-1.5 pb-2.5 ${d === 17 ? "fv-tile--hot" : ""}`}>
          {d}
          {events.has(d) && <i className="absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-white/80" />}
        </span>
      ))}
    </div>
  );
};

const Attendees = () => (
  <div className="grid gap-5">
    <div className="fv-tile grid gap-0.5 border-l-[3px] border-white/70 p-3">
      <strong className="font-medium">Design review</strong>
      <span className="text-[0.8125rem] text-(--band-muted)">Thu · 15:00 – 16:00 · Room 2</span>
    </div>
    <div className="flex items-center">
      {["RA", "MK", "SH", "TN"].map((n, i) => (
        <span
          key={n}
          className="-mr-2.5 grid size-10 place-items-center rounded-full border-2 border-[oklch(17%_0.02_275)] text-xs font-medium"
          style={{ background: `oklch(62% 0.15 ${260 + i * 35})` }}
        >
          {n}
        </span>
      ))}
      <em className="ml-5 text-(--band-muted) not-italic">+3</em>
    </div>
  </div>
);

const Bubbles = () => (
  <div className="grid gap-2">
    <p className="fv-tile max-w-[85%] rounded-[14px_14px_14px_4px] px-3.5 py-2.5">Draft is in Resource, can you check?</p>
    <p className="fv-tile fv-tile--hot max-w-[85%] justify-self-end rounded-[14px_14px_4px_14px] px-3.5 py-2.5" style={delay(1, 0.15)}>
      On it. Replying in thread.
    </p>
    <div className="flex gap-1.5 text-[0.8125rem]">
      {["👍 4", "🔥 2", "✅ 1"].map((r) => (
        <span key={r} className="rounded-full bg-white/8 px-2.5 py-0.5">
          {r}
        </span>
      ))}
    </div>
  </div>
);

const Mentions = () => (
  <div className="grid gap-3">
    <p>
      Ship it before <mark className="fv-tile--hot rounded-md px-1.5 text-inherit">@Launch beta</mark>
    </p>
    <ul className="fv-tile grid p-1.5">
      {[
        ["Member", "Rafi Ahmed"],
        ["Goal", "Launch beta"],
        ["Item", "Fix login copy"],
      ].map(([k, v]) => (
        <li key={k} className={`flex gap-3 rounded-lg px-2.5 py-2 ${k === "Goal" ? "bg-white/8" : ""}`}>
          <b className={`${meta} w-18 font-normal`}>{k}</b> {v}
        </li>
      ))}
    </ul>
  </div>
);

const Live = () => (
  <div className="grid gap-2">
    <span className="flex items-center gap-3">
      <span className="fv-dot" /> Live
    </span>
    {["Mitu edited a message", "Sami reacted 👍", "Tanvir replied in thread"].map((t, i) => (
      <p key={t} className={tile} style={delay(i, 0.15)}>
        {t}
      </p>
    ))}
  </div>
);

/* ---- tab content, from the product docs ---- */

const tabs: Tab[] = [
  {
    id: "productivity",
    label: "Productivity",
    cards: [
      {
        title: "Action Items",
        body: "Create tasks with status, dates, tags, notes and files, then assign them to board members.",
        accent: "oklch(55% 0.2 275)",
        icon: <ListTodo />,
        visual: <StatusRings />,
      },
      {
        title: "Eisenhower priority",
        body: "Flag work as important or urgent, then filter and sort to see what matters first.",
        accent: "oklch(58% 0.17 245)",
        icon: <Grid2x2 />,
        visual: <Matrix />,
      },
      {
        title: "Action Goals",
        body: "Set board objectives with an owner, priority, status and dates, and filter by any of them.",
        accent: "oklch(60% 0.16 155)",
        icon: <Target />,
        visual: (
          <Bars
            rows={[
              ["Launch beta", 82, "High"],
              ["Onboard 3 teams", 54, "Medium"],
              ["Close Q4 report", 30, "Low"],
            ]}
          />
        ),
      },
    ],
  },
  {
    id: "resources",
    label: "Resource Management",
    cards: [
      {
        title: "Folders and uploads",
        body: "Nested folders and a multi-file upload queue with progress, cancel and retry.",
        accent: "oklch(60% 0.15 200)",
        icon: <Folder />,
        visual: (
          <Bars
            rows={[
              ["Brand-guide.pdf", 100],
              ["Q4-sales.xlsx", 68],
              ["Store-photos.zip", 35],
            ]}
          />
        ),
      },
      {
        title: "Files the AI can read",
        body: "Uploaded files can be indexed, so you can type @ in AI Chat and point an agent at them.",
        accent: "oklch(55% 0.22 300)",
        icon: <AtSign />,
        visual: <Chips items={["@Brand-guide.pdf", "@Q4-sales.xlsx", "@Store-photos", "@Supplier-list"]} />,
      },
      {
        title: "Tag, move and search",
        body: "Tag and rename files, move them between folders or boards, and search by name.",
        accent: "oklch(62% 0.15 70)",
        icon: <Tag />,
        visual: (
          <Lines
            rows={[
              ["Contracts / 2026", "12 files"],
              ["Marketing / Eid", "34 files"],
              ["Receipts", "58 files"],
              ["Storage used", "2.4 GB"],
            ]}
          />
        ),
      },
    ],
  },
  {
    id: "calendar",
    label: "Calendar",
    cards: [
      {
        title: "Month at a glance",
        body: "A month grid that marks every day with events, with swipes between months.",
        accent: "oklch(58% 0.18 25)",
        icon: <CalendarDays />,
        visual: <Month />,
      },
      {
        title: "Day agenda",
        body: "A draggable schedule panel lists what is on for the selected day.",
        accent: "oklch(60% 0.15 230)",
        icon: <CircleCheckBig />,
        visual: (
          <Lines
            rows={[
              ["09:30", "Stand-up"],
              ["11:00", "Supplier call"],
              ["15:00", "Design review"],
              ["All day", "Eid stock count"],
            ]}
          />
        ),
      },
      {
        title: "Events with attendees",
        body: "Add a title, location, times, status, colour and the board members who should attend.",
        accent: "oklch(56% 0.2 320)",
        icon: <Users />,
        visual: <Attendees />,
      },
    ],
  },
  {
    id: "chat",
    label: "Group Chat",
    cards: [
      {
        title: "Threads and reactions",
        body: "Board chat with replies, reactions, edits and attachments, all in one place.",
        accent: "oklch(58% 0.17 260)",
        icon: <MessageCircle />,
        visual: <Bubbles />,
      },
      {
        title: "Mention people and work",
        body: "Tag members, or link an Action List, Goal or Item straight into the conversation.",
        accent: "oklch(60% 0.17 150)",
        icon: <AtSign />,
        visual: <Mentions />,
      },
      {
        title: "Live, and never lost",
        body: "Messages arrive live, and a failed send puts your draft back so nothing you typed is lost.",
        accent: "oklch(62% 0.16 45)",
        icon: <Zap />,
        visual: <Live />,
      },
    ],
  },
];

export function FeatureTabs() {
  return (
    <section className="page-container pt-16 pb-8" id="features" aria-labelledby="features-h">
      <Tabs defaultValue={tabs[0].id} className="gap-8">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
          <div>
            <h2 id="features-h" className="text-section">
              One board for the whole team.
            </h2>
            <p className="mt-2 max-w-[32ch] text-lede">Everything {app.name} does, beyond the AI chat.</p>
          </div>
          <TabsList
            variant="line"
            className="group-data-horizontal/tabs:h-auto max-w-full flex-wrap justify-start gap-x-6 gap-y-3 border-b p-0 pb-3"
          >
            {tabs.map((t) => (
              <TabsTrigger key={t.id} value={t.id} className="h-10 flex-none px-0 text-base">
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {tabs.map((t) => (
          <TabsContent key={t.id} value={t.id} className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-5">
            {t.cards.map((c) => (
              <Card
                key={c.title}
                className="fcard gap-5 rounded-2xl border pt-8 pb-5 ring-0 md:min-h-[420px]"
                style={{ "--accent-glow": c.accent } as CSSProperties}
              >
                <CardHeader className="flex items-center gap-3 px-5">
                  <span className="fcard-icon grid size-11 place-items-center rounded-xl border border-white/15 text-(--band-ink) [&_svg]:size-5">
                    {c.icon}
                  </span>
                  <CardTitle className="text-lede font-medium text-(--band-ink)">{c.title}</CardTitle>
                </CardHeader>
                <CardContent className="grid flex-1 grid-rows-[auto_1fr] gap-5 px-5 text-[0.9375rem]">
                  <p className="border-b border-(--band-rule) pb-5 text-[oklch(88%_0.01_275)]">{c.body}</p>
                  <div className="grid min-w-0 content-center text-(--band-ink)" aria-hidden="true">
                    {c.visual}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
