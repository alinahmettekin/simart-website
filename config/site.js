/**
 * Site genelinde kullanılan sabit veriler
 * Telefon numaraları, e-posta adresleri, adres bilgileri vb.
 */

export const siteConfig = {
    // İletişim Bilgileri
    contact: {
        phone: {
            customerService: {
                display: "+90 850 346 6126 (Müşteri Hizmetleri)",
                tel: "+908503466126",
                href: "tel:+908503466126",
            },
            whatsapp: {
                display: "+90 552 642 8208 (WhatsApp Hattı)",
                tel: "+905526428208",
                href: "https://api.whatsapp.com/send/?phone=%2B905526428208&text&type=phone_number&app_absent=0",
            },
        },
        email: {
            support: "destek@simart.me",
        },
        address: {
            street: "Yeşilova Mah. 4023 Cad. Ser Tower Apt. Dış Kapı: 1",
            city: "Ankara",
            country: "Türkiye",
            postalCode: "06796",
            district: "Etimesgut",
            state: "Ankara",
        },
    },

    // Sosyal Medya
    social: {
        facebook: "https://facebook.com/simart",
        instagram: "https://instagram.com/simart",
        twitter: "https://twitter.com/simart",
        linkedin: "https://linkedin.com/company/simart",
    },

    // Site Bilgileri
    site: {
        name: "Şımart Teknoloji",
        description: "Robot Süpürge ve Akıllı Ev Sistemleri",
        url: "https://simart.cloud",
    },
};

