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
 * Cloudflare challenge sorunları için özel retry ayarları kullanılır.
 */
export async function getBanners() {
    // Banner için daha fazla retry (Cloudflare challenge için)
    const response = await serverFetch("/banners?type=slider", { 
        cache: "no-store",
        retries: 5, // Banner için 5 retry (Cloudflare challenge için)
    });
    
    if (response?.status === "success") {
        const banners = response.data || [];
        if (banners.length > 0) {
            console.log(`[API home.js] getBanners success: ${banners.length} banner(s) loaded`);
        }
        return banners;
    }
    
    console.warn("[API home.js] getBanners failed:", {
        status: response?.status,
        hasData: !!response?.data,
    });
    return [];
}
