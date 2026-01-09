import React from "react";
import { serverFetch } from "@/utils/serverFetch";
import BlogsClient from "./BlogsClient";

export default async function Blogs() {
  try {
    // 10 saniyelik revalidate cache ile veri çekilir
    const response = await serverFetch("/blogs", { next: { revalidate: 10 } });

    if (response?.status === "success" && response.data?.length > 0) {
      return <BlogsClient blogs={response.data} />;
    }
  } catch (error) {
    console.error("Blogs SSR fetch error:", error);
  }

  // Hata durumunda boş veri ile client component render edilir (statik fallback için)
  return <BlogsClient blogs={[]} />;
}
