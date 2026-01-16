import React from "react";
import SupportForm from "@/components/support/SupportForm";
import Header from "@/components/headers/Header";
import { webPageSchema } from "../../lib/schema";

const schema = webPageSchema({
  name: "Destek - Şımart Teknoloji",
  url: "https://simart.me/destek",
  description:
    "Şımart Teknoloji Destek sayfasında akıllı ev sistemleri ürün açıklamaları, kullanım videoları ve teknik destek bilgilerine ulaşın. Şımart Teknoloji ile hayatınızı kolaylaştırın",
});

export const metadata = {
  title: "Destek - Şımart Teknoloji",
  description: "Şımart Teknoloji destek sayfası. Sorularınız için bizimle iletişime geçin.",
  other: {
    "script:ld+json": JSON.stringify(schema),
  },
};

export default function SupportPage() {
  return (
    <>
      <Header />
      <SupportForm />
    </>
  );
}
