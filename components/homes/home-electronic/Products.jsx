import React from "react";
import { getProducts } from "@/api/products";
import ProductsClient from "./ProductsClient";

export default async function Products() {
  try {
    // Tüm ürünleri getir (limit yok)
    const products = await getProducts();
    
    // Debug: API'den gelen ürün sayısını kontrol et
    console.log("[Products SSR] getProducts result:", products);
    console.log("[Products SSR] products length:", Array.isArray(products) ? products.length : "not an array");
    console.log("[Products SSR] products type:", typeof products);
    
    if (!Array.isArray(products)) {
      console.error("Products is not an array:", products);
      return <ProductsClient products={[]} />;
    }

    return <ProductsClient products={products} />;
  } catch (error) {
    console.error("Products SSR fetch error:", error);
    return <ProductsClient products={[]} />;
  }
}
