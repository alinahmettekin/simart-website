import React from "react";
import { serverFetch } from "@/utils/serverFetch";
import ProductsClient from "./ProductsClient";

export default async function Products() {
  try {
    const response = await serverFetch("/products?limit=8", { next: { revalidate: 10 } });

    let products = [];
    if (response?.status === "success") {
      products = response.data?.items || response.data || [];
    }

    return <ProductsClient products={products} />;
  } catch (error) {
    console.error("Products SSR fetch error:", error);
    return <ProductsClient products={[]} />;
  }
}
