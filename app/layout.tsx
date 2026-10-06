import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Caveat } from "next/font/google";
import BirthdayMusic from "@/components/birthday/BirthdayMusic";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-handwriting",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Happy Birthday — A Birthday Story",
  description: "A personal, interactive birthday story made with love.",
  openGraph: {
    title: "Happy Birthday — A Birthday Story",
    description: "A personal, interactive birthday story made with love.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${cormorant.variable} ${caveat.variable}`}
    >
      <body suppressHydrationWarning className="bd-body">
        {/* Global persistent floating background music */}
        <BirthdayMusic />

        {/* Chapter content */}
        {children}
      </body>
    </html>
  );
}
