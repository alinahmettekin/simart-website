import { serverFetch } from "@/utils/serverFetch";
import { log} from "@/utils/logger";

/**
 * Tüm ürünleri veya belirli filtredeki ürünleri getirir.
 */
export async function getProducts(params = "") {
    const endpoint = `/products${params ? `?${params}` : ""}`;
    const response = await serverFetch(endpoint, { next: { revalidate: 10 } });

    if (response?.status === "success") {
        return response.data || [];
    }

    log("[API products.js] getProducts failed:", response);
    return [];
}
