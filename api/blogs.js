import { serverFetch } from "@/utils/serverFetch";
import { log } from "@/utils/logger";

/**
 * Tüm blog yazılarını getirir.
 */
export async function getBlogs() {
    const response = await serverFetch("/blogs");
    if (response?.status === "success") {
        return response.data || [];
    }
    log("[API blogs.js] getBlogs failed:", response);
    return [];
}

/**
 * Slug'a göre tek bir blog yazısı getirir.
 * @param {string} slug 
 */
export async function getBlogBySlug(slug) {
    if (!slug) return null;
    const response = await serverFetch(`/blogs?slug=${slug}`);

    if (response?.status === "success" && response.data) {
        // API bazen dizi bazen obje dönebilir
        return Array.isArray(response.data) ? response.data[0] : response.data;
    }

    log(`[API blogs.js] getBlogBySlug(${slug}) failed:`, response);
    return null;
}
