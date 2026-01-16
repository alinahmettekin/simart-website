import Features from "@/components/common/Features2";
import Header from "@/components/headers/Header";
import Blogs from "@/components/homes/home-electronic/Blogs";
import Categories from "@/components/homes/home-electronic/Categories";
import CollectionBanner from "@/components/homes/home-electronic/CollectionBanner";
import Collections from "@/components/homes/home-electronic/Collections";

import Hero from "@/components/homes/home-electronic/Hero";
import Products from "@/components/homes/home-electronic/Products";
import Testimonials from "@/components/homes/home-electronic/Testimonials";
import React, { cache } from "react";
import { getCategories, getBanners, getCollectionBanner, getCollections } from "@/api/home";
import { getMenus } from "@/api/menus";
import { siteConfig } from "@/config/site";
import { organizationSchema } from "@/lib/schema";

const schema = organizationSchema();

export const metadata = {
  title: "Şımart Teknoloji - Robot Süpürge ve Akıllı Ev Sistemleri",
  description:
    "Şımart Teknoloji, robot süpürgeler, akıllı ev sistemleri ve IoT çözümlerinde öncüdür. Ev otomasyonu ve yaşamı kolaylaştıran teknolojilerle hizmetinizdeyiz.",
  base: siteConfig.site.url,
  other: {
    "script:ld+json": JSON.stringify(schema),
  },
};

export const dynamic = "force-dynamic";

export default async function Home() {
  const [menuItems, banners, categories, collectionBanner, collections] = await Promise.all([
    getMenus(),
    getBanners(),
    getCategories(),
    getCollectionBanner(),
    getCollections(),
  ]);

  return (
    <div className="color-primary-15">
      <Header textClass={"text-black"} menuItems={menuItems} />
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
    </div>
  );
}
