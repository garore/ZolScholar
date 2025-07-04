import { useEffect } from "react";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  jsonLd?: object;
}

export default function SEOHead({
  title = "حلم زول بسيط - منح دراسية مجانية للطلاب السودانيين والعرب",
  description = "منصة مجانية لمساعدة الطلاب السودانيين والعرب في العثور على منح دراسية ممولة بالكامل في جميع أنحاء العالم. أكثر من 350 منحة متاحة من أفضل الجامعات العالمية.",
  keywords = "منح دراسية مجانية, منح للسودانيين, حلم زول بسيط, منح ممولة بالكامل, منح عربية, منح أجنبية",
  canonicalUrl = "https://zolscholar.com/",
  ogImage = "https://zolscholar.com/favicon.svg",
  jsonLd,
}: SEOHeadProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(
        `meta[name="${name}"]`,
      ) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    const updatePropertyTag = (property: string, content: string) => {
      let meta = document.querySelector(
        `meta[property="${property}"]`,
      ) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Update basic meta tags
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);

    // Update Open Graph tags
    updatePropertyTag("og:title", title);
    updatePropertyTag("og:description", description);
    updatePropertyTag("og:url", canonicalUrl);
    updatePropertyTag("og:image", ogImage);

    // Update Twitter Card tags
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:url", canonicalUrl);
    updateMetaTag("twitter:image", ogImage);

    // Update canonical URL
    let canonical = document.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    // Add JSON-LD structured data
    if (jsonLd) {
      const existingScript = document.getElementById("jsonld-seo");
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement("script");
      script.id = "jsonld-seo";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    // Cleanup function
    return () => {
      // Remove dynamic JSON-LD if needed
      const script = document.getElementById("jsonld-seo");
      if (script) {
        script.remove();
      }
    };
  }, [title, description, keywords, canonicalUrl, ogImage, jsonLd]);

  return null; // This component doesn't render anything
}
