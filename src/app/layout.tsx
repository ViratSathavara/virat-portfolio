import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://virat-sathavara.netlify.app"),
  title: "Virat Sathavara | Frontend Engineer — React.js, Next.js & TypeScript",
  description:
    "Virat Sathavara is a Frontend Engineer with 2+ years of experience in React.js, Next.js, and TypeScript. Currently building enterprise SaaS platforms at Olbuz. Open to frontend roles.",
  robots: "index, follow",
  keywords: [
    "Virat Sathavara",
    "Frontend Engineer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "JavaScript Developer",
    "Tailwind CSS",
    "Web Developer India",
    "Gujarat Developer",
    "Hire React Developer",
  ],
  openGraph: {
    title: "Virat Sathavara | Frontend Engineer — React.js, Next.js & TypeScript",
    description:
      "Frontend Engineer with 2+ years of experience building scalable and responsive web applications using React.js, Next.js, and TypeScript.",
    type: "website",
    url: "https://virat-sathavara.netlify.app/",
    images: ["/opengraph.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Virat Sathavara | Frontend Engineer — React.js, Next.js & TypeScript",
    description:
      "Frontend Engineer with 2+ years of experience building scalable web apps using React.js, Next.js, and TypeScript.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className={`${plusJakarta.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
