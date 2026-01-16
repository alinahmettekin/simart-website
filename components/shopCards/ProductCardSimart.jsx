"use client";
import React from "react";
import Link from "next/link";
import { useContextElement } from "@/context/Context";
import { useCartStore } from "@/stores/cartStore";
import Button from "@/components/common/Button";
import ProductImageSwiper from "@/components/common/ProductImageSwiper";

export default function ProductCardSimart({ product }) {
    const context = useContextElement();
    const addToWishlist = context?.addToWishlist || (() => {});
    const isAddedtoWishlist = context?.isAddedtoWishlist || (() => false);
    const { addItem, isInCart } = useCartStore();
    const [isAdding, setIsAdding] = React.useState(false);
    const [showSuccess, setShowSuccess] = React.useState(false);

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

    // -- Buton Metin Mantığı --
    const isInStock = product.is_in_stock || false;
    const unlimitedStock = product.unlimited_stock || false;
    const isPreOrder = product.is_pre_order || false;
    const stockQuantity = product.stock_quantity || 0;

    let buttonText = "Sepete Ekle";
    let buttonDisabled = false;

    // Stok durumuna göre buton metni (sepette olsa bile "Sepete Ekle" yazacak)
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
                            onClick={async () => {
                                if (isAdding || showSuccess) return;
                                setIsAdding(true);
                                try {
                                    await addItem(product, 1, false);
                                    // Başarılı olduğunda animasyon göster
                                    setShowSuccess(true);
                                    setTimeout(() => {
                                        setShowSuccess(false);
                                    }, 2000); // Animasyon 2 saniye sürüyor
                                } catch (error) {
                                    console.error("Sepete ekleme hatası:", error);
                                } finally {
                                    setIsAdding(false);
                                }
                            }}
                            text={showSuccess ? "Sepete Eklendi" : (isAdding ? "Ekleniyor..." : buttonText)}
                            size="sm"
                            fullWidth={true}
                            disabled={buttonDisabled || isAdding || showSuccess}
                            className={`main-cart-btn ${showSuccess ? 'success-animation' : ''}`}
                            style={{ opacity: 1 }}
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
                    min-height: 400px;
                    background: #fff;
                    border: 1px solid #e0e0e0;
                    border-radius: 20px;
                    position: relative;
                }
                
                /* Görsel Alanı: Kesme Sadece Burada (Tooltip'i engellemesin diye) */
                .card-image-area {
                    overflow: hidden;
                    border-radius: 20px 20px 0 0;
                    flex-shrink: 0;
                }

                .card-content-area {
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                    padding: 12px;
                    min-height: 0;
                    justify-content: flex-end;
                }

                /* Hizalama Slotları */
                .title-slot { 
                    height: 40px; 
                    margin-bottom: 4px; 
                    overflow: hidden; 
                    flex-shrink: 0;
                }
                .rating-slot { 
                    height: 20px; 
                    margin-bottom: 8px; 
                    display: flex; 
                    align-items: center; 
                    flex-shrink: 0;
                }
                .price-slot { 
                    height: 24px; 
                    margin-bottom: 12px; 
                    display: flex; 
                    align-items: center; 
                    flex-shrink: 0;
                }
                .button-row { 
                    display: flex; 
                    gap: 8px; 
                    align-items: center; 
                    width: 100%;
                    flex-shrink: 0;
                }
                .button-row .flex-grow-1 {
                    flex: 1;
                    min-width: 0;
                    display: flex;
                }

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
                    white-space: nowrap !important;
                    overflow: hidden !important;
                    text-overflow: ellipsis !important;
                    align-items: center !important;
                    padding-left: 16px !important;
                    padding-right: 16px !important;
                    display: flex !important;
                    /* Tablet ve mobilde soldan, desktop'ta ortadan */
                    text-align: left !important;
                    justify-content: flex-start !important;
                    transition: all 0.3s ease !important;
                    position: relative !important;
                }
                
                /* Disabled durumunda soluk kalmasın - inline style'ı override et */
                :global(.main-cart-btn[style*="opacity"]) {
                    opacity: 1 !important;
                }
                
                /* Disabled attribute'u varsa da opacity 1 olsun */
                :global(.main-cart-btn:disabled),
                :global(.main-cart-btn[disabled]) {
                    opacity: 1 !important;
                }
                
                /* Başarı animasyonu - Trendyol tarzı: Buton yerinde, yazı alttan çıkıp iniyor */
                :global(.main-cart-btn.success-animation) {
                    background: #10b981 !important;
                    border-color: #10b981 !important;
                    position: relative !important;
                    overflow: hidden !important;
                }
                
                :global(.main-cart-btn.success-animation::before) {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 100%;
                    background: #10b981;
                    animation: slideUpBorder 2s cubic-bezier(0.4, 0, 0.2, 1);
                    z-index: 0;
                }
                
                :global(.main-cart-btn.success-animation span) {
                    color: #fff !important;
                    position: relative;
                    z-index: 1;
                    animation: slideUpDownText 2s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                @keyframes slideUpBorder {
                    0% {
                        transform: translateY(100%);
                    }
                    20% {
                        transform: translateY(0);
                    }
                    80% {
                        transform: translateY(0);
                    }
                    100% {
                        transform: translateY(100%);
                    }
                }
                
                @keyframes slideUpDownText {
                    0% {
                        transform: translateY(100%);
                        opacity: 0;
                    }
                    20% {
                        transform: translateY(0);
                        opacity: 1;
                    }
                    80% {
                        transform: translateY(0);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(100%);
                        opacity: 0;
                    }
                }
                :global(.main-cart-btn span) {
                    white-space: nowrap !important;
                    overflow: hidden !important;
                    text-overflow: ellipsis !important;
                    display: block !important;
                    width: 100% !important;
                    flex: 1;
                    min-width: 0;
                    /* Tablet ve mobilde soldan, desktop'ta ortadan */
                    text-align: left !important;
                }
                
                /* Desktop'ta ortadan başla (992px ve üzeri) */
                @media (min-width: 992px) {
                    :global(.main-cart-btn) {
                        text-align: center !important;
                        justify-content: center !important;
                    }
                    :global(.main-cart-btn span) {
                        text-align: center !important;
                    }
                }
                
                .wish-action-btn {
                    position: relative;
                    width: 44px;
                    height: 44px;
                    min-width: 44px;
                    min-height: 44px;
                    max-width: 44px;
                    max-height: 44px;
                    border-radius: 50%;
                    border: 1px solid #ddd;
                    background: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: 0.2s;
                    flex-shrink: 0;
                    padding: 0;
                }
                .wish-action-btn:hover { background: #000; color: #fff; border-color: #000; }
                .wish-action-btn i {
                    font-size: 18px;
                    line-height: 1;
                }
                
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
                    .button-row { gap: 6px; }
                    .wish-action-btn {
                        width: 40px;
                        height: 40px;
                        min-width: 40px;
                        min-height: 40px;
                        max-width: 40px;
                        max-height: 40px;
                    }
                    .wish-action-btn i {
                        font-size: 16px;
                    }
                }
                @media (max-width: 480px) {
                    .button-row { gap: 4px; }
                    .wish-action-btn {
                        width: 36px;
                        height: 36px;
                        min-width: 36px;
                        min-height: 36px;
                        max-width: 36px;
                        max-height: 36px;
                    }
                    .wish-action-btn i {
                        font-size: 14px;
                    }
                }
            `}</style>
        </div>
    );
}
