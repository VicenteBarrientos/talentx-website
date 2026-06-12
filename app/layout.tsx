import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import ThemeSync from "@/components/ThemeSync";
import { themeInitScript } from "@/lib/theme-sync";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TalentX Recruiting — Global Talent Acquisition",
  description:
    "Senior, hands-on recruiting for high-growth teams across the U.S., LATAM, and Europe.",
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
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider defaultTheme="dark">
          <ThemeSync />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
