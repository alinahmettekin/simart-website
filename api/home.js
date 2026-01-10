import { serverFetch } from "@/utils/serverFetch";
import { log, warn } from "@/utils/logger";

/**
 * Tüm kategorileri getirir.
 */
export async function getCategories() {
    const response = await serverFetch("/categories", { next: { revalidate: 10 } });
    if (response?.status === "success") {
        return response.data || [];
    }
    log("[API home.js] getCategories failed:", response);
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
            log(`[API home.js] getBanners success: ${banners.length} banner(s) loaded`);
        }
        return banners;
    }
    
    log("[API home.js] getBanners failed:", {
        status: response?.status,
        hasData: !!response?.data,
    });
    return [];
}

/**
 * Collection banner'ı getirir.
 * @returns {Promise<Object|null>} Collection banner objesi veya null
 */
export async function getCollectionBanner() {
    const response = await serverFetch("/banners?type=collectionbanner", { 
        next: { revalidate: 0 } 
    });
    
    if (response?.status === "success" && response.data) {
        // API'den dizi gelirse ilk elemanı, obje gelirse direkt döndür
        const banner = Array.isArray(response.data) ? response.data[0] : response.data;
        if (banner) {
            log(`[API home.js] getCollectionBanner success`);
            return banner;
        }
    }
    
    warn("[API home.js] getCollectionBanner failed:", response);
    return null;
}

/**
 * Collections listesini getirir (birden fazla collection banner).
 * @returns {Promise<Array>} Collections array'i
 */
export async function getCollections() {
    const response = await serverFetch("/banners?type=collections", { 
        next: { revalidate: 0 } 
    });
    
    if (response?.status === "success") {
        const collections = Array.isArray(response.data) ? response.data : (response.data ? [response.data] : []);
        if (collections.length > 0) {
            log(`[API home.js] getCollections success: ${collections.length} collection(s) loaded`);
        }
        return collections;
    }
    
    warn("[API home.js] getCollections failed:", response);
    return [];
}
