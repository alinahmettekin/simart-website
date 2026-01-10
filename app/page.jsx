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
import { getCategories, getBanners, getCollectionBanner, getCollections } from "@/api/home";
import { getMenus, getFooterMenus } from "@/api/menus";
import { log } from "@/utils/logger";

export const metadata = {
  title: "Şımart Teknoloji - Robot Süpürge ve Akıllı Ev Sistemleri",
  description: "Şımart Teknoloji, robot süpürgeler, akıllı ev sistemleri ve IoT çözümlerinde öncüdür. Ev otomasyonu ve yaşamı kolaylaştıran teknolojilerle hizmetinizdeyiz.",
};

export const dynamic = "force-dynamic";

export default async function Home() {
  log("[Home] Starting parallel data fetch via API services...");

  const [menuItems, categories, banners, footerMenus, collectionBanner, collections] = await Promise.all([
    getMenus(),
    getCategories(),
    getBanners(),
    getFooterMenus(),
    getCollectionBanner(),
    getCollections(),
  ]);

  log("[Home] Data fetch complete.", {
    menuItemsCount: menuItems.length,
    categoriesCount: categories.length,
    bannersCount: banners.length,
    hasFooterMenus: !!(footerMenus.yardim || footerMenus.hakkimizda),
  });

  return (
    <>
      <div className="color-primary-15">
        <Header2 textClass={"text-black"} menuItems={menuItems} />
        <Hero banners={banners} />
        {/* <Marquee /> */}
        <Categories categories={categories} />
        <CollectionBanner banner={collectionBanner} />
        <Collections collections={collections} />
        {/* <Countdown /> */}
        <Products />
        <Testimonials />
        <Blogs />
        <Features />
        <Footer1 footerMenus={footerMenus} />
      </div>
    </>
  );
}
