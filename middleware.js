import { NextResponse } from "next/server";

// Özel URL mapping'ler (Türkçe -> İngilizce)

export function middleware(request) {
    
    // urlMappings'de yoksa, direkt /xxx olarak kalacak
    // Next.js route priority sayesinde statik route'lar önce eşleşir
    // Dinamik route'lar (app/(otherPages)/[slug]/page.jsx ve app/(blogs)/[slug]/page.jsx) sonra eşleşir
    // Rewrite yapmaya gerek yok, direkt /xxx olarak kalacak

    // const response = NextResponse.next();
    // const deviceId = request.cookies.get("DEVICE_ID");

    // if (!deviceId) {
    //     const randomValues = crypto.getRandomValues(new Uint8Array(16));
    //     const newDeviceId = btoa(String.fromCharCode(...randomValues));

    //     response.cookies.set("DEVICE_ID", newDeviceId, {
    //         httpOnly: true,
    //         path: "/",
    //         maxAge: 60 * 60 * 24 * 365, // 1 year
    //         sameSite: "lax",
    //     });
    // }

    // return response;
    
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|fonts|images|css|scss|favicon.ico).*)",
    ],
};
