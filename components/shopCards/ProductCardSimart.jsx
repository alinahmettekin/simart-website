"use client";
import React from "react";
import Link from "next/link";
import { useContextElement } from "@/context/Context";
import Button from "@/components/common/Button";
import ProductImageSwiper from "@/components/common/ProductImageSwiper";

export default function ProductCardSimart({ product }) {
    const { addToWishlist, isAddedtoWishlist, addProductToCartDirect } = useContextElement();

    // -- Veriler --
    const title = product.name || product.title;
    const finalPrice = product.discount_price || product.price || 0;
    const oldPrice = product.discount_price ? product.price : null;
    const rating = product.rating || product.average_rating || 0;
    const reviewCount = product.reviews_count || product.review_count || 0;
    const productSlug = product.slug || product.id;
    const isAdded = isAddedtoWishlist(product.id);

    // Kategori slug'ını al (ilk kategoriden)
    const getCategorySlug = () => {
        if (product.categories && product.categories.length > 0) {
            const category = product.categories[0];
            // Slug varsa onu kullan
            if (category.slug) {
                return category.slug;
            }
            // Slug yoksa kategori adını slug'a çevir
            if (category.name) {
                return category.name
                    .toLowerCase()
                    .replace(/ğ/g, 'g')
                    .replace(/ü/g, 'u')
                    .replace(/ş/g, 's')
                    .replace(/ı/g, 'i')
                    .replace(/ö/g, 'o')
                    .replace(/ç/g, 'c')
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/^-+|-+$/g, '');
            }
        }
        // Kategori yoksa varsayılan olarak "urunler" kullan
        return "urunler";
    };
    const categorySlug = getCategorySlug();

    // -- Orijinal Buton Metin Mantığı --
    const isInStock = product.is_in_stock || false;
    const unlimitedStock = product.unlimited_stock || false;
    const isPreOrder = product.is_pre_order || false;
    const stockQuantity = product.stock_quantity || 0;

    let buttonText = "Sepete Ekle";
    let buttonDisabled = false;

    if (isInStock) {
        if (unlimitedStock) {
            buttonText = "Sepete Ekle";
        } else {
            buttonText = `Son ${stockQuantity} ürün`;
        }
    } else {
        if (isPreOrder) {
            buttonText = "Ön Sipariş Ver";
        } else {
            buttonText = "Stokta Yok";
            buttonDisabled = true;
        }
    }

    return (
        <div className="product-card-simart">
            {/* Üst Kısım: Görsel (Ölçek ve Kalite Korundu) */}
            <div className="card-image-area">
                <ProductImageSwiper
                    images={product.images || []}
                    productSlug={productSlug}
                    productName={title}
                    width={1000}
                    height={1000}
                    campaignTags={product.campaign_tags || []}
                    categorySlug={categorySlug}
                />
            </div>

            {/* Alt Kısım: Bilgiler */}
            <div className="card-content-area">
                <div className="title-slot">
                    <Link href={`/magaza/${categorySlug}/${productSlug}`} className="product-title">
                        {title}
                    </Link>
                </div>

                <div className="rating-slot">
                    {rating > 0 && (
                        <div className="rating-wrap">
                            <div className="stars-box">
                                {[...Array(5)].map((_, i) => (
                                    <i key={i} className={`icon-star ${i < Math.floor(rating) ? 'active' : ''}`} />
                                ))}
                            </div>
                            <span className="rating-num">{rating.toFixed(1)}</span>
                            {reviewCount > 0 && <span className="review-num">({reviewCount})</span>}
                        </div>
                    )}
                </div>

                <div className="price-slot">
                    {oldPrice && <span className="price-old">₺{oldPrice.toLocaleString('tr-TR')}</span>}
                    <span className="price-new fw-bold">₺{finalPrice.toLocaleString('tr-TR')}</span>
                </div>

                <div className="button-row">
                    <div className="flex-grow-1">
                        <Button
                            onClick={() => addProductToCartDirect(product)}
                            text={buttonText}
                            size="sm"
                            fullWidth={true}
                            disabled={buttonDisabled}
                            className="main-cart-btn"
                        />
                    </div>
                    <button
                        onClick={() => addToWishlist(product.id)}
                        className={`wish-action-btn ${isAdded ? 'active' : ''}`}
                    >
                        <i className={`icon ${isAdded ? 'icon-delete' : 'icon-heart'}`} />
                        <span className="action-tooltip">
                            {isAdded ? "Favorilerden Kaldır" : "Favorilere Ekle"}
                        </span>
                    </button>
                </div>
            </div>

            <style jsx>{`
                .product-card-simart {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    background: #fff;
                    border: 1px solid #e0e0e0;
                    border-radius: 20px;
                    position: relative;
                }
                
                /* Görsel Alanı: Kesme Sadece Burada (Tooltip'i engellemesin diye) */
                .card-image-area {
                    overflow: hidden;
                    border-radius: 20px 20px 0 0;
                }

                .card-content-area {
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                    padding: 12px;
                }

                /* Hizalama Slotları */
                .title-slot { height: 40px; margin-bottom: 4px; overflow: hidden; }
                .rating-slot { height: 20px; margin-bottom: 8px; display: flex; align-items: center; }
                .price-slot { height: 24px; margin-bottom: 12px; display: flex; align-items: center; }
                .button-row { margin-top: auto; display: flex; gap: 8px; align-items: center; }

                /* Metin Stilleri */
                .product-title {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    font-size: 14px;
                    line-height: 20px;
                    font-weight: 500;
                    color: #000;
                }
                .rating-wrap { display: flex; align-items: center; gap: 6px; }
                .stars-box i { font-size: 12px; color: #ddd; }
                .stars-box i.active { color: #f59e0b; }
                .rating-num { font-size: 13px; font-weight: 600; }
                .review-num { font-size: 12px; color: #888; }
                .price-old { font-size: 13px; text-decoration: line-through; color: #999; margin-right: 8px; }
                .price-new { font-size: 16px; color: #000; }

                /* Butonlar (Tema renkleri kullanılıyor) */
                :global(.main-cart-btn) {
                    height: 44px !important;
                    border-radius: 999px !important;
                    font-size: 13px !important;
                    font-weight: 600 !important;
                }
                
                .wish-action-btn {
                    position: relative;
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    border: 1px solid #ddd;
                    background: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: 0.2s;
                }
                .wish-action-btn:hover { background: #000; color: #fff; border-color: #000; }
                
                /* Tooltip (Kesilmeyen Yapı) */
                .action-tooltip {
                    position: absolute;
                    bottom: 115%;
                    left: 50%;
                    transform: translateX(-50%);
                    background: #333;
                    color: #fff;
                    padding: 4px 10px;
                    border-radius: 6px;
                    font-size: 11px;
                    white-space: nowrap;
                    opacity: 0;
                    visibility: hidden;
                    transition: 0.2s;
                    z-index: 999;
                }
                .wish-action-btn:hover .action-tooltip { opacity: 1; visibility: visible; }

                @media (max-width: 768px) {
                    .card-content-area { padding: 10px; }
                    .price-slot { margin-bottom: 8px; }
                }
            `}</style>
        </div>
    );
}
