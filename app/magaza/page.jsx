import Header from "@/components/headers/Header";
import ShopDefault from "@/components/shop/ShopDefault";
import Footer from "@/components/footers/Footer";
import { getProducts } from "@/api/products";

export const metadata = {
    title: "Mağaza - Şımart Teknoloji",
    description: "Şımart Teknoloji mağaza sayfası, tüm ürünlerimizi keşfedin.",
};

export default async function MagazaPage() {
    // Server-side ürünleri çek
    const products = await getProducts();

    return (
        <>
            <Header />
            <div className="tf-page-title">
                <div className="container-full">
                    <div className="heading text-center">Mağaza</div>
                    <p className="text-center text-2 text_black-2 mt_5">
                        Tüm ürünlerimizi keşfedin
                    </p>
                </div>
            </div>
            <ShopDefault initialProducts={products} />
            <Footer />
        </>
    );
}