import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, DM_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ConsoleX — Independent software, built with curiosity",
    template: "%s — ConsoleX",
  },
  description:
    "ConsoleX is an independent software brand building desktop applications and interactive experiments — Aura Player, Velo, Nexus and Veil. Designed and engineered end to end.",
  keywords: [
    "ConsoleX",
    "independent software",
    "desktop applications",
    "Aura Player",
    "portfolio",
    "WebGL",
  ],
  authors: [{ name: "ConsoleX" }],
  openGraph: {
    title: "ConsoleX — Independent software, built with curiosity",
    description:
      "An independent software brand building desktop applications and interactive experiments. Every project designed, engineered and refined in-house.",
    siteName: "ConsoleX",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "ConsoleX — Independent software, built with curiosity",
    description:
      "An independent software brand building desktop applications and interactive experiments.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

/**
 * Runs before hydration:
 * - skips the opening sequence when it was already seen this session
 *   or when the visitor prefers reduced motion
 * - locks scrolling only while the intro will actually play
 */
const introBootstrap = `try{
  var seen=sessionStorage.getItem('cx-intro')==='seen';
  var reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(seen||reduced){document.documentElement.classList.add('cx-skip-intro');}
  else{document.documentElement.classList.add('cx-intro-lock');}
}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introBootstrap }} />
        <noscript>
          <style>{`.cx-opening{display:none!important}html.cx-intro-lock{overflow:auto!important}`}</style>
        </noscript>
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${dmMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
