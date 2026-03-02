import type { Metadata } from "next";
import { Audiowide, DM_Sans, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const isProd = process.env.NODE_ENV === "production";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const audiowide = Audiowide({
  variable: "--font-audiowide",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Hrvoje Mlinarević | Full-Stack Developer",
  description:
    "JavaScript developer building frontend interfaces with React.js and backend solutions with NestJS. Based in Zagreb, Croatia.",
  icons: {
    icon: isProd ? "/favicon.ico" : "/favicon-dev.ico",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" className="dark">
        <body
          className={`${dmSans.variable} ${jetbrainsMono.variable} ${plusJakartaSans.variable} ${audiowide.variable} font-sans antialiased`}
        >
          <TooltipProvider delayDuration={300}>{children}</TooltipProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
