import Footer2 from "@/otherpages/components/footers/Footer2";
import Header from "@/otherpages/components/headers/Header";
import Topbar2 from "@/otherpages/components/headers/Topbar2";
import Products from "@/components/homes/home-search/Products";
import React from "react";

export const metadata = {
  title: "Home Search || Ecomus - Ultimate Nextjs Ecommerce Template",
  description: "Ecomus - Ultimate Nextjs Ecommerce Template",
};
export default function page() {
  return (
    <>
      <Header />
      <div className="tf-page-title style-2">
        <div className="container-full">
          <div className="heading text-center">Search</div>
        </div>
      </div>
      <Products />
      <Footer2 />
    </>
  );
}
