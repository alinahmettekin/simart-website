import { serverFetch } from "@/utils/serverFetch";

/**
 * Header menülerini getirir.
 */
export async function getMenus() {
    const response = await serverFetch("/menus?type=header-menu", { next: { revalidate: 10 } });
    if (response?.status === "success") {
        return response.data?.items || [];
    }
    console.warn("[API home.js] getMenus failed:", response);
    return [];
}

/**
 * Tüm kategorileri getirir.
 */
export async function getCategories() {
    const response = await serverFetch("/categories", { next: { revalidate: 10 } });
    if (response?.status === "success") {
        return response.data || [];
    }
    console.warn("[API home.js] getCategories failed:", response);
    return [];
}

/**
 * Anasayfa slider bannerlarını getirir.
 */
export async function getBanners() {
    const response = await serverFetch("/banners?type=slider", { cache: "no-store" });
    if (response?.status === "success") {
        return response.data || [];
    }
    console.warn("[API home.js] getBanners failed:", response);
    return [];
}
