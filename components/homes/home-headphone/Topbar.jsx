"use client";
import React, { useEffect, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import apiClient from "@/utils/apiClient";

export default function Topbar({ data: initialData = null, isActive: initialIsActive = null }) {
  const [data, setData] = useState(initialData || []);
  const [isActive, setIsActive] = useState(initialIsActive !== null ? initialIsActive : false);
  const [loading, setLoading] = useState(initialData === null);

  useEffect(() => {
    // Eğer dışarıdan veri geldiyse state'i güncelle
    if (initialData !== null) {
      setData(initialData);
      setIsActive(initialIsActive);
      setLoading(false);
      return;
    }

    // Eğer dışarıdan veri gelmediyse API'den çek
    const fetchTopbar = async () => {
      try {
        const response = await apiClient.get("/topbars");
        if (response.data?.status === "success") {
          setData(response.data.data || []);
          setIsActive(!!response.data.is_active);
        }
      } catch (error) {
        console.error("Failed to fetch topbar on client:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopbar();
  }, [initialData, initialIsActive]);

  if (loading || !isActive || !data || data.length === 0) return null;

  return (
    <div className="tf-top-bar bg_dark line">
      <div className="container-full px_15 lg-px_40">
        <div className="tf-top-bar_wrap grid-3 gap-30 align-items-center">
          <div className="tf-top-bar_left">
            <div className="d-flex gap-30 text_white fw-5">
              {/* Optional: Left side content */}
            </div>
          </div>
          <div className="text-center overflow-hidden">
            <Swiper
              dir="ltr"
              className="swiper tf-sw-top_bar"
              slidesPerView={1}
              modules={[Autoplay]}
              speed={1000}
              autoplay={{
                delay: 2000,
              }}
              loop={data.length > 1}
            >
              {data.map((item, index) => (
                <SwiperSlide key={index} className="swiper-slide">
                  <p
                    className="top-bar-text fw-5 text_white"
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="top-bar-language tf-cur justify-content-end">
            <div className="tf-currencies">
              {/* <CurrencySelect light topStart /> */}
            </div>
            <div className="tf-languages">
              {/* <LanguageSelect ... /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
