import BlogGrid from "@/components/blogs/BlogGrid";
import Footer from "@/components/footers/Footer";
import Header from "@/components/headers/Header";
import React from "react";
import Link from "next/link";
import { getBlogs } from "@/api/blogs";

export const metadata = {
  title: "Blog - Şımart Teknoloji",
  description: "Şımart Teknoloji blog sayfası, akıllı ev sistemleri ve teknolojik yenilikler hakkında en güncel bilgi kaynağınız.",
  author: "Şımart Teknoloji",
  robots: "index, follow",
};
export default async function page() {
  const blogs = await getBlogs();

  return (
    <>
      <Header />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="row">
            <div className="col-12">
              <div className="heading text-center">Şımart Blog</div>
              <ul className="breadcrumbs d-flex align-items-center justify-content-center">
                <li>
                  <Link href={`/`}>Anasayfa</Link>
                </li>
                <li>
                  <i className="icon-arrow-right" />
                </li>
                <li>Blog</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <BlogGrid blogs={blogs} />
      <Footer />
    </>
  );
}
