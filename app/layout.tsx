import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ScrollProgress from "@/components/ScrollProgress";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import CustomCursor from "@/components/CustomCursor";
import CommandPalette from "@/components/CommandPalette";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";
import PIPVideo from "@/components/PIPVideo";
import { I18nProvider } from "@/context/I18nContext";
import { BookmarkProvider } from "@/context/BookmarkContext";
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
  title: "Saiyed Muhammad Abdullah Maududi | Full Stack Web Developer",
  description:
    "Portfolio of Saiyed Muhammad Abdullah Maududi - A passionate Full Stack Web Developer studying at OI. Crafting modern web experiences with cutting-edge technologies.",
  openGraph: {
    title: "Saiyed Muhammad Abdullah Maududi | Full Stack Developer",
    description:
      "Full Stack Web Developer crafting modern web solutions with Next.js, React, and more.",
    type: "website",
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
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-dot-grid" suppressHydrationWarning>
        <I18nProvider>
          <BookmarkProvider>
            <ScrollProgress />
            <KeyboardShortcuts />
            <CommandPalette />
            {children}
            <FloatingWhatsApp />
            <PIPVideo />
            <CustomCursor />
          </BookmarkProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
