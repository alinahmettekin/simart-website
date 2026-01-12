import "../public/scss/main.scss";
import "photoswipe/dist/photoswipe.css";
import "rc-slider/assets/index.css";
import ClientLayout from "@/components/common/ClientLayout";
import Topbar from "@/components/headers/Topbar";

//Api İstekleri
import { getTopbar } from "@/api/home";
import { getFooterMenus } from "@/api/menus";
import Footer from "@/components/footers/Footer";

export const metadata = {
  title: "Şımart Teknoloji - Robot Süpürge ve Akıllı Ev Sistemleri",
  description: "Şımart Teknoloji, robot süpürgeler, akıllı ev sistemleri ve IoT çözümlerinde öncüdür. Ev otomasyonu ve yaşamı kolaylaştıran teknolojilerle hizmetinizdeyiz.",
};

export default async function RootLayout({ children }) {
  // Server-side veriler
  const [topbarData, footerMenus] = await Promise.all([
    getTopbar(),
    getFooterMenus(),
  ]);

  return (
    <html lang="tr">
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
