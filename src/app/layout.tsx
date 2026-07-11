import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anadolu Kitchen - Authentic Turkish Cuisine",
  description: "Experience authentic Turkish cuisine with traditional pide, lahmacun, and more at Anadolu Kitchen. Freshly made with love in the heart of the city.",
  keywords: ["Turkish restaurant", "pide", "lahmacun", "Turkish food", "Anadolu Kitchen", "authentic cuisine"],
  authors: [{ name: "Anadolu Kitchen" }],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Anadolu Kitchen - Authentic Turkish Cuisine",
    description: "Experience authentic Turkish cuisine with traditional pide, lahmacun, and more",
    siteName: "Anadolu Kitchen",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anadolu Kitchen",
    description: "Authentic Turkish cuisine — pide, lahmacun, and more",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
