import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";
import crypto from "crypto";

const BACKEND_URL = "https://api.simart.cloud/api/v1";

async function handleRequest(request, params, method) {
    const resolvedParams = await params;
    const path = resolvedParams.path.join("/");
    const targetUrl = `${BACKEND_URL}/${path}`;

    const apiKey = process.env.API_KEY || "";
    const userAgent = process.env.USER_AGENT || "";
    const securityKey = process.env.SECURITY_KEY || "";

    const searchParams = new URL(request.url).searchParams;
    const queryString = searchParams.toString();
    const finalUrl = queryString ? `${targetUrl}?${queryString}` : targetUrl;

    try {
        let body;
        let bodyStr = "null";

        if (method !== "GET" && method !== "DELETE") {
            try {
                const clonedRequest = request.clone();
                body = await clonedRequest.json();
                bodyStr = JSON.stringify(body);
            } catch (e) {
                body = undefined;
                bodyStr = "null";
            }
        }

        const timestamp = Math.floor(Date.now() / 1000);
        const dataToSign = `${timestamp}|${bodyStr}`;
        const signature = crypto
            .createHmac("sha256", securityKey)
            .update(dataToSign)
            .digest("hex");

        // Cookie'leri al ve forward et
        const cookieStore = await cookies();
        const cookieHeaders = [];
        let deviceId = null;
        
        cookieStore.getAll().forEach(cookie => {
            cookieHeaders.push(`${cookie.name}=${cookie.value}`);
            // DEVICE_ID cookie'sini X-Device-ID header'ı olarak ekle
            if (cookie.name === 'DEVICE_ID') {
                deviceId = cookie.value;
            }
        });
        const cookieHeader = cookieHeaders.join('; ');

        const response = await axios({
            method,
            url: finalUrl,
            headers: {
                "X-API-Key": apiKey,
                "User-Agent": userAgent,
                "Content-Type": "application/json",
                "X-Signature": signature,
                "X-Timestamp": timestamp.toString(),
                ...(cookieHeader && { "Cookie": cookieHeader }),
                ...(deviceId && { "X-Device-ID": deviceId }),
            },
            data: body,
            withCredentials: true, // Cookie'leri otomatik gönder
        });

        return NextResponse.json(response.data, { status: response.status });
    } catch (error) {
        console.error("Proxy Error:", {
            message: error.message,
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            url: finalUrl,
        });
        return NextResponse.json(
            error.response?.data || { error: "Internal Server Error" },
            { status: error.response?.status || 500 }
        );
    }
}

export async function GET(request, context) {
    return handleRequest(request, context.params, "GET");
}

export async function POST(request, context) {
    return handleRequest(request, context.params, "POST");
}

export async function PUT(request, context) {
    return handleRequest(request, context.params, "PUT");
}

export async function DELETE(request, context) {
    return handleRequest(request, context.params, "DELETE");
}

export async function PATCH(request, context) {
    return handleRequest(request, context.params, "PATCH");
}
