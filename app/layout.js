import "../public/scss/main.scss";
import "photoswipe/dist/photoswipe.css";
import "rc-slider/assets/index.css";
import ClientLayout from "@/components/common/ClientLayout";
import Topbar from "@/components/headers/Topbar";

//Api İstekleri
import { getTopbar } from "@/api/home";
import { getFooterMenus } from "@/api/menus";
import Footer from "@/components/footers/Footer";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: siteConfig.site.title,
  description: siteConfig.site.description,
  keywords: siteConfig.site.keywords,
  author: siteConfig.site.author,
  og: siteConfig.site.og,
  twitter: siteConfig.site.twitter,
  itemprop: siteConfig.site.itemprop,
};

export default async function RootLayout({ children }) {
  // Server-side veriler
  const [topbarData, footerMenus] = await Promise.all([
    getTopbar(),
    getFooterMenus(),
  ]);

  return (
    <html lang="tr">
      <head>
        {/* Google reCaptcha */}
        <script src="https://www.google.com/recaptcha/api.js" async></script>
        {/* Google Analytics */}
        {/* <script src="https://www.googletagmanager.com/gtag/js?id=G-GQP4JCTH72" async></script> */}
        {/* <script id="ga-init">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GQP4JCTH72');
          `}
        </script> */}
      </head>
      <body className="preload-wrapper">
        <div className="preload preload-container" id="preloader">
          <div className="preload-logo">
            <div className="spinner"></div>
          </div>
        </div>
        <Topbar data={topbarData.data} isActive={topbarData.isActive} />
        <ClientLayout>
          {children}
        </ClientLayout>
        <Footer footerMenus={footerMenus} />
      </body>
    </html>
  );
}
