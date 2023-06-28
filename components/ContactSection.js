import { motion } from "framer-motion";

export default function ContactSection({ isActive }) {
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
      data-id="contact"
      className="animated-section"
    >
      <div className="section-content">
        <div className="page-title">
          <h2>Contact</h2>
        </div>

        <div className="row">
          <div className="col-xs-12 col-sm-6">
            <div className="lm-info-block gray-default">
              <i className="lnr lnr-map-marker"></i>
              <h4>
                <a
                  href="https://goo.gl/maps/5pr97xmwPkMFZG5PA"
                  className="hover-style-link"
                >
                  Saint-Tricat (Calaisfornia)
                </a>
              </h4>
              <span className="lm-info-block-value"></span>
              <span className="lm-info-block-text"></span>
            </div>

            <div className="lm-info-block gray-default">
              <i className="lnr lnr-phone-handset"></i>
              <h4>
                <a href="tel:+336 08 46 28 48" className="hover-style-link">
                  +336 08 46 28 48
                </a>
              </h4>
              <span className="lm-info-block-value"></span>
              <span className="lm-info-block-text"></span>
            </div>
          </div>

          <div className="col-xs-12 col-sm-6">
            <div className="lm-info-block gray-default">
              <i className="lnr lnr-envelope"></i>
              <h4>
                <a
                  href="mailto:yohann.fontaine@gmail.com"
                  className="hover-style-link"
                >
                  yohann.fontaine@gmail.com
                </a>
              </h4>
              <span className="lm-info-block-value"></span>
              <span className="lm-info-block-text"></span>
            </div>

            <div className="lm-info-block gray-default">
              <i className="lnr lnr-checkmark-circle"></i>
              <h4>
                Freelance Available
                <br /> (only part time and full remote)
              </h4>
              <span className="lm-info-block-value"></span>
              <span className="lm-info-block-text"></span>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
