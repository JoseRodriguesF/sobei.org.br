import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  metadataBase: new URL('https://sobei.org.br'),
  title: {
    default: "SOBEI - Sociedade Beneficente Equilíbrio de Interlagos",
    template: "%s | SOBEI",
  },
  description: "Trabalhando há mais de 42 anos por assistência social, educação infantil integral e capacitação profissional na Zona Sul de São Paulo.",
  keywords: [
    "SOBEI",
    "creche zona sul",
    "CEI Interlagos",
    "assistência social SP",
    "educação infantil integral",
    "vagas de emprego educação",
    "projetos sociais SP",
    "Capela do Socorro",
    "Grajaú",
    "Cidade Dutra"
  ],
  authors: [{ name: "SOBEI" }],
  creator: "SOBEI",
  publisher: "SOBEI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://sobei.org.br",
    siteName: "SOBEI",
    title: "SOBEI - Sociedade Beneficente Equilíbrio de Interlagos",
    description: "Transformando vidas por meio da educação, acolhimento e desenvolvimento social na Zona Sul de São Paulo há 42 anos.",
    images: [
      {
        url: "/images/foto-sobei.avif",
        width: 1200,
        height: 630,
        alt: "SOBEI - Sociedade Beneficente Equilíbrio de Interlagos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SOBEI - Sociedade Beneficente Equilíbrio de Interlagos",
    description: "Transformando vidas por meio da educação, acolhimento e desenvolvimento social na Zona Sul de São Paulo.",
    images: ["/images/foto-sobei.avif"],
  },
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
    canonical: "/",
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": ["NGO", "EducationalOrganization"],
  "name": "SOBEI - Sociedade Beneficente Equilíbrio de Interlagos",
  "alternateName": "SOBEI",
  "url": "https://sobei.org.br",
  "logo": "https://sobei.org.br/images/LOGO%20BRANCO.png",
  "image": "https://sobei.org.br/images/foto-sobei.avif",
  "description": "Instituição filantrópica fundada em 1984 que gerencia 13 creches (CEIs) e projetos de capacitação e convivência na Zona Sul de São Paulo.",
  "foundingDate": "1984-03-31",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Av. Rubens Montanaro de Borba, 477 - Jardim Regis",
    "addressLocality": "São Paulo",
    "addressRegion": "SP",
    "postalCode": "04811-180",
    "addressCountry": "BR"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+55-11-5667-2785",
    "contactType": "atendimento geral",
    "email": "sobei@sobei.org.br",
    "areaServed": "BR",
    "availableLanguage": "Portuguese"
  },
  "sameAs": [
    "https://www.facebook.com/sobeimatriz?locale=pt_BR",
    "https://www.instagram.com/sobeimatriz/"
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <head>
        <link rel="alternate" type="text/markdown" href="/llms.txt" title="llms.txt" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <SmoothScroll />
        <Header />
        <main style={{ flex: '1' }}>
          {children}
        </main>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
