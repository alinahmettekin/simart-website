"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useContextElement } from "@/context/Context";
import Button from "@/components/common/Button";
import ProductImageSwiper from "@/components/common/ProductImageSwiper";

export default function ProductCardSimart({ product }) {
    const {
        addToWishlist,
        isAddedtoWishlist,
        addProductToCartDirect,
    } = useContextElement();

    const title = product.name || product.title;
    // API'den gelen format: discount_price varsa o fiyat, yoksa price
    const finalPrice = product.discount_price || product.price || 0;
    const oldPrice = product.discount_price ? product.price : null;
    // Rating bilgisi (API'den geliyorsa)
    const rating = product.rating || product.average_rating || 0;
    const reviewCount = product.reviews_count || product.review_count || 0;
    const productSlug = product.slug || product.id;
    // API'den gelen images array'i
    const productImages = product.images || [];
    // Kampanya etiketleri
    const campaignTags = product.campaign_tags || [];

    // Stok ve ön sipariş kontrolü
    const isInStock = product.is_in_stock || false;
    const unlimitedStock = product.unlimited_stock || false;
    const isPreOrder = product.is_pre_order || false;
    const stockQuantity = product.stock_quantity || 0;

    // Buton mantığı:
    let buttonText = "Sepete Ekle";
    let buttonAction = "addToCart";
    let buttonDisabled = false;

    if (isInStock) {
        if (unlimitedStock) {
            buttonText = "Sepete Ekle";
            buttonAction = "addToCart";
        } else {
            buttonText = `Son ${stockQuantity} ürün kaldı`;
            buttonAction = "addToCart";
        }
    } else {
        if (isPreOrder) {
            buttonText = "Ön Sipariş Ver";
            buttonAction = "preOrder";
        } else {
            buttonText = "Stokta Yok";
            buttonAction = "outOfStock";
            buttonDisabled = true;
        }
    }

    return (
        <div className="card-product overflow-hidden bg_white radius-20 border-line h-100 simart-custom-card">
            <div className="card-product-wrapper">
                <ProductImageSwiper
                    images={productImages}
                    productSlug={productSlug}
                    productName={title}
                    width={600}
                    height={600}
                    campaignTags={campaignTags}
                />
            </div>
            <div className="card-product-info has-padding">
                <Link
                    href={`/product-detail/${productSlug}`}
                    className="title link"
                >
                    {title}
                </Link>

                {/* Rating ve Review - Her zaman göster (boşluk için) */}
                <div className="product-rating d-flex align-items-center gap-2" style={{ minHeight: '24px' }}>
                    {rating > 0 ? (
                        <>
                            <div className="rating d-flex gap-1">
                                {Array.from({ length: 5 }).map((_, i) => {
                                    const starValue = i + 1;
                                    const filled = starValue <= Math.floor(rating);
                                    const halfFilled = starValue === Math.ceil(rating) && rating % 1 >= 0.5;

                                    return (
                                        <i
                                            key={i}
                                            className={`icon-star ${filled ? 'text-warning' : halfFilled ? 'text-warning opacity-50' : 'text-muted'}`}
                                            style={{ fontSize: '14px' }}
                                        />
                                    );
                                })}
                            </div>
                            <span className="rating-value" style={{ fontSize: '14px', fontWeight: '500' }}>
                                {rating.toFixed(1)}
                            </span>
                            {reviewCount > 0 ? (
                                <span className="review-count text-muted" style={{ fontSize: '12px' }}>
                                    ({reviewCount})
                                </span>
                            ) : (
                                <span className="review-count text-muted" style={{ fontSize: '12px', visibility: 'hidden' }}>
                                    (0)
                                </span>
                            )}
                        </>
                    ) : (
                        <>
                            <div className="rating d-flex gap-1" style={{ visibility: 'hidden' }}>
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <i
                                        key={i}
                                        className="icon-star text-muted"
                                        style={{ fontSize: '14px' }}
                                    />
                                ))}
                            </div>
                            <span className="rating-value" style={{ fontSize: '14px', fontWeight: '500', visibility: 'hidden' }}>
                                0.0
                            </span>
                            <span className="review-count text-muted" style={{ fontSize: '12px', visibility: 'hidden' }}>
                                (0)
                            </span>
                        </>
                    )}
                </div>

                {/* Fiyat */}
                {oldPrice ? (
                    <span className="price d-block">
                        <span className="old-price text-muted text-decoration-line-through me-2">
                            ₺{oldPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                        <span className="new-price fw-bold">
                            ₺{finalPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                    </span>
                ) : (
                    <span className="price d-block fw-bold">
                        ₺{finalPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                )}

                {/* Buton: Stok durumuna göre Sepete Ekle, Ön Sipariş Ver veya Stokta Yok + Favorilere Ekle */}
                <div className="d-flex gap-2 align-items-stretch mt-auto">
                    {buttonAction === "addToCart" ? (
                        <Button
                            onClick={() => {
                                addProductToCartDirect(product);
                            }}
                            text={buttonText}
                            size="sm"
                            fullWidth={true}
                            className="text-center flex-grow-1"
                        />
                    ) : buttonAction === "preOrder" ? (
                        <Button
                            onClick={() => {
                                // Ön sipariş için sepete ekleme işlemi
                                addProductToCartDirect(product);
                            }}
                            text={buttonText}
                            size="sm"
                            fullWidth={true}
                            className="text-center flex-grow-1"
                        />
                    ) : (
                        <Button
                            text={buttonText}
                            size="sm"
                            fullWidth={true}
                            className="text-center flex-grow-1"
                            disabled={true}
                        />
                    )}
                    <button
                        onClick={() => addToWishlist(product.id)}
                        className={`btn btn-sm rounded-full d-flex align-items-center justify-content-center bg-white border wishlist-button hover-tooltip center position-relative ${isAddedtoWishlist(product.id) ? 'active' : ''}`}
                        style={{
                            minWidth: '48px',
                            width: '48px',
                            padding: '0',
                            borderColor: '#e0e0e0',
                        }}
                    >
                        <span className={`icon icon-heart ${isAddedtoWishlist(product.id) ? "added" : ""}`} />
                        <span className="tooltip">
                            {isAddedtoWishlist(product.id)
                                ? "İstek Listesinden Kaldır"
                                : "İstek Listesine Ekle"}
                        </span>
                    </button>
                </div>
            </div>
            <style jsx>{`
                .wishlist-button {
                    transition: all 0.3s ease;
                }
                .wishlist-button:hover {
                    background-color: #000 !important;
                    border-color: #000 !important;
                }
                .wishlist-button:hover .icon-heart {
                    color: #fff !important;
                }
                .wishlist-button .tooltip {
                    top: auto !important;
                    bottom: 100% !important;
                    margin-top: 0 !important;
                    margin-bottom: 8px !important;
                    z-index: 10 !important;
                }
                .card-product {
                    padding: 0px !important;
                    display: flex;
                    flex-direction: column;
                }
                .card-product-wrapper {
                    border-radius: 19px !important;
                    overflow: hidden !important;
                }
                .card-product-info {
                    display: flex;
                    flex-direction: column;
                    flex-grow: 1;
                }
            `}</style>
        </div>
    );
}
