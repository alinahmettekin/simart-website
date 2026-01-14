import Footer from "@/components/footers/Footer";
import Header from "@/components/headers/Header";
import Details9 from "@/components/shopDetails/Details9";
import Products from "@/components/shopDetails/Products";
import RecentProducts from "@/components/shopDetails/RecentProducts";
import ShopDetailsTab from "@/components/shopDetails/ShopDetailsTab";
import React from "react";
import Link from "next/link";
import { getProductBySlug } from "@/api/products";
import ProductSinglePrevNext from "@/components/common/ProductSinglePrevNext";
import { notFound } from "next/navigation";

/**
 * Dinamik metadata oluşturma
 */
export async function generateMetadata({ params }) {
    const { kategori, urun } = await params;
    const product = await getProductBySlug(urun);

    if (!product) {
        return {
            title: "Ürün Bulunamadı - Şımart Teknoloji",
            description: "Aradığınız ürün bulunamadı.",
        };
    }

    const productName = product.name || product.title || "Ürün";
    return {
        title: `${productName} - Şımart Teknoloji`,
        description: product.description || `${productName} ürün detayları ve özellikleri.`,
    };
}

export default async function page({ params }) {
    const { kategori, urun } = await params;

    if (!urun) {
        notFound();
    }

    // API'den ürünü çek
    const product = await getProductBySlug(urun);

    if (!product) {
        notFound();
    }
    return (
        <>
            <Header />
            <div className="tf-breadcrumb">
                <div className="container">
                    <div className="tf-breadcrumb-wrap d-flex justify-content-between flex-wrap align-items-center">
                        <div className="tf-breadcrumb-list">
                            <Link href={`/`} className="text">
                                Mağaza
                            </Link>

                            <i className="icon icon-arrow-right" />
                            <Link href={`/magaza/${kategori}`} className="text">
                                {kategori}
                            </Link>
                            <i className="icon icon-arrow-right" />
                            <span className="text">{product.name || product.title}</span>
                        </div>
                    </div>
                </div>
            </div>
            <Details9 product={product} />
            <ShopDetailsTab />
            <Products />
            <RecentProducts />
        </>
    );
}
