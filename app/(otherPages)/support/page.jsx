import ContactForm from "@/components/contact/ContactForm";
import React from "react";

export const metadata = {
    title: "Destek - Şımart Teknoloji",
    description: "Şımart Teknoloji destek sayfası. Sorularınız için bizimle iletişime geçin.",
};

export default function SupportPage() {
    return (
        <>
            <ContactForm />
        </>
    );
}

