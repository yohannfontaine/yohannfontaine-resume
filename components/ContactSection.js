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
                  href="https://maps.app.goo.gl/vWwxb9dVwEP43UENA"
                  className="hover-style-link"
                >
                  Calaisfornia (France)
                </a>
              </h4>
              <span className="lm-info-block-value"></span>
              <span className="lm-info-block-text"></span>
            </div>
          </div>

          <div className="col-xs-12 col-sm-6">
            <div className="lm-info-block gray-default">
              <i className="fab fa-linkedin-in"></i>
              <h4>
                <a
                  href="https://www.linkedin.com/in/yohann-fontaine-a680331b"
                  className="hover-style-link"
                >
                  linkedin
                </a>
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
