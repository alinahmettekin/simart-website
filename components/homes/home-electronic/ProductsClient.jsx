"use client";
import Image from "next/image";
import { products15 as staticProducts } from "@/data/products";
import { useContextElement } from "@/context/Context";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { Navigation } from "swiper/modules";
import React from "react";
import Button from "@/components/common/Button";
import ProductImageSwiper from "@/components/common/ProductImageSwiper";

export default function ProductsClient({ products = [] }) {
    const displayProducts = products.length > 0 ? products : staticProducts;

    const {
        addToWishlist,
        isAddedtoWishlist,
        addProductToCartDirect,
    } = useContextElement();

    return (
        <section className="flat-spacing-19">
            <div className="container">
                <div className="flat-title flex-row justify-content-between px-0">
                    <span className="title wow fadeInUp" data-wow-delay="0s">
                        Trend Ürünler
                    </span>
                    <div className="box-sw-navigation">
                        <div className="nav-sw square nav-next-slider nav-next-sell-1 snbp161">
                            <span className="icon icon-arrow1-left" />
                        </div>
                        <div className="nav-sw square nav-prev-slider nav-prev-sell-1 snbn161">
                            <span className="icon icon-arrow1-right" />
                        </div>
                    </div>
                </div>
                <div className="hover-sw-nav hover-sw-2">
                    <div className="swiper tf-sw-product-sell-1 wrap-sw-over">
                        <Swiper
                            dir="ltr"
                            slidesPerView={4}
                            spaceBetween={30}
                            breakpoints={{
                                1100: { slidesPerView: 4 },
                                768: { slidesPerView: 3 },
                                640: { slidesPerView: 2 },
                                0: { slidesPerView: 2 },
                            }}
                            className="swiper-wrapper"
                            modules={[Navigation]}
                            navigation={{
                                prevEl: ".snbp161",
                                nextEl: ".snbn161",
                            }}
                        >
                            {displayProducts.map((product, index) => {
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
                                
                                // Stok ve ön sipariş kontrolü
                                const unlimitedStock = product.unlimited_stock || false;
                                const isPreOrder = product.is_pre_order || false;
                                
                                // Buton mantığı:
                                // - unlimited_stock true ise → "Sepete Ekle"
                                // - unlimited_stock false && is_pre_order true ise → "Ürünü İncele"
                                // - unlimited_stock false && is_pre_order false ise → "Sepete Ekle" (stok varsa)
                                const showAddToCart = unlimitedStock || (!unlimitedStock && !isPreOrder);
                                const showViewProduct = !unlimitedStock && isPreOrder;

                                return (
                                    <SwiperSlide className="swiper-slide height-auto" key={index}>
                                        <div className="card-product overflow-hidden bg_white radius-20 border-line h-100">
                                            <div className="card-product-wrapper">
                                                <ProductImageSwiper
                                                    images={productImages}
                                                    productSlug={productSlug}
                                                    productName={title}
                                                    width={360}
                                                    height={360}
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
                                                
                                                {/* Buton: Stok durumuna göre Sepete Ekle veya Ürünü İncele + Favorilere Ekle */}
                                                <div className="d-flex gap-2 align-items-stretch">
                                                    {showAddToCart ? (
                                                        <Button
                                                            onClick={() => {
                                                                addProductToCartDirect(product, 1);
                                                            }}
                                                            text="Sepete Ekle"
                                                            size="sm"
                                                            fullWidth={true}
                                                            className="text-center flex-grow-1"
                                                        />
                                                    ) : (
                                                        <Button
                                                            href={`/product-detail/${productSlug}`}
                                                            text="Ürünü İncele"
                                                            size="sm"
                                                            fullWidth={true}
                                                            className="text-center flex-grow-1"
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
                                                                ? "Favorilerde"
                                                                : "Favoriye Ekle"}
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>
                </div>
            </div>
            <style jsx global>{`
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
                }
                .wishlist-button .tooltip::before {
                    top: auto !important;
                    bottom: -4px !important;
                }
            `}</style>
        </section>
    );
}
