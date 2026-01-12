import { notFound } from "next/navigation";
import { getPageBySlug } from "@/api/pages";
import Header from "@/components/headers/Header";
import Footer from "@/components/footers/Footer";

export const metadata = {
    title: "Sayfa - Şımart Teknoloji",
    description: "Şımart Teknoloji sayfa içeriği",
};

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
                        {page.title && (
                            <h1 className="mb-4">{page.title}</h1>
                        )}
                        {page.content && (
                            <div 
                                className="page-content"
                                dangerouslySetInnerHTML={{ __html: page.content }}
                            />
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

