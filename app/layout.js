import "@fontsource-variable/sora";
import "@fontsource-variable/inter";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/orbitron/600.css";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Experience from "@/components/scene/Experience";
import ScrollEngine from "@/components/ScrollEngine";
import { SITE } from "@/lib/site";

const description =
  "Hydra Technologies cria sites institucionais e sistemas internos sob medida para o seu estabelecimento — agenda online, clientes, financeiro e lembretes pelo WhatsApp. Em breve: dispositivos inteligentes e IoT.";

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Hydra Technologies — Sites institucionais e sistemas sob medida",
    template: "%s · Hydra Technologies",
  },
  description,
  keywords: ["criação de sites", "site institucional", "sistema de agendamento", "sistema para salão", "software sob medida", "Suzano", "IoT", "Hydra Technologies"],
  alternates: { canonical: "/" },
  icons: { icon: "/favicon-64.png", apple: "/apple-icon.png" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE.url,
    siteName: SITE.name,
    title: "Hydra Technologies — Sua tecnologia, nossa missão.",
    description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Hydra Technologies" }],
  },
  twitter: { card: "summary_large_image", title: "Hydra Technologies", description, images: ["/og.jpg"] },
};

export const viewport = {
  themeColor: "#04060c",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE.name,
  url: SITE.url,
  email: SITE.email,
  telephone: "+55 11 99910-1739",
  image: `${SITE.url}/og.jpg`,
  areaServed: "BR",
  address: { "@type": "PostalAddress", addressLocality: "Suzano", addressRegion: "SP", addressCountry: "BR" },
  description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <a href="#conteudo" className="skip">
          Pular para o conteúdo
        </a>
        <Experience />
        <ScrollEngine />
        <Nav />
        <div id="conteudo" className="content">
          {children}
        </div>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
