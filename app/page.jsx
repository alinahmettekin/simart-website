import Features from "@/components/common/Features2";
import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import Blogs from "@/components/homes/home-electronic/Blogs";
import Categories from "@/components/homes/home-electronic/Categories";
import CollectionBanner from "@/components/homes/home-electronic/CollectionBanner";
import Collections from "@/components/homes/home-electronic/Collections";
import Countdown from "@/components/homes/home-electronic/Countdown";

import Hero from "@/components/homes/home-electronic/Hero";
import Products from "@/components/homes/home-electronic/Products";
import Testimonials from "@/components/homes/home-electronic/Testimonials";
import React, { cache } from "react";
import { getMenus, getCategories, getBanners } from "@/api/home";

export const metadata = {
  title: "Home Electronics  || Ecomus - Ultimate Nextjs Ecommerce Template",
  description: "Ecomus - Ultimate Nextjs Ecommerce Template",
};

export const dynamic = "force-dynamic";

export default async function Home() {
  console.log("[Home] Starting parallel data fetch via API services...");

  const [menuItems, categories, banners] = await Promise.all([
    getMenus(),
    getCategories(),
    getBanners(),
  ]);

  console.log("[Home] Data fetch complete.", {
    menuItemsCount: menuItems.length,
    categoriesCount: categories.length,
    bannersCount: banners.length,
  });

  return (
    <>
      <div className="color-primary-15">
        <Header2 textClass={"text-black"} menuItems={menuItems} />
        <Hero banners={banners} />
        {/* <Marquee /> */}
        <Categories categories={categories} />
        <CollectionBanner />
        <Collections />
        <Countdown />
        <Products />
        <Testimonials />
        <Blogs />
        <Features />
        <Footer1 />
      </div>
    </>
  );
}
