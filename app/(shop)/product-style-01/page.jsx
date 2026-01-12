import Footer from "@/components/footers/Footer";
import Header from "@/otherpages/components/headers/Header";
import Topbar1 from "@/otherpages/components/headers/Topbar1";
import ProductStyle1 from "@/components/shop/ProductStyle1";
import React from "react";

export const metadata = {
  title: "Product Style 1 || Ecomus - Ultimate Nextjs Ecommerce Template",
  description: "Ecomus - Ultimate Nextjs Ecommerce Template",
};
export default function page() {
  return (
    <>
      <Topbar1 />
      <Header />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">New Arrival</div>
          <p className="text-center text-2 text_black-2 mt_5">
            Shop through our latest selection of Fashion
          </p>
        </div>
      </div>
      <ProductStyle1 />
      <Footer />
    </>
  );
}
