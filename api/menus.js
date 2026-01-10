import { serverFetch } from "@/utils/serverFetch";
import { warn } from "@/utils/logger";

/**
 * Header menülerini getirir.
 * @returns {Promise<Array>} Menu items array'i
 */
export async function getMenus() {
    const response = await serverFetch("/menus?type=header-menu", { 
        next: { revalidate: 10 } 
    });
    
    if (response?.status === "success") {
        return response.data?.items || [];
    }
    
    warn("[API menus.js] getMenus failed:", response);
    return [];
}

/**
 * Menu type'a göre menü getirir (footer menüleri için)
 * @param {string} menuType - Menu type (örn: "yardim", "hakkimizda")
 * @returns {Promise<Object|null>} Menu objesi veya null
 */
export async function getMenuByType(menuType) {
    if (!menuType) {
        warn("[API menus.js] getMenuByType: menuType is required");
        return null;
    }

    const response = await serverFetch(`/menus?type=${menuType}`, { 
        next: { revalidate: 10 } 
    });

    if (response?.status === "success" && response.data) {
        return response.data;
    }

    warn(`[API menus.js] getMenuByType(${menuType}) failed:`, response);
    return null;
}

/**
 * Footer menülerini getirir (Yardım ve Hakkımızda)
 * Slug'a göre dinamik olarak eşleştirir - API'den gelen slug değerine göre
 * @returns {Promise<Array>} Menu array'i (slug field'ı ile)
 */
export async function getFooterMenus() {
    const [yardimMenu, hakkimizdaMenu] = await Promise.all([
        getMenuByType("yardim"),
        getMenuByType("hakkimizda"),
    ]);

    // Menüleri array olarak döndür (slug field'ı ile birlikte)
    const menus = [];
    
    if (yardimMenu?.slug && yardimMenu?.items?.length > 0) {
        menus.push(yardimMenu);
    }
    
    if (hakkimizdaMenu?.slug && hakkimizdaMenu?.items?.length > 0) {
        menus.push(hakkimizdaMenu);
    }

    return menus;
}

