// Sample release data. Replace with your real release metadata (API, JSON, or CMS).
export const app = {
  name: "Actionboard",
  tagline: "One workspace for you and your coding agents.",
  version: "1.0.0",
  released: "27 October 2026",
};

// APK served through the actionboard-app-distribution CloudFront CDN (S3 bucket: actionboard-app-releases).
export const APK_URL = "https://d15alclnvnjfrx.cloudfront.net/Actionboard.apk";

// Feature showcase media on the same CDN. Files are cached as immutable, so upload a new -vN name to change them.
export const showcaseMedia = {
  video: "https://d15alclnvnjfrx.cloudfront.net/media/market-analysis-v1.mp4",
  poster: "https://d15alclnvnjfrx.cloudfront.net/media/market-analysis-poster-v1.jpg",
};

export type Format = {
  id: string;
  label: string;
  file: string;
  href: string;
};

export type Platform = {
  id: "android" | "ios" | "windows";
  label: string;
  status: "available" | "soon";
  formats: Format[];
};

export const platforms: Platform[] = [
  {
    id: "android",
    label: "Android",
    status: "available",
    formats: [{ id: "apk", label: ".apk", file: `actionboard-${app.version}.apk`, href: APK_URL }],
  },
  { id: "ios", label: "iOS", status: "soon", formats: [] },
  { id: "windows", label: "Windows", status: "soon", formats: [] },
];

export type Extension = {
  id: string;
  name: string;
  where: "terminal" | "chat";
  commands: string[];
  blurb: string;
  registry: { label: string; href: string };
};

const npmPage = "https://www.npmjs.com/package/@actionboard-ai/install";

export const extensions: Extension[] = [
  {
    id: "antigravity",
    name: "Antigravity CLI",
    where: "terminal",
    commands: ["npx @actionboard-ai/install --target antigravity"],
    blurb: "Add Actionboard to Antigravity CLI",
    registry: { label: "Open on npm", href: npmPage },
  },
  {
    id: "opencode",
    name: "OpenCode",
    where: "terminal",
    commands: ["npx @actionboard-ai/install --target opencode"],
    blurb: "Add Actionboard to OpenCode",
    registry: { label: "Open on npm", href: npmPage },
  },
  {
    id: "codex",
    name: "Codex CLI",
    where: "terminal",
    commands: ["npx @actionboard-ai/install --target codex"],
    blurb: "Add Actionboard to Codex CLI",
    registry: { label: "Open on npm", href: npmPage },
  },
  {
    id: "claude",
    name: "Claude Code",
    where: "chat",
    commands: [
      "/plugin marketplace add Cloudscockpit/ab-mission-command-center",
      "/plugin install actionboard-v5-agentformation@actionboard-v5-agentformation",
    ],
    blurb: "Add Actionboard to Claude Code, from the chat",
    registry: { label: "Open on GitHub", href: "https://github.com/Cloudscockpit/ab-mission-command-center" },
  },
];

export const faqs = [
  {
    q: "Which platforms can I download Actionboard for?",
    a: "Android is available now as an APK. iOS and Windows are coming soon.",
  },
  {
    q: "How do I install the Android APK?",
    a: "Download the file and open it on your phone. If Android asks, allow installs from your browser or file manager.",
  },
  {
    q: "Which tools does the extension work with?",
    a: "Antigravity CLI, OpenCode, Codex CLI and Claude Code. Open the extension section, choose your tool, and paste the install command into it.",
  },
  {
    q: "Can I use pnpm instead of npx?",
    a: "Yes. Replace npx with pnpm dlx in the install command, and keep the rest as it is.",
  },
];
export const footerLinks = [
  { label: "Documentation", href: "#" },
  { label: "Research", href: "https://actionboard.com.bd/research" },
  { label: "AI Pods", href: "https://actionboard.com.bd/ai-pods" },
  { label: "Community", href: "https://actionboard.com.bd/community" },
];

export const metaLinks = [
  { label: "System requirements", href: "#" },
  { label: "Installation instructions", href: "#" },
  { label: "Other versions", href: "#" },
  { label: "Release notes", href: "#" },
];
