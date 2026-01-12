import React from "react";
import SupportForm from "@/components/support/SupportForm";
import Header from "@/components/headers/Header";

export const metadata = {
    title: "Destek - Şımart Teknoloji",
    description: "Şımart Teknoloji destek sayfası. Sorularınız için bizimle iletişime geçin.",
};

export default function SupportPage() {
    return (
        <>
            <Header />
            <SupportForm />
        </>
    );
}

