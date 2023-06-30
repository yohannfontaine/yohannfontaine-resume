import { motion } from "framer-motion";
import Image from "next/image";
import Isotope from "isotope-layout";

import React from "react";

export default function PortfolioSection({ isActive }) {
  const animations = {
    startShow: { opacity: 0, scale: 0.5, visibility: "hidden" },
    finishShow: { opacity: 1, scale: 1, visibility: "visible" },
  };

  const start = isActive ? animations.startShow : animations.finishShow;
  const finish = isActive ? animations.finishShow : animations.startShow;

  // state for storing the isotope object, with an initial value of null
  const [isotope, setIsotope] = React.useState(null);
  // state for storing the filter keyword, with an initial value of *, which matches everything
  const [filterKey, setFilterKey] = React.useState("*");

  React.useEffect(() => {
    setIsotope(
      new Isotope(".portfolio-grid", {
        // filter-container: className of the parent of the isotope elements
        itemSelector: ".item", // filter-item: className of the isotope elements
        layoutMode: "fitRows", // for horizontal isotope
      })
    );
  }, []);

  React.useEffect(() => {
    if (isotope) {
      // sanity check
      filterKey === "*"
        ? isotope.arrange({ filter: `*` })
        : isotope.arrange({ filter: `.${filterKey}` });
    }
  }, [isotope, filterKey]);

  const handleFilterKeyChange = (key) => () => setFilterKey(key);

  return (
    <motion.section
      initial={start}
      animate={finish}
      data-id="portfolio"
      className="animated-section"
    >
      <div className="section-content">
        <div className="page-title">
          <h2>Portfolio</h2>
        </div>

        <div className="row">
          <div className="col-xs-12 col-sm-12">
            <div className="portfolio-content">
              <ul className="portfolio-filters">
                <li className="active">
                  <a
                    className="filter btn btn-sm btn-link"
                    data-group="category_all"
                    onClick={handleFilterKeyChange("*")}
                  >
                    All
                  </a>
                </li>
                <li>
                  <a
                    className="filter btn btn-sm btn-link"
                    data-group="category_detailed"
                    onClick={handleFilterKeyChange("standard")}
                  >
                    Perso
                  </a>
                </li>
                <li>
                  <a
                    className="filter btn btn-sm btn-link"
                    data-group="category_mockups"
                  >
                    Mockups
                  </a>
                </li>
                <li>
                  <a
                    className="filter btn btn-sm btn-link"
                    data-group="category_soundcloud"
                    onClick={handleFilterKeyChange("lbaudio")}
                  >
                    SoundCloud
                  </a>
                </li>
                <li>
                  <a
                    className="filter btn btn-sm btn-link"
                    data-group="category_vimeo-videos"
                  >
                    Vimeo Videos
                  </a>
                </li>
                <li>
                  <a
                    className="filter btn btn-sm btn-link"
                    data-group="category_youtube-videos"
                  >
                    YouTube Videos
                  </a>
                </li>
              </ul>

              <div className="portfolio-grid three-columns">
                <figure className="item perso">
                  <div className="portfolio-item-img">
                    <img
                      src="img/portfolio/1.jpg"
                      alt="ygamaa website"
                      title=""
                    />
                    <a
                      href="https://ygamaa-consulting.web.app/"
                      className="lightbox mfp-iframe"
                      title="ygamaa website"
                    ></a>
                  </div>

                  <i className="fa fa-volume-up"></i>
                  <h4 className="name">SoundCloud Audio</h4>
                  <span className="category">SoundCloud</span>
                </figure>

                <figure
                  className="item standard"
                  data-groups='["category_all", "category_detailed"]'
                >
                  <div className="portfolio-item-img">
                    <img
                      src="img/portfolio/2.jpg"
                      alt="Media Project 2"
                      title=""
                    />
                    <a href="portfolio-1.html" className="ajax-page-load"></a>
                  </div>

                  <i className="far fa-file-alt"></i>
                  <h4 className="name">Detailed Project 2</h4>
                  <span className="category">Detailed</span>
                </figure>

                <figure
                  className="item lbvideo"
                  data-groups='["category_all", "category_vimeo-videos"]'
                >
                  <div className="portfolio-item-img">
                    <img
                      src="img/portfolio/3.jpg"
                      alt="Vimeo Video 1"
                      title=""
                    />
                    <a
                      href="https://player.vimeo.com/video/158284739"
                      className="lightbox mfp-iframe"
                      title="Vimeo Video 1"
                    ></a>
                  </div>

                  <i className="fas fa-video"></i>
                  <h4 className="name">Vimeo Video 1</h4>
                  <span className="category">Vimeo Videos</span>
                </figure>

                <figure
                  className="item standard"
                  data-groups='["category_all", "category_detailed"]'
                >
                  <div className="portfolio-item-img">
                    <img
                      src="img/portfolio/4.jpg"
                      alt="Media Project 1"
                      title=""
                    />
                    <a href="portfolio-1.html" className="ajax-page-load"></a>
                  </div>

                  <i className="far fa-file-alt"></i>
                  <h4 className="name">Detailed Project 1</h4>
                  <span className="category">Detailed</span>
                </figure>

                <figure
                  className="item lbimage"
                  data-groups='["category_all", "category_mockups"]'
                >
                  <div className="portfolio-item-img">
                    <img
                      src="img/portfolio/5.jpg"
                      alt="Mockup Design 1"
                      title=""
                    />
                    <a
                      className="lightbox"
                      title="Mockup Design 1"
                      href="img/portfolio/full/5.jpg"
                    ></a>
                  </div>

                  <i className="far fa-image"></i>
                  <h4 className="name">Mockup Design 1</h4>
                  <span className="category">Mockups</span>
                </figure>

                <figure
                  className="item lbvideo"
                  data-groups='["category_all", "category_youtube-videos"]'
                >
                  <div className="portfolio-item-img">
                    <img
                      src="img/portfolio/6.jpg"
                      alt="YouTube Video 1"
                      title=""
                    />
                    <a
                      href="https://www.youtube.com/embed/bg0gv2YpIok"
                      className="lightbox mfp-iframe"
                      title="YouTube Video 1"
                    ></a>
                  </div>

                  <i className="fas fa-video"></i>
                  <h4 className="name">YouTube Video 1</h4>
                  <span className="category">YouTube Videos</span>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
