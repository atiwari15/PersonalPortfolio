import { Cinzel, Manrope, IBM_Plex_Mono } from "next/font/google";
import { getSiteSettings } from "@/sanity/content";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "./portfolio.css";

const display = Cinzel({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Manrope({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: "400", variable: "--font-mono", display: "swap" });

export default async function PortfolioLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  return <div className={`portfolio ${display.variable} ${body.variable} ${mono.variable}`}>
    <a className="skip-link" href="#main">Skip to content</a>
    <Navbar name={settings?.fullName ?? "Portfolio"} resumeUrl={settings?.resumeUrl} />
    {children}
    <Footer settings={settings} />
  </div>;
}
