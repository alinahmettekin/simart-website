import apiClient from "@/utils/apiClient";
import { log } from "@/utils/logger";

/**
 * Sepeti API'den getirir (Client-side)
 * @returns {Promise<Object|null>} Sepet verisi veya null
 */
export async function getCart() {
    try {
        const response = await apiClient.get("/cart");

        if (response?.data?.status === "success" && response.data.data) {
        const cartData = response.data.data;
        
        // Sadece gerekli verileri normalize et
        const normalizedCart = {
            // Cart bilgileri
            cartId: cartData.cart?.id || null,
            deviceId: cartData.cart?.device_id || null,
            
            // Items - sadece gerekli alanlar
            items: (cartData.items || []).map(item => {
                // cover_image objesi veya null olabilir
                const coverImage = item.product?.cover_image;
                const imageUrl = coverImage?.url || coverImage || null;
                
                return {
                    id: item.id, // API item ID'si
                    productId: item.product?.id || item.product_id,
                    quantity: item.quantity || 1,
                    unitPrice: parseFloat(item.unit_price || 0),
                    discountAmount: parseFloat(item.discount_amount || 0),
                    taxAmount: parseFloat(item.tax_amount || 0),
                    total: parseFloat(item.total || 0),
                    // Product bilgileri (minimal)
                    product: {
                        id: item.product?.id || item.product_id,
                        name: item.product?.name || "",
                        slug: item.product?.slug || "",
                        sku: item.product?.sku || "",
                        coverImage: imageUrl,
                    }
                };
            }),
            
            // Totals
            totals: {
                subtotal: parseFloat(cartData.totals?.subtotal || 0),
                discountAmount: parseFloat(cartData.totals?.discount_amount || 0),
                taxAmount: parseFloat(cartData.totals?.tax_amount || 0),
                total: parseFloat(cartData.totals?.total || 0),
                totalItems: parseInt(cartData.totals?.total_items || 0),
            },
            
            // Coupon (şimdilik null, ileride kullanılabilir)
            coupon: cartData.coupon || null,
        };

            return normalizedCart;
        }

        log("[API cart.js] getCart failed:", response?.data);
        return null;
    } catch (error) {
        // Axios error response detaylarını logla
        if (error.response) {
            // Server'dan response geldi (400, 500, vb.)
            log("[API cart.js] getCart error response:", {
                status: error.response.status,
                statusText: error.response.statusText,
                data: error.response.data,
                url: error.config?.url,
            });
            console.error("[API cart.js] Full error:", error);
        } else if (error.request) {
            // Request gönderildi ama response gelmedi
            log("[API cart.js] getCart no response:", error.request);
            console.error("[API cart.js] Request error:", error);
        } else {
            // Request hazırlanırken hata
            log("[API cart.js] getCart setup error:", error.message);
            console.error("[API cart.js] Setup error:", error);
        }
        return null;
    }
}

/**
 * Sepete ürün ekler (Client-side)
 * @param {string} productSlug - Ürün slug'ı (örn: "katya-u")
 * @param {number} quantity - Miktar (varsayılan: 1)
 * @returns {Promise<Object|null>} Sepet verisi veya null
 */
export async function addToCart(productSlug, quantity = 1) {
    if (!productSlug) {
        log("[API cart.js] addToCart: productSlug is required");
        return null;
    }

    try {
        const response = await apiClient.post("/cart/items", null, {
            params: {
                product_slug: productSlug,
                quantity: quantity,
            }
        });

        // addToCart API'si sadece success mesajı döndürüyor, cart data'sı yok
        // Bu yüzden başarılı olduğunda cart'ı tekrar çekiyoruz
        if (response?.data?.status === "success") {
            // Sepeti tekrar çek (güncel haliyle)
            const updatedCart = await getCart();
            return updatedCart;
        }

        log("[API cart.js] addToCart failed:", response?.data);
        return null;
    } catch (error) {
        if (error.response) {
            log("[API cart.js] addToCart error response:", {
                status: error.response.status,
                statusText: error.response.statusText,
                data: error.response.data,
                url: error.config?.url,
            });
            console.error("[API cart.js] Full error:", error);
        } else if (error.request) {
            log("[API cart.js] addToCart no response:", error.request);
            console.error("[API cart.js] Request error:", error);
        } else {
            log("[API cart.js] addToCart setup error:", error.message);
            console.error("[API cart.js] Setup error:", error);
        }
        return null;
    }
}

/**
 * Sepetten ürün kaldırır (Client-side)
 * @param {string} productSlug - Ürün slug'ı (örn: "katya-u")
 * @returns {Promise<Object|null>} Güncel sepet verisi veya null
 */
export async function removeFromCart(productSlug) {
    if (!productSlug) {
        log("[API cart.js] removeFromCart: productSlug is required");
        return null;
    }

    try {
        const response = await apiClient.delete("/cart/items", {
            params: {
                product_slug: productSlug,
            }
        });

        // removeFromCart API'si sadece success mesajı döndürüyor, cart data'sı yok
        // Bu yüzden başarılı olduğunda cart'ı tekrar çekiyoruz
        if (response?.data?.status === "success") {
            // Sepeti tekrar çek (güncel haliyle)
            const updatedCart = await getCart();
            return updatedCart;
        }

        log("[API cart.js] removeFromCart failed:", response?.data);
        return null;
    } catch (error) {
        if (error.response) {
            log("[API cart.js] removeFromCart error response:", {
                status: error.response.status,
                statusText: error.response.statusText,
                data: error.response.data,
                url: error.config?.url,
            });
            console.error("[API cart.js] Full error:", error);
        } else if (error.request) {
            log("[API cart.js] removeFromCart no response:", error.request);
            console.error("[API cart.js] Request error:", error);
        } else {
            log("[API cart.js] removeFromCart setup error:", error.message);
            console.error("[API cart.js] Setup error:", error);
        }
        return null;
    }
}
