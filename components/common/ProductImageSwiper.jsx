"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

/**
 * Product image swiper component
 * @param {Object} props
 * @param {Array} props.images - Array of image objects with url and thumbnail_url
 * @param {string} props.productSlug - Product slug for link
 * @param {string} props.productName - Product name for alt text
 * @param {number} props.width - Image width (default: 360)
 * @param {number} props.height - Image height (default: 360)
 * @param {Array} props.campaignTags - Array of campaign tag image URLs
 */
export default function ProductImageSwiper({
    images = [],
    productSlug,
    productName = "product",
    width = 360,
    height = 360,
    campaignTags = [],
}) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!images || images.length === 0) {
        return (
            <div className="product-img">
                <Image
                    className="img-product"
                    src="/images/products/product-1.jpg"
                    alt={productName}
                    width={width}
                    height={height}
                    quality={90}
                    style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                        width: '100%',
                        height: '100%'
                    }}
                />
            </div>
        );
    }

    // Tek görsel varsa Swiper kullanma
    if (images.length === 1) {
        return (
            <>
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <Link
                        href={`/product-detail/${productSlug}`}
                        className="product-img no-hover-effect"
                        style={{
                            position: 'relative',
                            display: 'block',
                            width: '100%',
                            height: '100%'
                        }}
                    >
                        <Image
                            className="img-product"
                            src={images[0].url}
                            alt={productName}
                            width={width}
                            height={height}
                            quality={90}
                            style={{
                                objectFit: 'cover',
                                objectPosition: 'center',
                                width: '100%',
                                height: '100%'
                            }}
                            loading="lazy"
                        />
                    </Link>
                    {/* Kampanya etiketleri */}
                    {campaignTags && campaignTags.length > 0 && (
                        <>
                            {(() => {
                                const positionCounters = { left: 0, center: 0, right: 0 };
                                const tagHeight = 75;
                                const gap = 10;
                                const renderTags = [];

                                campaignTags.forEach((tag, index) => {
                                    const position = tag.position || 'left';
                                    const counter = positionCounters[position];

                                    if (counter < 3) {
                                        let positionStyle = {};
                                        const topValue = 10 + (counter * (tagHeight + gap));

                                        if (position === 'left') {
                                            positionStyle = { top: `${topValue}px`, left: '10px' };
                                        } else if (position === 'center') {
                                            positionStyle = { top: `${topValue}px`, left: '50%', transform: 'translateX(-50%)' };
                                        } else if (position === 'right') {
                                            positionStyle = { top: `${topValue}px`, right: '10px' };
                                        }

                                        renderTags.push({
                                            ...tag,
                                            style: {
                                                position: 'absolute',
                                                zIndex: 10,
                                                ...positionStyle,
                                            },
                                            key: `${position}-${counter}-${index}`,
                                        });

                                        positionCounters[position]++;
                                    }
                                });

                                return renderTags.map((tag) => (
                                    <Link
                                        key={tag.key}
                                        href={`/product-detail/${productSlug}`}
                                        className="campaign-tag"
                                        style={{
                                            ...tag.style,
                                            cursor: 'pointer',
                                            display: 'block',
                                        }}
                                    >
                                        <Image
                                            src={tag.url}
                                            alt="Campaign Tag"
                                            width={60}
                                            height={60}
                                            style={{
                                                maxWidth: '75px',
                                                height: 'auto',
                                                objectFit: 'contain',
                                            }}
                                        />
                                    </Link>
                                ));
                            })()}
                        </>
                    )}
                </div>
                <style jsx global>{`
                    .no-hover-effect .img-product,
                    .no-hover-effect:hover .img-product,
                    .card-product-wrapper:hover .no-hover-effect .img-product {
                        opacity: 1 !important;
                    }
                `}</style>
            </>
        );
    }

    return (
        <>
            <div className="product-img-swiper position-relative no-hover-effect">
                <Swiper
                    modules={[Pagination, Navigation]}
                    spaceBetween={0}
                    slidesPerView={1}
                    pagination={{
                        clickable: true,
                        dynamicBullets: false,
                    }}
                    onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
                    className="product-images-swiper"
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <Link href={`/product-detail/${productSlug}`} className="product-img">
                                <Image
                                    className="img-product"
                                    src={image.url}
                                    alt={`${productName} - ${index + 1}`}
                                    width={width}
                                    height={height}
                                    quality={90}
                                    style={{
                                        objectFit: 'cover',
                                        objectPosition: 'center',
                                        width: '100%',
                                        height: '100%'
                                    }}
                                    loading="lazy"
                                />
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
                {/* Kampanya etiketleri */}
                {campaignTags && campaignTags.length > 0 && (
                    <>
                        {(() => {
                            const positionCounters = { left: 0, center: 0, right: 0 };
                            const tagHeight = 75;
                            const gap = 10;
                            const renderTags = [];

                            campaignTags.forEach((tag, index) => {
                                const position = tag.position || 'left';
                                const counter = positionCounters[position];

                                if (counter < 3) {
                                    let positionStyle = {};
                                    const topValue = 10 + (counter * (tagHeight + gap));

                                    if (position === 'left') {
                                        positionStyle = { top: `${topValue}px`, left: '10px' };
                                    } else if (position === 'center') {
                                        positionStyle = { top: `${topValue}px`, left: '50%', transform: 'translateX(-50%)' };
                                    } else if (position === 'right') {
                                        positionStyle = { top: `${topValue}px`, right: '10px' };
                                    }

                                    renderTags.push({
                                        ...tag,
                                        style: {
                                            position: 'absolute',
                                            zIndex: 10,
                                            ...positionStyle,
                                        },
                                        key: `${position}-${counter}-${index}`,
                                    });

                                    positionCounters[position]++;
                                }
                            });

                            return renderTags.map((tag) => (
                                <Link
                                    key={tag.key}
                                    href={`/product-detail/${productSlug}`}
                                    className="campaign-tag"
                                    style={{
                                        ...tag.style,
                                        cursor: 'pointer',
                                        display: 'block',
                                    }}
                                >
                                    <Image
                                        src={tag.url}
                                        alt="Campaign Tag"
                                        width={60}
                                        height={60}
                                        style={{
                                            maxWidth: '75px',
                                            height: 'auto',
                                            objectFit: 'contain',
                                        }}
                                    />
                                </Link>
                            ));
                        })()}
                    </>
                )}
            </div>
            <style jsx global>{`
                .no-hover-effect .img-product,
                .no-hover-effect:hover .img-product {
                    opacity: 1 !important;
                }
                .card-product-wrapper:hover .no-hover-effect .img-product {
                    opacity: 1 !important;
                }
                .product-images-swiper .swiper-pagination {
                    position: absolute;
                    bottom: 10px;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 10;
                    display: flex;
                    gap: 6px;
                    justify-content: center;
                    width: auto !important;
                }
                .product-images-swiper .swiper-pagination-bullet {
                    width: 6px !important;
                    height: 6px !important;
                    background-color: rgba(0, 0, 0, 0.4) !important;
                    opacity: 1 !important;
                    border-radius: 50% !important;
                    transition: all 0.3s ease !important;
                    margin: 0 3px !important;
                }
                .product-images-swiper .swiper-pagination-bullet-active {
                    width: 24px !important;
                    height: 6px !important;
                    background-color: rgba(0, 0, 0, 0.8) !important;
                    border-radius: 3px !important;
                }
            `}</style>
        </>
    );
}
