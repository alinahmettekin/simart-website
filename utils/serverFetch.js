import { cookies } from "next/headers";
import crypto from "crypto";

const BACKEND_URL = "https://api.simart.cloud/api/v1";
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 saniye

/**
 * Cloudflare challenge sayfası olup olmadığını kontrol eder
 */
function isCloudflareChallenge(text) {
    if (!text || typeof text !== "string") return false;
    return (
        text.includes("Just a moment") ||
        text.includes("challenge-platform") ||
        text.includes("cf-challenge") ||
        text.includes("__cf_chl_") ||
        text.includes("Enable JavaScript and cookies")
    );
}

/**
 * Response'un JSON olup olmadığını kontrol eder
 */
function isJsonResponse(response) {
    const contentType = response.headers.get("content-type");
    return contentType && contentType.includes("application/json");
}

export async function serverFetch(endpoint, options = {}) {
    const retries = options.retries !== undefined ? options.retries : MAX_RETRIES;
    let lastError = null;

    for (let attempt = 1; attempt <= retries; attempt++) {
        // HMAC Signing Logic
        const securityKey = process.env.SECURITY_KEY || "";
        const timestamp = Math.floor(Date.now() / 1000);

        // Body content for signing
        let bodyStr = "null";
        if (options.body) {
            bodyStr = typeof options.body === "string" ? options.body : JSON.stringify(options.body);
        }

        const dataToSign = `${timestamp}|${bodyStr}`;
        const signature = crypto
            .createHmac("sha256", securityKey)
            .update(dataToSign)
            .digest("hex");

        // User-Agent'ı daha gerçekçi yap (Cloudflare için önemli)
        const defaultUserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
        const userAgent = process.env.USER_AGENT || defaultUserAgent;

        const headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Accept-Language": "en-US,en;q=0.9",
            "X-API-Key": process.env.API_KEY || "",
            "User-Agent": userAgent,
            "X-Signature": signature,
            "X-Timestamp": timestamp.toString(),
            ...options.headers,
        };

        const url = `${BACKEND_URL}${endpoint}`;
        const startTime = Date.now();
        const method = options.method || "GET";

        if (attempt === 1) {
            console.log(`[serverFetch] FETCH START: ${method} ${url}`);
        } else {
            console.log(`[serverFetch] RETRY ${attempt}/${retries}: ${method} ${url}`);
        }

        try {
            const response = await fetch(url, {
                ...options,
                headers,
            });

            const duration = Date.now() - startTime;
            console.log(`[serverFetch] FETCH END: ${response.status} ${url} (${duration}ms)`);

            // Response body'yi oku (hem başarılı hem başarısız durumlar için)
            let responseText = "";
            try {
                responseText = await response.clone().text();
            } catch (e) {
                responseText = "";
            }

            // Cloudflare challenge kontrolü
            if (isCloudflareChallenge(responseText)) {
                const isLastAttempt = attempt === retries;
                console.warn(`[serverFetch] ⚠️  CLOUDFLARE CHALLENGE DETECTED! (Attempt ${attempt}/${retries})`);
                
                if (isLastAttempt) {
                    console.error("----------------------------------------------------------------");
                    console.error(`[serverFetch] CLOUDFLARE CHALLENGE - All retries exhausted!`);
                    console.error(`- URL: ${url}`);
                    console.error(`- Status: ${response.status} ${response.statusText}`);
                    console.error(`- This usually means Cloudflare is blocking the request`);
                    console.error(`- Check: User-Agent, IP reputation, or API rate limits`);
                    console.error("----------------------------------------------------------------");
                    return null;
                }

                // Retry için bekle
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * attempt));
                continue;
            }

            // JSON response kontrolü
            if (!isJsonResponse(response)) {
                console.warn(`[serverFetch] ⚠️  Non-JSON response detected (Content-Type: ${response.headers.get("content-type")})`);
                
                if (responseText.length > 500) {
                    console.warn(`[serverFetch] Response preview: ${responseText.substring(0, 500)}...`);
                } else {
                    console.warn(`[serverFetch] Response: ${responseText}`);
                }
            }

            if (!response.ok) {
                console.error("----------------------------------------------------------------");
                console.error(`[serverFetch] ERROR DETECTED!`);
                console.error(`- URL: ${url}`);
                console.error(`- Status: ${response.status} ${response.statusText}`);
                console.error(`- Response Body: ${responseText.substring(0, 500)}${responseText.length > 500 ? "..." : ""}`);
                console.error("----------------------------------------------------------------");
                
                // 4xx hataları için retry yapma
                if (response.status >= 400 && response.status < 500) {
                    return null;
                }
                
                // 5xx hataları için retry yap
                if (attempt < retries) {
                    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * attempt));
                    continue;
                }
                
                return null;
            }

            // JSON parse et
            try {
                const json = JSON.parse(responseText);
                return json;
            } catch (parseError) {
                console.error("----------------------------------------------------------------");
                console.error(`[serverFetch] JSON PARSE ERROR!`);
                console.error(`- URL: ${url}`);
                console.error(`- Parse Error: ${parseError.message}`);
                console.error(`- Response Preview: ${responseText.substring(0, 500)}...`);
                console.error("----------------------------------------------------------------");
                
                if (attempt < retries) {
                    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * attempt));
                    continue;
                }
                
                return null;
            }
        } catch (error) {
            lastError = error;
            const duration = Date.now() - startTime;
            
            if (attempt < retries) {
                console.warn(`[serverFetch] Network error (attempt ${attempt}/${retries}): ${error.message}. Retrying...`);
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * attempt));
                continue;
            }
            
            console.error("----------------------------------------------------------------");
            console.error(`[serverFetch] CRITICAL/NETWORK ERROR!`);
            console.error(`- Method/URL: ${method} ${url}`);
            console.error(`- Duration: ${duration}ms`);
            console.error(`- Error Message: ${error.message}`);
            if (error.stack) console.error(`- Stack Trace: ${error.stack.split('\n')[0]}`);
            console.error(`- All ${retries} retry attempts exhausted`);
            console.error("----------------------------------------------------------------");
            return null;
        }
    }

    return null;
}
