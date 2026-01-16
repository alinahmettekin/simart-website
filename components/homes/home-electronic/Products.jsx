import React from "react";
import { getProducts } from "@/api/products";
import ProductsClient from "./ProductsClient";

export default async function Products() {
  try {
    // Tüm ürünleri getir (limit yok)
    const products = await getProducts();
    
    // Debug: API'den gelen ürün sayısını kontrol et
    
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
