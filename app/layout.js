import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Scripts from "@/components/Scripts";

export const metadata = {
  metadataBase: undefined,
  icons: {
    icon: "/images/logo.jpeg",
  },
  other: {
    "theme-color": "#050505",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Fonts: Space Grotesk (display) with Inter fallback.
            Orbitron is loaded separately for the "Hydra" wordmark, to
            match the geometric, wide-tracked lettering of the logo. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Inter:wght@300..700&family=Orbitron:wght@500..700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/css/main.css" />
      </head>
      <body className="page">
        <div className="noise-overlay" aria-hidden="true"></div>
        <div className="cursor-dot" aria-hidden="true"></div>
        <div className="cursor-ring" aria-hidden="true"></div>
        <div className="progress-bar" id="scrollProgress" aria-hidden="true"></div>

        <Navbar />

        {children}

        <Footer />

        <Scripts />
      </body>
    </html>
  );
}
