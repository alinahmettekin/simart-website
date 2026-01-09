"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";
import { blogArticles3 as staticBlogs } from "@/data/blogs";

export default function BlogsClient({ blogs = [] }) {
    // Veri yoksa statik verileri kullan
    const displayBlogs = blogs.length > 0 ? blogs : staticBlogs;

    return (
        <section className="flat-spacing-14">
            <div className="container">
                <div className="flat-title wow fadeInUp" data-wow-delay="0s">
                    <span className="title">Blog Yazıları</span>
                </div>
                <div className="hover-sw-nav view-default hover-sw-3">
                    <Swiper
                        dir="ltr"
                        className="swiper tf-sw-product-sell"
                        slidesPerView={3}
                        spaceBetween={30}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            0: { slidesPerView: 1 },
                        }}
                        modules={[Navigation, Pagination]}
                        navigation={{
                            prevEl: ".snbp157",
                            nextEl: ".snbn157",
                        }}
                        pagination={{ clickable: true, el: ".spd157" }}
                    >
                        {displayBlogs.map((article, index) => {
                            const slug = article.slug || article.title?.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
                            const imgSrc = article.image?.url || article.imgSrc || "/images/blog/blog-1.jpg";

                            return (
                                <SwiperSlide key={index}>
                                    <div
                                        className="blog-article-item wow fadeInUp"
                                        data-wow-delay={article.delay || "0s"}
                                    >
                                        <div className="article-thumb h-460 rounded-0">
                                            <Link href={`/${slug}`}>
                                                <Image
                                                    className="lazyload"
                                                    alt={article.title || article.name}
                                                    src={imgSrc}
                                                    width={550}
                                                    height={354}
                                                />
                                            </Link>
                                            <div className="article-label">
                                                <Link
                                                    href={`/blog`}
                                                    className="tf-btn btn-sm animate-hover-btn"
                                                >
                                                    Blog
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="article-content">
                                            <div className="article-title">
                                                <Link href={`/${slug}`}>
                                                    {article.title || article.name}
                                                </Link>
                                            </div>
                                            <div className="article-btn">
                                                <Link
                                                    href={`/${slug}`}
                                                    className="tf-btn btn-line fw-6"
                                                >
                                                    Devamını Oku
                                                    <i className="icon icon-arrow1-top-left" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                    <div className="nav-sw nav-next-slider nav-next-product box-icon w_46 round snbp157">
                        <span className="icon icon-arrow-left" />
                    </div>
                    <div className="nav-sw nav-prev-slider nav-prev-product box-icon w_46 round snbn157">
                        <span className="icon icon-arrow-right" />
                    </div>
                    <div className="sw-dots style-2 sw-pagination-product justify-content-center spd157" />
                </div>
            </div>
        </section>
    );
}
