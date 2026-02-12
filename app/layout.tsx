import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL('https://iamkavindu.dev'),
  title: {
    default: "Kavindu Perera | Software Engineer",
    template: "%s | Kavindu Perera"
  },
  description: "Software Engineer specializing in Java, Spring Boot, and microservices architecture. Experienced in building scalable backend solutions, currently at Wiley.",
  keywords: [
    "Kavindu Perera",
    "Software Engineer",
    "Backend Developer",
    "Java Developer",
    "Spring Boot",
    "Microservices",
    "Software Engineer",
    "Backend Engineering",
    "Java",
    "Spring Framework",
    "Cloud Computing",
    "API Development",
    "Sri Lanka",
    "Wiley"
  ],
  authors: [{ name: "Kavindu Perera", url: "https://iamkavindu.dev" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    url: "https://iamkavindu.dev",
    title: "Kavindu Perera | Backend Software Engineer",
    description: "Backend Software Engineer specializing in Java, Spring Boot, and microservices architecture. Experienced in building scalable backend solutions.",
    siteName: "Kavindu Perera's Portfolio",
    images: [{
      url: "/profilepicture.png",
      width: 256,
      height: 256,
      alt: "Kavindu Perera"
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Kavindu Perera | Backend Software Engineer",
    description: "Backend Software Engineer specializing in Java and Spring Boot, building scalable microservices.",
    images: ['/profilepicture.png'],
  },
  verification: {
    google: 'add-your-google-site-verification-here', // You'll need to add this later
  },
  alternates: {
    canonical: 'https://iamkavindu.dev',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content={`default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self'; frame-ancestors 'none'; form-action 'self'; base-uri 'self';`.replace(/\s+/g, ' ').trim()}
        />
        <meta
          httpEquiv="X-Content-Type-Options"
          content="nosniff"
        />
        <meta
          httpEquiv="X-Frame-Options"
          content="DENY"
        />
        <meta
          httpEquiv="Permissions-Policy"
          content="camera=(), microphone=(), geolocation=()"
        />
        <meta
          name="referrer"
          content="strict-origin-when-cross-origin"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
