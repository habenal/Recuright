import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RECURIGHT - Professional Recruitment Solutions",
  description:
    "Connecting Talent with Opportunity across Ethiopia and beyond. Find jobs, post vacancies, and access professional recruitment services.",
  keywords: [
    "recruitment",
    "jobs",
    "Ethiopia",
    "hiring",
    "careers",
    "CV services",
    "assessments",
  ],
  openGraph: {
    title: "RECURIGHT - Professional Recruitment Solutions",
    description:
      "Professional recruitment solutions across Ethiopia and beyond. Find jobs, post vacancies, and access professional services.",
    url: "https://recuright.com",
    siteName: "RECURIGHT",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "RECURIGHT" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RECURIGHT - Professional Recruitment Solutions",
    description: "Connecting Talent with Opportunity.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light" className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased bg-[rgb(var(--background))] text-[rgb(var(--foreground))] transition-colors duration-300">
        <a href="#main" className="sr-only">Skip to content</a>
        <Navbar />
        <main id="main" className="min-h-screen flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
