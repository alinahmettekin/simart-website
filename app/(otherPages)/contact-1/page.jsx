import Footer from "@/components/footers/Footer";
import Header from "@/otherpages/components/headers/Header";
import ContactForm from "@/components/contact/ContactForm";
import Map from "@/components/contact/Map";
import React from "react";

export const metadata = {
  title: "Contact 1 || Ecomus - Ultimate Nextjs Ecommerce Template",
  description: "Ecomus - Ultimate Nextjs Ecommerce Template",
};
export default function Contact() {
  return (
    <>
      <Header />
      <div className="tf-page-title style-2">
        <div className="container-full">
          <div className="heading text-center">Contact Us</div>
        </div>
      </div>

      <Map />
      <ContactForm />
      <Footer />
    </>
  );
}
