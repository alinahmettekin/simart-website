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
    const finalPrice = product.discount_price || product.price || 0;
    const oldPrice = product.discount_price ? product.price : null;
    const rating = product.rating || product.average_rating || 0;
    const reviewCount = product.reviews_count || product.review_count || 0;
    const productSlug = product.slug || product.id;
    const productImages = product.images || [];
    const campaignTags = product.campaign_tags || [];

    const isInStock = product.is_in_stock || false;
    const unlimitedStock = product.unlimited_stock || false;
    const isPreOrder = product.is_pre_order || false;
    const stockQuantity = product.stock_quantity || 0;

    let buttonText = "Sepete Ekle";
    let buttonAction = "addToCart";
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
                    width={1000}
                    height={1000}
                    campaignTags={campaignTags}
                />
            </div>
            <div className="card-product-info">
                <div className="title-box">
                    <Link href={`/product-detail/${productSlug}`} className="title">
                        {title}
                    </Link>
                </div>

                <div className="rating-box">
                    {rating > 0 && (
                        <>
                            <div className="rating d-flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <i
                                        key={i}
                                        className={`icon-star ${i < Math.floor(rating) ? 'text-warning' : 'text-muted'}`}
                                        style={{ fontSize: '14px' }}
                                    />
                                ))}
                            </div>
                            <span className="rating-value">{rating.toFixed(1)}</span>
                            {reviewCount > 0 && (
                                <span className="review-count">({reviewCount})</span>
                            )}
                        </>
                    )}
                </div>

                <div className="price-box">
                    {oldPrice ? (
                        <div className="price">
                            <span className="text-muted text-decoration-line-through me-2" style={{ fontSize: '13px' }}>
                                ₺{oldPrice.toLocaleString('tr-TR')}
                            </span>
                            <span className="fw-bold">
                                ₺{finalPrice.toLocaleString('tr-TR')}
                            </span>
                        </div>
                    ) : (
                        <span className="price fw-bold">
                            ₺{finalPrice.toLocaleString('tr-TR')}
                        </span>
                    )}
                </div>

                <div className="product-buttons-container d-flex gap-2 align-items-center">
                    <div className="flex-grow-1">
                        <Button
                            onClick={() => addProductToCartDirect(product)}
                            text={buttonText}
                            size="sm"
                            fullWidth={true}
                            disabled={buttonDisabled}
                            className="custom-product-btn"
                        />
                    </div>
                    <button
                        onClick={() => addToWishlist(product.id)}
                        className={`wishlist-button d-flex align-items-center justify-content-center ${isAddedtoWishlist(product.id) ? 'active' : ''}`}
                    >
                        <span className="icon icon-heart" />
                    </button>
                </div>
            </div>
            <style jsx>{`
                .wishlist-button {
                    transition: all 0.3s ease;
                    min-width: 44px !important;
                    width: 44px !important;
                    height: 44px !important;
                    padding: 0 !important;
                    border-radius: 50% !important;
                    background-color: #fff !important;
                    border: 1px solid #e0e0e0 !important;
                }
                .wishlist-button:hover {
                    background-color: #000 !important;
                    border-color: #000 !important;
                }
                .wishlist-button:hover .icon-heart {
                    color: #fff !important;
                }
                .card-product-info {
                    display: flex;
                    flex-direction: column;
                    flex-grow: 1;
                    padding: 15px !important;
                    padding-bottom: 20px !important; 
                }
                .product-buttons-container {
                    margin-top: auto;
                    padding-top: 10px;
                }
                .product-buttons-container :global(.custom-product-btn) {
                    height: 44px !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    padding: 0 15px !important;
                    border-radius: 999px !important;
                    white-space: nowrap !important;
                    font-size: 13px !important;
                    font-weight: 600 !important;
                }
                .title-box {
                    height: 40px;
                    margin-bottom: 8px;
                    overflow: hidden;
                }
                .title-box .title {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    line-height: 20px;
                    font-size: 14px;
                    font-weight: 500;
                    color: #000;
                }
                .rating-box {
                    height: 20px;
                    margin-bottom: 10px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .rating-value {
                    font-size: 13px;
                    font-weight: 600;
                }
                .review-count {
                    font-size: 12px;
                    color: #6c757d;
                }
                .price-box {
                    height: 24px;
                    margin-bottom: 18px;
                    display: flex;
                    align-items: center;
                }
                @media (min-width: 768px) {
                    .title-box {
                        margin-bottom: 2px;
                    }
                    .rating-box {
                        margin-bottom: 4px;
                    }
                    .price-box {
                        margin-bottom: 10px;
                    }
                }
                .price-box .price {
                    font-size: 16px;
                }
            `}</style>
        </div>
    );
}
