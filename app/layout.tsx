import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import LocaleProvider from "@/components/LocaleProvider";
import LocaleSync from "@/components/LocaleSync";
import { TALENTX_URL } from "@/lib/site-urls";
import { localeInitScript } from "@/lib/locale-sync";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteDescription =
  "Senior, hands-on recruiting for high-growth teams across the U.S., LATAM, and Europe.";

const ogImageAlt = "TalentX Recruiting logo";

export const metadata: Metadata = {
  metadataBase: new URL(TALENTX_URL),
  title: "TalentX Recruiting — Global Talent Acquisition",
  description: siteDescription,
  openGraph: {
    title: "TalentX Recruiting — Global Talent Acquisition",
    description: siteDescription,
    type: "website",
    siteName: "TalentX Recruiting",
    locale: "en_US",
    images: [
      {
        url: "/images/talentx-og.png",
        width: 400,
        height: 400,
        alt: ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "TalentX Recruiting — Global Talent Acquisition",
    description: siteDescription,
    images: [
      {
        url: "/images/talentx-og.png",
        alt: ogImageAlt,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: localeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <LocaleProvider defaultLocale="en">
          <LocaleSync />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
