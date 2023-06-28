import { motion } from "framer-motion";
import {
  A11y,
  Autoplay,
  EffectCube,
  EffectFade,
  EffectFlip,
  Zoom,
} from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";

export default function HomeSection({ isActive }) {
  const animations = {
    startShow: { opacity: 0, scale: 0.5, visibility: "hidden" },
    finishShow: { opacity: 1, scale: 1, visibility: "visible" },
  };

  const start = isActive ? animations.startShow : animations.finishShow;
  const finish = isActive ? animations.finishShow : animations.startShow;

  return (
    <motion.section
      initial={start}
      animate={finish}
      data-id="home"
      className={`animated-section start-page ${
        isActive ? "section-active" : ""
      }`}
    >
      <div className="section-content vcentered">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <div className="title-block">
              <h2>Yohann Fontaine</h2>

              <Swiper
                modules={[Autoplay, A11y]}
                spaceBetween={30}
                slidesPerView={1}
                autoplay={{ delay: 2000 }}
              >
                <SwiperSlide className="swiper-slide item">
                  <div className="sp-subtitle">
                    Lead Software Engineer as a Service
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide item">
                  <div className="sp-subtitle">Architecte as a Service</div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide item">
                  <div className="sp-subtitle">CTO as a Service</div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide item">
                  <div className="sp-subtitle">
                    Developpeur Fullstack augmenté as a Service
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide item">
                  <div className="sp-subtitle">DevSecOps as a Service</div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
