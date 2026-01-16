import { siteConfig } from "@/config/site";

export function organizationSchema() {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Şımart Teknoloji",
      "url": "https://simart.me",
      "logo": siteConfig.site.logo,
      "description": "Şımart Teknoloji, robot süpürgeler, akıllı ev sistemleri ve IoT çözümlerinde öncüdür. Ev otomasyonu ve yaşamı kolaylaştıran teknolojilerle hizmetinizdeyiz.",
      "sameAs": [
        "https://www.instagram.com/simartteknoloji/",
        "https://www.facebook.com/simartteknoloji",
        "https://www.youtube.com/c/%C5%9E%C4%B1martTeknoloji",
        "https://x.com/simartteknoloji",
        "https://www.linkedin.com/company/%C5%9F%C4%B1mart-teknoloji/"
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+90-552-642-8208",
          "contactType": "Müşteri Hizmetleri"
        },
        {
          "@type": "ContactPoint",
          "telephone": "+90-850-346-6126",
          "contactType": "Müşteri Hizmetleri"
        }
      ]
    };
  }
  
  export function webPageSchema({ name, url, description }) {
    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": name,
      "url": url,
      "description": description,
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": siteConfig.site.logo
      },
      "sameAs": [
        "https://www.instagram.com/simartteknoloji/",
        "https://www.facebook.com/simartteknoloji",
        "https://www.youtube.com/c/%C5%9E%C4%B1martTeknoloji",
        "https://x.com/simartteknoloji",
        "https://www.linkedin.com/company/%C5%9F%C4%B1mart-teknoloji/"
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+90-552-642-8208",
          "contactType": "Müşteri Hizmetleri"
        },
        {
          "@type": "ContactPoint",
          "telephone": "+90-850-346-6126",
          "contactType": "Müşteri Hizmetleri"
        }
      ]
    };
  }
  