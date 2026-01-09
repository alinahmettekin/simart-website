import { cookies } from "next/headers";
import crypto from "crypto";

const BACKEND_URL = "https://api.simart.cloud/api/v1";

export async function serverFetch(endpoint, options = {}) {

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

    const headers = {
        "Content-Type": "application/json",
        "X-API-Key": process.env.API_KEY || "",
        "User-Agent": process.env.USER_AGENT || "",
        "X-Signature": signature,
        "X-Timestamp": timestamp.toString(),
        ...options.headers,
    };

    const url = `${BACKEND_URL}${endpoint}`;
    const startTime = Date.now();
    const method = options.method || "GET";

    console.log(`[serverFetch] FETCH START: ${method} ${url}`);

    try {
        const response = await fetch(url, {
            ...options,
            headers,
        });

        const duration = Date.now() - startTime;
        console.log(`[serverFetch] FETCH END: ${response.status} ${url} (${duration}ms)`);

        if (!response.ok) {
            let errorDetail = "";
            try {
                errorDetail = await response.text();
            } catch (e) {
                errorDetail = "Mesaj okunamadı";
            }

            console.error("----------------------------------------------------------------");
            console.error(`[serverFetch] ERROR DETECTED!`);
            console.error(`- URL: ${url}`);
            console.error(`- Status: ${response.status} ${response.statusText}`);
            console.error(`- Response Body: ${errorDetail}`);
            console.error("----------------------------------------------------------------");
            return null;
        }

        const json = await response.json();
        return json;
    } catch (error) {
        const duration = Date.now() - startTime;
        console.error("----------------------------------------------------------------");
        console.error(`[serverFetch] CRITICAL/NETWORK ERROR!`);
        console.error(`- Method/URL: ${method} ${url}`);
        console.error(`- Duration: ${duration}ms`);
        console.error(`- Error Message: ${error.message}`);
        if (error.stack) console.error(`- Stack Trace: ${error.stack.split('\n')[0]}`);
        console.error("----------------------------------------------------------------");
        return null;
    }
}
