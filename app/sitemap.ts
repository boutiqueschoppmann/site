import { MetadataRoute } from "next";
import { products } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://schoppmann.ca";

  const staticPages = [
    { url: base, priority: 1 },
    { url: `${base}/boutique`, priority: 0.9 },
    { url: `${base}/golf`, priority: 0.8 },
    { url: `${base}/recharges`, priority: 0.7 },
    { url: `${base}/cadeaux-entreprises`, priority: 0.8 },
    { url: `${base}/notre-histoire`, priority: 0.6 },
    { url: `${base}/savoir-faire`, priority: 0.6 },
    { url: `${base}/faq`, priority: 0.5 },
    { url: `${base}/contact`, priority: 0.5 },
    { url: `${base}/livraison-retours`, priority: 0.4 },
  ].map((p) => ({ ...p, lastModified: new Date(), changeFrequency: "monthly" as const }));

  const productPages = products.map((p) => ({
    url: `${base}${p.href}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...productPages];
}
