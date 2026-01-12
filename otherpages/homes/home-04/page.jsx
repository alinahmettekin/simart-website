import Features from "@/components/common/Features";
import Footer2 from "@/otherpages/components/footers/Footer2";
import Header from "@/otherpages/components/headers/Header";
import Topbar2 from "@/otherpages/components/headers/Topbar2";
import Categories from "@/components/homes/home-4/Categories";
import Categories2 from "@/components/homes/home-4/Categories2";
import Hero from "@/components/homes/home-4/Hero";
import Marquee from "@/components/homes/home-4/Marquee";
import Products from "@/components/homes/home-4/Products";
import ShopGram from "@/components/homes/home-4/ShopGram";
import Testimonials from "@/components/homes/home-4/Testimonials";
import React from "react";

export const metadata = {
  title: "Home 4 || Ecomus - Ultimate Nextjs Ecommerce Template",
  description: "Ecomus - Ultimate Nextjs Ecommerce Template",
};
export default function page() {
  return (
    <>
      <Header />
      <Hero />
      <Marquee />
      <Categories />
      <Products />
      <Testimonials />
      <Categories2 />
      <Features />
      <ShopGram />
      <div className="mb-lg-0 mb-sm-4"></div>
      <Footer2 />
    </>
  );
}
