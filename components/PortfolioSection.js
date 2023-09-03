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
                    data-group="category_pro"
                    onClick={handleFilterKeyChange("pro")}
                  >
                    Professionnel
                  </a>
                </li>
                <li>
                  <a
                    className="filter btn btn-sm btn-link"
                    data-group="category_perso"
                    onClick={handleFilterKeyChange("perso")}
                  >
                    Personnel
                  </a>
                </li>
              </ul>

              <div className="portfolio-grid three-columns">
                <figure
                  className="item pro"
                  data-groups='["category_all", "category_pro"]'
                >
                  <div className="portfolio-item-img">
                    <img
                      src="img/portfolio/ygamaa.png"
                      alt="ygamaa website"
                      title=""
                    />
                    <a
                      href="https://ygamaa-consulting.web.app/"
                      className="lightbox mfp-iframe"
                      title="ygamaa website"
                    ></a>
                  </div>

                  <h4 className="name">Y-GAMAA Website</h4>
                  <span className="category">Pro</span>
                </figure>

                <figure
                  className="item perso"
                  data-groups='["category_all", "category_perso"]'
                >
                  <div className="portfolio-item-img">
                    <img
                      src="img/portfolio/revealjs-effects.png"
                      alt="Revealjs Effects"
                      title=""
                    />
                    <a
                      href="https://revealjs-cool-effects.web.app/"
                      className="ajax-page-load"
                    ></a>
                  </div>
                  <h4 className="name">Revealjs Effects</h4>
                  <span className="category">Perso</span>
                </figure>

                <figure
                  className="item pro"
                  data-groups='["category_all", "category_pro"]'
                >
                  <div className="portfolio-item-img">
                    <img
                      src="img/portfolio/credit-agricole.png"
                      alt="Credit Agricole"
                      title=""
                    />
                    <a
                      href="https://ca-paris.com/particuliers/"
                      className="lightbox mfp-iframe"
                      title="Credit Agricole Website"
                    ></a>
                  </div>

                  <h4 className="name">Crédit Agricole</h4>
                  <span className="category">Pro</span>
                </figure>

                <figure
                  className="item pro"
                  data-groups='["category_all", "category_pro"]'
                >
                  <div className="portfolio-item-img">
                    <img src="img/portfolio/promod.png" alt="Promod" title="" />
                    <a
                      href="https://www.promod.fr"
                      className="ajax-page-load"
                    ></a>
                  </div>

                  <h4 className="name">Promod</h4>
                  <span className="category">Pro</span>
                </figure>

                <figure
                  className="item perso"
                  data-groups='["category_all", "category_perso"]'
                >
                  <div className="portfolio-item-img">
                    <img
                      src="img/portfolio/yohann-resume.png"
                      alt="Yohann Fontaine Resume"
                      title=""
                    />
                    <a
                      href="https://yohannfontaine-resume.web.app/"
                      className="ajax-page-load"
                    ></a>
                  </div>

                  <h4 className="name">My Resume</h4>
                  <span className="category">Perso</span>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
