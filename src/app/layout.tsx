import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const siteUrl = "https://viratsathavara.in";
const siteName = "Virat Sathavara | Frontend Engineer";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Virat Sathavara | Frontend Engineer — React.js, Next.js & TypeScript Expert",
    template: "%s | Virat Sathavara",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.svg",
  },
  description:
    "Virat Sathavara — Frontend Engineer with 2+ years building enterprise SaaS platforms using React.js, Next.js, TypeScript. Expert in responsive web apps, REST APIs, CI/CD. Currently at Olbuz Pvt. Ltd. Open to frontend developer roles in React, Next.js, JavaScript. Based in Gujarat, India.",
  applicationName: "Virat Sathavara Portfolio",
  authors: [{ name: "Virat Sathavara", url: siteUrl }],
  creator: "Virat Sathavara",
  publisher: "Virat Sathavara",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  keywords: [
    // Name variations
    "Virat Sathavara",
    "Virat Sathavara Portfolio",
    "Virat Sathavara Developer",
    "Virat Sathavara Frontend",
    
    // Job titles
    "Frontend Engineer",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "JavaScript Developer",
    "Web Developer",
    "Software Developer",
    "Software Engineer",
    "UI Developer",
    "Full Stack Developer",
    
    // Technologies
    "React.js",
    "Next.js 14",
    "TypeScript",
    "JavaScript ES6",
    "Tailwind CSS",
    "Material UI",
    "Redux",
    "GraphQL",
    "REST API",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Firebase",
    "JWT Authentication",
    "Framer Motion",
    "Responsive Design",
    "Progressive Web Apps",
    
    // Location-based
    "Frontend Developer India",
    "Frontend Developer Gujarat",
    "Web Developer Gujarat",
    "Developer Unjha",
    "Developer Visnagar",
    "Remote Frontend Developer India",
    "Hire Indian Developer",
    
    // Intent-based
    "Hire Frontend Developer",
    "Hire React Developer",
    "Hire Next.js Developer",
    "Hire TypeScript Developer",
    "Frontend Developer for Hire",
    "React Developer for Hire",
    "Freelance Frontend Developer",
    "Contract Frontend Developer",
    "Remote React Developer",
    
    // Industry/Projects
    "Enterprise SaaS Developer",
    "Healthcare Platform Developer",
    "Marketing Automation Developer",
    "Dashboard Developer",
    "Web Application Developer",
    "Scalable Web Apps",
    
    // Experience
    "2 years React experience",
    "Junior Frontend Developer",
    "Mid-level Frontend Developer",
    "Professional Portfolio",
    
    // Companies
    "Olbuz Developer",
    "Coddit64 Developer",
    "Cloudpeak Technologies Developer",
    
    // Education
    "S. R. Patel Engineering College",
    "Computer Engineering Graduate",
    "B.E. Computer Engineering",
    
    // Soft skills
    "Open to Work",
    "Available for Frontend Roles",
    "Looking for Frontend Position",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: "Virat Sathavara | Frontend Engineer — React.js, Next.js & TypeScript Expert",
    description:
      "Frontend Engineer with 2+ years building enterprise SaaS platforms. Expert in React.js, Next.js, TypeScript. Currently at Olbuz Pvt. Ltd. Open to frontend developer roles.",
    images: [
      {
        url: "/opengraph.jpg",
        width: 1200,
        height: 630,
        alt: "Virat Sathavara — Frontend Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Virat Sathavara | Frontend Engineer — React.js, Next.js & TypeScript",
    description:
      "Frontend Engineer with 2+ years experience building scalable web apps using React.js, Next.js, TypeScript. Open to work.",
    images: ["/opengraph.jpg"],
    creator: "@viratsathavara",
  },
  verification: {
    google: "google-site-verification-code-here", // Replace with actual code from Google Search Console
    // yandex: "yandex-verification-code",
    // bing: "bing-verification-code",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD structured data for SEO
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Virat Sathavara",
    url: siteUrl,
    image: `${siteUrl}/me/me.png`,
    jobTitle: "Frontend Engineer",
    description:
      "Frontend Engineer with 2+ years of experience in React.js, Next.js, and TypeScript. Building enterprise SaaS platforms.",
    email: "viratsathavara2510@gmail.com",
    telephone: "+91-94290-86515",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Gujarat",
      addressCountry: "IN",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "S. R. Patel Engineering College",
      location: "Unjha, Gujarat, India",
    },
    worksFor: {
      "@type": "Organization",
      name: "Olbuz Pvt. Ltd.",
    },
    sameAs: [
      "https://github.com/ViratSathavara",
      "https://www.linkedin.com/in/virat-sathavara-576109249/",
      "https://viratsathavara.in/",
    ],
    knowsAbout: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Frontend Development",
      "Web Development",
      "Responsive Design",
      "REST APIs",
      "GraphQL",
      "Tailwind CSS",
      "Material UI",
      "Redux",
      "Node.js",
      "MongoDB",
      "Firebase",
      "JWT Authentication",
      "CI/CD",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    description:
      "Professional portfolio of Virat Sathavara, Frontend Engineer specializing in React.js, Next.js, and TypeScript development.",
    author: {
      "@type": "Person",
      name: "Virat Sathavara",
    },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Virat Sathavara — Frontend Development Services",
    url: siteUrl,
    logo: `${siteUrl}/avatar.png`,
    image: `${siteUrl}/opengraph.jpg`,
    description:
      "Professional frontend development services specializing in React.js, Next.js, TypeScript, and enterprise web application development.",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Gujarat",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 23.8103,
      longitude: 72.3942,
    },
    areaServed: [
      {
        "@type": "Country",
        name: "India",
      },
      {
        "@type": "Country",
        name: "Worldwide",
      },
    ],
    serviceType: [
      "Frontend Development",
      "React.js Development",
      "Next.js Development",
      "TypeScript Development",
      "Web Application Development",
      "Responsive Web Design",
      "Single Page Application Development",
      "REST API Integration",
    ],
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${siteUrl}#contact`,
      servicePhone: "+91-94290-86515",
      email: "viratsathavara2510@gmail.com",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: `${siteUrl}#about`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Experience",
        item: `${siteUrl}#experience`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Skills",
        item: `${siteUrl}#skills`,
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Projects",
        item: `${siteUrl}#projects`,
      },
      {
        "@type": "ListItem",
        position: 6,
        name: "Contact",
        item: `${siteUrl}#contact`,
      },
    ],
  };

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="canonical" href={siteUrl} />
        
        {/* JSON-LD Structured Data */}
        <Script
          id="schema-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <Script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Script
          id="schema-professional-service"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
        />
        <Script
          id="schema-breadcrumb"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </head>
      <body className={`${plusJakarta.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
