"use client";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import mainSlider from "@/data/mainSlider";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import "swiper/css/bundle";
import SingleHeroSlider from "./SingleHeroSlider";

const Banner = () => {
    return (
        <section className="main-slider max-w-screen-xl relative -z-10">
      <Swiper
        slidesPerView={1}
        loop
        navigation
        effect="fade"
        autoplay
        modules={[Navigation, EffectFade, Autoplay]}
      >
        {mainSlider.map((slider) => (
          <SwiperSlide key={slider.id}>
            <SingleHeroSlider slider={slider} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
    );
};

export default Banner;