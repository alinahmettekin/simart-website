import "../public/scss/main.scss";
import "photoswipe/dist/photoswipe.css";
import "rc-slider/assets/index.css";
import ClientLayout from "@/components/common/ClientLayout";
import Topbar from "@/components/homes/home-headphone/Topbar";

export const metadata = {
  title: "Şımart Teknoloji - Robot Süpürge ve Akıllı Ev Sistemleri",
  description: "Şımart Teknoloji, robot süpürgeler, akıllı ev sistemleri ve IoT çözümlerinde öncüdür. Ev otomasyonu ve yaşamı kolaylaştıran teknolojilerle hizmetinizdeyiz.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className="preload-wrapper">
        <div className="preload preload-container" id="preloader">
          <div className="preload-logo">
            <div className="spinner"></div>
          </div>
        </div>
        <Topbar />
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
