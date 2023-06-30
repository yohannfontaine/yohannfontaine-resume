import { motion } from "framer-motion";
import Image from "next/image";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function AboutSection({ isActive }) {
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
      id="about-me"
      className="animated-section"
    >
      <div className="section-content">
        <div className="page-title">
          <h2>
            About <span>Me</span>
          </h2>
        </div>

        <div className="row">
          <div className="col-xs-12 col-sm-7">
            <p>
              Lead Software Engineer avec plus de 20 ans d&apos;expérience, je
              suis passionné et engagé pour accompagner mes clients dans leur
              transformation digitale et travailler avec eux pour créer des
              solutions numériques à la fois innovantes, performantes et
              respectueuses de l&apos;environnement. Adepte du Principe de
              Pareto, et de l&apos;approche &quot;as a service&quot;, je suis
              convaincu que les bonnes actions ciblées permettent de générer le
              plus de valeur métier tout en optimisant le ROI.
            </p>
            <p>
              Les valeurs principales que j&apos;essaie de transmettre sur le
              terrain sont :
              <strong>
                simplicité, agilité, innovation, amélioration continue et esprit
                d&apos;équipe.
              </strong>
            </p>
          </div>

          <div className="col-xs-12 col-sm-5">
            <div className="info-list">
              <ul>
                <li>
                  <span className="title">Age</span>
                  <span className="value">42</span>
                </li>

                <li>
                  <span className="title">Residence</span>
                  <span className="value">France</span>
                </li>

                <li>
                  <span className="title">Addresse</span>
                  <span className="value">62185 Saint-Tricat</span>
                </li>

                <li>
                  <span className="title">e-mail</span>
                  <span className="value">yohann.fontaine@gmail.com</span>
                </li>

                <li>
                  <span className="title">Phone</span>
                  <span className="value">06 08 46 28 48</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="white-space-50"></div>

        <div className="row">
          <div className="col-xs-12 col-sm-12">
            <div className="block-title">
              <h3>
                What <span>I Do</span>
              </h3>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-sm-6">
            <div className="col-inner">
              <div className="info-list-w-icon">
                <div className="info-block-w-icon">
                  <div className="ci-icon">
                    <i className="lnr lnr-chart-bars"></i>
                  </div>
                  <div className="ci-text">
                    <h4>Audit & Optimisation</h4>
                    <p>
                      Audit de votre architecture, préconisations
                      d&apos;optimisation selon votre contexte et implémentation
                      d&apos;architectures SI modernes et Cloud native. Patterns
                      d&apos;architecture : Architecture évènementielle (EDA),
                      Architecture microservices, APIsation, Serverless,
                      DataMesh ...), AI, Low/No Code. Conseil en GreenIT,
                      Ecoconception, Numérique responsable
                    </p>
                  </div>
                </div>
                <div className="info-block-w-icon">
                  <div className="ci-icon">
                    <i className="lnr lnr-laptop-phone"></i>
                  </div>
                  <div className="ci-text">
                    <h4>Développement Fullstack & DevSecOps</h4>
                    <p>
                      Développement à la carte de votre site web, application
                      mobile, API, etc. Développement frontend et/ou backend,
                      préconisation et mise en place de votre pipeline
                      d&apos;intégration et déploiement continu (CI/CD) ou Infra
                      as Code (IaC) selon les best practices GitOps et approche
                      Accelerate. Mise en place de contrôle de qualité et bonnes
                      pratiques de sécurité.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xs-12 col-sm-6">
            <div className="col-inner">
              <div className="info-list-w-icon">
                <div className="info-block-w-icon">
                  <div className="ci-icon">
                    <i className="lnr lnr-magic-wand"></i>
                  </div>
                  <div className="ci-text">
                    <h4>Coaching Tech et/ou Lean & Agile</h4>
                    <p>
                      Audit de l&apos;organisation de vos équipes, mise en place
                      méthodologie agile scrum/kanban en fonction du contexte,
                      agilité à l&apos;échelle SAFe. Accompagnement de startup
                      dans le recrutement et démarrage de leur équipe tech, CTO
                      as a service
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="white-space-30"></div>

        <div className="row">
          <div className="col-xs-12 col-sm-12">
            <div className="block-title">
              <h3>Testimonials</h3>
            </div>
          </div>
        </div>

        <div className="row">
          <Swiper
            modules={[Pagination, A11y]}
            pagination={{ clickable: true }}
            spaceBetween={50}
            slidesPerView={1}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            <SwiperSlide>
              <div className="testimonial">
                <div className="img">
                  <img
                    src="img/testimonials/testimonial-1.jpg"
                    alt="Alex Smith"
                  />
                </div>
                <div className="text">
                  <p>
                    Yohann à la tête d&apos;un projet sensible et essentiel pour
                    l&apos;activité du groupe de projets a su faire apprécier,
                    au cours de sa mission chez Coface, ses qualités de manager
                    de projet tout en conservant ses compétences techniques dans
                    le monde Java / J2EE.
                  </p>
                </div>

                <div className="author-info">
                  <h4 className="author">Eric SANCHEZ</h4>
                  <h5 className="company">
                    Responsable pôle Compte Etat, DSI Coface
                  </h5>
                  <div className="icon">
                    <i className="fas fa-quote-right"></i>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="testimonial">
                <div className="img">
                  <img
                    src="img/testimonials/testimonial-2.jpg"
                    alt="Alex Smith"
                  />
                </div>
                <div className="text">
                  <p>
                    Yohann est un Tech Lead talentueux et rigoureux, ainsi
                    qu&apos;un excellent manager avec qui il est agréable de
                    travailler.
                  </p>
                </div>

                <div className="author-info">
                  <h4 className="author">Malick Diop</h4>
                  <h5 className="company">
                    Développeur Full stack | Devops | Freelance
                  </h5>
                  <div className="icon">
                    <i className="fas fa-quote-right"></i>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="white-space-50"></div>

        <div className="row">
          <div className="col-xs-12 col-sm-12">
            <div className="block-title">
              <h3>Cilents</h3>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-sm-12 clients">
            <Swiper
              modules={[Autoplay, A11y]}
              autoplay={{ delay: 3000 }}
              spaceBetween={50}
              slidesPerView={1}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
              breakpoints={{
                // when window width is >= 640px
                480: {
                  width: 480,
                  slidesPerView: 2,
                },
                // when window width is >= 768px
                640: {
                  width: 640,
                  slidesPerView: 3,
                },
              }}
            >
              <SwiperSlide>
                <div className="client-block">
                  <a href="#" target="_blank" title="Logo">
                    <img
                      src="img/clients/logo-bpifrance.png"
                      alt="Logo Bpifrance"
                    />
                  </a>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="client-block">
                  <a href="#" target="_blank" title="Logo">
                    <img
                      src="img/clients/logo-keolis-lille.jpg"
                      alt="Logo Keolis Lille"
                    />
                  </a>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="client-block">
                  <a href="#" target="_blank" title="Logo">
                    <img src="img/clients/logo-promod.png" alt="Logo Promod" />
                  </a>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="client-block">
                  <a href="#" target="_blank" title="Logo">
                    <img
                      src="img/clients/logo-ca.png"
                      alt="Logo Crédit Agricole"
                    />
                  </a>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="client-block">
                  <a href="#" target="_blank" title="Logo">
                    <img src="img/clients/logo-ibm.png" alt="Logo IBM" />
                  </a>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="client-block">
                  <a href="#" target="_blank" title="Logo">
                    <img
                      src="img/clients/logo-renault-digital.png"
                      alt="Logo Renault Digital"
                    />
                  </a>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="client-block">
                  <a href="#" target="_blank" title="Logo">
                    <img src="img/clients/logo-sncf.jpg" alt="Logo SNCF" />
                  </a>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="client-block">
                  <a href="#" target="_blank" title="Logo">
                    <img src="img/clients/logo-coface.png" alt="Logo Coface" />
                  </a>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="client-block">
                  <a href="#" target="_blank" title="Logo">
                    <img
                      src="img/clients/logo-franfinance.png"
                      alt="Logo Franfinance"
                    />
                  </a>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="client-block">
                  <a href="#" target="_blank" title="Logo">
                    <img
                      src="img/clients/logo-renault.png"
                      alt="Logo Renault"
                    />
                  </a>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>

        <div className="white-space-50"></div>

        <div className="row">
          <div className="col-xs-12 col-sm-12">
            <div className="block-title">
              <h3>
                Fun <span>Facts</span>
              </h3>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-sm-4">
            <div className="fun-fact gray-default">
              <i className="lnr lnr-cloud"></i>
              <h4>Saut en parachute</h4>
              <span className="fun-fact-block-value">1</span>
              <span className="fun-fact-block-text"></span>
            </div>
          </div>

          <div className="col-xs-12 col-sm-4">
            <div className="fun-fact gray-default">
              <i className="lnr lnr-earth"></i>
              <h4>Voyages au Japon</h4>
              <span className="fun-fact-block-value">5</span>
              <span className="fun-fact-block-text"></span>
            </div>
          </div>

          <div className="col-xs-12 col-sm-4 ">
            <div className="fun-fact gray-default">
              <i className="lnr lnr-code"></i>
              <h4>Clash of Code</h4>
              <span className="fun-fact-block-value">77</span>
              <span className="fun-fact-block-text"></span>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
