import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import ContactForm from "@/components/othersPages/contact/ContactForm";
import Map from "@/components/othersPages/contact/Map";
import React from "react";

export const metadata = {
    title: "İletişim - Şımart Teknoloji",
    description: "Şımart Teknoloji ile iletişime geçin. Akıllı ev sistemlerimizle ilgili tüm sorularınız için destek alın. Müşteri hizmetlerimiz size yardımcı olmaktan memnuniyet duyar.",
};
export default function Contact() {
    return (
        <>
            <Header2 />
            <ContactForm />
            <Map />
            <Footer1 />
        </>
    );
}
