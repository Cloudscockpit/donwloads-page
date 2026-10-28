import type { Metadata } from "next";
import { Host_Grotesk, Atkinson_Hyperlegible_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const hostGrotesk = Host_Grotesk({
  variable: "--font-host-grotesk",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const atkinsonMono = Atkinson_Hyperlegible_Mono({
  variable: "--font-atkinson-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Download Actionboard",
  description: "Download the Actionboard app for Android, with iOS and Windows coming soon.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn(hostGrotesk.variable, atkinsonMono.variable)}>
      <body>{children}</body>
    </html>
  );
}
