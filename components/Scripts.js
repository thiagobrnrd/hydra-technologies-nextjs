import Script from "next/script";

export default function Scripts() {
  return (
    <>
      {/* Motion libraries (CDN) */}
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" strategy="afterInteractive" />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"
        strategy="afterInteractive"
      />
      <Script src="https://unpkg.com/lenis@1.1.13/dist/lenis.min.js" strategy="afterInteractive" />
      <Script src="https://unpkg.com/aos@2.3.4/dist/aos.js" strategy="afterInteractive" />

      {/* Hydra front-end modules */}
      <Script src="/js/cursor.js" strategy="afterInteractive" />
      <Script src="/js/particles.js" strategy="afterInteractive" />
      <Script src="/js/animations.js" strategy="afterInteractive" />
      <Script src="/js/main.js" strategy="afterInteractive" />
    </>
  );
}
