import "./globals.css";
import Script from "next/script";
import { Instrument_Serif, JetBrains_Mono, Inter } from "next/font/google";
import ThemeToggle from "@/components/ThemeToggle";
import ScrollToTop from "@/components/ScrollToTop";
import Footer from "@/components/Footer";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://savethevotes.org"),
  title: {
    default: "Save the Votes — Citizen Preparedness Resource",
    template: "%s — Save the Votes",
  },
  description:
    "Find out exactly what documents you need to vote under the SAVE Act. State-by-state guides for all 50 states with birth certificate info and election office links.",
  openGraph: {
    siteName: "Save the Votes",
    type: "website",
    url: "https://savethevotes.org",
    title: "Save the Votes — Citizen Preparedness Resource",
    description:
      "Find out exactly what documents you need to vote under the SAVE Act. State-by-state guides for all 50 states.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Save the Votes — Citizen Preparedness Resource",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Save the Votes — Citizen Preparedness Resource",
    description:
      "Find out exactly what documents you need to vote under the SAVE Act. State-by-state guides for all 50 states.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://savethevotes.org",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${instrumentSerif.variable} ${jetbrainsMono.variable} ${inter.variable}`}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Q4KK4D20JK"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Q4KK4D20JK');
          `}
        </Script>
      </head>
      <body className="bg-surface text-text min-h-screen antialiased">
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <nav aria-label="Site navigation" className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 bg-surface/80 backdrop-blur-md border-b border-border">
          <span className="font-mono text-sm font-bold tracking-wider text-accent uppercase">
            Save the Votes
          </span>
          <ThemeToggle />
        </nav>
        <main id="main-content" className="pt-14">
          {children}
        </main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
