"use client";

import { useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { extensions, metaLinks, platforms, app, type Platform } from "@/lib/release";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CopyCommand } from "./copy-command";
import { FeatureShowcase } from "./feature-showcase";
import { FeatureTabs } from "./feature-tabs";

const linkClass =
  "inline-flex items-center gap-1 text-[0.9375rem] text-foreground underline decoration-input underline-offset-4 transition-colors hover:decoration-foreground";

// Android robot head (lucide has no brand icons). Eyes are cut out so the button colour shows through.
const AndroidLogo = () => (
  <svg viewBox="3.4 7 17.2 9.7" className="h-[15px] w-[26px]" fill="currentColor" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M6.6 7.4a.6.6 0 0 1 .82.22l1.04 1.8A8 8 0 0 1 12 8.6a8 8 0 0 1 3.54.82l1.04-1.8a.6.6 0 1 1 1.04.6l-1.03 1.78A7.6 7.6 0 0 1 20.4 16.5H3.6a7.6 7.6 0 0 1 3.81-6.5L6.38 8.22a.6.6 0 0 1 .22-.82ZM8.6 13.9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm6.8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
    />
  </svg>
);

const FormatLabel = ({ platform, label }: { platform: Platform; label: string }) => (
  <>
    {platform.id === "android" && <AndroidLogo />}
    <span className="sr-only">{platform.label} </span>
    {label}
  </>
);

function PlatformDownload({ platform }: { platform: Platform }) {
  const [formatId, setFormatId] = useState(platform.formats[0]?.id);
  const format = platform.formats.find((f) => f.id === formatId) ?? platform.formats[0];

  if (platform.status === "soon" || !format) {
    return (
      <div className="grid justify-items-start gap-3">
        <Button size="lg" variant="secondary" className="h-11 rounded-full px-5 text-base" disabled>
          Coming soon
        </Button>
        <p>
          {platform.label} is on the way.{" "}
          <a className={linkClass} href="#news">
            Sign up below
          </a>{" "}
          and we will tell you when it is ready.
        </p>
      </div>
    );
  }

  return (
    <ButtonGroup className="max-sm:w-full">
      <Button asChild size="lg" className="h-11 rounded-l-full px-5 text-base max-sm:flex-1">
        <a href={format.href} download>
          Download
        </a>
      </Button>
      {platform.formats.length > 1 ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="lg" className="h-11 rounded-r-full border-l-foreground-2 px-5 text-base">
              <FormatLabel platform={platform} label={format.label} />
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuRadioGroup value={format.id} onValueChange={setFormatId}>
              {platform.formats.map((f) => (
                <DropdownMenuRadioItem key={f.id} value={f.id}>
                  {f.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <span className="inline-flex h-11 items-center gap-2 rounded-r-full border-l border-foreground-2 bg-primary pr-5 pl-4 font-medium text-primary-foreground">
          <FormatLabel platform={platform} label={format.label} />
        </span>
      )}
    </ButtonGroup>
  );
}

export function DownloadPage() {
  const [platformId, setPlatformId] = useState<string>(platforms[0].id);
  const soon = platforms.find((p) => p.id === platformId)?.status === "soon";

  return (
    <>
      {/* Download header */}
      <section
        className="page-container grid items-start gap-8 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,380px)] md:gap-16 md:pt-16"
        aria-labelledby="hero-h"
      >
        <div className="@container grid min-w-0 justify-items-start gap-5">
          <h1 id="hero-h" className="text-hero whitespace-nowrap">
            Action<span className="text-[#6c22e0]">board</span>
            <small className="ml-1.5 text-[clamp(11px,3.8cqw,1rem)] font-normal tracking-normal text-muted-foreground">
              in your mobile
            </small>
          </h1>
          <p className="text-[clamp(9px,3.2cqw,1.25rem)] leading-[1.55] whitespace-nowrap text-foreground-2">{app.tagline}</p>

          <Tabs value={platformId} onValueChange={setPlatformId} className="w-full gap-5">
            <TabsList variant="line" className="h-11 w-full max-w-md justify-start gap-8 border-b p-0">
              {platforms.map((p) => (
                <TabsTrigger key={p.id} value={p.id} className="flex-none px-0 text-base">
                  {p.label}
                  {p.status === "soon" && <span className="font-normal text-muted-foreground">soon</span>}
                </TabsTrigger>
              ))}
            </TabsList>
            {platforms.map((p) => (
              <TabsContent key={p.id} value={p.id} className="text-base">
                <PlatformDownload platform={p} />
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <Card className="bg-secondary shadow-none ring-0" aria-label="Release details">
          <CardContent className="grid gap-5 sm:grid-cols-2">
            <dl className="grid content-start gap-2 font-mono text-[0.9375rem] text-foreground-2 tabular-nums">
              {[
                ["Version", app.version],
                ["Released", app.released],
                ["Status", soon ? "Coming soon" : "Available"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-sans text-muted-foreground">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <ul className="grid content-start justify-items-start gap-1">
              {metaLinks.map((l) => (
                <li key={l.label}>
                  <a className={linkClass} href={l.href}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      <FeatureShowcase />
      <FeatureTabs />

      {/* Extension */}
      <section className="page-container grid justify-items-start gap-5 pt-16 pb-8" id="extension" aria-labelledby="ext-h">
        <h2 id="ext-h" className="text-section">
          Use {app.name} wherever you code
        </h2>
        <p className="max-w-[44ch] text-lede text-foreground-2">
          Add the extension to your coding agent, and call {app.name} from the prompt.
        </p>

        <Badge variant="secondary" className="mt-5">
          Extension
        </Badge>

        <Tabs defaultValue={extensions[0].id} className="w-full gap-5">
          <TabsList
            variant="line"
            className="group-data-horizontal/tabs:h-auto max-w-full flex-wrap justify-start gap-x-6 gap-y-3 border-b p-0 pb-3"
          >
            {extensions.map((e) => (
              <TabsTrigger key={e.id} value={e.id} className="h-10 flex-none px-0 text-base">
                {e.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {extensions.map((ext) => (
            <TabsContent key={ext.id} value={ext.id} className="grid gap-5 text-base">
              <div className="mt-5 grid gap-2">
                <h3 className="text-title">{ext.name}</h3>
                <p>{ext.blurb}</p>
              </div>

              <Card className="grid gap-0 py-0 text-base shadow-none ring-0 md:grid-cols-[1.4fr_1fr]">
                <div className="grid min-w-0 gap-5 p-5 md:p-8">
                  <h4>Install in {ext.name}</h4>
                  <ol className="grid list-decimal gap-3 pl-6 text-foreground-2 marker:text-muted-foreground">
                    <li>Open {ext.name}.</li>
                    <li>
                      {ext.commands.length > 1 ? "Copy the commands below." : "Copy the command below."}
                      <div className="mt-3 grid gap-2">
                        {ext.commands.map((c, i) => (
                          <CopyCommand
                            key={c}
                            command={c}
                            label={`Copy ${ext.name} ${ext.commands.length > 1 ? `command ${i + 1}` : "install command"}`}
                          />
                        ))}
                      </div>
                    </li>
                    <li>
                      {ext.where === "chat" ? "Paste each one into the chat and press " : "Paste it into your terminal and press "}
                      <kbd className="rounded-md bg-secondary px-1.5 py-px font-mono text-[0.9375rem] text-foreground">Enter</kbd>
                      {ext.where === "chat" ? ", in order." : "."}
                    </li>
                  </ol>
                </div>
                <div className="grid content-start justify-items-start gap-3 bg-secondary p-5 md:p-8">
                  <h4>Or get it from</h4>
                  <a className={linkClass} href={ext.registry.href}>
                    {ext.registry.label}
                    <ArrowUpRight className="size-3.5" />
                  </a>
                </div>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </>
  );
}
