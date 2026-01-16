import { notFound } from "next/navigation";
import { getPageBySlug } from "@/api/pages";
import Header from "@/components/headers/Header";
import Footer from "@/components/footers/Footer";
import { webPageSchema } from "@/lib/schema";
import { siteConfig } from "@/config/site";

/**
 * Dinamik metadata oluşturma
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    return {
      title: "Sayfa Bulunamadı - Şımart Teknoloji",
      description: "Aradığınız sayfa bulunamadı.",
      robots: "noindex, nofollow",
    };
  }

  const title = page.title || "Şımart Teknoloji Sayfa İçeriği";
  const description = page.seo?.description || "Şımart Teknoloji sayfa içeriği";
  const keywords = page.seo?.keywords || siteConfig.site.keywords;

  // WebPage schema oluştur
  const pageUrl = `${siteConfig.site.url}${slug}`;
  const schema = webPageSchema({
    name: title,
    url: pageUrl,
    description: description,
  });

  return {
    title: `${title}`,
    description: description,
    keywords: keywords,
    other: {
      "script:ld+json": JSON.stringify(schema),
    },
  };
}

export default async function DynamicPage({ params }) {
  const { slug } = await params;

  // Tüm sayfalar (bloglar dahil) /pages?slug=xx API'sinden çekiliyor
  const page = await getPageBySlug(slug);

  if (!page) {
    return notFound();
  }

  return (
    <>
      <Header />
      <div className="container py-5">
        <div className="row">
          <div className="col-12">
            {page.title && <h1 className="mb-4">{page.title}</h1>}
            {page.content && <div className="page-content" dangerouslySetInnerHTML={{ __html: page.content }} />}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
