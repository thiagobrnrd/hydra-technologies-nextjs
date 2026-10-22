export default function sitemap() {
  const base = "https://hydratechnologies.com.br";
  return [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/contato`, changeFrequency: "yearly", priority: 0.8 },
  ];
}
