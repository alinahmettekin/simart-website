import BlogDetails from "@/components/blogs/BlogDetails";
import RelatedBlogs from "@/components/blogs/RelatedBlogs";
import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import Link from "next/link";
import React from "react";
import { notFound } from "next/navigation";
import { getBlogBySlug } from "@/api/blogs";

export const metadata = {
    title: "Blog Detay - Şımart Teknoloji",
    description: "Şımart Teknoloji blog detay sayfası.",
};

export default async function page({ params }) {
    const { slug } = await params;

    const blog = await getBlogBySlug(slug);

    if (!blog) {
        return notFound();
    }

    return (
        <>
            <Header2 />
            {/* <div className="tf-page-title">
                <div className="container-full">
                    <div className="row">
                        <div className="col-12">
                            <div className="heading text-center">{blog.title}</div>
                            <ul className="breadcrumbs d-flex align-items-center justify-content-center">
                                <li>
                                    <Link href={`/`}>Anasayfa</Link>
                                </li>
                                <li>
                                    <i className="icon-arrow-right" />
                                </li>
                                <li>
                                    <Link href={`/blog`}>Blog</Link>
                                </li>
                                <li>
                                    <i className="icon-arrow-right" />
                                </li>
                                <li>{blog.title}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div> */}
            <BlogDetails blog={blog} />
            <RelatedBlogs />
            <Footer1 />
        </>
    );
}
