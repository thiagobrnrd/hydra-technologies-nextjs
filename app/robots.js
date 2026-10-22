export default function robots() {
  return { rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }], sitemap: "https://hydratechnologies.com.br/sitemap.xml" };
}
